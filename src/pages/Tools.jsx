import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Zap,
  PenTool,
  Image as ImageIcon,
  Video,
  Code2,
  Palette,
  GraduationCap,
  Megaphone,
  Volume2,
  Briefcase,
  MoreHorizontal,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/ToolCard';

const sidebarCategories = [
  { name: 'All Tools', id: 'all', icon: Sparkles },
  { name: 'Productivity', id: 'productivity', icon: Zap },
  { name: 'Writing', id: 'writing', icon: PenTool },
  { name: 'Image', id: 'image', icon: ImageIcon },
  { name: 'Video', id: 'video', icon: Video },
  { name: 'Development', id: 'development', icon: Code2 },
  { name: 'Design', id: 'design', icon: Palette },
  { name: 'Education', id: 'education', icon: GraduationCap },
  { name: 'Research', id: 'research', icon: Search },
  { name: 'Marketing', id: 'marketing', icon: Megaphone },
  { name: 'Audio', id: 'audio', icon: Volume2 },
  { name: 'Business', id: 'business', icon: Briefcase },
  { name: 'More', id: 'more', icon: MoreHorizontal },
];

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlQuery = searchParams.get('q');

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All Tools');
  const [searchQuery, setSearchQuery] = useState(urlQuery || '');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    if (urlCategory) {
      // Find matching category name
      const matched = sidebarCategories.find(c => c.name.toLowerCase() === urlCategory.toLowerCase());
      if (matched) {
        setSelectedCategory(matched.name);
      } else {
        setSelectedCategory(urlCategory);
      }
    }
    if (urlQuery !== null) {
      setSearchQuery(urlQuery);
    }
  }, [urlCategory, urlQuery]);

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All Tools' ||
        selectedCategory === 'all' ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase() ||
        tool.categories?.some(c => c.toLowerCase() === selectedCategory.toLowerCase());

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(q));

      // Pricing filter
      const pricingMatch =
        selectedPricing === 'All' ||
        tool.pricing.toLowerCase() === selectedPricing.toLowerCase();

      return categoryMatch && searchMatch && pricingMatch;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        const featA = a.featured ? 2 : (a.popular ? 1 : 0);
        const featB = b.featured ? 2 : (b.popular ? 1 : 0);
        if (featB !== featA) return featB - featA;
        const ratingDiff = parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
        if (Math.abs(ratingDiff) > 0.001) return ratingDiff;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      if (sortBy === 'rating') {
        const ratingDiff = parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
        if (Math.abs(ratingDiff) > 0.001) return ratingDiff;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, selectedPricing, sortBy]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'All Tools') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryName);
    }
    setSearchParams(searchParams);
    setMobileFilterOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All Tools');
    setSearchQuery('');
    setSelectedPricing('All');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
          All AI Tools
        </h1>
        <p className="text-slate-500 dark:text-emerald-200/60 text-sm sm:text-base mt-1">
          Explore a wide range of AI tools for different categories.
        </p>
      </div>

      {/* Main Grid Layout: Left Sidebar + Right Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white dark:bg-[#09231A] p-4 rounded-xl border border-slate-200 dark:border-emerald-900/60">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-emerald-100"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Categories ({selectedCategory})</span>
          </button>
          <span className="text-xs text-slate-500 dark:text-emerald-200/60 font-medium">
            {filteredTools.length} tools found
          </span>
        </div>

        {/* LEFT SIDEBAR (Categories) */}
        <aside
          className={`lg:col-span-3 bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-4 shadow-xs ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-emerald-900/60 mb-2">
            <span className="text-xs font-bold text-slate-400 dark:text-emerald-400/60 uppercase tracking-wider">
              Categories
            </span>
            {(selectedCategory !== 'All Tools' || searchQuery || selectedPricing !== 'All') && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <nav className="space-y-1">
            {sidebarCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-transparent dark:border-emerald-800/60'
                      : 'text-slate-600 dark:text-emerald-100/70 hover:bg-slate-50 dark:hover:bg-emerald-900/30 hover:text-slate-900 dark:hover:text-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-emerald-400/60'}`} />
                    <span>{cat.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Controls Bar: Search + Filter Dropdown + Sort */}
          <div className="bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-emerald-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for tools..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-emerald-950/80 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchParams.delete('q');
                    setSearchParams(searchParams);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-emerald-200 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              
              {/* Pricing Filter Dropdown */}
              <div className="relative flex items-center bg-slate-50 dark:bg-emerald-950/80 rounded-xl border border-slate-200 dark:border-emerald-800/60 px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-emerald-400/60 mr-2" />
                <select
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-emerald-100 outline-hidden cursor-pointer"
                  aria-label="Filter by pricing"
                >
                  <option value="All" className="dark:bg-[#09231A]">Filter: All</option>
                  <option value="Free" className="dark:bg-[#09231A]">Free</option>
                  <option value="Freemium" className="dark:bg-[#09231A]">Freemium</option>
                  <option value="Paid" className="dark:bg-[#09231A]">Paid</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center bg-slate-50 dark:bg-emerald-950/80 rounded-xl border border-slate-200 dark:border-emerald-800/60 px-3 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 dark:text-emerald-400/60 mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-emerald-100 outline-hidden cursor-pointer"
                  aria-label="Sort tools"
                >
                  <option value="popular" className="dark:bg-[#09231A]">Popular</option>
                  <option value="rating" className="dark:bg-[#09231A]">Top Rated</option>
                  <option value="az" className="dark:bg-[#09231A]">A — Z</option>
                  <option value="newest" className="dark:bg-[#09231A]">Newest</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results Info & Active Filters Pills */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-emerald-300/70 px-1">
            <div className="flex items-center gap-2">
              <span>Showing <strong className="text-slate-800 dark:text-emerald-100">{filteredTools.length}</strong> AI tools</span>
              {selectedCategory !== 'All Tools' && (
                <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                  {selectedCategory}
                  <button onClick={() => handleCategorySelect('All Tools')} className="hover:text-emerald-800 dark:hover:text-emerald-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Responsive 3-Column Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200 dark:border-emerald-900/60 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-transparent dark:border-emerald-800/60">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50">No tools found</h3>
              <p className="text-sm text-slate-500 dark:text-emerald-100/70 max-w-md mx-auto">
                We couldn't find any AI tools matching your search criteria. Try modifying your keywords or clearing active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
