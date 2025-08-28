'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Phone, MapPin, Globe, Clock } from 'lucide-react'

interface Resource {
  id: string
  name: string
  category: string
  description: string
  phone?: string
  address?: string
  website?: string
  services?: string[]
  isOpen24Hours?: boolean
  acceptsWalkIns?: boolean
  hasCrisisSupport?: boolean
}

interface ScoredResource {
  resource: Resource
  score: number
  reasons: string[]
}

interface GroupedResults {
  [category: string]: ScoredResource[]
}

export default function PrintResultsPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<ScoredResource[]>([])
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const answersParam = searchParams.get('answers')
    
    if (answersParam) {
      const fetchResults = async () => {
        try {
          const answers = JSON.parse(answersParam)
          
          // Extract categories from answers
          const primaryNeedAnswer = answers.find((a: any) => a.questionId === 'primary-need')
          let categories = ['crisis'] // default
          
          if (primaryNeedAnswer && Array.isArray(primaryNeedAnswer.answer)) {
            const categoryMap: Record<string, string> = {
              'crisis': 'crisis',
              'food': 'food',
              'shelter': 'shelter',
              'recovery': 'recovery',
              'healthcare': 'healthcare',
              'legal': 'legal'
            }
            
            categories = primaryNeedAnswer.answer
              .map((selection: string) => categoryMap[selection])
              .filter(Boolean)
            
            if (categories.length === 0) {
              categories = ['crisis']
            }
          }
          
          const response = await fetch('/api/quiz/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categories })
          })
          
          if (response.ok) {
            const data = await response.json()
            const topResults = data.recommendations || []
            
            const grouped = topResults.reduce((acc: GroupedResults, item: ScoredResource) => {
              const category = item.resource.category
              if (!acc[category]) {
                acc[category] = []
              }
              acc[category].push(item)
              return acc
            }, {})
            
            setResults(topResults)
            setGroupedResults(grouped)
          }
        } catch (error) {
          console.error('Error processing quiz results:', error)
        }
        setLoading(false)
      }
      
      fetchResults()
    } else {
      setLoading(false)
    }
    
    // Auto-print when page loads
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.print()
      }, 1000)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Preparing your printable results...</div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p>We couldn't find resources matching your criteria.</p>
        </div>
      </div>
    )
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="print-page bg-white text-black">
      {/* Print Header */}
      <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold mb-2">Central Texas Resources</h1>
        <h2 className="text-xl text-gray-700 mb-2">Your Personalized Resource Guide</h2>
        <p className="text-gray-600">Generated on {currentDate}</p>
        <p className="text-sm text-gray-500 mt-2">
          📞 Emergency: 911 | Crisis: 988 | Text: HOME to 741741
        </p>
      </div>

      {/* Top 5 Priority Resources */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
          ⭐ Priority Resources for You
        </h2>
        {results.slice(0, 5).map((item, index) => (
          <div key={item.resource.id} className="mb-6 p-4 border border-gray-300 rounded">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">
                #{index + 1} {item.resource.name}
              </h3>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                {Math.round(item.score)}/100 match
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{item.resource.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                {item.resource.phone && (
                  <div className="flex items-center mb-1">
                    <Phone className="w-4 h-4 mr-2" />
                    <strong>{item.resource.phone}</strong>
                  </div>
                )}
                {item.resource.address && (
                  <div className="flex items-start mb-1">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item.resource.address}</span>
                  </div>
                )}
              </div>
              <div>
                {item.resource.website && (
                  <div className="flex items-start mb-1">
                    <Globe className="w-4 h-4 mr-2 mt-0.5" />
                    <span className="text-sm break-all">{item.resource.website}</span>
                  </div>
                )}
                <div className="text-sm space-y-1">
                  {item.resource.isOpen24Hours && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2" />
                      <span className="font-medium">Open 24/7</span>
                    </div>
                  )}
                  {item.resource.acceptsWalkIns && (
                    <div>✅ Accepts Walk-ins</div>
                  )}
                  {item.resource.hasCrisisSupport && (
                    <div>🚨 Crisis Support Available</div>
                  )}
                </div>
              </div>
            </div>

            {item.resource.services && item.resource.services.length > 0 && (
              <div className="mb-2">
                <strong>Services: </strong>
                <span className="text-sm">{item.resource.services.join(', ')}</span>
              </div>
            )}

            {item.reasons.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Why this matches: </strong>
                {item.reasons.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Resources by Category */}
      {Object.entries(groupedResults).map(([category, items]) => {
        // Skip if all items are already in top 5
        const additionalItems = items.filter(item => 
          !results.slice(0, 5).find(topItem => topItem.resource.id === item.resource.id)
        )
        
        if (additionalItems.length === 0) return null

        return (
          <div key={category} className="mb-8 page-break-before">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2 capitalize">
              {category.replace('_', ' ')} Resources
            </h2>
            
            <div className="grid gap-4">
              {additionalItems.map((item) => (
                <div key={item.resource.id} className="p-3 border border-gray-200 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.resource.name}</h3>
                    <span className="text-sm text-gray-600">
                      {Math.round(item.score)}/100
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      {item.resource.phone && (
                        <div><strong>Phone:</strong> {item.resource.phone}</div>
                      )}
                      {item.resource.address && (
                        <div><strong>Address:</strong> {item.resource.address}</div>
                      )}
                    </div>
                    <div>
                      {item.resource.website && (
                        <div><strong>Website:</strong> {item.resource.website}</div>
                      )}
                      <div className="space-x-3">
                        {item.resource.isOpen24Hours && <span>🕒 24/7</span>}
                        {item.resource.acceptsWalkIns && <span>🚶 Walk-ins</span>}
                        {item.resource.hasCrisisSupport && <span>🚨 Crisis</span>}
                      </div>
                    </div>
                  </div>
                  
                  {item.resource.description && (
                    <p className="text-sm text-gray-700 mt-2">{item.resource.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p className="mb-2">
          <strong>Central Texas Resources</strong> - helpnowatx.org
        </p>
        <p className="mb-2">
          Resources verified as of {currentDate}
        </p>
        <p>
          🚨 <strong>Emergency:</strong> 911 | 
          <strong> Crisis:</strong> 988 | 
          <strong> Crisis Text:</strong> HOME to 741741
        </p>
      </div>

      <style jsx>{`
        @media print {
          .print-page {
            font-size: 12px;
            line-height: 1.4;
          }
          .page-break-before {
            page-break-before: always;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}