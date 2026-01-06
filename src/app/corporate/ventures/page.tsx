import type { Metadata } from 'next';
import Link from 'next/link';
import { HOLDING_COMPANY, SUBSIDIARIES } from '@lib/constants/company';
import { ArrowRight, ExternalLink, Globe, Music, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Ventures',
  description: `Explore the portfolio of companies under ${HOLDING_COMPANY.legalName}. From entertainment to technology, discover our innovative ventures.`,
};

// Icon mapping for industries
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Entertainment & Music': Music,
  'Artificial Intelligence & Technology': Cpu,
};

export default function VenturesPage() {
  const activeSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'active');
  const plannedSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'planned');

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-black via-black to-accent-violet/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-teal/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">
              Our Portfolio
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Our Ventures
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              We invest in and nurture innovative companies across entertainment, technology, and creative industries. Each venture shares our commitment to excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Active Ventures */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">Active</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white">
              Current Portfolio
            </h2>
          </div>

          <div className="space-y-8">
            {activeSubsidiaries.map((company) => {
              const Icon = industryIcons[company.industry || ''] || Globe;
              return (
                <div
                  key={company.id}
                  id={company.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 md:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-violet/20">
                            <Icon className="h-7 w-7 text-accent-teal" />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-white">
                              {company.name}
                            </h3>
                            <p className="text-sm text-white/50">{company.legalName}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-accent-teal/10 px-3 py-1 text-xs font-medium text-accent-teal">
                            {company.industry}
                          </span>
                          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                            Active
                          </span>
                        </div>

                        <p className="mt-6 text-white/70 leading-relaxed">
                          {company.description}
                        </p>

                        {company.mission && (
                          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Mission</p>
                            <p className="mt-2 text-sm text-white/60 italic">
                              "{company.mission}"
                            </p>
                          </div>
                        )}

                        {company.tagline && (
                          <p className="mt-6 text-accent-violet italic">
                            "{company.tagline}"
                          </p>
                        )}
                      </div>

                      <div className="lg:ml-8 lg:w-64 shrink-0">
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                          {company.website && (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent-teal transition-colors"
                            >
                              <Globe className="h-4 w-4" />
                              Visit Website
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}

                          {company.socials && Object.keys(company.socials).length > 0 && (
                            <div className="mt-6">
                              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Connect</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {company.socials.instagram && (
                                  <a
                                    href={company.socials.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
                                  >
                                    Instagram
                                  </a>
                                )}
                                {company.socials.youtube && (
                                  <a
                                    href={company.socials.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
                                  >
                                    YouTube
                                  </a>
                                )}
                                {company.socials.tiktok && (
                                  <a
                                    href={company.socials.tiktok}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
                                  >
                                    TikTok
                                  </a>
                                )}
                                {company.socials.twitter && (
                                  <a
                                    href={company.socials.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
                                  >
                                    Twitter
                                  </a>
                                )}
                                {company.socials.linkedin && (
                                  <a
                                    href={company.socials.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-white/30 hover:text-white transition-colors"
                                  >
                                    LinkedIn
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon / Planned Ventures */}
      {plannedSubsidiaries.length > 0 && (
        <section className="border-t border-white/10 bg-gradient-to-b from-black to-accent-violet/5">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-violet">Coming Soon</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white">
                Future Ventures
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plannedSubsidiaries.map((company) => (
                <div
                  key={company.id}
                  className="rounded-xl border border-white/10 border-dashed bg-white/[0.01] p-6"
                >
                  <span className="rounded-full bg-accent-violet/20 px-3 py-1 text-xs font-medium text-accent-violet">
                    Coming Soon
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white/80">
                    {company.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">
                    {company.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Investment Focus */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">Investment Focus</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white">
              Industries We Invest In
            </h2>
            <p className="mt-4 text-white/60">
              We focus on sectors where innovation meets opportunity, backing companies that are positioned to lead their markets.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-teal/10">
                <Music className="h-7 w-7 text-accent-teal" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                Entertainment & Media
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Music, film, content creation, and immersive entertainment experiences.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-violet/10">
                <Cpu className="h-7 w-7 text-accent-violet" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                Technology & AI
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Artificial intelligence, software platforms, and emerging technologies.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-teal/10">
                <Globe className="h-7 w-7 text-accent-teal" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                Creative Industries
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Design, fashion, digital art, and creative services companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-gradient-to-b from-black to-accent-violet/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white">
              Have a Business Idea?
            </h2>
            <p className="mt-4 text-white/60">
              We're always looking for innovative companies and entrepreneurs who share our vision. If you have a compelling business that aligns with our investment focus, we'd love to hear from you.
            </p>
            <div className="mt-8">
              <Link
                href="/corporate/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-8 py-3 text-sm font-semibold text-black hover:bg-accent-teal/90 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
