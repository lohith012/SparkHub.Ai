import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Zap, Search, Menu, X, Heart, Bookmark, User, LogOut, Sparkles, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {
    profile,
    savedToolIds,
    favoriteToolIds,
    setIsSearchOpen,
    isAuthenticated,
    logout,
    theme,
    toggleTheme
  } = useApp();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#061A14]/90 backdrop-blur-md border-b border-slate-100 dark:border-emerald-900/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-emerald-50">
              SPARK-HUB<span className="text-emerald-600 dark:text-emerald-400">.Ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-emerald-100/70 hover:text-slate-900 dark:hover:text-emerald-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions: Theme Toggle + Search + Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500 dark:text-emerald-200/80 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-emerald-900/40 rounded-full transition-colors cursor-pointer"
              title="Search AI tools (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Popup Selector */}
            <ThemeToggle />

            {/* Profile Avatar / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-emerald-200 dark:hover:ring-emerald-700/60 transition-all cursor-pointer"
                aria-label="User profile"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-emerald-800/80 bg-slate-100 dark:bg-emerald-950 flex items-center justify-center text-slate-700 dark:text-emerald-200 font-semibold shadow-xs">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span>{profile.name.charAt(0)}</span>
                  )}
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0A261D] rounded-2xl shadow-xl border border-slate-100 dark:border-emerald-900/70 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-emerald-900/60">
                      <p className="text-sm font-semibold text-slate-900 dark:text-emerald-100">{profile.name}</p>
                      <p className="text-xs text-slate-500 dark:text-emerald-300/70 truncate">{profile.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-emerald-100/90 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>

                      <Link
                        to="/profile?tab=saved"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-emerald-100/90 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Bookmark className="w-4 h-4" />
                          Saved Tools
                        </div>
                        <span className="text-xs bg-slate-100 dark:bg-emerald-950/80 border border-transparent dark:border-emerald-800/60 text-slate-600 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                          {savedToolIds.length}
                        </span>
                      </Link>

                      <Link
                        to="/profile?tab=interests"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-emerald-100/90 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        My Interests
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          toggleTheme();
                        }}
                        className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-emerald-100/90 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-500" />}
                          <span>Theme</span>
                        </div>
                        <span className="text-xs font-semibold uppercase text-slate-400 dark:text-emerald-400/80">{theme}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-emerald-900/60 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (isAuthenticated) {
                            logout();
                          } else {
                            navigate('/login');
                          }
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {isAuthenticated ? "Logout" : "Sign In / Register"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-emerald-200/80 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0A261D] border-b border-slate-200 dark:border-emerald-900/70 px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-semibold border border-transparent dark:border-emerald-800/60'
                    : 'text-slate-700 dark:text-emerald-100/80 hover:bg-slate-50 dark:hover:bg-emerald-900/30'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-emerald-900/60 space-y-1">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-emerald-100/80 hover:bg-slate-50 dark:hover:bg-emerald-900/30"
            >
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              My Profile & Saved Tools
            </Link>

            <button
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-emerald-100/80 hover:bg-slate-50 dark:hover:bg-emerald-900/30 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-500" />}
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </div>
              <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-emerald-950 text-slate-500 dark:text-emerald-300 border border-transparent dark:border-emerald-800/60">{theme}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
