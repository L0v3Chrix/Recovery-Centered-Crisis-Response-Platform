import { ArrowLeft, Clock, MapPin, Phone, Utensils } from 'lucide-react'
import Link from 'next/link'

export default function FoodPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">🍽️ FOOD ASSISTANCE - AVAILABLE TODAY</h1>
          <p className="text-green-100">Find meals, groceries, and food pantries in Travis County</p>
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

        {/* Quick Access - Open Now */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Open Right Now
          </h2>
          <div className="grid gap-4">
            <FoodResourceCard
              name="Central Texas Food Bank - Mobile Pantry"
              address="Various locations throughout Austin"
              phone="(512) 684-2550"
              type="Mobile Food Pantry"
              hours="Schedule varies - Call for locations"
              services={['Free groceries', 'Fresh produce', 'No ID required']}
              isOpen={true}
            />
            
            <FoodResourceCard
              name="Austin Resource Center for the Homeless"
              address="500 E 7th St, Austin, TX 78701"
              phone="(512) 305-4100"
              type="Meals"
              hours="Breakfast 7am-9am, Lunch 11am-1pm"
              services={['Free meals', 'No questions asked', 'Clothing available']}
              isOpen={true}
            />
          </div>
        </div>

        {/* Food Pantries */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-green-600" />
            Food Pantries & Groceries
          </h2>
          <div className="grid gap-4">
            <FoodResourceCard
              name="Central Texas Food Bank"
              address="6500 Metropolis Dr, Austin, TX 78744"
              phone="(512) 684-2550"
              type="Food Bank"
              hours="Mon-Thu 9am-6pm, Fri 9am-5pm, Sat 9am-1pm"
              services={['Free groceries', 'Fresh produce', 'Mobile pantries', 'Nutrition education']}
            />
            
            <FoodResourceCard
              name="Caritas of Austin"
              address="611 Neches St, Austin, TX 78701"
              phone="(512) 472-4135"
              type="Food Pantry"
              hours="Mon-Fri 8am-11:30am, 1pm-4:30pm"
              services={['Emergency food assistance', 'Clothing', 'Financial assistance']}
            />

            <FoodResourceCard
              name="Salvation Army - Austin"
              address="501 E 8th St, Austin, TX 78701"
              phone="(512) 476-1111"
              type="Food Pantry & Meals"
              hours="Pantry: Mon-Fri 9am-12pm, Meals: Daily 11:30am-1pm"
              services={['Food pantry', 'Hot meals', 'Emergency assistance', 'Case management']}
            />

            <FoodResourceCard
              name="St. David's Community Health Foundation Food Pantry"
              address="Multiple locations"
              phone="(512) 544-8500"
              type="Food Pantry"
              hours="Various - Call for schedule"
              services={['Free groceries', 'Multiple locations', 'Healthcare partnerships']}
            />
          </div>
        </div>

        {/* Meal Programs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Free Meal Programs</h2>
          <div className="grid gap-4">
            <FoodResourceCard
              name="Trinity Center"
              address="304 E 7th St, Austin, TX 78701"
              phone="(512) 472-5963"
              type="Meals"
              hours="Breakfast Mon-Fri 8am-9am, Dinner Mon-Thu 5:30pm-6:30pm"
              services={['Free breakfast', 'Free dinner', 'Case management', 'Mental health services']}
            />
            
            <FoodResourceCard
              name="Mobile Loaves & Fishes"
              address="Various truck locations"
              phone="(512) 328-4483"
              type="Mobile Meals"
              hours="Evening routes 7 days a week"
              services={['Mobile food trucks', 'Street outreach', 'Community meals']}
            />

            <FoodResourceCard
              name="Foundation for the Homeless - Meals on Wheels"
              address="Various delivery routes"
              phone="(512) 472-6700"
              type="Meal Delivery"
              hours="Daily deliveries"
              services={['Home-delivered meals', 'Senior focused', 'Disability accommodations']}
            />
          </div>
        </div>

        {/* Special Programs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Special Programs</h2>
          <div className="grid gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">SNAP Benefits (Food Stamps)</h3>
              <p className="text-gray-600 mb-2">Apply for monthly food assistance benefits</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Call: (512) 854-9100</span>
                <span className="text-sm text-gray-500">Online: YourTexasBenefits.com</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">WIC Program</h3>
              <p className="text-gray-600 mb-2">Nutrition assistance for women, infants, and children</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Call: (512) 972-5040</span>
                <span className="text-sm text-gray-500">Locations throughout Austin</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">School Meal Programs</h3>
              <p className="text-gray-600 mb-2">Free and reduced-price meals for students</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">AISD: (512) 414-1700</span>
                <span className="text-sm text-gray-500">Available year-round</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FoodResourceCardProps {
  name: string
  address: string
  phone: string
  type: string
  hours: string
  services: string[]
  isOpen?: boolean
}

function FoodResourceCard({ name, address, phone, type, hours, services, isOpen }: FoodResourceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-green-600 font-medium">{type}</span>
          {isOpen && (
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Open Now
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
        <div className="flex flex-wrap gap-1">
          {services.map((service, index) => (
            <span 
              key={index}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium"
      >
        <Phone className="w-4 h-4" />
        {phone}
      </a>
    </div>
  )
}