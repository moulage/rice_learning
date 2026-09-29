import type { AppProgress, Lesson, Subject } from './types';

export function weekdayOf(date: Date): 1 | 2 | 3 | 4 | 5 {
  const day = date.getDay();
  if (day === 0) return 5;
  if (day === 6) return 4;
  return day as 1 | 2 | 3 | 4 | 5;
}

export function getLessonForWeekday(lessons: Lesson[], week: number, weekday: number): Lesson {
  const found = lessons.find((lesson) => lesson.week === week && lesson.weekday === weekday);
  if (!found) throw new Error(`Missing lesson for week ${week}, weekday ${weekday}`);
  return found;
}

export function getTodayLesson(progress: AppProgress, lessons: Lesson[], today = new Date()): Lesson {
  const week = Math.min(16, Math.max(1, Math.floor(progress.completedLessonIds.length / 5) + 1));
  return getLessonForWeekday(lessons, week, weekdayOf(today));
}

export function subjectProgress(progress: AppProgress, lessons: Lesson[], subject: Subject): number {
  const subjectLessons = lessons.filter((lesson) => lesson.subject === subject);
  const completed = subjectLessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id));
  return subjectLessons.length === 0 ? 0 : Math.round((completed.length / subjectLessons.length) * 100);
}
