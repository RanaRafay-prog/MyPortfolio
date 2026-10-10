import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Mail, Check, Copy, ArrowUpRight, MessageSquare, Send } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
      subject || 'AI Engineering Opportunity'
    )}&body=${encodeURIComponent(message || 'Hi Abdul,\n\nI came across your portfolio and repositories...')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
              05. Get in Touch
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Let&apos;s Build Together
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              Currently open to AI engineering internships, junior AI/backend engineer roles, and collaborative projects tackling non-trivial systems problems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Links (lg: 6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4">
                <h3 className="text-base font-bold text-neutral-100">Direct Contact Details</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Whether you want to discuss AI workflow graphs, token metering architectures, or role opportunities, feel free to reach out directly.
                </p>

                {/* Email Card with Copy button */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-900 rounded-lg text-sky-400 border border-neutral-800">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-500 font-mono block">Primary Email</span>
                      <a
                        href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-200 hover:text-sky-300 transition-colors"
                      >
                        {PORTFOLIO_DATA.personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Verified Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={PORTFOLIO_DATA.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                      <div>
                        <span className="text-xs font-semibold text-neutral-200 block">GitHub</span>
                        <span className="text-[11px] text-neutral-500 font-mono">@RanaRafay-prog</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-sky-400 group-hover:text-sky-300" />
                      <div>
                        <span className="text-xs font-semibold text-neutral-200 block">LinkedIn</span>
                        <span className="text-[11px] text-neutral-500 font-mono">abdul-rafay-7564033b5</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Message Form (lg: 6 cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.15}>
              <form
                onSubmit={handleDirectEmail}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 space-y-4"
              >
                <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>Send a Quick Note</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Subject or Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AI Engineer Role / Project Collaboration"
                    className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-neutral-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details about your team, problem space, or opening..."
                    className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-neutral-100 text-neutral-950 hover:bg-white rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Mail Client</span>
                </button>

                <p className="text-[11px] text-neutral-500 text-center font-mono">
                  Opens your default mail app addressed to {PORTFOLIO_DATA.personal.email}
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
