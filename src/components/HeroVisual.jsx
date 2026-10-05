import React from 'react';
import { Sparkles, Bot, Code, Wand2, Zap, Star } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center p-2 sm:p-4">
      {/* Background Soft Glow Orbs */}
      <div className="absolute -top-8 -right-8 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-64 sm:w-80 h-64 sm:h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Image Frame Container */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-emerald-900/60 bg-slate-900 group">
        
        {/* Boy using laptop AI image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src="/hero-boy-laptop.jpg"
            alt="Student discovering and building with AI tools on laptop"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient overlay to enhance text & badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent pointer-events-none" />
        </div>

        {/* Floating Top Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin duration-3000" />
          <span>Next-Gen AI Workspace</span>
        </div>

        {/* Floating Top Right Star Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-white">4.9 / 5.0</span>
        </div>

        {/* Floating Interactive Micro Glass Cards at the Bottom */}
        <div className="absolute bottom-4 inset-x-4 grid grid-cols-2 gap-2.5">
          
          {/* Box 1: AI Prompting & Coding */}
          <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xl hover:bg-slate-900/95 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Conversational AI</p>
              <p className="text-[10px] text-emerald-300 font-medium">Smart Reasoning</p>
            </div>
          </div>

          {/* Box 2: Visual & Design AI */}
          <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xl hover:bg-slate-900/95 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-400/30">
              <Wand2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Image & Video</p>
              <p className="text-[10px] text-teal-300 font-medium">Creative Studio</p>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Active Pulse Badge on Outside Corner */}
      <div className="absolute -bottom-3 -right-2 sm:right-2 bg-white dark:bg-[#09231A] text-slate-900 dark:text-emerald-100 px-3.5 py-1.5 rounded-xl shadow-xl border border-slate-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs font-bold animate-bounce duration-1000 z-10">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>700+ Verified AI Tools</span>
      </div>

    </div>
  );
}
