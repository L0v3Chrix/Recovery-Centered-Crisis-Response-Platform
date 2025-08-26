import { AlertTriangle, Utensils, Home, Heart, Phone, MapPin, Search, Gavel, Activity } from 'lucide-react'
import LocationPrompt from '@/components/LocationPrompt'

interface CategoryCardProps {
  title: string
  subtitle: string
  description: string
  icon: string
  bgColor: string
  href: string
  urgent?: boolean
}

function CategoryCard({ title, subtitle, description, icon, bgColor, href, urgent = false }: CategoryCardProps) {
  return (
    <a
      href={href}
      className={`${bgColor} text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 block group relative overflow-hidden`}
    >
      {urgent && (
        <div className="absolute top-2 right-2">
          <span className="bg-white text-urgent-coral-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            URGENT
          </span>
        </div>
      )}
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-xl font-bold mb-1">
          {title}
          {subtitle && <span className="text-sm font-normal ml-1">{subtitle}</span>}
        </h3>
        <p className="text-white/90 text-sm">
          {description}
        </p>
      </div>
    </a>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-cream-50 to-white">
      {/* Crisis Banner - Always Visible */}
      <div className="bg-urgent-coral-400 text-white py-3 px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          <span className="font-semibold">🚨 EMERGENCY: Call 988</span>
          <span className="mx-1">|</span>
          <span className="font-medium">Text: HOME to 741741</span>
          <a 
            href="tel:988" 
            className="ml-2 bg-white text-urgent-coral-400 px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            📞 Call Now
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warm-slate-800 mb-4">
            Central Texas Resources
          </h1>
          <p className="text-xl text-warm-slate-600 max-w-2xl mx-auto mb-4">
            Connect instantly to verified help
          </p>
          
          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search: &quot;I need food&quot; or enter location..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-warm-slate-300 rounded-xl focus:ring-2 focus:ring-trust-teal-400 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-warm-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Austin, TX</span>
              <button className="text-trust-teal-600 hover:underline text-sm">[Change]</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-success-sage-400 rounded-full"></span>
              <span className="font-medium">Showing 500+ verified resources</span>
            </div>
          </div>
        </div>

        {/* Enhanced 6-Category Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-warm-slate-800 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <CategoryCard
              title="Crisis"
              subtitle="NOW"
              description="988 | Crisis Text"
              icon="🚨"
              bgColor="bg-urgent-coral-400 hover:bg-urgent-coral-500"
              href="/crisis"
              urgent={true}
            />
            
            <CategoryCard
              title="Food"
              subtitle=""
              description="Meals | Pantries"
              icon="🍽️"
              bgColor="bg-success-sage-400 hover:bg-success-sage-500"
              href="/food"
            />
            
            <CategoryCard
              title="Shelter"
              subtitle=""
              description="Housing | Emergency"
              icon="🏠"
              bgColor="bg-trust-teal-400 hover:bg-trust-teal-500"
              href="/housing"
            />
            
            <CategoryCard
              title="Recovery"
              subtitle=""
              description="Treatment | MAT"
              icon="💜"
              bgColor="bg-compassion-coral-400 hover:bg-compassion-coral-500"
              href="/recovery"
            />
            
            <CategoryCard
              title="Health"
              subtitle=""
              description="Medical | Mental"
              icon="🏥"
              bgColor="bg-hope-mint-400 hover:bg-hope-mint-500"
              href="/healthcare"
            />
            
            <CategoryCard
              title="Legal"
              subtitle=""
              description="Aid | Documents"
              icon="⚖️"
              bgColor="bg-warning-amber-400 hover:bg-warning-amber-500"
              href="/legal"
            />
          </div>
        </div>

        {/* Location Selector */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 text-warm-slate-600">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Location: Austin, TX</span>
            <button className="text-trust-teal-600 hover:underline font-medium">[Change]</button>
          </div>
          <div className="text-success-sage-600 font-medium">
            ✅ Showing 500+ verified resources
          </div>
        </div>

        {/* Live Updates Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-warm-slate-800 mb-4 text-center">Recent Updates (live):</h3>
          <div className="bg-soft-cream-50 rounded-xl p-6 space-y-3 border border-trust-teal-100">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-success-sage-400 rounded-full mt-2"></span>
              <div>
                <span className="text-warm-slate-700">Central Texas Food Bank extended mobile pantry hours</span>
                <span className="text-warm-slate-500 text-sm ml-2">2 hours ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-trust-teal-400 rounded-full mt-2"></span>
              <div>
                <span className="text-warm-slate-700">New emergency shelter opened at 304 E 7th Street</span>
                <span className="text-warm-slate-500 text-sm ml-2">4 hours ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 bg-compassion-coral-400 rounded-full mt-2"></span>
              <div>
                <span className="text-warm-slate-700">Austin Recovery Center now offers walk-in assessments</span>
                <span className="text-warm-slate-500 text-sm ml-2">6 hours ago</span>
              </div>
            </div>
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