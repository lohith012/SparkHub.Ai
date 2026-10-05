import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Bookmark,
  Heart,
  Star,
  CheckCircle2,
  Share2,
  Tag,
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';
import { toolsData } from '../data/toolsData';
import ToolLogo from '../components/ToolLogo';
import ToolCard from '../components/ToolCard';
import { useApp } from '../context/AppContext';

export default function ToolDetails() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const {
    savedToolIds,
    toggleSaveTool,
    favoriteToolIds,
    toggleFavoriteTool,
    addRecentlyViewed,
    showToast
  } = useApp();

  const tool = toolsData.find((t) => t.id === toolId);

  useEffect(() => {
    if (tool) {
      addRecentlyViewed(tool.id);
      window.scrollTo(0, 0);
    }
  }, [toolId, tool]);

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Tool not found</h2>
        <p className="text-slate-500">The requested AI tool could not be located.</p>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Tools
        </Link>
      </div>
    );
  }

  const isSaved = savedToolIds.includes(tool.id);
  const isFavorite = favoriteToolIds.includes(tool.id);

  // Related tools from same category or tags
  const relatedTools = toolsData
    .filter((t) => t.id !== tool.id && (t.category === tool.category || t.categories?.includes(tool.category)))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-emerald-200/60 hover:text-slate-900 dark:hover:text-emerald-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Main Header Banner Card */}
      <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-emerald-900/60">
          
          {/* Logo & Main Info */}
          <div className="flex items-start sm:items-center gap-5">
            <ToolLogo name={tool.name} type={tool.logoType} size="lg" className="shadow-md" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                  {tool.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  {tool.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-200 border border-transparent dark:border-emerald-800/60">
                  {tool.pricing}
                </span>
              </div>
              <p className="text-base text-slate-600 dark:text-emerald-100/70">{tool.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => toggleSaveTool(tool.id)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-emerald-950/80 text-slate-700 dark:text-emerald-100 border-slate-200 dark:border-emerald-800/60 hover:bg-slate-50 dark:hover:bg-emerald-900/50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Tool'}</span>
            </button>

            <button
              onClick={() => toggleFavoriteTool(tool.id)}
              className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
                  : 'bg-white dark:bg-emerald-950/80 text-slate-400 dark:text-emerald-400/60 border-slate-200 dark:border-emerald-800/60 hover:text-rose-600 hover:bg-slate-50 dark:hover:bg-emerald-900/50'
              }`}
              title="Favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600 dark:fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-emerald-950/80 text-slate-500 dark:text-emerald-200 hover:text-slate-900 dark:hover:text-emerald-100 hover:bg-slate-50 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Rating & Fast Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100 dark:border-emerald-900/60">
            <span className="text-xs text-slate-400 dark:text-emerald-400/60 font-medium block">Rating</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-base font-bold text-slate-900 dark:text-emerald-50">{tool.rating}</span>
              <span className="text-xs text-slate-400 dark:text-emerald-400/50">({tool.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100 dark:border-emerald-900/60">
            <span className="text-xs text-slate-400 dark:text-emerald-400/60 font-medium block">Pricing Model</span>
            <span className="text-base font-bold text-slate-900 dark:text-emerald-50 mt-0.5 block">{tool.pricing}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100 dark:border-emerald-900/60">
            <span className="text-xs text-slate-400 dark:text-emerald-400/60 font-medium block">Primary Domain</span>
            <span className="text-base font-bold text-slate-900 dark:text-emerald-50 mt-0.5 block">{tool.category}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100 dark:border-emerald-900/60">
            <span className="text-xs text-slate-400 dark:text-emerald-400/60 font-medium block">Verified</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Official Tool
            </span>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Long description & Features */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50">Overview & Capabilities</h2>
            <p className="text-slate-600 dark:text-emerald-100/70 leading-relaxed text-base">
              {tool.longDescription || tool.description}
            </p>
          </div>

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {tool.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100/80 dark:border-emerald-900/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-emerald-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Tags & Keywords
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {tool.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/tools?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-200 hover:border-emerald-200 dark:hover:border-emerald-500/50 border border-transparent dark:border-emerald-800/60 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Pricing details & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Pricing Info Card */}
          <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Pricing Details
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                {tool.pricing} Tier
              </span>
              <p className="text-sm text-slate-700 dark:text-emerald-100/70 leading-relaxed">
                {tool.pricingDetails || "Free tier available for exploration with optional premium plans for advanced features."}
              </p>
            </div>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>View Official Pricing</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Categories list */}
          <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Associated Categories
            </h3>
            <div className="space-y-2">
              {(tool.categories || [tool.category]).map((cat, idx) => (
                <Link
                  key={idx}
                  to={`/categories/${cat.toLowerCase()}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/60 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 border border-transparent dark:border-emerald-900/40 transition-colors text-sm font-medium"
                >
                  <span>{cat}</span>
                  <span className="text-xs text-slate-400 dark:text-emerald-400/60">Browse →</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-emerald-900/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-emerald-50">Similar AI Tools</h2>
              <p className="text-sm text-slate-500 dark:text-emerald-200/60">More popular tools in {tool.category}</p>
            </div>
            <Link
              to={`/categories/${tool.category.toLowerCase()}`}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              See all {tool.category} tools →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
