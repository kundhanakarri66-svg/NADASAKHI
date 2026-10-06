import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  RotateCcw,
  Copy,
  Check,
  Info,
  Radio,
  Volume2
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { StatusIndicator } from '../components/common/StatusIndicator.tsx';

export const SpeechToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [transcript, setTranscript] = useState(
    'Welcome to the presentation. Today we are demonstrating how NĀDASAKHI allows individuals with severe hearing loss to read spoken conversation in real time with high accuracy.'
  );

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const handleClear = () => {
    setTranscript('');
  };

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addSampleSentence = (text: string) => {
    setTranscript((prev) => (prev ? `${prev} ${text}` : text));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Voice Transcription"
        title="Speech-to-Text"
        description="Convert spoken communication into readable text. Facilitates seamless group conversations and face-to-face meetings with hearing companions."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={isListening ? 'danger' : 'primary'}
              size="md"
              icon={isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              onClick={toggleListening}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleClear}
              disabled={!transcript}
            >
              Clear Transcript
            </Button>
          </div>
        }
      />

      {/* Step 1 Architecture Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <strong className="font-semibold text-teal-950">Step 1 Architecture Preview:</strong>{' '}
          Speech pipeline wrappers and transcript container models are established. Continuous Web Speech API recognition, punctuation model restoration, and multilingual audio speech models will be hooked in Step 2.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Transcript Display (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card
            title="Live Caption Transcript"
            subtitle="Spoken dialogue converted into high-legibility text"
            headerAction={
              transcript && (
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-500 hover:text-teal-700 rounded-md transition-colors cursor-pointer flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )
            }
          >
            {transcript ? (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 min-h-[260px] flex flex-col justify-between">
                <p className="text-lg text-slate-900 leading-relaxed font-medium">
                  {transcript}
                </p>

                {isListening && (
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs text-teal-700 font-medium animate-pulse">
                    <Radio className="w-4 h-4" />
                    <span>Listening to speech input...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Mic className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-700">Transcript is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click Start Listening or add sample speech lines below to populate captions.
                </p>
              </div>
            )}
          </Card>

          {/* Quick Speech Simulator buttons */}
          <Card title="Simulate Conversation Samples" subtitle="Test caption display">
            <div className="flex flex-wrap gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSampleSentence('"Could you repeat the last point about the project deadline?"')}
              >
                + "Could you repeat..."
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSampleSentence('"The meeting will continue tomorrow at 10 AM in Room 3."')}
              >
                + "Meeting tomorrow..."
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSampleSentence('"Please let me know if you need any clarification."')}
              >
                + "Clarification..."
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Audio Hardware & Recognition Settings */}
        <div className="space-y-5">
          <Card title="Microphone Status" subtitle="Audio capture engine">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Engine State</span>
                <StatusIndicator
                  status={isListening ? 'active' : 'idle'}
                  label={isListening ? 'Streaming' : 'Ready'}
                />
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100">
                <span className="text-slate-600">Active Language</span>
                <span className="font-semibold text-slate-900">English (India) · en-IN</span>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100">
                <span className="text-slate-600">Confidence Metric</span>
                <span className="font-mono tabular-nums font-semibold text-emerald-700">97.4%</span>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100">
                <span className="text-slate-600">Continuous Punctuation</span>
                <span className="text-emerald-700 font-semibold">Enabled</span>
              </div>
            </div>
          </Card>

          <Card title="Accessibility Tips" subtitle="Optimal speech transcription">
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>Place the device within 1–2 meters of the speaking party.</li>
              <li>Face each other in a well-lit area to aid lip-reading alongside captions.</li>
              <li>Use the Two-Way Communication tab for bidirectional exchange.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
