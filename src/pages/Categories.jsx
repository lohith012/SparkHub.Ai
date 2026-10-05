import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesData } from '../data/categoriesData';
import { toolsData } from '../data/toolsData';
import CategoryCard from '../components/CategoryCard';
import ToolCard from '../components/ToolCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function Categories() {
  const { categoryName } = useParams();

  // If a specific category is requested in the URL (e.g. /categories/productivity)
  if (categoryName) {
    const matchedCategory = categoriesData.find(
      c => c.id.toLowerCase() === categoryName.toLowerCase() || c.name.toLowerCase() === categoryName.toLowerCase()
    ) || {
      id: categoryName,
      name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      description: `Explore all top-rated AI tools in ${categoryName}.`,
      gradient: "from-blue-50 to-indigo-50/40",
      border: "border-blue-100",
      iconBg: "bg-blue-100 text-blue-600"
    };

    const categoryTools = toolsData.filter(
      t => t.category.toLowerCase() === matchedCategory.name.toLowerCase() ||
           t.categories?.some(c => c.toLowerCase() === matchedCategory.name.toLowerCase())
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-emerald-200/60 hover:text-slate-900 dark:hover:text-emerald-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-r ${matchedCategory.gradient} dark:from-[#0B2920] dark:to-[#061F17] border ${matchedCategory.border} dark:border-emerald-900/60 shadow-xs`}>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 block">
              AI Domain
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight mb-2">
              {matchedCategory.name} AI Tools
            </h1>
            <p className="text-slate-600 dark:text-emerald-100/70 text-base">
              {matchedCategory.description}
            </p>
          </div>
        </div>

        {/* Tools Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700 dark:text-emerald-200">
            Showing <span className="text-emerald-600 dark:text-emerald-400">{categoryTools.length}</span> tools in {matchedCategory.name}
          </p>
          <Link
            to="/tools"
            className="text-xs font-semibold text-slate-500 dark:text-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-300"
          >
            View all directory tools →
          </Link>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200 dark:border-emerald-900/60 p-12 text-center space-y-3">
            <p className="text-slate-600 dark:text-emerald-100/70 font-medium">No tools found for this category yet.</p>
            <Link to="/tools" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Browse all available tools
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Full Categories Grid view matching Screen 4 of reference image
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
          Browse Categories
        </h1>
        <p className="text-slate-500 dark:text-emerald-200/60 text-sm sm:text-base mt-1">
          Explore AI tools by category and find the right tools for your needs.
        </p>
      </div>

      {/* 4-Column Responsive Grid matching Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesData.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

    </div>
  );
}
