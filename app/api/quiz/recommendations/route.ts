import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { TResource } from '@/types/resource';

const RequestSchema = z.object({
  category: z.string(),
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
  if (resource.category === request.category) {
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
    
    if (relatedCategories[request.category]?.includes(resource.category)) {
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
        '78746': 'west', '78730': 'west', '78733': 'west',
        '78734': 'west', '78735': 'west', '78736': 'west', '78738': 'west', '78739': 'west'
      };
      userRegion = zipRegions[request.zip] || 'central';
    }
    
    if (resource.region === userRegion) {
      score += 0.2;
    } else if (userRegion === 'central' || resource.region === 'central') {
      // Partial credit for central region adjacency
      score += 0.1;
    }
  }
  
  // Distance score (20%) - only if we have coordinates
  if (request.lat && request.lng && resource.coordinates) {
    const distance = calculateDistance(
      request.lat, request.lng,
      resource.coordinates.lat, resource.coordinates.lng
    );
    
    // Transport mode affects distance scoring
    let maxDistance = 10; // km for car
    if (request.transportMode === 'transit') maxDistance = 5;
    if (request.transportMode === 'walk') maxDistance = 2;
    
    if (distance <= maxDistance) {
      // Linear decay from 20% to 0%
      score += 0.2 * (1 - distance / maxDistance);
    }
  } else if (!request.lat && !request.lng) {
    // If no coordinates provided, give partial distance score
    score += 0.1;
  }
  
  // Eligibility match (10%)
  if (request.eligibility && request.eligibility.length > 0 && resource.eligibility) {
    const matches = request.eligibility.filter(e => 
      resource.eligibility?.some(re => 
        re.toLowerCase().includes(e.toLowerCase())
      )
    );
    score += 0.1 * (matches.length / request.eligibility.length);
  }
  
  // Needs match (bonus up to 10%)
  if (request.needs && request.needs.length > 0 && resource.services) {
    const serviceText = resource.services.join(' ').toLowerCase();
    const matches = request.needs.filter(need => 
      serviceText.includes(need.toLowerCase())
    );
    score += Math.min(0.1, 0.02 * matches.length);
  }
  
  return score;
}

// Check if resource is currently open
function isOpen(hours?: string): boolean {
  if (!hours) return true; // Assume open if no hours specified
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight
  
  // Parse hours string (e.g., "Mon-Fri 9am-5pm")
  // This is a simplified check - real implementation would need more robust parsing
  const lowerHours = hours.toLowerCase();
  const dayAbbrev = currentDay.substring(0, 3).toLowerCase();
  
  if (!lowerHours.includes(dayAbbrev) && !lowerHours.includes('daily') && !lowerHours.includes('24')) {
    return false;
  }
  
  // Check for 24-hour service
  if (lowerHours.includes('24 hour') || lowerHours.includes('24/7')) {
    return true;
  }
  
  // Extract time ranges (simplified)
  const timeMatch = lowerHours.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?.*?(\d{1,2}):?(\d{2})?\s*(am|pm)?/);
  if (timeMatch) {
    // Parse start time
    let startHour = parseInt(timeMatch[1]);
    const startMin = parseInt(timeMatch[2] || '0');
    if (timeMatch[3] === 'pm' && startHour !== 12) startHour += 12;
    if (timeMatch[3] === 'am' && startHour === 12) startHour = 0;
    const startTime = startHour * 60 + startMin;
    
    // Parse end time
    let endHour = parseInt(timeMatch[4]);
    const endMin = parseInt(timeMatch[5] || '0');
    if (timeMatch[6] === 'pm' && endHour !== 12) endHour += 12;
    if (timeMatch[6] === 'am' && endHour === 12) endHour = 0;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
  }
  
  return true; // Default to open if can't parse
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RequestSchema.parse(body);
    
    // Load all resources
    const resources = loadResources();
    
    // Score all resources
    const scoredResources = resources.map(resource => ({
      ...resource,
      score: scoreResource(resource, validated),
      isOpen: isOpen(resource.hours)
    }));
    
    // Filter and sort
    const recommendations = scoredResources
      .filter(r => r.score > 0.1) // Minimum threshold
      .sort((a, b) => {
        // Sort by score, then by whether open
        if (Math.abs(a.score - b.score) > 0.01) {
          return b.score - a.score;
        }
        if (a.isOpen !== b.isOpen) {
          return a.isOpen ? -1 : 1;
        }
        return 0;
      })
      .slice(0, 20); // Top 20 recommendations
    
    return NextResponse.json({
      recommendations,
      totalMatches: recommendations.length,
      request: validated
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Quiz recommendation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}