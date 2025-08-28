'use client'

import { useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function PartnersPage() {
  const [copiedEmbed, setCopiedEmbed] = useState<string | null>(null)
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://YOURDOMAIN'
  
  const badges = [
    {
      id: 'blue-light',
      name: 'Blue Light',
      path: '/assets/badges/help-now-badge-blue-light.svg'
    },
    {
      id: 'blue-dark', 
      name: 'Blue Dark',
      path: '/assets/badges/help-now-badge-blue-dark.svg'
    },
    {
      id: 'neutral-light',
      name: 'Neutral Light',
      path: '/assets/badges/help-now-badge-neutral-light.svg'
    },
    {
      id: 'neutral-dark',
      name: 'Neutral Dark', 
      path: '/assets/badges/help-now-badge-neutral-dark.svg'
    }
  ]

  const generateEmbedCode = (badgePath: string) => {
    return `<a href="${siteUrl}/?utm_source=partner&utm_medium=badge&utm_campaign=backlink" aria-label="Central Texas Resources">
  <img src="${siteUrl}${badgePath}" alt="Get Help Now — Central Texas Resources" width="240" height="64" />
</a>`
  }

  const copyEmbedCode = async (badgeId: string, badgePath: string) => {
    try {
      const embedCode = generateEmbedCode(badgePath)
      await navigator.clipboard.writeText(embedCode)
      setCopiedEmbed(badgeId)
      setTimeout(() => setCopiedEmbed(null), 2000)
      
      // GA event tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'partner_embed_copy', {
          badge_style: badgeId,
          event_category: 'engagement'
        })
      }
    } catch (err) {
      console.error('Failed to copy embed code:', err)
    }
  }

  const handlePressKitDownload = () => {
    // GA event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'badge_download', {
        download_type: 'press_kit',
        event_category: 'engagement'
      })
    }
    
    // Trigger download
    const link = document.createElement('a')
    link.href = '/press-kit.zip'
    link.download = 'central-texas-resources-press-kit.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partner Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Add our badge to your website to help neighbors find verified help.
          </p>
        </div>
      </div>

      {/* Badge Gallery */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Badge
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {badges.map((badge) => (
              <div key={badge.id} className="bg-gray-50 rounded-xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {badge.name}
                  </h3>
                  <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
                    <Image
                      src={badge.path}
                      alt={`${badge.name} badge`}
                      width={240}
                      height={64}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Embed Code Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Embed Code:
                    </label>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-gray-800 break-all">
                        {generateEmbedCode(badge.path)}
                      </code>
                    </div>
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => copyEmbedCode(badge.id, badge.path)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {copiedEmbed === badge.id ? '✓ Copied!' : '📋 Copy Embed Code'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press Kit Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Press Kit
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Download our complete press kit including SVG and PNG badges, 
            favicon, embed code, and brand usage guidelines.
          </p>
          
          <button
            onClick={handlePressKitDownload}
            className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            📦 Download Press Kit
          </button>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Includes: SVG & PNG badges • Favicon • Brand guidelines • Embed templates</p>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Badge Usage Guidelines
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Do</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Use badges to help people find crisis resources</li>
                <li>• Link directly to our homepage</li>
                <li>• Use provided UTM parameters</li>
                <li>• Maintain original proportions</li>
                <li>• Choose appropriate color for your site</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Don&apos;t</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Modify badge colors or text</li>
                <li>• Use badges for commercial promotion</li>
                <li>• Link to pages other than our homepage</li>
                <li>• Stretch or distort badge dimensions</li>
                <li>• Remove attribution or UTM parameters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="py-8 bg-white text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Resources
        </a>
      </div>
    </div>
  )
}