import { useCallback } from 'react';
import { selectPreferredVoice, splitSpeechText } from '@/domain/speech';
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
    if (typeof speechSynthesis === 'undefined') return;
    const selectedVoice = voice ?? selectPreferredVoice(speechSynthesis.getVoices(), language, voiceURI);
    speechSynthesis.cancel();

    splitSpeechText(speechText ?? text).forEach((part) => {
      const utterance = new SpeechSynthesisUtterance(part);
      utterance.lang = selectedVoice?.lang ?? language;
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      speechSynthesis.speak(utterance);
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
