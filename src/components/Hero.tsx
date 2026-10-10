import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Check, Copy, Terminal, FileDown } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-6 font-mono">
          <span className="text-sky-400 font-medium">Software Engineering Student</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-200">COMSATS University Islamabad, Wah Campus</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-300">AI Intern @ FlyRank</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Aspiring AI Engineer</span>
        </div>

        {/* Hero Title & Positioning Statement */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-100 leading-[1.1] text-balance">
            Building reliable AI workflows, background execution pipelines, and token-aware systems.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl pt-2">
            I am <strong className="text-neutral-100 font-semibold">{PORTFOLIO_DATA.personal.name}</strong>, a software engineering student specializing in the backend and execution layer of AI systems. My work focuses on deterministic decision graphs, resilient asynchronous workers, fine-grained token metering, and scalable API architecture.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold bg-neutral-100 text-neutral-950 rounded-lg hover:bg-white transition-colors shadow-sm"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-sky-950/40 hover:bg-sky-900/40 text-sky-300 border border-sky-800/60 hover:border-sky-600/80 rounded-lg transition-colors shadow-sm"
            title="Download or Preview Resume PDF"
          >
            <FileDown className="w-4 h-4 text-sky-400" />
            <span>Download Resume (PDF)</span>
          </button>

          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 rounded-lg hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 rounded-lg hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 rounded-lg hover:text-white transition-colors"
            title="Copy email to clipboard"
          >
            <Mail className="w-4 h-4" />
            <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
          </button>
        </div>

        {/* Architectural Highlights Strip */}
        <div className="mt-12 pt-8 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
          <div>
            <div className="text-xs text-neutral-500 mb-1">CORE ROLE</div>
            <div className="text-sm font-semibold text-neutral-200">FlyRank AI Intern</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Metering &amp; Async Workers</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">AGENTIC WORKFLOWS</div>
            <div className="text-sm font-semibold text-neutral-200">React Flow + Inngest</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Durable Decision Trees</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">METERING GUARDS</div>
            <div className="text-sm font-semibold text-neutral-200">HTTP 402 / 429 Quotas</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Idempotency-Key Headers</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">AVAILABILITY</div>
            <div className="text-sm font-semibold text-emerald-400">Open to Roles</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">AI &amp; Backend Engineering</div>
          </div>
        </div>
      </div>
    </section>
  );
};
