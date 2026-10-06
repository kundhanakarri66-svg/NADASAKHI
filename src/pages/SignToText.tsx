import React, { useState } from 'react';
import {
  Camera,
  CameraOff,
  Hand,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { StatusIndicator } from '../components/common/StatusIndicator.tsx';

export const SignToText: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState('HELLO! HOW CAN I ASSIST TODAY?');
  const [currentGloss, setCurrentGloss] = useState('HELLO ASSIST TODAY');
  const [confidence, setConfidence] = useState(0.93);
  const [copied, setCopied] = useState(false);

  const toggleCamera = () => {
    setCameraActive((prev) => !prev);
  };

  const handleClear = () => {
    setRecognizedText('');
    setCurrentGloss('');
    setConfidence(0);
  };

  const handleCopy = () => {
    if (recognizedText) {
      navigator.clipboard.writeText(recognizedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSampleSign = (gloss: string, text: string, conf: number) => {
    setCurrentGloss(gloss);
    setRecognizedText(text);
    setConfidence(conf);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Computer Vision"
        title="Sign-to-Text"
        description="Use your camera to convert sign language into text. Real-time vision recognizes hand gestures and transcribes them into readable sentences."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={cameraActive ? 'danger' : 'primary'}
              size="md"
              icon={cameraActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
              onClick={toggleCamera}
            >
              {cameraActive ? 'Stop Camera' : 'Start Camera'}
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleClear}
              disabled={!recognizedText}
            >
              Clear
            </Button>
          </div>
        }
      />

      {/* Step 1 Architecture Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <strong className="font-semibold text-teal-950">Step 1 Architecture Preview:</strong>{' '}
          Camera streams, hand landmark layout containers, and confidence scoring elements are prepared. MediaPipe Hand Landmarker (21 3D points per hand) and classification models will be wired in Step 2.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Camera Viewport Container */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-0 overflow-hidden bg-slate-900 text-white border-slate-800">
            <div className="relative aspect-video w-full flex flex-col items-center justify-center bg-slate-950">
              {cameraActive ? (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-900/90">
                  {/* Simulated Hand Landmark Mesh Placeholder Grid */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                    <div className="w-48 h-48 border-2 border-teal-400 border-dashed rounded-full flex items-center justify-center">
                      <span className="text-teal-300 text-xs">Hand Tracking Target Zone</span>
                    </div>
                  </div>

                  <div className="text-center p-6 z-10">
                    <Hand className="w-12 h-12 text-teal-400 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm font-semibold text-white">
                      Camera Stream Active (Preview)
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Hold hand within view. MediaPipe landmark detector will track 21 hand joints in Step 2.
                    </p>
                  </div>

                  {/* Overlay HUD indicators */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] font-mono text-teal-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>30 FPS · 640x480</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] text-slate-300">
                    Mode: Indian Sign Language (ISL)
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-200">
                    Camera is currently off
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                    Click Start Camera to initialize video capture for real-time sign recognition.
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={toggleCamera}
                    icon={<Camera className="w-4 h-4" />}
                  >
                    Start Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Bottom Bar inside Camera Card */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Vision Pipeline:</span>
                <span className="text-teal-400 font-medium">
                  {cameraActive ? 'MediaPipe Ready (Standby)' : 'Idle'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Handedness:</span>
                <span className="text-slate-300">Auto-Detect (Left / Right)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Recognition Result & Confidence */}
        <div className="space-y-5">
          <Card
            title="Recognition Output"
            subtitle="Translated sign language text"
            headerAction={
              recognizedText && (
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-500 hover:text-teal-700 rounded-md transition-colors cursor-pointer flex items-center gap-1 text-xs"
                  title="Copy text"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )
            }
          >
            {recognizedText ? (
              <div className="space-y-4">
                <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                    English Translation
                  </span>
                  <p className="text-lg font-bold text-slate-900 leading-snug">
                    "{recognizedText}"
                  </p>

                  {currentGloss && (
                    <div className="mt-3 pt-2 border-t border-teal-200/50 text-xs text-slate-600">
                      <span className="font-semibold text-teal-800">Detected Gloss:</span>{' '}
                      <span className="font-mono text-slate-700">[{currentGloss}]</span>
                    </div>
                  )}
                </div>

                {/* Confidence Indicator */}
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                    <span className="font-medium">Model Confidence</span>
                    <span className="font-mono tabular-nums font-bold text-teal-700">
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-700 h-full rounded-full transition-all duration-300"
                      style={{ width: `${confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Scores over 80% indicate high statistical certainty.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-slate-600">No signs recognized yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Start the camera and sign within frame to generate text.
                </p>
              </div>
            )}
          </Card>

          {/* Quick Sample Signs for Testing UI */}
          <Card title="Quick Sample Signs" subtitle="Test the preview cards">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleSign('HELLO', 'Hello, good morning!', 0.95)}
              >
                👋 Hello
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleSign('THANK YOU', 'Thank you very much.', 0.91)}
              >
                🙏 Thank You
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleSign('PLEASE HELP', 'Please help me.', 0.94)}
              >
                🆘 Help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleSign('WATER PLEASE', 'Can I have some water?', 0.88)}
              >
                💧 Water
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
