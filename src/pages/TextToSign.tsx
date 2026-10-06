import React, { useState } from 'react';
import {
  Languages,
  ArrowRight,
  Hand,
  Sparkles,
  Info,
  BookOpen,
  Volume2,
  RefreshCw
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { mockSignLibrary } from '../data/mockSignLibrary.ts';

export const TextToSign: React.FC = () => {
  const [inputText, setInputText] = useState('Thank you for meeting with me');
  const [activePhrase, setActivePhrase] = useState<string | null>('Thank you for meeting with me');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    setIsConverting(true);
    setTimeout(() => {
      setActivePhrase(inputText);
      setIsConverting(false);
    }, 400);
  };

  const handleSelectRecent = (phrase: string) => {
    setInputText(phrase);
    setActivePhrase(phrase);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Reverse Communication"
        title="Text-to-Sign"
        description="Convert written communication into sign-language guidance. Enables hearing peers or family to type text and learn the corresponding sign gestures."
      />

      {/* Step 1 Architecture Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <strong className="font-semibold text-teal-950">Step 1 Architecture Preview:</strong>{' '}
          Sign vocabulary definitions, tokenization pathways, and animated avatar viewports are structured. Procedural 3D sign animation playback or video avatar models will be plugged in during Step 2.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form & Recent Phrases (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <Card title="Input Message" subtitle="Type sentences to translate into sign language">
            <form onSubmit={handleConvert} className="space-y-4">
              <div>
                <label htmlFor="text-to-sign-input" className="sr-only">
                  Text to translate
                </label>
                <textarea
                  id="text-to-sign-input"
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter words, phrases, or conversational responses..."
                  className="w-full p-3.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-teal-700 focus:border-teal-700"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  Target Language: <strong className="text-slate-700">Indian Sign Language (ISL)</strong>
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={isConverting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                  disabled={!inputText.trim() || isConverting}
                >
                  {isConverting ? 'Translating...' : 'Convert to Sign'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Recent Common Phrases */}
          <Card title="Quick Emergency & Common Phrases" subtitle="Click to translate immediately">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Hello, how can I help you?',
                'Thank you for your assistance',
                'Where is the nearest exit?',
                'Please call emergency services',
                'Do you need water?',
                'I am deaf and use sign language'
              ].map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectRecent(phrase)}
                  className="p-2.5 text-left text-xs bg-slate-50 hover:bg-teal-50/70 hover:border-teal-200 border border-slate-200 rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="text-slate-800 font-medium group-hover:text-teal-900 block truncate">
                    {phrase}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Sign Output Placeholder (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card title="Sign Output Display" subtitle="Visual animation & hand position instructions">
            {activePhrase ? (
              <div className="space-y-4">
                {/* 3D Sign Avatar Viewport Placeholder */}
                <div className="relative aspect-4/3 w-full bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white border border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center mb-3">
                    <Hand className="w-8 h-8 text-teal-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Sign Gesture Guide
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs">
                    Demonstration avatar placeholder for phrase:
                  </p>
                  <p className="text-sm font-semibold text-teal-300 mt-1 italic">
                    "{activePhrase}"
                  </p>

                  <div className="mt-4 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300 font-mono">
                    Token Breakdown: THANK · YOU · MEET · READY
                  </div>
                </div>

                {/* Hand Position Description */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <h5 className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-700" aria-hidden="true" />
                    Hand Kinematics Summary
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Move dominant open hand forward from chin towards the listener with flat palm facing upward. Maintain comfortable eye contact.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <Languages className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-slate-600">No text translated yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Type a sentence and click Convert to Sign to generate gestures.
                </p>
              </div>
            )}
          </Card>

          {/* Sign Glossary Reference Mini-Card */}
          <Card title="ISL Glossary Reference" subtitle="Curated basic lexicon">
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {mockSignLibrary.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 font-mono">
                      [{item.gloss}]
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-teal-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-snug">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
