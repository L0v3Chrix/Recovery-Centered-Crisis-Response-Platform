'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Clock, Globe, Filter, ChevronDown, CheckCircle } from 'lucide-react'
import { TResource } from '@/types/resource'

interface CategoryResourcesProps {
  category: string
  title: string
  description: string
}

export default function CategoryResources({ category, title, description }: CategoryResourcesProps) {
  const [resources, setResources] = useState<TResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [openNowOnly, setOpenNowOnly] = useState(false)
  
  // Available filter options
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [regions] = useState(['north', 'south', 'east', 'west', 'central'])

  useEffect(() => {
    fetchResources()
    fetchCategoryInfo()
  }, [category, selectedSubcategory, selectedRegion, openNowOnly])

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedSubcategory) params.append('subcategory', selectedSubcategory)
      if (selectedRegion) params.append('region', selectedRegion)
      if (openNowOnly) params.append('openNow', 'true')
      
      const response = await fetch(`/api/resources/${category}?${params}`)
      if (!response.ok) throw new Error('Failed to fetch resources')
      
      const data = await response.json()
      setResources(data.resources)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategoryInfo = async () => {
    try {
      const response = await fetch(`/api/resources/${category}`, {
        method: 'OPTIONS'
      })
      if (response.ok) {
        const data = await response.json()
        setSubcategories(data.subcategories || [])
      }
    } catch (err) {
      console.error('Failed to fetch category info:', err)
    }
  }

  const formatSubcategory = (sub: string) => {
    return sub.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-aurora flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aurora-indigo700"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-aurora flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-aurora-indigo700 text-white px-6 py-2 rounded-lg hover:bg-aurora-indigo800"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aurora">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-aurora-indigo700 mb-2">{title}</h1>
          <p className="text-warm-slate-600">{description}</p>
          <p className="text-sm text-warm-slate-500 mt-2">
            Found {resources.length} resources
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
              <div className="relative">
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-aurora-indigo500"
                >
                  <option value="">All Types</option>
                  {subcategories.map(sub => (
                    <option key={sub} value={sub}>
                      {formatSubcategory(sub)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            )}

            {/* Region Filter */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-aurora-indigo500"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region.charAt(0).toUpperCase() + region.slice(1)} Austin
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Open Now Toggle */}
            <button
              onClick={() => setOpenNowOnly(!openNowOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                openNowOnly 
                  ? 'bg-aurora-emerald500 text-white' 
                  : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Open Now
            </button>

            {/* Clear Filters */}
            {(selectedSubcategory || selectedRegion || openNowOnly) && (
              <button
                onClick={() => {
                  setSelectedSubcategory('')
                  setSelectedRegion('')
                  setOpenNowOnly(false)
                }}
                className="text-sm text-aurora-indigo700 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="container mx-auto px-4 py-8">
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No resources match your filters</p>
            <button
              onClick={() => {
                setSelectedSubcategory('')
                setSelectedRegion('')
                setOpenNowOnly(false)
              }}
              className="mt-4 text-aurora-indigo700 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: TResource }) {
  const isOpen = () => {
    if (!resource.hours) return true
    const hours = resource.hours.toLowerCase()
    if (hours.includes('24 hour') || hours.includes('24/7')) return true
    
    // Simple check - in production you'd want more robust parsing
    const now = new Date()
    const day = now.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase()
    return hours.includes(day) || hours.includes('daily') || hours.includes('every day')
  }

  const open = isOpen()

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-warm-slate-800 mb-1">
          {resource.name}
        </h3>
        {resource.description && (
          <p className="text-sm text-warm-slate-600">{resource.description}</p>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {resource.address && (
          <div className="flex items-start text-sm">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-warm-slate-400 flex-shrink-0" />
            <span className="text-warm-slate-600">{resource.address}</span>
          </div>
        )}

        {resource.phone && (
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-warm-slate-400 flex-shrink-0" />
            <a 
              href={`tel:${resource.phone}`}
              className="text-aurora-indigo700 hover:underline"
            >
              {resource.phone}
            </a>
          </div>
        )}

        {resource.hours && (
          <div className="flex items-start text-sm">
            <Clock className="w-4 h-4 mr-2 mt-0.5 text-warm-slate-400 flex-shrink-0" />
            <div>
              <span className={`${open ? 'text-green-600 font-medium' : 'text-warm-slate-600'}`}>
                {resource.hours}
              </span>
              {open && <span className="text-green-600 ml-2">• Open Now</span>}
            </div>
          </div>
        )}

        {resource.website && (
          <div className="flex items-center text-sm">
            <Globe className="w-4 h-4 mr-2 text-warm-slate-400 flex-shrink-0" />
            <a 
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora-indigo700 hover:underline truncate"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>

      {resource.services && resource.services.length > 0 && (
        <div className="border-t pt-3">
          <div className="flex flex-wrap gap-1">
            {resource.services.slice(0, 3).map((service, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-xs text-warm-slate-600 px-2 py-1 rounded"
              >
                {service}
              </span>
            ))}
            {resource.services.length > 3 && (
              <span className="inline-block bg-gray-100 text-xs text-warm-slate-600 px-2 py-1 rounded">
                +{resource.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {resource.region && (
        <div className="mt-3 pt-3 border-t flex justify-between items-center">
          <span className="text-xs bg-aurora-indigo50 text-aurora-indigo700 px-2 py-1 rounded">
            {resource.region.charAt(0).toUpperCase() + resource.region.slice(1)} Austin
          </span>
          {resource.subcategories && resource.subcategories[0] && (
            <span className="text-xs text-warm-slate-500">
              {formatSubcategory(resource.subcategories[0])}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function formatSubcategory(sub: string) {
  return sub.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}