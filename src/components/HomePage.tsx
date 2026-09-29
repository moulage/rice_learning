import type { AppProgress, Lesson, SceneInfo } from '@/domain/types';
import { canStartLesson } from '@/domain/progress';
import { SpeakButton } from './SpeakButton';
import { SceneArt } from './SceneArt';

interface HomePageProps {
  progress: AppProgress;
  lesson: Lesson;
  scene: SceneInfo;
  onSpeak: (text: string, language: string) => void;
  onStart: () => void;
  onOpenMap: () => void;
  onOpenWorks: () => void;
  onOpenParent: () => void;
}

const subjectNames: Record<Lesson['subject'], string> = {
  math: '数学加速',
  pinyin: '语文拼音',
  english: '英语字母',
  creation: '长安创作',
  review: '复习闯关',
};

export function HomePage({
  progress,
  lesson,
  scene,
  onSpeak,
  onStart,
  onOpenMap,
  onOpenWorks,
  onOpenParent,
}: HomePageProps) {
  const allowed = canStartLesson(progress, lesson);

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <p className="eyebrow">今天学</p>
          <h1>{subjectNames[lesson.subject]}</h1>
          <p className="home-title">{lesson.title}</p>
        </div>
        <SceneArt sceneId={lesson.sceneId} active />
      </header>

      <section className="today-panel">
        <div className="panel-heading">
          <div>
            <h2>{scene.name}</h2>
            <p>{lesson.objectives[0]}</p>
          </div>
          <SpeakButton
            text={`今天学习${subjectNames[lesson.subject]}，${lesson.title}。${lesson.objectives[0]}`}
            language={lesson.subject === 'english' ? 'en-US' : 'zh-CN'}
            rate={progress.settings.speechRate}
            volume={progress.settings.volume}
          />
        </div>
        <button type="button" className="primary-button large" disabled={!allowed} onClick={onStart}>
          {allowed ? '开始学习' : '今天该休息了'}
        </button>
        {!allowed && <p className="rest-note">你已经完成今天的课程，明天地图会等你。</p>}
      </section>

      <nav className="home-nav" aria-label="学习导航">
        <button type="button" className="nav-card" onClick={() => { onSpeak('打开长安地图', 'zh-CN'); onOpenMap(); }}>
          <SceneArt sceneId="wall" active />
          <span>长安地图</span>
        </button>
        <button type="button" className="nav-card" onClick={() => { onSpeak('打开我的作品', 'zh-CN'); onOpenWorks(); }}>
          <SceneArt sceneId="museum" active />
          <span>我的作品</span>
        </button>
        <button type="button" className="nav-card parent" onClick={() => { onSpeak('请家长确认', 'zh-CN'); onOpenParent(); }}>
          <SceneArt sceneId="school" active={false} />
          <span>给家长</span>
        </button>
      </nav>
    </div>
  );
}
