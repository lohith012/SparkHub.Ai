import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  User,
  Bookmark,
  Clock,
  Settings as SettingsIcon,
  LogOut,
  Edit3,
  Check,
  Camera,
  Heart,
  Sparkles,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Bell,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/ToolCard';

const allCategoriesList = [
  "Productivity",
  "Development",
  "Design",
  "Image",
  "Video",
  "Education",
  "Writing",
  "Research",
  "Marketing",
  "Audio",
  "Business"
];

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();

  const {
    profile,
    updateProfile,
    toggleInterest,
    savedToolIds,
    favoriteToolIds,
    recentlyViewedIds,
    logout,
    showToast,
    theme,
    toggleTheme,
    setTheme
  } = useApp();

  // Form editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [bioInput, setBioInput] = useState(profile.bio);

  useEffect(() => {
    setNameInput(profile.name);
    setEmailInput(profile.email);
    setBioInput(profile.bio);
  }, [profile]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'saved', 'recent', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      email: emailInput,
      bio: bioInput
    });
    setIsEditingProfile(false);
  };

  const handleChangePhoto = () => {
    const sampleAvatars = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
    ];
    const nextAvatar = sampleAvatars[(sampleAvatars.indexOf(profile.avatar) + 1) % sampleAvatars.length];
    updateProfile({ avatar: nextAvatar });
  };

  // Tools queries
  const savedTools = savedToolIds
    .map(id => toolsData.find(t => t.id === id))
    .filter(Boolean);

  const recentlyViewedTools = recentlyViewedIds
    .map(id => toolsData.find(t => t.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-4 bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs flex flex-col items-center text-center">
          
          {/* Avatar Photo */}
          <div className="relative mb-4 group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-md">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <button
              onClick={handleChangePhoto}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors cursor-pointer"
              title="Change Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Name & Email */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50 mb-0.5">{profile.name}</h2>
          <p className="text-xs text-slate-400 dark:text-emerald-400/60 font-medium mb-6">{profile.email}</p>

          {/* Navigation Links */}
          <nav className="w-full space-y-1.5 text-left border-t border-slate-100 dark:border-emerald-900/60 pt-5">
            <button
              onClick={() => handleTabChange('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-transparent dark:border-emerald-800/60'
                  : 'text-slate-600 dark:text-emerald-100/70 hover:bg-slate-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => handleTabChange('saved')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-transparent dark:border-emerald-800/60'
                  : 'text-slate-600 dark:text-emerald-100/70 hover:bg-slate-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Saved Tools</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 font-bold border border-transparent dark:border-emerald-800/60">
                {savedToolIds.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('recent')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'recent'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-transparent dark:border-emerald-800/60'
                  : 'text-slate-600 dark:text-emerald-100/70 hover:bg-slate-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Recently Viewed</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 font-bold border border-transparent dark:border-emerald-800/60">
                {recentlyViewedIds.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-transparent dark:border-emerald-800/60'
                  : 'text-slate-600 dark:text-emerald-100/70 hover:bg-slate-50 dark:hover:bg-emerald-900/30'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Settings</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* MAIN AREA */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* TAB 1: MY PROFILE */}
          {activeTab === 'profile' && (
            <>
              {/* Profile Card & Form */}
              <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-emerald-900/60">
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
                      My Profile
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-200/60 mt-0.5">
                      Manage your account details and preferences.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (isEditingProfile) {
                        updateProfile({ name: nameInput, email: emailInput, bio: bioInput });
                      }
                      setIsEditingProfile(!isEditingProfile);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      isEditingProfile
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white shadow-xs'
                    }`}
                  >
                    {isEditingProfile ? (
                      <>
                        <Check className="w-4 h-4" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    
                    {/* Full Name & Email */}
                    <div className="sm:col-span-9 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50/70 dark:bg-emerald-950/80 disabled:bg-slate-50/40 dark:disabled:bg-emerald-950/40 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50/70 dark:bg-emerald-950/80 disabled:bg-slate-50/40 dark:disabled:bg-emerald-950/40 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Change Photo on right matching reference */}
                    <div className="sm:col-span-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-100 dark:border-emerald-800/60">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border border-slate-200 dark:border-emerald-700">
                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={handleChangePhoto}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>

                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                      Bio
                    </label>
                    <textarea
                      rows="3"
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-emerald-100 bg-slate-50/70 dark:bg-emerald-950/80 disabled:bg-slate-50/40 dark:disabled:bg-emerald-950/40 focus:bg-white dark:focus:bg-emerald-950 focus:border-emerald-500 focus:outline-hidden transition-all resize-none"
                    />
                  </div>
                </form>

              </div>

              {/* STATS SECTION (3 Cards) */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50">Stats</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Card 1: Saved Tools */}
                  <div
                    onClick={() => handleTabChange('saved')}
                    className="bg-white dark:bg-[#072018] rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-3">
                      <Bookmark className="w-6 h-6 fill-emerald-600 dark:fill-emerald-400" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                        {savedToolIds.length}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-emerald-200/60 font-medium mt-1">Saved Tools</p>
                    </div>
                  </div>

                  {/* Card 2: Recently Viewed */}
                  <div
                    onClick={() => handleTabChange('recent')}
                    className="bg-white dark:bg-[#072018] rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-emerald-500 dark:text-emerald-400 mb-3">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                        {recentlyViewedIds.length}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-emerald-200/60 font-medium mt-1">Recently Viewed</p>
                    </div>
                  </div>

                  {/* Card 3: Favorite Categories */}
                  <div className="bg-white dark:bg-[#072018] rounded-2xl border border-slate-200/90 dark:border-emerald-900/60 p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-rose-500 mb-3">
                      <Heart className="w-6 h-6 fill-rose-500" />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-emerald-50">
                        {profile.interests?.length || 5}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-emerald-200/60 font-medium mt-1">Favorite Categories</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* MY INTERESTS SECTION */}
              <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-emerald-50">My Interests</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-200/60 mt-0.5">
                      Select your interested categories to get better recommendations.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingInterests(!isEditingInterests)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 cursor-pointer"
                  >
                    {isEditingInterests ? "Done Editing" : "Edit Interests"}
                  </button>
                </div>

                {/* Chips Grid matching reference image colors */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {allCategoriesList.map((cat) => {
                    const isSelected = (profile.interests || []).includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleInterest(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/80 shadow-xs'
                            : 'bg-white dark:bg-emerald-950/40 text-slate-600 dark:text-emerald-200/70 border-slate-200 dark:border-emerald-900/60 hover:border-emerald-200 dark:hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-emerald-900/40'
                        }`}
                      >
                        {isSelected && "✓ "}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SAVED TOOLS */}
          {activeTab === 'saved' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50">Saved Tools</h2>
                  <p className="text-sm text-slate-500 dark:text-emerald-200/60">
                    Your personal collection of saved AI tools ({savedTools.length}).
                  </p>
                </div>
              </div>

              {savedTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {savedTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200 dark:border-emerald-900/60 p-12 text-center space-y-4">
                  <Bookmark className="w-12 h-12 text-slate-300 dark:text-emerald-800 mx-auto" />
                  <p className="text-slate-600 dark:text-emerald-100/70 font-medium">No saved tools yet</p>
                  <p className="text-xs text-slate-400 dark:text-emerald-400/60">Click the bookmark icon on any tool card to save it for later.</p>
                  <button
                    onClick={() => navigate('/tools')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Browse AI Tools
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECENTLY VIEWED */}
          {activeTab === 'recent' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50">Recently Viewed</h2>
                  <p className="text-sm text-slate-500 dark:text-emerald-200/60">
                    AI tools you checked out recently ({recentlyViewedTools.length}).
                  </p>
                </div>
              </div>

              {recentlyViewedTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recentlyViewedTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200 dark:border-emerald-900/60 p-12 text-center space-y-4">
                  <Clock className="w-12 h-12 text-slate-300 dark:text-emerald-800 mx-auto" />
                  <p className="text-slate-600 dark:text-emerald-100/70 font-medium">No recently viewed tools</p>
                  <p className="text-xs text-slate-400 dark:text-emerald-400/60">Tools you explore will automatically appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50">Settings & Preferences</h2>
              
              <div className="space-y-4 divide-y divide-slate-100 dark:divide-emerald-900/60">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-emerald-50">Theme Preference</h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/60">Toggle between Light and Emerald Dark visual modes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        theme === 'light'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 border border-transparent dark:border-emerald-800/60'
                      }`}
                    >
                      Light ☀️
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        theme === 'dark'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 border border-transparent dark:border-emerald-800/60'
                      }`}
                    >
                      Emerald Dark 🌙
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-emerald-50">Email Notifications</h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/60">Receive weekly digests of trending new AI tools</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-emerald-50">Data & Local Storage</h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/60">Clear saved bookmarks and history stored in your browser</p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      showToast("Local data reset to defaults.");
                      window.location.reload();
                    }}
                    className="text-xs font-semibold px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 cursor-pointer"
                  >
                    Reset Storage
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
