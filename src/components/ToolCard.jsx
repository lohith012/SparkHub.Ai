import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Heart, ExternalLink, Star } from 'lucide-react';
import ToolLogo from './ToolLogo';
import { useApp } from '../context/AppContext';

export default function ToolCard({ tool, showBookmark = true }) {
  const { savedToolIds, toggleSaveTool, favoriteToolIds, toggleFavoriteTool, addRecentlyViewed } = useApp();
  
  const isSaved = savedToolIds.includes(tool.id);
  const isFavorite = favoriteToolIds.includes(tool.id);

  // Category badge colors matching the reference design in both light and dark mode
  const getBadgeStyle = (category) => {
    switch ((category || '').toLowerCase()) {
      case 'productivity':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
      case 'image':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50';
      case 'design':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50';
      case 'development':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50';
      case 'writing':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50';
      case 'video':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/50';
      case 'education':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/50';
      case 'research':
        return 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/50';
      case 'marketing':
        return 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/50';
      case 'audio':
        return 'bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-100 dark:border-fuchsia-900/50';
      case 'business':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-900/50';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const handleCardClick = () => {
    addRecentlyViewed(tool.id);
  };

  return (
    <div className="group relative bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-5 shadow-xs hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-500/50 dark:hover:shadow-[0_10px_28px_rgba(16,185,129,0.15)] transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar with Logo, Name & Quick Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link
            to={`/tools/${tool.id}`}
            onClick={handleCardClick}
            className="flex items-center gap-3.5 flex-1 min-w-0"
          >
            <ToolLogo name={tool.name} type={tool.logoType} size="md" />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 dark:text-emerald-50 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-emerald-200/60 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-700 dark:text-emerald-200">{tool.rating || '4.8'}</span>
                <span>•</span>
                <span className="capitalize text-slate-500 dark:text-emerald-300/70">{tool.pricing || 'Freemium'}</span>
              </div>
            </div>
          </Link>

          {/* Quick Bookmark/Favorite actions */}
          {showBookmark && (
            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoriteTool(tool.id);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isFavorite ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-400 dark:text-emerald-400/60 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-emerald-950'
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                aria-label="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveTool(tool.id);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isSaved ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70' : 'text-slate-400 dark:text-emerald-400/60 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-emerald-950'
                }`}
                title={isSaved ? "Saved" : "Save tool"}
                aria-label="Save tool"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <Link to={`/tools/${tool.id}`} onClick={handleCardClick} className="block">
          <p className="text-sm text-slate-500 dark:text-emerald-100/70 line-clamp-2 leading-relaxed mb-4">
            {tool.description}
          </p>
        </Link>
      </div>

      {/* Bottom Footer of Card: Category Badge + Open Link */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 dark:border-emerald-900/40 mt-auto">
        <Link
          to={`/categories/${(tool.category || '').toLowerCase()}`}
          className={`text-xs px-2.5 py-1 rounded-md font-medium border ${getBadgeStyle(tool.category)} transition-colors hover:opacity-80`}
        >
          {tool.category}
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/tools/${tool.id}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>Open</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
