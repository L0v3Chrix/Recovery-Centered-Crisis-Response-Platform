'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertTriangle, Phone, Mail, MapPin, Globe, Clock, Users, DollarSign } from 'lucide-react'

interface FormData {
  // Contact Information
  contactName: string
  contactEmail: string
  contactPhone: string
  
  // Resource Details
  resourceName: string
  resourceDescription: string
  resourceCategory: string
  resourceWebsite: string
  resourceAddress: string
  resourcePhone: string
  
  // Additional Details
  servicesOffered: string
  hoursOfOperation: string
  eligibilityCriteria: string
  costInfo: string
}

const initialFormData: FormData = {
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  resourceName: '',
  resourceDescription: '',
  resourceCategory: '',
  resourceWebsite: '',
  resourceAddress: '',
  resourcePhone: '',
  servicesOffered: '',
  hoursOfOperation: '',
  eligibilityCriteria: '',
  costInfo: ''
}

const resourceCategories = [
  'Crisis Support',
  'Food Assistance', 
  'Housing & Shelter',
  'Healthcare Services',
  'Mental Health',
  'Addiction Recovery',
  'Legal Aid',
  'Employment Services',
  'Transportation',
  'Financial Assistance',
  'Educational Resources',
  'Family Services',
  'Senior Services',
  'Youth Programs',
  'Other'
]

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): string[] => {
    const errors: string[] = []
    
    if (!formData.contactName.trim()) errors.push('Your name is required')
    if (!formData.contactEmail.trim()) errors.push('Your email is required')
    if (!formData.resourceName.trim()) errors.push('Resource name is required')
    if (!formData.resourceDescription.trim()) errors.push('Resource description is required')
    if (!formData.resourceCategory) errors.push('Resource category is required')
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      errors.push('Please enter a valid email address')
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const errors = validateForm()
    if (errors.length > 0) {
      setErrorMessage(errors.join(', '))
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionSource: 'helpnowatx.org/submit'
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(initialFormData)
        
        // Track GA event
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'resource_submitted', {
            category: formData.resourceCategory,
            value: 1
          })
        }
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.details || result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error - please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-aurora-emerald500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-aurora-indigo700 mb-4">
              Thank you for your submission!
            </h1>
            <p className="text-lg text-warm-slate-600 mb-6 leading-relaxed">
              Your resource submission has been received and will be reviewed by our team. 
              We typically verify and add new resources within 2-3 business days.
            </p>
            <div className="panel bg-gradient-to-br from-aurora-emerald500/10 to-aurora-azure400/10 border-aurora-emerald500/20">
              <h3 className="font-semibold text-aurora-indigo700 mb-2">What happens next?</h3>
              <ul className="text-left text-warm-slate-600 space-y-2">
                <li>✓ We&apos;ll verify the resource information</li>
                <li>✓ Contact the organization to confirm details</li>
                <li>✓ Add it to our verified resource database</li>
                <li>✓ Send you an email confirmation when it&apos;s live</li>
              </ul>
            </div>
            <div className="mt-8 space-x-4">
              <button
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary"
              >
                Submit Another Resource
              </button>
              <a href="/" className="btn-ghost">
                Back to Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Send className="w-16 h-16 text-aurora-indigo500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-aurora-indigo700 mb-4">
              Submit a Resource
            </h1>
            <p className="text-xl text-warm-slate-600 leading-relaxed">
              Help expand our database of verified resources. Know an organization 
              that should be listed? Submit their information below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information Section */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-aurora-indigo700 mb-6">
                Your Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Your Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Resource Details Section */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-aurora-indigo700 mb-6">
                Resource Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Resource Name *
                  </label>
                  <input
                    type="text"
                    name="resourceName"
                    value={formData.resourceName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="Central Texas Food Bank"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="resourceCategory"
                    value={formData.resourceCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {resourceCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="resourceDescription"
                    value={formData.resourceDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="Brief description of what this resource provides and who it serves..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="resourceWebsite"
                      value={formData.resourceWebsite}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                      placeholder="https://example.org"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="resourcePhone"
                      value={formData.resourcePhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="resourceAddress"
                    value={formData.resourceAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="123 Main Street, Austin, TX 78701"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="card">
              <h2 className="text-2xl font-semibold text-aurora-indigo700 mb-6">
                Additional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Services Offered
                  </label>
                  <textarea
                    name="servicesOffered"
                    value={formData.servicesOffered}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="List the specific services this resource provides..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Hours of Operation
                    </label>
                    <textarea
                      name="hoursOfOperation"
                      value={formData.hoursOfOperation}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                      placeholder="Mon-Fri 9AM-5PM&#10;Sat 10AM-2PM&#10;Closed Sundays"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Cost Information
                    </label>
                    <textarea
                      name="costInfo"
                      value={formData.costInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                      placeholder="Free, sliding scale, insurance accepted, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                    Eligibility Criteria
                  </label>
                  <textarea
                    name="eligibilityCriteria"
                    value={formData.eligibilityCriteria}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent"
                    placeholder="Who can access this resource? Any requirements or restrictions?"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-aurora-crimson600/10 border border-aurora-crimson600/20 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-aurora-crimson600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-aurora-crimson600 font-medium">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary text-lg px-8 py-4 min-w-[200px] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Resource
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}