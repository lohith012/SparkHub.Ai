import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('lohith012@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('Atyam Lohith');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, name);
    navigate('/profile');
  };

  const handleGoogleLogin = () => {
    login('lohith012@gmail.com', 'Atyam Lohith');
    navigate('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-8 sm:p-10 shadow-xl space-y-6">
        
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white mx-auto shadow-md shadow-emerald-500/20">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
            {isRegistering ? 'Create SPARK-HUB.Ai Account' : 'Welcome to SPARK-HUB.Ai'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-200/60">
            {isRegistering
              ? 'Join thousands exploring the future of artificial intelligence.'
              : 'Discover, bookmark, and explore the best AI tools.'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-white dark:bg-emerald-950/80 hover:bg-slate-50 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-emerald-100 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-emerald-900/60 w-full" />
          <span className="bg-white dark:bg-[#09231A] px-3 text-xs text-slate-400 dark:text-emerald-400/60 font-medium absolute">or continue with email</span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Atyam Lohith"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider">
                Password
              </label>
              {!isRegistering && (
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your email!")}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer mt-2"
          >
            {isRegistering ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Login & Register */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs font-semibold text-slate-600 dark:text-emerald-400/70 hover:text-emerald-600 dark:hover:text-emerald-300 cursor-pointer"
          >
            {isRegistering ? (
              <span>Already have an account? <strong className="text-emerald-600 dark:text-emerald-400">Sign In</strong></span>
            ) : (
              <span>Don't have an account? <strong className="text-emerald-600 dark:text-emerald-400">Create Account</strong></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
