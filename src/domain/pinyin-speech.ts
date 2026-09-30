const initials: Array<[string, string]> = [
  ['zh', '知'],
  ['ch', '吃'],
  ['sh', '诗'],
  ['b', '波'],
  ['p', '坡'],
  ['m', '摸'],
  ['f', '佛'],
  ['d', '得'],
  ['t', '特'],
  ['n', '讷'],
  ['l', '勒'],
  ['g', '哥'],
  ['k', '科'],
  ['h', '喝'],
  ['j', '鸡'],
  ['q', '七'],
  ['x', '西'],
  ['r', '日'],
  ['z', '资'],
  ['c', '雌'],
  ['s', '思'],
  ['y', '衣'],
  ['w', '乌'],
];

const finals: Array<[string, string]> = [
  ['ai', '哀'],
  ['ei', '欸'],
  ['ui', '威'],
  ['ao', '奥'],
  ['ou', '欧'],
  ['iu', '优'],
  ['ie', '耶'],
  ['üe', '约'],
  ['er', '而'],
  ['an', '安'],
  ['en', '恩'],
  ['in', '因'],
  ['un', '温'],
  ['ün', '晕'],
  ['ang', '昂'],
  ['eng', '鞥'],
  ['ing', '英'],
  ['ong', '翁'],
];

const singleLetters = new Map([
  ['a', '啊'],
  ['o', '喔'],
  ['e', '鹅'],
  ['i', '衣'],
  ['u', '乌'],
  ['ü', '鱼'],
]);

const syllables = new Map<string, string>([
  ...singleLetters,
  ['ba', '八'],
  ['pa', '爬'],
  ['ma', '妈'],
  ['fa', '发'],
  ['da', '大'],
  ['ta', '他'],
  ['na', '拿'],
  ['la', '拉'],
  ['ga', '嘎'],
  ['ka', '卡'],
  ['ha', '哈'],
  ['ji', '鸡'],
  ['qi', '七'],
  ['xi', '西'],
  ['zhi', '知'],
  ['chi', '吃'],
  ['shi', '诗'],
  ['ri', '日'],
  ['zi', '资'],
  ['ci', '雌'],
  ['si', '思'],
  ['yi', '一'],
  ['wu', '五'],
  ...finals,
]);

const toneSpecificSyllables = new Map<string, string>([
  ['ma1', '妈'],
  ['ma2', '麻'],
  ['ma3', '马'],
  ['ma4', '骂'],
  ['ba1', '八'],
  ['ba2', '拔'],
  ['ba3', '把'],
  ['ba4', '爸'],
]);

const toneNames = ['一声', '二声', '三声', '四声'];
const pinyinTokenPattern = /(?<![A-Za-z])(zh|ch|sh|ai|ei|ui|ao|ou|iu|ie|üe|er|an|en|in|un|ün|ang|eng|ing|ong|b|p|m|f|d|t|n|l|g|k|h|j|q|x|r|z|c|s|y|w|a|o|e|i|u|ü)(?![A-Za-z])/gi;
const accentedTokenPattern = /(?<![A-Za-z])[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]{1,4}(?![A-Za-z])/gi;

function normalizeBase(value: string): string {
  if (/[üǖǘǚǜ]/i.test(value)) return 'ü';
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function replaceAccentedToken(token: string): string {
  const lower = token.toLowerCase();
  const base = normalizeBase(lower);
  const decomposed = lower.normalize('NFD');
  const toneMark = decomposed.match(/[\u0304\u0301\u030c\u0300]/)?.[0];
  const tone = toneMark ? ['\u0304', '\u0301', '\u030c', '\u0300'].indexOf(toneMark) + 1 : null;
  const toneWord = tone ? toneNames[tone - 1] : '';
  const toneSpecific = toneSpecificSyllables.get(`${base}${tone ?? ''}`);
  if (toneSpecific) return toneSpecific;

  const baseWord = syllables.get(base);
  if (!baseWord) return token;
  return tone ? `${baseWord}${toneWord}` : baseWord;
}

function replacePlainToken(token: string): string {
  const lower = token.toLowerCase();
  return syllables.get(lower)
    ?? initials.find(([key]) => key === lower)?.[1]
    ?? finals.find(([key]) => key === lower)?.[1]
    ?? singleLetters.get(lower)
    ?? token;
}

export function toChinesePinyinSpeech(text: string): string {
  return text
    .replace(accentedTokenPattern, (token) => {
      if (!/[\u0304\u0301\u030c\u0300]/.test(token.normalize('NFD'))) return token;
      return replaceAccentedToken(token);
    })
    .replace(pinyinTokenPattern, (token) => replacePlainToken(token));
}
