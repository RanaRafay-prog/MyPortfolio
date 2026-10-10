import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUpRight, Github, BookOpen, FileDown } from 'lucide-react';

interface NavbarProps {
  onOpenPagesGuide: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPagesGuide, onOpenResume }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-neutral-100 hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          {PORTFOLIO_DATA.personal.name}
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <a
            href="#experience"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Skills
          </a>
          <a
            href="#education"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Education
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action & resume trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Download or Preview PDF Resume"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-400" />
            <span>Resume (PDF)</span>
          </button>

          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-100 text-neutral-950 rounded-lg hover:bg-white transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
};
