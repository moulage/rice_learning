import type {
  AppProgress,
  LearningEvent,
  Lesson,
  MasteryRecord,
  ParentSettings,
} from './types';

export const defaultParentSettings: ParentSettings = {
  dailyMainLessonLimit: 2,
  dailyReviewLimit: 1,
  volume: 0.7,
  speechRate: 0.82,
  voiceURI: undefined,
  animationLevel: 'normal',
  allowNextWeek: true,
};

export function createInitialProgress(): AppProgress {
  return {
    version: 1,
    completedLessonIds: [],
    activeLessonId: null,
    activeSegmentIndex: 0,
    events: [],
    mastery: {},
    settings: defaultParentSettings,
    lastLearnedDate: null,
    todayCompletedLessons: 0,
  };
}

export function dateKey(value: Date = new Date()): string {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDaysToKey(key: string, days: number): string {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

export function normalizeDailyProgress(progress: AppProgress, today = new Date()): AppProgress {
  const currentKey = dateKey(today);
  if (progress.lastLearnedDate === currentKey) return progress;
  return { ...progress, todayCompletedLessons: 0 };
}

export function canStartLesson(progress: AppProgress, _lesson?: Lesson): boolean {
  const normalized = normalizeDailyProgress(progress);
  return normalized.todayCompletedLessons < normalized.settings.dailyMainLessonLimit;
}

export const totalCurriculumWeeks = 8;

export function getCurrentWeek(progress: AppProgress): number {
  const completed = progress.completedLessonIds.length;
  return Math.min(totalCurriculumWeeks, Math.max(1, Math.floor(completed / 10) + 1));
}

export function startLesson(progress: AppProgress, lesson: Lesson): AppProgress {
  const isCompleted = progress.completedLessonIds.includes(lesson.id);
  if (!isCompleted && !canStartLesson(progress, lesson)) return progress;
  return normalizeDailyProgress({
    ...progress,
    activeLessonId: lesson.id,
    activeSegmentIndex: 0,
  });
}

function resultScore(result: LearningEvent['result']): number {
  if (result === 'correct') return 1;
  if (result === 'correct-after-hint') return 0.78;
  if (result === 'correct-after-demo') return 0.52;
  return 0;
}

export function recordTaskResult(progress: AppProgress, event: LearningEvent): AppProgress {
  const existing = progress.mastery[event.knowledgeId];
  const incoming = resultScore(event.result);
  const previousScore = existing?.masteryLevel ?? 0;
  const masteryLevel = Number((previousScore * 0.45 + incoming * 0.55).toFixed(2));
  const status = masteryLevel >= 0.75 ? 'mastered' : 'review-needed';
  const interval = masteryLevel >= 0.92 ? 7 : masteryLevel >= 0.78 ? 2 : 1;
  const mastery: MasteryRecord = {
    knowledgeId: event.knowledgeId,
    masteryLevel,
    status,
    nextReviewAt: addDaysToKey(dateKey(), interval),
  };

  return {
    ...progress,
    events: [...progress.events, event],
    mastery: { ...progress.mastery, [event.knowledgeId]: mastery },
  };
}

export function completeLesson(progress: AppProgress, lesson: Lesson): AppProgress {
  const normalized = normalizeDailyProgress(progress);
  const isAlreadyComplete = normalized.completedLessonIds.includes(lesson.id);
  return {
    ...normalized,
    completedLessonIds: isAlreadyComplete
      ? normalized.completedLessonIds
      : [...normalized.completedLessonIds, lesson.id],
    activeLessonId: null,
    activeSegmentIndex: 0,
    todayCompletedLessons: isAlreadyComplete
      ? normalized.todayCompletedLessons
      : normalized.todayCompletedLessons + 1,
    lastLearnedDate: dateKey(),
  };
}

export function updateSettings(
  progress: AppProgress,
  settings: Partial<ParentSettings>,
): AppProgress {
  return { ...progress, settings: { ...progress.settings, ...settings } };
}

export function importProgress(raw: string): AppProgress | null {
  try {
    const parsed = JSON.parse(raw) as AppProgress;
    if (parsed.version !== 1 || !Array.isArray(parsed.completedLessonIds)) return null;
    const normalized = { ...createInitialProgress(), ...parsed };
    if (normalized.settings.speechRate === 0.9) {
      normalized.settings.speechRate = 0.82;
    }
    return normalized;
  } catch {
    return null;
  }
}
