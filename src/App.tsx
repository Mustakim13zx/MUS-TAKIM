/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MoodMatchmaker } from './components/MoodMatchmaker';
import { SpatialAudioStage } from './components/SpatialAudioStage';
import { FeaturedSpotlight } from './components/FeaturedSpotlight';
import { FilmMakerCollection } from './components/FilmMakerCollection';
import { MovieGrid } from './components/MovieGrid';
import { CategoryShowcase } from './components/CategoryShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CinemaModalPlayer } from './components/CinemaModalPlayer';
import { VIPPassModal } from './components/VIPPassModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';

import { MOVIES } from './data/movies';
import { Movie, Language, Genre } from './types';

export default function App() {
  // Set default language to American English
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Watchlist state
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('cinepulse_watchlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        return MOVIES.filter((m) => parsed.includes(m.id));
      }
    } catch {
      // fallback
    }
    // Initial friendly default
    return [MOVIES[0], MOVIES[1]];
  });

  // Modal states
  const [playerMovie, setPlayerMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);

  // Sync watchlist to localStorage
  useEffect(() => {
    try {
      const ids = watchlist.map((m) => m.id);
      localStorage.setItem('cinepulse_watchlist', JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [watchlist]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [movie, ...prev];
      }
    });
  };

  const isMovieInWatchlist = (movieId: string) => {
    return watchlist.some((m) => m.id === movieId);
  };

  const handleOpenPlayer = (movie: Movie) => {
    setPlayerMovie(movie);
    setIsPlayerOpen(true);
  };

  const handleOpenFilmDetails = (movie: Movie) => {
    setPlayerMovie(movie);
    setIsPlayerOpen(true);
  };

  const handleSelectCategory = (genre: Genre) => {
    // Scroll to trending/movie grid
    const target = document.getElementById('trending');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setSearchQuery(genre === 'All' ? '' : genre);
  };

  const handleExploreClick = () => {
    const target = document.getElementById('universe');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-body selection:bg-amber-500/30 selection:text-amber-200">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenVIPModal={() => setIsVIPModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section with Interactive Preview Showcase Card & Switcher (40% Core) */}
        <HeroSection
          movies={MOVIES}
          language={language}
          onOpenPlayer={handleOpenPlayer}
          onOpenFilmDetails={handleOpenFilmDetails}
          onExploreClick={handleExploreClick}
        />

        {/* 60% UNIQUE INNOVATION: Smart Cinema Mood Matcher */}
        <MoodMatchmaker
          movies={MOVIES}
          language={language}
          onOpenPlayer={handleOpenPlayer}
          onToggleWatchlist={handleToggleWatchlist}
          isMovieInWatchlist={isMovieInWatchlist}
        />

        {/* Featured Blockbuster Spotlight (The Hidden Truth) */}
        <FeaturedSpotlight
          movie={MOVIES[1]}
          language={language}
          onOpenPlayer={handleOpenPlayer}
          onOpenDetails={handleOpenFilmDetails}
        />

        {/* 60% UNIQUE INNOVATION: Interactive 3D Spatial Audio & Dolby Atmos Stage */}
        <SpatialAudioStage language={language} />

        {/* Celebrated 20-Film Cinematic Collection (Shimu Akter Showcase with Interactive Chips) */}
        <FilmMakerCollection
          movies={MOVIES}
          language={language}
          onOpenPlayer={handleOpenPlayer}
          onOpenVIPModal={() => setIsVIPModalOpen(true)}
        />

        {/* Filterable New Releases & Trending Movies Grid */}
        <MovieGrid
          movies={MOVIES}
          language={language}
          onOpenPlayer={handleOpenPlayer}
          onOpenDetails={handleOpenFilmDetails}
          onToggleWatchlist={handleToggleWatchlist}
          isMovieInWatchlist={isMovieInWatchlist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Genre Categories Showcase */}
        <CategoryShowcase
          language={language}
          onSelectCategory={handleSelectCategory}
        />

        {/* Platform Benefits / Why Choose CinePulse */}
        <WhyChooseUs language={language} />

        {/* Interactive FAQ Accordion */}
        <FAQSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenVIPModal={() => setIsVIPModalOpen(true)}
      />

      {/* Interactive Cinema Player Modal */}
      <CinemaModalPlayer
        movie={playerMovie}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        language={language}
        onToggleWatchlist={handleToggleWatchlist}
        isMovieInWatchlist={isMovieInWatchlist}
        onOpenVIPModal={() => {
          setIsPlayerOpen(false);
          setIsVIPModalOpen(true);
        }}
      />

      {/* Interactive VIP Cinema Pass & Holographic Ticket Generator Modal */}
      <VIPPassModal
        isOpen={isVIPModalOpen}
        onClose={() => setIsVIPModalOpen(false)}
        language={language}
      />

      {/* Watchlist Slide-Over Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={(id) => setWatchlist((prev) => prev.filter((m) => m.id !== id))}
        onClear={() => setWatchlist([])}
        onOpenPlayer={handleOpenPlayer}
        language={language}
      />
    </div>
  );
}
