# Component Architecture Plan
## Life-Saving Links & Sober Living Pages

**Document Purpose**: Complete component breakdown, architecture, and implementation strategy for both new pages  
**Last Updated**: January 1, 2025  
**Status**: Pre-Development Component Planning

---

## 🏗️ OVERALL ARCHITECTURE STRATEGY

### Technology Stack Alignment
- **Framework**: Next.js 14 with App Router (matching existing codebase)
- **Styling**: Tailwind CSS with Aurora design system
- **TypeScript**: Strict mode with enhanced interfaces
- **State Management**: React hooks + Context API for complex state
- **Data Fetching**: Server-side rendering with client-side interactivity

### File Structure Strategy

```
/app/
├── life-saving-links/
│   ├── page.tsx                    // Main page component
│   ├── components/
│   │   ├── CrisisSection.tsx       // Crisis resource sections
│   │   ├── EmergencyButton.tsx     // Emergency contact buttons  
│   │   ├── CrisisCard.tsx          // Individual crisis resource cards
│   │   └── CrisisNav.tsx           // Crisis-specific navigation
│   └── loading.tsx                 // Loading state
│
├── housing/                        // Sober living & reentry
│   ├── page.tsx                    // Main housing page
│   ├── components/
│   │   ├── FeaturedFacility.tsx    // RCL featured section
│   │   ├── HousingFilters.tsx      // Filter panel component
│   │   ├── HousingCard.tsx         // Individual facility cards
│   │   ├── HousingSearch.tsx       // Search functionality
│   │   ├── AvailabilityBadge.tsx   // Availability status indicator
│   │   └── HousingNav.tsx          // Housing-specific navigation
│   ├── [facilityId]/
│   │   └── page.tsx                // Individual facility detail pages
│   └── loading.tsx                 // Loading state
│
└── shared/
    └── components/
        ├── EmergencyHeader.tsx     // Crisis-aware header
        ├── CrossPageCTA.tsx        // Cross-page call-to-action
        ├── ContactButton.tsx       // Standardized contact buttons
        └── AccessibilityWrapper.tsx // A11y enhancements
```

---

## 🚨 LIFE-SAVING LINKS PAGE COMPONENTS

### Main Page Component

```typescript
// /app/life-saving-links/page.tsx
import { Metadata } from 'next'
import { austinCrisisResources, get24HourCrisisResources } from '@/data/austin-crisis-resources'
import { CrisisSection } from './components/CrisisSection'
import { EmergencyHeader } from '@/shared/components/EmergencyHeader'
import { CrossPageCTA } from '@/shared/components/CrossPageCTA'
import { CrisisResource } from '@/types/resources'

export const metadata: Metadata = {
  title: 'Life-Saving Links - Immediate Crisis Help | HelpNow ATX',
  description: 'Emergency crisis support, psychiatric hospitals, detox centers, and immediate help resources in Austin, Texas. Available 24/7.',
  keywords: 'crisis help Austin, suicide prevention, psychiatric emergency, detox Austin, emergency mental health',
  robots: 'index, follow',
  openGraph: {
    title: 'Life-Saving Links - Immediate Crisis Help',
    description: 'Get immediate crisis support in Austin. 24/7 emergency resources.',
    type: 'website'
  }
}

interface CrisisPageProps {
  searchParams: { urgency?: string, category?: string }
}

export default async function LifeSavingLinksPage({ searchParams }: CrisisPageProps) {
  // Server-side data fetching
  const immediateCrisisResources = get24HourCrisisResources()
  const allCrisisResources = austinCrisisResources

  // Organize resources by urgency
  const organizedResources = {
    immediate: immediateCrisisResources.slice(0, 4), // Top 4 most critical
    psychiatric: allCrisisResources.filter(r => 
      r.services.some(s => s.toLowerCase().includes('psychiatric'))
    ),
    detox: allCrisisResources.filter(r =>
      r.services.some(s => s.toLowerCase().includes('detox'))
    ),
    support: allCrisisResources.filter(r =>
      r.recoveryStage.includes('support') || r.recoveryStage.includes('family_support')
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <EmergencyHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Crisis Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
            🚨 LIFE-SAVING LINKS 🚨
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Immediate Help Available Now - You Are Not Alone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EmergencyButton number="988" label="Crisis Lifeline" priority="highest" />
            <EmergencyButton number="911" label="Emergency" priority="highest" />
          </div>
        </header>

        {/* Crisis Sections */}
        <div className="space-y-12">
          <CrisisSection 
            title="IMMEDIATE CRISIS (24/7)" 
            resources={organizedResources.immediate}
            urgency="immediate"
            colorScheme="red"
            priority={1}
          />
          
          <CrisisSection 
            title="🏥 PSYCHIATRIC HOSPITALS" 
            resources={organizedResources.psychiatric}
            urgency="acute"
            colorScheme="orange" 
            priority={2}
          />
          
          <CrisisSection 
            title="🏠 DETOX & TREATMENT ENTRY" 
            resources={organizedResources.detox}
            urgency="treatment"
            colorScheme="yellow"
            priority={3}
          />
          
          <CrisisSection 
            title="💪 ONGOING SUPPORT" 
            resources={organizedResources.support}
            urgency="support"
            colorScheme="green"
            priority={4}
          />
        </div>

        {/* Cross-page CTA */}
        <CrossPageCTA 
          targetPage="housing"
          message="Need Sober Living After Crisis?"
          buttonText="🏠 FIND HOUSING"
          description="Stabilize your recovery with safe, supportive housing options"
        />
      </main>
    </div>
  )
}
```

