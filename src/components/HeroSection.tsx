import React, { useState } from 'react';
import { Play, Info, Volume2, ShieldCheck, Flame, Disc3 } from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface HeroSectionProps {
  movies: Movie[];
  language: Language;
  onOpenPlayer: (movie: Movie) => void;
  onOpenFilmDetails: (movie: Movie) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  movies,
  language,
  onOpenPlayer,
  onOpenFilmDetails,
  onExploreClick,
}) => {
  const isBn = language === 'bn';
  // Selected movie for hero preview
  const [activeMovieId, setActiveMovieId] = useState<string>('the-king-of-the-dark-sea');

  const activeMovie = movies.find((m) => m.id === activeMovieId) || movies[0];

  // The 4 quick-switch candidates in the hero switcher
  const switcherMovieIds = [
    'the-king-of-the-dark-sea',
    'the-hidden-truth',
    'the-last-promise',
    'echoes-of-horizon',
  ];
  const switcherMovies = switcherMovieIds
    .map((id) => movies.find((m) => m.id === id))
    .filter(Boolean) as Movie[];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-neutral-950">
      {/* Dynamic Background Image with Vignette Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeMovie.backdropUrl}
          alt={activeMovie.title}
          className="h-full w-full object-cover object-center opacity-30 transition-all duration-700 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Editorial & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet Eyebrow Metadata (Zero-Pill Compliant) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>{isBn ? 'শিমু আক্তার সিনেমাটিক ইউনিভার্স' : 'SHIMU AKTER CINEMATIC UNIVERSE'}</span>
              <span className="text-neutral-600" aria-hidden="true">·</span>
              <span className="text-neutral-400">{isBn ? 'এখন লাইভ স্ট্রিমিং' : 'NOW STREAMING'}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] text-balance">
              {isBn
                ? 'অনুপম সিনেমার অভিজ্ঞতা। উপভোগ করুন কালজয়ী মাস্টারপিস।'
                : 'Experience Pure Cinema. Stream The Masterpieces.'}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              {isBn
                ? 'তীব্র রোম্যান্স, শ্বাসরুদ্ধকর রহস্য এবং রোমাঞ্চকর অভিযানের এক অনন্য সমাহার। শিমু আক্তারের নির্দেশনায় ২০টি মাস্টারপিস চলচ্চিত্রের সম্পূর্ণ লাইব্রেরি এখন ৪কে আল্ট্রা এইচডিতে উন্মুক্ত।'
                : 'Immerse yourself in vivid romance, thrilling mysteries, and epic adventures from the acclaimed 20-film collection directed by Shimu Akter. Mastered in native 4K with Dolby Atmos audio.'}
            </p>

            {/* Metadata Indicators (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1 text-amber-400 font-bold font-mono-num">
                ★ {activeMovie.rating} {isBn ? 'রেটিং' : 'Rating'}
              </span>
              <span className="text-neutral-700" aria-hidden="true">/</span>
              <span className="font-mono-num">{activeMovie.year} {isBn ? 'প্রিমিয়ার' : 'Premiere'}</span>
              <span className="text-neutral-700" aria-hidden="true">/</span>
              <span className="font-mono-num">{activeMovie.duration}</span>
              <span className="text-neutral-700" aria-hidden="true">/</span>
              <span className="text-neutral-200 font-mono-num">{activeMovie.videoQuality}</span>
              <span className="text-neutral-700" aria-hidden="true">/</span>
              <span className="text-neutral-300">{activeMovie.audioQuality}</span>
            </div>

            {/* Genre List */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              {(isBn ? activeMovie.genresBn : activeMovie.genres).map((g, idx) => (
                <span key={g} className="text-neutral-300">
                  {g}{idx < activeMovie.genres.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={STREAM_OFFER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>{isBn ? 'মেইন স্ট্রিম দেখুন' : 'WATCH MAIN STREAM'}</span>
              </a>

              <button
                type="button"
                onClick={onExploreClick}
                className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/90 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition-all"
              >
                <Disc3 className="h-4 w-4 text-amber-400" />
                <span>{isBn ? '২০টি সিনেমাই দেখুন' : 'EXPLORE ALL 20 FILMS'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Film Showcase Card (The 40% signature feature) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3 sm:p-4 backdrop-blur-xl shadow-2xl">
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-950">
                <img
                  src={activeMovie.posterUrl}
                  alt={activeMovie.title}
                  className="h-full w-full object-cover object-center transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-semibold">
                  <span className="flex items-center gap-1.5 rounded bg-emerald-500/90 px-2 py-0.5 text-neutral-950">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 animate-ping" />
                    <span>{isBn ? 'লাইভ স্ট্রিম' : 'MAIN STREAM'}</span>
                  </span>
                  <span className="rounded bg-black/60 px-2 py-0.5 text-neutral-200 backdrop-blur-sm font-mono-num">
                    4K UHD
                  </span>
                </div>

                {/* Center Pulsing Play Button */}
                <a
                  href={STREAM_OFFER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/90 text-neutral-950 shadow-xl transition-all hover:scale-110 hover:bg-amber-400"
                  aria-label={`Play stream for ${activeMovie.title}`}
                >
                  <Play className="h-6 w-6 fill-current translate-x-0.5 group-hover:scale-110 transition-transform" />
                </a>

                {/* Bottom Playback HUD Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-neutral-950 to-transparent">
                  {/* Progress scrubber */}
                  <div className="h-1 w-full bg-neutral-700/80 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-amber-400 w-2/5" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono-num">
                    <span>00:24:18 / {activeMovie.duration}</span>
                    <span className="flex items-center gap-1 text-neutral-300">
                      <Volume2 className="h-3 w-3 text-amber-400" />
                      {activeMovie.audioQuality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Switcher */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-widest text-amber-500 uppercase">
                    {isBn ? 'পরিচালনা: শিমু আক্তার' : `A ${activeMovie.director.toUpperCase()} FILM`}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono-num">★ {activeMovie.rating}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white">
                  {isBn ? activeMovie.titleBn : activeMovie.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {isBn ? activeMovie.synopsisBn : activeMovie.synopsis}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={STREAM_OFFER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{isBn ? 'স্ট্রিম শুরু করুন' : 'START STREAM'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenFilmDetails(activeMovie)}
                    className="flex items-center justify-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span>{isBn ? 'বিস্তারিত' : 'Film Details'}</span>
                  </button>
                </div>

                {/* 4 Interactive Thumbnail Switchers */}
                <div className="pt-2 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                      {isBn ? 'প্রিভিউ বাছাই করুন' : 'Quick Preview Selector'}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono-num">
                      {switcherMovies.findIndex((m) => m.id === activeMovieId) + 1} / 4
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {switcherMovies.map((m) => {
                      const isActive = m.id === activeMovieId;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setActiveMovieId(m.id)}
                          className={`relative group overflow-hidden rounded-lg border text-left transition-all ${
                            isActive
                              ? 'border-amber-400 ring-2 ring-amber-400/30'
                              : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                          }`}
                          title={m.title}
                        >
                          <div className="aspect-video w-full overflow-hidden bg-neutral-950">
                            <img
                              src={m.posterUrl}
                              alt={m.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-1 bg-neutral-900/90 truncate">
                            <div className="text-[10px] font-semibold text-neutral-200 truncate">
                              {isBn ? m.titleBn : m.title.replace('The ', '')}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
