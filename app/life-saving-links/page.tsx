'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, MessageSquare, ExternalLink, AlertTriangle, Clock, MapPin, Heart, Shield } from 'lucide-react'

interface CrisisResource {
  id: string
  name: string
  description: string
  phone?: string
  textNumber?: string
  website?: string
  address?: string
  hours: string
  category: 'immediate' | 'acute' | 'treatment' | 'ongoing'
  urgency: 'emergency' | 'urgent' | 'high' | 'medium'
  specialties?: string[]
  notes?: string
  waitTime?: string
}

const lifeSavingResources: CrisisResource[] = [
  // IMMEDIATE CRISIS (Emergency/Life-threatening)
  {
    id: 'national-suicide-lifeline',
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential crisis support 24/7 for people in suicidal crisis or emotional distress',
    phone: '988',
    textNumber: '988',
    website: 'https://988lifeline.org',
    hours: '24/7',
    category: 'immediate',
    urgency: 'emergency',
    specialties: ['Suicide Prevention', 'Crisis Counseling', 'Emotional Support']
  },
  {
    id: 'crisis-text-line',
    name: 'Crisis Text Line',
    description: 'Free, 24/7 crisis support via text message with trained crisis counselors',
    textNumber: '741741',
    website: 'https://www.crisistextline.org',
    hours: '24/7',
    category: 'immediate',
    urgency: 'emergency',
    notes: 'Text HOME to 741741',
    specialties: ['Text Support', 'Crisis Intervention', 'Teen Support']
  },
  {
    id: 'austin-police-mental-health',
    name: 'Austin Police Mental Health Unit',
    description: 'Specialized officers trained in mental health crisis response',
    phone: '(512) 974-5750',
    address: 'Austin, TX',
    hours: '24/7',
    category: 'immediate',
    urgency: 'emergency',
    specialties: ['Mental Health Crisis', 'CIT Officers', 'Emergency Response']
  },
  {
    id: 'integral-care-crisis',
    name: 'Integral Care Crisis Hotline',
    description: 'Local Austin crisis line for mental health emergencies and suicide prevention',
    phone: '(512) 472-4357',
    website: 'https://integralcare.org',
    hours: '24/7',
    category: 'immediate',
    urgency: 'emergency',
    specialties: ['Local Crisis Support', 'Mental Health Emergency', 'Assessment']
  },
  {
    id: 'emergency-services',
    name: 'Emergency Services (911)',
    description: 'Call for immediate life-threatening emergencies',
    phone: '911',
    hours: '24/7',
    category: 'immediate',
    urgency: 'emergency',
    notes: 'For immediate danger to self or others'
  },

  // ACUTE INTERVENTION (Same-day/Urgent Care)
  {
    id: 'austin-state-hospital',
    name: 'Austin State Hospital',
    description: 'Inpatient psychiatric hospital providing acute mental health treatment',
    phone: '(512) 419-2000',
    address: '4110 Guadalupe St, Austin, TX 78751',
    website: 'https://www.dshs.texas.gov/austin-state-hospital',
    hours: '24/7 Admissions',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Inpatient Psychiatric', 'Acute Mental Health', 'Crisis Stabilization'],
    waitTime: 'Emergency admission available'
  },
  {
    id: 'dell-seton-behavioral',
    name: 'Dell Seton Medical Center - Behavioral Health',
    description: 'Emergency psychiatric services and inpatient behavioral health unit',
    phone: '(512) 324-7000',
    address: '1501 W 38th St, Austin, TX 78731',
    website: 'https://www.seton.net',
    hours: '24/7 Emergency',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Psychiatric Emergency', 'Inpatient Care', 'Crisis Assessment']
  },
  {
    id: 'st-davids-behavioral',
    name: 'St. David\'s Center for Behavioral Health',
    description: 'Comprehensive behavioral health services including emergency psychiatric care',
    phone: '(512) 544-5253',
    address: '1025 E 32nd St, Austin, TX 78705',
    website: 'https://stdavids.com/behavioral-health',
    hours: '24/7 Emergency Services',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Adult Inpatient', 'Adolescent Care', 'Crisis Stabilization', 'Dual Diagnosis']
  },
  {
    id: 'university-medical-center-brackenridge',
    name: 'Dell Medical School - Emergency Psychiatry',
    description: 'Emergency psychiatric evaluation and crisis intervention services',
    phone: '(512) 324-7000',
    address: '1501 Red River St, Austin, TX 78701',
    hours: '24/7',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Psychiatric Emergency', 'Crisis Evaluation', 'Medical Clearance']
  },
  {
    id: 'shoal-creek-hospital',
    name: 'Shoal Creek Hospital',
    description: 'Private psychiatric hospital providing acute inpatient mental health treatment',
    phone: '(512) 452-0361',
    address: '3501 Mills Ave, Austin, TX 78731',
    website: 'https://www.shoalcreekhospital.com',
    hours: '24/7 Admissions',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Adult Inpatient', 'Adolescent Unit', 'Geriatric Care', 'Dual Diagnosis'],
    waitTime: 'Call for bed availability'
  },
  {
    id: 'rock-springs-behavioral',
    name: 'Rock Springs Behavioral Hospital',
    description: 'Inpatient psychiatric facility for adults and adolescents in crisis',
    phone: '(512) 478-4040',
    address: '700 SE Inner Loop, Georgetown, TX 78626',
    website: 'https://rockspringshospital.com',
    hours: '24/7 Admissions',
    category: 'acute',
    urgency: 'urgent',
    specialties: ['Adult Psychiatric', 'Adolescent Program', 'Crisis Intervention'],
    notes: '20 minutes north of Austin'
  },

  // DETOX & TREATMENT ENTRY
  {
    id: 'austin-recovery',
    name: 'Austin Recovery',
    description: 'Comprehensive addiction treatment including medical detox and residential care',
    phone: '(512) 697-8805',
    address: '4201 South Congress Ave, Austin, TX 78745',
    website: 'https://www.austinrecovery.org',
    hours: 'Mon-Fri 8am-5pm, Emergency intake available',
    category: 'treatment',
    urgency: 'high',
    specialties: ['Medical Detox', 'Residential Treatment', 'Outpatient Programs', 'MAT'],
    waitTime: 'Same-day assessment available'
  },
  {
    id: 'integral-care-detox',
    name: 'Integral Care Detox Services',
    description: 'Local public mental health authority providing detox and treatment services',
    phone: '(512) 472-4357',
    address: 'Multiple locations in Austin',
    website: 'https://integralcare.org/services/substance-use',
    hours: '24/7 Crisis Line, Business hours for intake',
    category: 'treatment',
    urgency: 'high',
    specialties: ['Medical Detox', 'Outpatient Treatment', 'MAT', 'Mental Health'],
    notes: 'Sliding scale fees available'
  },
  {
    id: 'cedar-crest-hospital',
    name: 'Cedar Crest Hospital & Residential Treatment',
    description: 'Dual diagnosis treatment facility for mental health and substance abuse',
    phone: '(254) 939-2100',
    address: '3500 S Interstate 35, Belton, TX 76513',
    website: 'https://www.cedarcresthospital.com',
    hours: '24/7 Admissions',
    category: 'treatment',
    urgency: 'high',
    specialties: ['Dual Diagnosis', 'Detox', 'Residential Treatment', 'PHP/IOP'],
    notes: '1 hour south of Austin, insurance accepted'
  },
  {
    id: 'phoenix-house-texas',
    name: 'Phoenix House Texas',
    description: 'Long-term residential addiction treatment program',
    phone: '(512) 386-1100',
    address: '12729 Hill Country Blvd, Austin, TX 78738',
    website: 'https://www.phoenixhouse.org/texas',
    hours: 'Mon-Fri 9am-5pm',
    category: 'treatment',
    urgency: 'medium',
    specialties: ['Long-term Residential', 'Therapeutic Community', 'Aftercare'],
    waitTime: 'Assessment required, waitlist possible'
  },
  {
    id: 'cross-creek-hospital',
    name: 'Cross Creek Hospital',
    description: 'Psychiatric and addiction treatment facility',
    phone: '(512) 215-3838',
    address: '8402 Cross Park Dr, Austin, TX 78754',
    website: 'https://crosscreekhospital.com',
    hours: '24/7',
    category: 'treatment',
    urgency: 'high',
    specialties: ['Psychiatric Care', 'Addiction Treatment', 'Dual Diagnosis', 'PHP/IOP']
  },

  // ONGOING SUPPORT
  {
    id: 'nami-austin',
    name: 'NAMI Austin',
    description: 'Mental health support, education, and advocacy organization',
    phone: '(512) 420-9810',
    address: '2020 Guadalupe St, Austin, TX 78705',
    website: 'https://www.namiaustin.org',
    hours: 'Mon-Fri 9am-5pm',
    category: 'ongoing',
    urgency: 'medium',
    specialties: ['Support Groups', 'Education', 'Advocacy', 'Family Support']
  },
  {
    id: 'mental-health-america-texas',
    name: 'Mental Health America of Central Texas',
    description: 'Mental health advocacy, education, and support services',
    phone: '(512) 454-3706',
    website: 'https://www.mhacentraltx.org',
    hours: 'Mon-Fri 9am-5pm',
    category: 'ongoing',
    urgency: 'medium',
    specialties: ['Education', 'Advocacy', 'Support Groups', 'Resource Navigation']
  },
  {
    id: 'austin-child-guidance-center',
    name: 'Austin Child Guidance Center',
    description: 'Mental health services for children, teens, and families',
    phone: '(512) 451-2242',
    address: '810 W 45th St, Austin, TX 78751',
    website: 'https://www.austinchildguidance.org',
    hours: 'Mon-Fri 8am-6pm, Emergency services available',
    category: 'ongoing',
    urgency: 'medium',
    specialties: ['Child/Teen Mental Health', 'Family Therapy', 'Crisis Services', 'School-based'],
    notes: 'Sliding scale fees, insurance accepted'
  },
  {
    id: 'family-eldercare-mental-health',
    name: 'Family Eldercare - Mental Health Services',
    description: 'Mental health support specifically for older adults',
    phone: '(512) 459-4865',
    website: 'https://www.familyeldercare.org',
    hours: 'Mon-Fri 8am-5pm',
    category: 'ongoing',
    urgency: 'medium',
    specialties: ['Senior Mental Health', 'Depression/Anxiety', 'Grief Counseling', 'Caregiver Support']
  }
]

