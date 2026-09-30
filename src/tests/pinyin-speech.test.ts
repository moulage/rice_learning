import { describe, expect, it } from 'vitest';
import { buildSpeechCues } from '@/domain/speech';
import { toChinesePinyinSpeech } from '@/domain/pinyin-speech';

describe('Chinese pinyin speech', () => {
  it('reads single vowels as Chinese syllables', () => {
    expect(toChinesePinyinSpeech('a o e')).toBe('啊，喔，鹅，');
  });

  it('reads initials as Chinese pinyin names', () => {
    expect(toChinesePinyinSpeech('b p m f')).toBe('波，坡，摸，佛，');
    expect(toChinesePinyinSpeech('zh ch sh r')).toBe('知，吃，诗，日，');
  });

  it('reads finals as Chinese pinyin names', () => {
    expect(toChinesePinyinSpeech('ai ei ui ao ou iu')).toBe('哀，欸，威，奥，欧，优，');
  });

  it('keeps non-pinyin words unchanged', () => {
    expect(toChinesePinyinSpeech('PPT 互动课件')).toBe('PPT 互动课件');
  });

  it('adds clear pauses around pinyin cues', () => {
    const cues = buildSpeechCues(toChinesePinyinSpeech('a o e'), 'zh-CN', true);
    expect(cues.map((cue) => cue.text)).toEqual(['啊', '喔', '鹅']);
    expect(cues.every((cue) => cue.pauseBeforeMs >= 200)).toBe(true);
    expect(cues.every((cue) => cue.pauseAfterMs >= 400)).toBe(true);
  });

  it('adds clear pauses around English letters', () => {
    const cues = buildSpeechCues('A B C', 'en-US', true);
    expect(cues.map((cue) => cue.text)).toEqual(['A', 'B', 'C']);
    expect(cues.every((cue) => cue.pauseBeforeMs >= 200)).toBe(true);
    expect(cues.every((cue) => cue.pauseAfterMs >= 400)).toBe(true);
  });
});
