'use client'

import { Share2, Copy, MessageCircle, Mail } from 'lucide-react'
import { Resource } from '@/types/resources'
import { useState } from 'react'

interface ShareButtonProps {
  resource: Resource
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function ShareButton({ 
  resource, 
  className = '', 
  size = 'md', 
  showText = true 
}: ShareButtonProps) {
  const [showFallback, setShowFallback] = useState(false)
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
    return `${resource.name}\n${resource.description}\n\nPhone: ${resource.phone}\nAddress: ${resource.address}\n\nShared from Central Texas Resources`
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
        
        {/* Fallback Share Options */}
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border p-2 z-10 min-w-[200px]">
          <div className="grid gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <Copy className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </span>
            </button>
            
            <button
              onClick={handleSMS}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Share via SMS</span>
            </button>
            
            <button
              onClick={handleEmail}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left w-full"
            >
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Share via Email</span>
            </button>
          </div>
        </div>
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