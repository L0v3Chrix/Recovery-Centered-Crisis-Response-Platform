'use client'

import { Share2, Copy, MessageCircle, Mail, QrCode, ExternalLink } from 'lucide-react'
import { Resource } from '@/types/resources'
import { useState } from 'react'
import QRCodeGenerator from './QRCodeGenerator'

interface ShareButtonProps {
  resource: Resource
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  variant?: 'default' | 'compact' | 'full'
}

export default function ShareButton({ 
  resource, 
  className = '', 
  size = 'md', 
  showText = true,
  variant = 'default'
}: ShareButtonProps) {
  const [showFallback, setShowFallback] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  }

  const formatResourceText = () => {
    const resourceUrl = `${window.location.origin}/resource/${resource.id}`
    return `${resource.name}\n${resource.description}\n\n📍 ${resource.address}\n📞 ${resource.phone}\n${resource.website ? `🌐 ${resource.website}\n` : ''}\nFound via Central Texas Resources\n${resourceUrl}`
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(formatResourceText())
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(`${window.location.origin}/resource/${resource.id}`)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${resource.name} - Central Texas Resource`)
    const url = encodeURIComponent(`${window.location.origin}/resource/${resource.id}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const handleNativeShare = async () => {
    const shareData = {
      title: resource.name,
      text: formatResourceText(),
      url: window.location.href
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error)
        setShowFallback(true)
      }
    } else {
      setShowFallback(true)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatResourceText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleSMS = () => {
    const text = encodeURIComponent(formatResourceText())
    window.location.href = `sms:?body=${text}`
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Resource: ${resource.name}`)
    const body = encodeURIComponent(formatResourceText())
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  // Full variant with comprehensive sharing options
  if (variant === 'full') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          📤 Share This Resource
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-medium text-sm">Native Share</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium text-sm">WhatsApp</span>
          </button>

          <button
            onClick={handleSMS}
            className="flex items-center gap-2 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <span className="text-sm">💬</span>
            <span className="font-medium text-sm">SMS</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex items-center gap-2 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="font-medium text-sm">Email</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={shareToFacebook}
            className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-sm">👥</span>
            <span className="font-medium text-sm">Facebook</span>
          </button>

          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span className="font-medium text-sm">QR Code</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 p-3 border-2 border-dashed rounded-lg transition-colors w-full justify-center ${
            copied 
              ? 'border-green-300 bg-green-50 text-green-700' 
              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
          }`}
        >
          <Copy className="w-4 h-4" />
          <span className="font-medium text-sm">
            {copied ? '✓ Copied!' : 'Copy Link & Details'}
          </span>
        </button>

        {/* QR Code Modal */}
        {showQR && <QRModal resource={resource} onClose={() => setShowQR(false)} />}
      </div>
    )
  }

  if (showFallback) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowFallback(false)}
          className={`${sizeClasses[size]} ${className} bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2`}
        >
          <Share2 className={iconSizes[size]} />
          {showText && 'Share'}
        </button>
        
        {/* Enhanced Fallback Share Options */}
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border p-2 z-10 min-w-[240px]">
          <div className="grid gap-1">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
            
            <button
              onClick={handleSMS}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💬</span>
              </div>
              <span className="text-sm font-medium">SMS</span>
            </button>
            
            <button
              onClick={handleEmail}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Email</span>
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <QrCode className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">QR Code</span>
            </button>
            
            <div className="border-t mt-1 pt-1">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full ${
                  copied ? 'text-green-600' : ''
                }`}
              >
                <Copy className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">
                  {copied ? '✓ Copied!' : 'Copy Details'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && <QRModal resource={resource} onClose={() => setShowQR(false)} />}
      </div>
    )
  }

  return (
    <button
      onClick={handleNativeShare}
      className={`${sizeClasses[size]} ${className} bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2`}
    >
      <Share2 className={iconSizes[size]} />
      {showText && 'Share'}
    </button>
  )
}

// QR Code Modal Component
function QRModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const resourceUrl = typeof window !== 'undefined' ? `${window.location.origin}/resource/${resource.id}` : ''

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <QRCodeGenerator 
              url={resourceUrl} 
              size={200}
              className="mx-auto"
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            <strong>Scan to share:</strong>
          </p>
          <p className="text-sm font-medium text-gray-800 mb-4">
            {resource.name}
          </p>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 break-all">
              {resourceUrl}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">
              📍 {resource.address}
            </p>
            <p className="text-xs text-gray-500">
              📞 {resource.phone}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              const text = `${resource.name}\n📍 ${resource.address}\n📞 ${resource.phone}\n${resourceUrl}`
              navigator.clipboard.writeText(text)
            }}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Copy Details
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}