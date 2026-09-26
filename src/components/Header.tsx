import React, { useState } from 'react';
import { Search, Bookmark, Sparkles, Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenVIPModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  watchlistCount,
  onOpenWatchlist,
  onOpenVIPModal,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isBn = language === 'bn';

  const navLinks = [
    { label: isBn ? 'ট্রেন্ডিং' : 'Trending', href: '#trending' },
    { label: isBn ? 'মাস্টারপিস' : 'Masterpieces', href: '#universe' },
    { label: isBn ? 'ক্যাটাগরি' : 'Categories', href: '#categories' },
    { label: isBn ? 'সাউন্ড স্টেজ' : 'Sound Stage', href: '#soundstage' },
    { label: isBn ? 'মুড ম্যাচার' : 'Mood Matcher', href: '#moodmatcher' },
    { label: isBn ? 'প্রশ্নোত্তর' : 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/70 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#"
          className="font-heading text-xl font-black tracking-widest text-neutral-100 hover:text-white transition-colors"
        >
          CINE<span className="text-amber-500">PULSE</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions and tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Bar / Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1">
                <Search className="h-4 w-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={isBn ? 'সিনেমা খুঁজুন...' : 'Search cinema...'}
                  autoFocus
                  className="bg-transparent text-xs text-white outline-none w-28 sm:w-44 placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-neutral-400 hover:text-white ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 text-xs text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
                title="Search"
                aria-label="Search movies"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">{isBn ? 'অনুসন্ধান' : 'Search'}</span>
              </button>
            )}
          </div>

          {/* Bilingual Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
            title="Switch Language"
            aria-label="Switch Language"
          >
            <span className="text-sm leading-none">🇺🇸</span>
            <span>{isBn ? 'বাংলা' : 'US English'}</span>
          </button>

          {/* Watchlist Tray Button */}
          <button
            type="button"
            onClick={onOpenWatchlist}
            className="relative flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 p-2 text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
            title={isBn ? 'আমার ওয়াচলিস্ট' : 'My Watchlist'}
            aria-label="Open Watchlist"
          >
            <Bookmark className="h-4 w-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950 font-mono-num">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Primary CTA: VIP Pass */}
          <button
            type="button"
            onClick={onOpenVIPModal}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-semibold text-neutral-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-sm whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>{isBn ? 'ভিআইপি পাস নিন' : 'GET VIP PASS'}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-2 pb-5 space-y-3">
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium text-neutral-300 hover:text-amber-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVIPModal();
              }}
              className="w-full py-2 text-center text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg"
            >
              {isBn ? 'ভিআইপি পাস নিন' : 'GET VIP PASS'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
