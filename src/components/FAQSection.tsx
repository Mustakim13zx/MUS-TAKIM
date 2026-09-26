import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/movies';
import { Language } from '../types';

interface FAQSectionProps {
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-neutral-900/30 border-t border-neutral-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
            {isBn ? 'সাধারণ জিজ্ঞাসা' : 'FREQUENTLY ASKED QUESTIONS'}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {isBn ? 'আপনার প্রশ্নের সহজ উত্তর' : 'Got Questions? We’ve Got Answers'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            {isBn
              ? 'সাইনপালস স্ট্রিমিং সেবা, ৪কে অডিও-ভিজ্যুয়াল প্রযুক্তি ও সাবস্ক্রিপশন সংক্রান্ত তথ্য'
              : 'Clear and transparent information regarding CinePulse platform, 4K streaming, and memberships.'}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/70 overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-200">
                    {isBn ? faq.qBn : faq.q}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400 border-amber-500/40' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 mt-1">
                    {isBn ? faq.aBn : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
