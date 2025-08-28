// Geographical utilities for Austin area mapping and ZIP code processing

export type AustinArea = 'north' | 'south' | 'east' | 'west' | 'central' | 'other'

export interface ZIPMapping {
  zipCode: string
  area: AustinArea
  neighborhood?: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Austin ZIP code to area mapping based on research
export const AUSTIN_ZIP_MAPPING: Record<string, ZIPMapping> = {
  // North Austin
  '78753': { zipCode: '78753', area: 'north', neighborhood: 'North Lamar', coordinates: { lat: 30.3572, lng: -97.6981 } },
  '78758': { zipCode: '78758', area: 'north', neighborhood: 'North Austin', coordinates: { lat: 30.4168, lng: -97.6981 } },
  '78759': { zipCode: '78759', area: 'north', neighborhood: 'Northwest Austin', coordinates: { lat: 30.4057, lng: -97.7431 } },
  '78757': { zipCode: '78757', area: 'north', neighborhood: 'Crestview', coordinates: { lat: 30.3423, lng: -97.7431 } },
  '78752': { zipCode: '78752', area: 'north', neighborhood: 'North Loop', coordinates: { lat: 30.3212, lng: -97.7089 } },
  '78754': { zipCode: '78754', area: 'north', neighborhood: 'Pflugerville', coordinates: { lat: 30.4399, lng: -97.6200 } },

  // South Austin  
  '78704': { zipCode: '78704', area: 'south', neighborhood: 'South Austin', coordinates: { lat: 30.2240, lng: -97.7594 } },
  '78745': { zipCode: '78745', area: 'south', neighborhood: 'Sunset Valley', coordinates: { lat: 30.2057, lng: -97.8089 } },
  '78748': { zipCode: '78748', area: 'south', neighborhood: 'South Lamar', coordinates: { lat: 30.1943, lng: -97.8200 } },
  '78749': { zipCode: '78749', area: 'south', neighborhood: 'Circle C', coordinates: { lat: 30.1770, lng: -97.8436 } },
  '78741': { zipCode: '78741', area: 'south', neighborhood: 'South First', coordinates: { lat: 30.2240, lng: -97.7431 } },
  '78742': { zipCode: '78742', area: 'south', neighborhood: 'Del Valle', coordinates: { lat: 30.1770, lng: -97.6500 } },

  // East Austin
  '78702': { zipCode: '78702', area: 'east', neighborhood: 'East Cesar Chavez', coordinates: { lat: 30.2586, lng: -97.7089 } },
  '78721': { zipCode: '78721', area: 'east', neighborhood: 'East Austin', coordinates: { lat: 30.2929, lng: -97.6714 } },
  '78722': { zipCode: '78722', area: 'east', neighborhood: 'Mueller', coordinates: { lat: 30.2929, lng: -97.6981 } },
  '78723': { zipCode: '78723', area: 'east', neighborhood: 'Georgian Acres', coordinates: { lat: 30.3126, lng: -97.6714 } },
  '78724': { zipCode: '78724', area: 'east', neighborhood: 'Govalle', coordinates: { lat: 30.2586, lng: -97.6714 } },
  '78725': { zipCode: '78725', area: 'east', neighborhood: 'Montopolis', coordinates: { lat: 30.2240, lng: -97.6500 } },

  // West Austin
  '78703': { zipCode: '78703', area: 'west', neighborhood: 'Tarrytown', coordinates: { lat: 30.2929, lng: -97.7594 } },
  '78731': { zipCode: '78731', area: 'west', neighborhood: 'Northwest Hills', coordinates: { lat: 30.3572, lng: -97.7594 } },
  '78733': { zipCode: '78733', area: 'west', neighborhood: 'Steiner Ranch', coordinates: { lat: 30.4057, lng: -97.8436 } },
  '78734': { zipCode: '78734', area: 'west', neighborhood: 'Lakeway', coordinates: { lat: 30.3666, lng: -97.9781 } },
  '78735': { zipCode: '78735', area: 'west', neighborhood: 'Barton Creek', coordinates: { lat: 30.2586, lng: -97.8436 } },
  '78736': { zipCode: '78736', area: 'west', neighborhood: 'Bee Cave', coordinates: { lat: 30.3126, lng: -97.9434 } },
  '78738': { zipCode: '78738', area: 'west', neighborhood: 'Bee Cave Road', coordinates: { lat: 30.3212, lng: -97.8989 } },
  '78746': { zipCode: '78746', area: 'west', neighborhood: 'West Lake Hills', coordinates: { lat: 30.2929, lng: -97.8200 } },

  // Central Austin
  '78701': { zipCode: '78701', area: 'central', neighborhood: 'Downtown', coordinates: { lat: 30.2695, lng: -97.7398 } },
  '78705': { zipCode: '78705', area: 'central', neighborhood: 'University of Texas', coordinates: { lat: 30.2849, lng: -97.7341 } },
  '78712': { zipCode: '78712', area: 'central', neighborhood: 'UT Campus', coordinates: { lat: 30.2849, lng: -97.7341 } },
  '78751': { zipCode: '78751', area: 'central', neighborhood: 'Hyde Park', coordinates: { lat: 30.3072, lng: -97.7278 } },
  '78756': { zipCode: '78756', area: 'central', neighborhood: 'Brentwood', coordinates: { lat: 30.3126, lng: -97.7278 } }
}

/**
 * Extract ZIP code from address string
 */
export function extractZIPFromAddress(address: string): string | null {
  // Match 5-digit ZIP codes at the end of address strings
  const zipMatch = address.match(/\b(\d{5})\b(?:\s|$)/g)
  return zipMatch ? zipMatch[zipMatch.length - 1].trim() : null
}

/**
 * Get Austin area from ZIP code
 */
export function getAreaFromZIP(zipCode: string): AustinArea {
  const mapping = AUSTIN_ZIP_MAPPING[zipCode]
  return mapping ? mapping.area : 'other'
}

/**
 * Get coordinates from ZIP code
 */
export function getCoordinatesFromZIP(zipCode: string): { lat: number, lng: number } | null {
  const mapping = AUSTIN_ZIP_MAPPING[zipCode]
  return mapping ? mapping.coordinates : null
}

/**
 * Get area center coordinates for quiz location matching
 */
export function getAreaCenterCoordinates(area: AustinArea): { lat: number, lng: number } {
  const centerCoordinates: Record<AustinArea, { lat: number, lng: number }> = {
    north: { lat: 30.3572, lng: -97.7278 },     // North Austin center
    south: { lat: 30.2240, lng: -97.7594 },     // South Austin center  
    east: { lat: 30.2586, lng: -97.6981 },      // East Austin center
    west: { lat: 30.3126, lng: -97.8436 },      // West Austin center
    central: { lat: 30.2849, lng: -97.7398 },   // Central Austin center
    other: { lat: 30.2672, lng: -97.7431 }      // Default Austin center
  }
  
  return centerCoordinates[area]
}

/**
 * Calculate distance between two coordinates in miles
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180)
}

/**
 * Parse address components for better geographical understanding
 */
export function parseAddressComponents(address: string): {
  streetNumber?: string
  streetName?: string
  city?: string
  state?: string
  zipCode?: string
} {
  // Basic address parsing - can be enhanced with more sophisticated logic
  const zipCode = extractZIPFromAddress(address)
  
  // Try to extract city and state
  const cityStateMatch = address.match(/,\s*([^,]+),?\s*(TX|Texas)\s*\d{5}?/i)
  const city = cityStateMatch ? cityStateMatch[1].trim() : null
  const state = cityStateMatch ? 'TX' : null
  
  return {
    zipCode: zipCode || undefined,
    city: city || undefined,
    state: state || undefined
  }
}

/**
 * Enhance resource with geographical data
 */
export function enhanceResourceWithGeoData(resource: any): any {
  if (!resource.address) return resource
  
  const zipCode = extractZIPFromAddress(resource.address)
  if (!zipCode) return resource
  
  const area = getAreaFromZIP(zipCode)
  const coordinates = getCoordinatesFromZIP(zipCode)
  
  return {
    ...resource,
    area,
    zipCode,
    coordinates: coordinates || resource.coordinates // Keep existing coordinates as fallback
  }
}