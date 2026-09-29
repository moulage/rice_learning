import type {
  Lesson,
  LessonSegment,
  LessonTask,
  Subject,
  TaskType,
} from '../domain/types';
import { scenes } from './scenes';

interface TaskSeed {
  type?: TaskType;
  prompt: string;
  choices?: [string, string, string];
  answerIndex?: 0 | 1 | 2;
  hint: string;
  coaching: string;
  knowledgeIndex?: number;
}

interface TopicSeed {
  title: string;
  knowledgeIds: string[];
  objectives: string[];
  practice: [TaskSeed, TaskSeed];
  application: [TaskSeed, TaskSeed];
}

interface CoursePlan {
  week: number;
  math: TopicSeed;
  pinyin: TopicSeed;
  english: TopicSeed;
  integrated: TopicSeed;
}

function choice(
  prompt: string,
  choices: [string, string, string],
  answerIndex: 0 | 1 | 2,
  hint: string,
  coaching: string,
  knowledgeIndex = 0,
): TaskSeed {
  return { type: 'choice', prompt, choices, answerIndex, hint, coaching, knowledgeIndex };
}

function audioChoice(
  prompt: string,
  choices: [string, string, string],
  answerIndex: 0 | 1 | 2,
  hint: string,
  coaching: string,
  knowledgeIndex = 0,
): TaskSeed {
  return { type: 'audio-choice', prompt, choices, answerIndex, hint, coaching, knowledgeIndex };
}

function say(
  prompt: string,
  hint: string,
  coaching: string,
  knowledgeIndex = 0,
): TaskSeed {
  return { type: 'recording', prompt, hint, coaching, knowledgeIndex };
}

function topic(
  title: string,
  knowledgeIds: string[],
  objectives: string[],
  practice: [TaskSeed, TaskSeed],
  application: [TaskSeed, TaskSeed],
): TopicSeed {
  return { title, knowledgeIds, objectives, practice, application };
}

