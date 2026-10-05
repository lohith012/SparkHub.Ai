import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#04140E] border-t border-slate-200 dark:border-emerald-950 mt-20 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100 dark:border-emerald-900/40">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-emerald-50">
                SPARK-HUB<span className="text-emerald-600 dark:text-emerald-400">.Ai</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed">
              Discover, explore and use the best AI tools in one place. Your ultimate directory for artificial intelligence.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-emerald-950/80 border border-transparent dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-emerald-950/80 border border-transparent dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-emerald-950/80 border border-transparent dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-emerald-100 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Tools', path: '/tools' },
                { name: 'Categories', path: '/categories' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-500 dark:text-emerald-100/70 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-emerald-100 tracking-wider uppercase mb-4">
              Top Categories
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Productivity', slug: 'productivity' },
                { name: 'Writing', slug: 'writing' },
                { name: 'Image', slug: 'image' },
                { name: 'Video', slug: 'video' },
                { name: 'Development', slug: 'development' },
                { name: 'Design', slug: 'design' },
              ].map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-sm text-slate-500 dark:text-emerald-100/70 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Help info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-emerald-100 tracking-wider uppercase mb-4">
              Platform
            </h3>
            <p className="text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed mb-3">
              Curated and maintained with passion for the global AI community.
            </p>
            <div className="text-xs text-slate-400 dark:text-emerald-400/60 space-y-1">
              <p>Contact: lohith012@gmail.com</p>
              <p>Location: Guntur, India</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-emerald-300/70 gap-4">
          <p>© 2026 SPARK-HUB.Ai. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern AI tools & React
          </p>
        </div>
      </div>
    </footer>
  );
}
