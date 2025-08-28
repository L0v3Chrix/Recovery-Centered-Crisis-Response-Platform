import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { TResource } from '@/types/resource';

const RequestSchema = z.object({
  categories: z.array(z.string()).min(1), // Changed to array of categories
  subcategory: z.string().optional(),
  zip: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  needs: z.array(z.string()).optional(),
  eligibility: z.array(z.string()).optional(),
  transportMode: z.enum(['car', 'transit', 'walk']).optional()
});

type Request = z.infer<typeof RequestSchema>;

// Austin city center for distance calculations
const AUSTIN_CENTER = { lat: 30.2672, lng: -97.7431 };

// Load resources
function loadResources(): TResource[] {
  const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

// Calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Score a single resource
function scoreResource(resource: TResource, request: Request): number {
  let score = 0;
  
  // Category match (50%)
  if (request.categories.includes(resource.category)) {
    score += 0.5;
  } else {
    // Partial credit for related categories
    const relatedCategories: Record<string, string[]> = {
      'crisis': ['healthcare', 'shelter'],
      'food': ['benefits'],
      'shelter': ['crisis', 'housing'],
      'recovery': ['healthcare'],
      'healthcare': ['recovery', 'crisis'],
      'employment': ['benefits', 'education']
    };
    
    // Check if any requested category is related to this resource's category
    const hasRelation = request.categories.some(cat => 
      relatedCategories[cat]?.includes(resource.category)
    );
    
    if (hasRelation) {
      score += 0.2;
    }
  }
  
  // Subcategory match (bonus 10%)
  if (request.subcategory && resource.subcategories?.includes(request.subcategory)) {
    score += 0.1;
  }
  
  // Region match (20%)
  if (resource.region) {
    // If user provided coordinates, calculate region
    let userRegion = 'central';
    if (request.lat && request.lng) {
      const distance = calculateDistance(AUSTIN_CENTER.lat, AUSTIN_CENTER.lng, request.lat, request.lng);
      if (distance <= 6.0) {
        userRegion = 'central';
      } else {
        const bearing = Math.atan2(
          request.lng - AUSTIN_CENTER.lng,
          request.lat - AUSTIN_CENTER.lat
        ) * 180 / Math.PI;
        
        if (bearing >= -45 && bearing < 45) userRegion = 'north';
        else if (bearing >= 45 && bearing < 135) userRegion = 'east';
        else if (bearing >= -135 && bearing < -45) userRegion = 'west';
        else userRegion = 'south';
      }
    } else if (request.zip) {
      // Map ZIP to region
      const zipRegions: Record<string, string> = {
        '78701': 'central', '78702': 'central', '78703': 'central',
        '78705': 'central', '78712': 'central', '78722': 'central', '78723': 'central',
        '78727': 'north', '78728': 'north', '78729': 'north',
        '78753': 'north', '78758': 'north', '78759': 'north', '78731': 'north',
        '78704': 'south', '78745': 'south', '78748': 'south',
        '78749': 'south', '78744': 'south', '78741': 'south', '78747': 'south',
        '78721': 'east', '78724': 'east', '78617': 'east',
        '78725': 'east', '78742': 'east', '78719': 'east',
        '78730': 'west', '78733': 'west', '78735': 'west', 
        '78736': 'west', '78738': 'west', '78739': 'west',
        '78746': 'west', '78750': 'west', '78726': 'west', '78732': 'west',
        '78734': 'west', '78737': 'west'
      };
      userRegion = zipRegions[request.zip] || 'central';
    }
    
    // Full match for same region
    if (resource.region === userRegion) {
      score += 0.2;
    } else if (resource.region === 'central' || userRegion === 'central') {
      // Partial credit for central region
      score += 0.1;
    }
  }
  
  // Distance bonus (20%)
  if (request.lat && request.lng && resource.coordinates) {
    const distance = calculateDistance(
      request.lat, 
      request.lng,
      resource.coordinates.lat,
      resource.coordinates.lng
    );
    
    if (distance <= 3.0) {
      score += 0.2; // Very close
    } else if (distance <= 8.0) {
      score += 0.1; // Moderate distance
    } else if (distance <= 15.0) {
      score += 0.05; // Far but still in area
    }
  }
  
  // Eligibility match (10%)
  if (request.eligibility && resource.eligibility) {
    const matchCount = request.eligibility.filter(e => 
      resource.eligibility?.includes(e)
    ).length;
    
    if (matchCount > 0) {
      score += Math.min(0.1, matchCount * 0.03);
    }
  }
  
  // Special needs match
  if (request.needs && resource.services) {
    const matchCount = request.needs.filter(n => 
      resource.services?.some(s => s.toLowerCase().includes(n.toLowerCase()))
    ).length;
    
    if (matchCount > 0) {
      score += Math.min(0.05, matchCount * 0.02);
    }
  }
  
  return score;
}

// Diversity guard: ensure balanced results across categories
function applyDiversityGuard(scoredResources: Array<TResource & {score: number}>, categories: string[], limit: number = 20): Array<TResource & {score: number}> {
  // Group resources by category
  const buckets = new Map<string, Array<TResource & {score: number}>>();
  
  // Initialize buckets for each requested category
  categories.forEach(cat => buckets.set(cat, []));
  
  // Sort resources into buckets
  scoredResources.forEach(resource => {
    if (categories.includes(resource.category)) {
      buckets.get(resource.category)?.push(resource);
    }
  });
  
  // Sort each bucket by score
  buckets.forEach(bucket => {
    bucket.sort((a, b) => b.score - a.score);
  });
  
  // Round-robin selection to ensure diversity
  const result: Array<TResource & {score: number}> = [];
  let hasMoreResources = true;
  
  while (result.length < limit && hasMoreResources) {
    hasMoreResources = false;
    
    for (const category of categories) {
      const bucket = buckets.get(category);
      if (bucket && bucket.length > 0) {
        result.push(bucket.shift()!);
        hasMoreResources = true;
        
        if (result.length >= limit) break;
      }
    }
  }
  
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Parse and validate request
    const parsed = RequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.issues },
        { status: 400 }
      );
    }
    
    const req = parsed.data;
    const resources = loadResources();
    
    // Filter resources to those in requested categories
    const candidateResources = resources.filter(r => 
      req.categories.includes(r.category)
    );
    
    // Score all candidate resources
    const scoredResources = candidateResources.map(resource => ({
      ...resource,
      score: scoreResource(resource, req)
    }));
    
    // Sort by score
    scoredResources.sort((a, b) => b.score - a.score);
    
    // Apply diversity guard for balanced results
    const diverseResults = applyDiversityGuard(scoredResources, req.categories, 20);
    
    // Format results
    const recommendations = diverseResults.map(resource => ({
      resource: {
        id: resource.id,
        name: resource.name,
        category: resource.category,
        subcategories: resource.subcategories,
        description: resource.description,
        address: resource.address,
        city: resource.city,
        state: resource.state,
        zip: resource.zip,
        phone: resource.phone,
        website: resource.website,
        hours: resource.hours,
        services: resource.services,
        eligibility: resource.eligibility,
        region: resource.region,
        coordinates: resource.coordinates,
        lastVerified: resource.lastVerified
      },
      score: Math.round(resource.score * 100),
      distance: resource.coordinates && req.lat && req.lng
        ? calculateDistance(req.lat, req.lng, resource.coordinates.lat, resource.coordinates.lng)
        : null,
      reasons: [
        req.categories.includes(resource.category) && `Matches ${resource.category} category`,
        resource.region && 'In your area',
        resource.score >= 0.7 && 'High relevance match'
      ].filter(Boolean) as string[]
    }));
    
    // Calculate totals by category
    const categoryTotals: Record<string, number> = {};
    req.categories.forEach(cat => {
      categoryTotals[cat] = resources.filter(r => r.category === cat).length;
    });
    
    return NextResponse.json({
      success: true,
      recommendations,
      meta: {
        totalResources: resources.length,
        candidatesConsidered: candidateResources.length,
        categoriesRequested: req.categories,
        categoryTotals,
        resultsReturned: recommendations.length
      }
    });
    
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}