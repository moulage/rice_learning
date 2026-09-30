import type { InteractionKind, LessonDesign, LessonTask, TeachingFlowStep, TaskType, TeachingStage } from '@/domain/types';

interface PinyinTaskSeed {
  type: TaskType;
  prompt: string;
  choices?: [string, string, string];
  answerIndex?: 0 | 1 | 2;
  hint: string;
  coaching: string;
  knowledgeId: string;
}

export interface PinyinSessionSeed {
  id: string;
  week: number;
  weekday: 1 | 2 | 3 | 4 | 5;
  sourceWeek: number;
  title: string;
  knowledgeIds: string[];
  objectives: string[];
  drills: [PinyinTaskSeed, PinyinTaskSeed, PinyinTaskSeed];
  design: LessonDesign;
  teachingFlow?: TeachingFlowStep[];
}

const week1TeachingFlow: TeachingFlowStep[] = [
  { id: 'W01-D1-S01', segmentId: 'PINYIN-W01-D1-intro', slide: 1, phase: '导入', title: '走进拼音王国', durationMinutes: 2, teacherScript: '今天老师要带小朋友走进拼音王国，认识三位新朋友。', childAction: '坐好，看大屏幕，说出画面上有什么。', keyPoint: '用神秘感和情境吸引注意。', interaction: 'listen', visual: 'PPT封面：a o e 和拼音王国' },
  { id: 'W01-D1-S02', segmentId: 'PINYIN-W01-D1-concept', slide: 2, phase: '新授', title: '拼音村的歌声', durationMinutes: 4, teacherScript: '听，拼音村里传来三种声音：医生看嗓子、公鸡打鸣、白鹅水中照影。', childAction: '听声音，模仿医生、公鸡和白鹅。', keyPoint: '把声音与生活形象联系起来。', interaction: 'listen', visual: 'PPT第2页：三种生活情境' },
  { id: 'W01-D1-S03', segmentId: 'PINYIN-W01-D1-concept', slide: 3, phase: '新授', title: '认识单韵母大家庭', durationMinutes: 4, teacherScript: '单韵母一家有6个宝宝，今天先认识 a、o、e。', childAction: '看卡片，指一指今天要学的三个宝宝。', keyPoint: '知道单韵母口型不变，声音响亮拉长。', interaction: 'choose', visual: 'PPT第3页：6个单韵母对比' },
  { id: 'W01-D1-S04', segmentId: 'PINYIN-W01-D1-practice', slide: 2, phase: '练习', title: '听声音选宝宝', durationMinutes: 3, teacherScript: '我读一个声音，你马上指出对应的拼音宝宝。', childAction: '完成听音选图，说出选择的理由。', keyPoint: '能听辨 a、o、e。', interaction: 'choose', visual: '情境声音卡片' },
  { id: 'W01-D1-S05', segmentId: 'PINYIN-W01-D1-application', slide: 3, phase: '练习', title: '小镜子口型游戏', durationMinutes: 3, teacherScript: '拿小镜子照一照，看看你的嘴巴像不像拼音宝宝。', childAction: '照镜子模仿 a、o、e 的口型。', keyPoint: '发音时口型保持不变。', interaction: 'mirror', visual: '口型对照镜' },
  { id: 'W01-D1-S06', segmentId: 'PINYIN-W01-D1-summary', slide: 3, phase: '小结', title: '今天认识谁', durationMinutes: 2, teacherScript: '谁能说一说，今天认识了哪三位新朋友？', childAction: '说出 a、o、e，并做一个口型。', keyPoint: '能复述今天学习内容。', interaction: 'review', visual: 'a o e 总结卡' },
  { id: 'W01-D2-S01', segmentId: 'PINYIN-W01-D2-intro', slide: 3, phase: '导入', title: '召回拼音宝宝', durationMinutes: 2, teacherScript: '昨天认识的三位拼音宝宝又来了，我们一起读一读。', childAction: '看卡片，快速认读 a、o、e。', keyPoint: '巩固上一课发音。', interaction: 'review', visual: 'a o e 卡片' },
  { id: 'W01-D2-S02', segmentId: 'PINYIN-W01-D2-concept', slide: 4, phase: '新授', title: '拼音字母的家', durationMinutes: 3, teacherScript: '拼音字母住在四线三格里，数一数有几条线、几层楼。', childAction: '指出上格、中格、下格。', keyPoint: '知道 a、o、e 都住中格。', interaction: 'choose', visual: 'PPT第4页：四线三格' },
  { id: 'W01-D2-S03', segmentId: 'PINYIN-W01-D2-concept', slide: 5, phase: '示范', title: '学发 a', durationMinutes: 4, teacherScript: '张大嘴巴，舌头放平，跟我读：a——', childAction: '照口型模仿，声音响亮拉长。', keyPoint: '嘴巴张大，舌头放平。', interaction: 'speak', visual: 'PPT第5页：a 的口型' },
  { id: 'W01-D2-S04', segmentId: 'PINYIN-W01-D2-concept', slide: 6, phase: '新授', title: 'a 的四顶小帽子', durationMinutes: 4, teacherScript: 'a 有四顶小帽子，我们边做手势边读。', childAction: '读 ā á ǎ à，并做出平、扬、拐弯、降的手势。', keyPoint: '一声平，二声扬，三声拐弯，四声降。', interaction: 'gesture', visual: 'PPT第6页：a 的四声' },
  { id: 'W01-D2-S05', segmentId: 'PINYIN-W01-D2-practice', slide: 6, phase: '练习', title: '听音举卡', durationMinutes: 3, teacherScript: '我读 a 的一个声调，你马上找卡片。', childAction: '听音选卡，并说出调号方向。', keyPoint: '能听辨 a 的四个声调。', interaction: 'game', visual: 'ā á ǎ à 卡片' },
  { id: 'W01-D2-S06', segmentId: 'PINYIN-W01-D2-application', slide: 5, phase: '练习', title: '小镜子读 a', durationMinutes: 2, teacherScript: '照镜子检查嘴巴有没有张大。', childAction: '照镜子读 a，保持口型。', keyPoint: '口型稳定。', interaction: 'mirror', visual: '小镜子' },
  { id: 'W01-D2-S07', segmentId: 'PINYIN-W01-D2-summary', slide: 6, phase: '小结', title: 'a 的口诀', durationMinutes: 2, teacherScript: '我们一起说：张大嘴巴 a a a。', childAction: '说口诀并做手势。', keyPoint: '巩固 a 的发音和四声。', interaction: 'review', visual: 'a 四声板书' },
  { id: 'W01-D3-S01', segmentId: 'PINYIN-W01-D3-intro', slide: 6, phase: '导入', title: '复习 a', durationMinutes: 2, teacherScript: '我们先请 a 出来，带四顶小帽子读一读。', childAction: '认读 ā á ǎ à。', keyPoint: '复习 a 的声调。', interaction: 'review', visual: 'ā á ǎ à 卡片' },
  { id: 'W01-D3-S02', segmentId: 'PINYIN-W01-D3-concept', slide: 7, phase: '示范', title: '书写 a', durationMinutes: 5, teacherScript: 'a 两笔写成：先左半圆，再竖右弯，写满中格。', childAction: '先书空，再在四线三格描一描。', keyPoint: 'a 写满中格，不越线。', interaction: 'trace', visual: 'PPT第7页：a 的笔顺' },
  { id: 'W01-D3-S03', segmentId: 'PINYIN-W01-D3-concept', slide: 8, phase: '新授', title: '学发 o', durationMinutes: 4, teacherScript: '嘴巴拢圆，舌头后缩，跟我读：o——', childAction: '保持圆唇，声音不断。', keyPoint: 'o 的口型不变。', interaction: 'speak', visual: 'PPT第8页：o 的口型' },
  { id: 'W01-D3-S04', segmentId: 'PINYIN-W01-D3-concept', slide: 9, phase: '新授', title: 'o 的四声', durationMinutes: 4, teacherScript: 'o 也有四顶小帽子，看清方向再读。', childAction: '读 ō ó ǒ ò，并做手势。', keyPoint: '读准 o 的四个声调。', interaction: 'gesture', visual: 'PPT第9页：o 的四声' },
  { id: 'W01-D3-S05', segmentId: 'PINYIN-W01-D3-practice', slide: 8, phase: '练习', title: 'a o 比一比', durationMinutes: 3, teacherScript: '听一听，老师说的是 a 还是 o。', childAction: '听音选卡，说说嘴巴变化。', keyPoint: '区分张大嘴和圆嘴。', interaction: 'game', visual: 'a o 对比卡' },
  { id: 'W01-D3-S06', segmentId: 'PINYIN-W01-D3-application', slide: 8, phase: '练习', title: '小镜子读 o', durationMinutes: 2, teacherScript: '照镜子看看嘴巴是不是圆圆的。', childAction: '照镜子读 o。', keyPoint: '圆唇保持。', interaction: 'mirror', visual: '小镜子' },
  { id: 'W01-D3-S07', segmentId: 'PINYIN-W01-D3-summary', slide: 9, phase: '小结', title: 'a o 小结', durationMinutes: 2, teacherScript: '张大嘴巴 a，嘴巴圆圆 o。', childAction: '复述口诀。', keyPoint: '巩固 a o。', interaction: 'review', visual: 'a o 板书' },
  { id: 'W01-D4-S01', segmentId: 'PINYIN-W01-D4-intro', slide: 9, phase: '导入', title: '复习 o', durationMinutes: 2, teacherScript: 'o 又来了，带上四顶小帽子读一读。', childAction: '认读 ō ó ǒ ò。', keyPoint: '复习 o 的声调。', interaction: 'review', visual: 'ō ó ǒ ò 卡片' },
  { id: 'W01-D4-S02', segmentId: 'PINYIN-W01-D4-concept', slide: 10, phase: '示范', title: '书写 o', durationMinutes: 4, teacherScript: 'o 一笔写成，从左上起笔转一圈回到起笔处。', childAction: '书空后在四线三格描画。', keyPoint: '写圆、合拢、住中格。', interaction: 'trace', visual: 'PPT第10页：o 的笔顺' },
  { id: 'W01-D4-S03', segmentId: 'PINYIN-W01-D4-concept', slide: 11, phase: '新授', title: '学发 e', durationMinutes: 4, teacherScript: '嘴角向两边咧，嘴巴扁扁，跟我读：e——', childAction: '看白鹅倒影图，模仿 e 的口型。', keyPoint: '嘴角展开，舌头后缩。', interaction: 'speak', visual: 'PPT第11页：白鹅倒影' },
  { id: 'W01-D4-S04', segmentId: 'PINYIN-W01-D4-concept', slide: 12, phase: '新授', title: 'e 的四声', durationMinutes: 4, teacherScript: 'e 也有四顶小帽子，我们边做手势边读。', childAction: '读 ē é ě è。', keyPoint: '读准 e 的四个声调。', interaction: 'gesture', visual: 'PPT第12页：e 的四声' },
  { id: 'W01-D4-S05', segmentId: 'PINYIN-W01-D4-practice', slide: 11, phase: '练习', title: 'o e 比一比', durationMinutes: 3, teacherScript: '听一听，老师说的是圆嘴 o 还是扁嘴 e。', childAction: '听音选卡并说理由。', keyPoint: '区分 o 和 e。', interaction: 'game', visual: 'o e 对比卡' },
  { id: 'W01-D4-S06', segmentId: 'PINYIN-W01-D4-application', slide: 11, phase: '练习', title: '小镜子读 e', durationMinutes: 2, teacherScript: '照镜子检查嘴角有没有展开。', childAction: '照镜子读 e。', keyPoint: '扁唇保持。', interaction: 'mirror', visual: '小镜子' },
  { id: 'W01-D4-S07', segmentId: 'PINYIN-W01-D4-summary', slide: 12, phase: '小结', title: 'o e 小结', durationMinutes: 2, teacherScript: '嘴巴圆圆 o，扁扁嘴巴 e。', childAction: '复述口诀。', keyPoint: '巩固 o e。', interaction: 'review', visual: 'o e 板书' },
  { id: 'W01-D5-S01', segmentId: 'PINYIN-W01-D5-intro', slide: 13, phase: '导入', title: '复习 a o e', durationMinutes: 2, teacherScript: '三个拼音宝宝要检查昨天学的本领。', childAction: '快速认读 a、o、e。', keyPoint: '巩固字母认读。', interaction: 'review', visual: 'a o e 卡片' },
  { id: 'W01-D5-S02', segmentId: 'PINYIN-W01-D5-concept', slide: 13, phase: '示范', title: '书写 e', durationMinutes: 4, teacherScript: 'e 先写短横，再向上向左弯成半圆。', childAction: '书空后在四线三格描画。', keyPoint: '一笔写成，写满中格。', interaction: 'trace', visual: 'PPT第13页：e 的笔顺' },
  { id: 'W01-D5-S03', segmentId: 'PINYIN-W01-D5-practice', slide: 14, phase: '练习', title: '闯关游戏：听音指卡', durationMinutes: 4, teacherScript: '我读一个音，你马上指出 a、o、e。', childAction: '完成听音指卡，升级玩法带声调。', keyPoint: '能听辨字母和声调。', interaction: 'game', visual: 'PPT第14页：听音指卡' },
  { id: 'W01-D5-S04', segmentId: 'PINYIN-W01-D5-application', slide: 15, phase: '辨错', title: '火眼金睛找错误', durationMinutes: 3, teacherScript: '出示口型、调号和占格例，请你当小老师。', childAction: '判断对错，说出哪里要改。', keyPoint: '发现口型、调号、占格错误。', interaction: 'choose', visual: 'PPT第15页：常见错误辨析' },
  { id: 'W01-D5-S05', segmentId: 'PINYIN-W01-D5-summary', slide: 16, phase: '小结', title: '今天我学会了', durationMinutes: 2, teacherScript: '我们一起总结口诀和课后小任务。', childAction: '说收获，领课后任务。', keyPoint: '复习 a o e 和四声口诀。', interaction: 'review', visual: 'PPT第16页：课堂小结' },
  { id: 'W01-D5-S06', segmentId: 'PINYIN-W01-D5-summary', slide: 16, phase: '小结', title: '课后小任务', durationMinutes: 1, teacherScript: '回家当小老师，把今天学的拼音读给爸爸妈妈。', childAction: '记住三个课后任务。', keyPoint: '能向家长展示学习成果。', interaction: 'speak', visual: '课后任务卡' },
];

