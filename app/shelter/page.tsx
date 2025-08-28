import CategoryResources from '@/components/CategoryResources'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Shelter & Housing Resources | HelpNow ATX',
  description: 'Find emergency shelter, transitional housing, and permanent housing assistance in Central Texas. Safe shelter available 24/7.',
}

export default function ShelterPage() {
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
        category="shelter"
        title="Shelter & Housing Resources"
        description="Emergency shelter, transitional housing, and permanent housing assistance. Safe spaces available 24/7 with support services."
      />
    </>
  )
}