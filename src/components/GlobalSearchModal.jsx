import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toolsData } from '../data/toolsData';
import ToolLogo from './ToolLogo';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, addRecentlyViewed } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredTools = query.trim() === ''
    ? toolsData.slice(0, 6)
    : toolsData.filter(t => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags?.some(tag => tag.toLowerCase().includes(q))
        );
      });

  const handleSelectTool = (tool) => {
    addRecentlyViewed(tool.id);
    setIsSearchOpen(false);
    navigate(`/tools/${tool.id}`);
  };

  const handleSearchAll = () => {
    setIsSearchOpen(false);
    navigate(`/tools?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#082218] rounded-2xl shadow-2xl border border-slate-200 dark:border-emerald-900/70 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-emerald-900/60 bg-slate-50/50 dark:bg-[#061B13]/90">
          <Search className="w-5 h-5 text-slate-400 dark:text-emerald-400/70 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (filteredTools.length > 0) {
                  handleSelectTool(filteredTools[0]);
                } else {
                  handleSearchAll();
                }
              }
            }}
            placeholder="Search AI tools by name, category, or keyword..."
            className="w-full py-4 text-base bg-transparent border-none outline-hidden text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-emerald-200 rounded-full mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2 py-1 bg-slate-200 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 border border-transparent dark:border-emerald-800/60 rounded-md hover:bg-slate-300 dark:hover:bg-emerald-900 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-emerald-400/60 uppercase tracking-wider">
            {query.trim() === '' ? 'Popular AI Tools' : `Results (${filteredTools.length})`}
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-slate-500 dark:text-emerald-200/80 font-medium">No AI tools found matching "{query}"</p>
              <p className="text-xs text-slate-400 dark:text-emerald-400/50 mt-1">Try searching for image, writing, coding, or video tools.</p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/80 dark:hover:bg-emerald-950/70 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ToolLogo name={tool.name} type={tool.logoType} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/60 truncate max-w-md">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 border border-transparent dark:border-emerald-800/60">
                    {tool.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-emerald-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        {query.trim() !== '' && (
          <div className="p-3 bg-slate-50 dark:bg-[#061B13] border-t border-slate-100 dark:border-emerald-900/60 flex items-center justify-between text-xs text-slate-500 dark:text-emerald-300/70">
            <span>Press Enter to select</span>
            <button
              onClick={handleSearchAll}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              See all results in Tools page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
