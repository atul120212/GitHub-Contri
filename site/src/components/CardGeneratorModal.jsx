import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  AlertCircle, 
  GitPullRequest, 
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import ContributorCard from './ContributorCard';

const POPULAR_SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js', 
  'Node.js', 'Python', 'Git', 'TailwindCSS', 'Docker', 'Figma', 'Go', 'Rust'
];

export default function CardGeneratorModal({ isOpen, onClose, onAddCardLocally }) {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState(['Git', 'HTML', 'CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [blog, setBlog] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'json'

  if (!isOpen) return null;

  const cleanGithub = github.trim().replace(/^@/, '');
  const computedAvatar = avatar.trim() || (cleanGithub ? `https://github.com/${cleanGithub}.png` : '');
  
  const cardData = {
    name: name.trim() || 'Your Name',
    github: cleanGithub || 'yourusername',
    avatar: computedAvatar,
    bio: bio.trim() || 'A passionate learner and open-source enthusiast!',
    skills: skills.length > 0 ? skills : ['OpenSource'],
    links: {
      ...(portfolio.trim() ? { portfolio: portfolio.trim() } : {}),
      ...(linkedin.trim() ? { linkedin: linkedin.trim() } : {}),
      ...(twitter.trim() ? { twitter: twitter.trim() } : {}),
      ...(blog.trim() ? { blog: blog.trim() } : {}),
    },
    firstPR: 'Joined via PR submission',
    joinedDate: new Date().toISOString().split('T')[0]
  };

  const jsonString = JSON.stringify(cardData, null, 2);

  const addSkill = (skillToAdd) => {
    const s = skillToAdd.trim();
    if (s && !skills.includes(s) && skills.length < 12) {
      setSkills([...skills, s]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fileName = `${cleanGithub || 'my-card'}.json`;
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Validation feedback
  const errors = [];
  if (!name.trim()) errors.push('Name is required');
  if (!cleanGithub) errors.push('GitHub username is required');
  if (cleanGithub && !/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(cleanGithub)) {
    errors.push('GitHub username contains invalid characters');
  }
  if (!bio.trim() || bio.length < 5) errors.push('Bio must be at least 5 characters');
  if (bio.length > 180) errors.push('Bio exceeds 180 characters limit');
  if (skills.length === 0) errors.push('Select at least 1 skill');

  const isValid = errors.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Interactive Card Maker & Previewer</h2>
              <p className="text-xs text-slate-400">Fill your info, preview the live card, and export your JSON file</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid: Left Form, Right Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[75vh] overflow-y-auto">
          
          {/* Left Form */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
            
            {/* Name & GitHub Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full / Display Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  GitHub Username <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500 text-sm">@</span>
                  <input
                    type="text"
                    placeholder="octocat"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    maxLength={39}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Custom Avatar URL (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Avatar Image URL <span className="text-slate-500 font-normal">(optional, defaults to GitHub profile picture)</span>
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Short Bio */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Short Bio <span className="text-emerald-400">*</span>
                </label>
                <span className={`text-[11px] ${bio.length > 180 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                  {bio.length}/180
                </span>
              </div>
              <textarea
                placeholder="Tell the community about what you love building, learning, or your goals..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Skills selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Skills & Tech Stack ({skills.length}/12) <span className="text-emerald-400">*</span>
              </label>
              
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Type a skill and hit enter..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Selected skills pills */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {skills.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-md"
                  >
                    #{s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="hover:text-rose-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[11px] text-slate-500 mr-1">Suggestions:</span>
                {POPULAR_SKILLS.slice(0, 8).map(ps => (
                  <button
                    key={ps}
                    type="button"
                    onClick={() => addSkill(ps)}
                    disabled={skills.includes(ps)}
                    className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                      skills.includes(ps)
                        ? 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40'
                    }`}
                  >
                    +{ps}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links Accordion */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block">Social / Portfolio Links (Optional)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="url"
                  placeholder="Portfolio: https://..."
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="url"
                  placeholder="LinkedIn: https://linkedin.com/in/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="url"
                  placeholder="Twitter / X: https://x.com/..."
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="url"
                  placeholder="Blog: https://..."
                  value={blog}
                  onChange={(e) => setBlog(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

          </div>

          {/* Right Live Preview & Generated JSON */}
          <div className="p-6 bg-slate-950/60 flex flex-col justify-between">
            <div>
              {/* Tab selector */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('form')}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                      activeTab === 'form' 
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Card Live Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                      activeTab === 'json' 
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Raw JSON File
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  Target: <strong className="text-emerald-400">cards/{cleanGithub || '<username>'}.json</strong>
                </span>
              </div>

              {/* View Content */}
              {activeTab === 'form' ? (
                <div className="my-2">
                  <ContributorCard card={cardData} />
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 max-h-72 overflow-y-auto">
                  <pre>{jsonString}</pre>
                </div>
              )}

              {/* Validation error display */}
              {errors.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Please complete required fields:</span>
                  </div>
                  {errors.map(err => (
                    <div key={err} className="text-[11px] pl-5">• {err}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={handleCopyJson}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!isValid}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isValid 
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download .json</span>
                </button>
              </div>

              {/* Ready to PR note */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-400">
                <GitPullRequest className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-slate-300 font-medium">Ready to submit?</p>
                  <p className="text-[11px] mt-0.5">
                    Save this file to <code className="text-emerald-300 font-mono">cards/{cleanGithub || 'username'}.json</code> and submit a PR to the repo. CI will test it instantly!
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
