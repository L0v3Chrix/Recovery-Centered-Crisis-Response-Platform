#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { TResource, TRegion } from '../src/types/resource';

// Austin city center coordinates
const AUSTIN_CENTER = { lat: 30.2672, lng: -97.7431 };
const CENTRAL_RADIUS_KM = 6.0;

interface GeocodingCache {
  [address: string]: {
    lat: number;
    lng: number;
    timestamp: string;
  };
}

function loadZipRegions(): Record<string, number[]> {
  const yamlPath = path.join(process.cwd(), 'data/zip-regions.yaml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
  return parse(yamlContent);
}

function loadCache(): GeocodingCache {
  const cachePath = path.join(process.cwd(), 'data/cache/geocode.json');
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  }
  return {};
}

function saveCache(cache: GeocodingCache) {
  const cacheDir = path.join(process.cwd(), 'data/cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  const cachePath = path.join(cacheDir, 'geocode.json');
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

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

function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

function determineRegionFromCoordinates(lat: number, lng: number): TRegion {
  const distance = calculateDistance(AUSTIN_CENTER.lat, AUSTIN_CENTER.lng, lat, lng);
  
  // If within central radius, it's central
  if (distance <= CENTRAL_RADIUS_KM) {
    return 'central';
  }
  
  // Otherwise determine by bearing
  const bearing = calculateBearing(AUSTIN_CENTER.lat, AUSTIN_CENTER.lng, lat, lng);
  
  if (bearing >= 315 || bearing < 45) return 'north';
  if (bearing >= 45 && bearing < 135) return 'east';
  if (bearing >= 135 && bearing < 225) return 'south';
  return 'west';
}

function determineRegionFromZip(zip: string, zipRegions: Record<string, number[]>): TRegion | undefined {
  const zipNum = parseInt(zip);
  if (isNaN(zipNum)) return undefined;
  
  for (const [region, zips] of Object.entries(zipRegions)) {
    if (zips.includes(zipNum)) {
      return region as TRegion;
    }
  }
  
  return undefined;
}

async function geocodeAddress(address: string, cache: GeocodingCache): Promise<{ lat: number; lng: number } | null> {
  // Check cache first
  if (cache[address]) {
    return { lat: cache[address].lat, lng: cache[address].lng };
  }
  
  // For now, use mock geocoding based on ZIP codes
  // In production, you'd use Google Maps Geocoding API here
  const zipMatch = address.match(/\b(787\d{2})\b/);
  if (zipMatch) {
    const zip = zipMatch[1];
    // Mock coordinates for common Austin ZIPs
    const mockCoords: Record<string, { lat: number; lng: number }> = {
      '78701': { lat: 30.2672, lng: -97.7431 }, // Downtown
      '78702': { lat: 30.2629, lng: -97.7140 }, // East Austin
      '78703': { lat: 30.2877, lng: -97.7530 }, // West Austin
      '78704': { lat: 30.2459, lng: -97.7618 }, // South Austin
      '78705': { lat: 30.2890, lng: -97.7418 }, // Central/UT
      '78721': { lat: 30.2710, lng: -97.6880 }, // East
      '78722': { lat: 30.2800, lng: -97.7150 }, // East Central
      '78723': { lat: 30.3080, lng: -97.6890 }, // Northeast
      '78724': { lat: 30.2890, lng: -97.6770 }, // East
      '78727': { lat: 30.4280, lng: -97.7100 }, // North
      '78728': { lat: 30.4400, lng: -97.6800 }, // North
      '78729': { lat: 30.4480, lng: -97.7700 }, // Northwest
      '78730': { lat: 30.3600, lng: -97.8200 }, // West
      '78731': { lat: 30.3500, lng: -97.7700 }, // Northwest
      '78741': { lat: 30.2300, lng: -97.7200 }, // Southeast
      '78744': { lat: 30.2000, lng: -97.7300 }, // Southeast
      '78745': { lat: 30.2070, lng: -97.7970 }, // South
      '78746': { lat: 30.2640, lng: -97.8080 }, // West Lake Hills
      '78748': { lat: 30.1710, lng: -97.8280 }, // Southwest
      '78749': { lat: 30.2150, lng: -97.8550 }, // Southwest
      '78753': { lat: 30.3700, lng: -97.6750 }, // North
      '78758': { lat: 30.3770, lng: -97.7100 }, // North
      '78759': { lat: 30.4100, lng: -97.7500 }, // North
    };
    
    if (mockCoords[zip]) {
      const coords = mockCoords[zip];
      cache[address] = {
        lat: coords.lat,
        lng: coords.lng,
        timestamp: new Date().toISOString()
      };
      return coords;
    }
  }
  
  return null;
}

async function main() {
  console.log('🌍 Geocoding and regionizing resources...\n');
  
  try {
    // Load data
    const processedPath = path.join(process.cwd(), 'data/resources.processed.json');
    const resources: Partial<TResource>[] = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
    const zipRegions = loadZipRegions();
    const cache = loadCache();
    
    console.log(`📍 Processing ${resources.length} resources`);
    console.log(`🗺️ ZIP regions loaded: ${Object.keys(zipRegions).length} regions`);
    
    let geocoded = 0;
    let regionized = 0;
    
    // Process each resource
    for (const resource of resources) {
      // Try to determine region from ZIP first
      if (resource.zip) {
        const region = determineRegionFromZip(resource.zip, zipRegions);
        if (region) {
          resource.region = region;
          regionized++;
        }
      }
      
      // Geocode if we have an address
      if (resource.address) {
        const coords = await geocodeAddress(resource.address, cache);
        if (coords) {
          resource.coordinates = coords;
          geocoded++;
          
          // If no region from ZIP, determine from coordinates
          if (!resource.region) {
            resource.region = determineRegionFromCoordinates(coords.lat, coords.lng);
            regionized++;
          }
        }
      }
      
      // Fallback to central if no region determined
      if (!resource.region) {
        resource.region = 'central';
      }
    }
    
    // Save cache
    saveCache(cache);
    console.log(`💾 Saved geocoding cache with ${Object.keys(cache).length} entries`);
    
    // Save enriched data
    const enrichedPath = path.join(process.cwd(), 'data/resources.enriched.json');
    fs.writeFileSync(enrichedPath, JSON.stringify(resources, null, 2));
    console.log(`\n✅ Enriched data saved to: ${enrichedPath}`);
    
    // Print statistics
    console.log('\n📊 Statistics:');
    console.log(`   Geocoded: ${geocoded}/${resources.length} resources`);
    console.log(`   Regionized: ${regionized}/${resources.length} resources`);
    
    // Count by region
    const regionCounts: Record<string, number> = {};
    for (const resource of resources) {
      const region = resource.region || 'unknown';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    }
    
    console.log('\n🗺️ Resources by region:');
    for (const [region, count] of Object.entries(regionCounts)) {
      console.log(`   ${region}: ${count} resources`);
    }
    
  } catch (error) {
    console.error('❌ Processing failed:', error);
    process.exit(1);
  }
}

main();