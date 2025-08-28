import CategoryResources from '@/components/CategoryResources'
import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">🚨 CRISIS SUPPORT - IMMEDIATE HELP 🚨</h1>
          <p className="text-red-100">If you&apos;re thinking about harming yourself or others, get help now</p>
        </div>
      </div>

      {/* Crisis Hotlines - Always at top */}
      <div className="bg-white border-b-2 border-red-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <a href="tel:988" className="flex items-center justify-center bg-red-600 text-white rounded-lg p-4 hover:bg-red-700 transition-colors">
              <Phone className="w-6 h-6 mr-3" />
              <div>
                <div className="font-bold text-lg">988</div>
                <div className="text-sm">National Suicide & Crisis Lifeline</div>
              </div>
            </a>
            <a href="tel:911" className="flex items-center justify-center bg-red-600 text-white rounded-lg p-4 hover:bg-red-700 transition-colors">
              <Phone className="w-6 h-6 mr-3" />
              <div>
                <div className="font-bold text-lg">911</div>
                <div className="text-sm">Emergency Services</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-red-700 hover:text-red-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white">
        <CategoryResources 
          category="crisis"
          title="Crisis Support Resources"
          description="24/7 crisis hotlines, mental health support, and emergency assistance. Help is available now."
        />
      </div>
    </div>
  )
}