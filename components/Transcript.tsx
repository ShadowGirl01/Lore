'use client'

import { useEffect, useMemo, useRef } from 'react';
import { Mic } from 'lucide-react';
import { Messages } from '@/types';

interface TranscriptProps {
  messages: Messages[];
  currentMessage: string;
  currentUserMessage: string;
}

const Transcript = ({ messages, currentMessage, currentUserMessage }: TranscriptProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const hasTranscriptContent = messages.length > 0 || currentMessage.length > 0 || currentUserMessage.length > 0;

  const transcriptMessages = useMemo(() => {
    const output = [...messages];

    if (currentUserMessage) {
      output.push({ role: 'user', content: currentUserMessage });
    }

    if (currentMessage) {
      output.push({ role: 'assistant', content: currentMessage });
    }

    return output;
  }, [messages, currentMessage, currentUserMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [transcriptMessages.length, currentMessage, currentUserMessage]);

  if (!hasTranscriptContent) {
    return (
      <div className="transcript-container">
        <div className="transcript-empty">
          <Mic className="size-12 text-[#212a3b] mb-4" />
          <h2 className="transcript-empty-text">No conversation yet</h2>
          <p className="transcript-empty-hint">Click the mic button above to start talking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transcript-container">
      <div className="transcript-messages">
        {transcriptMessages.map((message, index) => {
          const isAssistant = message.role === 'assistant';
          const isUser = message.role === 'user';
          const isStreaming =
            (isAssistant && currentMessage && index === transcriptMessages.length - 1) ||
            (isUser && currentUserMessage && index === transcriptMessages.length - 1);

          return (
            <div
              key={`${message.role}-${index}`}
              className={`transcript-message ${
                isUser ? 'transcript-message-user' : 'transcript-message-assistant'
              }`}
            >
              <div
                className={`transcript-bubble ${
                  isUser ? 'transcript-bubble-user' : 'transcript-bubble-assistant'
                }`}
              >
                {message.content}
                {isStreaming ? <span className="transcript-cursor" /> : null}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Transcript;