function task(seed: PinyinTaskSeed, index: number): LessonTask {
  return {
    id: `${seed.knowledgeId}-${index + 1}`,
    type: seed.type,
    prompt: seed.prompt,
    knowledgeId: seed.knowledgeId,
    options: seed.choices?.map((label, optionIndex) => ({
      id: ['a', 'b', 'c'][optionIndex],
      label,
    })),
    answerIds: seed.choices && seed.answerIndex !== undefined ? [`${seed.answerIndex + 1}`.replace('1', 'a').replace('2', 'b').replace('3', 'c')] : undefined,
    hint: seed.hint,
    coaching: seed.coaching,
  };
}

function stage(
  id: string,
  phase: TeachingStage['phase'],
  title: string,
  minutes: number,
  teacherMove: string,
  childAction: string,
  interaction: InteractionKind,
  prompt: string,
  evidence: string,
  feedback: string,
): TeachingStage {
  return { id, phase, title, durationMinutes: minutes, teacherMove, childAction, interaction, prompt, successEvidence: evidence, feedbackIfWrong: feedback };
}

function design(input: {
  focus: string;
  basis: string;
  objectives: string[];
  keyPoint: string;
  difficultPoint: string;
  mistakes: string[];
  board: string;
  tasks: string[];
  reflection: string;
  writing?: boolean;
}): LessonDesign {
  const verb = input.writing ? '书空和描画' : '看口型、跟读';
  return {
    curriculumBasis: input.basis,
    learnerProfile: '5-6岁儿童以形象思维为主，喜欢模仿、儿歌和游戏；注意力短，需要小步子、多鼓励和明确动作提示。',
    objectives: input.objectives,
    keyPoint: input.keyPoint,
    difficultPoint: input.difficultPoint,
    preparation: ['拼音卡片', input.writing ? '四线三格垫板' : '小镜子', '声调手势卡', '金星贴纸'],
    stages: [
      stage('warmup', '导入', '拼音村热身', 2, '用情境和儿歌唤醒旧经验。', '听一听、说一说，做出动作。', 'listen', '上节课的拼音朋友还记得吗？', '能说出或指出已学内容。', '再看一次卡片，跟着老师慢慢说。'),
      stage('model', '示范', input.focus, 4, '示范发音或笔顺，放慢速度。', `${verb}，观察口型或笔画。`, input.writing ? 'trace' : 'speak', `今天的小挑战是：${input.focus}。`, '能模仿要点一次以上。', '不批评，先示范，再让孩子小声跟一遍。'),
      stage('practice', '练习', '分层闯关', 4, '组织指卡、选图或书空练习。', '完成两个小任务。', input.writing ? 'trace' : 'choose', '看清楚，再选一选。', '至少一题独立完成。', '给出线索，而不是直接公布答案。'),
      stage('game', '辨错', '火眼金睛', 3, '出示正误例，引导孩子当小老师。', '判断并说出理由。', 'game', '哪里对？哪里要改？', '能指出一个关键点。', '用对照卡或口诀提示。'),
      stage('summary', '小结', '我会了', 2, '引导复述和家庭任务。', '说出收获，回家当小老师。', 'review', '今天学会了什么？', '能说出一条目标。', '用板书口诀带孩子再说一遍。'),
    ],
    boardSummary: input.board,
    commonMistakes: input.mistakes,
    homeTasks: input.tasks,
    reflectionQuestions: [input.reflection, '哪个孩子还需要下节课补一次小练习？'],
  };
}

