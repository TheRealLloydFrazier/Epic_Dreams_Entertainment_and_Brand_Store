import Link from 'next/link';
import { HOLDING_COMPANY, SUBSIDIARIES } from '@lib/constants/company';
import { ArrowRight, Building2, Lightbulb, TrendingUp, Users } from 'lucide-react';

export default function CorporateHomePage() {
  const activeSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'active');

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-black to-accent-violet/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-teal/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">
              {HOLDING_COMPANY.industry}
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {HOLDING_COMPANY.tagline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">
              {HOLDING_COMPANY.description}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/corporate/ventures"
                className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-8 py-3 text-sm font-semibold text-black hover:bg-accent-teal/90 transition-colors"
              >
                Explore Our Ventures
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/corporate/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10">
                <Lightbulb className="h-6 w-6 text-accent-teal" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white">Our Mission</h2>
              <p className="text-white/60 leading-relaxed">
                {HOLDING_COMPANY.mission}
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-violet/10">
                <TrendingUp className="h-6 w-6 text-accent-violet" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white">Our Vision</h2>
              <p className="text-white/60 leading-relaxed">
                {HOLDING_COMPANY.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ventures */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">Portfolio</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              Our Ventures
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              We invest in and nurture innovative companies across entertainment, technology, and creative industries.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {activeSubsidiaries.map((company) => (
              <div
                key={company.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-white/20 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
                        {company.industry}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-white">
                        {company.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                      Active
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-white/60 leading-relaxed">
                    {company.description}
                  </p>
                  {company.tagline && (
                    <p className="mt-4 text-sm italic text-accent-violet">
                      "{company.tagline}"
                    </p>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-teal transition-colors"
                    >
                      Visit Website
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/corporate/ventures"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              View All Ventures
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Epic Dreams */}
      <section className="border-t border-white/10 bg-gradient-to-b from-black to-accent-violet/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">Why Us</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              The Epic Dreams Difference
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-teal/10">
                <Building2 className="h-8 w-8 text-accent-teal" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-white">
                Strategic Growth
              </h3>
              <p className="mt-3 text-sm text-white/60">
                We provide our ventures with the resources, guidance, and infrastructure needed to scale sustainably.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-violet/10">
                <Lightbulb className="h-8 w-8 text-accent-violet" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-white">
                Innovation Focus
              </h3>
              <p className="mt-3 text-sm text-white/60">
                We invest in forward-thinking companies that push boundaries and shape the future of their industries.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-teal/10">
                <Users className="h-8 w-8 text-accent-teal" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-white">
                People First
              </h3>
              <p className="mt-3 text-sm text-white/60">
                We believe great companies are built by great people. We support and empower our teams to do their best work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to Connect?
            </h2>
            <p className="mt-4 text-white/60">
              Whether you're interested in partnerships, investment opportunities, or just want to learn more about what we do, we'd love to hear from you.
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
