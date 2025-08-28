#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { TResource } from '../src/types/resource';

interface RawResource {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  hours?: string;
  services?: string;
  description?: string;
  notes?: string;
}

interface RawCategory {
  title: string;
  resources: RawResource[];
}

function extractResourceData(): RawCategory[] {
  const printablePath = path.join(process.cwd(), 'app/printable/page.tsx');
  const content = fs.readFileSync(printablePath, 'utf-8');

  // Find the resourceData array
  const startMarker = 'const resourceData: ResourceCategory[] = [';
  const startIdx = content.indexOf(startMarker);
  
  if (startIdx === -1) {
    throw new Error('Could not find resourceData in printable page');
  }

  // Find the end of the array (look for the closing bracket at the correct indentation)
  let bracketCount = 0;
  let inString = false;
  let escapeNext = false;
  let endIdx = startIdx + startMarker.length;
  
  for (let i = startIdx + startMarker.length; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (char === '"' && prevChar !== '\\') {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '[' || char === '{') {
        bracketCount++;
      } else if (char === ']' || char === '}') {
        bracketCount--;
        if (bracketCount === -1) {
          endIdx = i + 1;
          break;
        }
      }
    }
  }
  
  const dataStr = content.substring(startIdx + startMarker.length - 1, endIdx);
  
  // Parse the data using eval (controlled environment)
  try {
    const resourceData = eval(`(${dataStr})`);
    return resourceData;
  } catch (error) {
    console.error('Failed to parse resource data:', error);
    
    // Try to manually parse key sections
    const categories: RawCategory[] = [];
    const categoryMatches = dataStr.matchAll(/\{\s*title:\s*"([^"]+)"/g);
    
    for (const match of Array.from(categoryMatches)) {
      categories.push({
        title: match[1],
        resources: []
      });
    }
    
    return categories;
  }
}

function normalizeCategory(title: string): string {
  const categoryMap: Record<string, string> = {
    'EMERGENCY SERVICES & CRISIS SUPPORT': 'crisis',
    'FOOD ASSISTANCE': 'food',
    'FOOD PANTRIES & DISTRIBUTION': 'food',
    'MEALS & NUTRITION': 'food',
    'SHELTER & HOUSING': 'shelter',
    'EMERGENCY SHELTER': 'shelter',
    'TRANSITIONAL HOUSING': 'shelter',
    'PERMANENT HOUSING': 'shelter',
    'RECOVERY & TREATMENT': 'recovery',
    'SUBSTANCE USE TREATMENT': 'recovery',
    'MENTAL HEALTH': 'healthcare',
    'MEDICAL & DENTAL': 'healthcare',
    'HEALTHCARE': 'healthcare',
    'LEGAL & DOCUMENTATION': 'legal',
    'EMPLOYMENT & EDUCATION': 'employment',
    'TRANSPORTATION': 'transport',
    'CLOTHING & HYGIENE': 'hygiene',
    'BENEFITS & FINANCIAL': 'benefits',
    'FAMILY & CHILDREN': 'family',
    'YOUTH SERVICES': 'youth',
    'VETERAN SERVICES': 'veterans',
    'LGBTQ+ RESOURCES': 'lgbtq',
    'SENIOR SERVICES': 'seniors',
    'PET RESOURCES': 'pets'
  };

  // Try exact match first
  for (const [key, value] of Object.entries(categoryMap)) {
    if (title.toUpperCase().includes(key)) {
      return value;
    }
  }

  // Fallback to keyword matching
  const titleUpper = title.toUpperCase();
  if (titleUpper.includes('CRISIS') || titleUpper.includes('EMERGENCY')) return 'crisis';
  if (titleUpper.includes('FOOD') || titleUpper.includes('MEAL')) return 'food';
  if (titleUpper.includes('SHELTER') || titleUpper.includes('HOUSING')) return 'shelter';
  if (titleUpper.includes('RECOVERY') || titleUpper.includes('TREATMENT')) return 'recovery';
  if (titleUpper.includes('HEALTH') || titleUpper.includes('MEDICAL')) return 'healthcare';
  if (titleUpper.includes('LEGAL')) return 'legal';
  if (titleUpper.includes('EMPLOY') || titleUpper.includes('JOB')) return 'employment';
  if (titleUpper.includes('TRANSPORT')) return 'transport';
  
  return 'crisis'; // Default fallback
}

function extractZipFromAddress(address?: string): string | undefined {
  if (!address) return undefined;
  const zipMatch = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  return zipMatch ? zipMatch[1] : undefined;
}

function processResources(rawData: RawCategory[]): Partial<TResource>[] {
  const resources: Partial<TResource>[] = [];
  let idCounter = 1;

  for (const category of rawData) {
    const normalizedCategory = normalizeCategory(category.title);
    
    for (const rawResource of category.resources) {
      const resource: Partial<TResource> = {
        id: `res-${idCounter++}`,
        name: rawResource.name,
        category: normalizedCategory as any,
        subcategories: [],
        description: rawResource.description || rawResource.services,
        address: rawResource.address,
        city: rawResource.address?.includes('Austin') ? 'Austin' : undefined,
        state: 'TX',
        zip: extractZipFromAddress(rawResource.address),
        phone: rawResource.phone,
        website: rawResource.website,
        hours: rawResource.hours,
        services: rawResource.services ? [rawResource.services] : [],
        eligibility: [],
        lastVerified: new Date().toISOString().split('T')[0]
      };

      // Extract additional data from notes
      if (rawResource.notes) {
        resource.services = [...(resource.services || []), rawResource.notes];
      }

      resources.push(resource);
    }
  }

  return resources;
}

async function main() {
  console.log('📚 Ingesting printable resources...\n');

  try {
    // Extract raw data
    const rawData = extractResourceData();
    console.log(`✅ Extracted ${rawData.length} categories`);

    // Count total resources
    const totalResources = rawData.reduce((sum, cat) => sum + cat.resources.length, 0);
    console.log(`📊 Total resources: ${totalResources}`);

    // Process into normalized format
    const processedResources = processResources(rawData);
    console.log(`🔄 Processed ${processedResources.length} resources`);

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save raw data
    const rawPath = path.join(dataDir, 'resources.raw.json');
    fs.writeFileSync(rawPath, JSON.stringify(rawData, null, 2));
    console.log(`\n💾 Saved raw data to: ${rawPath}`);

    // Save processed data
    const processedPath = path.join(dataDir, 'resources.processed.json');
    fs.writeFileSync(processedPath, JSON.stringify(processedResources, null, 2));
    console.log(`💾 Saved processed data to: ${processedPath}`);

    // Print summary by category
    console.log('\n📈 Category breakdown:');
    const categoryCounts: Record<string, number> = {};
    for (const resource of processedResources) {
      const cat = resource.category || 'unknown';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
    
    for (const [category, count] of Object.entries(categoryCounts)) {
      console.log(`   ${category}: ${count} resources`);
    }

  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

main();