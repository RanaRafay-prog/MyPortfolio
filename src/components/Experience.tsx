import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, ArrowUpRight, CheckCircle2, Terminal, Code2, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
              01. Professional Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Work Experience &amp; Engineering Internships
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              Direct production experience building AI infrastructure, billing pipelines, and background workflows.
            </p>
          </div>
        </ScrollReveal>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <ScrollReveal key={index} delay={0.1}>
              <div
                className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/90 relative"
              >
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-neutral-100">{exp.role}</h3>
                      <span className="text-neutral-500">·</span>
                      <span className="text-base font-semibold text-sky-400">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1 font-mono">
                      <span>{exp.period}</span>
                      <span>·</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">
                      AI Infrastructure &amp; Backend
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Bullet Points */}
                <div className="mt-6 space-y-3.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Core Responsibilities &amp; Delivered Outcomes
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capstones & Repositories Completed During Role */}
                <div className="mt-6 pt-5 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-neutral-400 block mb-1">
                      Featured FlyRank Capstone Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <a
                        href="https://github.com/RanaRafay-prog/flyrank-capstone-metering-billing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-sky-300 hover:border-sky-500/50 transition-colors"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>flyrank-capstone-metering-billing</span>
                        <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                      </a>
                      <a
                        href="https://github.com/RanaRafay-prog/inngest-background-job"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-sky-300 hover:border-sky-500/50 transition-colors"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>inngest-background-job</span>
                        <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 bg-neutral-950 border border-neutral-800/80 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