const week1Designs: LessonDesign[] = [
  {
    curriculumBasis: '统编版语文一年级上册拼音第1课；配套单韵母 a o e 示范课第1-3页。',
    learnerProfile: '5-6岁儿童以形象思维为主，喜欢模仿声音，但口型容易变形，注意力需要靠情境和游戏维持。',
    objectives: ['听清 a、o、e 三种声音', '认识三个单韵母', '能初步模仿口型'],
    keyPoint: 'a 张大嘴、o 嘴唇圆、e 嘴角扁。',
    difficultPoint: '发音时口型保持不变，声音响亮拉长。',
    preparation: ['a o e 卡片', '情境图', '小镜子'],
    stages: [
      stage('context', '导入', '走进拼音王国', 3, '播放情境图，问医生、公鸡和白鹅分别在做什么。', '观察画面，模仿生活里的声音。', 'listen', '拼音村里传来三种声音，你听到了吗？', '能说出至少一种声音。', '先示范一次，再让孩子跟着说。'),
      stage('discover', '探究', '认识三个拼音宝宝', 4, '依次出示 a、o、e，把声音和形象连接。', '看卡片，听发音，指一指。', 'choose', '哪一个是公鸡打鸣的声音？', '能指出 o。', '重新示范公鸡打鸣，再让孩子选。'),
      stage('mirror', '练习', '小镜子口型游戏', 4, '示范张大嘴、圆嘴、扁嘴。', '照小镜子模仿 a、o、e。', 'mirror', '你的嘴巴和小卡片一样吗？', '能连续模仿两个口型。', '用夸张口型示范，允许小声先练。'),
      stage('check', '辨错', '听音指卡', 3, '打乱顺序读 a、o、e。', '听到声音马上指卡。', 'game', '听一听，指一指。', '三次中至少指对两次。', '放慢速度，配合口型提示。'),
      stage('summary', '小结', '拼音宝宝回家', 1, '带孩子复述三个口型要点。', '说一说今天认识了谁。', 'review', '今天认识了哪三位新朋友？', '能说出 a、o、e。', '按顺序齐说并展示卡片。'),
    ],
    boardSummary: '单韵母 a o e：张大嘴 a，嘴巴圆 o，扁扁嘴 e。',
    commonMistakes: ['o 读成“欧”，嘴唇没有拢圆', 'e 和 o 混淆', '声音太轻'],
    homeTasks: ['把 a、o、e 读给家长听', '在生活里找一个像 a、o、e 的声音'],
    reflectionQuestions: ['孩子能否在提示后保持口型？'],
  },
  {
    curriculumBasis: '统编版语文一年级上册拼音第1课；配套示范课第4-6页。',
    learnerProfile: '孩子已能听出 a、o、e，但对调号方向和手势容易混淆，需要边看边做。',
    objectives: ['认识四个声调符号', '读准 a 的四个声调', '会用声调手势'],
    keyPoint: '一声平、二声扬、三声拐弯、四声降。',
    difficultPoint: '二声上扬到位，三声先降后拐。',
    preparation: ['ā á ǎ à 卡片', '声调手势卡', '四线三格图'],
    stages: [
      stage('review', '导入', '召回拼音宝宝', 2, '出示 a o e，快听快指。', '指卡并跟读。', 'review', '这是哪位拼音宝宝？', '能认出 a。', '放大口型，一起再读。'),
      stage('grid', '探究', '拼音字母的家', 3, '出示四线三格，带孩子数三条线、三层楼。', '指出上格、中格、下格。', 'choose', '字母宝宝住在哪里？', '能指出中格。', '用手掌比出三层楼，再读儿歌。'),
      stage('tone', '示范', 'a 的四顶小帽子', 5, '逐个示范 ā á ǎ à，配合手势。', '看调号，做手势，跟读。', 'gesture', '一声怎么走？二声怎么走？', '能按顺序读四声。', '分开示范调号方向，再连读。'),
      stage('game', '练习', '听音举卡', 4, '打乱顺序读 a 的四个声调。', '听音选卡。', 'game', '老师读的是哪一顶小帽子？', '至少两次选对。', '先区分升降方向，再回到卡片。'),
      stage('summary', '小结', '声调口诀', 1, '齐读声调口诀。', '边说边做手势。', 'review', '今天的声音口诀是什么？', '能说出声调口诀。', '逐句补齐。'),
    ],
    boardSummary: 'a 的四声：ā á ǎ à；一声平，二声扬，三声拐弯，四声降。',
    commonMistakes: ['二声读成一声', '三声没有拐弯', '调号方向看错'],
    homeTasks: ['用手指给家长写一写 ā á ǎ à 的调号方向', '边做手势边读给家长听'],
    reflectionQuestions: ['二声和四声是否仍会混淆？'],
  },
  {
    curriculumBasis: '统编版语文一年级上册拼音第1课；配套示范课第7-9页。',
    learnerProfile: '孩子能读 a 的四声，但手部小肌肉尚在发展，书写需要先书空再描画。',
    objectives: ['知道 a 写在中格', '掌握 a 的两笔笔顺', '读准 o 和它的四声'],
    keyPoint: 'a 先写左半圆，再写竖右弯；o 嘴唇拢圆。',
    difficultPoint: 'a 写满中格但不越线；o 保持圆唇。',
    preparation: ['四线三格垫板', '动态笔顺图', 'o 卡片'],
    stages: [
      stage('review', '导入', 'a 的声音复习', 2, '出示 ā á ǎ à。', '边做手势边读。', 'review', '这四个声音怎么读？', '能按顺序读。', '逐个提示调号方向。'),
      stage('write', '示范', '书写 a', 5, '分步演示左半圆和竖右弯。', '先书空，再描画。', 'trace', 'a 的第一笔是什么？', '能说出两笔并完成描画。', '先书空几次，再落到四线格。'),
      stage('sound', '示范', '学发 o', 4, '用公鸡图示范圆唇。', '照镜子保持圆嘴。', 'mirror', 'o 的嘴巴是圆的还是扁的？', '能保持口型三秒。', '对比 a 和 o 的嘴形。'),
      stage('tone', '练习', 'o 的四声', 3, '出示 ō ó ǒ ò。', '边做手势边读。', 'gesture', 'o 的帽子怎么变？', '能读出四个声调。', '放慢速度，逐个纠正。'),
      stage('summary', '小结', '比一比', 1, '并排出示 a 和 o。', '说出口型差别。', 'review', 'a 和 o 有什么不一样？', '能说出张大嘴和圆嘴。', '用口诀补齐。'),
    ],
    boardSummary: 'a：左半圆+竖右弯，住中格；o：嘴巴圆圆 o o o。',
    commonMistakes: ['a 越过中格', 'a 的笔顺颠倒', 'o 读成“欧”'],
    homeTasks: ['在四线三格本描 a 一行', '把 o 的四声读给家长听'],
    reflectionQuestions: ['孩子书写时是否握笔过紧？'],
  },
  {
    curriculumBasis: '统编版语文一年级上册拼音第1课；配套示范课第10-12页。',
    learnerProfile: '孩子能模仿 o 的圆唇，但连续任务后容易分散注意力，需要用画圈和手势维持兴趣。',
    objectives: ['掌握 o 的书写方法', '读准 e 的发音', '读准 e 的四个声调'],
    keyPoint: 'o 一笔写成；e 嘴角向两边展开。',
    difficultPoint: 'o 写圆合拢；e 不与 o 混淆。',
    preparation: ['四线三格', '白鹅倒影图', 'e 卡片'],
    stages: [
      stage('review', '导入', '圆圈检查', 2, '出示 o 的书写例。', '判断是否写圆。', 'review', '这个 o 写得圆圆的吗？', '能指出问题。', '给出正确例对照。'),
      stage('write', '示范', '书写 o', 4, '演示从左上起笔转一圈。', '书空后描画。', 'trace', 'o 是几笔写成？', '能一笔画圆并写在中格。', '先空中画大圈，再缩小到格内。'),
      stage('sound', '示范', '学发 e', 4, '用白鹅倒影引入，示范扁嘴。', '照镜子模仿。', 'mirror', 'e 的嘴巴像什么？', '能做出扁嘴。', '对比圆嘴 o 和扁嘴 e。'),
      stage('tone', '练习', 'e 的四声', 4, '示范 ē é ě è。', '看卡片跟读。', 'gesture', 'e 的四声怎么读？', '能按顺序读。', '先做手势，再发声。'),
      stage('summary', '小结', 'o 和 e', 1, '并排出示。', '说差别。', 'review', 'o 和 e 哪里不一样？', '能说出圆嘴和扁嘴。', '用镜子和口诀确认。'),
    ],
    boardSummary: 'o：一笔圆又圆；e：扁扁嘴巴 e e e。',
    commonMistakes: ['o 不合拢', 'e 读成 o', 'e 的口型过圆'],
    homeTasks: ['描 o 和 e 各一行', '找一找生活里像 e 的声音'],
    reflectionQuestions: ['e 的舌位提示是否需要更形象？'],
  },
  {
    curriculumBasis: '统编版语文一年级上册拼音第1课；配套示范课第13-16页。',
    learnerProfile: '孩子已接触 a、o、e 的音和形，需要通过游戏和辨错把知识稳定下来。',
    objectives: ['掌握 e 的书写', '听辨 a、o、e', '发现常见错误'],
    keyPoint: 'e 先写短横，再弯成半圆；能辨认口型、调号、占格错误。',
    difficultPoint: '连续听辨时不混淆；书写占满中格。',
    preparation: ['a o e 卡片', '正误例卡', '四线三格'],
    stages: [
      stage('review', '导入', '三个朋友集合', 2, '打乱出示 a o e。', '快速认读。', 'review', '这是谁？', '能认读。', '配合口型提示。'),
      stage('write', '示范', '书写 e', 4, '演示短横加半圆。', '书空并描画。', 'trace', 'e 的第一笔在哪里？', '能说出两步。', '用箭头图分步提示。'),
      stage('listen', '练习', '听音指卡', 4, '读不带调与带调音。', '快速指卡。', 'listen', '听到哪个宝宝？', '多数能指对。', '先不带调，再带调升级。'),
      stage('error', '辨错', '火眼金睛', 3, '出示口型、调号、占格错误。', '当小老师判断。', 'game', '哪里出错了？', '能说出一个理由。', '逐项给出正确对照。'),
      stage('summary', '小结', '小老师任务', 2, '复述口诀，布置家庭任务。', '整理收获。', 'review', '回家要教家长什么？', '能说出任务。', '用任务卡确认。'),
    ],
    boardSummary: '张大嘴 a，嘴巴圆 o，扁扁嘴 e；四线三格住中格；一声平，二声扬，三声拐弯，四声降。',
    commonMistakes: ['书写出格', '调号方向错', '口型变形'],
    homeTasks: ['当小老师读 a o e 和四声', '描 a o e 各一行', '找生活中的 a o e 声音'],
    reflectionQuestions: ['游戏和镜子是否帮助孩子突破了难点？'],
  },
];

