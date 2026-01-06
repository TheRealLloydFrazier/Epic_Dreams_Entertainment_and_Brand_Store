import Link from 'next/link';
import { HOLDING_COMPANY, SUBSIDIARIES, CONTACT_INFO } from '@lib/constants/company';

const quickLinks = [
  { href: '/corporate', label: 'Home' },
  { href: '/corporate/about', label: 'About Us' },
  { href: '/corporate/ventures', label: 'Our Ventures' },
  { href: '/corporate/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/policies/privacy', label: 'Privacy Policy' },
  { href: '/policies/terms', label: 'Terms of Service' },
];

export function CorporateFooter() {
  const activeSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'active');

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal to-accent-violet">
                <span className="text-lg font-bold text-black">ED</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white">Epic Dreams</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Asset Management</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              {HOLDING_COMPANY.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {HOLDING_COMPANY.socials?.linkedin && (
                <a
                  href={HOLDING_COMPANY.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {HOLDING_COMPANY.socials?.instagram && (
                <a
                  href={HOLDING_COMPANY.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Navigation</p>
            <div className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Our Ventures */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Our Ventures</p>
            <div className="mt-4 flex flex-col gap-3">
              {activeSubsidiaries.map((company) => (
                <Link
                  key={company.id}
                  href={`/corporate/ventures#${company.id}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {company.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {HOLDING_COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
