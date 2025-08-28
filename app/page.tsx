import { AlertTriangle, Utensils, Home, Heart, Phone, MapPin, Search, Gavel, Activity } from 'lucide-react'
import LocationPrompt from '@/components/LocationPrompt'
import Link from 'next/link'
import Image from 'next/image'

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
    <div className="min-h-screen bg-aurora">
      {/* Crisis Ribbon - Always Visible */}
      <div className="bg-aurora-crimson600 text-white py-3 px-4 text-center shadow-lg">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          <span className="font-semibold">🚨 EMERGENCY: Call 988</span>
          <span className="mx-1">|</span>
          <span className="font-medium">Text: HOME to 741741</span>
          <a 
            href="tel:988" 
            className="ml-2 bg-white text-aurora-crimson600 px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            📞 Call Now
          </a>
        </div>
      </div>

      {/* Brand Header Section */}
      <div className="py-12 text-center text-white">
        <div className="mb-6">
          {/* Logo Image */}
          <div className="mb-6 flex justify-center">
            <Image 
              src="/brand/logo-hlifeline.svg" 
              alt="HelpNow ATX - Real help, verified daily"
              width={280}
              height={80}
              className="w-auto h-20 md:h-24"
              priority
            />
          </div>
          
          {/* Tagline and badges */}
          <p className="text-lg text-white/80 font-medium mb-3">Real help • Verified daily</p>
          <div className="flex items-center justify-center gap-4">
            <span className="chip bg-white/20 text-white border-white/30">
              <MapPin className="w-3 h-3 mr-1" />
              Austin, TX
            </span>
            <span className="chip bg-aurora-emerald500/20 text-white border-aurora-emerald500/40">
              <span className="w-2 h-2 bg-aurora-emerald500 rounded-full mr-2"></span>
              516+ verified
            </span>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium mt-6">
            Connect instantly to verified help, when you need it most
          </p>
          
          {/* Support Button in Hero */}
          <div className="mt-6">
            <Link 
              href="/support"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-aurora-indigo700 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5 mr-2" />
              Help keep this project alive
            </Link>
          </div>
        </div>

        {/* Search with Mode Toggle */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="mb-4 flex justify-center gap-2">
            <button className="btn-ghost text-white border-white/40 hover:bg-white/10">
              I need help
            </button>
            <button className="btn-quiet text-white/70 hover:text-white hover:bg-white/5">
              I&apos;m helping someone
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search: &quot;I need food&quot; or enter location..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 rounded-xl focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quiz"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-aurora-emerald500 hover:bg-teal-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              📋 Take Assessment
            </Link>
            <Link 
              href="/printable"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-colors duration-200"
            >
              🖨️ Print Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="bg-canvas-tint py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-aurora-indigo700 mb-6 text-center">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <CategoryCard
              title="Crisis"
              subtitle="NOW"
              description="988 | Crisis Text"
              icon="🚨"
              bgColor="bg-aurora-crimson600 hover:bg-red-700"
              href="/crisis"
              urgent={true}
            />
            
            <CategoryCard
              title="Food"
              subtitle=""
              description="Meals | Pantries"
              icon="🍽️"
              bgColor="bg-aurora-emerald500 hover:bg-teal-600"
              href="/food"
            />
            
            <CategoryCard
              title="Housing"
              subtitle=""
              description="Shelter | Emergency"
              icon="🏠"
              bgColor="bg-aurora-indigo500 hover:bg-aurora-indigo700"
              href="/housing"
            />
            
            <CategoryCard
              title="Healthcare"
              subtitle=""
              description="Medical | Mental"
              icon="🏥"
              bgColor="bg-aurora-azure400 hover:bg-sky-500"
              href="/healthcare"
            />
            
            <CategoryCard
              title="Legal"
              subtitle=""
              description="Aid | Documents"
              icon="⚖️"
              bgColor="bg-warm-slate-600 hover:bg-gray-700"
              href="/legal"
            />
            
            <CategoryCard
              title="Employment"
              subtitle=""
              description="Jobs | Training"
              icon="💼"
              bgColor="bg-aurora-fuchsia500 hover:bg-purple-600"
              href="/employment"
            />
            
            <CategoryCard
              title="Transportation"
              subtitle=""
              description="Bus Passes | Transit"
              icon="🚌"
              bgColor="bg-aurora-emerald500 hover:bg-emerald-600"
              href="/transportation"
            />
            
            <CategoryCard
              title="Recovery"
              subtitle=""
              description="Treatment | MAT"
              icon="💜"
              bgColor="bg-aurora-fuchsia500 hover:bg-purple-600"
              href="/recovery"
            />
          </div>
        </div>
      </div>


      {/* How to Use Section */}
      <div className="bg-canvas-tint py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-aurora-indigo700 mb-6">
              How to use this map of help
            </h3>
            <div className="panel">
              <p className="text-lg text-warm-slate-700 mb-6 leading-relaxed">
                Every resource is verified and updated regularly. Click any category above for immediate access, 
                or use the guided paths to walk through exactly what you need step by step.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Find</h4>
                  <p className="text-sm text-warm-slate-600">Search or browse verified resources</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-azure400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Connect</h4>
                  <p className="text-sm text-warm-slate-600">Direct contact info and locations</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-fuchsia500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">Get Help</h4>
                  <p className="text-sm text-warm-slate-600">Access services when you need them</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Strip */}
      <div className="bg-support py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Help keep this project alive
          </h3>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Fresh updates, verified resources, and uptime cost real money. 
            Your support keeps this lifeline available 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support" className="btn bg-white text-aurora-indigo700 hover:bg-gray-100 font-semibold">
              💙 Support via Square
            </Link>
            <a 
              href="https://cash.app/$helpnowatx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost border-white text-white hover:bg-white/10"
            >
              💰 Cash App
            </a>
          </div>
        </div>
      </div>

      {/* Location Detection */}
      <div className="bg-canvas-tint py-8">
        <div className="container mx-auto px-4">
          <LocationPrompt />
        </div>
      </div>
    </div>
  )
}