const coursePlans: CoursePlan[] = [
  {
    week: 1,
    math: topic(
      '0-20数感快速校验', ['MATH-NUMBER-0-20'], ['能按顺序读出0-20', '能认读15和20', '能比较18与12'],
      [
        choice('哪个数是15？', ['13', '15', '17'], 1, '先数到15，再看十位和个位。', '你能稳定认读十几的数。'),
        audioChoice('听一听，先数10再数6，一共是多少？', ['14', '15', '16'], 2, '10加6可以从10继续数。', '你会把10和6合起来找总数。'),
      ],
      [
        choice('钟楼门牌上18和12哪个大？', ['12', '18', '一样大'], 1, '先比十位。', '你能先看十位比较大小。'),
        say('在钟楼前用0-20中的一个数说一句话。', '可以说钟楼有多少层、门牌号或人数。', '你能把数字用在生活中。'),
      ],
    ),
    pinyin: topic(
      'a o e i u ü和四声', ['PINYIN-VOWEL-A', 'PINYIN-VOWEL-O', 'PINYIN-VOWEL-E', 'PINYIN-VOWEL-I', 'PINYIN-VOWEL-U', 'PINYIN-VOWEL-U-UMLAUT', 'PINYIN-TONES'], ['能认读六个单韵母', '能区分u和ü', '能读四个声调'],
      [
        audioChoice('听一听，哪个是 o？', ['a', 'o', 'e'], 1, '把嘴唇拢圆读o。', '你能听出o的圆唇音。', 1),
        choice('哪个字母读“鱼”的音？', ['u', 'ü', 'i'], 1, 'ü像i，但嘴唇要拢圆。', '你能区分u和ü。', 5),
      ],
      [
        choice('mā的调号是第几声？', ['第一声', '第二声', '第三声'], 0, '第一声平而高。', '你能读准第一声。', 6),
        say('在钟楼门牌前读a、o、e、i、u、ü。', '一个一个读，注意u和ü的嘴形。', '你能认读六个单韵母。'),
      ],
    ),
    english: topic(
      'A B C', ['ENGLISH-LETTER-A', 'ENGLISH-LETTER-B', 'ENGLISH-LETTER-C'], ['能认读A B C大小写', '能听字母名', '能选apple首音图'],
      [
        audioChoice('听一听，哪个是B？', ['A', 'B', 'C'], 1, 'B的字母名读bee。', '你能听出字母B。', 1),
        choice('apple的首音卡片是？', ['Aa', 'Bb', 'Cc'], 0, 'apple从a开始。', '你能找到apple的首音。', 0),
      ],
      [
        choice('在钟楼纪念品中，bag的首音是？', ['Aa', 'Bb', 'Cc'], 1, 'bag从b开始。', '你能把字母和物品连接。', 1),
        say('向卡通游客介绍A、B、C。', '先说字母名，再说一个首音词。', '你能认读字母并开口表达。'),
      ],
    ),
    integrated: topic(
      '长安初访综合任务', ['MATH-NUMBER-0-20', 'PINYIN-TONES', 'ENGLISH-LETTER-A', 'ENGLISH-LETTER-B'], ['能用数卡描述钟楼', '能读地点音节调号', '能用字母开启长安词卡'],
      [
        choice('钟楼数字卡18和12，哪个表示更大人数？', ['12', '18', '一样大'], 1, '先比十位再比个位。', '你能用数学比较情境数量。'),
        audioChoice('听一听，哪个是第一声mā？', ['mā', 'má', 'mǎ'], 0, '第一声平而高。', '你能听辨声调。', 1),
      ],
      [
        choice('长安字母卡的bag首音是？', ['Aa', 'Bb', 'Cc'], 1, 'bag从b开始。', '你能综合使用字母和物品。', 3),
        say('在钟楼完成一张学习卡：说一个数、一个拼音和一个英语字母。', '可以先想一想数、字和字母。', '你完成了长安第一张综合卡。'),
      ],
    ),
  },
  {
    week: 2,
    math: topic(
      '100以内数序', ['MATH-NUMBER-100-SEQUENCE'], ['能说出39后面的数', '能说出68的组成', '能比较两位数'],
      [
        choice('39后面数到多少？', ['40', '41', '50'], 0, '几十九后面进入下一个整十数。', '你掌握整十数之间的过渡。'),
        choice('68里面有6个十和几个一？', ['6个一', '7个一', '8个一'], 2, '个位是几就有几个一。', '你能用位置值解释68。'),
      ],
      [
        choice('鼓楼游览册中73、70、37谁最大？', ['37', '70', '73'], 2, '先看十位再看个位。', '你能比较两位数。'),
        say('从鼓楼出发，用“先、再”说两段路线。', '可以先说走到哪，再说下一步。', '你能按顺序描述路线。'),
      ],
    ),
    pinyin: topic(
      'g k h', ['PINYIN-INITIAL-G', 'PINYIN-INITIAL-K', 'PINYIN-INITIAL-H'], ['能认读g k h', '能听辨g和k', '能拼读g-u-a'],
      [
        audioChoice('听一听，哪个是k？', ['g', 'k', 'h'], 1, 'k送气更强。', '你能听辨g和k。', 1),
        choice('g-u-a是几拼音节？', ['两拼', '三拼', '不是音节'], 1, '中间有介母u。', '你能找到三拼音节中的介母。', 0),
      ],
      [
        choice('鼓楼拼音卡的g-u-a连读是？', ['ga', 'gua', 'ga-u-a'], 1, 'u要顺滑带过。', '你能拼读三拼音节。', 0),
        say('在鼓楼读g、k、h和音节gua。', 'k的气流比g强。', '你能认读并拼读这三个声母。'),
      ],
    ),
    english: topic(
      'D E F', ['ENGLISH-LETTER-D', 'ENGLISH-LETTER-E', 'ENGLISH-LETTER-F'], ['能认读D E F大小写', '能听字母名', '能选egg首音图'],
      [
        audioChoice('听一听，哪个是E？', ['D', 'E', 'F'], 1, 'E的字母名读长i音。', '你能听出字母E。', 1),
        choice('egg的首音卡片是？', ['Dd', 'Ee', 'Ff'], 1, 'egg从e开始。', '你能找到egg的首音。', 1),
      ],
      [
        choice('鼓楼商店的fish卡首音是？', ['Dd', 'Ee', 'Ff'], 2, 'fish从f开始。', '你能匹配首音和字母。', 2),
        say('在鼓楼用D、E、F和卡通游客打招呼后介绍一张词卡。', '可以说D is for...。', '你能用字母做简单介绍。'),
      ],
    ),
    integrated: topic(
      '鼓楼观察综合任务', ['MATH-NUMBER-100-SEQUENCE', 'PINYIN-INITIAL-G', 'ENGLISH-LETTER-F'], ['能用100以内数比较鼓楼物品', '能读g开头的拼音卡', '能说fish的首音'],
      [
        choice('鼓楼纪念册第39页后面是第几页？', ['40', '41', '50'], 0, '几十九后面是整十数。', '你能用数序找页码。'),
        choice('gua是几拼音节？', ['两拼', '三拼', '四拼'], 1, '中间有介母u。', '你能判断三拼音节。', 1),
      ],
      [
        choice('鼓楼英语卡fish的首音是？', ['Dd', 'Ee', 'Ff'], 2, 'fish从f开始。', '你能完成英语首音任务。', 2),
        say('在鼓楼完成观察卡：说一个页码、一个拼音音节和一个英语词。', '按数学、拼音、英语顺序说。', '你完成了三科综合观察任务。'),
      ],
    ),
  },
  {
    week: 3,
    math: topic(
      '20以内进位加法', ['MATH-ADDITION-20-CARRY'], ['能用凑十法算9加几', '能解释8+5的思路', '能检查得数'],
      [
        choice('9+4等于多少？', ['12', '13', '14'], 1, '先给9凑1变成10，再加3。', '你会用凑十法算进位加法。'),
        choice('8+5可以怎样想？', ['8+2+3', '8+1+4', '5+1+4'], 0, '把5分成2和3，先把8补成10。', '你能把加数分开来凑十。'),
      ],
      [
        choice('城墙上7+6的得数是？', ['11', '12', '13'], 2, '可以把6分成3和3。', '你能继续用凑十思路解题。'),
        say('在城墙上向同伴解释9+4怎样凑十。', '先说9+1=10，再说10+3。', '你能清楚表达计算思路。'),
      ],
    ),
    pinyin: topic(
      'j q x', ['PINYIN-INITIAL-J', 'PINYIN-INITIAL-Q', 'PINYIN-INITIAL-X'], ['能认读j q x', '能听辨j和q', '能知道j q x后ü写两点省略'],
      [
        audioChoice('听一听，哪个是q？', ['j', 'q', 'x'], 1, 'q送气更强。', '你能听辨j和q。', 1),
        choice('ju里的u原来表示？', ['u', 'ü', 'i'], 1, 'j q x和ü相拼时省写两点。', '你记住了ü的省写规则。', 0),
      ],
      [
        choice('城墙拼音卡x-i-a连读是？', ['xia', 'sha', 'sia'], 0, '中间介母i要顺滑带过。', '你能拼读三拼音节。', 2),
        say('在城墙读j、q、x和音节jia、qia、xia。', '先准备声母，再连读韵母。', '你能认读并拼读这三个声母。'),
      ],
    ),
    english: topic(
      'G和A-F复习', ['ENGLISH-LETTER-G', 'ENGLISH-LETTER-A', 'ENGLISH-LETTER-D'], ['能认读Gg', '能区分G和J读音', '能复习A-F'],
      [
        audioChoice('听一听，哪个是G？', ['G', 'J', 'D'], 0, 'G读jee。', '你能区分G和J。', 0),
        choice('goat的首音卡片是？', ['Gg', 'Dd', 'Aa'], 0, 'goat从g开始。', '你能找到goat的首音。', 0),
      ],
      [
        choice('城墙英语卡gate的首音是？', ['Gg', 'Jj', 'Dd'], 0, 'gate从g开始。', '你能复习G的首音。', 0),
        say('在城墙上按顺序说出A到G。', '可以边指卡片边说。', '你能巩固A-G字母名。'),
      ],
    ),
    integrated: topic(
      '城墙图形与字母任务', ['MATH-ADDITION-20-CARRY', 'PINYIN-INITIAL-X', 'ENGLISH-LETTER-G'], ['能用凑十法算城墙上的人数', '能读xia', '能说gate的首音'],
      [
        choice('8+5表示两边游客合起来，得数是？', ['12', '13', '14'], 1, '先凑十再加余数。', '你能解决城墙情境加法。'),
        choice('x-i-a的介母是？', ['x', 'i', 'a'], 1, 'i夹在中间。', '你能找到介母。', 1),
      ],
      [
        choice('gate的首音卡片是？', ['Gg', 'Jj', 'Dd'], 0, 'gate从g开始。', '你能完成英语首音任务。', 2),
        say('在城墙完成创作卡：画图案并说一个算式、一个拼音节、一个英语词。', '可以用砖缝、旗帜或游客做例子。', '你完成了长安创作卡。'),
      ],
    ),
  },
  {
    week: 4,
    math: topic(
      '20以内退位减法', ['MATH-SUBTRACTION-20-DECOMPOSE'], ['能用破十法算15-8', '能解释13-6的思路', '能判断得数是否合理'],
      [
        choice('15-8等于多少？', ['6', '7', '8'], 1, '把15分成10和5，先算10-8。', '你会用破十法解决退位减法。'),
        choice('13-6可以怎样想？', ['10-6再加3', '13-3再减2', '6+13'], 0, '先从10里减6，再把剩下加上。', '你能清楚说出破十步骤。'),
      ],
      [
        choice('大雁塔前14-7的结果是？', ['6', '7', '8'], 1, '把14分成10和4。', '你能用小棒帮助检查得数。'),
        say('在大雁塔前解释15-8怎样破十。', '先说10-8=2，再说5+2。', '你能把思考过程说清楚。'),
      ],
    ),
    pinyin: topic(
      'zh ch sh r', ['PINYIN-INITIAL-ZH', 'PINYIN-INITIAL-CH', 'PINYIN-INITIAL-SH', 'PINYIN-INITIAL-R'], ['能认读zh ch sh r', '能听辨zh和z', '能跟读翘舌音'],
      [
        audioChoice('听一听，哪个是zh？', ['z', 'zh', 's'], 1, 'zh的舌尖要翘起。', '你能区分平舌和翘舌。', 0),
        choice('城墙的“城”开头声母是？', ['c', 'ch', 'sh'], 1, 'ch是送气翘舌音。', '你能把生活词和声母连接。', 1),
      ],
      [
        choice('大雁塔拼音卡rì的声母是？', ['l', 'r', 'n'], 1, 'r是翘舌音。', '你能认读r开头的音节。', 3),
        say('在大雁塔读zh、ch、sh、r。', '舌尖轻轻翘起。', '你能读准四个翘舌音。'),
      ],
    ),
    english: topic(
      'H I J', ['ENGLISH-LETTER-H', 'ENGLISH-LETTER-I', 'ENGLISH-LETTER-J'], ['能认读H I J', '能听辨G和J', '能选igloo首音图'],
      [
        audioChoice('听一听，哪个是J？', ['G', 'H', 'J'], 2, 'J读jay。', '你能听清G和J。', 2),
        choice('igloo的首音卡片是？', ['Hh', 'Ii', 'Jj'], 1, 'igloo从i开始。', '你能找到I的首音。', 1),
      ],
      [
        choice('大雁塔词卡hat的首音是？', ['Hh', 'Jj', 'Ii'], 0, 'hat从h开始。', '你能匹配H和hat。', 0),
        say('在大雁塔说H、I、J和一个英语首音词。', 'J要和G分开。', '你能继续完成字母学习。'),
      ],
    ),
    integrated: topic(
      '大雁塔排序综合任务', ['MATH-SUBTRACTION-20-DECOMPOSE', 'PINYIN-INITIAL-ZH', 'ENGLISH-LETTER-H'], ['能用减法求剩余游客', '能读zhōng', '能说hat的首音'],
      [
        choice('14人中有7人先上塔，还剩几人？', ['6', '7', '8'], 1, '用14-7算剩余。', '你能解决求剩余问题。'),
        audioChoice('听一听，哪个是zhōng？', ['zōng', 'zhōng', 'zhǒng'], 1, '翘舌音加第一声。', '你能读准翘舌音节。', 1),
      ],
      [
        choice('hat的首音卡片是？', ['Hh', 'Jj', 'Ii'], 0, 'hat从h开始。', '你能完成英语首音任务。', 2),
        say('在大雁塔安排三张参观卡并说明理由。', '可以说先看什么，再看什么。', '你能完成排序与表达任务。'),
      ],
    ),
  },
  {
    week: 5,
    math: topic(
      '加减法生活应用', ['MATH-ADD-SUB-APPLICATION'], ['能判断求一共用加法', '能判断求还剩用减法', '能说出答案单位'],
      [
        choice('8人加5人，一共有多少人？', ['12人', '13人', '14人'], 1, '一共表示合起来。', '你能根据题意选择加法。'),
        choice('12块糖吃掉4块，还剩多少块？', ['7块', '8块', '9块'], 1, '去掉一部分用减法。', '你能用还剩的数量检查答案。'),
      ],
      [
        choice('小雁塔队列原来9人，走3人，现在几人？', ['5人', '6人', '7人'], 1, '走就是去掉。', '你能把生活事件变成算式。'),
        say('用一句话说出小雁塔人数应用题和答案。', '可以说原来、来了或走了。', '你能完整表达应用题。'),
      ],
    ),
    pinyin: topic(
      'ai ei ui', ['PINYIN-FINAL-AI', 'PINYIN-FINAL-EI', 'PINYIN-FINAL-UI'], ['能认读ai ei ui', '能听辨ai和ei', '能给音节标调'],
      [
        audioChoice('听一听，哪个是ai？', ['ai', 'ei', 'ui'], 0, 'ai从a滑到i。', '你能听清复韵母方向。', 0),
        choice('“水”的韵母是？', ['ui', 'iu', 'ei'], 0, 'ui是uei的缩写。', '你能认读ui音节。', 2),
      ],
      [
        choice('小雁塔拼音卡bèi的韵母是？', ['ai', 'ei', 'ie'], 1, 'bei从e滑向i。', '你能拼读含ei的音节。', 1),
        say('在小雁塔读ai、ei、ui和词卡shuǐ。', '先读韵母，再读音节。', '你能巩固三个复韵母。'),
      ],
    ),
    english: topic(
      'K L M', ['ENGLISH-LETTER-K', 'ENGLISH-LETTER-L', 'ENGLISH-LETTER-M'], ['能认读K L M', '能听字母名', '能选moon首音图'],
      [
        audioChoice('听一听，哪个是K？', ['J', 'K', 'L'], 1, 'K读kay。', '你能听出字母K。', 0),
        choice('moon的首音卡片是？', ['Ll', 'Mm', 'Kk'], 1, 'moon从m开始。', '你能匹配M和moon。', 2),
      ],
      [
        choice('小雁塔词卡leaf的首音是？', ['Kk', 'Ll', 'Mm'], 1, 'leaf从l开始。', '你能找到L的首音。', 1),
        say('在小雁塔说K、L、M和moon的首音。', '先说字母名再说首音。', '你能分开字母名和首音。'),
      ],
    ),
    integrated: topic(
      '小雁塔比较综合任务', ['MATH-ADD-SUB-APPLICATION', 'PINYIN-FINAL-UI', 'ENGLISH-LETTER-M'], ['能用加减法比较人数', '能读shuǐ', '能说moon的首音'],
      [
        choice('两处各有12人和8人，第一处多几人？', ['3人', '4人', '5人'], 1, '用12-8比较。', '你能解决情境比较问题。'),
        choice('shuǐ的韵母是？', ['ui', 'iu', 'ei'], 0, 'ui要完整读。', '你能拼读复韵母。', 1),
      ],
      [
        choice('moon的首音卡片是？', ['Ll', 'Mm', 'Kk'], 1, 'moon从m开始。', '你能完成英语首音任务。', 2),
        say('在小雁塔比较高低，并用拼音和英语说一张观察卡。', '可以用“高”“水”和moon做线索。', '你完成了跨学科观察卡。'),
      ],
    ),
  },
  {
    week: 6,
    math: topic(
      '规律、分类和统计', ['MATH-PATTERN-CLASSIFY-DATA'], ['能继续简单重复规律', '能按用途分类', '能读统计表数量'],
      [
        choice('红、蓝、红、蓝、红，下一个是什么？', ['红色', '蓝色', '绿色'], 1, '两个一组重复出现。', '你发现了重复排列规律。'),
        choice('铅笔、橡皮、尺子可以归为哪一类？', ['文具', '动物', '交通工具'], 0, '想它们在哪里使用。', '你能按用途分类。'),
      ],
      [
        choice('碑林记录表中喜欢苹果5人、梨3人，苹果多几人？', ['1人', '2人', '3人'], 1, '用5-3比较。', '你能比较统计数量。'),
        say('在碑林按颜色或形状给三块图案分类。', '先说分类标准。', '你能说清分类理由。'),
      ],
    ),
    pinyin: topic(
      'ao ou iu', ['PINYIN-FINAL-AO', 'PINYIN-FINAL-OU', 'PINYIN-FINAL-IU'], ['能认读ao ou iu', '能区分ao和ou', '能拼读qiú'],
      [
        audioChoice('听一听，哪个是ou？', ['ao', 'ou', 'iu'], 1, 'ou从o滑到u。', '你能区分ao和ou。', 1),
        choice('“球”的音节是？', ['qiu', 'qou', 'quo'], 0, 'iu由iou缩写而来。', '你能读准三字母复韵母。', 2),
      ],
      [
        choice('碑林拼音卡gāo的韵母是？', ['ao', 'ou', 'iu'], 0, 'gao从a滑向o。', '你能拼读ao音节。', 0),
        say('在碑林读ao、ou、iu和qiú。', '注意iu不能丢掉o音。', '你能巩固三个复韵母。'),
      ],
    ),
    english: topic(
      'N和H-M复习', ['ENGLISH-LETTER-N', 'ENGLISH-LETTER-H', 'ENGLISH-LETTER-K'], ['能认读Nn', '能区分M和N首音', '能复习H-M'],
      [
        audioChoice('听一听，哪个是N？', ['M', 'N', 'K'], 1, 'N读en。', '你能听清M和N。', 0),
        choice('kite的首音卡片是？', ['Kk', 'Ll', 'Nn'], 0, 'kite从k开始。', '你能复习K的首音。', 2),
      ],
      [
        choice('碑林英语卡nest的首音是？', ['Mm', 'Nn', 'Hh'], 1, 'nest从n开始。', '你能找到N的首音。', 0),
        say('在碑林按顺序说H到N。', '可以分成H J K和L M N两组。', '你能复习连续字母。'),
      ],
    ),
    integrated: topic(
      '碑林图案规律任务', ['MATH-PATTERN-CLASSIFY-DATA', 'PINYIN-FINAL-AO', 'ENGLISH-LETTER-N'], ['能继续碑林图案规律', '能读gāo', '能说nest的首音'],
      [
        choice('石雕图案：方、圆、方、圆，下一个是？', ['方形', '圆形', '三角形'], 0, '两个图形交替出现。', '你能延续图案规律。'),
        choice('gāo的韵母是？', ['ao', 'ou', 'iu'], 0, 'ao口形从大到小。', '你能读准ao。', 1),
      ],
      [
        choice('nest的首音卡片是？', ['Mm', 'Nn', 'Kk'], 1, 'nest从n开始。', '你能完成英语首音任务。', 2),
        say('在碑林设计一张有规律的图案卡并介绍。', '可以说颜色、形状或顺序。', '你完成了规律创作卡。'),
      ],
    ),
  },
  {
    week: 7,
    math: topic(
      '圆形、三角形、正方形、长方形', ['MATH-PLANE-SHAPES'], ['能认读四种平面图形', '能按边和角分类', '能用图形拼图案'],
      [
        choice('有三条边和三个角的是哪个图形？', ['圆形', '三角形', '长方形'], 1, '三角形的名字里有三。', '你能根据边数认图形。'),
        choice('四条边都一样长的图形是？', ['正方形', '长方形', '圆形'], 0, '看四条边是否一样长。', '你能抓住正方形特征。'),
      ],
      [
        choice('大唐不夜城的灯笼面更像哪种图形？', ['圆形', '三角形', '正方形'], 0, '圆边光滑没有角。', '你能在生活中找圆形。'),
        say('用四种平面图形拼一张不夜城图案并介绍。', '可以说用了几个圆和几个方形。', '你能完成图形创作。'),
      ],
    ),
    pinyin: topic(
      'ie üe er', ['PINYIN-FINAL-IE', 'PINYIN-FINAL-UE', 'PINYIN-FINAL-ER'], ['能认读ie üe er', '能区分ie和üe', '能读卷舌韵母er'],
      [
        audioChoice('听一听，哪个是üe？', ['ie', 'üe', 'ei'], 1, 'üe开头嘴唇拢圆。', '你能区分ie和üe。', 1),
        choice('“耳”的韵母是？', ['er', 'e', 'en'], 0, 'er要卷舌。', '你能读出特殊韵母er。', 2),
      ],
      [
        choice('不夜城拼音卡yuè的韵母是？', ['ie', 'üe', 'ei'], 1, '月读yuè。', '你能拼读üe音节。', 1),
        say('在不夜城读ie、üe、er和yuè。', 'er的舌尖要卷起。', '你能读准三个韵母。'),
      ],
    ),
    english: topic(
      'O P Q', ['ENGLISH-LETTER-O', 'ENGLISH-LETTER-P', 'ENGLISH-LETTER-Q'], ['能认读O P Q', '能听辨B和P', '能读queen的首音'],
      [
        audioChoice('听一听，哪个是P？', ['B', 'P', 'Q'], 1, 'P读pee。', '你能听清字母P。', 1),
        choice('octopus的首音卡片是？', ['Oo', 'Pp', 'Qq'], 0, 'octopus从o开始。', '你能找到O的首音。', 0),
      ],
      [
        choice('不夜城英语卡queen开头常见读音是？', ['kw', 'p', 'k'], 0, 'qu常读kw。', '你能认读Q的组合音。', 2),
        say('在不夜城说O、P、Q和octopus。', '先说字母名再举例。', '你能完成字母表达。'),
      ],
    ),
    integrated: topic(
      '不夜城灯光创作任务', ['MATH-PLANE-SHAPES', 'PINYIN-FINAL-UE', 'ENGLISH-LETTER-O'], ['能用图形设计灯光图案', '能读yuè', '能说octopus的首音'],
      [
        choice('圆形灯笼、方形灯牌、圆形灯笼、方形灯牌，下一张是？', ['圆形灯笼', '方形灯牌', '三角形灯笼'], 0, '两个一组重复。', '你能设计重复规律。'),
        choice('yuè的韵母是？', ['ie', 'üe', 'ei'], 1, 'üe要圆唇。', '你能读准yuè。', 1),
      ],
      [
        choice('octopus的首音卡片是？', ['Oo', 'Pp', 'Qq'], 0, 'octopus从o开始。', '你能完成英语首音任务。', 2),
        say('在大唐不夜城展示灯光图案创作卡。', '说图案里有哪些形状和颜色。', '你完成了情境创作任务。'),
      ],
    ),
  },
  {
    week: 8,
    math: topic(
      '立体图形初步认识', ['MATH-SOLID-SHAPES'], ['能认读球、正方体、长方体、圆柱', '能按能否滚动分类', '能举出生活例子'],
      [
        choice('皮球的形状最像什么？', ['球', '正方体', '长方体'], 0, '球可以向不同方向滚动。', '你能联系实物认识球。'),
        choice('骰子的形状通常是？', ['圆柱', '正方体', '球'], 1, '它的面是正方形。', '你能根据面判断正方体。'),
      ],
      [
        choice('回民街摊位上的易拉罐像哪种立体？', ['圆柱', '球', '长方体'], 0, '两个圆面加弯曲侧面。', '你能识别生活中的圆柱。'),
        say('在回民街找两个立体图形并说明能否滚动。', '可以说盒子和罐子。', '你能用特征比较立体图形。'),
      ],
    ),
    pinyin: topic(
      'an en in un ün', ['PINYIN-FINAL-AN', 'PINYIN-FINAL-EN', 'PINYIN-FINAL-IN', 'PINYIN-FINAL-UN', 'PINYIN-FINAL-UN-UMLAUT'], ['能认读五个前鼻韵母', '能听辨in和ün', '能拼读常见前鼻音节'],
      [
        audioChoice('听一听，哪个是ün？', ['un', 'ün', 'in'], 1, 'ün开头要圆唇。', '你能区分un和ün。', 4),
        choice('“门”的韵母是？', ['en', 'eng', 'in'], 0, '门读mén。', '你能认读前鼻韵母en。', 1),
      ],
      [
        choice('回民街拼音卡wèi的韵母属于？', ['ei', 'ui', 'uei缩写'], 2, 'wei是uei的完整读音。', '你能区分相近韵母。', 1),
        say('在回民街读an、en、in、un、ün。', '前鼻音舌尖抵上齿龈。', '你能读准五个前鼻韵母。'),
      ],
    ),
    english: topic(
      'R S T', ['ENGLISH-LETTER-R', 'ENGLISH-LETTER-S', 'ENGLISH-LETTER-T'], ['能认读R S T', '能听辨D和T', '能选tiger首音图'],
      [
        audioChoice('听一听，哪个是T？', ['D', 'S', 'T'], 2, 'T读tee。', '你能听清D和T。', 2),
        choice('tiger的首音卡片是？', ['Rr', 'Ss', 'Tt'], 2, 'tiger从t开始。', '你能找到T的首音。', 2),
      ],
      [
        choice('回民街英语卡sun的首音是？', ['Rr', 'Ss', 'Tt'], 1, 'sun从s开始。', '你能匹配S和sun。', 1),
        say('在回民街说R、S、T和tiger。', '先说字母名再说首音词。', '你能继续积累字母。'),
      ],
    ),
    integrated: topic(
      '回民街购物综合任务', ['MATH-MONEY-YUAN', 'PINYIN-FINAL-AN', 'ENGLISH-LETTER-S'], ['能用元计算购物', '能读an韵母', '能说sun的首音'],
      [
        choice('买6元食物付10元，找回多少元？', ['3元', '4元', '5元'], 1, '用10-6算找回。', '你能算找回的钱。'),
        choice('mén的韵母是？', ['en', 'eng', 'in'], 0, 'en是前鼻韵母。', '你能读准en。', 1),
      ],
      [
        choice('sun的首音卡片是？', ['Rr', 'Ss', 'Tt'], 1, 'sun从s开始。', '你能完成英语首音任务。', 2),
        say('在回民街完成一张购物创作卡，说出商品、价格和英语词。', '可以先说买什么，再说付钱。', '你完成了生活购物任务。'),
      ],
    ),
  },
  {
    week: 9,
    math: topic(
      '上下前后左右与路线', ['MATH-POSITION-ROUTE'], ['能用上下前后左右描述位置', '能按顺序走简单路线', '能说出起点和终点'],
      [
        choice('书放在桌面上，书在桌子的哪一面？', ['下面', '上面', '后面'], 1, '上面离天空更近。', '你能用上和下描述位置。'),
        choice('先向前2格，再向右1格，应该怎样走？', ['先右再前', '先前再右', '只向前'], 1, '按指令顺序一步一步走。', '你能按顺序完成路线。'),
      ],
      [
        choice('陕西历史博物馆路线先说哪一步？', ['天气', '起点', '颜色'], 1, '路线从哪里开始很重要。', '你知道路线要从起点说清。'),
        say('用上下或左右说博物馆里两件展品的位置。', '可以先说参考物。', '你能准确描述位置。'),
      ],
    ),
    pinyin: topic(
      'ang eng ing ong', ['PINYIN-FINAL-ANG', 'PINYIN-FINAL-ENG', 'PINYIN-FINAL-ING', 'PINYIN-FINAL-ONG'], ['能认读四个后鼻韵母', '能听辨an和ang', '能读常见后鼻音节'],
      [
        audioChoice('听一听，哪个是ang？', ['an', 'ang', 'ai'], 1, 'ang的鼻音在后面。', '你能听辨前鼻和后鼻。', 0),
        choice('“钟”的韵母是？', ['ong', 'eng', 'en'], 0, '钟读zhōng。', '你能认读后鼻韵母ong。', 3),
      ],
      [
        choice('博物馆拼音卡xīng的韵母是？', ['in', 'ing', 'eng'], 1, '星读xīng。', '你能区分in和ing。', 2),
        say('在博物馆读ang、eng、ing、ong。', '舌根抬起收后鼻音。', '你能读准四个后鼻韵母。'),
      ],
    ),
    english: topic(
      'U V W', ['ENGLISH-LETTER-U', 'ENGLISH-LETTER-V', 'ENGLISH-LETTER-W'], ['能认读U V W', '能听辨V和W', '能选water首音图'],
      [
        audioChoice('听一听，哪个是V？', ['U', 'V', 'W'], 1, 'V读vee。', '你能听清V和W。', 1),
        choice('water的首音卡片是？', ['Vv', 'Ww', 'Uu'], 1, 'water从w开始。', '你能匹配W和water。', 2),
      ],
      [
        choice('博物馆英语卡umbrella的首音是？', ['Uu', 'Vv', 'Ww'], 0, 'umbrella从u开始。', '你能找到U的首音。', 0),
        say('在博物馆说U、V、W和water。', 'V和W要分开。', '你能继续完成A-Z学习。'),
      ],
    ),
    integrated: topic(
      '博物馆路线综合任务', ['MATH-POSITION-ROUTE', 'PINYIN-FINAL-ING', 'ENGLISH-LETTER-U'], ['能安排博物馆参观路线', '能读xīng', '能说umbrella的首音'],
      [
        choice('参观先到入口，再看展厅，最后到出口，这叫什么？', ['路线顺序', '颜色分类', '重量比较'], 0, '路线有先后顺序。', '你能安排参观顺序。'),
        choice('xīng的韵母是？', ['in', 'ing', 'eng'], 1, 'ing是后鼻韵母。', '你能读准后鼻音。', 1),
      ],
      [
        choice('umbrella的首音卡片是？', ['Uu', 'Vv', 'Ww'], 0, 'umbrella从u开始。', '你能完成英语首音任务。', 2),
        say('在陕西历史博物馆说三步参观路线并完成创作卡。', '用先、再、最后连接。', '你完成了路线综合任务。'),
      ],
    ),
  },
  {
    week: 10,
    math: topic(
      '整点、半点和日程', ['MATH-TIME-HALF-HOUR'], ['能认整点', '能认半点', '能安排两件事先后'],
      [
        choice('分针指着12，时针指着8，是几时？', ['8时', '7时30分', '12时'], 0, '分针指12读整点。', '你能先看分针再读整点。'),
        choice('分针指着6，时针过7，是7时多少？', ['7时10分', '7时30分', '7时60分'], 1, '分针指6就是半点。', '你能认读7时30分。'),
      ],
      [
        choice('西安博物院8时开门，9时上课，哪件事先发生？', ['上课', '8时开门', '同时'], 1, '8比9早。', '你能按时间安排事件。'),
        say('为博物院参观安排两个时间点。', '可以说几点到、几点看展览。', '你能用整点半点表达日程。'),
      ],
    ),
    pinyin: topic(
      '两拼音节训练', ['PINYIN-TWO-SPELL', 'PINYIN-TONES', 'PINYIN-INITIAL-B', 'PINYIN-VOWEL-A'], ['能准备声母和韵母', '能快速连读两拼音节', '能带上声调读'],
      [
        choice('b-a中间需要停很久吗？', ['需要', '不需要', '先读三遍再停'], 1, '两拼要顺滑。', '你能连贯拼读。', 0),
        audioChoice('听一听，哪个是mǔ？', ['mū', 'mú', 'mǔ'], 2, '第三声先降后升。', '你能带上调号读音节。', 1),
      ],
      [
        choice('博物院拼音卡dì是第几声？', ['第一声', '第二声', '第四声'], 2, '第四声从高到低。', '你能读准第四声。', 1),
        say('在西安博物院拼读dì、diǎn、guǎn。', '先慢后快，再带声调。', '你能完成两拼应用。'),
      ],
    ),
    english: topic(
      'X Y Z', ['ENGLISH-LETTER-X', 'ENGLISH-LETTER-Y', 'ENGLISH-LETTER-Z'], ['能认读X Y Z', '能读yes首音', '能知道Z有两种字母名'],
      [
        choice('yes的首音卡片是？', ['Xx', 'Yy', 'Zz'], 1, 'yes从y开始。', '你能找到Y的首音。', 1),
        audioChoice('听一听，哪个是Z？', ['X', 'Y', 'Z'], 2, 'Z可读zed或zee。', '你能听出字母Z。', 2),
      ],
      [
        choice('博物院英语卡box里的x常见读音是？', ['ks', 's', 'z'], 0, 'x常读ks。', '你能认读x组合音。', 0),
        say('在西安博物院说X、Y、Z。', 'Z有两种字母名都可以。', '你完成了U-Z字母学习。'),
      ],
    ),
    integrated: topic(
      '博物院时间综合任务', ['MATH-TIME-HALF-HOUR', 'PINYIN-TWO-SPELL', 'ENGLISH-LETTER-Z'], ['能安排博物院半日时间', '能读dì', '能说zoo的首音'],
      [
        choice('9时到博物院，10时30分看展览，哪件事先发生？', ['看展览', '9时到达', '同时'], 1, '9时比10时30分早。', '你能比较时间先后。'),
        choice('dì的声母是？', ['b', 'd', 't'], 1, 'd的气流较弱。', '你能拼读dì。', 1),
      ],
      [
        choice('zoo的首音卡片是？', ['Zz', 'Uu', 'Mm'], 0, 'zoo从z开始。', '你能完成英语首音任务。', 2),
        say('在西安博物院用时间、拼音和英语完成半日游卡。', '说时间、地点和英语词。', '你完成了时间综合任务。'),
      ],
    ),
  },
  {
    week: 11,
    math: topic(
      '人民币和简单购物', ['MATH-MONEY-YUAN'], ['能认1元、5元、10元', '能算两张面值合起来多少元', '能算找回的钱'],
      [
        choice('一张5元和一张1元合起来是多少元？', ['4元', '5元', '6元'], 2, '5元再数1元就是6元。', '你能把不同面值合起来。'),
        choice('买6元商品付10元，找回多少元？', ['3元', '4元', '5元'], 1, '用10-6算找回。', '你能用减法算找零。'),
      ],
      [
        choice('地铁站买8元票付5元和3张1元，够吗？', ['不够', '正好8元', '多出1元'], 1, '先算5+3。', '你能先算总价再比较。'),
        say('在地铁站说买一张票要付多少钱、找回多少钱。', '先说票价，再说付款。', '你能完成购物表达。'),
      ],
    ),
    pinyin: topic(
      '三拼音节初步', ['PINYIN-THREE-SPELL', 'PINYIN-INITIAL-G', 'PINYIN-INITIAL-H'], ['能找到介母', '能慢速过渡后连读', '能不丢介母'],
      [
        choice('g-u-a的介母是？', ['g', 'u', 'a'], 1, '介母在声母和主要韵母中间。', '你能找到介母。', 0),
        choice('h-u-a连读是？', ['ha', 'hua', 'hia'], 1, 'u要轻而顺滑。', '你能完整读出介母。', 1),
      ],
      [
        choice('地铁站拼音卡huā的介母是？', ['h', 'u', 'a'], 1, 'u夹在中间。', '你能不丢介母。', 1),
        say('在地铁站拼读gua、hua、xia。', '先慢速过渡，再连读。', '你能完成三拼应用。'),
      ],
    ),
    english: topic(
      'A-M字母复习', ['ENGLISH-LETTER-A', 'ENGLISH-LETTER-F', 'ENGLISH-LETTER-M'], ['能按顺序复习A-M', '能配对大小写', '能听辨相近字母'],
      [
        choice('A后面是哪个字母？', ['B', 'D', 'F'], 0, 'A B C顺序开始。', '你能按字母顺序读。', 0),
        audioChoice('听一听，选字母M。', ['N', 'M', 'L'], 1, 'M读em。', '你能听清M和N。', 2),
      ],
      [
        choice('地铁站英语卡map的首音是？', ['Mm', 'Nn', 'Ff'], 0, 'map从m开始。', '你能复习M的首音。', 2),
        say('在地铁站按顺序说A到M。', '可以一组一组说。', '你能巩固前半段字母。'),
      ],
    ),
    integrated: topic(
      '地铁乘车综合任务', ['MATH-MONEY-YUAN', 'PINYIN-THREE-SPELL', 'ENGLISH-LETTER-M'], ['能算地铁车票和找零', '能读hua', '能说map的首音'],
      [
        choice('车票5元，买两张一共多少元？', ['7元', '10元', '15元'], 1, '两张就是把5元加两次。', '你能算总价。'),
        choice('huā的介母是？', ['h', 'u', 'a'], 1, 'u不能丢。', '你能拼读三拼音节。', 1),
      ],
      [
        choice('map的首音卡片是？', ['Mm', 'Nn', 'Ff'], 0, 'map从m开始。', '你能完成英语首音任务。', 2),
        say('在地铁站用钱数、拼音站名和英语词完成乘车卡。', '可以说票价、站名和map。', '你完成了地铁综合任务。'),
      ],
    ),
  },
  {
    week: 12,
    math: topic(
      '长短高低轻重比较', ['MATH-MEASUREMENT-COMPARE'], ['能统一起点比较长短', '能比较高矮', '能用积木作测量单位'],
      [
        choice('比较两支铅笔长短，应该先怎么做？', ['一头对齐', '随便放', '只看颜色'], 0, '起点不同不能直接比较。', '你知道比较要先对齐起点。'),
        choice('桌子长4块积木，椅子长2块积木，哪个长？', ['椅子', '桌子', '一样长'], 1, '同一单位下数量大的更长。', '你能用同一单位比较长度。'),
      ],
      [
        choice('环城公园三个同学比高矮，要注意什么？', ['都站在同一地面', '一个踮脚', '看衣服'], 0, '踮脚会让比较不公平。', '你能用公平标准比较高矮。'),
        say('在环城公园比较两样东西并说理由。', '可以说树、长椅或路线。', '你能完成测量表达。'),
      ],
    ),
    pinyin: topic(
      'ang eng ing ong综合', ['PINYIN-FINAL-ANG', 'PINYIN-FINAL-ENG', 'PINYIN-FINAL-ING', 'PINYIN-FINAL-ONG'], ['能巩固后鼻韵母', '能听辨前鼻和后鼻', '能拼读场景词'],
      [
        audioChoice('听一听，哪个是cháng？', ['cán', 'cháng', 'chǎng'], 1, 'ang是后鼻韵母。', '你能听辨后鼻音。', 0),
        choice('lóng的韵母是？', ['ong', 'eng', 'ing'], 0, 'long读lóng。', '你能读准ong。', 3),
      ],
      [
        choice('公园拼音卡gōng yuán中有几个后鼻音节？', ['0个', '1个', '2个'], 1, 'gōng是后鼻音节，yuán是前鼻音节。', '你能比较前鼻和后鼻。', 0),
        say('在环城公园读gōng yuán。', 'gōng收后鼻音，yuán收前鼻音。', '你能读准公园地名。'),
      ],
    ),
    english: topic(
      'N-Z字母复习', ['ENGLISH-LETTER-N', 'ENGLISH-LETTER-S', 'ENGLISH-LETTER-Z'], ['能按顺序复习N-Z', '能配对大小写', '能听辨相近字母'],
      [
        choice('N后面是哪个字母？', ['M', 'O', 'P'], 1, 'N O P顺序相连。', '你能按字母顺序复习。', 0),
        audioChoice('听一听，选字母S。', ['R', 'S', 'T'], 1, 'S读es。', '你能听清相近字母。', 1),
      ],
      [
        choice('zoo的首音卡片是？', ['Zz', 'Ss', 'Mm'], 0, 'zoo从z开始。', '你能复习Z的首音。', 2),
        say('在环城公园按顺序说N到Z。', '可以分成四组说。', '你能巩固后半段字母。'),
      ],
    ),
    integrated: topic(
      '公园测量综合任务', ['MATH-MEASUREMENT-COMPARE', 'PINYIN-FINAL-ONG', 'ENGLISH-LETTER-S'], ['能比较公园物体长度', '能读gōng', '能说sun的首音'],
      [
        choice('长椅长5块积木，石凳长3块积木，哪个长？', ['石凳', '长椅', '一样长'], 1, '同一单位数量大的更长。', '你能比较长度。'),
        choice('gōng的韵母是？', ['ong', 'eng', 'ing'], 0, 'gōng收后鼻音。', '你能读准ong。', 1),
      ],
      [
        choice('sun的首音卡片是？', ['Rr', 'Ss', 'Tt'], 1, 'sun从s开始。', '你能完成英语首音任务。', 2),
        say('在环城公园做一张测量创作卡并介绍。', '说比较了什么、谁长谁短。', '你完成了公园测量任务。'),
      ],
    ),
  },
  {
    week: 13,
    math: topic(
      '100以内不进位加法', ['MATH-ADDITION-100-NO-CARRY'], ['能把整十和整十相加', '能把个位和个位相加', '能检查得数'],
      [
        choice('34+25等于多少？', ['49', '58', '59'], 2, '先算30+20，再算4+5。', '你能按数位拆开计算。'),
        choice('41+36中，整十部分相加是多少？', ['60', '70', '77'], 1, '40+30先算。', '你能先处理整十部分。'),
      ],
      [
        choice('书店书架52+27的得数是？', ['79', '78', '89'], 0, '50+20=70，2+7=9。', '你能算不进位加法。'),
        say('用书店图书数量出一道加法题并解答。', '可以用两排书。', '你能创造并解决数学问题。'),
      ],
    ),
    pinyin: topic(
      '拼音综合复习', ['PINYIN-APPLICATION-REVIEW', 'PINYIN-TONES', 'PINYIN-TWO-SPELL'], ['能复习声母韵母', '能读准声调', '能完成两拼和三拼'],
      [
        audioChoice('听一听，哪个是dì sān shēng？', ['dī', 'dí', 'dǐ'], 2, '第三声先降后升。', '你能听出第三声。', 1),
        choice('x-i-a属于什么音节？', ['两拼', '三拼', '整体认读'], 1, '中间有介母i。', '你能判断三拼音节。', 3),
      ],
      [
        choice('书店拼音卡shū的声母是？', ['s', 'sh', 'z'], 1, 'sh是翘舌音。', '你能读准shū。', 0),
        say('在书店拼读shū diǎn。', '先拼每个音节再连成词。', '你能完成地点词拼读。'),
      ],
    ),
    english: topic(
      'School supplies主题', ['ENGLISH-THEME-SUPPLIES', 'ENGLISH-LETTER-P', 'ENGLISH-LETTER-R'], ['能听认pencil和ruler', '能说I can see a ruler.', '能指认文具'],
      [
        audioChoice('听一听，哪个是ruler？', ['pencil', 'ruler', 'book'], 1, 'ruler从r音开始。', '你能听认文具词。', 0),
        choice('pencil的首音卡片是？', ['Pp', 'Rr', 'Bb'], 0, 'pencil从p开始。', '你能联系字母和文具。', 1),
      ],
      [
        choice('在钟楼书店看见尺子，可以说？', ['I can see a ruler.', 'I see ruler a can.', 'Ruler I can a see.'], 0, 'I can see加物品。', '你能介绍文具。', 0),
        say('用英语介绍书店里的两样文具。', '可以用I can see...。', '你能完成英语表达。'),
      ],
    ),
    integrated: topic(
      '书店阅读综合任务', ['MATH-ADDITION-100-NO-CARRY', 'PINYIN-APPLICATION-REVIEW', 'ENGLISH-THEME-SUPPLIES'], ['能算书店物品数量', '能拼读shū diǎn', '能说ruler'],
      [
        choice('一排34本，一排25本，一共多少本？', ['49本', '58本', '59本'], 2, '先加整十再加个位。', '你能解决书店加法。'),
        choice('shū diǎn的意思是？', ['书店', '学校', '车站'], 0, 'shū是书，diǎn是店。', '你能用拼音理解地点。', 1),
      ],
      [
        choice('I can see a...可以接哪个词？', ['ruler', 'see ruler', 'a see ruler'], 0, '冠词a加物品词。', '你能完成英语短句。', 2),
        say('在钟楼书店完成阅读创作卡：说书名、拼音和英语词。', '可以先说看到了什么。', '你完成了书店综合任务。'),
      ],
    ),
  },
  {
    week: 14,
    math: topic(
      '100以内不退位减法', ['MATH-SUBTRACTION-100-NO-BORROW'], ['能先减整十部分', '能再减个位部分', '能判断个位够减'],
      [
        choice('68-25等于多少？', ['33', '43', '53'], 1, '先算60-20，再算8-5。', '你能按数位完成不退位减法。'),
        choice('79-34的整十部分是多少？', ['30', '40', '45'], 1, '70-30先算。', '你能先减整十数。'),
      ],
      [
        choice('菜市场原有75个苹果，卖23个，还剩多少个？', ['42个', '52个', '58个'], 1, '70-20=50，5-3=2。', '你能解决不退位减法。'),
        say('用菜市场商品出一道减法题并说答案。', '可以说原有和卖掉。', '你能把减法用于生活。'),
      ],
    ),
    pinyin: topic(
      '生活标识拼读', ['PINYIN-APPLICATION-LABELS', 'PINYIN-INITIAL-R', 'PINYIN-FINAL-OU'], ['能分段拼读标识', '能认读rù kǒu', '能说出标识含义'],
      [
        choice('rù kǒu的意思是？', ['入口', '出口', '小心'], 0, '先拼rù，再拼kǒu。', '你能读懂生活标识。', 0),
        audioChoice('听一听，哪个是kǒu？', ['kōu', 'kóu', 'kǒu'], 2, '第三声先降后升。', '你能读准第三声。', 2),
      ],
      [
        choice('菜市场标识xiǎo xīn的意思是？', ['小心', '入口', '出口'], 0, '提醒注意安全。', '你能理解标识含义。', 0),
        say('在菜市场读rù kǒu和xiǎo xīn。', '先读声母韵母，再带声调。', '你能完成标识拼读。'),
      ],
    ),
    english: topic(
      'Transport主题', ['ENGLISH-THEME-TRANSPORT', 'ENGLISH-LETTER-B', 'ENGLISH-LETTER-M'], ['能听认bus和metro', '能说I take the metro.', '能选交通工具'],
      [
        audioChoice('听一听，哪个是metro？', ['bus', 'metro', 'boat'], 1, 'metro从m音开始。', '你能听认交通工具。', 0),
        choice('bus的首音卡片是？', ['Bb', 'Mm', 'Tt'], 0, 'bus从b开始。', '你能联系字母和交通。', 1),
      ],
      [
        choice('去菜市场可以说I take...？', ['the metro', 'metro the', 'take I metro'], 0, 'the metro是常用搭配。', '你能表达出行方式。', 0),
        say('用英语说你怎么去菜市场。', '可以用bus或metro。', '你能完成交通表达。'),
      ],
    ),
    integrated: topic(
      '菜市场分类综合任务', ['MATH-SUBTRACTION-100-NO-BORROW', 'PINYIN-APPLICATION-LABELS', 'ENGLISH-THEME-TRANSPORT'], ['能算菜市场剩余数量', '能读rù kǒu', '能说metro'],
      [
        choice('68个西红柿卖25个，还剩多少个？', ['33个', '43个', '53个'], 1, '先减整十再减个位。', '你能解决菜市场减法。'),
        choice('rù kǒu是哪个标识？', ['入口', '出口', '排队'], 0, 'rù kǒu就是入口。', '你能读标识。', 1),
      ],
      [
        choice('I take the...可以说哪个短语？', ['metro', 'metro the', 'take I the metro'], 0, 'the加交通工具。', '你能完成英语交通句。', 2),
        say('在菜市场完成分类、算数和英语交通创作卡。', '可以说蔬菜、价格和出行方式。', '你完成了生活综合任务。'),
      ],
    ),
  },
  {
    week: 15,
    math: topic(
      '100以内加减混合应用', ['MATH-ADD-SUB-100-APPLICATION'], ['能根据事件选加法或减法', '能算100以内加减', '能检查答案是否合理'],
      [
        choice('车上36人，上来12人，现在多少人？', ['46人', '48人', '58人'], 1, '上来表示增加。', '你能选择加法解决上车问题。'),
        choice('75本书借走23本，还剩多少本？', ['42本', '52本', '58本'], 1, '借走就是减少。', '你能选择减法求还剩。'),
      ],
      [
        choice('学校门口文具店48元和21元合起来是多少元？', ['59元', '69元', '79元'], 1, '先算40+20，再算8+1。', '你能用数位思路算总价。'),
        say('用上学路上的一件事编一道加减法题。', '可以说人数、钱数或物品数。', '你能创造生活数学题。'),
      ],
    ),
    pinyin: topic(
      '情境短句拼读', ['PINYIN-APPLICATION-EXPRESSION', 'PINYIN-VOWEL-O', 'PINYIN-INITIAL-W'], ['能拼读wǒ', '能读短句关键词', '能在情境中表达看到的东西'],
      [
        choice('wǒ是第几声？', ['第一声', '第二声', '第三声'], 2, 'wǒ先降后升。', '你能读准第三声。', 0),
        audioChoice('听一听，哪个是wǒ？', ['wō', 'wó', 'wǒ'], 2, '注意声调走向。', '你能听辨声调。', 0),
      ],
      [
        choice('“我看见”中开头的音节是？', ['wǒ', 'kàn', 'jiàn'], 0, '先说主语wǒ。', '你能按顺序读短句关键词。', 0),
        say('在学校门口用拼音短句说“我看见”的内容。', '可以说人、门或树。', '你能完成拼音表达。'),
      ],
    ),
    english: topic(
      'Feelings主题', ['ENGLISH-THEME-FEELINGS', 'ENGLISH-LETTER-H', 'ENGLISH-LETTER-T'], ['能听认happy和tired', '能说I am happy.', '能选表情卡'],
      [
        audioChoice('听一听，哪个是happy？', ['happy', 'tired', 'hungry'], 0, 'happy从h音开始。', '你能听认感受词。', 0),
        choice('tired的首音卡片是？', ['Hh', 'Tt', 'Ff'], 1, 'tired从t开始。', '你能联系字母和感受。', 1),
      ],
      [
        choice('“我很开心”可以说？', ['I am happy.', 'I is happy.', 'Happy am I.'], 0, 'I配am。', '你能表达自己的感受。', 0),
        say('在学校门口用英语说一个感受词。', '可以说happy或tired。', '你能完成感受表达。'),
      ],
    ),
    integrated: topic(
      '学校门口综合任务', ['MATH-ADD-SUB-100-APPLICATION', 'PINYIN-APPLICATION-EXPRESSION', 'ENGLISH-THEME-FEELINGS'], ['能解决到校人数问题', '能说wǒ kàn jiàn', '能说I am happy'],
      [
        choice('校门口原有36人，又来12人，一共多少人？', ['46人', '48人', '58人'], 1, '又来表示增加。', '你能解决到校人数问题。'),
        choice('wǒ kàn jiàn开头的音节是？', ['wǒ', 'kàn', 'jiàn'], 0, '先说wǒ。', '你能读出短句开头。', 1),
      ],
      [
        choice('I am后面可以接？', ['happy', 'am happy', 'happy am'], 0, 'I am happy是完整短句。', '你能完成英语感受句。', 2),
        say('在学校门口完成一张“我看到、我算出、我说出”的综合卡。', '可以按数学、拼音、英语顺序说。', '你完成了学校门口综合任务。'),
      ],
    ),
  },
  {
    week: 16,
    math: topic(
      '长安半日游综合项目', ['MATH-PROJECT-TRIP'], ['能安排三站路线', '能算游览费用', '能用时间说行程'],
      [
        choice('车票5元，门票10元，一共多少元？', ['10元', '15元', '20元'], 1, '把两项费用合起来。', '你能算半日游总费用。'),
        choice('9时到钟楼，10时到大雁塔，哪个地点先到？', ['大雁塔', '钟楼', '同时'], 1, '9时比10时早。', '你能按时间安排行程。'),
      ],
      [
        choice('游览花15元，付20元，找回多少元？', ['4元', '5元', '6元'], 1, '用20-15算找回。', '你能综合使用付款和减法。'),
        say('为长安半日游安排三站并说明时间和费用。', '可以先选钟楼、城墙、大雁塔。', '你能完成综合项目规划。'),
      ],
    ),
    pinyin: topic(
      '长安半日游拼音卡', ['PINYIN-APPLICATION-PLACECARDS', 'PINYIN-APPLICATION-REVIEW'], ['能拼读多个地点卡', '能读准声调', '能按行程顺序说地点'],
      [
        choice('zhōng lóu和gǔ lóu都是什么词？', ['地点词', '数字词', '颜色词'], 0, '它们都是长安地点。', '你能用拼音认读地点。', 0),
        audioChoice('听一听，哪个是yàn？', ['yān', 'yán', 'yàn'], 2, '第四声从高到低。', '你能读准地点音节。', 0),
      ],
      [
        choice('dà yàn tǎ的声调顺序是？', ['四、四、三', '四、三、三', '三、四、四'], 0, 'dà和yàn都是第四声。', '你能读准地点声调。', 0),
        say('按顺序拼读钟楼、城墙、大雁塔。', '一个地点一个地点读。', '你能完成行程拼音表达。'),
      ],
    ),
    english: topic(
      'Places主题', ['ENGLISH-THEME-PLACES', 'ENGLISH-LETTER-P', 'ENGLISH-LETTER-M'], ['能听认park和museum', '能说I can see a museum.', '能介绍长安地点'],
      [
        audioChoice('听一听，哪个是museum？', ['park', 'school', 'museum'], 2, 'museum从m音开始。', '你能听认地点词。', 0),
        choice('park的首音卡片是？', ['Pp', 'Mm', 'Bb'], 0, 'park从p开始。', '你能联系字母和地点。', 1),
      ],
      [
        choice('介绍博物馆可以说？', ['I can see a museum.', 'I museum can a see.', 'Museum I can see a.'], 0, 'I can see加地点。', '你能介绍长安地点。', 0),
        say('用英语介绍长安半日游的一站。', '可以说park、museum或school。', '你能完成地点英语表达。'),
      ],
    ),
    integrated: topic(
      '长安半日游闭幕创作', ['MATH-PROJECT-TRIP', 'PINYIN-APPLICATION-PLACECARDS', 'ENGLISH-THEME-PLACES'], ['能综合安排半日游', '能拼读地点卡', '能用英语介绍地点'],
      [
        choice('钟楼、鼓楼、城墙按由市中心向外的顺序，第一站常选？', ['城墙', '钟楼', '菜市场'], 1, '钟楼在市中心。', '你能安排合理路线。'),
        choice('dà yàn tǎ是哪个地点？', ['大雁塔', '小雁塔', '钟楼'], 0, 'dà yàn tǎ就是大雁塔。', '你能用拼音认读地点。', 1),
      ],
      [
        choice('I can see a...可以介绍哪个地点？', ['museum', 'see museum', 'a see museum'], 0, '冠词a加地点词。', '你能完成英语介绍。', 2),
        say('完成长安半日游闭幕创作卡：说路线、拼音地点和一个英语地点词。', '按时间、拼音、英语顺序说。', '你完成了16周长安半日游项目。'),
      ],
    ),
  },
];

