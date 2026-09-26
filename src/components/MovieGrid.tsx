import React, { useState, useMemo } from 'react';
import { Play, Bookmark, Star, Filter, Search, RotateCcw } from 'lucide-react';
import { Movie, Genre, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface MovieGridProps {
  movies: Movie[];
  language: Language;
  onOpenPlayer: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  isMovieInWatchlist: (movieId: string) => boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  language,
  onOpenPlayer,
  onOpenDetails,
  onToggleWatchlist,
  isMovieInWatchlist,
  searchQuery,
  onSearchChange,
}) => {
  const isBn = language === 'bn';
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'duration'>('rating');

  const genres: { id: Genre; label: string; labelBn: string }[] = [
    { id: 'All', label: 'All Movies', labelBn: 'সকল সিনেমা' },
    { id: 'Action', label: 'Action', labelBn: 'অ্যাকশন' },
    { id: 'Thriller', label: 'Thriller', labelBn: 'থ্রিলার' },
    { id: 'Romance', label: 'Romance', labelBn: 'রোম্যান্স' },
    { id: 'Sci-Fi', label: 'Sci-Fi', labelBn: 'সাই-ফাই' },
    { id: 'Drama', label: 'Drama', labelBn: 'ড্রামা' },
    { id: 'Adventure', label: 'Adventure', labelBn: 'অ্যাডভেঞ্চার' },
  ];

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter((m) => m.genres.includes(selectedGenre));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.titleBn.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.cast.some((c) => c.toLowerCase().includes(q)) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'duration') return b.durationMinutes - a.durationMinutes;
      return 0;
    });

    return result;
  }, [movies, selectedGenre, searchQuery, sortBy]);

  return (
    <section id="trending" className="py-16 sm:py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
              {isBn ? 'সদ্য মুক্তিপ্রাপ্ত ও জনপ্রিয়' : 'FRESH PREMIERES & TRENDING'}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {isBn ? 'মাস্টারপিস চলচ্চিত্রের ক্যাটালগ' : 'Explore Featured Releases'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isBn
                ? 'হাই রেজোলিউশন ৪কে আল্ট্রা এইচডি ও ডলবি অডিওতে উপভোগযোগ্য পূর্ণাঙ্গ সিনেমা তালিকা'
                : 'Browse through critically acclaimed cinematic works available in 4K UHD and Dolby Atmos'}
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-neutral-400">
            <span>{isBn ? 'বাছাই:' : 'Sort By:'}</span>
            <div className="flex rounded-lg border border-neutral-800 bg-neutral-900/80 p-0.5">
              <button
                type="button"
                onClick={() => setSortBy('rating')}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  sortBy === 'rating' ? 'bg-amber-500 text-neutral-950 font-bold' : 'hover:text-white'
                }`}
              >
                {isBn ? 'টপ রেটেড' : 'Top Rated'}
              </button>
              <button
                type="button"
                onClick={() => setSortBy('newest')}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  sortBy === 'newest' ? 'bg-amber-500 text-neutral-950 font-bold' : 'hover:text-white'
                }`}
              >
                {isBn ? 'নতুন' : 'Newest'}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800/80">
          {/* Genre Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {genres.map((g) => {
              const isActive = selectedGenre === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGenre(g.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-neutral-200 text-neutral-950 font-semibold'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {isBn ? g.labelBn : g.label}
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isBn ? 'ফিল্টার করুন...' : 'Filter by title or star...'}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-12 text-center">
            <p className="text-sm text-neutral-400 mb-4">
              {isBn
                ? 'আপনার খোঁজা অনুযায়ী কোনো সিনেমা পাওয়া যায়নি।'
                : 'No cinema titles match your search criteria.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedGenre('All');
                onSearchChange('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => {
              const inWatchlist = isMovieInWatchlist(movie.id);

              return (
                <div
                  key={movie.id}
                  className="group relative flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/70 overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Poster Thumbnail Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Quality Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-mono-num font-semibold">
                      <span className="rounded bg-black/70 px-1.5 py-0.5 text-neutral-300 backdrop-blur-sm">
                        {movie.videoQuality.replace(' ULTRA HD', '')}
                      </span>
                    </div>

                    {/* Bookmark Watchlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(movie);
                      }}
                      className={`absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                        inWatchlist
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-black/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                      title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      aria-label="Bookmark Movie"
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${inWatchlist ? 'fill-current' : ''}`} />
                    </button>

                    {/* Hover Play Button Trigger */}
                    <a
                      href={STREAM_OFFER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label={`Stream ${movie.title}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="h-5 w-5 fill-current translate-x-0.5" />
                      </div>
                    </a>

                    {/* Bottom Metadata Bar */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] text-neutral-300 font-mono-num">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        ★ {movie.rating}
                      </span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 p-3.5 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold truncate">
                        {(isBn ? movie.genresBn : movie.genres).join(' · ')}
                      </div>
                      <h3
                        onClick={() => onOpenDetails(movie)}
                        className="font-heading text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer truncate mt-0.5"
                        title={movie.title}
                      >
                        {isBn ? movie.titleBn : movie.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {isBn ? movie.synopsisBn : movie.synopsis}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2 border-t border-neutral-800/80">
                      <a
                        href={STREAM_OFFER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>{isBn ? 'প্লে করুন' : 'Watch'}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onOpenDetails(movie)}
                        className="px-2 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs font-medium transition-colors"
                      >
                        {isBn ? 'তথ্য' : 'Info'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
