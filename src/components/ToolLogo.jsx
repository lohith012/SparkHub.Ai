import React from 'react';

export default function ToolLogo({ name, type, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl"
  };

  const normalized = (type || name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // Brand logos with customized SVG graphics matching the visual reference
  if (normalized.includes("chatgpt") || normalized === "openai") {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#10A37F] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
          <path d="M12 6v12M6 12h12M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("claude") || normalized.includes("anthropic")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#D97706] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("gemini")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("midjourney")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18v3h16v-3M3 13l3.5-3.5L10 13l4.5-5.5L21 14H3z" />
          <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("dalle") || normalized.includes("dall-e")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <span className="font-extrabold tracking-tighter">D•E</span>
      </div>
    );
  }

  if (normalized.includes("stablediffusion") || normalized.includes("stability")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#0284C7] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("canva")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center text-white font-black shadow-sm flex-shrink-0 ${className}`}>
        <span className="italic text-base">C</span>
      </div>
    );
  }

  if (normalized.includes("githubcopilot") || normalized.includes("copilot") && !normalized.includes("microsoft")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#0284C7] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("notion")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-black flex items-center justify-center text-white font-serif font-black shadow-sm flex-shrink-0 ${className}`}>
        <span className="text-lg">N</span>
      </div>
    );
  }

  if (normalized.includes("cursor")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 4l7 17 2.5-6.5L20 12z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("perplexity")) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-[#0D9488] flex items-center justify-center text-white shadow-sm flex-shrink-0 ${className}`}>
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" />
        </svg>
      </div>
    );
  }

  // Fallback stylish monogram badge
  const initial = (name || "AI").slice(0, 2).toUpperCase();
  const colors = [
    "bg-blue-600 text-white",
    "bg-indigo-600 text-white",
    "bg-purple-600 text-white",
    "bg-emerald-600 text-white",
    "bg-rose-600 text-white",
    "bg-amber-600 text-white",
    "bg-teal-600 text-white",
  ];
  const charSum = (name || "AI").split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colorClass = colors[charSum % colors.length];

  return (
    <div className={`${sizeClasses[size]} rounded-xl ${colorClass} flex items-center justify-center font-bold tracking-tight shadow-sm flex-shrink-0 ${className}`}>
      {initial}
    </div>
  );
}
