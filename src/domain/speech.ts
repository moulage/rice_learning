export interface VoiceOption {
  uri: string;
  name: string;
  lang: string;
  localService: boolean;
  score: number;
  label: string;
}

const preferredPatterns: Array<{ pattern: RegExp; score: number; label?: string }> = [
  { pattern: /xiaoxiao|xiao[- ]?xiao/i, score: 1000, label: '晓晓 · 自然女老师音' },
  { pattern: /yunxi|xiao[- ]?yi/i, score: 960, label: '云希/小艺 · 自然老师音' },
  { pattern: /yunyang/i, score: 940, label: '云扬 · 播音老师音' },
  { pattern: /google.*(普通话|chinese|mandarin)|普通话.*google/i, score: 920, label: 'Google 中文普通话' },
  { pattern: /(premium|enhanced|natural|neural)/i, score: 900, label: '增强自然音' },
  { pattern: /ting[- ]?ting|婷婷/i, score: 820, label: '婷婷 · 中文普通话' },
  { pattern: /meijia|美佳/i, score: 640, label: '美佳 · 中文语音' },
  { pattern: /sinji|善怡/i, score: 600, label: '善怡 · 中文语音' },
];

const noveltyPattern = /eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/i;

function normalizeLang(lang: string): string {
  return lang.toLowerCase().replace('_', '-');
}

export function scoreVoice(voice: SpeechSynthesisVoice, language: string): number {
  const voiceLang = normalizeLang(voice.lang);
  const wantedLang = normalizeLang(language);
  const wantedBase = wantedLang.split('-')[0];
  const voiceBase = voiceLang.split('-')[0];

  if (voiceLang !== wantedLang || voiceBase !== wantedBase) return -1;

  let score = voiceLang === wantedLang ? 500 : 380;
  const preferred = preferredPatterns.find((item) => item.pattern.test(voice.name));
  if (preferred) score += preferred.score;
  else if (noveltyPattern.test(voice.name)) score -= 350;

  if (/neural|online|natural/i.test(voice.name)) score += 260;
  if (/enhanced|premium/i.test(voice.name)) score += 180;
  if (voice.localService) score += 40;
  if (/compact|eloquence/i.test(voice.name)) score -= 180;

  return score;
}

export function getVoiceOptions(language = 'zh-CN'): VoiceOption[] {
  if (typeof speechSynthesis === 'undefined') return [];
  const wantedBase = normalizeLang(language).split('-')[0];

  return speechSynthesis.getVoices()
    .filter((voice) => normalizeLang(voice.lang).split('-')[0] === wantedBase)
    .map((voice) => {
      const score = scoreVoice(voice, language);
      const preferred = preferredPatterns.find((item) => item.pattern.test(voice.name));
      const quality = /neural|online|natural/i.test(voice.name)
        ? '自然'
        : /enhanced|premium/i.test(voice.name)
          ? '增强'
          : voice.localService ? '本机' : '在线';
      return {
        uri: voice.voiceURI,
        name: voice.name,
        lang: voice.lang,
        localService: voice.localService,
        score,
        label: preferred?.label
          ? `${voice.name} · ${preferred.label} · ${quality}`
          : `${voice.name} · ${quality}`,
      };
    })
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name, 'zh-Hans-CN'));
}

export function selectPreferredVoice(
  voices: SpeechSynthesisVoice[],
  language: string,
  preferredVoiceURI?: string,
): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;
  if (preferredVoiceURI) {
    const selected = voices.find((voice) => voice.voiceURI === preferredVoiceURI);
    if (selected && scoreVoice(selected, language) >= 0) return selected;
  }
  return [...voices]
    .map((voice) => ({ voice, score: scoreVoice(voice, language) }))
    .filter((item) => item.score >= 0)
    .sort((left, right) => right.score - left.score)[0]?.voice;
}

export function splitSpeechText(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[。！？；])/g)
    .map((part) => part.trim())
    .filter(Boolean);
}
