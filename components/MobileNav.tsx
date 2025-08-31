'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/nav';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element when menu opens
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-700 hover:text-aurora-indigo700 transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            id="mobile-menu"
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 hover:text-aurora-indigo700 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-4 py-6 flex-1 overflow-y-auto">
              <ul className="space-y-3 pb-6">
                {NAV_ITEMS.map((item, index) => (
                  <li key={`${item.href}-${index}`}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={
                        item.href === '/support'
                          ? "block px-4 py-3 text-lg font-semibold text-white bg-aurora-emerald500 hover:bg-emerald-600 rounded-lg transition-colors shadow-md"
                          : "block px-3 py-2 text-lg text-gray-700 hover:text-aurora-indigo700 hover:bg-aurora-pink50 rounded-lg transition-colors"
                      }
                    >
                      {item.href === '/support' && item.label === 'Support' ? '💚 Support' : 
                       item.href === '/support' && item.label === 'Donate' ? '💲 Donate' : 
                       item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Branding within nav area to avoid overlap */}
              <div className="px-3 pt-4 border-t border-gray-200 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  Powered by{' '}
                  <a 
                    href="https://www.raizethevibe.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600"
                  >
                    Raise the Vibe
                  </a>
                </p>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}