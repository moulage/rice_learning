import type { Lesson } from '@/domain/types';
import { SceneArt } from './SceneArt';

interface WorksPageProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  onBack: () => void;
}

export function WorksPage({ lessons, completedLessonIds, onBack }: WorksPageProps) {
  const works = lessons.filter(
    (lesson) => lesson.subject === 'creation' && completedLessonIds.includes(lesson.id),
  );

  return (
    <div className="works-page">
      <header className="page-header">
        <button type="button" className="secondary-button" onClick={onBack}>回到首页</button>
        <h1>我的作品</h1>
        <span>{works.length} 张创作卡</span>
      </header>
      {works.length === 0 ? (
        <p className="empty-note">完成周四的长安创作课后，这里会出现你的作品。</p>
      ) : (
        <div className="works-grid">
          {works.map((lesson) => {
            const sceneIndex = lesson.week - 1;
            return (
              <article key={lesson.id} className="work-card">
                <SceneArt sceneId={`scene-${sceneIndex}`} active />
                <h2>{lesson.title}</h2>
                <p>{lesson.objectives[0]}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
