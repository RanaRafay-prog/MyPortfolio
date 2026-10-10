import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight, Sparkles, Layers, Cpu, Server, Database } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ScrollReveal } from './ScrollReveal';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'backend' | 'systems'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
                02. GitHub Repositories &amp; Engineering Centerpiece
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
                Verified Open-Source Projects
              </h2>
              <p className="mt-1 text-sm text-neutral-400 max-w-xl">
                Ranked by AI relevance and system impact. Every repository represents working code available publicly on GitHub.
              </p>
            </div>

            {/* Interactive Filter Controls */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg self-start md:self-auto font-mono text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All ({PORTFOLIO_DATA.projects.length})
              </button>
              <button
                onClick={() => setFilter('ai')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  filter === 'ai'
                    ? 'bg-neutral-800 text-sky-300 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                AI &amp; Workflows
              </button>
              <button
                onClick={() => setFilter('backend')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  filter === 'backend'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Backend &amp; APIs
              </button>
              <button
                onClick={() => setFilter('systems')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  filter === 'systems'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Systems
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={0.06 * (idx % 4)}>
              <div
                className={`h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border transition-all duration-200 ${
                  project.isAiFeatured
                    ? 'border-sky-900/50 hover:border-sky-500/50 hover:bg-neutral-900/70'
                    : 'border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div>
                  {/* Unboxed Metadata (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2.5">
                    <span className="text-neutral-500">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{project.category}</span>
                    {project.isAiFeatured && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-sky-400 font-medium">Featured AI System</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-100 leading-snug">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Problem Statement Snapshot */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs">
                    <span className="text-neutral-400 font-medium block mb-1">Problem Solved:</span>
                    <p className="text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Outcomes / Metrics Highlights */}
                  <div className="mt-3 space-y-1 text-xs font-mono text-neutral-300">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-1.5 text-neutral-400">
                        <span className="text-sky-400 font-bold">›</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Tech Stack & Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
                    >
                      <span>Architecture Deep Dive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
