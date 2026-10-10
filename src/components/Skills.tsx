import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code, Cpu, Server, Database, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Skills: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 2:
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 3:
        return <Database className="w-4 h-4 text-amber-400" />;
      default:
        return <Code className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
              03. Technical Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Skills &amp; Engineering Stack
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              Only technologies actively used in my production work, FlyRank internship, and open-source repositories.
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.skills.map((category, catIdx) => (
            <ScrollReveal key={catIdx} delay={0.08 * catIdx}>
              <div
                className="h-full p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90"
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800">
                  {getCategoryIcon(catIdx)}
                  <h3 className="text-base font-bold text-neutral-100">{category.title}</h3>
                </div>

                <div className="mt-4 space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1 pb-2 border-b border-neutral-800/40 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold text-neutral-200 font-mono text-sm">
                        {skill.name}
                      </span>
                      <span className="text-neutral-400 text-[11px] sm:text-right">
                        {skill.context}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
