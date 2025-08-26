'use client'

import { useState, useEffect, useMemo } from 'react'
import { Resource, ResourceCategory, RecoveryStage, SearchFilters, ResourceMatch } from '@/types/resources'
import { UserLocation } from '@/types/api'
import { searchResources, getResourcesByCategory } from '@/lib/database'
import { searchTreatmentFacilities, convertSAMHSAToResource } from '@/lib/samhsa-api'

interface UseResourceSearchOptions {
  category?: ResourceCategory
  initialRadius?: number
  enableSAMHSAIntegration?: boolean
  autoSearch?: boolean
}

interface UseResourceSearchReturn {
  resources: Resource[]
  loading: boolean
  error: string | null
  filters: SearchFilters
  updateFilters: (updates: Partial<SearchFilters>) => void
  resetFilters: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  totalResults: number
  hasResults: boolean
  refreshResources: () => Promise<void>
}

export function useResourceSearch(
  userLocation: UserLocation | null,
  options: UseResourceSearchOptions = {}
): UseResourceSearchReturn {
  const {
    category,
    initialRadius = 25,
    enableSAMHSAIntegration = true,
    autoSearch = true
  } = options

  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [samhsaResources, setSamhsaResources] = useState<Resource[]>([])

  // Initialize filters
  const [filters, setFilters] = useState<SearchFilters>({
    category,
    location: userLocation ? {
      lat: userLocation.coordinates.lat,
      lng: userLocation.coordinates.lng,
      radius: initialRadius
    } : undefined
  })

  // Update location in filters when user location changes
  useEffect(() => {
    if (userLocation) {
      setFilters(prev => ({
        ...prev,
        location: {
          lat: userLocation.coordinates.lat,
          lng: userLocation.coordinates.lng,
          radius: prev.location?.radius || initialRadius
        }
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        location: undefined
      }))
    }
  }, [userLocation, initialRadius])

  // Fetch SAMHSA resources when location is available
  useEffect(() => {
    if (enableSAMHSAIntegration && userLocation && (category === ResourceCategory.RECOVERY || !category)) {
      fetchSAMHSAResources()
    }
  }, [userLocation, category, enableSAMHSAIntegration])

  const fetchSAMHSAResources = async () => {
    if (!userLocation) return

    try {
      const facilities = await searchTreatmentFacilities({
        latitude: userLocation.coordinates.lat,
        longitude: userLocation.coordinates.lng,
        radius: filters.location?.radius || initialRadius,
        limit: 20
      })

      const converted = facilities.map(convertSAMHSAToResource)
      setSamhsaResources(converted)
    } catch (error) {
      console.error('Error fetching SAMHSA resources:', error)
      // Don't set error state - SAMHSA failure shouldn't break the app
    }
  }

  // Main search function
  const searchAndFilter = useMemo(() => {
    return async (): Promise<Resource[]> => {
      setError(null)
      
      try {
        // Get local resources
        const localMatches = searchResources(filters)
        let allResources = localMatches.map(match => match.resource)

        // Add SAMHSA resources if applicable
        if (enableSAMHSAIntegration && (category === ResourceCategory.RECOVERY || !category)) {
          // Filter SAMHSA resources by current filters
          const filteredSAMHSA = samhsaResources.filter(resource => {
            if (filters.isOpenNow && !isResourceOpenNow(resource)) return false
            if (filters.acceptsWalkIns !== undefined && resource.acceptsWalkIns !== filters.acceptsWalkIns) return false
            if (filters.recoveryStage && !resource.recoveryStage.includes(filters.recoveryStage)) return false
            return true
          })

          allResources = [...allResources, ...filteredSAMHSA]
        }

        // Apply text search
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase().trim()
          allResources = allResources.filter(resource => 
            resource.name.toLowerCase().includes(term) ||
            resource.description.toLowerCase().includes(term) ||
            resource.services.some(service => service.toLowerCase().includes(term)) ||
            resource.address.toLowerCase().includes(term)
          )
        }

        // Remove duplicates (by name and address)
        const uniqueResources = allResources.filter((resource, index, self) =>
          index === self.findIndex(r => 
            r.name === resource.name && r.address === resource.address
          )
        )

        // Sort by relevance/distance
        if (userLocation) {
          uniqueResources.sort((a, b) => {
            const distA = calculateDistance(
              userLocation.coordinates.lat,
              userLocation.coordinates.lng,
              a.coordinates.lat,
              a.coordinates.lng
            )
            const distB = calculateDistance(
              userLocation.coordinates.lat,
              userLocation.coordinates.lng,
              b.coordinates.lat,
              b.coordinates.lng
            )

            // Prioritize open resources
            const aOpen = isResourceOpenNow(a)
            const bOpen = isResourceOpenNow(b)
            
            if (aOpen && !bOpen) return -1
            if (!aOpen && bOpen) return 1

            // Then sort by distance
            return distA - distB
          })
        }

        return uniqueResources
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching')
        return []
      }
    }
  }, [filters, searchTerm, samhsaResources, userLocation, category, enableSAMHSAIntegration])

  // Execute search when filters or search term changes
  useEffect(() => {
    if (!autoSearch) return

    const performSearch = async () => {
      setLoading(true)
      const results = await searchAndFilter()
      setResources(results)
      setLoading(false)
    }

    performSearch()
  }, [searchAndFilter, autoSearch])

  // Helper functions
  const isResourceOpenNow = (resource: Resource): boolean => {
    if (resource.isOpen24Hours) return true

    const now = new Date()
    const dayOfWeek = now.getDay()
    const currentTime = now.getHours() * 100 + now.getMinutes()

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const todayHours = resource.hours[dayNames[dayOfWeek] as keyof typeof resource.hours]

    // Check if todayHours is a DayHours object
    if (!todayHours || typeof todayHours === 'boolean' || Array.isArray(todayHours)) return false
    if ('isClosed' in todayHours && todayHours.isClosed) return false

    const openTime = parseTime(todayHours.open)
    const closeTime = parseTime(todayHours.close)

    return currentTime >= openTime && currentTime <= closeTime
  }

  const parseTime = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 100 + minutes
  }

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

  // Public methods
  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }

  const resetFilters = () => {
    setFilters({
      category,
      location: userLocation ? {
        lat: userLocation.coordinates.lat,
        lng: userLocation.coordinates.lng,
        radius: initialRadius
      } : undefined
    })
    setSearchTerm('')
  }

  const refreshResources = async () => {
    setLoading(true)
    
    // Refresh SAMHSA data if applicable
    if (enableSAMHSAIntegration && userLocation && (category === ResourceCategory.RECOVERY || !category)) {
      await fetchSAMHSAResources()
    }

    const results = await searchAndFilter()
    setResources(results)
    setLoading(false)
  }

  return {
    resources,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    searchTerm,
    setSearchTerm,
    totalResults: resources.length,
    hasResults: resources.length > 0,
    refreshResources
  }
}

// Specialized hook for crisis resources
export function useCrisisResources(userLocation: UserLocation | null) {
  return useResourceSearch(userLocation, {
    category: ResourceCategory.CRISIS,
    enableSAMHSAIntegration: false, // Crisis resources are local
    initialRadius: 50 // Wider radius for crisis resources
  })
}

// Specialized hook for recovery resources with SAMHSA integration
export function useRecoveryResources(userLocation: UserLocation | null) {
  return useResourceSearch(userLocation, {
    category: ResourceCategory.RECOVERY,
    enableSAMHSAIntegration: true,
    initialRadius: 25
  })
}