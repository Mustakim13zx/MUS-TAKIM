import React from 'react';
import { X, Play, Trash2, Clock, Bookmark, Film } from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Movie[];
  onRemove: (movieId: string) => void;
  onClear: () => void;
  onOpenPlayer: (movie: Movie) => void;
  language: Language;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onClear,
  onOpenPlayer,
  language,
}) => {
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const totalMinutes = watchlist.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 p-6 flex flex-col justify-between shadow-2xl">
          {/* Drawer Top */}
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-amber-500 fill-current" />
                <h3 className="font-heading text-lg font-bold text-white">
                  {isBn ? 'আমার ওয়াচলিস্ট' : 'My Watchlist'}
                </h3>
                <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300 font-mono-num">
                  {watchlist.length}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close Watchlist Drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Total Duration Banner */}
            {watchlist.length > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-neutral-900 border border-neutral-800 p-3 mb-4 text-xs">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isBn ? 'মোট সময়কাল:' : 'Total Runtime:'}</span>
                </span>
                <span className="font-mono-num font-bold text-amber-400">
                  {totalHours}h {remainingMins}m
                </span>
              </div>
            )}
          </div>

          {/* Drawer Content: Movie List */}
          <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-1">
            {watchlist.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 space-y-3">
                <Film className="h-10 w-10 text-neutral-600 mx-auto" />
                <p className="text-xs">
                  {isBn
                    ? 'আপনার ওয়াচলিস্ট এখন খালি। যেকোনো সিনেমার বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।'
                    : 'Your watchlist is currently empty. Bookmark movies to watch them later.'}
                </p>
              </div>
            ) : (
              watchlist.map((movie) => (
                <div
                  key={movie.id}
                  className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 transition-all hover:border-neutral-700"
                >
                  <div className="h-20 w-14 shrink-0 rounded-lg overflow-hidden bg-neutral-950">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">
                        {isBn ? movie.titleBn : movie.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono-num mt-0.5">
                        <span className="text-amber-400">★ {movie.rating}</span>
                        <span>·</span>
                        <span>{movie.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={STREAM_OFFER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-neutral-950 hover:bg-amber-400 transition-colors"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>{isBn ? 'প্লে করুন' : 'Watch'}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onRemove(movie.id)}
                        className="rounded p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove from list"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {watchlist.length > 0 && (
            <div className="border-t border-neutral-800 pt-4">
              <button
                type="button"
                onClick={onClear}
                className="w-full py-2 text-center text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
              >
                {isBn ? 'ওয়াচলিস্ট খালি করুন' : 'Clear All from Watchlist'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
