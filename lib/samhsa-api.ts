import { SAMHSAFacility, SAMHSAResponse } from '@/types/api'
import { Resource, ResourceCategory, RecoveryStage } from '@/types/resources'

const SAMHSA_BASE_URL = 'https://findtreatment.samhsa.gov/api'

export interface SAMHSASearchParams {
  latitude: number
  longitude: number
  radius?: number // in miles, default 25
  serviceType?: string
  category?: string
  limit?: number
}

export async function searchTreatmentFacilities(params: SAMHSASearchParams): Promise<SAMHSAFacility[]> {
  const {
    latitude,
    longitude,
    radius = 25,
    serviceType,
    category,
    limit = 50
  } = params

  try {
    const queryParams = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
      radius: radius.toString(),
      limit: limit.toString()
    })

    if (serviceType) queryParams.append('serviceType', serviceType)
    if (category) queryParams.append('category', category)

    const response = await fetch(`${SAMHSA_BASE_URL}/facilities?${queryParams}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Add cache for better performance
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`SAMHSA API error: ${response.status} ${response.statusText}`)
    }

    const data: SAMHSAResponse = await response.json()
    return data.facilities || []

  } catch (error) {
    console.error('Error fetching SAMHSA facilities:', error)
    return []
  }
}

export function convertSAMHSAToResource(facility: SAMHSAFacility): Resource {
  // Map SAMHSA services to our recovery stages
  const mapRecoveryStages = (services: string[]): RecoveryStage[] => {
    const stages: RecoveryStage[] = []
    
    if (services.some(s => s.toLowerCase().includes('detox'))) {
      stages.push(RecoveryStage.DETOX)
    }
    
    if (services.some(s => s.toLowerCase().includes('residential') || s.toLowerCase().includes('inpatient'))) {
      stages.push(RecoveryStage.TREATMENT)
    }
    
    if (services.some(s => s.toLowerCase().includes('outpatient'))) {
      stages.push(RecoveryStage.TREATMENT, RecoveryStage.EARLY_RECOVERY)
    }
    
    if (services.some(s => s.toLowerCase().includes('maintenance') || s.toLowerCase().includes('methadone') || s.toLowerCase().includes('suboxone'))) {
      stages.push(RecoveryStage.MAINTENANCE)
    }
    
    if (services.some(s => s.toLowerCase().includes('support') || s.toLowerCase().includes('group'))) {
      stages.push(RecoveryStage.SUPPORT)
    }

    // Default to treatment if no specific stages found
    if (stages.length === 0) {
      stages.push(RecoveryStage.TREATMENT)
    }

    return stages
  }

  // Extract services from SAMHSA data
  const services = facility.services?.map(s => s.name) || []
  
  return {
    id: `samhsa-${facility.name1.replace(/\s+/g, '-').toLowerCase()}`,
    name: facility.name1,
    description: `Treatment facility offering ${services.slice(0, 3).join(', ')}${services.length > 3 ? ' and more' : ''}`,
    category: ResourceCategory.RECOVERY,
    address: `${facility.address1}, ${facility.city}, ${facility.state} ${facility.zip}`,
    phone: facility.phone || 'Call for information',
    website: facility.website_url,
    hours: {
      // SAMHSA doesn't provide hours, so we'll set general business hours
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' }
    },
    eligibility: facility.categories || ['Adults seeking treatment'],
    services,
    recoveryStage: mapRecoveryStages(services),
    lastVerified: new Date(),
    coordinates: {
      lat: facility.latitude,
      lng: facility.longitude
    },
    acceptsWalkIns: false, // SAMHSA doesn't specify, assume appointment needed
    languages: facility.languages || ['English']
  }
}

// Search for specific types of treatment
export async function searchDetoxFacilities(lat: number, lng: number, radius = 25): Promise<Resource[]> {
  const facilities = await searchTreatmentFacilities({
    latitude: lat,
    longitude: lng,
    radius,
    serviceType: 'detoxification'
  })
  
  return facilities.map(convertSAMHSAToResource)
}

export async function searchMATPProviders(lat: number, lng: number, radius = 25): Promise<Resource[]> {
  const facilities = await searchTreatmentFacilities({
    latitude: lat,
    longitude: lng,
    radius,
    serviceType: 'medication_assisted_treatment'
  })
  
  return facilities.map(convertSAMHSAToResource)
}

export async function searchOutpatientTreatment(lat: number, lng: number, radius = 25): Promise<Resource[]> {
  const facilities = await searchTreatmentFacilities({
    latitude: lat,
    longitude: lng,
    radius,
    serviceType: 'outpatient'
  })
  
  return facilities.map(convertSAMHSAToResource)
}

// Get facilities by Travis County (Austin area)
export async function getTravisCountyTreatmentFacilities(): Promise<Resource[]> {
  // Austin coordinates
  const austinLat = 30.2672
  const austinLng = -97.7431
  
  const facilities = await searchTreatmentFacilities({
    latitude: austinLat,
    longitude: austinLng,
    radius: 30, // Cover Travis County
    limit: 100
  })
  
  return facilities.map(convertSAMHSAToResource)
}