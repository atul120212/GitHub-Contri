import React from 'react';
import { Sparkles, Terminal, Code2, Users, Layers, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function Hero({ totalContributors, totalSkills, onOpenGenerator, showFlowchart, setShowFlowchart }) {
  return (
    <div className="relative pt-10 pb-6 text-center max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Announcement tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
        <span>Your gateway into Open Source contributions</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
        Add Your Card. <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Get Published on the Wall.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Never made a Pull Request before? We designed this project specifically for you. 
        Create a single <code className="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">cards/your-username.json</code> file, 
        submit a PR, and see your card go live the second it’s merged!
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={onOpenGenerator}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          ✨ Open Live Card Maker
        </button>

        <button
          onClick={() => setShowFlowchart(!showFlowchart)}
          className="px-5 py-3 rounded-xl font-medium text-sm border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2"
        >
          <span>{showFlowchart ? 'Hide Architecture Flow' : 'Explore PR Flowchart'}</span>
          {showFlowchart ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total Contributors</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalContributors}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Community profiles</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Unique Skills</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalSkills}</div>
          <div className="text-[11px] text-teal-400 mt-0.5">Tech tags indexed</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Merge Conflicts</span>
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">One contributor, one file</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>CI Automation</span>
          </div>
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-[11px] text-indigo-400 mt-0.5">Instant Schema & Bot</div>
        </div>
      </div>
    </div>
  );
}
