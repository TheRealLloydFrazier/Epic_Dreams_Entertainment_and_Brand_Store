import Link from 'next/link';
import { HOLDING_COMPANY, SUBSIDIARIES } from '@lib/constants/company';
import { LogoMark } from '@components/brand/Logo';

const entertainment = SUBSIDIARIES.find(s => s.id === 'epic-dreams-entertainment');

const policyLinks = [
  { href: '/policies/shipping', label: 'Shipping Policy' },
  { href: '/policies/returns', label: 'Returns & Refunds' },
  { href: '/policies/privacy', label: 'Privacy Policy' },
  { href: '/policies/terms', label: 'Terms of Service' }
];

const socialLinks = [
  { href: entertainment?.socials?.instagram || 'https://instagram.com/epicdreamsent', label: 'Instagram' },
  { href: entertainment?.socials?.youtube || 'https://youtube.com/@epicdreamsent', label: 'YouTube' },
  { href: entertainment?.socials?.tiktok || 'https://tiktok.com/@epicdreamsent', label: 'TikTok' }
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/company', label: 'Our Organization' },
  { href: '/contact', label: 'Contact' }
];

export function Footer() {
  return (
    <footer className="border-t border-accent-violet/20 bg-black/90">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size="lg" />
              <p className="font-display text-xl uppercase tracking-[0.3em] text-white">Epic Dreams</p>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Epic Dreams Entertainment is a forward-thinking label building immersive worlds through music, design, and story.
            </p>
            {/* Part of organization badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-violet/30 bg-accent-violet/5 px-3 py-1.5">
              <span className="text-sm text-accent-violet">∞</span>
              <span className="text-[10px] text-white/50">Part of Epic Dreams Organization</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Company</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Policies</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {policyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Connect</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Footer bottom with holding company info */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Epic Dreams Entertainment LLC. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              A subsidiary of{' '}
              <Link href="/company" className="text-white/50 hover:text-white/70">
                {HOLDING_COMPANY.legalName}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
