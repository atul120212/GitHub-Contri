import React from 'react';
import { UserCheck, GitFork, ShieldCheck, CheckCircle2, Rocket, Globe, Bot, ArrowDown, ArrowRight } from 'lucide-react';

export default function FlowchartVisual() {
  const steps = [
    {
      num: '1',
      title: 'Newbie Contributor',
      subtitle: 'Adds one card file in /cards/<username>.json',
      icon: UserCheck,
      color: 'border-slate-700 bg-slate-900/90 text-slate-200',
      badge: 'Zero Conflicts',
    },
    {
      num: '2',
      title: 'Pull Request',
      subtitle: 'Fork repo, create branch, fill PR template',
      icon: GitFork,
      color: 'border-teal-500/40 bg-teal-950/40 text-teal-300',
      badge: '1 File Changed',
    },
    {
      num: '3',
      title: 'GitHub Actions CI',
      subtitle: 'Validates JSON schema, links & PR bounds',
      icon: ShieldCheck,
      color: 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300',
      badge: 'Automated',
      sideNote: {
        title: 'Welcome Bot',
        desc: 'Comments friendly tips & labels PR good-first-pr',
        icon: Bot,
        color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300'
      }
    },
    {
      num: '4',
      title: 'Maintainer Review',
      subtitle: 'One-click review, approve & merge into main',
      icon: CheckCircle2,
      color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
      badge: 'Safe Guardrails',
    },
    {
      num: '5',
      title: 'Build and Deploy',
      subtitle: 'Static build via GitHub Pages or Vercel',
      icon: Rocket,
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
      badge: 'Instant CD',
    },
    {
      num: '6',
      title: 'Live Website',
      subtitle: 'Card published on wall with merged PR badge',
      icon: Globe,
      color: 'border-emerald-500 bg-emerald-950/80 text-emerald-200 shadow-lg shadow-emerald-500/10',
      badge: 'Hall of Fame 🎉',
    },
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          The Architecture & Lifecycle
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
          How Your Contribution Becomes Live
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          A contributor's card is just a JSON file. Merging the PR publishes the card on the site.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-lg mx-auto space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.num}>
              {/* Main Node Box */}
              <div className="w-full relative">
                <div className={`border rounded-xl p-4 transition-all duration-300 hover:border-emerald-500/60 shadow-sm ${step.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                        <Icon className="w-5 h-5 text-current" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white text-sm sm:text-base">{step.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300 hidden sm:inline-block">
                      {step.badge}
                    </span>
                  </div>
                </div>

                {/* Side bot node for step 3 */}
                {step.sideNote && (
                  <div className="hidden md:flex items-center absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64">
                    <div className="h-0.5 w-8 bg-indigo-500/40 relative">
                      <ArrowRight className="w-4 h-4 text-indigo-400 absolute -right-2 -top-1.5" />
                    </div>
                    <div className={`border rounded-xl p-3 ml-2 ${step.sideNote.color} w-full text-left shadow-sm`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-indigo-300" />
                        <span className="text-xs font-bold text-white">{step.sideNote.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">{step.sideNote.desc}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Arrow */}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center my-0.5 text-slate-600">
                  <div className="h-4 w-0.5 bg-slate-700"></div>
                  <ArrowDown className="w-3.5 h-3.5 text-slate-500 -mt-1" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
