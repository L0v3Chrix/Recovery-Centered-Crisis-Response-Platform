'use client'

import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-gray-100 border-t py-4 text-center text-sm mt-auto">
      <div className="container mx-auto px-4">
        {/* Published by */}
        <div className="mb-3">
          <p className="text-gray-600">
            Published by{' '}
            <a
              href="https://raisethevibe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Raise the Vibe
            </a>
          </p>
        </div>

        {/* Navigation Buttons */}
        <nav className="flex flex-wrap justify-center gap-3">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-sm hover:shadow bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            💝 Donate
          </Link>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-sm hover:shadow bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            🤝 Partners
          </Link>
          <Link
            href="/share"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-sm hover:shadow bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            📢 Share
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-sm hover:shadow bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            ➕ Submit a Resource
          </Link>
        </nav>
      </div>
    </footer>
  )
}