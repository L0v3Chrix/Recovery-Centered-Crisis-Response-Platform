'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, MapPin, Globe, Clock, Users, Printer, Star } from 'lucide-react'

interface QuizAnswer {
  questionId: string
  answer: string | string[]
  weight?: number
}

interface ResourceWithScore {
  id: string
  name: string
  category: string
  subcategories?: string[]
  description?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  website?: string
  hours?: string
  services?: string[]
  eligibility?: string[]
  region?: string
  coordinates?: { lat: number; lng: number }
  lastVerified?: string
  score: number
  isOpen: boolean
}

interface GroupedResults {
  [category: string]: ResourceWithScore[]
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<ResourceWithScore[]>([])
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      const answersParam = searchParams.get('answers')
      
      if (answersParam) {
        try {
          const answers: QuizAnswer[] = JSON.parse(answersParam)
          
          // Extract relevant data from answers
          const primaryNeedAnswer = answers.find(a => a.questionId === 'primary-need')
          const locationAnswer = answers.find(a => a.questionId === 'location')
          
          // Extract all selected categories from multi-select
          let categories: string[] = ['crisis'] // default
          let needs: string[] = []
          
          if (primaryNeedAnswer && Array.isArray(primaryNeedAnswer.answer)) {
            const categoryMap: Record<string, string> = {
              'crisis': 'crisis',
              'food': 'food',
              'shelter': 'shelter',
              'recovery': 'recovery',
              'healthcare': 'healthcare',
              'legal': 'legal'
            }
            
            // Map all selected options to categories
            categories = primaryNeedAnswer.answer
              .map(selection => categoryMap[selection])
              .filter(Boolean)
            
            // If no valid categories mapped, use default
            if (categories.length === 0) {
              categories = ['crisis']
            }
            
            // Store original selections as needs
            needs = primaryNeedAnswer.answer
          }
          
          // Determine ZIP from location
          let zip: string | undefined
          if (locationAnswer) {
            const zipMap: Record<string, string> = {
              'central-austin': '78701',
              'north-austin': '78758',
              'south-austin': '78704',
              'east-austin': '78702',
              'west-austin': '78746'
            }
            zip = zipMap[locationAnswer.answer as string]
          }

          // Call our API with multiple categories
          const response = await fetch('/api/quiz/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              categories, // Send array of categories
              needs,
              zip
            })
          })

          if (!response.ok) {
            throw new Error('Failed to fetch recommendations')
          }

          const data = await response.json()
          const topResults = data.recommendations
          
          // Group by category
          const grouped = topResults.reduce((acc: GroupedResults, item: ResourceWithScore) => {
            const category = item.category
            if (!acc[category]) {
              acc[category] = []
            }
            acc[category].push(item)
            return acc
          }, {})
          
          setResults(topResults)
          setGroupedResults(grouped)
        } catch (error) {
          console.error('Error processing quiz results:', error)
        }
      }
      
      setLoading(false)
    }
    
    fetchRecommendations()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-aurora flex items-center justify-center">
        <div className="text-white text-xl">Loading your personalized results...</div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-aurora flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p className="mb-6">We couldn't find resources matching your criteria.</p>
          <Link href="/quiz" className="btn bg-white text-aurora-indigo700">
            Retake Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-warm-slate-600 hover:text-aurora-indigo700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                href="/results/print"
                className="flex items-center text-aurora-indigo700 hover:bg-aurora-indigo50 px-3 py-2 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Results
              </Link>
              <Link
                href="/quiz"
                className="btn btn-primary"
              >
                Retake Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-aurora text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Your Personalized Results</h1>
          <p className="text-white/90 text-lg">
            Found {results.length} resources tailored to your needs
          </p>
        </div>
      </div>

      {/* Top 3 Recommendations */}
      {results.slice(0, 3).length > 0 && (
        <div className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-aurora-indigo700 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Top Recommendations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {results.slice(0, 3).map((item, index) => (
                <ResourceCard 
                  key={item.id} 
                  item={item} 
                  rank={index + 1}
                  isTopResult={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results by Category */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {Object.entries(groupedResults).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-aurora-indigo700 mb-6 capitalize">
                {category.replace('_', ' ')} Resources
              </h2>
              <div className="grid gap-4">
                {items.map((item) => (
                  <ResourceCard 
                    key={item.id} 
                    item={item} 
                    isTopResult={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-100 py-8 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Need different results?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quiz" className="btn btn-primary">
              Retake Assessment
            </Link>
            <Link href="/" className="btn btn-secondary">
              Browse All Categories
            </Link>
            <Link href="/results/print" className="btn btn-outline">
              Print This List
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResourceCardProps {
  item: ResourceWithScore
  rank?: number
  isTopResult: boolean
}

function ResourceCard({ item, rank, isTopResult }: ResourceCardProps) {
  const { score, isOpen } = item

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      isTopResult 
        ? 'border-l-aurora-emerald500 shadow-lg' 
        : 'border-l-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {rank && (
            <div className="inline-flex items-center bg-aurora-emerald500 text-white text-sm font-bold px-2 py-1 rounded-full mb-2">
              #{rank}
            </div>
          )}
          <h3 className="text-xl font-bold text-aurora-indigo700 mb-1">
            {item.name}
          </h3>
          <p className="text-warm-slate-600 mb-2">{item.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-gray-500 mb-1">Match Score</div>
          <div className="text-lg font-bold text-aurora-emerald600">
            {Math.round(score * 100)}%
          </div>
          {item.region && (
            <div className="text-xs text-gray-500">
              {item.region.charAt(0).toUpperCase() + item.region.slice(1)} Austin
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          {item.phone && (
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2 text-aurora-azure400" />
              <a href={`tel:${item.phone}`} className="text-aurora-indigo700 hover:underline">
                {item.phone}
              </a>
            </div>
          )}
          {item.address && (
            <div className="flex items-start text-sm">
              <MapPin className="w-4 h-4 mr-2 text-aurora-azure400 mt-0.5 flex-shrink-0" />
              <span className="text-warm-slate-600">{item.address}</span>
            </div>
          )}
          {item.website && (
            <div className="flex items-center text-sm">
              <Globe className="w-4 h-4 mr-2 text-aurora-azure400" />
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-aurora-indigo700 hover:underline">
                Visit Website
              </a>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {item.hours?.includes('24') && (
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-aurora-emerald500" />
              <span className="text-aurora-emerald600 font-medium">Open 24/7</span>
            </div>
          )}
          {item.services?.some(s => s.toLowerCase().includes('walk')) && (
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-aurora-azure400" />
              <span className="text-warm-slate-600">Accepts Walk-ins</span>
            </div>
          )}
          {item.category === 'crisis' && (
            <div className="flex items-center text-sm">
              <span className="w-4 h-4 mr-2 text-aurora-crimson600">🚨</span>
              <span className="text-aurora-crimson600 font-medium">Crisis Support</span>
            </div>
          )}
        </div>
      </div>

      {/* Services */}
      {item.services && item.services.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-1">
            {item.services.slice(0, 3).map((service, index) => (
              <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {service}
              </span>
            ))}
            {item.services.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{item.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Match Reasons */}
      {isOpen && (
        <div className="border-t pt-3">
          <div className="flex items-center text-sm text-aurora-emerald600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">Open Now</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {item.phone && (
          <a 
            href={`tel:${item.phone}`}
            className="btn-sm bg-aurora-emerald500 text-white hover:bg-aurora-emerald600"
          >
            Call Now
          </a>
        )}
        {item.website && (
          <a 
            href={item.website}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-sm btn-outline"
          >
            Website
          </a>
        )}
        {item.address && (
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(item.address)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-sm btn-outline"
          >
            Directions
          </a>
        )}
      </div>
    </div>
  )
}