export default function LifeSavingLinksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all')

  const filteredResources = lifeSavingResources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory
    const urgencyMatch = selectedUrgency === 'all' || resource.urgency === selectedUrgency
    return categoryMatch && urgencyMatch
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-600 text-white'
      case 'urgent': return 'bg-orange-500 text-white'
      case 'high': return 'bg-yellow-500 text-white'
      case 'medium': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'immediate': return <AlertTriangle className="w-5 h-5" />
      case 'acute': return <Shield className="w-5 h-5" />
      case 'treatment': return <Heart className="w-5 h-5" />
      case 'ongoing': return <Clock className="w-5 h-5" />
      default: return <Phone className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">🚨 LIFE-SAVING LINKS - GET HELP NOW 🚨</h1>
          <p className="text-red-100 mb-4">If you&apos;re in immediate danger, call 911. If you&apos;re thinking about suicide, call 988.</p>
          
          {/* Emergency Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
            <a href="tel:988" className="flex items-center justify-center bg-white text-red-600 rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors font-bold text-lg min-w-[200px]">
              <Phone className="w-6 h-6 mr-2" />
              988 - Crisis Lifeline
            </a>
            <a href="sms:741741&body=HOME" className="flex items-center justify-center bg-white text-red-600 rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors font-bold text-lg min-w-[200px]">
              <MessageSquare className="w-6 h-6 mr-2" />
              Text HOME to 741741
            </a>
            <a href="tel:911" className="flex items-center justify-center bg-yellow-500 text-white rounded-lg px-6 py-3 hover:bg-yellow-600 transition-colors font-bold text-lg min-w-[200px]">
              <AlertTriangle className="w-6 h-6 mr-2" />
              911 - Emergency
            </a>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-red-700 hover:text-red-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Page Description */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Life-Saving Mental Health & Crisis Resources</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Immediate access to psychiatric hospitals, detox centers, crisis intervention, and emergency mental health services in Austin. 
              All resources are verified and available when you need help most.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Resources ({lifeSavingResources.length})
              </button>
              <button
                onClick={() => setSelectedCategory('immediate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'immediate' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🚨 Immediate Crisis (5)
              </button>
              <button
                onClick={() => setSelectedCategory('acute')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'acute' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏥 Psychiatric Hospitals (6)
              </button>
              <button
                onClick={() => setSelectedCategory('treatment')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'treatment' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                💊 Detox & Treatment (5)
              </button>
              <button
                onClick={() => setSelectedCategory('ongoing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'ongoing' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🤝 Ongoing Support (4)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <CrisisResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No resources match your current filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedUrgency('all')
              }}
              className="mt-4 text-red-600 hover:text-red-700 font-medium"
            >
              Show all resources
            </button>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-t-2 border-yellow-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-2" />
            <h3 className="text-xl font-bold text-yellow-800">Important Notice</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These resources are life-saving tools when you need immediate help. If you&apos;re experiencing thoughts of self-harm 
            or suicide, please reach out immediately. You matter, your life has value, and help is available 24/7. 
            This crisis will pass, and there are people ready to help you through it.
          </p>
        </div>
      </div>
    </div>
  )
}

function CrisisResourceCard({ resource }: { resource: CrisisResource }) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-600 text-white'
      case 'urgent': return 'bg-orange-500 text-white'
      case 'high': return 'bg-yellow-500 text-white'
      case 'medium': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'immediate': return <AlertTriangle className="w-5 h-5" />
      case 'acute': return <Shield className="w-5 h-5" />
      case 'treatment': return <Heart className="w-5 h-5" />
      case 'ongoing': return <Clock className="w-5 h-5" />
      default: return <Phone className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight pr-2">
            {resource.name}
          </h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(resource.urgency)} flex-shrink-0`}>
            {resource.urgency.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{resource.description}</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        {resource.phone && (
          <a 
            href={`tel:${resource.phone}`}
            className="flex items-center bg-red-50 hover:bg-red-100 transition-colors p-3 rounded-lg border border-red-200"
          >
            <Phone className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-red-700">{resource.phone}</div>
              <div className="text-sm text-red-600">Tap to call</div>
            </div>
          </a>
        )}

        {resource.textNumber && (
          <a 
            href={`sms:${resource.textNumber}${resource.notes?.includes('HOME') ? '&body=HOME' : ''}`}
            className="flex items-center bg-blue-50 hover:bg-blue-100 transition-colors p-3 rounded-lg border border-blue-200"
          >
            <MessageSquare className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-blue-700">{resource.textNumber}</div>
              <div className="text-sm text-blue-600">
                {resource.notes?.includes('HOME') ? 'Text HOME' : 'Tap to text'}
              </div>
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

        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className={`${resource.hours.includes('24') ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
            {resource.hours}
          </span>
        </div>
      </div>

      {/* Specialties */}
      {resource.specialties && resource.specialties.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {resource.specialties.slice(0, 4).map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded font-medium"
              >
                {specialty}
              </span>
            ))}
            {resource.specialties.length > 4 && (
              <span className="inline-block bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded font-medium">
                +{resource.specialties.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer with category and wait time */}
      <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          {getCategoryIcon(resource.category)}
          <span className="ml-1 capitalize">{resource.category.replace('_', ' ')}</span>
        </div>
        {resource.waitTime && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {resource.waitTime}
          </span>
        )}
      </div>

      {/* Important notes */}
      {resource.notes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 italic">{resource.notes}</p>
        </div>
      )}
    </div>
  )
}