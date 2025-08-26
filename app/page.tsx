import { AlertTriangle, Utensils, Home, Heart, Phone, MapPin } from 'lucide-react'
import LocationPrompt from '@/components/LocationPrompt'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Crisis Banner - Always Visible */}
      <div className="bg-red-600 text-white py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          <span className="font-semibold">Crisis Help: Call 988 or</span>
          <a href="tel:988" className="underline hover:no-underline">
            Click to Call Now
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Central Texas Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect to what you need when you need it
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Travis County, Texas</span>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <CrisisActionCard
            title="I need help RIGHT NOW"
            description="Crisis support and emergency resources"
            icon={<AlertTriangle className="w-8 h-8" />}
            bgColor="bg-red-500 hover:bg-red-600"
            href="/crisis"
          />
          
          <CrisisActionCard
            title="I need food today"
            description="Food banks, pantries, and meal programs"
            icon={<Utensils className="w-8 h-8" />}
            bgColor="bg-green-500 hover:bg-green-600"
            href="/food"
          />
          
          <CrisisActionCard
            title="I need shelter tonight"
            description="Emergency shelter and housing assistance"
            icon={<Home className="w-8 h-8" />}
            bgColor="bg-blue-500 hover:bg-blue-600"
            href="/shelter"
          />
          
          <CrisisActionCard
            title="I want to get clean"
            description="Recovery programs and treatment options"
            icon={<Heart className="w-8 h-8" />}
            bgColor="bg-purple-500 hover:bg-purple-600"
            href="/recovery"
          />
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            More Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <ResourceButton title="Healthcare" href="/healthcare" />
            <ResourceButton title="Legal Aid" href="/legal" />
            <ResourceButton title="Transportation" href="/transportation" />
            <ResourceButton title="Employment" href="/employment" />
          </div>
        </div>

        {/* Location Detection */}
        <div className="mt-8">
          <LocationPrompt />
        </div>
      </div>
    </div>
  )
}

interface CrisisActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  bgColor: string
  href: string
}

function CrisisActionCard({ title, description, icon, bgColor, href }: CrisisActionCardProps) {
  return (
    <a
      href={href}
      className={`${bgColor} text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 block group`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-xl font-bold group-hover:text-white">
          {title}
        </h3>
      </div>
      <p className="text-white/90 text-sm">
        {description}
      </p>
    </a>
  )
}

interface ResourceButtonProps {
  title: string
  href: string
}

function ResourceButton({ title, href }: ResourceButtonProps) {
  return (
    <a
      href={href}
      className="bg-white border border-gray-200 text-gray-700 p-4 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-center font-medium"
    >
      {title}
    </a>
  )
}