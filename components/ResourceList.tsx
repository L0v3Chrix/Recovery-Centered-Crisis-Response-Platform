'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Clock } from 'lucide-react'
import ResourceCard from './ResourceCard'
import { Resource, ResourceCategory, SearchFilters } from '@/types/resources'
import { searchResources } from '@/src/lib/resources'

interface ResourceListProps {
  category?: ResourceCategory
  initialResources?: Resource[]
  showSearch?: boolean
  showFilters?: boolean
  userLocation?: { lat: number, lng: number }
  className?: string
}

export default function ResourceList({ 
  category, 
  initialResources = [], 
  showSearch = true, 
  showFilters = true,
  userLocation,
  className = '' 
}: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    category,
    location: userLocation ? { ...userLocation, radius: 25 } : undefined
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [showWalkInsOnly, setShowWalkInsOnly] = useState(false)

  // Load resources when filters change
  useEffect(() => {
    setIsLoading(true)
    
    const searchFilters: SearchFilters = {
      ...filters,
      isOpenNow: showOpenOnly || undefined,
      acceptsWalkIns: showWalkInsOnly || undefined
    }

    const results = searchResources(searchFilters)
    let filteredResources = results.map((match: any) => match.resource)

    // Apply text search
    if (searchTerm) {
      filteredResources = filteredResources.filter((resource: Resource) => 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.services.some((service: string) => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    setResources(filteredResources)
    setIsLoading(false)
  }, [filters, searchTerm, showOpenOnly, showWalkInsOnly])

  const calculateDistance = (resource: Resource) => {
    if (!userLocation) return undefined
    
    const R = 3959 // Earth's radius in miles
    const dLat = deg2rad(resource.coordinates.lat - userLocation.lat)
    const dLon = deg2rad(resource.coordinates.lng - userLocation.lng)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userLocation.lat)) * Math.cos(deg2rad(resource.coordinates.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180)
  }

  return (
    <div className={`resource-list ${className}`}>
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Filter Buttons */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={showOpenOnly}
                onClick={() => setShowOpenOnly(!showOpenOnly)}
                icon={<Clock className="w-4 h-4" />}
                label="Open Now"
              />
              
              <FilterButton
                active={showWalkInsOnly}
                onClick={() => setShowWalkInsOnly(!showWalkInsOnly)}
                icon={<MapPin className="w-4 h-4" />}
                label="Walk-ins Welcome"
              />
              
              {userLocation && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filters.location?.radius || 25}
                    onChange={(e) => setFilters({
                      ...filters,
                      location: userLocation ? { ...userLocation, radius: Number(e.target.value) } : undefined
                    })}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value={5}>Within 5 miles</option>
                    <option value={10}>Within 10 miles</option>
                    <option value={25}>Within 25 miles</option>
                    <option value={50}>Within 50 miles</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && (
        <div className="mb-4 text-sm text-gray-600">
          {resources.length === 0 
            ? 'No resources found matching your criteria'
            : `${resources.length} resource${resources.length === 1 ? '' : 's'} found`
          }
        </div>
      )}

      {/* Resource Cards */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            showDistance={!!userLocation}
            distance={calculateDistance(resource)}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && resources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No resources found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your filters or search terms to find more resources.
          </p>
        </div>
      )}
    </div>
  )
}

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}