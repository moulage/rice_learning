import { useEffect, useState } from 'react';
import { getVoiceOptions, selectPreferredVoice, type VoiceOption } from '@/domain/speech';

export function useSpeechVoice(language: string, preferredVoiceURI?: string) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>();
  const [options, setOptions] = useState<VoiceOption[]>([]);

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') return;

    const update = () => {
      const voices = speechSynthesis.getVoices();
      setOptions(getVoiceOptions(language));
      setVoice(selectPreferredVoice(voices, language, preferredVoiceURI));
    };

    update();
    speechSynthesis.addEventListener('voiceschanged', update);
    const timer = window.setTimeout(update, 240);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', update);
      window.clearTimeout(timer);
    };
  }, [language, preferredVoiceURI]);

  return { voice, options };
}
