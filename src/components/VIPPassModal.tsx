import React, { useState } from 'react';
import { X, Check, Sparkles, QrCode, Shield, Download, Crown, CreditCard } from 'lucide-react';
import { VIP_PLANS, STREAM_OFFER_URL } from '../data/movies';
import { VIPPlan, Language } from '../types';

interface VIPPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const VIPPassModal: React.FC<VIPPassModalProps> = ({ isOpen, onClose, language }) => {
  const isBn = language === 'bn';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('vip-pass');
  const [passholderName, setPassholderName] = useState<string>('Cinema Enthusiast');
  const [issuedPass, setIssuedPass] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedPlan = VIP_PLANS.find((p) => p.id === selectedPlanId) || VIP_PLANS[1];

  const handleIssuePass = (e: React.FormEvent) => {
    e.preventDefault();
    setIssuedPass(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setIssuedPass(false);
            onClose();
          }}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          aria-label="Close Modal"
        >
          <X className="h-4 w-4" />
        </button>

        {!issuedPass ? (
          <div>
            <div className="text-center max-w-lg mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
                <Crown className="h-3.5 w-3.5" />
                <span>{isBn ? 'ভিআইপি ডিজিটাল সিনেমা পাস' : 'DIGITAL CINEMA VIP PASS'}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isBn ? 'আনলিমিটেড ৪কে স্ট্রিমিং ও আর্লি প্রিমিয়ার' : 'Unlock All 20 Masterpieces & 4K UHD'}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {isBn
                  ? 'সব চলচ্চিত্র, ডলবি অ্যাটমস অডিও এবং অফলাইন ডাউনলোড সহ সীমাহীন বিনোদন।'
                  : 'Zero advertisements, pure director cuts, and instant 4K Dolby Atmos streaming across all screens.'}
              </p>

              {/* Monthly / Yearly Toggle */}
              <div className="mt-4 inline-flex items-center rounded-xl border border-neutral-800 bg-neutral-900 p-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isBn ? 'মাসিক' : 'Monthly'}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`flex items-center gap-1 rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{isBn ? 'বার্ষিক' : 'Annual'}</span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-400 font-bold">
                    {isBn ? '২৫% ছাড়' : 'Save 25%'}
                  </span>
                </button>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {VIP_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const price =
                  billingCycle === 'monthly'
                    ? `$${plan.monthlyPrice}`
                    : `$${(plan.yearlyPrice / 12).toFixed(2)}`;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative rounded-2xl border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-neutral-900/90 ring-1 ring-amber-500/50 shadow-lg shadow-amber-500/5'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black uppercase text-neutral-950 tracking-wider">
                        {isBn ? 'জনপ্রিয়' : 'MOST POPULAR'}
                      </span>
                    )}

                    <div className="text-xs font-bold text-neutral-200">
                      {isBn ? plan.nameBn : plan.name}
                    </div>

                    <div className="mt-2 mb-3">
                      <span className="font-heading text-2xl font-black text-white">{price}</span>
                      <span className="text-[11px] text-neutral-400"> / {isBn ? 'মাস' : 'month'}</span>
                    </div>

                    <ul className="space-y-1.5 border-t border-neutral-800/80 pt-3 text-[11px] text-neutral-300">
                      {(isBn ? plan.featuresBn : plan.features).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Passholder Name Form */}
            <form onSubmit={handleIssuePass} className="space-y-4 border-t border-neutral-800 pt-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  {isBn ? 'পাসধারকের নাম (ডিজিটাল টিকিটে প্রদর্শিত হবে):' : 'Passholder Name on Pass:'}
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={passholderName}
                    onChange={(e) => setPassholderName(e.target.value)}
                    placeholder="Enter full name"
                    className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/70"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles className="h-4 w-4 fill-current" />
                    <span>{isBn ? 'ভিআইপি পাস সক্রিয় করুন' : 'Issue My VIP Pass'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Issued Holographic Cinema Ticket View */
          <div className="py-4 space-y-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
              <Check className="h-6 w-6" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white">
              {isBn ? 'আপনার ডিজিটাল ভিআইপি পাস প্রস্তুত!' : 'Your Digital Cinema VIP Pass is Active!'}
            </h3>

            {/* Holographic VIP Ticket */}
            <div className="mx-auto max-w-md rounded-2xl border border-amber-500/50 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 text-left shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <div>
                  <div className="font-heading text-sm font-black tracking-widest text-amber-500">
                    CINEPULSE VIP PASS
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono-num">
                    TOKEN #CP-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Crown className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-[11px] text-neutral-400 uppercase font-semibold">
                  {isBn ? 'পাসধারকের নাম' : 'Passholder Name'}
                </div>
                <div className="font-heading text-lg font-bold text-white">{passholderName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono-num mb-5">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Tier</span>
                  <span className="text-amber-400 font-semibold">{selectedPlan.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Valid Thru</span>
                  <span className="text-neutral-200">SEPT 2027 • 4K ACCESS</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
                <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                  <QrCode className="h-6 w-6 text-neutral-200" />
                  <span>Scan at any 4K screen terminal</span>
                </div>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 font-mono-num">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <a
                href={STREAM_OFFER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIssuedPass(false);
                  onClose();
                }}
                className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors"
              >
                {isBn ? 'সিনেমা দেখা শুরু করুন' : 'Start Watching Now'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
