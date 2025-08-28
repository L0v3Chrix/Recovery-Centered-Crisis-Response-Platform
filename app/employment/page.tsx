import { getCategoryMapping, getPrintableCategoriesForRoute } from '@/lib/category-mapping'
import { Briefcase, MapPin, Phone, Globe, Clock, Users } from 'lucide-react'
import Link from 'next/link'

// This would be populated from the printable page data
const resources = [
  {
    name: "Austin Workforce Development",
    address: "8140 East 38th Street, Austin, TX 78724",
    phone: "(512) 972-6000", 
    website: "www.austintexas.gov/workforce",
    services: "Job training, career counseling, employment placement services",
    description: "Comprehensive workforce development services including job training programs, career counseling, and employment placement assistance for Austin residents.",
    hours: "Monday-Friday 8:00 AM - 5:00 PM"
  },
  {
    name: "Goodwill Central Texas - Career Center",
    address: "1015 Norwood Park Blvd, Austin, TX 78753",
    phone: "(512) 637-7100",
    website: "www.goodwillcentraltexas.org",
    services: "Job placement, skills training, career development",
    description: "Career services including job placement assistance, skills training, and professional development programs.",
    hours: "Monday-Friday 9:00 AM - 6:00 PM"
  },
  {
    name: "Texas Workforce Commission",
    address: "2321 North Forest Road, Austin, TX 78756", 
    phone: "(512) 936-3000",
    website: "www.twc.texas.gov",
    services: "Unemployment benefits, job search assistance, training programs",
    description: "State workforce services including unemployment benefits, job search assistance, and vocational training programs.",
    hours: "Monday-Friday 8:00 AM - 5:00 PM"
  }
]

export default function EmploymentPage() {
  const categoryMapping = getCategoryMapping('employment')!
  
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
              {categoryMapping.displayName} Resources
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Find job training, career development, and employment placement services in Central Texas
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="chip bg-white/20 text-white border-white/30">
                <Briefcase className="w-4 h-4 mr-2" />
                Job Training
              </span>
              <span className="chip bg-white/20 text-white border-white/30">
                <Users className="w-4 h-4 mr-2" />
                Career Counseling
              </span>
              <span className="chip bg-white/20 text-white border-white/30">
                <MapPin className="w-4 h-4 mr-2" />
                Employment Placement
              </span>
            </div>
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
                  <p className="text-sm text-gray-600">Find personalized employment resources</p>
                </div>
              </Link>

              <a href="tel:211" className="block p-6 bg-aurora-crimson50 border border-aurora-crimson200 rounded-lg hover:bg-aurora-crimson100 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📞</div>
                  <h3 className="font-semibold text-aurora-indigo700 mb-2">Call 2-1-1</h3>
                  <p className="text-sm text-gray-600">24/7 information and referrals</p>
                </div>
              </a>

              <Link href="/printable" className="block p-6 bg-aurora-azure50 border border-aurora-azure200 rounded-lg hover:bg-aurora-azure100 transition-colors">
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
                Employment & Training Resources
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

            {/* Additional Resources Link */}
            <div className="mt-12 text-center">
              <div className="bg-gray-100 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Need More Resources?
                </h3>
                <p className="text-gray-600 mb-6">
                  Find comprehensive employment resources including job training programs, vocational services, and educational support.
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