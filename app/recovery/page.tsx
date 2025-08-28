import CategoryResources from '@/components/CategoryResources'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Recovery & Treatment Resources | HelpNow ATX',
  description: 'Find addiction treatment, detox services, MAT programs, and recovery support in Central Texas. Help is available.',
}

export default function RecoveryPage() {
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
        category="recovery"
        title="Recovery & Treatment Resources"
        description="Addiction treatment, detox services, MAT programs, sober living, and recovery support groups. Help is available today."
      />
    </>
  )
}