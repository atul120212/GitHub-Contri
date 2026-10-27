import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedSkill,
  setSelectedSkill,
  sortBy,
  setSortBy,
  allSkills,
  totalResults,
  totalCount
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, @username, skill or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-300 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="text-xs">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900">Newest Joined</option>
              <option value="oldest" className="bg-slate-900">Oldest Joined</option>
              <option value="az" className="bg-slate-900">Name (A-Z)</option>
              <option value="skills" className="bg-slate-900">Most Skills</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills Pill Filter Strip */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 mr-1">
          <Filter className="w-3 h-3 text-emerald-400" />
          <span>Skills:</span>
        </div>

        <button
          onClick={() => setSelectedSkill(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
            selectedSkill === null
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          All ({totalCount})
        </button>

        {allSkills.map(skill => {
          const isSelected = selectedSkill === skill.name;
          return (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/40'
              }`}
            >
              <span>{skill.name}</span>
              <span className={`text-[10px] px-1 rounded-full ${
                isSelected ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-700 text-slate-400'
              }`}>
                {skill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Counter bar */}
      <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
        <span>
          Showing <strong className="text-white">{totalResults}</strong> of {totalCount} contributors
          {selectedSkill && <span> filtered by <span className="text-emerald-400 font-semibold">"{selectedSkill}"</span></span>}
          {searchQuery && <span> matching <span className="text-emerald-400 font-semibold">"{searchQuery}"</span></span>}
        </span>
        {(searchQuery || selectedSkill) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkill(null);
            }}
            className="text-xs text-emerald-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
