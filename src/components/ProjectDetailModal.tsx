import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <span className="capitalize">{project.category} Project</span>
              <span>·</span>
              <span className="font-mono text-neutral-400">RanaRafay-prog/{project.id}</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-100">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mt-6">
          {/* Problem & Solution */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                The Problem
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Architectural Solution
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Flow Diagram */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Execution Architecture Flow
            </h4>
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3.5 font-mono text-xs text-sky-300/90 leading-relaxed">
              {project.architectureSummary}
            </div>
          </div>

          {/* Key Engineering Highlights */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Key Engineering Features
            </h4>
            <ul className="space-y-2">
              {project.keyHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics & Outcomes */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Measurable Outcomes & Guarantees
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300">
                  <span className="text-neutral-500 font-mono text-[11px] block mb-0.5">0{idx + 1}. Outcome</span>
                  <span className="font-medium text-neutral-200">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-neutral-800 text-neutral-200 rounded-md border border-neutral-700/60 font-mono text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Close
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 text-neutral-950 hover:bg-white rounded-lg transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3 h-3 text-neutral-600" />
          </a>
        </div>
      </div>
    </div>
  );
};
