import React, { useState } from 'react';
import { 
  X, 
  GitPullRequest, 
  GitFork, 
  FileCode, 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Copy, 
  Check,
  ShieldAlert
} from 'lucide-react';

export default function HowToContributeModal({ isOpen, onClose, onOpenMaker }) {
  const [method, setMethod] = useState('web'); // 'web' or 'cli'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleJson = `{
  "name": "Jane Doe",
  "github": "janedoe",
  "avatar": "https://github.com/janedoe.png",
  "bio": "Frontend enthusiast, learning TypeScript & open source!",
  "skills": ["HTML", "CSS", "JavaScript", "React"],
  "links": {
    "linkedin": "https://linkedin.com/in/janedoe",
    "portfolio": "https://janedoe.dev"
  },
  "firstPR": "My first open-source PR!"
}`;

  const copySample = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">How To Contribute Your Card</h2>
              <p className="text-xs text-slate-400">A step-by-step guide for first-time open source contributors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* The Golden Rule banner */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-300 block text-sm mb-0.5">The Golden Rule: One Contributor, One File</strong>
              Never edit anyone else’s card or the website code in a card PR. By only adding <code className="text-emerald-300 font-mono">cards/&lt;your-username&gt;.json</code>, you completely avoid merge conflicts!
            </div>
          </div>

          {/* Method selector */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setMethod('web')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                method === 'web' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Method 1: In the Browser (Easiest - 2 Mins)</span>
            </button>
            <button
              onClick={() => setMethod('cli')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                method === 'cli' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Method 2: Command Line (Git Terminal)</span>
            </button>
          </div>

          {/* Step list for Web UI */}
          {method === 'web' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Fork the Repository</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Click the <strong>Fork</strong> button at the top right of this repository to create your personal copy.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div className="w-full">
                  <h4 className="text-sm font-semibold text-white">Create your card in the /cards/ folder</h4>
                  <p className="text-xs text-slate-400 mt-0.5 mb-2">
                    In your fork, navigate to the <code className="text-emerald-300">cards/</code> folder, click <strong>Add file &gt; Create new file</strong>, and name it <code className="text-emerald-300">cards/your-github-username.json</code>.
                  </p>
                  
                  <div className="relative bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-[11px] font-mono text-slate-300">
                    <button
                      onClick={copySample}
                      className="absolute top-2 right-2 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Copy sample JSON"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <pre>{sampleJson}</pre>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Commit & Open Pull Request</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select <strong>Create a new branch for this commit and start a pull request</strong>. Click <strong>Propose changes</strong>, then <strong>Create pull request</strong>!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* CLI steps */
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block mb-1"># 1. Clone your fork</span>
                <p className="text-emerald-400">git clone https://github.com/&lt;your-username&gt;/GitHub-Contri.git</p>
                <p className="text-emerald-400">cd GitHub-Contri</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block mb-1"># 2. Create feature branch</span>
                <p className="text-emerald-400">git checkout -b add-card-&lt;your-username&gt;</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block mb-1"># 3. Create your card file</span>
                <p className="text-emerald-400">cp cards/janedoe.json cards/&lt;your-username&gt;.json</p>
                <span className="text-slate-500 block mt-1"># (Edit the file with your details)</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block mb-1"># 4. Run local validation</span>
                <p className="text-emerald-400">npm run validate</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-slate-500 block mb-1"># 5. Commit & Push</span>
                <p className="text-emerald-400">git add cards/&lt;your-username&gt;.json</p>
                <p className="text-emerald-400">git commit -m "feat(cards): add &lt;your-username&gt; card"</p>
                <p className="text-emerald-400">git push origin add-card-&lt;your-username&gt;</p>
              </div>
            </div>
          )}

          {/* Bottom CTA to open card maker */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold text-white">Need help generating your card JSON?</h5>
              <p className="text-[11px] text-slate-400">Use our interactive form to craft your JSON and preview your card live.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenMaker) onOpenMaker();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              Open Card Maker
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
