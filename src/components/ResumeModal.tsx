import React, { useState } from 'react';
import { X, Download, Printer, ExternalLink, Check, Copy, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumePDF } from '../utils/generateResumePDF';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    try {
      downloadResumePDF();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Toolbar */}
        <div className="px-5 py-3.5 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-sky-950/70 border border-sky-800/80 rounded-lg text-sky-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-100">Resume Preview</h3>
              <p className="text-[11px] text-neutral-400 font-mono">Abdul_Rafay_AI_Engineer_Resume.pdf</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-neutral-950 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              title="Download vector PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700/60"
              title="Print or Save via Browser Dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950/60">
          <div className="max-w-2xl mx-auto bg-white text-neutral-900 p-8 sm:p-10 rounded-xl shadow-lg border border-neutral-200 text-xs font-sans leading-relaxed selection:bg-neutral-200 selection:text-neutral-900">
            {/* Header */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-neutral-950">
                  {PORTFOLIO_DATA.personal.name.toUpperCase()}
                </h1>
                <span className="text-xs font-medium text-neutral-600">
                  Software Engineering Student &amp; Aspiring AI Engineer
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-neutral-500 font-mono">
                <span>{PORTFOLIO_DATA.personal.email}</span>
                <span>•</span>
                <span>github.com/{PORTFOLIO_DATA.personal.githubUsername}</span>
                <span>•</span>
                <span>linkedin.com/in/abdul-rafay-7564033b5</span>
                <span>•</span>
                <span>Lahore, Pakistan</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1.5">
                Professional Summary
              </h2>
              <p className="text-[11.5px] text-neutral-700 leading-normal">
                {PORTFOLIO_DATA.personal.bio}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-2">
                Work Experience
              </h2>
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 mb-3">
                  <div className="flex justify-between font-bold text-neutral-900 text-xs">
                    <span>{exp.role} — <span className="font-semibold text-neutral-700">{exp.company}</span></span>
                    <span className="font-mono text-[11px] font-normal text-neutral-500">{exp.period} ({exp.location})</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-neutral-700">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Projects */}
            <div className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-2">
                Featured Engineering Projects
              </h2>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between font-bold text-neutral-900 text-xs">
                    <span>YES/NO AI Workflows</span>
                    <span className="font-mono text-[10.5px] font-normal text-neutral-500">Next.js 15 · React Flow · Inngest · OpenAI</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 mt-0.5">
                    Visual decision canvas where nodes execute autonomous binary AI evaluations branching on YES/NO edges, with 2x automated Inngest step retries and live execution traces.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-neutral-900 text-xs">
                    <span>AI Usage Metering &amp; Billing Engine (FlyRank Capstone)</span>
                    <span className="font-mono text-[10.5px] font-normal text-neutral-500">Node.js · Express · Stripe API · SQLite</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 mt-0.5">
                    High-reliability metering service with idempotency guarantees (Idempotency-Key), multi-tier AI token pricing (cached inputs vs reasoning), and proactive 402/429 quotas.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-neutral-900 text-xs">
                    <span>Background Job API &amp; Study Coach (FlyRank Capstone)</span>
                    <span className="font-mono text-[10.5px] font-normal text-neutral-500">Python 3.10+ · FastAPI · Inngest SDK</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 mt-0.5">
                    FastAPI microservice executing heavy compute in resilient Inngest background workers (accept fast 202 -&gt; background job -&gt; poll status) with retry and terminal failure hooks.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1.5">
                Technical Skills
              </h2>
              <div className="space-y-1 text-[11px] text-neutral-700">
                <div>
                  <strong className="text-neutral-900">Languages:</strong> Python, TypeScript, JavaScript (ES6+), Java, SQL, HTML5/CSS3
                </div>
                <div>
                  <strong className="text-neutral-900">AI &amp; Workflows:</strong> OpenAI SDK, Agentic Decision Trees, Token Economics, Inngest Steps
                </div>
                <div>
                  <strong className="text-neutral-900">Backend &amp; Cloud:</strong> FastAPI, Node.js, Express, Next.js 15, REST APIs, Stripe Webhooks, Docker, Supabase, SQLite, PostgreSQL
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="flex justify-between text-xs font-semibold text-neutral-900">
                <span>{PORTFOLIO_DATA.education.degree}</span>
                <span className="font-mono text-[11px] font-normal text-neutral-500">{PORTFOLIO_DATA.education.institution}</span>
              </div>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Coursework: {PORTFOLIO_DATA.education.focusAreas.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between text-xs text-neutral-400">
          <span>Vector PDF generated directly with standard A4 typography.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-sky-500 text-neutral-950 font-semibold hover:bg-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
