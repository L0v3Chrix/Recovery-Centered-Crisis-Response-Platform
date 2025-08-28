'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/crisis', label: 'Crisis Help' },
  { href: '/food', label: 'Food' },
  { href: '/shelter', label: 'Shelter' },
  { href: '/healthcare', label: 'Healthcare' },
  { href: '/recovery', label: 'Recovery' },
  { href: '/housing', label: 'Housing' },
  { href: '/transportation', label: 'Transportation' },
  { href: '/legal', label: 'Legal Aid' },
  { href: '/employment', label: 'Employment' },
  { href: '/support', label: 'Support Groups' },
  { href: '/quiz', label: 'Take Assessment' },
  { href: '/submit', label: 'Submit Resource' },
  { href: '/partners', label: 'Partners' },
];

export default function OverlayAppBar() {
  const [open, setOpen] = useState(false);
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Focus trap when menu opens
  useEffect(() => {
    if (open && firstRef.current) {
      firstRef.current.focus();
    }
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo (no bar, just floating) */}
        <Link href="/" aria-label="HelpNow ATX" className="pointer-events-auto">
          <Image 
            src="/brand/helpnowatx_logo_final.png" 
            alt="HelpNow ATX" 
            width={1400} 
            height={500}
            className="h-10 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" 
            priority 
          />
        </Link>
        
        {/* Hamburger button with glass effect */}
        <button 
          onClick={() => setOpen(true)} 
          aria-label="Open menu"
          className="pointer-events-auto inline-flex items-center rounded-xl border border-white/15 bg-white/10 backdrop-blur px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-sky-400/70 transition-all"
        >
          <span className="sr-only">Open menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="pointer-events-auto fixed inset-0"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer panel */}
          <div className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-[#0b1020]/95 backdrop-blur-lg text-slate-100 shadow-2xl ring-1 ring-white/10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-slate-100">Navigation</span>
              <button 
                onClick={() => setOpen(false)} 
                aria-label="Close menu" 
                className="text-sm text-slate-300 hover:text-white underline underline-offset-4"
              >
                Close
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  ref={i === 0 ? firstRef : undefined}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs text-slate-400">
                516+ verified resources • Updated weekly
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}