const laterSessions: Array<{
  title: string;
  knowledgeIds: string[];
  objectives: string[];
  keyPoint: string;
  difficultPoint: string;
  mistakes: string[];
  board: string;
  tasks: string[];
  drills: [PinyinTaskSeed, PinyinTaskSeed, PinyinTaskSeed];
  writing?: boolean;
}> = [
  { title: '复习 a o e + 学发 i', knowledgeIds: ['PINYIN-VOWEL-A', 'PINYIN-VOWEL-O', 'PINYIN-VOWEL-E', 'PINYIN-VOWEL-I'], objectives: ['巩固 a o e', '读准 i', '区分 i 和 y'], keyPoint: 'i 嘴角展开，又细又亮。', difficultPoint: '不把 i 读成英语字母 y。', mistakes: ['读成 y', '声音太短'], board: 'i：嘴角展开，细细亮亮。', tasks: ['把 i 读给家长听', '找一找像 i 的声音'], drills: [
    { type: 'audio-choice', prompt: '哪个是 i？', choices: ['e', 'i', 'o'], answerIndex: 1, hint: '嘴角向两边展开。', coaching: '你能分清扁嘴 e 和细亮 i。', knowledgeId: 'PINYIN-VOWEL-I' },
    { type: 'choice', prompt: '“衣服”的第一个音是？', choices: ['i', 'u', 'e'], answerIndex: 0, hint: '衣服的衣。', coaching: '你能联系生活读 i。', knowledgeId: 'PINYIN-VOWEL-I' },
    { type: 'choice', prompt: '哪个不是今天的新朋友？', choices: ['a', 'i', 'ü'], answerIndex: 2, hint: 'ü 下一节学。', coaching: '你能记住 a o e 和 i。', knowledgeId: 'PINYIN-VOWEL-A' },
  ] },
  { title: 'i 的四个声调', knowledgeIds: ['PINYIN-VOWEL-I', 'PINYIN-TONES'], objectives: ['读准 i 的四声', '会用声调手势'], keyPoint: 'i 的调号写法特殊，读时仍叫 i。', difficultPoint: '二声和四声方向。', mistakes: ['升降方向错'], board: 'ī í ǐ ì：平、扬、拐弯、降。', tasks: ['读 ī í ǐ ì 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 í？', choices: ['ī', 'í', 'ì'], answerIndex: 1, hint: '二声往上扬。', coaching: '你能听出上扬音。', knowledgeId: 'PINYIN-TONES' },
    { type: 'choice', prompt: '三声怎么读？', choices: ['平', '上扬', '拐弯'], answerIndex: 2, hint: '先降再升。', coaching: '你能做出三声手势。', knowledgeId: 'PINYIN-TONES' },
    { type: 'recording', prompt: '跟读 ī í ǐ ì。', hint: '一个一个读。', coaching: '你能读完整四声。', knowledgeId: 'PINYIN-VOWEL-I' },
  ] },
  { title: '学发 u', knowledgeIds: ['PINYIN-VOWEL-U'], objectives: ['读准 u', '保持圆唇'], keyPoint: 'u 嘴唇拢圆留小孔。', difficultPoint: '不把 u 读成 ou。', mistakes: ['嘴唇展开', '读成欧'], board: 'u：嘴唇圆圆留小孔。', tasks: ['读 u 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 u？', choices: ['i', 'u', 'e'], answerIndex: 1, hint: '嘴唇拢圆。', coaching: '你能做出小圆孔。', knowledgeId: 'PINYIN-VOWEL-U' },
    { type: 'choice', prompt: '“屋子”的第一个音是？', choices: ['u', 'i', 'e'], answerIndex: 0, hint: '屋子的屋。', coaching: '你能联系生活读 u。', knowledgeId: 'PINYIN-VOWEL-U' },
    { type: 'recording', prompt: '跟读 u——u——u。', hint: '声音拉长。', coaching: '你能保持口型。', knowledgeId: 'PINYIN-VOWEL-U' },
  ] },
  { title: 'u 的四个声调', knowledgeIds: ['PINYIN-VOWEL-U', 'PINYIN-TONES'], objectives: ['读准 u 的四声', '巩固手势'], keyPoint: '圆唇不动，调号变化。', difficultPoint: '口型变形。', mistakes: ['读成 ou'], board: 'ū ú ǔ ù。', tasks: ['读 u 的四声给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ǔ？', choices: ['ū', 'ú', 'ǔ'], answerIndex: 2, hint: '三声拐弯。', coaching: '你能听出拐弯音。', knowledgeId: 'PINYIN-TONES' },
    { type: 'choice', prompt: '四声怎么走？', choices: ['平', '上扬', '下降'], answerIndex: 2, hint: '从高到低。', coaching: '你能做出四声手势。', knowledgeId: 'PINYIN-TONES' },
    { type: 'recording', prompt: '跟读 ū ú ǔ ù。', hint: '嘴巴不动。', coaching: '你能保持圆唇。', knowledgeId: 'PINYIN-VOWEL-U' },
  ] },
  { title: '学发 ü 并比较 i u ü', writing: true, knowledgeIds: ['PINYIN-VOWEL-U-UMLAUT', 'PINYIN-VOWEL-I', 'PINYIN-VOWEL-U'], objectives: ['读准 ü', '区分 i u ü', '尝试占格书写'], keyPoint: 'ü 像 i 但嘴唇拢圆。', difficultPoint: 'ü 和 u 区分。', mistakes: ['忘记圆唇', 'i u 混淆'], board: 'i 细细，u 圆圆，ü 先扁后圆。', tasks: ['读 i u ü 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ü？', choices: ['i', 'u', 'ü'], answerIndex: 2, hint: '先做 i，再圆唇。', coaching: '你能区分三个单韵母。', knowledgeId: 'PINYIN-VOWEL-U-UMLAUT' },
    { type: 'choice', prompt: '“小鱼”的第一个音是？', choices: ['u', 'ü', 'i'], answerIndex: 1, hint: '小鱼的鱼。', coaching: '你能联系生活读 ü。', knowledgeId: 'PINYIN-VOWEL-U-UMLAUT' },
    { type: 'tracing', prompt: '在四线三格描画 i u ü。', hint: '看清占格。', coaching: '你能完成单韵母书写。', knowledgeId: 'PINYIN-VOWEL-U-UMLAUT' },
  ] },
  { title: '声母 b p', knowledgeIds: ['PINYIN-INITIAL-B', 'PINYIN-INITIAL-P'], objectives: ['认读 b p', '听辨送气和不送气'], keyPoint: 'b 不送气，p 有强气流。', difficultPoint: 'b p 混淆。', mistakes: ['不送气', '读成英语字母'], board: 'b 不送气，p 有气流。', tasks: ['用纸巾做 b p 送气小游戏'], drills: [
    { type: 'audio-choice', prompt: '老师读的是 b 还是 p？', choices: ['b', 'p', 'm'], answerIndex: 1, hint: '看纸巾是否动。', coaching: '你能听出气流。', knowledgeId: 'PINYIN-INITIAL-P' },
    { type: 'choice', prompt: '“爸爸”开头是？', choices: ['b', 'p', 'm'], answerIndex: 0, hint: '爸爸的爸。', coaching: '你能联系生活认 b。', knowledgeId: 'PINYIN-INITIAL-B' },
    { type: 'recording', prompt: '跟读 b p b p。', hint: '手掌放嘴前。', coaching: '你能感受气流差别。', knowledgeId: 'PINYIN-INITIAL-B' },
  ] },
  { title: '声母 m f', knowledgeIds: ['PINYIN-INITIAL-M', 'PINYIN-INITIAL-F'], objectives: ['读准 m f', '知道鼻音和唇齿音'], keyPoint: 'm 气流从鼻腔出，f 上齿碰下唇。', difficultPoint: 'f 不要读成 h。', mistakes: ['m 气流走嘴', 'f 读成 h'], board: 'm 闭嘴哼鼻音；f 上齿碰下唇。', tasks: ['找家中的 m f 词语'], drills: [
    { type: 'audio-choice', prompt: '哪个是 f？', choices: ['m', 'f', 'n'], answerIndex: 1, hint: '上齿碰下唇。', coaching: '你能读准唇齿音。', knowledgeId: 'PINYIN-INITIAL-F' },
    { type: 'choice', prompt: '“妈妈”开头是？', choices: ['m', 'f', 'b'], answerIndex: 0, hint: '妈妈的妈。', coaching: '你能读准鼻音。', knowledgeId: 'PINYIN-INITIAL-M' },
    { type: 'recording', prompt: '跟读 m f m f。', hint: '先慢后快。', coaching: '你能清楚发音。', knowledgeId: 'PINYIN-INITIAL-M' },
  ] },
  { title: '声母 d t', knowledgeIds: ['PINYIN-INITIAL-D', 'PINYIN-INITIAL-T'], objectives: ['认读 d t', '听辨送气差别'], keyPoint: 'd 气弱，t 送气。', difficultPoint: 'd t 混淆。', mistakes: ['不送气', '字形看反'], board: 'd 气弱，t 送气。', tasks: ['读 d t 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 t？', choices: ['d', 't', 'n'], answerIndex: 1, hint: '有较强气流。', coaching: '你能听出送气音。', knowledgeId: 'PINYIN-INITIAL-T' },
    { type: 'choice', prompt: '“大雁”开头是？', choices: ['d', 't', 'l'], answerIndex: 0, hint: '大雁的大。', coaching: '你能联系生活读 d。', knowledgeId: 'PINYIN-INITIAL-D' },
    { type: 'recording', prompt: '跟读 d t d t。', hint: '手掌试气流。', coaching: '你能区分两音。', knowledgeId: 'PINYIN-INITIAL-D' },
  ] },
  { title: '声母 n l', knowledgeIds: ['PINYIN-INITIAL-N', 'PINYIN-INITIAL-L'], objectives: ['读准 n l', '分辨鼻音和边音'], keyPoint: 'n 气流从鼻子出，l 从舌头两边出。', difficultPoint: 'n l 混淆。', mistakes: ['鼻音太重', '气流路线错'], board: 'n 鼻子出气；l 舌边出气。', tasks: ['捏鼻子做 n l 小实验'], drills: [
    { type: 'audio-choice', prompt: '哪个是 n？', choices: ['l', 'n', 'd'], answerIndex: 1, hint: '鼻子出气。', coaching: '你能感受鼻音。', knowledgeId: 'PINYIN-INITIAL-N' },
    { type: 'choice', prompt: '“老虎”开头是？', choices: ['n', 'l', 'd'], answerIndex: 1, hint: '老虎的老。', coaching: '你能读准 l。', knowledgeId: 'PINYIN-INITIAL-L' },
    { type: 'recording', prompt: '跟读 n l n l。', hint: '慢慢换位置。', coaching: '你能区分鼻音和边音。', knowledgeId: 'PINYIN-INITIAL-N' },
  ] },
  { title: 'b p m f d t n l 复习', writing: true, knowledgeIds: ['PINYIN-INITIAL-B', 'PINYIN-INITIAL-P', 'PINYIN-INITIAL-M', 'PINYIN-INITIAL-F', 'PINYIN-INITIAL-D', 'PINYIN-INITIAL-T', 'PINYIN-INITIAL-N', 'PINYIN-INITIAL-L'], objectives: ['认读 8 个声母', '听辨易混声母', '尝试描画'], keyPoint: '按发音部位分组记忆。', difficultPoint: 'b p d t n l 快速听辨。', mistakes: ['混淆送气', '字形看反'], board: '双唇、唇齿、舌尖，分组记。', tasks: ['读 8 个声母给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 p？', choices: ['b', 'p', 'd'], answerIndex: 1, hint: '有强气流。', coaching: '你能稳定听辨。', knowledgeId: 'PINYIN-INITIAL-P' },
    { type: 'choice', prompt: '哪个是 l？', choices: ['n', 'l', 't'], answerIndex: 1, hint: '舌边出气。', coaching: '你能避免鼻音干扰。', knowledgeId: 'PINYIN-INITIAL-L' },
    { type: 'tracing', prompt: '挑两个声母在四线三格描画。', hint: '先书空。', coaching: '你能完成声母书写。', knowledgeId: 'PINYIN-INITIAL-B' },
  ] },
  { title: '声母 g k', knowledgeIds: ['PINYIN-INITIAL-G', 'PINYIN-INITIAL-K'], objectives: ['读准 g k', '听辨送气'], keyPoint: 'g 气弱，k 送气。', difficultPoint: '不读英语字母名。', mistakes: ['读英文字母', '不送气'], board: 'g 气弱，k 送气。', tasks: ['读 g k 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 k？', choices: ['g', 'k', 'h'], answerIndex: 1, hint: '有较强气流。', coaching: '你能听出送气。', knowledgeId: 'PINYIN-INITIAL-K' },
    { type: 'choice', prompt: '“哥哥”开头是？', choices: ['g', 'k', 'h'], answerIndex: 0, hint: '哥哥的哥。', coaching: '你能联系生活读 g。', knowledgeId: 'PINYIN-INITIAL-G' },
    { type: 'recording', prompt: '跟读 g k g k。', hint: '舌根发力。', coaching: '你能准确发音。', knowledgeId: 'PINYIN-INITIAL-G' },
  ] },
  { title: '声母 h', knowledgeIds: ['PINYIN-INITIAL-H'], objectives: ['读准 h', '区分 h f'], keyPoint: 'h 是舌根擦音。', difficultPoint: '不与 f 混。', mistakes: ['读成 f'], board: 'h：舌根和软腭留缝。', tasks: ['找 h 开头词语'], drills: [
    { type: 'audio-choice', prompt: '哪个是 h？', choices: ['f', 'h', 'g'], answerIndex: 1, hint: '舌根出气。', coaching: '你能读准 h。', knowledgeId: 'PINYIN-INITIAL-H' },
    { type: 'choice', prompt: '“花儿”开头是？', choices: ['h', 'f', 'g'], answerIndex: 0, hint: '花的花。', coaching: '你能联系生活读 h。', knowledgeId: 'PINYIN-INITIAL-H' },
    { type: 'recording', prompt: '跟读 h——h——h。', hint: '像哈气。', coaching: '你能稳定发音。', knowledgeId: 'PINYIN-INITIAL-H' },
  ] },
  { title: '声母 j q', knowledgeIds: ['PINYIN-INITIAL-J', 'PINYIN-INITIAL-Q'], objectives: ['读准 j q', '听辨不送气和送气'], keyPoint: 'q 有强气流。', difficultPoint: 'j q 混淆。', mistakes: ['不送气'], board: 'j 气弱，q 送气。', tasks: ['读 j q 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 q？', choices: ['j', 'q', 'x'], answerIndex: 1, hint: '有较强气流。', coaching: '你能听出送气。', knowledgeId: 'PINYIN-INITIAL-Q' },
    { type: 'choice', prompt: '“机器”第一个音是？', choices: ['j', 'q', 'x'], answerIndex: 0, hint: '机器的机。', coaching: '你能联系生活读 j。', knowledgeId: 'PINYIN-INITIAL-J' },
    { type: 'recording', prompt: '跟读 j q j q。', hint: '舌面发力。', coaching: '你能清楚发音。', knowledgeId: 'PINYIN-INITIAL-J' },
  ] },
  { title: '声母 x 和 j q x 规则', knowledgeIds: ['PINYIN-INITIAL-X', 'PINYIN-INITIAL-J', 'PINYIN-INITIAL-Q'], objectives: ['读准 x', '知道 j q x 后 ü 写成 u'], keyPoint: 'j q x 遇 ü，两点省略。', difficultPoint: '省写后仍读 ü。', mistakes: ['读成 u'], board: 'j q x + ü，两点要省略。', tasks: ['说一说 ju qu xu 的读音'], drills: [
    { type: 'audio-choice', prompt: '哪个是 x？', choices: ['j', 'q', 'x'], answerIndex: 2, hint: '舌面擦音。', coaching: '你能读准 x。', knowledgeId: 'PINYIN-INITIAL-X' },
    { type: 'choice', prompt: 'ju 里的 u 实际读？', choices: ['u', 'ü', 'o'], answerIndex: 1, hint: 'j q x 后省略两点。', coaching: '你记住了拼音规则。', knowledgeId: 'PINYIN-INITIAL-J' },
    { type: 'recording', prompt: '跟读 ji qi xi。', hint: '舌面轻碰。', coaching: '你能连读三音。', knowledgeId: 'PINYIN-INITIAL-X' },
  ] },
  { title: 'g k h j q x 复习', writing: true, knowledgeIds: ['PINYIN-INITIAL-G', 'PINYIN-INITIAL-K', 'PINYIN-INITIAL-H', 'PINYIN-INITIAL-J', 'PINYIN-INITIAL-Q', 'PINYIN-INITIAL-X'], objectives: ['认读 6 个声母', '巩固 j q x ü 规则', '描画字母'], keyPoint: '舌根音和舌面音分组。', difficultPoint: '规则迁移。', mistakes: ['读英文字母', '省写后读错'], board: '舌根 g k h；舌面 j q x。', tasks: ['读 6 个声母给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 h？', choices: ['g', 'h', 'q'], answerIndex: 1, hint: '舌根出气。', coaching: '你能快速听辨。', knowledgeId: 'PINYIN-INITIAL-H' },
    { type: 'choice', prompt: 'qu 里的 u 读？', choices: ['u', 'ü', 'o'], answerIndex: 1, hint: 'q 后省写两点。', coaching: '你能运用规则。', knowledgeId: 'PINYIN-INITIAL-Q' },
    { type: 'tracing', prompt: '在四线三格描画 g 或 q。', hint: '看清字形。', coaching: '你能避免字形看反。', knowledgeId: 'PINYIN-INITIAL-G' },
  ] },
  { title: '声母 zh ch', knowledgeIds: ['PINYIN-INITIAL-ZH', 'PINYIN-INITIAL-CH'], objectives: ['读准翘舌音 zh ch', '听辨送气'], keyPoint: '舌尖翘起，ch 送气强。', difficultPoint: '平翘舌区分。', mistakes: ['读成 z c'], board: 'zh 气弱，ch 送气。', tasks: ['照镜子读 zh ch'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ch？', choices: ['zh', 'ch', 'c'], answerIndex: 1, hint: '送气强。', coaching: '你能听出气流。', knowledgeId: 'PINYIN-INITIAL-CH' },
    { type: 'choice', prompt: '“桌子”开头是？', choices: ['zh', 'z', 'c'], answerIndex: 0, hint: '桌子的桌。', coaching: '你能翘起舌尖。', knowledgeId: 'PINYIN-INITIAL-ZH' },
    { type: 'recording', prompt: '跟读 zh ch zh ch。', hint: '舌尖向上。', coaching: '你能保持翘舌。', knowledgeId: 'PINYIN-INITIAL-ZH' },
  ] },
  { title: '声母 sh r', knowledgeIds: ['PINYIN-INITIAL-SH', 'PINYIN-INITIAL-R'], objectives: ['读准 sh r', '区分 sh 和 r'], keyPoint: 'sh 擦音，r 舌尖浊音。', difficultPoint: 'r 不要读成 l。', mistakes: ['r 读成 l', '舌尖不够翘'], board: 'sh 舌尖翘起；r 舌尖轻振。', tasks: ['读 sh r 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 r？', choices: ['sh', 'r', 'l'], answerIndex: 1, hint: '舌尖轻抬。', coaching: '你能读准 r。', knowledgeId: 'PINYIN-INITIAL-R' },
    { type: 'choice', prompt: '“老师”结尾音是？', choices: ['s', 'sh', 'r'], answerIndex: 1, hint: '老师的师。', coaching: '你能联系生活读 sh。', knowledgeId: 'PINYIN-INITIAL-SH' },
    { type: 'recording', prompt: '跟读 sh r sh r。', hint: '舌头慢慢移动。', coaching: '你能区分两音。', knowledgeId: 'PINYIN-INITIAL-R' },
  ] },
  { title: '声母 z c', knowledgeIds: ['PINYIN-INITIAL-Z', 'PINYIN-INITIAL-C'], objectives: ['读准平舌 z c', '对比 zh ch'], keyPoint: 'z 气弱，c 送气。', difficultPoint: '平翘舌不分。', mistakes: ['读成翘舌'], board: 'z c 舌尖平；zh ch 舌尖翘。', tasks: ['读 z c 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 c？', choices: ['z', 'c', 'zh'], answerIndex: 1, hint: '送气强。', coaching: '你能听出平舌送气。', knowledgeId: 'PINYIN-INITIAL-C' },
    { type: 'choice', prompt: '“白菜”第一个音是？', choices: ['z', 'c', 'zh'], answerIndex: 1, hint: '白菜的菜。', coaching: '你能联系生活读 c。', knowledgeId: 'PINYIN-INITIAL-C' },
    { type: 'recording', prompt: '跟读 z c zh ch。', hint: '舌尖位置变化。', coaching: '你能对比平翘舌。', knowledgeId: 'PINYIN-INITIAL-Z' },
  ] },
  { title: '声母 s', knowledgeIds: ['PINYIN-INITIAL-S'], objectives: ['读准 s', '区分 s sh'], keyPoint: 's 舌尖平，气流摩擦。', difficultPoint: '不读成 sh。', mistakes: ['舌尖翘起'], board: 's：舌尖接近上齿背。', tasks: ['读 s 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 s？', choices: ['sh', 's', 'c'], answerIndex: 1, hint: '舌尖放平。', coaching: '你能读准平舌。', knowledgeId: 'PINYIN-INITIAL-S' },
    { type: 'choice', prompt: '“四”的声母是？', choices: ['s', 'sh', 'c'], answerIndex: 0, hint: '四的四。', coaching: '你能联系生活读 s。', knowledgeId: 'PINYIN-INITIAL-S' },
    { type: 'recording', prompt: '跟读 s——s——s。', hint: '像轻轻吹气。', coaching: '你能保持平舌。', knowledgeId: 'PINYIN-INITIAL-S' },
  ] },
  { title: '声母 y w', knowledgeIds: ['PINYIN-INITIAL-Y', 'PINYIN-INITIAL-W'], objectives: ['认读 y w', '不与 i u 混淆'], keyPoint: 'y w 是声母，i u 是韵母。', difficultPoint: '儿童容易当作一样。', mistakes: ['y i 混淆', 'w u 混淆'], board: 'y 走在前，w 圆又圆。', tasks: ['读 y w 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 y？', choices: ['i', 'y', 'u'], answerIndex: 1, hint: '声母 y。', coaching: '你能分清声母韵母。', knowledgeId: 'PINYIN-INITIAL-Y' },
    { type: 'choice', prompt: '“蜗牛”开头是？', choices: ['w', 'u', 'm'], answerIndex: 0, hint: '蜗牛的蜗。', coaching: '你能联系生活读 w。', knowledgeId: 'PINYIN-INITIAL-W' },
    { type: 'recording', prompt: '跟读 y w y w。', hint: '声音清楚。', coaching: '你能读准声母。', knowledgeId: 'PINYIN-INITIAL-Y' },
  ] },
  { title: '声母总复习', writing: true, knowledgeIds: ['PINYIN-INITIAL-ZH', 'PINYIN-INITIAL-CH', 'PINYIN-INITIAL-SH', 'PINYIN-INITIAL-R', 'PINYIN-INITIAL-Z', 'PINYIN-INITIAL-C', 'PINYIN-INITIAL-S', 'PINYIN-INITIAL-Y', 'PINYIN-INITIAL-W'], objectives: ['复习 23 个声母', '听辨易混声母', '完成书写任务'], keyPoint: '按发音部位和送气分组。', difficultPoint: '平翘舌和 n l。', mistakes: ['气流不稳', '字形看反'], board: '声母列车：双唇、唇齿、舌尖、舌面、舌根。', tasks: ['给家长当小老师复习声母'], drills: [
    { type: 'audio-choice', prompt: '哪个是 sh？', choices: ['s', 'sh', 'c'], answerIndex: 1, hint: '舌尖翘起。', coaching: '你能快速听辨。', knowledgeId: 'PINYIN-INITIAL-SH' },
    { type: 'choice', prompt: '哪个是 w？', choices: ['u', 'w', 'm'], answerIndex: 1, hint: '圆又圆。', coaching: '你能分清声母韵母。', knowledgeId: 'PINYIN-INITIAL-W' },
    { type: 'tracing', prompt: '挑三个易错声母描画。', hint: '写满四线格。', coaching: '你能巩固字形。', knowledgeId: 'PINYIN-INITIAL-ZH' },
  ] },
  { title: '复韵母 ai ei', knowledgeIds: ['PINYIN-FINAL-AI', 'PINYIN-FINAL-EI'], objectives: ['读准 ai ei', '从前音滑到后音'], keyPoint: '复韵母要滑动。', difficultPoint: '两个音合成一个。', mistakes: ['只读一个音'], board: 'ai：a 滑到 i；ei：e 滑到 i。', tasks: ['读 ai ei 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ai？', choices: ['ai', 'ei', 'e'], answerIndex: 0, hint: 'a 滑到 i。', coaching: '你能听出滑动。', knowledgeId: 'PINYIN-FINAL-AI' },
    { type: 'choice', prompt: '“飞机”的第一个韵母是？', choices: ['ei', 'ai', 'ao'], answerIndex: 0, hint: '飞机的飞。', coaching: '你能联系生活读 ei。', knowledgeId: 'PINYIN-FINAL-EI' },
    { type: 'recording', prompt: '跟读 ai ei ai ei。', hint: '口型慢慢变。', coaching: '你能完成滑动。', knowledgeId: 'PINYIN-FINAL-AI' },
  ] },
  { title: '复韵母 ui', knowledgeIds: ['PINYIN-FINAL-UI', 'PINYIN-FINAL-EI'], objectives: ['读准 ui', '区分 ui ei'], keyPoint: 'ui 是 uei 的缩写。', difficultPoint: '中间的 u 不丢。', mistakes: ['读成 ei'], board: 'ui：u 滑到 i。', tasks: ['读 ui 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ui？', choices: ['ei', 'ui', 'iu'], answerIndex: 1, hint: 'u 滑到 i。', coaching: '你能听出复韵母。', knowledgeId: 'PINYIN-FINAL-UI' },
    { type: 'choice', prompt: '“水”的韵母是？', choices: ['ui', 'ei', 'ao'], answerIndex: 0, hint: '水的 shuǐ。', coaching: '你能联系生活读 ui。', knowledgeId: 'PINYIN-FINAL-UI' },
    { type: 'recording', prompt: '跟读 ui——ui。', hint: '先圆唇再展唇。', coaching: '你能完整滑动。', knowledgeId: 'PINYIN-FINAL-UI' },
  ] },
  { title: '复韵母 ao ou', knowledgeIds: ['PINYIN-FINAL-AO', 'PINYIN-FINAL-OU'], objectives: ['读准 ao ou', '听辨两音'], keyPoint: 'a/o 起始，滑向 u。', difficultPoint: '结尾不要丢。', mistakes: ['读成单韵母'], board: 'ao：a 到 o；ou：o 到 u。', tasks: ['读 ao ou 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ao？', choices: ['ao', 'ou', 'o'], answerIndex: 0, hint: 'a 滑到 o。', coaching: '你能读出滑动。', knowledgeId: 'PINYIN-FINAL-AO' },
    { type: 'choice', prompt: '“狗”的韵母是？', choices: ['ao', 'ou', 'ei'], answerIndex: 1, hint: '狗狗的狗。', coaching: '你能联系生活读 ou。', knowledgeId: 'PINYIN-FINAL-OU' },
    { type: 'recording', prompt: '跟读 ao ou。', hint: '口型慢慢变。', coaching: '你能滑动自然。', knowledgeId: 'PINYIN-FINAL-AO' },
  ] },
  { title: '复韵母 iu', knowledgeIds: ['PINYIN-FINAL-IU', 'PINYIN-FINAL-OU'], objectives: ['读准 iu', '区分 iu ou'], keyPoint: 'iu 是 iou 的缩写。', difficultPoint: '中间 o 不丢。', mistakes: ['读成 iu 短音'], board: 'iu：i 滑到 u。', tasks: ['读 iu 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 iu？', choices: ['ui', 'iu', 'ou'], answerIndex: 1, hint: 'i 滑到 u。', coaching: '你能听清方向。', knowledgeId: 'PINYIN-FINAL-IU' },
    { type: 'choice', prompt: '“六”的韵母是？', choices: ['iu', 'ui', 'ou'], answerIndex: 0, hint: '六的 liù。', coaching: '你能联系生活读 iu。', knowledgeId: 'PINYIN-FINAL-IU' },
    { type: 'recording', prompt: '跟读 iu——iu。', hint: '先展唇后圆唇。', coaching: '你能完整滑动。', knowledgeId: 'PINYIN-FINAL-IU' },
  ] },
  { title: 'ai ei ui ao ou iu 复习', writing: true, knowledgeIds: ['PINYIN-FINAL-AI', 'PINYIN-FINAL-EI', 'PINYIN-FINAL-UI', 'PINYIN-FINAL-AO', 'PINYIN-FINAL-OU', 'PINYIN-FINAL-IU'], objectives: ['复习 6 个复韵母', '听辨相近复韵母', '描画复韵母'], keyPoint: '从前音滑向后音。', difficultPoint: '方向不能反。', mistakes: ['滑动不完整'], board: 'ai ei ui；ao ou iu。', tasks: ['读 6 个复韵母给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ei？', choices: ['ai', 'ei', 'ui'], answerIndex: 1, hint: 'e 滑到 i。', coaching: '你能听辨相近音。', knowledgeId: 'PINYIN-FINAL-EI' },
    { type: 'choice', prompt: '哪个是 ou？', choices: ['ao', 'ou', 'iu'], answerIndex: 1, hint: 'o 滑到 u。', coaching: '你能保持方向。', knowledgeId: 'PINYIN-FINAL-OU' },
    { type: 'tracing', prompt: '在四线三格描画 ai 或 ou。', hint: '字母靠近。', coaching: '你能完成复韵母书写。', knowledgeId: 'PINYIN-FINAL-AI' },
  ] },
  { title: '复韵母 ie üe', knowledgeIds: ['PINYIN-FINAL-IE', 'PINYIN-FINAL-UE'], objectives: ['读准 ie üe', '区分两音'], keyPoint: 'üe 开头圆唇。', difficultPoint: 'ie üe 混淆。', mistakes: ['üe 读成 ie'], board: 'ie：i 到 e；üe：ü 到 e。', tasks: ['读 ie üe 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 üe？', choices: ['ie', 'üe', 'ei'], answerIndex: 1, hint: '开头圆唇。', coaching: '你能听出圆唇。', knowledgeId: 'PINYIN-FINAL-UE' },
    { type: 'choice', prompt: '“月亮”的韵母是？', choices: ['ie', 'üe', 'ei'], answerIndex: 1, hint: '月亮的月。', coaching: '你能联系生活读 üe。', knowledgeId: 'PINYIN-FINAL-UE' },
    { type: 'recording', prompt: '跟读 ie üe。', hint: '注意开头嘴形。', coaching: '你能区分两音。', knowledgeId: 'PINYIN-FINAL-IE' },
  ] },
  { title: '特殊韵母 er', knowledgeIds: ['PINYIN-FINAL-ER'], objectives: ['读准 er', '知道 er 要卷舌'], keyPoint: 'er 单独成音节时卷舌。', difficultPoint: '舌尖位置。', mistakes: ['读成 e'], board: 'er：e 加卷舌。', tasks: ['读 er 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 er？', choices: ['e', 'er', 'en'], answerIndex: 1, hint: '舌头卷起。', coaching: '你能读准卷舌。', knowledgeId: 'PINYIN-FINAL-ER' },
    { type: 'choice', prompt: '“耳朵”的韵母是？', choices: ['er', 'e', 'en'], answerIndex: 0, hint: '耳朵的耳。', coaching: '你能联系生活读 er。', knowledgeId: 'PINYIN-FINAL-ER' },
    { type: 'recording', prompt: '跟读 er——er。', hint: '舌尖轻卷。', coaching: '你能稳定发音。', knowledgeId: 'PINYIN-FINAL-ER' },
  ] },
  { title: '前鼻韵母 an en in', knowledgeIds: ['PINYIN-FINAL-AN', 'PINYIN-FINAL-EN', 'PINYIN-FINAL-IN'], objectives: ['读准 an en in', '舌尖抵住上齿龈'], keyPoint: '结尾带鼻音 n。', difficultPoint: '鼻音不能丢。', mistakes: ['读成口音'], board: 'an en in，舌尖上齿龈。', tasks: ['读 an en in 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 an？', choices: ['an', 'en', 'in'], answerIndex: 0, hint: '先张口再鼻音。', coaching: '你能读准 an。', knowledgeId: 'PINYIN-FINAL-AN' },
    { type: 'choice', prompt: '“门”的韵母是？', choices: ['an', 'en', 'in'], answerIndex: 1, hint: '门的 mén。', coaching: '你能联系生活读 en。', knowledgeId: 'PINYIN-FINAL-EN' },
    { type: 'recording', prompt: '跟读 an en in。', hint: '结尾收鼻音。', coaching: '你能保持鼻音。', knowledgeId: 'PINYIN-FINAL-IN' },
  ] },
  { title: '前鼻韵母 un ün', knowledgeIds: ['PINYIN-FINAL-UN', 'PINYIN-FINAL-UN-UMLAUT'], objectives: ['读准 un ün', '区分 u 和 ü 开头'], keyPoint: 'ün 开头圆唇。', difficultPoint: 'un ün 混淆。', mistakes: ['ün 读成 un'], board: 'un：u 到 n；ün：ü 到 n。', tasks: ['读 un ün 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ün？', choices: ['un', 'ün', 'in'], answerIndex: 1, hint: '开头圆唇。', coaching: '你能区分圆唇。', knowledgeId: 'PINYIN-FINAL-UN-UMLAUT' },
    { type: 'choice', prompt: '“云”的韵母是？', choices: ['un', 'ün', 'en'], answerIndex: 1, hint: '云的 yún。', coaching: '你能联系生活读 ün。', knowledgeId: 'PINYIN-FINAL-UN-UMLAUT' },
    { type: 'recording', prompt: '跟读 un ün。', hint: '注意嘴形。', coaching: '你能稳定发音。', knowledgeId: 'PINYIN-FINAL-UN' },
  ] },
  { title: '前鼻韵母复习', writing: true, knowledgeIds: ['PINYIN-FINAL-AN', 'PINYIN-FINAL-EN', 'PINYIN-FINAL-IN', 'PINYIN-FINAL-UN', 'PINYIN-FINAL-UN-UMLAUT'], objectives: ['复习 5 个前鼻韵母', '保持鼻音结尾', '描画字母'], keyPoint: '舌尖抵上齿龈。', difficultPoint: '鼻音丢失。', mistakes: ['结尾读成口音'], board: 'an en in un ün。', tasks: ['读前鼻韵母给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 in？', choices: ['an', 'en', 'in'], answerIndex: 2, hint: 'i 加鼻音。', coaching: '你能听辨前鼻音。', knowledgeId: 'PINYIN-FINAL-IN' },
    { type: 'choice', prompt: '哪个是 ün？', choices: ['un', 'ün', 'en'], answerIndex: 1, hint: '开头圆唇。', coaching: '你能区分 un ün。', knowledgeId: 'PINYIN-FINAL-UN-UMLAUT' },
    { type: 'tracing', prompt: '在四线三格描画 an 或 ün。', hint: '字母写清楚。', coaching: '你能完成书写。', knowledgeId: 'PINYIN-FINAL-AN' },
  ] },
  { title: '后鼻韵母 ang eng', knowledgeIds: ['PINYIN-FINAL-ANG', 'PINYIN-FINAL-ENG'], objectives: ['读准 ang eng', '区分前鼻和后鼻'], keyPoint: '结尾 ng 气流从鼻腔后部出。', difficultPoint: '不要读成 an en。', mistakes: ['后鼻音弱'], board: 'ang eng，口型更大。', tasks: ['读 ang eng 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ang？', choices: ['an', 'ang', 'eng'], answerIndex: 1, hint: 'a 加后鼻音。', coaching: '你能读出后鼻音。', knowledgeId: 'PINYIN-FINAL-ANG' },
    { type: 'choice', prompt: '“灯”的韵母是？', choices: ['en', 'eng', 'ang'], answerIndex: 1, hint: '灯的 dēng。', coaching: '你能联系生活读 eng。', knowledgeId: 'PINYIN-FINAL-ENG' },
    { type: 'recording', prompt: '跟读 ang eng。', hint: '嘴巴张开一些。', coaching: '你能稳定后鼻音。', knowledgeId: 'PINYIN-FINAL-ANG' },
  ] },
  { title: '后鼻韵母 ing ong', knowledgeIds: ['PINYIN-FINAL-ING', 'PINYIN-FINAL-ONG'], objectives: ['读准 ing ong', '巩固后鼻音'], keyPoint: 'ong 圆唇收后鼻音。', difficultPoint: 'ong 读成 eng。', mistakes: ['圆唇丢失'], board: 'ing 展唇；ong 圆唇。', tasks: ['读 ing ong 给家长听'], drills: [
    { type: 'audio-choice', prompt: '哪个是 ong？', choices: ['ing', 'ong', 'eng'], answerIndex: 1, hint: '圆唇后鼻音。', coaching: '你能读准 ong。', knowledgeId: 'PINYIN-FINAL-ONG' },
    { type: 'choice', prompt: '“星星”的韵母是？', choices: ['ing', 'ong', 'eng'], answerIndex: 0, hint: '星星的星。', coaching: '你能联系生活读 ing。', knowledgeId: 'PINYIN-FINAL-ING' },
    { type: 'recording', prompt: '跟读 ing ong。', hint: '保持鼻音。', coaching: '你能读清差别。', knowledgeId: 'PINYIN-FINAL-ING' },
  ] },
  { title: '两拼音节训练', knowledgeIds: ['PINYIN-TWO-SPELL', 'PINYIN-TONES'], objectives: ['声母韵母快速相拼', '带上声调读'], keyPoint: '前音轻短，后音响亮。', difficultPoint: '中间不拖音。', mistakes: ['读成两个音'], board: '声母 + 韵母，一口气连读。', tasks: ['拼读三个两拼音节给家长听'], drills: [
    { type: 'choice', prompt: 'b-a 怎么拼？', choices: ['ba', 'bo', 'bi'], answerIndex: 0, hint: 'b 轻短，a 响亮。', coaching: '你能完成两拼。', knowledgeId: 'PINYIN-TWO-SPELL' },
    { type: 'audio-choice', prompt: '哪个是 mā？', choices: ['mā', 'má', 'mǎ'], answerIndex: 0, hint: '第一声平。', coaching: '你能带调拼读。', knowledgeId: 'PINYIN-TONES' },
    { type: 'recording', prompt: '拼读 bà 和 mā。', hint: '先快后响。', coaching: '你能拼出词语。', knowledgeId: 'PINYIN-TWO-SPELL' },
  ] },
  { title: '三拼音节和综合展示', writing: true, knowledgeIds: ['PINYIN-THREE-SPELL', 'PINYIN-TONES', 'PINYIN-APPLICATION-REVIEW'], objectives: ['找到介母', '完成三拼', '展示拼音成果'], keyPoint: '声母轻、介母快、韵母响。', difficultPoint: '不丢介母。', mistakes: ['丢掉 i/u/ü'], board: '声母 + 介母 + 韵母。', tasks: ['当小老师展示拼音收获'], drills: [
    { type: 'choice', prompt: 'g-u-a 里的介母是？', choices: ['g', 'u', 'a'], answerIndex: 1, hint: '中间轻快通过。', coaching: '你能找到介母。', knowledgeId: 'PINYIN-THREE-SPELL' },
    { type: 'audio-choice', prompt: '哪个是 guā？', choices: ['gā', 'gua', 'ga'], answerIndex: 1, hint: '不能丢 u。', coaching: '你能读准三拼。', knowledgeId: 'PINYIN-THREE-SPELL' },
    { type: 'recording', prompt: '展示 a o e 和一句拼音口诀。', hint: '声音响亮。', coaching: '你能完成拼音展示。', knowledgeId: 'PINYIN-APPLICATION-REVIEW' },
  ] },
];

