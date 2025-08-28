import CategoryResources from '@/components/CategoryResources'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'

export default function FoodPage() {
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
        category="food"
        title="Food Resources"
        description="Find food pantries, hot meals, groceries, and nutrition assistance in Central Texas. All resources are free and available to those in need."
      />
    </>
  )
}