### Crisis Section Component

```typescript
// /app/life-saving-links/components/CrisisSection.tsx
'use client'

import { useState } from 'react'
import { CrisisResource } from '@/types/resources'
import { CrisisCard } from './CrisisCard'
import { EmergencyButton } from '@/shared/components/EmergencyButton'

interface CrisisSectionProps {
  title: string
  resources: CrisisResource[]
  urgency: 'immediate' | 'acute' | 'treatment' | 'support'
  colorScheme: 'red' | 'orange' | 'yellow' | 'green'
  priority: number
}

export function CrisisSection({ 
  title, 
  resources, 
  urgency, 
  colorScheme, 
  priority 
}: CrisisSectionProps) {
  const [expanded, setExpanded] = useState(priority === 1) // Auto-expand highest priority
  const [focusedCard, setFocusedCard] = useState<string | null>(null)

  // Show top resources first, expand to show all
  const visibleResources = expanded ? resources : resources.slice(0, 3)
  const hasMore = resources.length > 3

  const colorClasses = {
    red: 'bg-red-100 border-red-300 text-red-900',
    orange: 'bg-orange-100 border-orange-300 text-orange-900', 
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900',
    green: 'bg-green-100 border-green-300 text-green-900'
  }

  const buttonColors = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700', 
    green: 'bg-green-600 hover:bg-green-700'
  }

  return (
    <section 
      className={`rounded-xl p-6 border-2 ${colorClasses[colorScheme]} transition-all duration-300`}
      role="region"
      aria-labelledby={`crisis-section-${urgency}`}
    >
      {/* Section Header */}
      <header className="flex justify-between items-center mb-6">
        <h2 
          id={`crisis-section-${urgency}`}
          className="text-2xl md:text-3xl font-bold"
        >
          {title}
        </h2>
        {urgency === 'immediate' && (
          <span className="animate-pulse text-red-600 font-bold text-sm">
            AVAILABLE NOW
          </span>
        )}
      </header>

      {/* Quick Contact for Immediate Crisis */}
      {urgency === 'immediate' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {resources.slice(0, 2).map(resource => (
            <EmergencyButton
              key={resource.id}
              number={resource.phone}
              label={resource.name}
              priority="high"
              description={resource.description}
            />
          ))}
        </div>
      )}

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {visibleResources.map((resource) => (
          <CrisisCard
            key={resource.id}
            resource={resource}
            urgency={urgency}
            focused={focusedCard === resource.id}
            onFocus={() => setFocusedCard(resource.id)}
            onBlur={() => setFocusedCard(null)}
          />
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${buttonColors[colorScheme]}`}
          aria-expanded={expanded}
          aria-controls={`crisis-resources-${urgency}`}
        >
          {expanded 
            ? `▲ SHOW FEWER ${title.toUpperCase()}` 
            : `▼ VIEW ALL ${resources.length} ${title.toUpperCase()}`
          }
        </button>
      )}
    </section>
  )
}
```

### Crisis Card Component

```typescript
// /app/life-saving-links/components/CrisisCard.tsx
'use client'

