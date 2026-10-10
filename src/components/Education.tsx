import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
              04. Academic Background &amp; Milestones
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Education &amp; Key Achievements
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              Undergraduate coursework and milestones established across software engineering and AI systems development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Card (lg: 5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800">
                    <GraduationCap className="w-5 h-5 text-sky-400" />
                    <h3 className="text-base font-bold text-neutral-100">Degree &amp; Studies</h3>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="text-base font-bold text-neutral-100">
                      {PORTFOLIO_DATA.education.degree}
                    </div>
                    <div className="text-xs text-sky-400 font-mono">
                      {PORTFOLIO_DATA.education.institution}
                    </div>
                    <p className="text-xs text-neutral-400 pt-2 leading-relaxed">
                      {PORTFOLIO_DATA.education.note}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-800">
                    <div className="text-xs font-semibold text-neutral-300 mb-3">
                      Core Foundations:
                    </div>
                    <div className="space-y-2">
                      {PORTFOLIO_DATA.education.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                          <span className="w-1 h-1 rounded-full bg-sky-400" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 font-mono">
                  COMSATS University Islamabad, Wah Campus — Department of Computer Science
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Achievements & Milestones (lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Verified Achievements &amp; Capstones
            </div>
            {PORTFOLIO_DATA.achievements.map((item, idx) => (
              <ScrollReveal key={idx} delay={0.12 * (idx + 1)}>
                <div
                  className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700/80 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-sky-400 shrink-0" />
                      <h4 className="text-sm font-bold text-neutral-100">{item.title}</h4>
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      <span>{item.organization}</span> · <span>{item.year}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
