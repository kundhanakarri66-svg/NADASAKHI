import React from 'react';
import { CommunicationMessage } from '../../types/communication.ts';
import { Mic, Hand } from 'lucide-react';

export interface ConversationBubbleProps {
  message: CommunicationMessage;
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-1.5 mb-1 px-1 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{message.senderName}</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono tabular-nums text-[11px]">{message.relativeTime}</span>
      </div>

      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
          isUser
            ? 'bg-teal-700 text-white rounded-tr-xs shadow-xs'
            : 'bg-slate-100 text-slate-900 rounded-tl-xs border border-slate-200/80'
        }`}
      >
        <p>{message.text}</p>
        <div
          className={`mt-2 pt-1.5 flex items-center gap-2 text-[11px] border-t ${
            isUser ? 'border-teal-600/60 text-teal-100' : 'border-slate-200 text-slate-500'
          }`}
        >
          {message.modality === 'speech_transcription' && (
            <span className="inline-flex items-center gap-1">
              <Mic className="w-3 h-3" /> Voice Caption
            </span>
          )}
          {message.modality === 'sign_recognition' && (
            <span className="inline-flex items-center gap-1">
              <Hand className="w-3 h-3" /> Recognized Sign
            </span>
          )}
          {message.modality === 'text' && <span>Typed Text</span>}
          {message.signGloss && (
            <span className="font-mono text-[10px] bg-black/10 px-1 py-0.5 rounded">
              [{message.signGloss}]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
