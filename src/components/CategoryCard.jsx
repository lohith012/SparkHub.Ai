import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  PenTool,
  Image as ImageIcon,
  Video,
  Code2,
  Palette,
  GraduationCap,
  Search,
  Megaphone,
  Volume2,
  Briefcase,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Zap,
  PenTool,
  Image: ImageIcon,
  Video,
  Code2,
  Palette,
  GraduationCap,
  Search,
  Megaphone,
  Volume2,
  Briefcase,
  Sparkles
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || Sparkles;

  return (
    <Link
      to={`/categories/${category.id}`}
      className={`group relative rounded-2xl p-6 bg-gradient-to-b ${category.gradient} dark:from-[#0B2920]/90 dark:to-[#071F17]/90 border ${category.border} dark:border-emerald-900/60 hover:shadow-lg dark:hover:border-emerald-500/50 dark:hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)] transition-all duration-200 flex flex-col justify-between`}
    >
      <div>
        {/* Category Icon */}
        <div className={`w-12 h-12 rounded-xl ${category.iconBg} dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800/60 flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50 mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      {/* Action link */}
      <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 pt-2 border-t border-transparent dark:border-emerald-900/40">
        <span className="flex items-center gap-1.5">
          View Tools
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <span className="text-slate-400 dark:text-emerald-300/60 font-normal">
          {category.count ? `${category.count}+ tools` : ''}
        </span>
      </div>
    </Link>
  );
}
