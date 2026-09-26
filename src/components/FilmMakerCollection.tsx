import React, { useState } from 'react';
import { Crown, Play, Sparkles, Film, ArrowRight } from 'lucide-react';
import { Movie, Language } from '../types';
import { STREAM_OFFER_URL } from '../data/movies';

interface FilmMakerCollectionProps {
  movies: Movie[];
  language: Language;
  onOpenPlayer: (movie: Movie) => void;
  onOpenVIPModal: () => void;
}

export const FilmMakerCollection: React.FC<FilmMakerCollectionProps> = ({
  movies,
  language,
  onOpenPlayer,
  onOpenVIPModal,
}) => {
  const isBn = language === 'bn';
  const [selectedFilmTitle, setSelectedFilmTitle] = useState<string>('The King of the Dark Sea');

  const selectedMovie =
    movies.find((m) => m.title.toLowerCase() === selectedFilmTitle.toLowerCase()) ||
    movies[0];

  const all20FilmNames = [
    'The King of the Dark Sea',
    'The Hidden Truth',
    'The Last Promise',
    'Echoes of Horizon',
    'The Royal Heart',
    'Road to Freedom',
    'Dreams Never End',
    'The Survivor',
    'Taar Porosh',
    'The Forgotten Room',
    'Beyond The Mountains',
    'Rainy Hearts',
    'The Black Veil',
    'Moments of Love',
    'The Final Mission',
    'The Enchanted Forest',
    'Silent Tears',
    'City of Our Dreams',
    'The Shadow Man',
    'Winter Letters',
  ];

  return (
    <section id="universe" className="py-16 sm:py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle Ambient backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src={selectedMovie.backdropUrl}
              alt={selectedMovie.title}
              className="h-full w-full object-cover opacity-20 filter blur-sm transition-all duration-500"
            />
            <div className="absolute inset-0 bg-neutral-950/80" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Header Lockup */}
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Crown className="h-4 w-4" />
                <span>{isBn ? 'এক্সক্লুসিভ চলচ্চিত্র নির্মাতা সম্ভার' : 'EXCLUSIVE FILMMAKER SHOWCASE'}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
                {isBn
                  ? 'শিমু আক্তার ২০-ফিল্ম সিনেমাটিক কালেকশন'
                  : 'The Shimu Akter 20-Film Cinematic Collection'}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {isBn
                  ? 'রোম্যান্স (দ্য লাস্ট প্রমিজ, তার পরশ, রেইনি হার্টস) থেকে শুরু করে মনস্তাত্ত্বিক থ্রিলার (দ্য হিডেন ট্রুথ, দ্য ব্ল্যাক ভেইল) এবং মহাজাগতিক অ্যাডভেঞ্চার। সবগুলো ২০টি চলচ্চিত্র এখন ৪কে আল্ট্রা এইচডিতে সংরক্ষিত।'
                  : 'From sweeping romance (The Last Promise, Taar Porosh, Rainy Hearts) to psychological mysteries (The Hidden Truth, The Black Veil), historical epics, and high-octane sagas. All 20 films remastered in pristine 4K UHD.'}
              </p>
            </div>

            {/* Interactive Film Chips / Pills */}
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                {isBn ? 'চলচ্চিত্র নির্বাচন করে প্রিভিউ দেখুন (২০টি চলচ্চিত্র):' : 'Click Any Film to Preview Details (All 20 Films):'}
              </div>
              <div className="flex flex-wrap gap-2">
                {all20FilmNames.map((filmName) => {
                  const isSelected = selectedFilmTitle === filmName;
                  return (
                    <button
                      key={filmName}
                      type="button"
                      onClick={() => setSelectedFilmTitle(filmName)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                          : 'border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {filmName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Film Preview Callout */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 sm:p-6 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-num font-semibold">
                  <span>★ {selectedMovie.rating}</span>
                  <span className="text-neutral-600">·</span>
                  <span>{selectedMovie.year}</span>
                  <span className="text-neutral-600">·</span>
                  <span>{selectedMovie.duration}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-300 font-sans">{selectedMovie.videoQuality}</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {isBn ? selectedMovie.titleBn : selectedMovie.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl line-clamp-2">
                  {isBn ? selectedMovie.synopsisBn : selectedMovie.synopsis}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={STREAM_OFFER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{isBn ? 'চলচ্চিত্রটি দেখুন' : 'Stream Film'}</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenVIPModal}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs font-medium text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <span>{isBn ? 'অল-এক্সেস পাস' : 'Get All-Access Pass'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
