import React from 'react';
import { GitPullRequest, PlusCircle, HelpCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Navbar({ onOpenGenerator, onOpenHowTo, contributorCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
            <GitPullRequest className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">OpenContri</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Beginner Friendly
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">First-timer Open Source Contributor Wall</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenHowTo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="How to contribute guide"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">How It Works</span>
          </button>

          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Card</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="View on GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
