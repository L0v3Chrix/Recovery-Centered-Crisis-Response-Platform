'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, MapPin, DollarSign, Users, Home, Star, Heart, Shield, Clock, ExternalLink } from 'lucide-react'

interface SoberLivingResource {
  id: string
  name: string
  description: string
  phone?: string
  website?: string
  address?: string
  housingType: 'sober_living' | 'oxford_house' | 'halfway_house' | 'transitional_housing' | 'reentry_housing' | 'veterans_housing' | 'faith_based'
  genderRestriction: 'mixed' | 'men_only' | 'women_only'
  costRange: 'budget' | 'moderate' | 'expensive' | 'premium'
  monthlyRateMin?: number
  monthlyRateMax?: number
  availabilityStatus: 'available' | 'waitlist' | 'full' | 'unknown'
  
  // Key Features
  matFriendly?: boolean
  traumaInformed?: boolean
  lgbtqAffirming?: boolean
  veteransSpecific?: boolean
  familyFriendly?: boolean
  
  // Requirements
  sobrietyRequirement?: number // days clean required
  backgroundCheckRequired?: boolean
  employmentRequired?: boolean
  
  specialties?: string[]
  notes?: string
  featured?: boolean
  area?: string
}

const soberLivingResources: SoberLivingResource[] = [
  // FEATURED FACILITY - Recovery Centered Living (VERIFIED)
  {
    id: 'recovery-centered-living',
    name: 'Recovery Centered Living (RCL)',
    description: 'MAT and MAP friendly recovery homes with peer-led approach supporting multiple recovery pathways. 6 total houses: 2 women&apos;s houses and 4 men&apos;s houses. Founder-led with lived recovery experience.',
    phone: '(512) 777-1748',
    website: 'https://www.recoverycenteredliving.com',
    address: '6 Recovery Residences (2 Women, 4 Men), Austin area',
    housingType: 'sober_living',
    genderRestriction: 'mixed',
    costRange: 'moderate',
    monthlyRateMin: 800,
    monthlyRateMax: 1200,
    availabilityStatus: 'available',
    
    matFriendly: true,
    traumaInformed: true,
    lgbtqAffirming: true,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['MAT & MAP Friendly', 'Multiple Recovery Pathways', 'Peer Support', 'High Accountability', 'Gender-Specific Housing'],
    notes: 'MAT and MAP friendly but not exclusive. 6 houses total with gender-specific accommodations.',
    featured: true,
    area: 'central'
  },

  // HARMONY HAUS (VERIFIED)
  {
    id: 'harmony-haus',
    name: 'Harmony Haus',
    description: 'Sober living community in Austin with structured programming and supportive environment',
    phone: '(877) 349-1542',
    website: 'https://www.harmonysoberliving.us',
    address: '4500 Depew Ave, Austin, TX 78751',
    housingType: 'sober_living',
    genderRestriction: 'mixed',
    costRange: 'expensive',
    availabilityStatus: 'available',
    
    matFriendly: false,
    traumaInformed: true,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Structured Programming', 'Multiple Properties', 'Hyde Park & Westlake Locations'],
    notes: 'Platinum Standard sober living with properties in desirable Austin areas',
    area: 'central'
  },

  // EUDAIMONIA RECOVERY HOMES (VERIFIED)
  {
    id: 'eudaimonia-recovery-homes',
    name: 'Eudaimonia Recovery Homes',
    description: 'Structured sober living apartments for men, women and LGBTQ+ individuals with comprehensive programming',
    phone: '(512) 605-2955',
    website: 'https://eudaimoniahomes.com',
    address: '7501 E Hwy 290, Austin, TX 78723',
    housingType: 'sober_living',
    genderRestriction: 'mixed',
    costRange: 'moderate',
    availabilityStatus: 'available',
    
    matFriendly: true,
    traumaInformed: true,
    lgbtqAffirming: true,
    veteransSpecific: false,
    familyFriendly: false,
    
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['LGBTQ+ Friendly', 'Structured Programming', 'Apartment-Style Living'],
    notes: 'Safe sober living programming with comfortable, drug-free amenities',
    area: 'east'
  },

  // OXFORD HOUSE OF TEXAS (VERIFIED)
  {
    id: 'oxford-house-texas-austin',
    name: 'Oxford House of Texas - Austin',
    description: 'Democratic sober living community with peer governance. Multiple houses throughout Austin area.',
    phone: '(512) 971-7995',
    website: 'https://www.oxfordhousetx.org',
    address: 'Multiple locations in Austin',
    housingType: 'oxford_house',
    genderRestriction: 'mixed',
    costRange: 'budget',
    monthlyRateMin: 400,
    monthlyRateMax: 600,
    availabilityStatus: 'available',
    
    matFriendly: false,
    traumaInformed: false,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: false,
    employmentRequired: true,
    
    specialties: ['Democratic Governance', 'Peer Support', 'Employment Focus', 'Gender-Specific Houses'],
    notes: 'Residents vote on admissions and house rules. Operating since 1990.',
    area: 'various'
  },

  // INFINITE RECOVERY (VERIFIED)
  {
    id: 'infinite-recovery-sober-living',
    name: 'Infinite Recovery - Sober Living',
    description: 'Sober living homes connected to comprehensive addiction treatment services',
    phone: '(512) 549-6191',
    website: 'https://www.infiniterecovery.com/sober-living-austin',
    address: '1524 S I-35 Frontage Rd, Austin, TX 78704',
    housingType: 'sober_living',
    genderRestriction: 'mixed',
    costRange: 'moderate',
    availabilityStatus: 'available',
    
    matFriendly: true,
    traumaInformed: true,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Treatment Integration', 'Continuum of Care', 'Multiple Properties'],
    notes: 'Part of comprehensive addiction treatment center',
    area: 'central'
  },

  // ALPHA 180 TRANSITIONAL LIVING (VERIFIED)
  {
    id: 'alpha-180-transitional-living',
    name: 'Alpha 180 - Transitional Living Program',
    description: 'Transitional living environment specifically for men age 17+ committed to recovery and academics',
    website: 'https://www.alpha180.com/transitional-living-program',
    address: 'Austin, TX',
    housingType: 'transitional_housing',
    genderRestriction: 'men_only',
    costRange: 'moderate',
    availabilityStatus: 'available',
    
    matFriendly: false,
    traumaInformed: true,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Academic Focus', 'Life Skills Building', 'Young Men 17+'],
    notes: 'Specifically designed for men committed to recovery and pursuing academics',
    area: 'central'
  },

  // HEARTWOOD RECOVERY (VERIFIED)
  {
    id: 'heartwood-recovery-sober-living',
    name: 'Heartwood Recovery - Men\'s Sober Living House',
    description: 'Men\'s sober living house connected to addiction treatment facility',
    website: 'https://heartwoodrecovery.com/residential-rehab-in-austin-texas/mens-sober-living-house-in-austin-texas',
    address: 'Austin, TX',
    housingType: 'sober_living',
    genderRestriction: 'men_only',
    costRange: 'moderate',
    availabilityStatus: 'unknown',
    
    matFriendly: false,
    traumaInformed: true,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Men Only', 'Treatment Integration', 'Residential Support'],
    notes: 'Part of comprehensive addiction treatment facility',
    area: 'central'
  },

  // SOUTH MEADOWS RECOVERY (VERIFIED)
  {
    id: 'south-meadows-transitional-housing',
    name: 'South Meadows Recovery - Transitional Housing',
    description: 'Transitional housing with superior support and resources beyond typical sober living',
    website: 'https://southmeadowsrecovery.com/austin-transitional-housing',
    address: 'Austin, TX',
    housingType: 'transitional_housing',
    genderRestriction: 'mixed',
    costRange: 'moderate',
    availabilityStatus: 'unknown',
    
    matFriendly: true,
    traumaInformed: true,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Enhanced Support Services', 'Superior Resources', 'Treatment Integration'],
    notes: 'Offers more comprehensive support than typical sober living homes',
    area: 'south'
  },

  // THE ARBOR (VERIFIED from Sober Austin)
  {
    id: 'the-arbor-sober-living',
    name: 'The Arbor - Sober Living Home',
    description: 'Sober living home serving Central Austin and North Central Austin areas',
    phone: '(844) 560-7270',
    website: 'https://www.thearbor.com/arbor-sober-living-home-austin',
    address: 'Central Austin and North Central Austin',
    housingType: 'sober_living',
    genderRestriction: 'mixed',
    costRange: 'moderate',
    availabilityStatus: 'unknown',
    
    matFriendly: false,
    traumaInformed: false,
    lgbtqAffirming: false,
    veteransSpecific: false,
    familyFriendly: false,
    
    sobrietyRequirement: 30,
    backgroundCheckRequired: true,
    employmentRequired: false,
    
    specialties: ['Multiple Locations', 'Central Austin Access'],
    notes: 'Serves both Central and North Central Austin areas',
    area: 'central'
  }
]

