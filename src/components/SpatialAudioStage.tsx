import React, { useState } from 'react';
import { Volume2, Headphones, Activity, Radio, Play, Square, Award } from 'lucide-react';
import { SOUND_PRESETS } from '../data/movies';
import { audioSpatial } from '../utils/audioSynth';
import { Language } from '../types';

interface SpatialAudioStageProps {
  language: Language;
}

export const SpatialAudioStage: React.FC<SpatialAudioStageProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [activePresetId, setActivePresetId] = useState<string>('atmos-7-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activePreset = SOUND_PRESETS.find((p) => p.id === activePresetId) || SOUND_PRESETS[0];

  const handleTestAudio = async () => {
    if (isPlayingAudio) {
      audioSpatial.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      await audioSpatial.playCinematicSwell(activePresetId);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section id="soundstage" className="py-16 sm:py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <Headphones className="h-4 w-4" />
                <span>{isBn ? 'নেক্সট-জেন অডিও ইনোভেশন' : 'NEXT-GEN ACOUSTIC ARCHITECTURE'}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {isBn
                  ? 'ডলবি অ্যাটমস ও থ্রিডি স্পেশাল অডিওর নিখুঁত গভীরতা'
                  : 'Experience True Dolby Atmos & 3D Spatial Audio'}
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {isBn
                  ? 'কোনো সাধারণ ফ্ল্যাট স্টেরিও নয়। সাইনপালস স্বয়ংক্রিয়ভাবে ৩৬০ ডিগ্রি অবজেক্ট-বেসড অডিও প্রসেস করে, যা হেডফোন বা হোম থিয়েটারে প্রতিটি ফিসফিসানি ও সাব-বেসের কম্পন জীবন্ত করে তোলে।'
                  : 'CinePulse decodes cinema-grade spatial audio streams with zero lossy compression. Experience pinpoint directionality, deep 38Hz sub-bass rumbles, and crystal-clear whisper dynamics in any standard pair of headphones.'}
              </p>

              {/* Preset Selectors */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                  {isBn ? 'সাউন্ড প্রোফাইল নির্বাচন করুন:' : 'Select Acoustic Profile:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SOUND_PRESETS.map((preset) => {
                    const isSelected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          if (isPlayingAudio) audioSpatial.stop();
                          setIsPlayingAudio(false);
                          setActivePresetId(preset.id);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-amber-500/80 bg-amber-500/10 text-white ring-1 ring-amber-500/40'
                            : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                        }`}
                      >
                        <div className="text-xs font-semibold text-neutral-200">
                          {isBn ? preset.nameBn : preset.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                          {isBn ? preset.descriptionBn : preset.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Audio Stage Visualizer & Test Trigger */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-center relative overflow-hidden">
                {/* Acoustic Chamber Display */}
                <div className="mb-6 flex flex-col items-center justify-center">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 shadow-inner">
                    <Headphones className="h-10 w-10 text-amber-400" />
                    {isPlayingAudio && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-30" />
                        <div className="absolute -inset-3 rounded-full border border-amber-500/40 animate-pulse" />
                      </>
                    )}
                  </div>

                  {/* Animated Waveform */}
                  <div className="flex items-center justify-center gap-1.5 h-10 mt-5">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5].map((idx, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isPlayingAudio
                            ? `bg-amber-400 animate-wave-${(i % 5) + 1}`
                            : 'h-1.5 bg-neutral-700'
                        }`}
                        style={{ height: isPlayingAudio ? undefined : '6px' }}
                      />
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-neutral-400 font-mono-num">
                    {isPlayingAudio ? (
                      <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                        <Activity className="h-3.5 w-3.5 animate-spin" />
                        {isBn ? '৩৬০° বাইনোরাল অডিও সিন্থেসিস বাজছে...' : 'Simulating 3D Spatial Acoustic Sweep...'}
                      </span>
                    ) : (
                      <span>{isBn ? 'হেডফোন লাগিয়ে টেস্ট করুন' : 'Wear headphones for best 3D perception'}</span>
                    )}
                  </div>
                </div>

                {/* Preset Details */}
                <div className="border-t border-neutral-800/80 pt-4 pb-4 text-left text-xs">
                  <div className="flex justify-between text-neutral-400 mb-1">
                    <span>{isBn ? 'সক্রিয় প্রোফাইল:' : 'Active Profile:'}</span>
                    <span className="text-neutral-200 font-medium font-mono-num">
                      {isBn ? activePreset.nameBn : activePreset.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>{isBn ? 'বেস সাব-হারমোনিক:' : 'Sub-Harmonic Pitch:'}</span>
                    <span className="text-amber-400 font-mono-num">{activePreset.baseFreq} Hz Calibrated</span>
                  </div>
                </div>

                {/* Test Sound Button */}
                <button
                  type="button"
                  onClick={handleTestAudio}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isPlayingAudio
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Square className="h-4 w-4 fill-current" />
                      <span>{isBn ? 'সাউন্ড বন্ধ করুন' : 'Stop Audio Test'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-current" />
                      <span>{isBn ? 'স্পেশাল সাউন্ড টেস্ট শুনুন' : 'Test Spatial Audio Stage'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
