import { describe, expect, it } from 'vitest';
import { toChinesePinyinSpeech } from '@/domain/pinyin-speech';

describe('Chinese pinyin speech', () => {
  it('reads single vowels as Chinese syllables', () => {
    expect(toChinesePinyinSpeech('a o e')).toBe('啊 喔 鹅');
  });

  it('reads initials as Chinese pinyin names', () => {
    expect(toChinesePinyinSpeech('b p m f')).toBe('波 坡 摸 佛');
    expect(toChinesePinyinSpeech('zh ch sh r')).toBe('知 吃 诗 日');
  });

  it('reads finals as Chinese pinyin names', () => {
    expect(toChinesePinyinSpeech('ai ei ui ao ou iu')).toBe('哀 欸 威 奥 欧 优');
  });

  it('keeps non-pinyin words unchanged', () => {
    expect(toChinesePinyinSpeech('PPT 互动课件')).toBe('PPT 互动课件');
  });
});
