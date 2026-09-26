import React from 'react';
import { Play, Info, Sparkles, Award } from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface FeaturedSpotlightProps {
  movie: Movie;
  language: Language;
  onOpenPlayer: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  movie,
  language,
  onOpenPlayer,
  onOpenDetails,
}) => {
  const isBn = language === 'bn';

  return (
    <section className="py-12 sm:py-16 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 overflow-hidden backdrop-blur">
          {/* Backdrop Graphic */}
          <div className="absolute inset-0 z-0">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="h-full w-full object-cover object-center opacity-25 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Editorial */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Award className="h-4 w-4" />
                  <span>{isBn ? 'সম্পাদকদের শীর্ষ নির্বাচন' : "EDITOR'S SPOTLIGHT OF THE MONTH"}</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {isBn ? movie.titleBn : movie.title}
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                  {isBn ? movie.synopsisBn : movie.synopsis}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400 font-medium pt-1">
                  <span className="text-amber-400 font-bold font-mono-num">★ {movie.rating}</span>
                  <span className="text-neutral-700" aria-hidden="true">·</span>
                  <span className="font-mono-num">{movie.year} {isBn ? 'প্রিমিয়ার' : 'Premiere'}</span>
                  <span className="text-neutral-700" aria-hidden="true">·</span>
                  <span className="font-mono-num">{movie.duration}</span>
                  <span className="text-neutral-700" aria-hidden="true">·</span>
                  <span className="text-neutral-200">{movie.videoQuality}</span>
                  <span className="text-neutral-700" aria-hidden="true">·</span>
                  <span className="text-neutral-300">{movie.audioQuality}</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <a
                    href={STREAM_OFFER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>{isBn ? 'এখনই দেখুন' : 'WATCH NOW'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenDetails(movie)}
                    className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-5 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    <span>{isBn ? 'আরও তথ্য' : 'MORE DETAILS'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Poster frame */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-700/80 shadow-2xl relative group">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono-num">
                      Dolby Atmos 5.1
                    </span>
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
