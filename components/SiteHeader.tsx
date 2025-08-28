'use client';

import Link from 'next/link';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { HEADER_NAV_ITEMS } from '@/lib/nav';

export default function SiteHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/logo-hlifeline.svg"
              alt="HelpNow ATX"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {HEADER_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-aurora-indigo700 hover:bg-aurora-pink50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}