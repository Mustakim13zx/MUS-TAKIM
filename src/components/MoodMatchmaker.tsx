import React, { useState, useId } from 'react';
import { Sparkles, Play, Bookmark, Clock, Compass, Film, Flame, Heart, Zap } from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface MoodMatchmakerProps {
  movies: Movie[];
  language: Language;
  onOpenPlayer: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  isMovieInWatchlist: (movieId: string) => boolean;
}

export const MoodMatchmaker: React.FC<MoodMatchmakerProps> = ({
  movies,
  language,
  onOpenPlayer,
  onToggleWatchlist,
  isMovieInWatchlist,
}) => {
  const isBn = language === 'bn';
  const runtimeInputId = useId();

  const [selectedMood, setSelectedMood] = useState<string>('mystery');
  const [maxMinutes, setMaxMinutes] = useState<number>(140);
  const [selectedVibe, setSelectedVibe] = useState<string>('solo');

  const moods = [
    {
      id: 'mystery',
      label: isBn ? 'সাইকোলজিক্যাল রহস্য' : 'Psychological Mystery',
      genre: 'Mystery',
      icon: Compass,
    },
    {
      id: 'action',
      label: isBn ? 'উত্তেজনাকর অ্যাকশন' : 'High-Octane Action',
      genre: 'Action',
      icon: Flame,
    },
    {
      id: 'romance',
      label: isBn ? 'হৃদয়স্পর্শী রোম্যান্স' : 'Emotional Romance',
      genre: 'Romance',
      icon: Heart,
    },
    {
      id: 'scifi',
      label: isBn ? 'মহাজাগতিক সাই-ফাই' : 'Cosmic Sci-Fi',
      genre: 'Sci-Fi',
      icon: Zap,
    },
  ];

  const vibes = [
    { id: 'solo', label: isBn ? 'একা গভীর রাতে' : 'Solo Late-Night' },
    { id: 'date', label: isBn ? 'রোমান্টিক ডেট' : 'Date Night' },
    { id: 'weekend', label: isBn ? 'উইকএন্ড ব্লকবাস্টার' : 'Weekend Blockbuster' },
  ];

  // Find optimal movie match based on mood and duration
  const activeMoodObj = moods.find((m) => m.id === selectedMood);
  const targetGenre = activeMoodObj?.genre || 'Mystery';

  const matchedMovie =
    movies.find((m) => m.genres.includes(targetGenre) && m.durationMinutes <= maxMinutes) ||
    movies.find((m) => m.genres.includes(targetGenre)) ||
    movies[0];

  const inWatchlist = isMovieInWatchlist(matchedMovie.id);

  return (
    <section id="moodmatcher" className="py-16 sm:py-20 bg-neutral-900/40 border-y border-neutral-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>{isBn ? 'ইনোভেশন ও এআই ভাইব ফিল্টার' : 'SMART VIBE MATCHMAKER'}</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {isBn ? 'মুহূর্তের মুড অনুযায়ী খুঁজুন আপনার পারফেক্ট সিনেমা' : 'Find Your Movie in 30 Seconds'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {isBn
              ? 'ঘন্টার পর ঘন্টা স্ক্রোল না করে আপনার বর্তমান মনের অবস্থা, সময় এবং পরিবেশ নির্বাচন করুন।'
              : 'Zero endless scrolling. Select how you feel right now and get an instant curated cinema match.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Box */}
          <div className="lg:col-span-6 space-y-6 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-8 backdrop-blur">
            {/* Step 1: Mood selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                {isBn ? '১. আপনার বর্তমান মুড কী?' : '1. What is your current mood?'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {moods.map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMood(m.id)}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm ring-1 ring-amber-500/50'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                      <span className="text-xs font-medium leading-snug">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time Available */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor={runtimeInputId} className="font-semibold text-neutral-400 uppercase tracking-wider">
                  {isBn ? '২. দেখার মতো সর্বোচ্চ সময় কতটুকু আছে?' : '2. Max available runtime:'}
                </label>
                <span className="text-amber-400 font-mono-num font-bold">
                  {maxMinutes} {isBn ? 'মিনিট' : 'Minutes'} ({Math.floor(maxMinutes / 60)}h {maxMinutes % 60}m)
                </span>
              </div>
              <input
                id={runtimeInputId}
                type="range"
                min="100"
                max="160"
                step="5"
                value={maxMinutes}
                onChange={(e) => setMaxMinutes(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono-num mt-1">
                <span>100m</span>
                <span>130m</span>
                <span>160m</span>
              </div>
            </div>

            {/* Step 3: Vibe setting */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                {isBn ? '৩. দেখার পরিবেশ কেমন?' : '3. Viewing atmosphere:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {vibes.map((v) => {
                  const isSelected = selectedVibe === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVibe(v.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-neutral-200 text-neutral-950 font-semibold'
                          : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Matched Result Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-7 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-400 font-mono-num">
                  98.4% {isBn ? 'মুড ম্যাচ' : 'Match Score'}
                </span>
              </div>

              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">
                {isBn ? 'আপনার জন্য নির্বাচিত সেরা চলচ্চিত্র' : 'Recommended Curated Selection'}
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Poster preview */}
                <div className="w-full sm:w-40 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg">
                  <img
                    src={matchedMovie.posterUrl}
                    alt={matchedMovie.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1">
                  <div className="text-xs text-amber-400 font-mono-num font-semibold">
                    ★ {matchedMovie.rating} · {matchedMovie.year} · {matchedMovie.duration}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    {isBn ? matchedMovie.titleBn : matchedMovie.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {isBn ? matchedMovie.synopsisBn : matchedMovie.synopsis}
                  </p>

                  <div className="text-xs text-neutral-500">
                    <span className="text-neutral-400 font-medium">
                      {isBn ? 'পরিচালক: ' : 'Director: '}
                    </span>
                    {matchedMovie.director}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenPlayer(matchedMovie)}
                      className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{isBn ? 'এখনই দেখুন' : 'Stream Now'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleWatchlist(matchedMovie)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                        inWatchlist
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-600'
                      }`}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${inWatchlist ? 'fill-current' : ''}`} />
                      <span>{inWatchlist ? (isBn ? 'সংরক্ষিত' : 'Saved') : (isBn ? 'ওয়াচলিস্টে রাখুন' : 'Save')}</span>
                    </button>
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
