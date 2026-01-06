import type { Metadata } from 'next';
import Link from 'next/link';
import { HOLDING_COMPANY, SUBSIDIARIES } from '@lib/constants/company';
import { ArrowRight, Award, Globe, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${HOLDING_COMPANY.legalName} - our mission, vision, and the values that drive us.`,
};

export default function AboutPage() {
  const activeCount = SUBSIDIARIES.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-black via-black to-accent-violet/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-teal/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">
              About Us
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Building the Future, One Dream at a Time
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {HOLDING_COMPANY.legalName} is a forward-thinking holding company dedicated to nurturing innovative ventures across entertainment, technology, and creative industries.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-white">Our Story</h2>
            <div className="mt-8 space-y-6 text-white/70 leading-relaxed">
              <p>
                Epic Dreams Asset Management and Holding Company was founded with a singular vision: to create and support companies that transform industries and inspire people. We believe that great ideas deserve the resources, guidance, and freedom to flourish.
              </p>
              <p>
                Our approach combines strategic investment with hands-on operational support. We don't just provide capital – we provide partnership. Our team works alongside our portfolio companies, sharing expertise, opening doors, and helping navigate the challenges of growth.
              </p>
              <p>
                Today, we manage a diverse portfolio of innovative companies, each united by a commitment to excellence, creativity, and positive impact. From entertainment to artificial intelligence, our ventures are shaping the future across multiple industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-accent-teal">{activeCount}</p>
              <p className="mt-2 text-sm text-white/60">Active Ventures</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-accent-violet">3+</p>
              <p className="mt-2 text-sm text-white/60">Industries</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-accent-teal">∞</p>
              <p className="mt-2 text-sm text-white/60">Dreams Pursued</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-accent-violet">1</p>
              <p className="mt-2 text-sm text-white/60">Mission</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-gradient-to-b from-black to-accent-violet/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">Our Values</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              What We Stand For
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10">
                <Target className="h-6 w-6 text-accent-teal" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">Excellence</h3>
              <p className="mt-2 text-sm text-white/60">
                We pursue excellence in everything we do, setting high standards and continuously raising the bar.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-violet/10">
                <Globe className="h-6 w-6 text-accent-violet" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">Innovation</h3>
              <p className="mt-2 text-sm text-white/60">
                We embrace new ideas and technologies, always looking for better ways to solve problems and create value.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10">
                <Users className="h-6 w-6 text-accent-teal" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">Integrity</h3>
              <p className="mt-2 text-sm text-white/60">
                We operate with honesty and transparency, building trust through ethical business practices.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-violet/10">
                <Award className="h-6 w-6 text-accent-violet" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">Impact</h3>
              <p className="mt-2 text-sm text-white/60">
                We measure success not just in profits, but in the positive impact we create for our communities and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Detail */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-accent-teal/20 bg-accent-teal/5 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-teal">Our Mission</p>
              <p className="mt-6 font-display text-xl font-medium text-white leading-relaxed">
                {HOLDING_COMPANY.mission}
              </p>
            </div>
            <div className="rounded-2xl border border-accent-violet/20 bg-accent-violet/5 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-violet">Our Vision</p>
              <p className="mt-6 font-display text-xl font-medium text-white leading-relaxed">
                {HOLDING_COMPANY.vision}
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
              Want to Learn More?
            </h2>
            <p className="mt-4 text-white/60">
              Explore our portfolio of innovative ventures or get in touch to discuss partnership opportunities.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/corporate/ventures"
                className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-8 py-3 text-sm font-semibold text-black hover:bg-accent-teal/90 transition-colors"
              >
                Our Ventures
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
    </div>
  );
}
