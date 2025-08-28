'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DonatePage() {
  const [copied, setCopied] = useState(false)
  
  const squareCheckout = process.env.NEXT_PUBLIC_SQUARE_CHECKOUT || '#'
  const cashAppHandle = process.env.NEXT_PUBLIC_CASH_APP_HANDLE || '$YourCashTag'
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cashAppHandle)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Keep This Lifeline Alive
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This resource is self-hosted and self-funded by Raise the Vibe. Your gift keeps 
            information accurate, up-to-date, and free for people in crisis.
          </p>
        </div>
      </div>

      {/* Impact Tiles */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-green-600 mb-4">$25</div>
              <p className="text-gray-700 text-lg">
                Verifies 10 resources with current contact info and operating hours
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">$50</div>
              <p className="text-gray-700 text-lg">
                Covers hosting and monitoring for a full week of 24/7 availability
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-4">$100</div>
              <p className="text-gray-700 text-lg">
                Funds real-time updates and new resource listings for the month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Methods */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Choose Your Donation Method
          </h2>
          
          {/* Primary: Square Checkout */}
          <div className="mb-8">
            <a
              href={squareCheckout}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              💳 Donate with Card (Square)
            </a>
            <p className="text-sm text-gray-500 mt-2">Secure checkout • No account required</p>
          </div>

          {/* Secondary: Cash App */}
          <div className="mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash App</h3>
              <div className="flex items-center justify-center gap-3">
                <code className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono">
                  {cashAppHandle}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Open Cash App and send to this handle</p>
            </div>
          </div>

          {/* Optional: Mail Check */}
          <div className="mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mail a Check</h3>
              <p className="text-gray-600 mb-4">
                Prefer to send a check? We&apos;ll provide mailing instructions securely.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                📬 Get Mailing Address
              </Link>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-12">
            <p className="text-sm text-gray-700">
              <strong>Privacy Promise:</strong> We never publish personal contact info; 
              we route all submissions through secure forms. Your donation information 
              is processed securely and never shared.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Resources */}
      <div className="py-8 bg-white text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Resources
        </Link>
      </div>
    </div>
  )
}