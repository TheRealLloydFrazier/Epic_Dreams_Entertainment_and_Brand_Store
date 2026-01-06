'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export function CorporateContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: ContactFormData) => {
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          message: `
Name: ${values.name}
Company: ${values.company || 'N/A'}
Subject: ${values.subject}

Message:
${values.message}
          `.trim(),
          type: 'corporate-inquiry'
        })
      });
      if (!response.ok) {
        setError('Unable to send message. Please try again.');
        return;
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl border border-accent-teal/30 bg-accent-teal/10 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-teal/20">
          <svg
            className="h-6 w-6 text-accent-teal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="font-semibold text-white">Message Sent!</h4>
        <p className="mt-2 text-sm text-white/60">
          Thank you for reaching out. We'll get back to you within 1-2 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-accent-teal hover:text-accent-teal/80 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal transition-colors"
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal transition-colors"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
          Company
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal transition-colors"
          placeholder="Your company (optional)"
          {...register('company')}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
          Subject <span className="text-red-400">*</span>
        </label>
        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal transition-colors"
          {...register('subject', { required: 'Please select a subject' })}
        >
          <option value="" className="bg-black">Select a topic</option>
          <option value="Partnership Inquiry" className="bg-black">Partnership Inquiry</option>
          <option value="Investment Opportunity" className="bg-black">Investment Opportunity</option>
          <option value="Business Proposal" className="bg-black">Business Proposal</option>
          <option value="Media/Press" className="bg-black">Media/Press</option>
          <option value="General Inquiry" className="bg-black">General Inquiry</option>
          <option value="Other" className="bg-black">Other</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={5}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent-teal focus:outline-none focus:ring-1 focus:ring-accent-teal transition-colors resize-none"
          placeholder="Tell us how we can help..."
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 20,
              message: 'Please provide more details (at least 20 characters)'
            }
          })}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-accent-teal px-6 py-3 text-sm font-semibold text-black hover:bg-accent-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-center text-xs text-white/40">
        By submitting this form, you agree to our{' '}
        <a href="/policies/privacy" className="text-white/60 hover:text-white">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