const weekdaySubjects: Array<{ weekday: Lesson['weekday']; subject: Subject }> = [
  { weekday: 1, subject: 'math' },
  { weekday: 2, subject: 'pinyin' },
  { weekday: 3, subject: 'english' },
  { weekday: 4, subject: 'creation' },
  { weekday: 5, subject: 'review' },
];

function toTask(
  lessonId: string,
  segmentType: LessonSegment['type'],
  taskIndex: number,
  seed: TaskSeed,
  knowledgeIds: string[],
  sceneId: string,
): LessonTask {
  const choices = seed.choices ?? [];
  const options = choices.length
    ? choices.map((label, optionIndex) => ({ id: ['a', 'b', 'c'][optionIndex], label }))
    : undefined;
  const answerIds =
    options && seed.answerIndex !== undefined ? [options[seed.answerIndex].id] : undefined;

  return {
    id: `${lessonId}-${segmentType}-${String(taskIndex + 1).padStart(2, '0')}`,
    type: seed.type ?? 'choice',
    prompt: seed.prompt,
    knowledgeId: knowledgeIds[seed.knowledgeIndex ?? 0] ?? knowledgeIds[0],
    options,
    answerIds,
    hint: seed.hint,
    coaching: seed.coaching,
    payload: {
      sceneId,
      ...(seed.answerIndex !== undefined && choices[seed.answerIndex]
        ? { acceptedAnswer: choices[seed.answerIndex] }
        : {}),
    },
  };
}

