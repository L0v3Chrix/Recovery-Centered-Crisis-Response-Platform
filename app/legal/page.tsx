import CategoryResources from '@/components/CategoryResources'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalPage() {
  return (
    <>
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-aurora-indigo700 hover:text-aurora-indigo800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Resources */}
      <CategoryResources 
        category="legal"
        title="Legal Resources"
        description="Legal aid, documentation assistance, immigration services, expungement help, and family law support. Free consultations available."
      />
    </>
  )
}