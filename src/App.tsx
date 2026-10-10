/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { InteractiveSimulators } from './components/InteractiveSimulators';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [pagesGuideOpen, setPagesGuideOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-200">
      {/* Precision Interactive Cursor */}
      <CustomCursor />

      {/* Top Bar */}
      <Navbar
        onOpenPagesGuide={() => setPagesGuideOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenResume={() => setResumeModalOpen(true)} />
        <Experience />
        <InteractiveSimulators />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenPagesGuide={() => setPagesGuideOpen(true)} />

      {/* Resume PDF Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* GitHub Pages Hosting Guide Modal */}
      <GitHubPagesModal
        isOpen={pagesGuideOpen}
        onClose={() => setPagesGuideOpen(false)}
      />
    </div>
  );
}