function makeLaterDesign(seed: typeof laterSessions[number]): LessonDesign {
  return design({
    focus: seed.title,
    basis: '统编版一年级拼音体系；长安幼小衔接拼音分步课程。',
    objectives: seed.objectives,
    keyPoint: seed.keyPoint,
    difficultPoint: seed.difficultPoint,
    mistakes: seed.mistakes,
    board: seed.board,
    tasks: seed.tasks,
    reflection: `${seed.title}是否还需要下一次短复习？`,
    writing: seed.writing,
  });
}

export const pinyinSessionSeeds: PinyinSessionSeed[] = [
  ...week1Designs.map((design, index) => ({
    id: `PINYIN-W01-D${index + 1}`,
    week: 1,
    weekday: (index + 1) as 1 | 2 | 3 | 4 | 5,
    sourceWeek: 1,
    title: ['走进拼音王国：认识 a o e', 'a 和四个声调', '书写 a + 认识 o', '书写 o + 认识 e', '书写 e + 火眼金睛'][index],
    knowledgeIds: index === 0
      ? ['PINYIN-VOWEL-A', 'PINYIN-VOWEL-O', 'PINYIN-VOWEL-E']
      : index === 1
        ? ['PINYIN-VOWEL-A', 'PINYIN-TONES']
        : index === 2
          ? ['PINYIN-VOWEL-A', 'PINYIN-VOWEL-O', 'PINYIN-TONES']
          : index === 3
            ? ['PINYIN-VOWEL-O', 'PINYIN-VOWEL-E', 'PINYIN-TONES']
            : ['PINYIN-VOWEL-A', 'PINYIN-VOWEL-O', 'PINYIN-VOWEL-E', 'PINYIN-TONES'],
    objectives: design.objectives,
    drills: [
      { type: 'audio-choice', prompt: '听一听，选一选。', choices: ['a', 'o', 'e'], answerIndex: index % 3 as 0 | 1 | 2, hint: '看口型，再选择。', coaching: '你能分辨 a、o、e 了。', knowledgeId: 'PINYIN-VOWEL-A' },
      { type: 'choice', prompt: '今天的关键口诀是哪一句？', choices: ['张大嘴 a a a', '嘴巴圆圆 o o o', '扁扁嘴巴 e e e'], answerIndex: Math.min(index, 2) as 0 | 1 | 2, hint: '回到今天的卡片。', coaching: '你能记住今天的口诀。', knowledgeId: 'PINYIN-TONES' },
      { type: 'tracing', prompt: index === 0 ? '用手指画出今天的拼音朋友。' : `在四线三格里描画今天的拼音。`, hint: index === 0 ? '慢慢画。' : '写满中格，不出格。', coaching: index === 0 ? '你完成了拼音画。' : '你的占格越来越准。', knowledgeId: 'PINYIN-VOWEL-A' },
    ] as [PinyinTaskSeed, PinyinTaskSeed, PinyinTaskSeed],
    design,
    teachingFlow: week1TeachingFlow.filter((step) => step.id.startsWith(`W01-D${index + 1}-`)),
  })),
  ...laterSessions.map((seed, index) => {
    const order = index + 5;
    return {
      id: `PINYIN-W${String(Math.floor(order / 5) + 1).padStart(2, '0')}-D${(order % 5) + 1}`,
      week: Math.floor(order / 5) + 1,
      weekday: ((order % 5) + 1) as 1 | 2 | 3 | 4 | 5,
      sourceWeek: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10, 10, 11, 11][order],
      title: seed.title,
      knowledgeIds: seed.knowledgeIds,
      objectives: seed.objectives,
      drills: seed.drills as [PinyinTaskSeed, PinyinTaskSeed, PinyinTaskSeed],
      design: makeLaterDesign(seed),
    };
  }),
];

export function buildPinyinTasks(seed: PinyinSessionSeed): LessonTask[] {
  return seed.drills.map((item, index) => task(item, index));
}

export function getPinyinDesign(seed: PinyinSessionSeed): LessonDesign {
  return seed.design;
}
