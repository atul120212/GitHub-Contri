import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlowchartVisual from './components/FlowchartVisual';
import FilterBar from './components/FilterBar';
import ContributorCard from './components/ContributorCard';
import CardGeneratorModal from './components/CardGeneratorModal';
import HowToContributeModal from './components/HowToContributeModal';
import Footer from './components/Footer';
import { initialCards } from './data/cards';
import { Sparkles, Users } from 'lucide-react';

export default function App() {
  const [cards, setCards] = useState(initialCards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);

  // Compute skill frequency
  const allSkills = useMemo(() => {
    const counts = {};
    cards.forEach(card => {
      (card.skills || []).forEach(skill => {
        counts[skill] = (counts[skill] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [cards]);

  // Filter and sort cards
  const filteredCards = useMemo(() => {
    return cards
      .filter(card => {
        // Skill filter
        if (selectedSkill && !(card.skills || []).includes(selectedSkill)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (card.name || '').toLowerCase().includes(q);
          const matchBio = (card.bio || '').toLowerCase().includes(q);
          const matchGithub = (card.github || '').toLowerCase().includes(q);
          const matchSkill = (card.skills || []).some(s => s.toLowerCase().includes(q));
          if (!matchName && !matchBio && !matchGithub && !matchSkill) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.joinedDate || '2026-01-01') - new Date(a.joinedDate || '2026-01-01');
        }
        if (sortBy === 'oldest') {
          return new Date(a.joinedDate || '2026-01-01') - new Date(b.joinedDate || '2026-01-01');
        }
        if (sortBy === 'az') {
          return (a.name || '').localeCompare(b.name || '');
        }
        if (sortBy === 'skills') {
          return (b.skills || []).length - (a.skills || []).length;
        }
        return 0;
      });
  }, [cards, searchQuery, selectedSkill, sortBy]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar
          onOpenGenerator={() => setIsGeneratorOpen(true)}
          onOpenHowTo={() => setIsHowToOpen(true)}
          contributorCount={cards.length}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Hero
            totalContributors={cards.length}
            totalSkills={allSkills.length}
            onOpenGenerator={() => setIsGeneratorOpen(true)}
            showFlowchart={showFlowchart}
            setShowFlowchart={setShowFlowchart}
          />

          {/* Interactive Flowchart Diagram */}
          {showFlowchart && (
            <div className="animate-in fade-in duration-300">
              <FlowchartVisual />
            </div>
          )}

          {/* Hall of Fame & Latest Joiners Strip */}
          <div className="my-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-teal-950/40 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Community Hall of Fame</h3>
                <p className="text-xs text-slate-400">Every contributor gets their milestone PR permanently credited.</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 transition-all"
            >
              + Submit Your Card
            </button>
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allSkills={allSkills}
            totalResults={filteredCards.length}
            totalCount={cards.length}
          />

          {/* Contributor Card Grid */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCards.map(card => (
                <ContributorCard
                  key={card.github}
                  card={card}
                  onSelectSkill={(skill) => setSelectedSkill(skill)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No contributors match your filters</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Try searching for another skill or clearing your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSkill(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer
        onOpenHowTo={() => setIsHowToOpen(true)}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {/* Modals */}
      <CardGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
      />

      <HowToContributeModal
        isOpen={isHowToOpen}
        onClose={() => setIsHowToOpen(false)}
        onOpenMaker={() => setIsGeneratorOpen(true)}
      />
    </div>
  );
}
