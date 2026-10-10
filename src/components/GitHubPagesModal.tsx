import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Globe, Rocket } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Configure Vite Base URL in vite.config.ts',
      explanation: 'Ensure Vite uses relative asset paths so GitHub Pages can locate assets at https://<username>.github.io/<repo-name>/ or root.',
      code: `// vite.config.ts
export default defineConfig({
  base: './', // relative base path for GitHub Pages
  plugins: [react(), tailwindcss()],
});`,
    },
    {
      title: '2. Install gh-pages & Add Deployment Script',
      explanation: 'Add the lightweight gh-pages package to package.json to deploy the built dist folder directly to the gh-pages branch.',
      code: `npm install -D gh-pages

// Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"`,
    },
    {
      title: '3. Deploy with a Single Command',
      explanation: 'Run the deploy script. Git will commit the compiled production assets to your repository\'s gh-pages branch.',
      code: `npm run deploy`,
    },
    {
      title: 'Alternative: GitHub Actions Automated Workflow',
      explanation: 'Or create .github/workflows/deploy.yml for zero-friction continuous deployment whenever you push to main.',
      code: `name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-950/60 border border-sky-800/80 rounded-lg text-sky-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-100">Hosting on GitHub Pages</h3>
              <p className="text-xs text-neutral-400">Quick 3-step setup guide for free deployment on GitHub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 mt-6">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-200">{step.title}</span>
                <button
                  onClick={() => copyToClipboard(step.code, idx)}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-sky-300 font-mono transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-400">{step.explanation}</p>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 font-mono text-xs text-neutral-300 overflow-x-auto">
                <pre>{step.code}</pre>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-3">
            <Rocket className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-200">Repository Settings:</span> In your GitHub repository at{' '}
              <code className="text-sky-300">Settings &gt; Pages</code>, set the Source to &quot;Deploy from a branch&quot; (branch: <code className="text-neutral-300">gh-pages</code> / root) or select &quot;GitHub Actions&quot;. Your portfolio will be live at{' '}
              <code className="text-sky-300">https://RanaRafay-prog.github.io/portfolio/</code>.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-neutral-800 text-neutral-200 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
