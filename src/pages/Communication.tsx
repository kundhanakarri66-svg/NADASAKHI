import React, { useState } from 'react';
import {
  Repeat,
  Send,
  Mic,
  Hand,
  Languages,
  User,
  Sparkles,
  Volume2,
  Info
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';
import { mockMessages } from '../data/mockMessages.ts';
import { CommunicationMessage } from '../types/communication.ts';

export const Communication: React.FC = () => {
  const [messages, setMessages] = useState<CommunicationMessage[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const [activeModality, setActiveModality] = useState<'text' | 'sign' | 'speech'>('text');

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: CommunicationMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: inputText.trim(),
      modality: activeModality === 'sign' ? 'sign_recognition' : 'text',
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now',
      signGloss: activeModality === 'sign' ? inputText.toUpperCase().slice(0, 20) : undefined
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const simulateCompanionReply = () => {
    const companionReplies = [
      "I hear you clearly! Let's proceed with that plan.",
      "Understood. Do you want me to write it down or keep speaking?",
      "Thank you! Everything is organized for our session."
    ];
    const replyText = companionReplies[Math.floor(Math.random() * companionReplies.length)];

    const replyMsg: CommunicationMessage = {
      id: `msg-${Date.now()}`,
      sender: 'hearing_companion',
      senderName: 'Companion (Speech)',
      text: replyText,
      modality: 'speech_transcription',
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now',
      confidence: 0.96
    };

    setMessages((prev) => [...prev, replyMsg]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Unified Bridge"
        title="Two-Way Communication"
        description="Unified conversational hub bridging sign language, speech transcription, and textual messaging into a seamless two-way dialogue."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={simulateCompanionReply}
            icon={<Mic className="w-4 h-4 text-teal-700" />}
          >
            Simulate Companion Speech
          </Button>
        }
      />

      {/* Step 1 Architecture Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <strong className="font-semibold text-teal-950">Step 1 Architecture Preview:</strong>{' '}
          Conversation stream models and multi-modal message dispatchers are structured. Real-time WebRTC or WebSocket sync and direct camera/mic speech bridges will be integrated in Step 2.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chat Conversation Stream (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[600px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Conversation Stream Header */}
          <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-xs font-semibold text-slate-800">
                Active Session · Direct Channel
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {messages.length} messages
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{msg.senderName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-[11px]">{msg.relativeTime}</span>
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-teal-700 text-white rounded-tr-xs shadow-xs'
                        : 'bg-slate-100 text-slate-900 rounded-tl-xs border border-slate-200/80'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Modality Metadata footer inside bubble */}
                    <div
                      className={`mt-2 pt-1.5 flex items-center gap-2 text-[11px] border-t ${
                        isUser
                          ? 'border-teal-600/60 text-teal-100'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {msg.modality === 'speech_transcription' && (
                        <span className="inline-flex items-center gap-1">
                          <Mic className="w-3 h-3" /> Voice Caption
                        </span>
                      )}
                      {msg.modality === 'sign_recognition' && (
                        <span className="inline-flex items-center gap-1">
                          <Hand className="w-3 h-3" /> Recognized Sign
                        </span>
                      )}
                      {msg.modality === 'text' && (
                        <span>Typed Text</span>
                      )}
                      {msg.signGloss && (
                        <span className="font-mono text-[10px] bg-black/10 px-1 py-0.5 rounded">
                          [{msg.signGloss}]
                        </span>
                      )}
                      {msg.confidence !== undefined && (
                        <span className="font-mono tabular-nums">
                          {Math.round(msg.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box Footer */}
          <div className="p-4 border-t border-slate-200 bg-white">
            {/* Modality Selector Bar */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-slate-600">Send as:</span>
              <button
                type="button"
                onClick={() => setActiveModality('text')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  activeModality === 'text'
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => setActiveModality('sign')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  activeModality === 'sign'
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sign Recognition
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeModality === 'sign'
                    ? 'Type sign sentence (e.g. YES READY)...'
                    : 'Type a message to communicate...'
                }
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-teal-700 focus:border-teal-700"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!inputText.trim()}
                icon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Multi-Modal Quick Assist Panels (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="Speech-to-Text Input" subtitle="Hearing companion speaks here">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-2">
                <Mic className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Companion Speech Transcriber
              </p>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                Live transcription will append directly into this session stream.
              </p>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={simulateCompanionReply}
              >
                Simulate Voice Input
              </Button>
            </div>
          </Card>

          <Card title="Sign-to-Text Camera" subtitle="Recognize signs in conversation">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-2">
                <Hand className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Camera Gesture Recognition
              </p>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                MediaPipe hand landmarks track gestures and translate to text.
              </p>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  setInputText('THANK YOU VERY MUCH');
                  setActiveModality('sign');
                }}
              >
                Insert Gesture "THANK YOU"
              </Button>
            </div>
          </Card>

          <Card title="Text-to-Sign Avatar" subtitle="Display signs to companion">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-2">
                <Languages className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Avatar Sign Playback
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Converts outgoing messages into visual animations for sign learners.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
