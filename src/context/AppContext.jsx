import React, { createContext, useContext, useState, useEffect } from 'react';
import { toolsData } from '../data/toolsData';

const AppContext = createContext();

const INITIAL_PROFILE = {
  name: "Atyam Lohith",
  email: "lohith012@gmail.com",
  bio: "BTech CSM Student | Tech Enthusiast | Exploring AI Tools for a Smarter Future.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  interests: ["Productivity", "Development", "Design", "Image", "Video", "Education"]
};

export function AppProvider({ children }) {
  // Profile state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sparkhub_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PROFILE; }
    }
    return INITIAL_PROFILE;
  });

  // Saved Tools (IDs)
  const [savedToolIds, setSavedToolIds] = useState(() => {
    const saved = localStorage.getItem('sparkhub_saved_tools');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['chatgpt', 'claude', 'github-copilot', 'midjourney', 'canva', 'cursor', 'gemini', 'notion-ai', 'perplexity', 'elevenlabs', 'gamma', 'notebooklm']; }
    }
    return ['chatgpt', 'claude', 'github-copilot', 'midjourney', 'canva', 'cursor', 'gemini', 'notion-ai', 'perplexity', 'elevenlabs', 'gamma', 'notebooklm'];
  });

  // Favorites (IDs)
  const [favoriteToolIds, setFavoriteToolIds] = useState(() => {
    const saved = localStorage.getItem('sparkhub_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['chatgpt', 'cursor', 'claude', 'midjourney', 'canva']; }
    }
    return ['chatgpt', 'cursor', 'claude', 'midjourney', 'canva'];
  });

  // Recently Viewed Tools (IDs)
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    const saved = localStorage.getItem('sparkhub_recently_viewed');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['chatgpt', 'claude', 'gemini', 'midjourney', 'dall-e', 'stable-diffusion', 'canva', 'github-copilot', 'notion-ai', 'cursor', 'perplexity', 'gamma']; }
    }
    return ['chatgpt', 'claude', 'gemini', 'midjourney', 'dall-e', 'stable-diffusion', 'canva', 'github-copilot', 'notion-ai', 'cursor', 'perplexity', 'gamma'];
  });

  // UI and Toast states
  const [toast, setToast] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sparkhub_auth') === 'true';
  });

  // Theme state: 'system', 'light', or 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('sparkhub_theme_mode');
    if (saved === 'system' || saved === 'light' || saved === 'dark') return saved;
    const legacyTheme = localStorage.getItem('sparkhub_theme');
    if (legacyTheme === 'light' || legacyTheme === 'dark') return legacyTheme;
    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen for system theme changes
  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Compute active theme ('light' or 'dark')
  const theme = themeMode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : themeMode;

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('sparkhub_theme_mode', themeMode);
    localStorage.setItem('sparkhub_theme', theme);
  }, [theme, themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      if (prev === 'system') return 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sparkhub_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sparkhub_saved_tools', JSON.stringify(savedToolIds));
  }, [savedToolIds]);

  useEffect(() => {
    localStorage.setItem('sparkhub_favorites', JSON.stringify(favoriteToolIds));
  }, [favoriteToolIds]);

  useEffect(() => {
    localStorage.setItem('sparkhub_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('sparkhub_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleSaveTool = (toolId) => {
    setSavedToolIds(prev => {
      const exists = prev.includes(toolId);
      const updated = exists ? prev.filter(id => id !== toolId) : [...prev, toolId];
      const tool = toolsData.find(t => t.id === toolId);
      showToast(exists ? `Removed ${tool?.name || 'tool'} from Saved` : `Saved ${tool?.name || 'tool'} to collection!`);
      return updated;
    });
  };

  const toggleFavoriteTool = (toolId) => {
    setFavoriteToolIds(prev => {
      const exists = prev.includes(toolId);
      const updated = exists ? prev.filter(id => id !== toolId) : [...prev, toolId];
      const tool = toolsData.find(t => t.id === toolId);
      showToast(exists ? `Removed ${tool?.name || 'tool'} from Favorites` : `Added ${tool?.name || 'tool'} to Favorites! ❤️`);
      return updated;
    });
  };

  const addRecentlyViewed = (toolId) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, 30);
    });
  };

  const updateProfile = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
    showToast("Profile updated successfully!");
  };

  const toggleInterest = (categoryName) => {
    setProfile(prev => {
      const current = prev.interests || [];
      const updated = current.includes(categoryName)
        ? current.filter(c => c !== categoryName)
        : [...current, categoryName];
      return { ...prev, interests: updated };
    });
  };

  const login = (email, name = "Atyam Lohith") => {
    setIsAuthenticated(true);
    setProfile(prev => ({ ...prev, email: email || prev.email, name: name || prev.name }));
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Logged out successfully.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        toggleInterest,
        savedToolIds,
        toggleSaveTool,
        favoriteToolIds,
        toggleFavoriteTool,
        recentlyViewedIds,
        addRecentlyViewed,
        isAuthenticated,
        login,
        logout,
        toast,
        showToast,
        globalSearch,
        setGlobalSearch,
        isSearchOpen,
        setIsSearchOpen,
        theme,
        themeMode,
        setTheme,
        setThemeMode,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
