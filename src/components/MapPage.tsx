import { useState } from 'react';
import type { Lesson, SceneInfo } from '@/domain/types';
import { SceneArt } from './SceneArt';

interface MapPageProps {
  scenes: SceneInfo[];
  lessons: Lesson[];
  completedLessonIds: string[];
  onBack: () => void;
}

export function MapPage({ scenes, lessons, completedLessonIds, onBack }: MapPageProps) {
  const unlockedWeek = Math.min(16, Math.floor(completedLessonIds.length / 5) + 1);
  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? '');
  const activeScene = scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0];

  return (
    <div className="map-page">
      <header className="page-header">
        <button type="button" className="secondary-button" onClick={onBack}>回到首页</button>
        <h1>长安学习地图</h1>
        <span>{Math.min(unlockedWeek, 16)} / 16 站</span>
      </header>

      <div className="map-track" role="list">
        {scenes.map((scene, index) => {
          const week = index + 1;
          const unlocked = week <= unlockedWeek;
          const weekLessons = lessons.filter((lesson) => lesson.week === week);
          const done = weekLessons.every((lesson) => completedLessonIds.includes(lesson.id));
          return (
            <button
              key={scene.id}
              type="button"
              role="listitem"
              className={`map-node ${unlocked ? 'unlocked' : ''} ${done ? 'done' : ''}`}
              onClick={() => setActiveSceneId(scene.id)}
            >
              <strong>{week}</strong>
              <span>{scene.name}</span>
            </button>
          );
        })}
      </div>

      {activeScene && (
        <section className="scene-detail">
          <SceneArt sceneId={activeScene.id} active />
          <div>
            <h2>{activeScene.name}</h2>
            <p>{activeScene.description}</p>
          </div>
        </section>
      )}
    </div>
  );
}
