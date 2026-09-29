import {
  addDaysToKey,
  canStartLesson,
  completeLesson,
  createInitialProgress,
  dateKey,
  recordTaskResult,
  startLesson,
} from '@/domain/progress';
import type { Lesson } from '@/domain/types';

const mathLesson: Lesson = {
  id: 'MATH-W01-L01',
  week: 1,
  weekday: 1,
  subject: 'math',
  title: '数学入学校验',
  sceneId: 'bell-tower',
  knowledgeIds: ['MATH-NUMBER-020'],
  objectives: ['校验 0-20 数感'],
  estimatedMinutes: 12,
  segments: [],
  reviewIntervalDays: [1, 7],
  audit: { subjectReviewedBy: 'math-specialist', teachingReviewedBy: 'teacher', status: 'approved' },
};

const reviewLesson: Lesson = { ...mathLesson, id: 'REVIEW-W01', subject: 'review' };

describe('learning progress', () => {
  it('resets the daily count on a new day', () => {
    const today = new Date(2026, 8, 29);
    const progress = {
      ...createInitialProgress(),
      todayCompletedLessons: 2,
      lastLearnedDate: '2026-09-28',
    };
    const normalized = completeLesson(progress, mathLesson);
    expect(normalized.todayCompletedLessons).toBe(1);
    expect(normalized.completedLessonIds).toContain(mathLesson.id);
    expect(dateKey(today)).toBe('2026-09-29');
  });

  it('prevents the child from exceeding daily limits', () => {
    const progress = {
      ...createInitialProgress(),
      todayCompletedLessons: 2,
      lastLearnedDate: dateKey(),
    };
    expect(canStartLesson(progress, mathLesson)).toBe(false);
    expect(canStartLesson(progress, reviewLesson)).toBe(false);
  });

  it('does not start a blocked lesson', () => {
    const progress = {
      ...createInitialProgress(),
      todayCompletedLessons: 2,
      lastLearnedDate: dateKey(),
    };
    expect(startLesson(progress, mathLesson).activeLessonId).toBeNull();
  });

  it('increases mastery and schedules review after a correct answer', () => {
    const progress = recordTaskResult(createInitialProgress(), {
      lessonId: mathLesson.id,
      taskId: 'task-1',
      knowledgeId: 'MATH-NUMBER-020',
      result: 'correct',
      attemptCount: 1,
      timeSpentMs: 3000,
      recordedAt: new Date().toISOString(),
    });
    expect(progress.mastery['MATH-NUMBER-020']?.status).toBe('review-needed');
    expect(progress.mastery['MATH-NUMBER-020']?.masteryLevel).toBe(0.55);
  });

  it('adds review days from the local date key', () => {
    expect(addDaysToKey('2026-09-29', 7)).toBe('2026-10-06');
  });
});
