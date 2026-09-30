export type Subject = 'math' | 'pinyin' | 'english' | 'creation' | 'review';

export type TaskType =
  | 'choice'
  | 'audio-choice'
  | 'match'
  | 'sorting'
  | 'counting'
  | 'clock'
  | 'money'
  | 'tracing'
  | 'recording'
  | 'creation';

export type AuditStatus = 'approved' | 'draft';

export interface TaskOption {
  id: string;
  label: string;
  media?: string;
}

export interface LessonTask {
  id: string;
  type: TaskType;
  prompt: string;
  knowledgeId: string;
  options?: TaskOption[];
  answerIds?: string[];
  hint: string;
  coaching: string;
  payload?: Record<string, string | number | boolean>;
}

export interface LessonSegment {
  id: string;
  type: 'intro' | 'concept' | 'practice' | 'application' | 'summary';
  title: string;
  script: string;
  tasks?: LessonTask[];
  teachingFlow?: TeachingFlowStep[];
}

export type InteractionKind =
  | 'listen'
  | 'speak'
  | 'choose'
  | 'trace'
  | 'gesture'
  | 'mirror'
  | 'game'
  | 'review';

export interface TeachingStage {
  id: string;
  phase: '导入' | '探究' | '示范' | '练习' | '辨错' | '小结';
  title: string;
  durationMinutes: number;
  teacherMove: string;
  childAction: string;
  interaction: InteractionKind;
  prompt: string;
  successEvidence: string;
  feedbackIfWrong: string;
  resource?: string;
}

export interface LessonDesign {
  curriculumBasis: string;
  learnerProfile: string;
  objectives: string[];
  keyPoint: string;
  difficultPoint: string;
  preparation: string[];
  stages: TeachingStage[];
  boardSummary: string;
  commonMistakes: string[];
  homeTasks: string[];
  reflectionQuestions: string[];
}

export interface TeachingFlowStep {
  id: string;
  segmentId: LessonSegment['id'] | LessonSegment['type'];
  slide: number;
  phase: '导入' | '新授' | '示范' | '练习' | '辨错' | '小结';
  title: string;
  durationMinutes: number;
  teacherScript: string;
  childAction: string;
  keyPoint: string;
  interaction: InteractionKind;
  visual: string;
}

export interface Lesson {
  id: string;
  week: number;
  weekday: 1 | 2 | 3 | 4 | 5;
  slot: 1 | 2;
  sourceWeek: number;
  subject: Subject;
  title: string;
  sceneId: string;
  knowledgeIds: string[];
  objectives: string[];
  estimatedMinutes: number;
  segments: LessonSegment[];
  reviewIntervalDays: number[];
  audit: {
    subjectReviewedBy: string;
    teachingReviewedBy: string;
    status: AuditStatus;
  };
  lessonDesign?: LessonDesign;
  teachingFlow?: TeachingFlowStep[];
}

export interface KnowledgePoint {
  id: string;
  subject: Subject;
  name: string;
  definition: string;
  examples: string[];
  commonMistakes: string[];
  assessment: string[];
  gradeAlignment: string;
}

export interface SceneInfo {
  id: string;
  name: string;
  description: string;
}

export interface LearningEvent {
  lessonId: string;
  taskId: string;
  knowledgeId: string;
  result: 'correct' | 'correct-after-hint' | 'correct-after-demo' | 'skipped';
  attemptCount: number;
  timeSpentMs: number;
  recordedAt: string;
}

export interface MasteryRecord {
  knowledgeId: string;
  masteryLevel: number;
  status: 'mastered' | 'review-needed';
  nextReviewAt: string;
}

export interface ParentSettings {
  dailyMainLessonLimit: number;
  dailyReviewLimit: number;
  volume: number;
  speechRate: number;
  voiceURI?: string;
  animationLevel: 'low' | 'normal';
  allowNextWeek: boolean;
}

export interface AppProgress {
  version: 1;
  completedLessonIds: string[];
  activeLessonId: string | null;
  activeSegmentIndex: number;
  events: LearningEvent[];
  mastery: Record<string, MasteryRecord>;
  settings: ParentSettings;
  lastLearnedDate: string | null;
  todayCompletedLessons: number;
}
