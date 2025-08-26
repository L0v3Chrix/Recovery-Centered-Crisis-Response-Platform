import { ArrowLeft, Heart, Phone, MapPin, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function RecoveryPage() {
  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-purple-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">💜 RECOVERY RESOURCES</h1>
          <p className="text-purple-100">Your journey to recovery starts here - you&apos;re not alone</p>
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

        {/* Immediate Support */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Start Your Recovery Today
          </h2>
          <div className="grid gap-4">
            <RecoveryResourceCard
              name="Austin Recovery Center"
              address="4201 South Congress Ave, Austin, TX 78745"
              phone="(512) 444-8400"
              website="austinrecovery.org"
              type="Comprehensive Treatment"
              hours="Mon-Fri 8am-5pm"
              services={['Assessment', 'Outpatient treatment', 'MAT (Medication-Assisted Treatment)', 'Group therapy', 'Individual counseling']}
              recoveryStages={['Getting started', 'Early recovery', 'Maintenance']}
              isHighlighted={true}
            />
            
            <RecoveryResourceCard
              name="SAMHSA National Helpline"
              address="National 24/7 Helpline"
              phone="1-800-662-4357"
              type="Information & Referral"
              hours="24/7/365"
              services={['Treatment referrals', 'Information service', 'English & Spanish', 'Free & confidential']}
              recoveryStages={['Crisis', 'Getting started']}
              isHighlighted={true}
            />
          </div>
        </div>

        {/* Treatment Programs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Treatment Programs</h2>
          <div className="grid gap-4">
            <RecoveryResourceCard
              name="Integral Care Substance Abuse Services"
              address="1430 Collier St, Austin, TX 78704"
              phone="(512) 472-4357"
              type="Outpatient Treatment"
              hours="Mon-Fri 8am-5pm"
              services={['Outpatient treatment', 'Intensive outpatient (IOP)', 'Individual therapy', 'Group sessions', 'Family therapy']}
              recoveryStages={['Treatment', 'Early recovery']}
            />

            <RecoveryResourceCard
              name="Phoenix House Texas"
              address="Multiple Austin locations"
              phone="(512) 442-7722"
              type="Residential & Outpatient"
              hours="24/7 intake available"
              services={['Residential treatment', 'Outpatient programs', 'Detox services', 'Aftercare planning']}
              recoveryStages={['Detox', 'Treatment', 'Transition']}
            />

            <RecoveryResourceCard
              name="Community Medical Services"
              address="Multiple Austin locations"
              phone="(512) 458-2111"
              type="Medication-Assisted Treatment"
              hours="Mon-Sat, hours vary by location"
              services={['Methadone treatment', 'Suboxone programs', 'Naltrexone', 'Counseling services']}
              recoveryStages={['Treatment', 'Maintenance']}
            />
          </div>
        </div>

        {/* Support Groups & Meetings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Support Groups & Meetings
          </h2>
          <div className="grid gap-4">
            <SupportGroupCard
              name="Alcoholics Anonymous (AA)"
              description="12-step recovery program for alcohol addiction"
              phone="(512) 444-0071"
              website="austinaa.org"
              meetingTimes="Daily meetings throughout Austin"
              cost="Free"
            />

            <SupportGroupCard
              name="Narcotics Anonymous (NA)"
              description="12-step recovery program for drug addiction"
              phone="(512) 480-0004"
              website="centraltexasna.org"
              meetingTimes="Daily meetings throughout Austin"
              cost="Free"
            />

            <SupportGroupCard
              name="SMART Recovery"
              description="Self-management and recovery training program"
              phone="(440) 951-5357"
              website="smartrecovery.org"
              meetingTimes="Weekly meetings at various locations"
              cost="Free"
            />

            <SupportGroupCard
              name="Celebrate Recovery"
              description="Christ-centered recovery program"
              phone="Various churches"
              website="celebraterecovery.com"
              meetingTimes="Weekly meetings at multiple churches"
              cost="Free"
            />
          </div>
        </div>

        {/* Recovery Housing */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recovery Housing</h2>
          <div className="grid gap-4">
            <RecoveryResourceCard
              name="Oxford House Austin"
              address="Multiple locations throughout Austin"
              phone="(512) 420-8516"
              website="oxfordhousetx.org"
              type="Sober Living"
              hours="Call for availability"
              services={['Democratic living', 'Peer support', 'No time limit', 'Self-governing communities']}
              recoveryStages={['Early recovery', 'Maintenance', 'Transition']}
            />

            <RecoveryResourceCard
              name="Austin Recovery House"
              address="Contact for location information"
              phone="(512) 524-8010"
              type="Supervised Sober Living"
              hours="24/7"
              services={['Structured environment', 'Case management', 'Life skills training', 'Job placement assistance']}
              recoveryStages={['Early recovery', 'Transition']}
            />
          </div>
        </div>

        {/* Specialized Programs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Specialized Programs</h2>
          <div className="grid gap-4">
            <SpecializedProgramCard
              name="Women's Recovery Programs"
              programs={[
                { name: "The Arbor Behavioral Healthcare", phone: "(844) 413-2690", specialty: "Women-specific addiction treatment" },
                { name: "Grace & Emerge Recovery", phone: "(512) 555-0123", specialty: "Trauma-informed care for women" }
              ]}
            />

            <SpecializedProgramCard
              name="LGBTQ+ Recovery Services"
              programs={[
                { name: "Nova Recovery Center", phone: "(512) 605-2955", specialty: "LGBTQ+ affirming treatment" },
                { name: "Out Youth Recovery Support", phone: "(512) 419-1233", specialty: "LGBTQ+ youth support" }
              ]}
            />

            <SpecializedProgramCard
              name="Veterans Recovery Services"
              programs={[
                { name: "VA Texas Healthcare System", phone: "(512) 823-4000", specialty: "Veterans-specific treatment" },
                { name: "Volunteers of America", phone: "(512) 476-6084", specialty: "Veterans housing and recovery" }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface RecoveryResourceCardProps {
  name: string
  address: string
  phone: string
  website?: string
  type: string
  hours: string
  services: string[]
  recoveryStages: string[]
  isHighlighted?: boolean
}

function RecoveryResourceCard({ 
  name, 
  address, 
  phone, 
  website, 
  type, 
  hours, 
  services, 
  recoveryStages,
  isHighlighted 
}: RecoveryResourceCardProps) {
  const cardClasses = isHighlighted 
    ? "border-2 border-purple-300 bg-purple-50" 
    : "border border-gray-200"

  return (
    <div className={`${cardClasses} rounded-lg p-4 hover:border-purple-300 transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-purple-600 font-medium">{type}</span>
          {isHighlighted && (
            <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Recommended
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-start gap-1 text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{address}</span>
      </div>
      
      <div className="flex items-start gap-1 text-sm text-gray-600 mb-3">
        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{hours}</span>
      </div>
      
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2">Recovery Stages:</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {recoveryStages.map((stage, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {stage}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mb-2">Services:</p>
        <div className="flex flex-wrap gap-1">
          {services.map((service, index) => (
            <span 
              key={index}
              className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex gap-3">
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
        >
          <Phone className="w-4 h-4" />
          {phone}
        </a>
        {website && (
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {website}
          </a>
        )}
      </div>
    </div>
  )
}

interface SupportGroupCardProps {
  name: string
  description: string
  phone: string
  website: string
  meetingTimes: string
  cost: string
}

function SupportGroupCard({ name, description, phone, website, meetingTimes, cost }: SupportGroupCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
      <h3 className="font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        <div>
          <span className="font-medium">Meeting Times:</span>
          <br />
          {meetingTimes}
        </div>
        <div>
          <span className="font-medium">Cost:</span>
          <br />
          <span className="text-green-600 font-medium">{cost}</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
        >
          <Phone className="w-4 h-4" />
          {phone}
        </a>
        <a
          href={`https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {website}
        </a>
      </div>
    </div>
  )
}

interface SpecializedProgramCardProps {
  name: string
  programs: Array<{
    name: string
    phone: string
    specialty: string
  }>
}

function SpecializedProgramCard({ name, programs }: SpecializedProgramCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">{name}</h3>
      <div className="space-y-3">
        {programs.map((program, index) => (
          <div key={index} className="border-l-4 border-purple-200 pl-3">
            <h4 className="font-medium text-gray-700">{program.name}</h4>
            <p className="text-sm text-gray-600 mb-1">{program.specialty}</p>
            <a
              href={`tel:${program.phone}`}
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm"
            >
              <Phone className="w-3 h-3" />
              {program.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}