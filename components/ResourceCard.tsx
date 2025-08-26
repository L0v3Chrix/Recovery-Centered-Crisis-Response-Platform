'use client'

import { Phone, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react'
import { Resource } from '@/types/resources'
import ShareButton from './ShareButton'

interface ResourceCardProps {
  resource: Resource
  showDistance?: boolean
  distance?: number
  className?: string
}

export default function ResourceCard({ resource, showDistance, distance, className = '' }: ResourceCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${resource.phone}`
  }

  const handleDirections = () => {
    const address = encodeURIComponent(resource.address)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  const handleWebsite = () => {
    if (resource.website) {
      window.open(resource.website, '_blank')
    }
  }


  const isOpenNow = () => {
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

  const getOpenStatus = () => {
    if (resource.isOpen24Hours) return { text: '24/7', color: 'text-green-600', bg: 'bg-green-100' }
    if (isOpenNow()) return { text: 'Open Now', color: 'text-green-600', bg: 'bg-green-100' }
    return { text: 'Closed', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const openStatus = getOpenStatus()

  return (
    <div className={`resource-card ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg leading-tight">{resource.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${openStatus.bg} ${openStatus.color} font-medium`}>
              {openStatus.text}
            </span>
            {resource.hasCrisisSupport && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                Crisis Support
              </span>
            )}
            {resource.acceptsWalkIns && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                Walk-ins OK
              </span>
            )}
          </div>
        </div>
        <ShareButton 
          resource={resource} 
          size="sm" 
          showText={false} 
          className="text-gray-400 hover:text-gray-600"
        />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>

      {/* Location and Distance */}
      <div className="flex items-start gap-2 mb-3">
        <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-600">{resource.address}</p>
          {showDistance && distance !== undefined && (
            <p className="text-xs text-gray-500">{distance.toFixed(1)} miles away</p>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {resource.services.slice(0, 3).map((service, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
          {resource.services.length > 3 && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
              +{resource.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCall}
          className="call-button flex-1"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </button>
        
        <button
          onClick={handleDirections}
          className="action-button bg-blue-600 hover:bg-blue-700 flex-shrink-0"
        >
          <Navigation className="w-5 h-5" />
          Directions
        </button>
        
        {resource.website && (
          <button
            onClick={handleWebsite}
            className="action-button bg-gray-600 hover:bg-gray-700 flex-shrink-0"
          >
            <ExternalLink className="w-5 h-5" />
            Website
          </button>
        )}
      </div>
    </div>
  )
}