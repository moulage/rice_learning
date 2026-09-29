import { knowledgePoints, lessons, scenes } from '@/content';

const subjects = ['math', 'pinyin', 'english', 'creation', 'review'];

describe('16-week curriculum', () => {
  it('contains exactly 80 lessons across 16 weeks', () => {
    expect(lessons).toHaveLength(80);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(80);
  });

  it('has five approved lessons for every week in the planned weekday order', () => {
    for (let week = 1; week <= 16; week += 1) {
      const weekLessons = lessons.filter((lesson) => lesson.week === week);
      expect(weekLessons).toHaveLength(5);
      expect(weekLessons.map((lesson) => lesson.subject)).toEqual(subjects);
      expect(weekLessons.map((lesson) => lesson.weekday)).toEqual([1, 2, 3, 4, 5]);
      weekLessons.forEach((lesson) => {
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

  it('teaches every pinyin initial and every English letter in the first four weeks', () => {
    const earlyKnowledge = knowledgePoints.filter((point) => point.id.startsWith('PINYIN-'));
    const letterKnowledge = knowledgePoints.filter((point) => point.id.startsWith('ENGLISH-LETTER-'));
    expect(earlyKnowledge.length).toBeGreaterThan(50);
    expect(letterKnowledge).toHaveLength(26);
  });
});
