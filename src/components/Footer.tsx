import React from 'react';
import { Film, Shield, Globe, Award, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenVIPModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenVIPModal }) => {
  const isBn = language === 'bn';

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 pt-16 pb-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="font-heading text-xl font-black tracking-widest text-neutral-100 hover:text-white"
            >
              CINE<span className="text-amber-500">PULSE</span>
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {isBn
                ? 'অনুপম চলচ্চিত্র ও সাউন্ড আবিষ্কারের শীর্ষ প্ল্যাটফর্ম। ৪কে রেজোলিউশন ও ডলবি অডিওতে উপভোগ করুন দেশি ও আন্তর্জাতিক মাস্টারপিস।'
                : 'The premier independent destination for cinema purists. Curated masterworks, 4K HDR streams, and real-time spatial acoustics.'}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-500 font-mono-num">
              <span>DOLBY ATMOS</span>
              <span>·</span>
              <span>4K ULTRA HD</span>
              <span>·</span>
              <span>24 FPS TRUE KINETIC</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isBn ? 'নেভিগেশন' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#trending" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'ট্রেন্ডিং সিনেমা' : 'Trending Cinema'}
                </a>
              </li>
              <li>
                <a href="#universe" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'শিমু আক্তার ইউনিভার্স' : 'Shimu Akter Universe'}
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'ক্যাটাগরি সমূহ' : 'Browse Categories'}
                </a>
              </li>
              <li>
                <a href="#soundstage" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'স্পেশাল অডিও স্টেজ' : 'Spatial Audio Stage'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Unique Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isBn ? 'বিশেষ ফিচার' : 'Unique Tools'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#moodmatcher" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'মুড ম্যাচমেকার' : 'Cinema Mood Matcher'}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVIPModal}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {isBn ? 'ভিআইপি ডিজিটাল পাস' : 'VIP Digital Pass'}
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  {isBn ? 'সাহায্য ও জিজ্ঞাসা' : 'Help & FAQ'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Guarantee */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isBn ? 'নিরাপত্তা ও মান' : 'Quality Seal'}
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Shield className="h-3.5 w-3.5 text-amber-500" />
                <span>{isBn ? '১০০% ডিরেক্টরস কাট' : 'Official Director Editions'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {isBn
                  ? 'কোনো প্রকার বিজ্ঞাপন ছাড়া খাঁটি সিনেমাটিক অনুভূতির নিশ্চয়তা।'
                  : 'Engineered for cinephiles across Bangladesh and the global film community.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 CinePulse Cinema Network. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
