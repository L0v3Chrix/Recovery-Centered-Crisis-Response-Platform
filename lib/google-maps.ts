import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMapsLocation, GooglePlacesResult, GeocodeResult } from '@/types/api'
import { UserLocation } from '@/types/api'

let loader: Loader | null = null
let googleMaps: any = null

// Initialize Google Maps loader
export function initializeGoogleMapsLoader(): Loader {
  if (!loader) {
    loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places', 'geometry']
    })
  }
  return loader
}

// Load Google Maps API
export async function loadGoogleMaps(): Promise<any> {
  if (googleMaps) return googleMaps

  const loader = initializeGoogleMapsLoader()
  
  try {
    googleMaps = await loader.load()
    return googleMaps
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    throw error
  }
}

// Create a map instance
export async function createMap(containerId: string, center?: GoogleMapsLocation): Promise<any> {
  const google = await loadGoogleMaps()
  
  const defaultCenter = center || { lat: 30.2672, lng: -97.7431 } // Austin, TX
  
  return new google.maps.Map(document.getElementById(containerId)!, {
    zoom: 12,
    center: defaultCenter,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    styles: [
      // Simplified map style for better readability
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  })
}

// Geocode an address to coordinates
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const google = await loadGoogleMaps()
  const geocoder = new google.maps.Geocoder()
  
  try {
    const response = await geocoder.geocode({ address })
    
    if (response.results && response.results.length > 0) {
      const result = response.results[0]
      return {
        address: address,
        location: {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        },
        formatted_address: result.formatted_address,
        address_components: result.address_components
      }
    }
    
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

// Reverse geocode coordinates to address
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const google = await loadGoogleMaps()
  const geocoder = new google.maps.Geocoder()
  
  try {
    const response = await geocoder.geocode({
      location: { lat, lng }
    })
    
    if (response.results && response.results.length > 0) {
      return response.results[0].formatted_address
    }
    
    return null
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}

// Calculate distance between two points
export async function calculateDistance(
  origin: GoogleMapsLocation,
  destination: GoogleMapsLocation,
  travelMode?: any
): Promise<any> {
  const google = await loadGoogleMaps()
  const service = new google.maps.DistanceMatrixService()
  
  try {
    const response = await service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: travelMode || google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL, // Use miles
      avoidHighways: false,
      avoidTolls: false
    })
    
    return response
  } catch (error) {
    console.error('Distance calculation error:', error)
    return null
  }
}

// Get directions between two points
export function getDirectionsUrl(destination: string, origin?: string): string {
  const baseUrl = 'https://www.google.com/maps/dir/'
  const encodedDestination = encodeURIComponent(destination)
  
  if (origin) {
    const encodedOrigin = encodeURIComponent(origin)
    return `${baseUrl}${encodedOrigin}/${encodedDestination}`
  }
  
  // If no origin provided, Google Maps will use current location
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`
}

// Search for places nearby
export async function searchNearbyPlaces(
  location: GoogleMapsLocation,
  radius: number,
  type: string
): Promise<GooglePlacesResult[]> {
  const google = await loadGoogleMaps()
  
  // Create a map (required for PlacesService)
  const mapDiv = document.createElement('div')
  const map = new google.maps.Map(mapDiv, {
    center: location,
    zoom: 15
  })
  
  const service = new google.maps.places.PlacesService(map)
  
  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: location,
      radius: radius * 1609.34, // Convert miles to meters
      type: type as any
    }, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const placesResults: GooglePlacesResult[] = results.map((place: any) => ({
          place_id: place.place_id!,
          name: place.name!,
          formatted_address: place.vicinity!,
          geometry: {
            location: {
              lat: place.geometry!.location!.lat(),
              lng: place.geometry!.location!.lng()
            }
          },
          opening_hours: place.opening_hours ? {
            open_now: place.opening_hours.open_now || false,
            periods: []
          } : undefined,
          formatted_phone_number: place.formatted_phone_number,
          website: place.website,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total
        }))
        resolve(placesResults)
      } else {
        reject(new Error(`Places search failed: ${status}`))
      }
    })
  })
}

// Get current user location
export async function getCurrentLocation(
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000 // 5 minutes
  }
): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLocation: UserLocation = {
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }

        // Try to get address
        try {
          const address = await reverseGeocode(
            userLocation.coordinates.lat,
            userLocation.coordinates.lng
          )
          if (address) {
            userLocation.address = address
            // Extract city and state from address
            const parts = address.split(', ')
            if (parts.length >= 3) {
              userLocation.city = parts[parts.length - 3]
              const stateZip = parts[parts.length - 2]
              userLocation.state = stateZip.split(' ')[0]
            }
          }
        } catch (error) {
          console.warn('Could not reverse geocode location:', error)
        }

        resolve(userLocation)
      },
      (error) => {
        reject(error)
      },
      options
    )
  })
}

// Batch geocode multiple addresses
export async function batchGeocode(addresses: string[]): Promise<(GeocodeResult | null)[]> {
  const results: (GeocodeResult | null)[] = []
  
  // Process in batches to avoid rate limits
  const BATCH_SIZE = 5
  const DELAY_BETWEEN_BATCHES = 200 // milliseconds
  
  for (let i = 0; i < addresses.length; i += BATCH_SIZE) {
    const batch = addresses.slice(i, i + BATCH_SIZE)
    
    const batchPromises = batch.map(async (address) => {
      try {
        return await geocodeAddress(address)
      } catch (error) {
        console.error(`Error geocoding ${address}:`, error)
        return null
      }
    })
    
    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)
    
    // Delay between batches
    if (i + BATCH_SIZE < addresses.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES))
    }
  }
  
  return results
}