import { CrisisResource } from '@/types/resources'
import { ContactButton } from '@/shared/components/ContactButton'

interface CrisisCardProps {
  resource: CrisisResource
  urgency: 'immediate' | 'acute' | 'treatment' | 'support'
  focused: boolean
  onFocus: () => void
  onBlur: () => void
}

export function CrisisCard({ 
  resource, 
  urgency, 
  focused, 
  onFocus, 
  onBlur 
}: CrisisCardProps) {
  const isImmediate = urgency === 'immediate'
  
  return (
    <article
      className={`
        bg-white rounded-lg border-2 p-4 transition-all duration-200 
        ${focused ? 'border-blue-500 shadow-lg scale-102' : 'border-gray-200 hover:border-gray-300'}
        ${isImmediate ? 'ring-2 ring-red-200' : ''}
      `}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      role="article"
      aria-labelledby={`resource-${resource.id}-name`}
    >
      {/* Resource Header */}
      <header className="mb-4">
        <h3 
          id={`resource-${resource.id}-name`}
          className="font-bold text-lg text-gray-900 mb-2"
        >
          {resource.name}
          {resource.isAvailable24Hours && (
            <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              24/7
            </span>
          )}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {resource.description}
        </p>
      </header>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        {/* Primary Phone */}
        <ContactButton
          phone={resource.phone}
          label="Call Now"
          priority={isImmediate ? "highest" : "high"}
          size={isImmediate ? "large" : "medium"}
        />

        {/* Text Support */}
        {resource.textSupport && (
          <ContactButton
            phone={resource.textSupport}
            label="Text Support"
            type="text"
            priority="medium"
            size="medium"
          />
        )}

        {/* Crisis Hotline (if different from main phone) */}
        {resource.crisisHotline && resource.crisisHotline !== resource.phone && (
          <ContactButton
            phone={resource.crisisHotline}
            label="Crisis Hotline"
            priority="high"
            size="medium"
          />
        )}
      </div>

      {/* Resource Details */}
      <footer className="text-sm text-gray-500">
        {/* Languages */}
        {resource.languages?.length > 0 && (
          <div className="mb-2">
            <span className="font-medium">Languages:</span> {resource.languages.join(', ')}
          </div>
        )}
        
        {/* Response Time */}
        {resource.responseTime && (
          <div className="mb-2">
            <span className="font-medium">Response:</span> {resource.responseTime}
          </div>
        )}

        {/* Address */}
        {resource.address !== 'National Hotline Service' && resource.address !== 'Text Service' && (
          <div className="text-xs text-gray-400">
            📍 {resource.address}
          </div>
        )}
      </footer>
    </article>
  )
}
```

---

## 🏠 SOBER LIVING & HOUSING PAGE COMPONENTS

### Main Housing Page Component

```typescript
// /app/housing/page.tsx
import { Metadata } from 'next'
import { austinSoberLivingResources, getFeaturedSoberLiving, getAvailableHousing } from '@/data/austin-sober-living-resources'
import { FeaturedFacility } from './components/FeaturedFacility'
import { HousingSearch } from './components/HousingSearch'
import { HousingFilters } from './components/HousingFilters'
import { HousingGrid } from './components/HousingGrid'
import { CrossPageCTA } from '@/shared/components/CrossPageCTA'

export const metadata: Metadata = {
  title: 'Sober Living & Reentry Housing | HelpNow ATX',
  description: 'Find sober living homes, Oxford Houses, and reentry housing in Austin, Texas. 60+ facilities with detailed information.',
  keywords: 'sober living Austin, Oxford House Austin, halfway house Austin, recovery housing, transitional housing',
  robots: 'index, follow'
}

interface HousingPageProps {
  searchParams: { 
    search?: string
    type?: string
    gender?: string
    cost?: string
    availability?: string
  }
}

