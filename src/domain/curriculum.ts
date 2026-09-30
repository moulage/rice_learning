import type { AppProgress, Lesson, Subject } from './types';

export function weekdayOf(date: Date): 1 | 2 | 3 | 4 | 5 {
  const day = date.getDay();
  if (day === 0) return 5;
  if (day === 6) return 4;
  return day as 1 | 2 | 3 | 4 | 5;
}

export function getTodayLessons(progress: AppProgress, lessons: Lesson[], today = new Date()): Lesson[] {
  const week = Math.min(8, Math.max(1, Math.floor(progress.completedLessonIds.length / 10) + 1));
  return lessons
    .filter((lesson) => lesson.week === week && lesson.weekday === weekdayOf(today))
    .sort((left, right) => left.slot - right.slot);
}

export function subjectProgress(progress: AppProgress, lessons: Lesson[], subject: Subject): number {
  const subjectLessons = lessons.filter((lesson) => lesson.subject === subject);
  const completed = subjectLessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id));
  return subjectLessons.length === 0 ? 0 : Math.round((completed.length / subjectLessons.length) * 100);
}
