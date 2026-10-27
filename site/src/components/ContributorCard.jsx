import React, { useState } from 'react';
import { 
  Globe, 
  BookOpen, 
  GitPullRequest, 
  Calendar, 
  Code, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, YoutubeIcon } from './Icons';

export default function ContributorCard({ card, onSelectSkill }) {
  const [imageError, setImageError] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const fallbackAvatar = `https://github.com/${card.github}.png`;

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(card, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between">
      
      {/* Top Banner decoration */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 group-hover:via-emerald-400 to-transparent transition-all" />

      <div>
        {/* Header: Avatar + Identity + Actions */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={imageError ? fallbackAvatar : (card.avatar || fallbackAvatar)}
                alt={card.name}
                onError={() => setImageError(true)}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-emerald-400 transition-colors shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-slate-950 border border-slate-700 p-1 rounded-full text-slate-300">
                <GithubIcon className="w-3 h-3" />
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors">
                {card.name}
              </h3>
              <a
                href={`https://github.com/${card.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 font-mono inline-flex items-center gap-1 transition-colors"
              >
                @{card.github}
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Toggle JSON preview */}
          <button
            onClick={() => setShowJson(!showJson)}
            className={`p-1.5 rounded-lg text-xs border transition-colors ${
              showJson 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Inspect contributor JSON"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* PR and Date Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {card.firstPR && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 px-2.5 py-0.5 rounded-full">
              <GitPullRequest className="w-3 h-3 text-emerald-400" />
              <span>{card.firstPR}</span>
            </span>
          )}

          {card.joinedDate && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 px-1.5 py-0.5">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{card.joinedDate}</span>
            </span>
          )}
        </div>

        {/* JSON Preview drawer */}
        {showJson ? (
          <div className="mb-4 bg-slate-950/90 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 relative overflow-x-auto max-h-48">
            <button
              onClick={copyJson}
              className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              title="Copy JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre>{JSON.stringify(card, null, 2)}</pre>
          </div>
        ) : (
          /* Bio */
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {card.bio}
          </p>
        )}

        {/* Skills Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {card.skills && card.skills.map(skill => (
            <button
              key={skill}
              onClick={() => onSelectSkill && onSelectSkill(skill)}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-emerald-950/50 hover:text-emerald-300 text-slate-300 border border-slate-700/50 hover:border-emerald-500/40 transition-colors"
            >
              #{skill}
            </button>
          ))}
        </div>
      </div>

      {/* Footer: Social Links & PR link */}
      <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          {card.links?.portfolio && (
            <a
              href={card.links.portfolio}
              target="_blank"
              rel="noreferrer"
              title="Portfolio Website"
              className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
            </a>
          )}
          {card.links?.linkedin && (
            <a
              href={card.links.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
              className="p-1.5 rounded-md hover:bg-slate-800 hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {card.links?.twitter && (
            <a
              href={card.links.twitter}
              target="_blank"
              rel="noreferrer"
              title="Twitter / X"
              className="p-1.5 rounded-md hover:bg-slate-800 hover:text-sky-400 transition-colors"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          )}
          {card.links?.blog && (
            <a
              href={card.links.blog}
              target="_blank"
              rel="noreferrer"
              title="Blog"
              className="p-1.5 rounded-md hover:bg-slate-800 hover:text-amber-400 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
          {card.links?.youtube && (
            <a
              href={card.links.youtube}
              target="_blank"
              rel="noreferrer"
              title="YouTube"
              className="p-1.5 rounded-md hover:bg-slate-800 hover:text-red-400 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Direct Link to GitHub PR if available */}
        <a
          href={`https://github.com/search?q=${card.github}+cards%2F&type=pullrequests`}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-mono text-emerald-400/90 hover:text-emerald-300 flex items-center gap-1 hover:underline"
          title="Search merged PR on GitHub"
        >
          <span>Merged PR</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
