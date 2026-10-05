import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Sparkles,
  Zap,
  PenTool,
  Image as ImageIcon,
  Video,
  Code2,
  MoreHorizontal,
  Compass,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/ToolCard';
import HeroVisual from '../components/HeroVisual';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryShortcut, setSelectedCategoryShortcut] = useState('All Tools');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  const categoryShortcuts = [
    { name: 'All Tools', icon: Sparkles, path: '/tools' },
    { name: 'Productivity', icon: Zap, path: '/tools?category=Productivity' },
    { name: 'Writing', icon: PenTool, path: '/tools?category=Writing' },
    { name: 'Image', icon: ImageIcon, path: '/tools?category=Image' },
    { name: 'Video', icon: Video, path: '/tools?category=Video' },
    { name: 'Development', icon: Code2, path: '/tools?category=Development' },
    { name: 'More', icon: MoreHorizontal, path: '/categories' },
  ];

  // 4 popular tools matching reference image exactly
  const popularToolIds = ['chatgpt', 'midjourney', 'canva', 'github-copilot'];
  const popularTools = popularToolIds
    .map(id => toolsData.find(t => t.id === id))
    .filter(Boolean);

  const whyFeatures = [
    {
      title: "Curated Collection",
      description: "Handpicked AI tools across different domains.",
      icon: Compass,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Easy to Explore",
      description: "Simple categories and powerful search.",
      icon: Star,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Save Time",
      description: "Find the right tool without hassle.",
      icon: Clock,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "For Everyone",
      description: "Useful for students, professionals and creators.",
      icon: Users,
      color: "bg-rose-100 text-rose-600"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-6 overflow-hidden">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                ALL AI TOOLS IN ONE PLACE
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight leading-[1.15]">
                Discover the Best <br />
                <span className="text-emerald-600 dark:text-emerald-400">AI Tools</span> for Every Need
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 max-w-xl leading-relaxed">
                Explore, compare and use the top AI tools for learning, productivity, creativity, development and more — all in one place.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="pt-2">
                <div className="relative flex items-center max-w-xl bg-white dark:bg-[#08241B] rounded-2xl border border-slate-300/80 dark:border-emerald-900/80 shadow-md p-1.5 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 dark:focus-within:ring-emerald-900/40 transition-all">
                  <Search className="w-5 h-5 text-slate-400 dark:text-emerald-400/70 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for AI tools (e.g. ChatGPT, image generator...)"
                    className="w-full px-3 py-2.5 text-sm sm:text-base text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 bg-transparent outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Category Shortcuts Pills */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  {categoryShortcuts.map((cat) => {
                    const IconComponent = cat.icon;
                    const isActive = selectedCategoryShortcut === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedCategoryShortcut(cat.name);
                          navigate(cat.path);
                        }}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/80 shadow-xs font-semibold'
                            : 'bg-white dark:bg-[#072018] text-slate-700 dark:text-emerald-200/80 border-slate-200 dark:border-emerald-900/60 hover:border-emerald-200 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-emerald-950/70'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 text-emerald-500" />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Hero Visual Mockup */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR AI TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
              Popular AI Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-emerald-200/60 mt-1">
              Most used and trending AI tools on our platform.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-3 sm:mt-0 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* WHY SPARK-HUB.AI? SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
            Why SPARK-HUB.Ai?
          </h2>
          <p className="text-sm text-slate-500 dark:text-emerald-200/60 mt-1">
            Your one-stop destination for the best AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start text-left group hover:border-emerald-300 dark:hover:border-emerald-500/40"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} dark:bg-emerald-950 dark:text-emerald-400 dark:border dark:border-emerald-800/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-emerald-50 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
