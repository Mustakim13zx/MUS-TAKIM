import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Bookmark,
  Share2,
  ShieldCheck,
  Disc3,
  Sliders,
  Settings,
  Sparkles,
} from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface CinemaModalPlayerProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleWatchlist: (movie: Movie) => void;
  isMovieInWatchlist: (movieId: string) => boolean;
  onOpenVIPModal: () => void;
}

export const CinemaModalPlayer: React.FC<CinemaModalPlayerProps> = ({
  movie,
  isOpen,
  onClose,
  language,
  onToggleWatchlist,
  isMovieInWatchlist,
  onOpenVIPModal,
}) => {
  const isBn = language === 'bn';

  // Playback simulator states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progressSec, setProgressSec] = useState<number>(450); // 7m 30s
  const [activeQuality, setActiveQuality] = useState<'4K' | '1080p' | 'HDR'>('4K');
  const [activeSubtitles, setActiveSubtitles] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-progress simulated time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgressSec((prev) => (prev > 7200 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!isOpen || !movie) return null;

  const inWatchlist = isMovieInWatchlist(movie.id);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl my-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-neutral-700/80 text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close Cinema Player Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className={`h-full w-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100 opacity-80'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60 pointer-events-none" />

          {/* Subtitle simulation bar */}
          {activeSubtitles && isPlaying && (
            <div className="absolute bottom-16 inset-x-0 flex justify-center text-center px-4 pointer-events-none">
              <span className="bg-black/80 text-white font-medium text-xs sm:text-sm px-3 py-1 rounded backdrop-blur-sm border border-neutral-700/50">
                {isBn
                  ? `[সংলাপ] "${movie.taglineBn}"`
                  : `[Dialogue] "${movie.tagline}"`}
              </span>
            </div>
          )}

          {/* Quality Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold">
            <span className="rounded bg-amber-500/90 px-2 py-0.5 text-neutral-950 font-bold font-mono-num">
              {activeQuality} ULTRA HD
            </span>
            <span className="rounded bg-black/60 px-2 py-0.5 text-neutral-200 backdrop-blur-sm">
              {movie.audioQuality}
            </span>
          </div>

          {/* Center Play/Pause Trigger */}
          <a
            href={STREAM_OFFER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-2xl transition-transform hover:scale-110 active:scale-95"
            aria-label="Stream movie in 4K"
          >
            <Play className="h-7 w-7 fill-current translate-x-0.5" />
          </a>

          {/* Bottom Player HUD */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
            {/* Scrubber track */}
            <div
              className="h-1.5 w-full bg-neutral-700/80 rounded-full overflow-hidden cursor-pointer mb-2.5"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setProgressSec(Math.floor(ratio * 7200));
              }}
            >
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${(progressSec / 7200) * 100}%` }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <span className="font-mono-num text-[11px] text-neutral-400">
                  {formatTime(progressSec)} / {movie.duration}:00
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Subtitle toggle */}
                <button
                  type="button"
                  onClick={() => setActiveSubtitles(!activeSubtitles)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                    activeSubtitles
                      ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'border-neutral-700 text-neutral-500'
                  }`}
                >
                  CC {isBn ? 'বাংলা' : 'EN'}
                </button>

                {/* Quality Switcher */}
                <button
                  type="button"
                  onClick={() => {
                    const next = activeQuality === '4K' ? '1080p' : activeQuality === '1080p' ? 'HDR' : '4K';
                    setActiveQuality(next);
                  }}
                  className="text-[10px] font-mono-num bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2 py-0.5 rounded border border-neutral-700"
                >
                  {activeQuality}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Film Information Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-widest text-amber-500 uppercase">
                {isBn ? 'পরিচালনা: শিমু আক্তার' : `A ${movie.director.toUpperCase()} FILM`}
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white mt-1">
                {isBn ? movie.titleBn : movie.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono-num mt-2">
                <span className="text-amber-400 font-bold">★ {movie.rating} ({movie.voteCount} reviews)</span>
                <span>·</span>
                <span>{movie.year}</span>
                <span>·</span>
                <span>{movie.duration}</span>
                <span>·</span>
                <span className="text-neutral-300 font-sans">
                  {(isBn ? movie.genresBn : movie.genres).join(', ')}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleWatchlist(movie)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  inWatchlist
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${inWatchlist ? 'fill-current' : ''}`} />
                <span>{inWatchlist ? (isBn ? 'সংরক্ষিত' : 'Saved') : (isBn ? 'ওয়াচলিস্ট' : 'Watchlist')}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                title="Share link"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copiedLink ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'শেয়ার' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {isBn ? 'চলচ্চিত্রের সারসংক্ষেপ' : 'Synopsis'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {isBn ? movie.synopsisBn : movie.synopsis}
            </p>
          </div>

          {/* Cast & Crew Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-neutral-800/80 py-4 text-xs">
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block font-semibold mb-1">
                {isBn ? 'পরিচালক' : 'Director'}
              </span>
              <span className="text-neutral-200 font-medium">{movie.director}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block font-semibold mb-1">
                {isBn ? 'অভিনয়ে' : 'Starring Cast'}
              </span>
              <span className="text-neutral-200 font-medium">{movie.cast.join(', ')}</span>
            </div>
          </div>

          {/* Bottom Upgrade / Stream Direct Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-neutral-400">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                {isBn ? '১০০% ডিরেক্টরস কাট ও বিজ্ঞাপনহীন' : '100% Director’s Cut & Ad-Free'}
              </span>
              <span className="block mt-0.5">
                {isBn
                  ? 'সর্বোচ্চ মানের অডিও-ভিজ্যুয়াল নিশ্চিত করতে সরাসরি ৪কে স্ট্রিম উপভোগ করুন'
                  : 'Stream uncompressed 4K with Dolby Atmos sound in high bitrate.'}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={STREAM_OFFER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>{isBn ? 'সরাসরি স্ট্রিম দেখুন' : 'STREAM IN 4K NOW'}</span>
              </a>

              <button
                type="button"
                onClick={onOpenVIPModal}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-all"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{isBn ? 'ভিআইপি পাস' : 'VIP PASS'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