export default async function HousingPage({ searchParams }: HousingPageProps) {
  // Server-side data fetching
  const featuredFacility = getFeaturedSoberLiving()
  const availableHousing = getAvailableHousing()
  const allHousing = austinSoberLivingResources

  // Parse search parameters for initial filtering
  const initialFilters = {
    search: searchParams.search || '',
    type: searchParams.type ? searchParams.type.split(',') : [],
    gender: searchParams.gender ? searchParams.gender.split(',') : [],
    cost: searchParams.cost ? searchParams.cost.split(',') : [],
    availability: searchParams.availability ? searchParams.availability.split(',') : []
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            🏠 Sober Living & Housing 🏠
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Safe, Supportive Recovery Housing in Austin & Central Texas
          </p>
          <p className="text-lg text-gray-600">
            60+ facilities • Real-time availability • Comprehensive support
          </p>
        </header>

        {/* Featured Facility - RCL */}
        <FeaturedFacility facility={featuredFacility} />

        {/* Search and Filters Section */}
        <section className="mb-8">
          <HousingSearch initialQuery={initialFilters.search} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <HousingFilters 
                initialFilters={initialFilters}
                totalFacilities={allHousing.length}
              />
            </aside>

            {/* Main Results */}
            <div className="lg:col-span-3">
              {/* Immediate Availability Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🟢 Immediate Housing Available
                </h2>
                <HousingGrid 
                  facilities={availableHousing.slice(0, 6)}
                  priority="availability"
                  showAvailabilityBadge={true}
                />
              </section>

              {/* All Housing Results */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  All Sober Living Facilities ({allHousing.length})
                </h2>
                <HousingGrid 
                  facilities={allHousing}
                  priority="comprehensive"
                  showFilters={true}
                />
              </section>
            </div>
          </div>
        </section>

        {/* Cross-page CTA */}
        <CrossPageCTA 
          targetPage="life-saving-links"
          message="In Crisis? Need Immediate Help?"
          buttonText="🚨 GET CRISIS SUPPORT"
          description="24/7 emergency resources and crisis intervention"
          variant="emergency"
        />
      </main>
    </div>
  )
}
```

### Featured Facility Component (RCL)

```typescript
// /app/housing/components/FeaturedFacility.tsx
'use client'

import { HousingResource } from '@/types/resources'
import { ContactButton } from '@/shared/components/ContactButton'

interface FeaturedFacilityProps {
  facility: HousingResource
}

export function FeaturedFacility({ facility }: FeaturedFacilityProps) {
  return (
    <section className="mb-12 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-300 shadow-lg">
      {/* Featured Badge */}
      <div className="flex items-center justify-center mb-6">
        <span className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold text-lg">
          ⭐ FEATURED SOBER LIVING COMMUNITY ⭐
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Information */}
        <div className="lg:col-span-2">
          <header className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {facility.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {facility.description}
            </p>
          </header>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2">💊 MAT Advocate Home</h3>
              <p className="text-sm text-gray-600">
                Medication-Assisted Treatment friendly environment
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2">🤝 Multiple Pathways</h3>
              <p className="text-sm text-gray-600">
                12-step, Recovery Dharma, SMART Recovery supported
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2">👥 Peer-Led Environment</h3>
              <p className="text-sm text-gray-600">
                Founded by person in long-term recovery
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-2">🏠 3 Locations</h3>
              <p className="text-sm text-gray-600">
                Multiple recovery residences in Austin area
              </p>
            </div>
          </div>

          {/* Founder Note */}
          <blockquote className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
            <p className="text-gray-700 italic mb-2">
              "Recovery Centered Living is committed to creating an environment that is built to hold space for people in recovery."
            </p>
            <cite className="text-sm text-gray-600">— Slade Skaggs, Founder</cite>
          </blockquote>
        </div>

        {/* Contact & Action Panel */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Contact RCL Today
          </h3>

          {/* Primary Contact */}
          <div className="space-y-4 mb-6">
            <ContactButton
              phone={facility.phone}
              label="Call RCL Now"
              priority="highest"
              size="large"
              className="w-full"
            />
            
            {facility.email && (
              <a 
                href={`mailto:${facility.email}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
              >
                📧 Send Email
              </a>
            )}
            
            {facility.website && (
              <a 
                href={facility.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
              >
                🌐 Visit Website
              </a>
            )}
          </div>

          {/* Quick Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <div>
              <span className="font-medium">Cost Range:</span> 
              ${facility.monthlyRateMin}-${facility.monthlyRateMax}/month
            </div>
            <div>
              <span className="font-medium">Gender:</span> 
              Men & Women
            </div>
            <div>
              <span className="font-medium">MAT Friendly:</span> 
              ✅ Yes
            </div>
            <div>
              <span className="font-medium">Availability:</span> 
              <span className="text-green-600 font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Housing Filters Component

```typescript
// /app/housing/components/HousingFilters.tsx
'use client'

import { useState, useEffect } from 'react'
import { HousingType, GenderRestriction, CostRange, AvailabilityStatus } from '@/types/resources'

interface FilterState {
  search: string
  type: HousingType[]
  gender: GenderRestriction[]
  cost: CostRange[]
  availability: AvailabilityStatus[]
  matFriendly: boolean
  lgbtqAffirming: boolean
  veteransSpecific: boolean
}

interface HousingFiltersProps {
  initialFilters: any
  totalFacilities: number
  onFiltersChange?: (filters: FilterState) => void
}

export function HousingFilters({ 
  initialFilters, 
  totalFacilities, 
  onFiltersChange 
}: HousingFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: initialFilters.search || '',
    type: initialFilters.type || [],
    gender: initialFilters.gender || [],
    cost: initialFilters.cost || [],
    availability: initialFilters.availability || [],
    matFriendly: false,
    lgbtqAffirming: false,
    veteransSpecific: false
  })

  const [resultCount, setResultCount] = useState(totalFacilities)

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
    // Calculate result count based on filters
    // This would integrate with search/filtering logic
  }, [filters, onFiltersChange])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: 'type' | 'gender' | 'cost' | 'availability', value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      search: '',
      type: [],
      gender: [],
      cost: [],
      availability: [],
      matFriendly: false,
      lgbtqAffirming: false,
      veteransSpecific: false
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      {/* Filter Header */}
      <header className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filter Results</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear All
        </button>
      </header>

      {/* Result Count */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-blue-800">
          Showing {resultCount} of {totalFacilities} facilities
        </p>
      </div>

      <div className="space-y-6">
        {/* Budget Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">💰 Budget</h4>
          <div className="space-y-2">
            {Object.entries({
              [CostRange.BUDGET]: 'Under $600/month',
              [CostRange.MODERATE]: '$600-1,000/month', 
              [CostRange.EXPENSIVE]: '$1,000-1,500/month',
              [CostRange.PREMIUM]: '$1,500+/month'
            }).map(([value, label]) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.cost.includes(value as CostRange)}
                  onChange={() => toggleArrayFilter('cost', value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">👥 Gender</h4>
          <div className="space-y-2">
            {Object.entries({
              [GenderRestriction.MIXED]: 'All/Mixed',
              [GenderRestriction.MEN_ONLY]: 'Men Only',
              [GenderRestriction.WOMEN_ONLY]: 'Women Only'
            }).map(([value, label]) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  checked={filters.gender.includes(value as GenderRestriction)}
                  onChange={() => updateFilter('gender', [value])}
                  className="border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Housing Type Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">🏠 Type</h4>
          <div className="space-y-2">
            {Object.entries({
              [HousingType.SOBER_LIVING]: 'Sober Living',
              [HousingType.OXFORD_HOUSE]: 'Oxford House',
              [HousingType.HALFWAY_HOUSE]: 'Halfway House',
              [HousingType.TRANSITIONAL_HOUSING]: 'Transitional',
              [HousingType.REENTRY_HOUSING]: 'Reentry Housing',
              [HousingType.VETERANS_HOUSING]: 'Veterans Housing'
            }).map(([value, label]) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.type.includes(value as HousingType)}
                  onChange={() => toggleArrayFilter('type', value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">📅 Availability</h4>
          <div className="space-y-2">
            {Object.entries({
              [AvailabilityStatus.AVAILABLE]: '🟢 Available Now',
              [AvailabilityStatus.WAITLIST]: '🟡 Waitlist',
              [AvailabilityStatus.FULL]: '🔴 Full'
            }).map(([value, label]) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(value as AvailabilityStatus)}
                  onChange={() => toggleArrayFilter('availability', value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">✨ Special Features</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.matFriendly}
                onChange={(e) => updateFilter('matFriendly', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">💊 MAT Friendly</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.lgbtqAffirming}
                onChange={(e) => updateFilter('lgbtqAffirming', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">🏳️‍🌈 LGBTQ+ Affirming</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.veteransSpecific}
                onChange={(e) => updateFilter('veteransSpecific', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">🇺🇸 Veterans Specific</span>
            </label>
          </div>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Apply Filters ({resultCount} results)
      </button>
    </div>
  )
}
```

---

## 🔧 SHARED COMPONENTS

### Emergency Header Component

```typescript
// /shared/components/EmergencyHeader.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function EmergencyHeader() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()
  const isCrisisPage = pathname?.includes('life-saving-links')

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`
        ${isCrisisPage ? 'bg-red-600' : 'bg-blue-600'} text-white transition-all duration-300
        ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'}
      `}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className="text-xl font-bold hover:text-gray-200 transition-colors"
          >
            HelpNow ATX
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/life-saving-links"
              className={`
                font-semibold px-3 py-2 rounded transition-colors
                ${isCrisisPage ? 'bg-red-700' : 'hover:bg-white hover:text-blue-600'}
              `}
            >
              🚨 Crisis Help
            </Link>
            
            <Link 
              href="/housing"
              className={`
                font-semibold px-3 py-2 rounded transition-colors
                ${!isCrisisPage ? 'bg-blue-700' : 'hover:bg-white hover:text-red-600'}
              `}
            >
              🏠 Housing
            </Link>
            
            <Link 
              href="/resources"
              className="hover:text-gray-200 transition-colors"
            >
              All Resources
            </Link>
          </div>

          {/* Emergency Contact */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:911"
              className={`
                px-4 py-2 rounded-lg font-bold transition-colors
                ${isCrisisPage 
                  ? 'bg-white text-red-600 hover:bg-red-100' 
                  : 'bg-white text-blue-600 hover:bg-blue-100'
                }
              `}
            >
              📞 911
            </a>
            
            <a 
              href="tel:988"
              className={`
                hidden sm:inline-block px-4 py-2 rounded-lg font-bold transition-colors
                ${isCrisisPage 
                  ? 'bg-red-700 hover:bg-red-800' 
                  : 'bg-blue-700 hover:bg-blue-800'
                }
              `}
            >
              📞 988
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
```

### Contact Button Component

```typescript
// /shared/components/ContactButton.tsx
'use client'

import { useState } from 'react'

interface ContactButtonProps {
  phone: string
  label: string
  priority: 'highest' | 'high' | 'medium' | 'low'
  size: 'small' | 'medium' | 'large'
  type?: 'call' | 'text'
  description?: string
  className?: string
}

export function ContactButton({
  phone,
  label,
  priority,
  size,
  type = 'call',
  description,
  className = ''
}: ContactButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const priorityColors = {
    highest: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    high: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
    medium: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    low: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
  }

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  }

  const minHeight = {
    small: 'min-h-[40px]',
    medium: 'min-h-[48px]', 
    large: 'min-h-[60px]'
  }

  const href = type === 'text' ? `sms:${phone}` : `tel:${phone}`
  const icon = type === 'text' ? '📱' : '📞'

  return (
    <a
      href={href}
      className={`
        ${priorityColors[priority]} ${sizeClasses[size]} ${minHeight[size]}
        text-white font-semibold rounded-lg transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        active:scale-95 hover:shadow-lg
        flex items-center justify-center space-x-2
        ${isPressed ? 'scale-95' : ''}
        ${className}
      `}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      role="button"
      aria-label={`${type === 'text' ? 'Text' : 'Call'} ${phone} - ${label}`}
    >
      <span className="text-xl">{icon}</span>
      <div className="text-left">
        <div className="font-bold">{label}</div>
        {description && size === 'large' && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
    </a>
  )
}
```

---

**Next Document**: CRISIS-RESPONSIVE-DESIGN-PATTERNS.md  
**Status**: Component architecture complete, ready for crisis-specific design patterns