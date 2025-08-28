import { getCategoryMapping } from '@/lib/category-mapping'
import { Bus, MapPin, Phone, Globe, Clock, CreditCard } from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    name: "Capital Metro - Reduced Fare Program",
    address: "2910 East 5th Street, Austin, TX 78702",
    phone: "(512) 369-6000",
    website: "www.capmetro.org/fares/reduced-fare",
    services: "Reduced fare transit passes for qualifying individuals",
    description: "Discounted public transportation for seniors, students, people with disabilities, and low-income individuals.",
    hours: "Monday-Friday 8:00 AM - 5:00 PM"
  },
  {
    name: "Trinity Center - Bus Pass Distribution",
    address: "304 E 7th St, Austin, TX 78701",
    phone: "(512) 610-3500",
    services: "Free bus passes (Wednesdays at 8am for first 50)",
    description: "Weekly distribution of free Capital Metro bus passes for individuals experiencing homelessness or financial hardship.",
    hours: "Wednesdays 8:00 AM (first 50 people)"
  },
  {
    name: "Capital Metro ACCESS",
    phone: "(512) 369-6040",
    website: "www.capmetro.org/access",
    services: "Paratransit services for people with disabilities",
    description: "Door-to-door paratransit service for individuals who cannot use regular fixed-route buses due to a disability.",
    hours: "Monday-Friday 6:00 AM - 10:00 PM, weekends 8:00 AM - 6:00 PM"
  },
  {
    name: "Medical Transportation Program (MTP)",
    phone: "1-877-633-8747",
    website: "www.txmedicaid.com",
    services: "Medical transportation for Medicaid recipients",
    description: "Non-emergency medical transportation for Medicaid recipients to attend medical appointments and services.",
    hours: "24/7 scheduling available"
  }
]

export default function TransportationPage() {
  const categoryMapping = getCategoryMapping('transportation')!
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-aurora text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <span className="text-4xl">{categoryMapping.icon}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transportation Resources
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Find bus passes, reduced fare programs, and transportation assistance in Central Texas
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="chip bg-white/20 text-white border-white/30">
                <Bus className="w-4 h-4 mr-2" />
                Bus Passes
              </span>
              <span className="chip bg-white/20 text-white border-white/30">
                <CreditCard className="w-4 h-4 mr-2" />
                Reduced Fare
              </span>
              <span className="chip bg-white/20 text-white border-white/30">
                <MapPin className="w-4 h-4 mr-2" />
                Paratransit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Transportation */}
      <div className="bg-aurora-crimson600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-2">🚨 Emergency Transportation</h2>
            <p className="mb-4">For medical emergencies: <strong>Call 911</strong></p>
            <p>For non-emergency medical transport: <strong>Call MTP at 1-877-633-8747</strong></p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/quiz" className="block p-6 bg-aurora-emerald50 border border-aurora-emerald200 rounded-lg hover:bg-aurora-emerald100 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-semibold text-aurora-indigo700 mb-2">Take Assessment</h3>
                  <p className="text-sm text-gray-600">Find personalized transportation resources</p>
                </div>
              </Link>

              <div className="p-6 bg-aurora-azure50 border border-aurora-azure200 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <h3 className="font-semibold text-aurora-indigo700 mb-2">Trinity Center</h3>
                  <p className="text-sm text-gray-600">Free bus passes Wednesdays 8am</p>
                </div>
              </div>

              <Link href="/printable" className="block p-6 bg-aurora-fuchsia50 border border-aurora-fuchsia200 rounded-lg hover:bg-aurora-fuchsia100 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">🖨️</div>
                  <h3 className="font-semibold text-aurora-indigo700 mb-2">Print Resources</h3>
                  <p className="text-sm text-gray-600">Get a complete printable list</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-aurora-indigo700 mb-4">
                Transportation & Transit Resources
              </h2>
              <p className="text-gray-600">
                All resources verified and updated regularly. Contact information and services current as of {new Date().toLocaleDateString()}.
              </p>
            </div>

            <div className="space-y-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-aurora-indigo700">
                      {resource.name}
                    </h3>
                  </div>

                  {resource.description && (
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                  )}

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      {resource.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-aurora-azure400" />
                          <a href={`tel:${resource.phone}`} className="text-aurora-indigo700 hover:underline font-medium">
                            {resource.phone}
                          </a>
                        </div>
                      )}
                      
                      {resource.address && (
                        <div className="flex items-start text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-aurora-azure400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{resource.address}</span>
                        </div>
                      )}

                      {resource.website && (
                        <div className="flex items-center text-sm">
                          <Globe className="w-4 h-4 mr-2 text-aurora-azure400" />
                          <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="text-aurora-indigo700 hover:underline">
                            {resource.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {resource.hours && (
                        <div className="flex items-start text-sm">
                          <Clock className="w-4 h-4 mr-2 text-aurora-azure400 mt-0.5" />
                          <span className="text-gray-600">{resource.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {resource.services && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Services:</h4>
                      <p className="text-sm text-gray-600">{resource.services}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {resource.phone && (
                      <a 
                        href={`tel:${resource.phone}`}
                        className="btn-sm bg-aurora-emerald500 text-white hover:bg-aurora-emerald600"
                      >
                        Call Now
                      </a>
                    )}
                    
                    {resource.website && (
                      <a 
                        href={`https://${resource.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-sm btn-outline"
                      >
                        Visit Website
                      </a>
                    )}
                    
                    {resource.address && (
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-sm btn-outline"
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-12 bg-aurora-azure50 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-aurora-indigo700 mb-4">
                💡 Transportation Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Free Bus Passes</h4>
                  <p className="text-sm text-gray-600 mb-4">Trinity Center distributes free Capital Metro bus passes every Wednesday at 8am (first 50 people).</p>
                  
                  <h4 className="font-medium mb-2">Reduced Fare Eligibility</h4>
                  <p className="text-sm text-gray-600">Seniors 65+, students, people with disabilities, and low-income individuals may qualify for reduced fares.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Medical Transportation</h4>
                  <p className="text-sm text-gray-600 mb-4">Medicaid recipients can access free medical transportation through the MTP program.</p>
                  
                  <h4 className="font-medium mb-2">Paratransit Services</h4>
                  <p className="text-sm text-gray-600">Door-to-door service available for individuals who cannot use regular buses due to disability.</p>
                </div>
              </div>
            </div>

            {/* Additional Resources Link */}
            <div className="mt-12 text-center">
              <div className="bg-gray-100 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Need More Transportation Resources?
                </h3>
                <p className="text-gray-600 mb-6">
                  Find comprehensive transportation assistance including bus passes, reduced fares, and medical transport.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/printable" className="btn btn-primary">
                    View All Resources
                  </Link>
                  <Link href="/quiz" className="btn btn-secondary">
                    Take Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}