import { Phone, MessageSquare, ArrowLeft, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { getCrisisResources } from '@/lib/database'

export default function CrisisPage() {
  const crisisResources = getCrisisResources()

  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">🚨 CRISIS SUPPORT - IMMEDIATE HELP 🚨</h1>
          <p className="text-red-100">If you&apos;re thinking about harming yourself or others, get help now</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Immediate Action Cards */}
        <div className="grid gap-4 mb-8">
          {/* Primary Crisis Lines */}
          <CrisisActionCard
            title="988 Suicide & Crisis Lifeline"
            subtitle="24/7 Crisis Support - Free & Confidential"
            description="Talk to someone right now. Available 24/7/365 in English and Spanish."
            phone="988"
            isPrimary={true}
          />

          <CrisisActionCard
            title="Crisis Text Line"
            subtitle="Text Support Available 24/7"
            description="Text HOME to 741741 for crisis support via text message"
            textNumber="741741"
            textKeyword="HOME"
          />

          <CrisisActionCard
            title="Austin/Travis County Crisis Line"
            subtitle="Local Crisis Support"
            description="24/7 local crisis intervention and mental health emergency services"
            phone="(512) 472-4357"
          />

          {/* Emergency Services */}
          <CrisisActionCard
            title="Emergency Services"
            subtitle="Life-threatening emergencies"
            description="Call 911 for immediate medical or psychiatric emergencies"
            phone="911"
            bgColor="bg-orange-500 hover:bg-orange-600"
          />
        </div>

        {/* What to Expect */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What to Expect When You Call</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <p className="text-gray-700">You&apos;ll speak with a trained crisis counselor who will listen</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <p className="text-gray-700">They&apos;ll help you work through your crisis and develop a safety plan</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <p className="text-gray-700">If needed, they&apos;ll connect you with local resources and follow-up care</p>
            </div>
          </div>
        </div>

        {/* Additional Local Resources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Crisis Resources</h2>
          <div className="grid gap-4">
            <LocalCrisisResource
              name="Integral Care Crisis Services"
              address="1430 Collier St, Austin, TX 78704"
              phone="(512) 472-4357"
              services={['24/7 Crisis Line', 'Mobile Crisis Outreach', 'Walk-in Crisis Services']}
              hours="24/7"
            />
            
            <LocalCrisisResource
              name="Austin State Hospital Emergency Services"
              address="4110 Guadalupe St, Austin, TX 78751"
              phone="(512) 452-0361"
              services={['Psychiatric Emergency Services', 'Crisis Assessment']}
              hours="24/7"
            />

            <LocalCrisisResource
              name="NAMI Central Texas Crisis Support"
              address="Phone support and referrals"
              phone="(512) 420-9810"
              services={['Crisis Support', 'Family Support', 'Resource Navigation']}
              hours="Mon-Fri 9am-5pm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CrisisActionCardProps {
  title: string
  subtitle: string
  description: string
  phone?: string
  textNumber?: string
  textKeyword?: string
  bgColor?: string
  isPrimary?: boolean
}

function CrisisActionCard({ 
  title, 
  subtitle, 
  description, 
  phone, 
  textNumber, 
  textKeyword,
  bgColor = "bg-red-500 hover:bg-red-600",
  isPrimary = false
}: CrisisActionCardProps) {
  const cardClasses = isPrimary 
    ? "bg-red-600 hover:bg-red-700 border-4 border-red-400" 
    : bgColor

  return (
    <div className={`${cardClasses} text-white p-6 rounded-xl shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-white/90 text-sm">{subtitle}</p>
        </div>
        {phone && (
          <div className="flex-shrink-0">
            <Phone className="w-8 h-8" />
          </div>
        )}
        {textNumber && (
          <div className="flex-shrink-0">
            <MessageSquare className="w-8 h-8" />
          </div>
        )}
      </div>
      
      <p className="text-white/90 mb-4">{description}</p>
      
      <div className="flex gap-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="call-button bg-white/20 hover:bg-white/30 border border-white/30"
          >
            Call {phone}
          </a>
        )}
        {textNumber && textKeyword && (
          <a
            href={`sms:${textNumber}?body=${textKeyword}`}
            className="call-button bg-white/20 hover:bg-white/30 border border-white/30"
          >
            Text {textKeyword} to {textNumber}
          </a>
        )}
      </div>
    </div>
  )
}

interface LocalCrisisResourceProps {
  name: string
  address: string
  phone: string
  services: string[]
  hours: string
}

function LocalCrisisResource({ name, address, phone, services, hours }: LocalCrisisResourceProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {hours}
        </span>
      </div>
      
      <div className="flex items-start gap-1 text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{address}</span>
      </div>
      
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {services.map((service, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Phone className="w-4 h-4" />
        {phone}
      </a>
    </div>
  )
}