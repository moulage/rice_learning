import { useCallback } from 'react';
import { cancelSpeech, speakText } from '@/domain/speech';
import { useSpeechVoice } from '@/hooks/useSpeechVoice';

interface SpeakButtonProps {
  text: string;
  speechText?: string;
  language: string;
  rate: number;
  volume: number;
  voiceURI?: string;
  pitch?: number;
}

export function SpeakButton({ text, speechText, language, rate, volume, voiceURI, pitch = 1.08 }: SpeakButtonProps) {
  const { voice } = useSpeechVoice(language, voiceURI);

  const speak = useCallback(() => {
    cancelSpeech();
    speakText({
      text: speechText ?? text,
      language,
      voice,
      voiceURI,
      rate,
      pitch,
      volume,
      letterPauses: language.startsWith('en') || Boolean(speechText),
    });
  }, [language, pitch, rate, speechText, text, voice, voiceURI, volume]);

  return (
    <button type="button" className="icon-button" onClick={speak} aria-label={`朗读：${text}`}>
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M4 9h3l5-4v14l-5-4H4z" fill="currentColor" />
        <path d="M16 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span>读给我听</span>
    </button>
  );
}
