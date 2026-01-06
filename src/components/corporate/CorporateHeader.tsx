'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@lib/utils/styles';

const navItems = [
  { href: '/corporate', label: 'Home' },
  { href: '/corporate/about', label: 'About' },
  { href: '/corporate/ventures', label: 'Our Ventures' },
  { href: '/corporate/contact', label: 'Contact' },
];

export function CorporateHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/corporate" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal to-accent-violet">
            <span className="text-lg font-bold text-black">ED</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-wide text-white">Epic Dreams</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Asset Management</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium text-white/70 hover:text-white transition-colors',
                {
                  'text-white': pathname === item.href
                }
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/corporate/contact"
            className="hidden sm:inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            Get in Touch
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95">
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'py-3 text-sm font-medium text-white/70 hover:text-white border-b border-white/5 last:border-0',
                  {
                    'text-white': pathname === item.href
                  }
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
