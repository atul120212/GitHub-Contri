import React from 'react';
import { Heart, GitPullRequest } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Footer({ onOpenHowTo, onOpenGenerator }) {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            <span>Open Source Contributor Wall</span>
          </div>
          <p className="text-slate-500 max-w-sm">
            Designed to empower first-time contributors around the world to conquer Git, Pull Requests, and automated CI/CD.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
          <button onClick={onOpenHowTo} className="hover:text-emerald-400 transition-colors">
            Contributing Guide
          </button>
          <button onClick={onOpenGenerator} className="hover:text-emerald-400 transition-colors">
            Card Maker
          </button>
          <a 
            href="https://github.com/CoderCorps/GitHub-Contri" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </a>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">MIT License</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for the global OSS community</span>
        </div>

      </div>
    </footer>
  );
}
