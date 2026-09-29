import { useCallback } from 'react';

interface SpeakButtonProps {
  text: string;
  language: string;
  rate: number;
  volume: number;
}

export function SpeakButton({ text, language, rate, volume }: SpeakButtonProps) {
  const speak = useCallback(() => {
    if (typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.volume = volume;
    speechSynthesis.speak(utterance);
  }, [language, rate, text, volume]);

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
