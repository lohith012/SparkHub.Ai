import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 dark:border-emerald-700/80 bg-white dark:bg-[#0A261D] text-slate-800 dark:text-emerald-100',
    error: 'border-rose-200 dark:border-rose-800/80 bg-white dark:bg-[#0A261D] text-slate-800 dark:text-emerald-100',
    info: 'border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-[#0A261D] text-slate-800 dark:text-emerald-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${borders[toast.type || 'success']}`}>
        {icons[toast.type || 'success']}
        <p className="text-sm font-medium text-slate-800 dark:text-emerald-100">{toast.message}</p>
      </div>
    </div>
  );
}
