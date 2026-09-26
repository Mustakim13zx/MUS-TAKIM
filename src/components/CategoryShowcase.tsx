import React from 'react';
import { Film, Flame, Heart, Compass, Sparkles, Eye, Search, Crown, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/movies';
import { Language, Genre } from '../types';

interface CategoryShowcaseProps {
  language: Language;
  onSelectCategory: (genre: Genre) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  language,
  onSelectCategory,
}) => {
  const isBn = language === 'bn';

  const iconMap: Record<string, React.ElementType> = {
    Flame,
    Eye,
    Heart,
    Sparkles,
    Film,
    Compass,
    Search,
    Crown,
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-neutral-900/30 border-y border-neutral-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
              {isBn ? 'ধারা অনুযায়ী অন্বেষণ' : 'GENRE SPOTLIGHT'}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {isBn ? 'জনপ্রিয় সিনেমা ক্যাটাগরি' : 'Popular Film Categories'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isBn
                ? 'আপনার পছন্দের জনরা নির্বাচন করে দ্রুত পছন্দের চলচ্চিত্র খুঁজে নিন'
                : 'Filter the complete cinema catalogue by distinct stylistic genres and themes'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Film;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onSelectCategory(cat.name as Genre)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-left transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-0.5"
              >
                {/* Background decorative gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity`}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono-num text-neutral-400">
                    {cat.count} {isBn ? 'সিনেমা' : 'films'}
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <h3 className="font-heading text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {isBn ? cat.nameBn : cat.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1 group-hover:text-neutral-200">
                    <span>{isBn ? 'এখনই দেখুন' : 'Explore collection'}</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
