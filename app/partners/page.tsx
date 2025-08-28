'use client'

import React, { useState } from 'react'
import { Download, Copy, Check, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function PartnersPage() {
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null)
  
  const badges = [
    {
      name: 'Gradient Pill (Recommended)',
      id: 'pill',
      file: '/partner-badges/badge-pill.svg',
      embed: `<!-- HelpNow ATX Partner Badge -->
<a href="https://helpnowatx.org/?utm_source=partner&utm_medium=badge&utm_campaign=backlink"
   target="_blank" rel="noopener noreferrer"
   aria-label="HelpNow ATX — Find verified help">
  <img src="https://helpnowatx.org/partner-badges/badge-pill.svg"
       alt="Get Help Now — HelpNow ATX (verified resources)"
       width="360" height="110"
       style="max-width:100%;height:auto;border:0;border-radius:18px" />
</a>`
    },
    {
      name: 'Dark Background',
      id: 'dark',
      file: '/partner-badges/badge-dark.svg',
      embed: `<!-- HelpNow ATX Partner Badge (Dark) -->
<a href="https://helpnowatx.org/?utm_source=partner&utm_medium=badge&utm_campaign=backlink"
   target="_blank" rel="noopener noreferrer"
   aria-label="HelpNow ATX — Find verified help">
  <img src="https://helpnowatx.org/partner-badges/badge-dark.svg"
       alt="Get Help Now — HelpNow ATX (verified resources)"
       width="360" height="110"
       style="max-width:100%;height:auto;border:0;border-radius:12px" />
</a>`
    },
    {
      name: 'Outline Style',
      id: 'outline',
      file: '/partner-badges/badge-outline.svg',
      embed: `<!-- HelpNow ATX Partner Badge (Outline) -->
<a href="https://helpnowatx.org/?utm_source=partner&utm_medium=badge&utm_campaign=backlink"
   target="_blank" rel="noopener noreferrer"
   aria-label="HelpNow ATX — Find verified help">
  <img src="https://helpnowatx.org/partner-badges/badge-outline.svg"
       alt="Get Help Now — HelpNow ATX (verified resources)"
       width="360" height="110"
       style="max-width:100%;height:auto;border:0;border-radius:12px" />
</a>`
    }
  ]
  
  const handleCopy = async (badgeId: string, embedCode: string) => {
    await navigator.clipboard.writeText(embedCode)
    setCopiedBadge(badgeId)
    
    // Track GA event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'partner_embed_copy', {
        badge_type: badgeId
      })
    }
    
    setTimeout(() => setCopiedBadge(null), 2000)
  }
  
  const handleDownload = () => {
    // Track GA event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'badge_download', {
        type: 'press_kit'
      })
    }
    
    // Download the press kit
    const link = document.createElement('a')
    link.href = '/press-kit.zip'
    link.download = 'helpnow-atx-press-kit.zip'
    link.click()
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white">
      {/* Hero Section */}
      <div className="bg-aurora text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner with HelpNow ATX
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Help spread awareness by adding our badge to your website. 
              Every link helps connect someone to verified resources when they need it most.
            </p>
            <button
              onClick={handleDownload}
              className="btn bg-white text-aurora-indigo700 hover:bg-gray-100 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Press Kit (ZIP)
            </button>
          </div>
        </div>
      </div>

      {/* Badge Gallery */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-aurora-indigo700 text-center mb-12">
              Choose Your Badge Style
            </h2>
            
            <div className="space-y-12">
              {badges.map((badge) => (
                <div key={badge.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Badge Preview */}
                    <div className="lg:w-1/2">
                      <h3 className="text-xl font-semibold text-aurora-indigo700 mb-4">
                        {badge.name}
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                        <Image
                          src={badge.file}
                          alt={`${badge.name} badge`}
                          width={360}
                          height={110}
                          className="max-w-full h-auto"
                          style={{ maxHeight: '110px' }}
                        />
                      </div>
                    </div>
                    
                    {/* Embed Code */}
                    <div className="lg:w-1/2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Embed Code:
                      </h4>
                      <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                          <code>{badge.embed}</code>
                        </pre>
                        <button
                          onClick={() => handleCopy(badge.id, badge.embed)}
                          className="absolute top-2 right-2 btn-sm bg-aurora-emerald500 text-white hover:bg-aurora-emerald600"
                        >
                          {copiedBadge === badge.id ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div className="mt-16 bg-aurora-azure50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-aurora-indigo700 mb-6 text-center">
                Why Partner with Us?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-aurora-emerald500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">
                    Community Impact
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help connect neighbors to 516+ verified resources across Central Texas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-aurora-azure400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">✅</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">
                    Always Current
                  </h4>
                  <p className="text-sm text-gray-600">
                    Resources verified weekly, so your referrals always lead to active help
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-aurora-fuchsia500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-aurora-indigo700 mb-2">
                    Track Your Impact
                  </h4>
                  <p className="text-sm text-gray-600">
                    UTM tracking shows how many people you&apos;ve helped connect to resources
                  </p>
                </div>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="mt-12 card">
              <h3 className="text-xl font-semibold text-aurora-indigo700 mb-6">
                How to Add the Badge
              </h3>
              
              <ol className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-aurora-emerald500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">Choose your preferred badge style</p>
                    <p className="text-sm text-gray-600">Pick the design that best fits your website&apos;s aesthetic</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-aurora-emerald500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">Copy the embed code</p>
                    <p className="text-sm text-gray-600">Click the &quot;Copy&quot; button to copy the HTML to your clipboard</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-aurora-emerald500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">Paste into your website</p>
                    <p className="text-sm text-gray-600">Add the code to your footer, sidebar, or resources page</p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-aurora-emerald500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    4
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">That&apos;s it!</p>
                    <p className="text-sm text-gray-600">The badge automatically links to helpnowatx.org with tracking</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Contact Section */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Questions about partnering or need a custom integration?
              </p>
              <a
                href="mailto:partners@helpnowatx.org"
                className="btn btn-primary"
              >
                Contact Partnership Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}