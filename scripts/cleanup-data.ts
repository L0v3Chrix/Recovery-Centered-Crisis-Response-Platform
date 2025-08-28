#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { TResource } from '../src/types/resource';

function cleanPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const numbers = phone.replace(/\D/g, '');
  
  // Handle multiple phone numbers (take first one)
  const firstNumber = numbers.substring(0, 10);
  
  if (firstNumber.length === 10) {
    // Format as (XXX) XXX-XXXX
    return `(${firstNumber.substring(0, 3)}) ${firstNumber.substring(3, 6)}-${firstNumber.substring(6)}`;
  }
  
  // Return original if can't format
  return phone;
}

function cleanWebsite(website: string): string {
  // Add https:// if missing protocol
  if (website && !website.startsWith('http://') && !website.startsWith('https://')) {
    return `https://${website}`;
  }
  return website;
}

function deduplicateResources(resources: TResource[]): TResource[] {
  const seen = new Map<string, TResource>();
  const deduped: TResource[] = [];
  
  resources.forEach(resource => {
    const key = `${resource.name.toLowerCase()}_${resource.address?.toLowerCase() || ''}`;
    
    if (!seen.has(key)) {
      seen.set(key, resource);
      deduped.push(resource);
    } else {
      // Merge data from duplicate
      const existing = seen.get(key)!;
      
      // Merge missing fields
      if (!existing.phone && resource.phone) existing.phone = resource.phone;
      if (!existing.website && resource.website) existing.website = resource.website;
      if (!existing.hours && resource.hours) existing.hours = resource.hours;
      if (!existing.description && resource.description) existing.description = resource.description;
      
      // Merge services
      if (resource.services) {
        existing.services = [...new Set([...(existing.services || []), ...resource.services])];
      }
    }
  });
  
  return deduped;
}

function assignMissingRegions(resources: TResource[]): void {
  // ZIP to region mapping
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
  
  resources.forEach(resource => {
    if (!resource.region && resource.zip) {
      resource.region = zipRegions[resource.zip] || 'central';
    } else if (!resource.region) {
      // Default to central if no ZIP
      resource.region = 'central';
    }
  });
}

function cleanupResources(): { before: number; after: number; changes: string[] } {
  const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
  const resources: TResource[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  const changes: string[] = [];
  const beforeCount = resources.length;
  
  // Track changes
  let phonesFixed = 0;
  let websitesFixed = 0;
  let regionsAssigned = 0;
  
  // Clean phone numbers
  resources.forEach(resource => {
    if (resource.phone) {
      const cleaned = cleanPhoneNumber(resource.phone);
      if (cleaned !== resource.phone) {
        resource.phone = cleaned;
        phonesFixed++;
      }
    }
  });
  
  if (phonesFixed > 0) {
    changes.push(`✅ Fixed ${phonesFixed} phone number formats`);
  }
  
  // Clean websites
  resources.forEach(resource => {
    if (resource.website) {
      const cleaned = cleanWebsite(resource.website);
      if (cleaned !== resource.website) {
        resource.website = cleaned;
        websitesFixed++;
      }
    }
  });
  
  if (websitesFixed > 0) {
    changes.push(`✅ Fixed ${websitesFixed} website URLs`);
  }
  
  // Assign missing regions
  const beforeRegions = resources.filter(r => r.region).length;
  assignMissingRegions(resources);
  const afterRegions = resources.filter(r => r.region).length;
  regionsAssigned = afterRegions - beforeRegions;
  
  if (regionsAssigned > 0) {
    changes.push(`✅ Assigned regions to ${regionsAssigned} resources`);
  }
  
  // Deduplicate
  const deduped = deduplicateResources(resources);
  const duplicatesRemoved = beforeCount - deduped.length;
  
  if (duplicatesRemoved > 0) {
    changes.push(`✅ Removed ${duplicatesRemoved} duplicate resources`);
  }
  
  // Save cleaned data
  const cleanPath = path.join(process.cwd(), 'data/resources.cleaned.json');
  fs.writeFileSync(cleanPath, JSON.stringify(deduped, null, 2));
  
  // Also update the normalized file
  fs.writeFileSync(dataPath, JSON.stringify(deduped, null, 2));
  
  return {
    before: beforeCount,
    after: deduped.length,
    changes
  };
}

// Add missing default data for resources without critical fields
function enhanceResourceData(resources: TResource[]): void {
  resources.forEach(resource => {
    // Add default descriptions if missing
    if (!resource.description) {
      if (resource.services && resource.services.length > 0) {
        resource.description = resource.services.slice(0, 3).join(' • ');
      } else {
        resource.description = `${resource.category.charAt(0).toUpperCase() + resource.category.slice(1)} resource in Austin`;
      }
    }
    
    // Add default hours if missing for certain categories
    if (!resource.hours) {
      if (resource.category === 'crisis') {
        resource.hours = '24/7 Crisis Support';
      } else if (resource.name.toLowerCase().includes('hotline')) {
        resource.hours = '24/7 Hotline';
      }
    }
    
    // Ensure all resources have an ID
    if (!resource.id) {
      resource.id = `res-${resource.name.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}`;
    }
  });
}

async function main() {
  console.log('🧹 Starting data cleanup...\n');
  
  try {
    // Load resources
    const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
    const resources: TResource[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    console.log(`📊 Processing ${resources.length} resources...`);
    
    // Enhance data
    enhanceResourceData(resources);
    console.log('✅ Enhanced resource descriptions and metadata');
    
    // Run cleanup
    const result = cleanupResources();
    
    console.log('\n📋 Cleanup Summary:');
    console.log(`  Before: ${result.before} resources`);
    console.log(`  After: ${result.after} resources`);
    
    if (result.changes.length > 0) {
      console.log('\n🔄 Changes Applied:');
      result.changes.forEach(change => console.log(`  ${change}`));
    }
    
    console.log('\n✨ Data cleanup complete!');
    console.log('📄 Cleaned data saved to: data/resources.cleaned.json');
    console.log('📄 Normalized data updated: data/resources.normalized.json');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

main();