export default function SoberLivingPage() {
  const [selectedHousingType, setSelectedHousingType] = useState<string>('all')
  const [selectedGender, setSelectedGender] = useState<string>('all')
  const [selectedCostRange, setSelectedCostRange] = useState<string>('all')
  const [showMatFriendlyOnly, setShowMatFriendlyOnly] = useState(false)

  // Get featured facility
  const featuredFacility = soberLivingResources.find(r => r.featured)
  const otherFacilities = soberLivingResources.filter(r => !r.featured)

  const filteredResources = otherFacilities.filter(resource => {
    const housingTypeMatch = selectedHousingType === 'all' || resource.housingType === selectedHousingType
    const genderMatch = selectedGender === 'all' || 
      resource.genderRestriction === selectedGender || 
      resource.genderRestriction === 'mixed'
    const costMatch = selectedCostRange === 'all' || resource.costRange === selectedCostRange
    const matMatch = !showMatFriendlyOnly || resource.matFriendly === true
    
    return housingTypeMatch && genderMatch && costMatch && matMatch
  })

  const getCostRangeText = (range: string) => {
    switch (range) {
      case 'budget': return 'Under $600'
      case 'moderate': return '$600-1200'
      case 'expensive': return '$1200-2000'
      case 'premium': return '$2000+'
      default: return range
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50'
      case 'waitlist': return 'text-yellow-600 bg-yellow-50'
      case 'full': return 'text-red-600 bg-red-50'
      case 'unknown': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getHousingTypeIcon = (type: string) => {
    switch (type) {
      case 'sober_living': return <Home className="w-5 h-5" />
      case 'oxford_house': return <Users className="w-5 h-5" />
      case 'halfway_house': return <Shield className="w-5 h-5" />
      case 'transitional_housing': return <Clock className="w-5 h-5" />
      case 'reentry_housing': return <ArrowLeft className="w-5 h-5" />
      case 'veterans_housing': return <Star className="w-5 h-5" />
      case 'faith_based': return <Heart className="w-5 h-5" />
      default: return <Home className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">🏠 Sober Living & Alternative Reentry Housing</h1>
            <p className="text-purple-100 text-lg max-w-3xl mx-auto">
              Verified sober living homes, transitional housing, and recovery residences in Austin. 
              Find safe, supportive housing for your recovery journey.
            </p>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Featured Facility Section */}
      {featuredFacility && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-semibold">FEATURED RECOMMENDATION</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{featuredFacility.name}</h2>
              <p className="text-teal-100 text-lg max-w-2xl mx-auto">{featuredFacility.description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  {featuredFacility.phone && (
                    <a 
                      href={`tel:${featuredFacility.phone}`}
                      className="flex items-center bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-lg"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-semibold">{featuredFacility.phone}</div>
                        <div className="text-sm text-teal-100">Tap to call</div>
                      </div>
                    </a>
                  )}
                  {featuredFacility.website && (
                    <a 
                      href={featuredFacility.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-teal-100 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  )}
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{featuredFacility.address}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Why We Recommend RCL</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-pink-300" />
                      <span className="text-sm">MAT-Friendly (Medication-Assisted Treatment)</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-blue-300" />
                      <span className="text-sm">Trauma-Informed Care</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-yellow-300" />
                      <span className="text-sm">LGBTQ+ Affirming</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-300" />
                      <span className="text-sm">Moderate Cost: ${featuredFacility.monthlyRateMin}-${featuredFacility.monthlyRateMax}/month</span>
                    </div>
                  </div>
                  <p className="text-sm text-teal-100 italic mt-4">
                    {featuredFacility.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={selectedHousingType}
              onChange={(e) => setSelectedHousingType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Housing Types</option>
              <option value="sober_living">Sober Living Homes</option>
              <option value="oxford_house">Oxford Houses</option>
              <option value="transitional_housing">Transitional Housing</option>
              <option value="faith_based">Faith-Based</option>
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Genders</option>
              <option value="mixed">Co-ed</option>
              <option value="men_only">Men Only</option>
              <option value="women_only">Women Only</option>
            </select>

            <select
              value={selectedCostRange}
              onChange={(e) => setSelectedCostRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Price Ranges</option>
              <option value="budget">Budget (Under $600)</option>
              <option value="moderate">Moderate ($600-1200)</option>
              <option value="expensive">Higher ($1200-2000)</option>
            </select>

            <button
              onClick={() => setShowMatFriendlyOnly(!showMatFriendlyOnly)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showMatFriendlyOnly 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💊 MAT-Friendly Only
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing {filteredResources.length} of {otherFacilities.length} verified housing options
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <SoberLivingCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No housing options match your current filters.</p>
            <button
              onClick={() => {
                setSelectedHousingType('all')
                setSelectedGender('all')
                setSelectedCostRange('all')
                setShowMatFriendlyOnly(false)
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Important Information</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>All resources on this page are verified and real.</strong> Availability changes daily. 
              Call ahead to confirm bed availability and current requirements.
            </p>
            <p>
              <strong>MAT-Friendly:</strong> Facilities marked as MAT-friendly welcome residents using medication-assisted treatment 
              like methadone, buprenorphine, or naltrexone as part of their recovery.
            </p>
            <p>
              <strong>Costs may vary</strong> based on location, services included, and individual circumstances. 
              Ask about sliding scale fees, insurance acceptance, and scholarship programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SoberLivingCard({ resource }: { resource: SoberLivingResource }) {
  const getCostRangeText = (range: string) => {
    switch (range) {
      case 'budget': return 'Under $600'
      case 'moderate': return '$600-1200'
      case 'expensive': return '$1200-2000'
      case 'premium': return '$2000+'
      default: return range
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-700 bg-green-100'
      case 'waitlist': return 'text-yellow-700 bg-yellow-100'
      case 'full': return 'text-red-700 bg-red-100'
      case 'unknown': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getHousingTypeIcon = (type: string) => {
    switch (type) {
      case 'sober_living': return <Home className="w-5 h-5" />
      case 'oxford_house': return <Users className="w-5 h-5" />
      case 'halfway_house': return <Shield className="w-5 h-5" />
      case 'transitional_housing': return <Clock className="w-5 h-5" />
      case 'reentry_housing': return <ArrowLeft className="w-5 h-5" />
      case 'veterans_housing': return <Star className="w-5 h-5" />
      case 'faith_based': return <Heart className="w-5 h-5" />
      default: return <Home className="w-5 h-5" />
    }
  }

  const formatHousingType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight pr-2">
            {resource.name}
          </h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(resource.availabilityStatus)} flex-shrink-0`}>
            {resource.availabilityStatus.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{resource.description}</p>
        
        {/* Housing Type & Gender */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            {getHousingTypeIcon(resource.housingType)}
            <span className="ml-1">{formatHousingType(resource.housingType)}</span>
          </div>
          <span>•</span>
          <span className="capitalize">{resource.genderRestriction.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        {resource.phone && (
          <a 
            href={`tel:${resource.phone}`}
            className="flex items-center bg-purple-50 hover:bg-purple-100 transition-colors p-3 rounded-lg border border-purple-200"
          >
            <Phone className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-purple-700">{resource.phone}</div>
              <div className="text-sm text-purple-600">Tap to call</div>
            </div>
          </a>
        )}

        {resource.website && (
          <a 
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:bg-gray-50 transition-colors p-2 rounded"
          >
            <ExternalLink className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-blue-600 hover:underline truncate">Visit Website</span>
          </a>
        )}

        {resource.address && (
          <div className="flex items-start text-sm">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600">{resource.address}</span>
          </div>
        )}

        {/* Cost Information */}
        <div className="flex items-center text-sm">
          <DollarSign className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <div>
            <span className="font-medium text-gray-700">{getCostRangeText(resource.costRange)}</span>
            {resource.monthlyRateMin && resource.monthlyRateMax && (
              <span className="text-gray-500 ml-2">
                (${resource.monthlyRateMin}-${resource.monthlyRateMax}/month)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.matFriendly && (
            <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
              💊 MAT Friendly
            </span>
          )}
          {resource.traumaInformed && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">
              🛡️ Trauma-Informed
            </span>
          )}
          {resource.lgbtqAffirming && (
            <span className="inline-block bg-rainbow-100 text-purple-700 text-xs px-2 py-1 rounded font-medium">
              🏳️‍🌈 LGBTQ+ Affirming
            </span>
          )}
          {resource.veteransSpecific && (
            <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-medium">
              🇺🇸 Veterans Only
            </span>
          )}
          {resource.familyFriendly && (
            <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-medium">
              👨‍👩‍👧‍👦 Family Friendly
            </span>
          )}
        </div>

        {/* Requirements */}
        {(resource.sobrietyRequirement || resource.backgroundCheckRequired || resource.employmentRequired) && (
          <div className="text-xs text-gray-600 space-y-1">
            <div className="font-medium text-gray-700">Requirements:</div>
            {resource.sobrietyRequirement && (
              <div>• {resource.sobrietyRequirement} days clean required</div>
            )}
            {resource.backgroundCheckRequired && (
              <div>• Background check required</div>
            )}
            {resource.employmentRequired && (
              <div>• Employment required</div>
            )}
          </div>
        )}
      </div>

      {/* Specialties */}
      {resource.specialties && resource.specialties.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {resource.specialties.slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
            {resource.specialties.length > 3 && (
              <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded">
                +{resource.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-gray-200">
        {resource.area && (
          <div className="flex justify-between items-center">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {resource.area.charAt(0).toUpperCase() + resource.area.slice(1)} Austin
            </span>
          </div>
        )}
        
        {/* Notes */}
        {resource.notes && (
          <p className="text-xs text-gray-600 italic mt-2">{resource.notes}</p>
        )}
      </div>
    </div>
  )
}