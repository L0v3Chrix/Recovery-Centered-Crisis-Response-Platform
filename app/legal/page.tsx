'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, Clock, MapPin, Phone, Search, Filter, MoreVertical, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import { Resource, ResourceCategory, RecoveryStage } from '@/types/resources'

// Import legal resources from database
import { legalResources } from '@/data/all-resources-database'

export default function LegalPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSort, setSelectedSort] = useState('distance')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  
  // Get current time for status calculation
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  
  const toggleCardExpansion = useCallback((id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])
  
  const filteredResources = legalResources.filter(resource => {
    if (searchTerm && !resource.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !resource.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-soft-cream-50">
      {/* Header following wireframe */}
      <div className="bg-warning-amber-400 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          
          <h1 className="text-2xl font-bold mb-2">⚖️ Legal Resources ({legalResources.length})</h1>
          <p className="text-white/90">Legal aid, documentation assistance, and benefits guidance</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar - Wireframe Match */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-slate-400" />
            <input
              type="text"
              placeholder="Search within legal resources..."
              className="w-full pl-10 pr-4 py-3 border border-warm-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-warning-amber-400/20 focus:border-warning-amber-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filters and Sort - Wireframe Match */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-warm-slate-500" />
            <span className="text-warm-slate-600 font-medium">Filters:</span>
            <button className="px-3 py-1 bg-white border border-warm-slate-200 rounded-full text-sm hover:border-warning-amber-300 transition-colors">
              Free
            </button>
            <button className="px-3 py-1 bg-white border border-warm-slate-200 rounded-full text-sm hover:border-warning-amber-300 transition-colors">
              Emergency
            </button>
            <button className="px-3 py-1 bg-white border border-warm-slate-200 rounded-full text-sm hover:border-warning-amber-300 transition-colors">
              No ID Required
            </button>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-warm-slate-600 font-medium">🗂️ Sort:</span>
            <select 
              className="px-3 py-1 bg-white border border-warm-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-warning-amber-400/20"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              <option value="distance">Distance</option>
              <option value="hours">Hours</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        {/* Individual Resource Cards - Following Wireframe */}
        <div className="space-y-4">
          {filteredResources.map((resource) => {
            const isExpanded = expandedCards.has(resource.id)
            
            // Calculate status based on hours
            let statusColor = 'text-warm-slate-500'
            let statusIcon = '🟢'
            let statusText = 'UNKNOWN'
            
            if (resource.status === 'open') {
              statusColor = 'text-green-600'
              statusIcon = '🟢'
              statusText = 'OPEN'
            } else if (resource.status === 'closing-soon') {
              statusColor = 'text-orange-600'
              statusIcon = '🟡'
              statusText = 'CLOSING SOON'
            } else if (resource.status === 'closed') {
              statusColor = 'text-red-600'
              statusIcon = '🔴'
              statusText = 'CLOSED'
            }
            
            return (
              <div key={resource.id} className="bg-white rounded-lg border border-warm-slate-200 hover:border-warning-amber-300 transition-all duration-200">
                {/* Main Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-warm-slate-900 text-lg">{resource.name}</h3>
                        <span className={`text-sm font-medium ${statusColor}`}>
                          {statusIcon} {statusText}
                        </span>
                      </div>
                      
                      <p className="text-warning-amber-600 font-medium text-sm mb-2">
                        {resource.type} • {resource.eligibility}
                      </p>
                      
                      <div className="flex items-start gap-1 text-warm-slate-600 mb-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{resource.address}</span>
                        {resource.busRoute && (
                          <span className="text-sm text-trust-teal-600 ml-2">🚌 {resource.busRoute}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-warm-slate-600 mb-3">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{resource.hours}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <a
                          href={`tel:${resource.phone}`}
                          className="text-trust-teal-600 hover:text-trust-teal-800 text-sm font-medium"
                        >
                          📞 {resource.phone}
                        </a>
                        {resource.rating && (
                          <span className="text-sm text-warm-slate-500">
                            ✅ Verified: {resource.verified} • {resource.rating}⭐ ({resource.reviewCount})
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleCardExpansion(resource.id)}
                      className="ml-4 p-2 hover:bg-warm-slate-50 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-warm-slate-400" />
                    </button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${resource.phone}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-trust-teal-400 text-white text-sm font-medium rounded-lg hover:bg-trust-teal-500 transition-colors"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 bg-warm-slate-100 text-warm-slate-700 text-sm font-medium rounded-lg hover:bg-warm-slate-200 transition-colors"
                    >
                      🗺️ Directions
                    </a>
                    <ShareButton 
                      resource={{
                        id: resource.id,
                        name: resource.name,
                        description: resource.description,
                        category: ResourceCategory.LEGAL,
                        address: resource.address,
                        phone: resource.phone,
                        services: resource.services,
                        hours: {
                          monday: { open: '08:30', close: '17:00' },
                          tuesday: { open: '08:30', close: '17:00' },
                          wednesday: { open: '08:30', close: '17:00' },
                          thursday: { open: '08:30', close: '17:00' },
                          friday: { open: '08:30', close: '17:00' },
                          saturday: { open: '00:00', close: '00:00' },
                          sunday: { open: '00:00', close: '00:00' }
                        },
                        eligibility: [resource.eligibility],
                        recoveryStage: [RecoveryStage.SUPPORT],
                        lastVerified: new Date(resource.lastUpdated),
                        coordinates: resource.coordinates || { lat: 30.2672, lng: -97.7431 }
                      }}
                      size="sm"
                      className="inline-flex items-center gap-1 px-3 py-2 bg-warm-slate-100 text-warm-slate-700 text-sm font-medium rounded-lg hover:bg-warm-slate-200 transition-colors"
                    >
                      📤 Share
                    </ShareButton>
                  </div>
                </div>
                
                {/* Expandable Detail Section - Wireframe Match */}
                {isExpanded && (
                  <div className="border-t border-warm-slate-100 bg-warm-slate-25 p-6">
                    <div className="space-y-4">
                      {/* Today's Hours */}
                      <div>
                        <div className="flex items-center gap-2 text-warm-slate-700 font-medium mb-2">
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                          <span className="text-sm">TODAY'S HOURS</span>
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                        </div>
                        <p className="text-warm-slate-700 font-medium">{resource.todayHours}</p>
                        <p className="text-sm text-warm-slate-600 mt-1">📍 {resource.whatToExpect}</p>
                      </div>
                      
                      {/* Services */}
                      <div>
                        <div className="flex items-center gap-2 text-warm-slate-700 font-medium mb-3">
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                          <span className="text-sm">SERVICES</span>
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                        </div>
                        <div className="space-y-1">
                          {resource.services.map((service, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-warm-slate-700">
                              <span className="text-trust-teal-500">✅</span>
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Accessibility */}
                      <div>
                        <div className="flex items-center gap-2 text-warm-slate-700 font-medium mb-3">
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                          <span className="text-sm">ACCESSIBILITY</span>
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                        </div>
                        <div className="space-y-1">
                          {resource.accessibility.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-warm-slate-700">
                              <span>♿</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                          {resource.busRoute && (
                            <div className="flex items-center gap-2 text-sm text-warm-slate-700">
                              <span>🚌</span>
                              <span>Bus routes: {resource.busRoute}</span>
                            </div>
                          )}
                          {resource.languages && (
                            <div className="flex items-center gap-2 text-sm text-warm-slate-700">
                              <span>🗣️</span>
                              <span>Languages: {resource.languages.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Share This Resource */}
                      <div>
                        <div className="flex items-center gap-2 text-warm-slate-700 font-medium mb-3">
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                          <span className="text-sm">SHARE THIS RESOURCE</span>
                          <div className="h-px bg-warm-slate-300 flex-1"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${resource.name}\n${resource.address}\nPhone: ${resource.phone}\n\nFound via Central Texas Resources`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors"
                          >
                            📱 WhatsApp
                          </a>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(resource.name)}&body=${encodeURIComponent(`${resource.name}\n${resource.address}\nPhone: ${resource.phone}\n\n${resource.description}\n\nFound via Central Texas Resources`)}`}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            📧 Email
                          </a>
                          <a
                            href={`sms:?body=${encodeURIComponent(`${resource.name}\n${resource.address}\nPhone: ${resource.phone}`)}`}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 text-sm rounded-lg hover:bg-purple-200 transition-colors"
                          >
                            💬 SMS
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}