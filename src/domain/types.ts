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
}

export interface Lesson {
  id: string;
  week: number;
  weekday: 1 | 2 | 3 | 4 | 5;
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
