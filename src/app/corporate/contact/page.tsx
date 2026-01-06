import type { Metadata } from 'next';
import { HOLDING_COMPANY, CONTACT_INFO } from '@lib/constants/company';
import { Mail, MapPin, Phone, Clock, Building2 } from 'lucide-react';
import { CorporateContactForm } from '@components/corporate/CorporateContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${HOLDING_COMPANY.legalName}. We'd love to hear from you about partnerships, investments, or general inquiries.`,
};

export default function ContactPage() {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-black via-black to-accent-violet/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-teal/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-teal">
              Contact Us
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Let's Connect
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Whether you're interested in partnerships, investment opportunities, or simply want to learn more about what we do, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Get in Touch</h2>
              <p className="mt-4 text-white/60">
                We value every inquiry and strive to respond within 1-2 business days. Choose the best way to reach us below.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10">
                    <Building2 className="h-6 w-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Company Name</p>
                    <p className="mt-1 text-white/60">{HOLDING_COMPANY.legalName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10">
                    <Mail className="h-6 w-6 text-accent-violet" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="mt-1 text-accent-teal hover:text-accent-teal/80 transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                    <p className="mt-1 text-sm text-white/50">
                      For general inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10">
                    <Phone className="h-6 w-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                      className="mt-1 text-accent-teal hover:text-accent-teal/80 transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="mt-1 text-sm text-white/50">
                      Toll-free number
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10">
                    <Clock className="h-6 w-6 text-accent-violet" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Business Hours</p>
                    <p className="mt-1 text-white/60">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-white/60">Saturday - Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10">
                    <MapPin className="h-6 w-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Headquarters</p>
                    <p className="mt-1 text-white/60">
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {HOLDING_COMPANY.socials && (
                <div className="mt-10 border-t border-white/10 pt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Connect With Us</p>
                  <div className="mt-4 flex items-center gap-4">
                    {HOLDING_COMPANY.socials.linkedin && (
                      <a
                        href={HOLDING_COMPANY.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-white/30 hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {HOLDING_COMPANY.socials.instagram && (
                      <a
                        href={HOLDING_COMPANY.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-white/30 hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="font-display text-xl font-semibold text-white">Send Us a Message</h3>
              <p className="mt-2 text-sm text-white/60">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <CorporateContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-gradient-to-b from-black to-accent-violet/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>

            <div className="mt-10 space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-semibold text-white">What types of partnerships does Epic Dreams consider?</h3>
                <p className="mt-2 text-sm text-white/60">
                  We're open to various partnership opportunities including joint ventures, strategic alliances, and investment partnerships across entertainment, technology, and creative industries.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-semibold text-white">How can I pitch my business idea?</h3>
                <p className="mt-2 text-sm text-white/60">
                  Please use the contact form above or email us directly at {CONTACT_INFO.email}. Include a brief description of your business, what makes it unique, and what you're looking for in a partner.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-semibold text-white">What industries do your ventures operate in?</h3>
                <p className="mt-2 text-sm text-white/60">
                  Our portfolio spans entertainment, music, artificial intelligence, technology, and creative industries. We're always looking for innovative companies that align with our mission and values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
