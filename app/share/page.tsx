'use client'

import { useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function SharePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedWebShare, setCopiedWebShare] = useState(false)
  
  const siteUrl = 'https://helpnowatx.org'
  const shareUrl = `${siteUrl}/?utm_source=social&utm_medium=share&utm_campaign=launch`
  const shareImage = '/og/default-1200x630.png'
  
  const captions = [
    `Real help, verified daily in Central Texas. Save & share: ${shareUrl}`,
    `Know someone struggling? One link to food, shelter, recovery, healthcare: ${shareUrl}`,
    `Tonight's shelter, today's meals, recovery options—on your phone: ${shareUrl}`,
    `988 crisis line, food banks, shelters, clinics, legal aid—all verified: ${shareUrl}`
  ]

  const platformLinks = [
    {
      name: 'X (Twitter)',
      icon: '𝕏',
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(captions[0])}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent('Real help, verified daily in Central Texas. Save & share.')}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent('HelpNow ATX - Verified resources for crisis, food, shelter, and recovery support in Central Texas.')}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(captions[0])}`
    },
    {
      name: 'SMS',
      icon: '📱',
      color: 'bg-gray-600',
      url: `sms:?body=${encodeURIComponent(captions[0])}`
    },
    {
      name: 'Email',
      icon: '✉️',
      color: 'bg-purple-600',
      url: `mailto:?subject=${encodeURIComponent('HelpNow ATX - Help When You Need It')}&body=${encodeURIComponent(captions[0])}`
    }
  ]

  const handleWebShare = async () => {
    const shareData = {
      title: 'HelpNow ATX - Real help, verified daily',
      text: 'Find verified crisis, food, shelter, and recovery resources in Central Texas.',
      url: shareUrl
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        
        // GA event tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_share_used', {
            content_type: 'resource_page',
            event_category: 'engagement'
          })
        }
      } else {
        // Fallback: copy to clipboard
        const fallbackText = `${shareData.text} ${shareData.url}`
        await navigator.clipboard.writeText(fallbackText)
        setCopiedWebShare(true)
        setTimeout(() => setCopiedWebShare(false), 2000)
        
        // GA event tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'fallback_copy_used', {
            content_type: 'resource_page', 
            event_category: 'engagement'
          })
        }
      }
    } catch (err) {
      console.error('Error sharing:', err)
      // Final fallback - try clipboard
      try {
        const fallbackText = `${shareData.text} ${shareData.url}`
        await navigator.clipboard.writeText(fallbackText)
        setCopiedWebShare(true)
        setTimeout(() => setCopiedWebShare(false), 2000)
      } catch (clipErr) {
        console.error('Clipboard fallback failed:', clipErr)
      }
    }
  }

  const copyCaption = async (index: number) => {
    try {
      await navigator.clipboard.writeText(captions[index])
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
      
      // GA event tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'caption_copied', {
          caption_index: index,
          event_category: 'engagement'
        })
      }
    } catch (err) {
      console.error('Failed to copy caption:', err)
    }
  }

  const handlePlatformShare = (platformName: string) => {
    // GA event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'social_share_click', {
        platform: platformName.toLowerCase(),
        event_category: 'engagement'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-aurora text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Share HelpNow ATX
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Help spread the word about verified crisis, food, shelter, and recovery resources in Central Texas.
          </p>
        </div>
      </div>

      {/* Primary Share Button */}
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Quick Share
          </h2>
          
          <button
            onClick={handleWebShare}
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl mb-4"
          >
            📤 {copiedWebShare ? 'Copied to Clipboard!' : 'Share Now'}
          </button>
          
          <p className="text-sm text-gray-500">
            Uses your device&apos;s share menu or copies link to clipboard
          </p>
        </div>
      </div>

      {/* Platform Buttons */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Platform
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platformLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handlePlatformShare(platform.name)}
                className={`${platform.color} text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity shadow-sm hover:shadow-md`}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="font-semibold">{platform.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ready-to-Copy Captions */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ready-to-Copy Messages
          </h2>
          
          <div className="grid gap-6">
            {captions.map((caption, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-grow">
                    <p className="text-gray-800 mb-4 leading-relaxed">
                      {caption}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCaption(index)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-shrink-0"
                  >
                    {copiedIndex === index ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sharing Tips
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">💙</div>
              <h3 className="font-semibold text-gray-900 mb-2">Be Compassionate</h3>
              <p className="text-gray-600">
                Share with care and respect for people facing difficult situations.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Promptly</h3>
              <p className="text-gray-600">
                Crisis resources are most helpful when shared quickly and widely.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Keep Sharing</h3>
              <p className="text-gray-600">
                Resources are updated regularly. Share the main link for current info.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Resources */}
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