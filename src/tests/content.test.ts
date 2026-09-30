import { knowledgePoints, lessons, scenes } from '@/content';

const dailySubjects = [
  ['pinyin', 'math'],
  ['pinyin', 'english'],
  ['pinyin', 'math'],
  ['pinyin', 'english'],
] as const;

const fridaySubjects = [
  ['pinyin', 'creation'],
  ['pinyin', 'review'],
] as const;

describe('8-week curriculum', () => {
  it('contains exactly 80 lessons across 8 weeks', () => {
    expect(lessons).toHaveLength(80);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(80);
  });

  it('has two approved lessons for every weekday in the planned order', () => {
    for (let week = 1; week <= 8; week += 1) {
      const weekLessons = lessons.filter((lesson) => lesson.week === week);
      expect(weekLessons).toHaveLength(10);
      const sorted = [...weekLessons].sort((left, right) =>
        left.weekday - right.weekday || left.slot - right.slot,
      );
      for (let day = 1; day <= 5; day += 1) {
        const dayLessons = sorted.filter((lesson) => lesson.weekday === day);
        expect(dayLessons.map((lesson) => lesson.subject)).toEqual(
          day === 5 ? fridaySubjects[(week - 1) % 2] : dailySubjects[day - 1],
        );
        expect(dayLessons.map((lesson) => lesson.slot)).toEqual([1, 2]);
      }
      weekLessons.forEach((lesson) => {
        expect(lesson.sourceWeek).toBeGreaterThanOrEqual(1);
        expect(lesson.sourceWeek).toBeLessThanOrEqual(16);
        expect(lesson.audit.status).toBe('approved');
        expect(lesson.segments.map((segment) => segment.type)).toEqual([
          'intro',
          'concept',
          'practice',
          'application',
          'summary',
        ]);
        expect(lesson.estimatedMinutes).toBeGreaterThanOrEqual(10);
        expect(lesson.estimatedMinutes).toBeLessThanOrEqual(15);
      });
    }
  });

  it('uses a complete aoe teaching design in week one', () => {
    const pinyinLessons = lessons
      .filter((lesson) => lesson.week === 1 && lesson.subject === 'pinyin')
      .sort((left, right) => left.weekday - right.weekday);
    expect(pinyinLessons).toHaveLength(5);
    expect(pinyinLessons.map((lesson) => lesson.lessonDesign?.stages.length ?? 0)).toEqual([5, 5, 5, 5, 5]);
    expect(pinyinLessons[0].title).toContain('a o e');
    expect(pinyinLessons[1].lessonDesign?.boardSummary).toContain('一声平');
    expect(pinyinLessons[4].lessonDesign?.homeTasks).toContain('当小老师读 a o e 和四声');
    pinyinLessons.forEach((lesson) => {
      expect(lesson.lessonDesign?.stages.reduce((total, stage) => total + stage.durationMinutes, 0)).toBe(15);
    });
  });

  it('binds every task to a defined knowledge point', () => {
    const knowledgeIds = new Set(knowledgePoints.map((point) => point.id));
    const allTasks = lessons.flatMap((lesson) => lesson.segments.flatMap((segment) => segment.tasks ?? []));
    expect(allTasks.length).toBeGreaterThan(100);
    allTasks.forEach((task) => {
      expect(knowledgeIds.has(task.knowledgeId)).toBe(true);
      expect(task.hint.length).toBeGreaterThan(3);
      expect(task.coaching.length).toBeGreaterThan(3);
    });
  });

  it('has knowledge definitions and assessment evidence', () => {
    expect(knowledgePoints.length).toBeGreaterThan(60);
    knowledgePoints.forEach((point) => {
      expect(point.definition.length).toBeGreaterThan(5);
      expect(point.examples.length).toBeGreaterThan(0);
      expect(point.commonMistakes.length).toBeGreaterThan(0);
      expect(point.assessment.length).toBeGreaterThan(0);
    });
  });

  it('defines all sixteen Chang’an scenes', () => {
    expect(scenes).toHaveLength(16);
    expect(new Set(scenes.map((scene) => scene.id)).size).toBe(16);
    scenes.forEach((scene) => {
      expect(scene.name.length).toBeGreaterThan(1);
      expect(scene.description.length).toBeGreaterThan(4);
    });
  });

  it('keeps sixteen locations connected to eight learning weeks', () => {
    for (let sourceWeek = 1; sourceWeek <= 16; sourceWeek += 1) {
      const locationLessons = lessons.filter((lesson) => lesson.sourceWeek === sourceWeek);
      expect(locationLessons.length).toBeGreaterThan(0);
      expect(locationLessons.every((lesson) => lesson.week >= 1 && lesson.week <= 8)).toBe(true);
    }
  });

  it('teaches every pinyin initial and every English letter in the first four weeks', () => {
    const earlyKnowledge = knowledgePoints.filter((point) => point.id.startsWith('PINYIN-'));
    const letterKnowledge = knowledgePoints.filter((point) => point.id.startsWith('ENGLISH-LETTER-'));
    expect(earlyKnowledge.length).toBeGreaterThan(50);
    expect(letterKnowledge).toHaveLength(26);
  });
});
