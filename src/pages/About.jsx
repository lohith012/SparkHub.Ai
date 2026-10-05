import React from 'react';
import {
  ShieldCheck,
  Compass,
  Star,
  Layers,
  RefreshCw,
  GraduationCap,
  Briefcase,
  Rocket,
  Building2,
  CheckCircle2
} from 'lucide-react';
import HeroVisual from '../components/HeroVisual';

export default function About() {
  const whatWeOffer = [
    {
      title: "Curated Collection",
      description: "Handpicked AI tools across different domains.",
      icon: Compass,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Easy Comparison",
      description: "Compare tools and choose the best.",
      icon: Star,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Categorized Browse",
      description: "Find tools by category.",
      icon: Layers,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Regular Updates",
      description: "Keep adding new tools regularly.",
      icon: RefreshCw,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  const whoCanUse = [
    {
      title: "Students",
      description: "For learning and academic purposes.",
      icon: GraduationCap,
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      title: "Professionals",
      description: "For productivity and work efficiency.",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Creators",
      description: "For design, content and creativity.",
      icon: Rocket,
      color: "bg-rose-100 text-rose-600"
    },
    {
      title: "Businesses",
      description: "For innovation and growth.",
      icon: Building2,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight leading-tight">
              About <span className="text-emerald-600 dark:text-emerald-400">SPARK-HUB.Ai</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-emerald-100/70 max-w-xl leading-relaxed">
              Your one-stop platform to discover, explore and use the best AI tools for every need.
            </p>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>

        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-3xl border border-emerald-100 dark:border-emerald-900/60 p-8 sm:p-12 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-emerald-100/80 leading-relaxed font-normal">
                To make powerful AI tools easily accessible to everyone — students, professionals, creators and businesses — and help them achieve more with less effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
            What We Offer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeOffer.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start text-left group hover:border-emerald-300 dark:hover:border-emerald-500/40"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
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

      {/* WHO CAN USE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
            Who Can Use?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoCanUse.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#09231A]/90 rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start text-left group hover:border-emerald-300 dark:hover:border-emerald-500/40"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
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
