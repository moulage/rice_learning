import { useState } from 'react';
import type { AppProgress, Lesson, SceneInfo } from '@/domain/types';
import { canStartLesson } from '@/domain/progress';
import { SceneArt } from './SceneArt';

interface MapPageProps {
  scenes: SceneInfo[];
  lessons: Lesson[];
  progress: AppProgress;
  onBack: () => void;
  onEnterLesson: (lesson: Lesson) => void;
}

const subjectNames: Record<Lesson['subject'], string> = {
  math: '数学',
  pinyin: '拼音',
  english: '英语',
  creation: '创作',
  review: '闯关',
};

const weekdayNames = ['', '周一', '周二', '周三', '周四', '周五'];

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function MapPage({ scenes, lessons, progress, onBack, onEnterLesson }: MapPageProps) {
  const currentWeek = Math.min(8, Math.max(1, Math.floor(progress.completedLessonIds.length / 10) + 1));
  const activeSourceWeeks = [(currentWeek - 1) * 2 + 1, currentWeek * 2]
    .filter((sourceWeek) => sourceWeek >= 1 && sourceWeek <= 16);
  const firstActiveSourceWeek = activeSourceWeeks.find((sourceWeek) =>
    lessons.some((lesson) => lesson.sourceWeek === sourceWeek && !progress.completedLessonIds.includes(lesson.id)),
  ) ?? activeSourceWeeks[0];
  const currentScene = scenes[Math.min(15, Math.max(0, firstActiveSourceWeek - 1))];
  const [activeSceneId, setActiveSceneId] = useState(currentScene?.id ?? scenes[0]?.id ?? '');
  const activeScene = scenes.find((scene) => scene.id === activeSceneId) ?? currentScene ?? scenes[0];
  const activeSourceWeek = activeScene ? scenes.findIndex((scene) => scene.id === activeScene.id) + 1 : 1;
  const sceneLessons = lessons
    .filter((lesson) => lesson.sourceWeek === activeSourceWeek)
    .sort((left, right) => left.weekday - right.weekday || left.slot - right.slot);

  return (
    <div className="map-page">
      <header className="page-header">
        <button type="button" className="ghost-button" onClick={onBack}>回到首页</button>
        <h1>长安学习地图</h1>
        <span>第 {currentWeek} / 8 周 · 16 站</span>
      </header>

      <div className="map-track">
        {scenes.map((scene, index) => {
          const sourceWeek = index + 1;
          const unlocked = Math.ceil(sourceWeek / 2) <= currentWeek;
          const current = scene.id === currentScene?.id;
          const done = lessons
            .filter((lesson) => lesson.sourceWeek === sourceWeek)
            .every((lesson) => progress.completedLessonIds.includes(lesson.id));
          return (
            <button
              key={scene.id}
              type="button"
              className={`map-node ${unlocked ? 'unlocked' : 'locked'} ${done ? 'done' : ''} ${current ? 'current' : ''}`}
              onClick={() => setActiveSceneId(scene.id)}
            >
              <span className="node-dot">
                {unlocked ? index + 1 : <LockIcon />}
              </span>
              <span className="node-name">{scene.name}</span>
            </button>
          );
        })}
      </div>

      {activeScene && (
        <section className="scene-detail" aria-label={`${activeScene.name}闯关详情`}>
          <SceneArt sceneId={activeScene.id} active />
          <div>
            <h2>{activeScene.name}</h2>
            <p>{activeScene.description}</p>

            <div className="lesson-entry-grid">
              {sceneLessons.map((lesson) => {
                const locked = Math.ceil(lesson.sourceWeek / 2) > currentWeek;
                const completed = progress.completedLessonIds.includes(lesson.id);
                const canEnter = completed || canStartLesson(progress, lesson);
                const status = locked ? '待解锁' : completed ? '已完成' : '可闯关';
                return (
                  <article key={lesson.id} className={`lesson-entry ${locked ? 'locked' : ''} ${completed ? 'done' : ''}`}>
                    <div className="entry-head">
                      <span className="entry-weekday">{weekdayNames[lesson.weekday]} · 第{lesson.slot}节</span>
                      <span className="entry-subject">{subjectNames[lesson.subject]}</span>
                      <span className={`entry-status ${locked ? 'locked' : ''} ${completed ? 'done' : ''}`}>
                        {status}
                      </span>
                    </div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.objectives[0]}</p>
                    <footer>
                      <span>{lesson.estimatedMinutes} 分钟</span>
                      <button
                        type="button"
                        className={locked ? 'secondary-button' : 'primary-button'}
                        disabled={locked || (!completed && !canEnter)}
                        onClick={() => {
                          if (!locked && (completed || canStartLesson(progress, lesson))) {
                            onEnterLesson(lesson);
                          }
                        }}
                      >
                        {locked ? <LockIcon /> : null}
                        {locked ? '未解锁' : completed ? '复习闯关' : '进入闯关'}
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
