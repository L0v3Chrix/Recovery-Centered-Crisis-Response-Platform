'use client'

import { useState, useEffect } from 'react'
import { MapPin, X, Navigation, AlertCircle } from 'lucide-react'

interface UserLocation {
  lat: number
  lng: number
  accuracy?: number
  address?: string
}

interface LocationPromptProps {
  onLocationUpdate?: (location: UserLocation | null) => void
  className?: string
}

export default function LocationPrompt({ onLocationUpdate, className = '' }: LocationPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if location was previously requested/denied
    const locationPermission = localStorage.getItem('location-permission')
    const locationDismissed = localStorage.getItem('location-dismissed')
    
    if (locationPermission !== 'denied' && !locationDismissed && !location) {
      // Show prompt after a short delay
      setTimeout(() => setShowPrompt(true), 2000)
    }
  }, [location])

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Location services are not supported by your device')
      return
    }

    setLoading(true)
    setError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLocation: UserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        }

        // Try to get address from coordinates (reverse geocoding)
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          )
          const data = await response.json()
          
          if (data.results && data.results[0]) {
            userLocation.address = data.results[0].formatted_address
          }
        } catch (error) {
          console.log('Reverse geocoding failed:', error)
          // Continue without address
        }

        setLocation(userLocation)
        setShowPrompt(false)
        setLoading(false)
        localStorage.setItem('location-permission', 'granted')
        
        if (onLocationUpdate) {
          onLocationUpdate(userLocation)
        }
      },
      (error) => {
        setLoading(false)
        localStorage.setItem('location-permission', 'denied')
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access was denied. You can enable it in your browser settings.')
            break
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.')
            break
          case error.TIMEOUT:
            setError('Location request timed out. Please try again.')
            break
          default:
            setError('An error occurred while retrieving your location.')
            break
        }
      },
      options
    )
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('location-dismissed', 'true')
  }

  const handleEnableLocation = () => {
    // Clear dismissed status and request location
    localStorage.removeItem('location-dismissed')
    localStorage.removeItem('location-permission')
    requestLocation()
  }

  // If user has location, show current location info
  if (location) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">Location enabled</p>
              <p className="text-sm text-green-600">
                {location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setLocation(null)
              if (onLocationUpdate) onLocationUpdate(null)
              localStorage.removeItem('location-permission')
            }}
            className="text-green-600 hover:text-green-800 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // If there's an error, show error state with retry option
  if (error) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-yellow-800">Location Error</p>
            <p className="text-sm text-yellow-700 mb-3">{error}</p>
            <div className="flex gap-2">
              <button
                onClick={requestLocation}
                className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
              >
                Try Again
              </button>
              <button
                onClick={() => setError(null)}
                className="text-sm text-yellow-600 hover:text-yellow-800 px-3 py-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main location prompt
  if (showPrompt && !dismissed) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Navigation className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-blue-800">Find resources near you</p>
            <p className="text-sm text-blue-700 mb-3">
              Enable location services to see nearby resources and get accurate distances and directions.
            </p>
            <div className="flex gap-2">
              <button
                onClick={requestLocation}
                disabled={loading}
                className={`text-sm px-4 py-2 rounded transition-colors ${
                  loading 
                    ? 'bg-blue-300 text-blue-100 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Getting location...' : 'Enable Location'}
              </button>
              <button
                onClick={handleDismiss}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-2"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-400 hover:text-blue-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Show minimal enable location option if dismissed
  if (dismissed && !location) {
    return (
      <div className={`text-center ${className}`}>
        <button
          onClick={handleEnableLocation}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          <MapPin className="w-4 h-4" />
          Enable location for nearby resources
        </button>
      </div>
    )
  }

  return null
}