function toSegment(
  lessonId: string,
  type: LessonSegment['type'],
  title: string,
  script: string,
  tasks: LessonTask[] = [],
): LessonSegment {
  return { id: `${lessonId}-${type}`, type, title, script, tasks };
}

function reviewerFor(subject: Subject): string {
  if (subject === 'math') return 'math-education-specialist';
  if (subject === 'pinyin') return 'pinyin-specialist';
  if (subject === 'english') return 'english-education-specialist';
  return 'early-education-teacher';
}

function estimatedMinutesFor(subject: Subject): number {
  if (subject === 'creation') return 14;
  if (subject === 'review') return 12;
  return 13;
}

function objectivesFor(subject: Subject, sceneName: string, source: TopicSeed): string[] {
  if (subject === 'creation') {
    return [...source.objectives, `能在${sceneName}完成一张创作卡`];
  }
  if (subject === 'review') {
    return [...source.objectives, `能在${sceneName}完成三科复习闯关`];
  }
  return source.objectives;
}

function toLesson(plan: CoursePlan, weekday: Lesson['weekday'], subject: Subject): Lesson {
  const scene = scenes[(plan.week - 1) % scenes.length];
  const source = subject === 'math' || subject === 'pinyin' || subject === 'english'
    ? plan[subject]
    : plan.integrated;
  const id = `${subject.toUpperCase()}-W${String(plan.week).padStart(2, '0')}-L0${weekday}`;
  const sceneName = scene.name;
  const title = subject === 'creation'
    ? `${sceneName}探索创作：${source.title}`
    : subject === 'review'
      ? `${sceneName}复习闯关：${source.title}`
      : source.title;
  const knowledgeIds = source.knowledgeIds;
  const practiceTasks = source.practice.map((seed, index) =>
    toTask(id, 'practice', index, seed, knowledgeIds, scene.id));
  const applicationTasks = source.application.map((seed, index) =>
    toTask(id, 'application', index, seed, knowledgeIds, scene.id));
  const summaryTask = toTask(
    id,
    'summary',
    0,
    say(`请说一件今天在${sceneName}学会的事。`, '可以说一个数、一个音节、一个字母或一道题。', '你已经完成了今天的长安学习任务。'),
    knowledgeIds,
    scene.id,
  );

  return {
    id,
    week: plan.week,
    weekday,
    subject,
    title,
    sceneId: scene.id,
    knowledgeIds,
    objectives: objectivesFor(subject, sceneName, source),
    estimatedMinutes: estimatedMinutesFor(subject),
    segments: [
      toSegment(
        id,
        'intro',
        '开始',
        `欢迎来到${sceneName}。今天我们要用${title}完成一次10多分钟的小探索。`,
      ),
      toSegment(
        id,
        'concept',
        '学一学',
        `先看例子，再说一说${source.objectives[0]}。讲解会控制在90秒内，不理解可以重听。`,
      ),
      toSegment(id, 'practice', '练一练', '完成两个小任务，第一次不会就看提示。', practiceTasks),
      toSegment(id, 'application', '长安任务', `把刚才学会的知识用到${sceneName}。`, applicationTasks),
      toSegment(id, 'summary', '我学会了', '说一说你的收获，然后领取学习星。', [summaryTask]),
    ],
    reviewIntervalDays: subject === 'review' ? [7] : [1, 3, 7],
    audit: {
      subjectReviewedBy: reviewerFor(subject),
      teachingReviewedBy: 'early-education-teacher',
      status: 'approved',
    },
  };
}

function buildLessons(): Lesson[] {
  return coursePlans.flatMap((plan) =>
    weekdaySubjects.map(({ weekday, subject }) => toLesson(plan, weekday, subject)));
}

export const lessons: Lesson[] = buildLessons();
