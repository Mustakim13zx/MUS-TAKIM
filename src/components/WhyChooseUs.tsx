import React from 'react';
import { Film, Zap, Headphones, Tv, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface WhyChooseUsProps {
  language: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const isBn = language === 'bn';

  const benefits = [
    {
      icon: Film,
      title: isBn ? '৪কে আল্ট্রা এইচডি প্রিমিয়ার' : 'Native 4K Ultra HD & HDR',
      desc: isBn
        ? 'প্রত্যেকটি দৃশ্য নিখুঁত কালার গ্রেডিং এবং ডলবি ভিশন মানের সিনেমাটিক স্বচ্ছতায় উপভোগ করুন।'
        : 'Stream uncompressed 4K master files directly from our high-bitrate edge nodes with zero artifacting.',
    },
    {
      icon: Headphones,
      title: isBn ? 'ডলবি অ্যাটমস ৩৬০° সাউন্ড' : 'Dolby Atmos 3D Spatial Audio',
      desc: isBn
        ? 'আপনার সাধারণ হেডফোনেই সিনেমা হলের মতো চারপাশের সাউন্ড এবং সাব-বেসের কম্পন অনুভব করুন।'
        : 'Hardware-decoded object-based spatial audio brings whispers, rain, and explosions vividly to life.',
    },
    {
      icon: Sparkles,
      title: isBn ? 'শিমু আক্তার ২০-ফিল্ম ইউনিভার্স' : 'Exclusive 20-Film Directorial Catalog',
      desc: isBn
        ? 'একমাত্র সাইনপালস-এই পাচ্ছেন জনপ্রিয় শিমু আক্তারের সম্পূর্ণ ২০টি চলচ্চিত্রের এক্সক্লুসিভ লাইব্রেরি।'
        : 'The only streaming destination hosting the complete, remastered 20-movie collection by Shimu Akter.',
    },
    {
      icon: Tv,
      title: isBn ? 'যেকোনো ডিভাইসে ইনস্ট্যান্ট প্লে' : 'Universal Device Ecosystem',
      desc: isBn
        ? 'মোবাইল, ট্যাবলেট, ম্যাক, উইন্ডোজ ও স্মার্ট টিভিতে কোনো অ্যাপ ইনস্টল ছাড়াই সরাসরি ব্রাউজারে উপভোগ্য।'
        : 'Zero app friction. Cast seamlessly to Apple TV, Google TV, Smart TVs, and mobile displays.',
    },
    {
      icon: Zap,
      title: isBn ? 'জিরো বাফারিং ও বিজ্ঞাপনমুক্ত' : 'Zero Ads & Instant Seek',
      desc: isBn
        ? 'কোনো বিরক্তিকর বিজ্ঞাপন বা দীর্ঘ লোডিং সময় নেই। এক ক্লিকেই শুরু হবে আপনার চলচ্চিত্র।'
        : 'Pure uninterrupted cinema with instant scrubbing, chapter skip, and pristine high-speed delivery.',
    },
    {
      icon: ShieldCheck,
      title: isBn ? 'স্মার্ট মুড ম্যাচিং অ্যালগরিদম' : 'Cinema Mood Matchmaker',
      desc: isBn
        ? 'আপনার দেখার সময় এবং মানসিক অবস্থার সঙ্গে মিলিয়ে নিমিষেই বের করে নিন আপনার পছন্দের সিনেমা।'
        : 'Spend seconds choosing what to watch, not 40 minutes of indecision. Tailored to your exact night vibe.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
            {isBn ? 'প্ল্যাটফর্মের শ্রেষ্ঠত্ব' : 'PLATFORM EXCELLENCE'}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {isBn ? 'কেন সাইনপালস সিনেমা প্রেমীদের প্রথম পছন্দ?' : 'Why Choose CinePulse?'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            {isBn
              ? 'উন্নত প্রযুক্তি ও শৈল্পিক চলচ্চিত্রের মেলবন্ধনে নির্মিত আধুনিক সিনেমা স্ট্রিমিং প্ল্যাটফর্ম'
              : 'Engineered from the ground up for movie lovers seeking uncompromising quality and effortless discovery.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
