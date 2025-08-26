'use client'

import { useState, useEffect } from 'react'
import { UserLocation } from '@/types/api'
import { getCurrentLocation } from '@/lib/google-maps'

interface UseLocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  watchPosition?: boolean
}

interface UseLocationReturn {
  location: UserLocation | null
  loading: boolean
  error: string | null
  requestLocation: () => void
  clearLocation: () => void
  hasPermission: boolean | null
}

export function useLocation(options: UseLocationOptions = {}): UseLocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [watchId, setWatchId] = useState<number | null>(null)

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    watchPosition = false
  } = options

  // Check permission status on mount
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setHasPermission(result.state === 'granted')
        
        // Listen for permission changes
        result.onchange = () => {
          setHasPermission(result.state === 'granted')
          if (result.state === 'denied') {
            setLocation(null)
            setError('Location permission denied')
          }
        }
      })
    }

    // Check localStorage for saved permission status
    const savedPermission = localStorage.getItem('location-permission')
    if (savedPermission) {
      setHasPermission(savedPermission === 'granted')
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [])

  const positionOptions: PositionOptions = {
    enableHighAccuracy,
    timeout,
    maximumAge
  }

  const handleLocationUpdate = async (userLocation: UserLocation) => {
    setLocation(userLocation)
    setLoading(false)
    setError(null)
    setHasPermission(true)
    localStorage.setItem('location-permission', 'granted')
  }

  const handleLocationError = (err: GeolocationPositionError) => {
    setLoading(false)
    setHasPermission(false)
    localStorage.setItem('location-permission', 'denied')
    
    let errorMessage: string
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = 'Location access was denied. Please enable location services in your browser settings.'
        break
      case err.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable. Please check your internet connection.'
        break
      case err.TIMEOUT:
        errorMessage = 'Location request timed out. Please try again.'
        break
      default:
        errorMessage = 'An unknown error occurred while retrieving your location.'
        break
    }
    
    setError(errorMessage)
  }

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const userLocation = await getCurrentLocation(positionOptions)
      await handleLocationUpdate(userLocation)

      // Start watching position if requested
      if (watchPosition && !watchId) {
        const id = navigator.geolocation.watchPosition(
          async (position) => {
            const updatedLocation: UserLocation = {
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
            }
            
            // Only update if location changed significantly (more than 100 meters)
            if (location) {
              const distance = calculateDistance(
                location.coordinates.lat,
                location.coordinates.lng,
                updatedLocation.coordinates.lat,
                updatedLocation.coordinates.lng
              )
              
              if (distance > 0.06) { // ~100 meters
                await handleLocationUpdate(updatedLocation)
              }
            } else {
              await handleLocationUpdate(updatedLocation)
            }
          },
          handleLocationError,
          positionOptions
        )
        setWatchId(id)
      }
    } catch (err) {
      if (err instanceof Error) {
        handleLocationError({
          code: 3,
          message: err.message,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        } as GeolocationPositionError)
      }
    }
  }

  const clearLocation = () => {
    setLocation(null)
    setError(null)
    setHasPermission(null)
    localStorage.removeItem('location-permission')
    
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
  }

  // Helper function to calculate distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180)
  }

  return {
    location,
    loading,
    error,
    requestLocation,
    clearLocation,
    hasPermission
  }
}

// Hook specifically for Travis County detection
export function useTravisCountyDetection() {
  const { location, ...rest } = useLocation()
  
  const isInTravisCounty = (userLocation: UserLocation | null): boolean => {
    if (!userLocation) return false
    
    const { lat, lng } = userLocation.coordinates
    
    // Approximate Travis County bounds
    const travisCountyBounds = {
      north: 30.5168,
      south: 30.0173,
      east: -97.3429,
      west: -97.9383
    }
    
    return (
      lat >= travisCountyBounds.south &&
      lat <= travisCountyBounds.north &&
      lng >= travisCountyBounds.west &&
      lng <= travisCountyBounds.east
    )
  }
  
  return {
    location,
    isInTravisCounty: isInTravisCounty(location),
    isInServiceArea: isInTravisCounty(location), // For now, service area is Travis County
    ...rest
  }
}