import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Globe } from 'lucide-react';

interface FooterProps {
  onOpenPagesGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPagesGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-neutral-200 font-semibold text-sm">
            {PORTFOLIO_DATA.personal.name}
          </div>
          <div className="text-neutral-500 text-xs mt-0.5">
            Software Engineering Student &amp; Aspiring AI Engineer
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={onOpenPagesGuide}
            className="hover:text-neutral-200 transition-colors flex items-center gap-1.5 text-neutral-400"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>GitHub Pages Guide</span>
          </button>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
