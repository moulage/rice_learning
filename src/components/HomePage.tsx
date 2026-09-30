import type { AppProgress, Lesson, SceneInfo } from '@/domain/types';
import { canStartLesson } from '@/domain/progress';
import { SpeakButton } from './SpeakButton';
import { SceneArt } from './SceneArt';
import { toChinesePinyinSpeech } from '@/domain/pinyin-speech';

interface HomePageProps {
  progress: AppProgress;
  todayLessons: Lesson[];
  scenes: SceneInfo[];
  scene: SceneInfo;
  onSpeak: (text: string, language: string) => void;
  onStartLesson: (lesson: Lesson) => void;
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

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7.2 9.4 5l5.2 2.2L20 5v11.8L14.6 19l-5.2-2.2L4 19z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13.5" r="1.5" fill="currentColor" />
      <path d="M10.5 10.5h2.2a1.8 1.8 0 0 1 0 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WorksIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 15.5 10.2 11l2.3 3 1.8-2.2L18 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="8.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ParentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4 19 6.5v5.7c0 3.6-2.7 6.4-7 7.8-4.3-1.4-7-4.2-7-7.8V6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9 12 2.1 2.1L15.2 10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomePage({
  progress,
  todayLessons,
  scenes,
  scene,
  onSpeak,
  onStartLesson,
  onOpenMap,
  onOpenWorks,
  onOpenParent,
}: HomePageProps) {
  const lesson = todayLessons[0];
  const sceneForLesson = (item: Lesson) =>
    scenes[Math.min(15, Math.max(0, item.sourceWeek - 1))];
  const totalLessons = 80;
  const completed = progress.completedLessonIds.length;
  const percent = Math.round((completed / totalLessons) * 100);
  const stars = Object.values(progress.mastery).filter((item) => item.status === 'mastered').length;

  return (
    <div className="home">
      <section className="hero" aria-label="今日学习旅程">
        <div className="hero-copy">
          <div className="hero-tags">
            <span className="hero-tag">第 {lesson.week} 周</span>
            <span className="hero-tag">{scene.name}</span>
            <span className="hero-tag">{subjectNames[lesson.subject]}</span>
          </div>
          <h1>今天，去{scene.name}探险</h1>
          <p className="hero-description">
            {lesson.title}。{lesson.objectives[0]}。学完就能把这盏城市灯再推亮一点。
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{completed}</strong>
              <span>已完成课节</span>
            </div>
            <div className="hero-stat">
              <strong>{stars}</strong>
              <span>知识星</span>
            </div>
            <div className="hero-stat">
              <strong>{percent}%</strong>
              <span>学期旅程</span>
            </div>
          </div>
        </div>
        <div className="hero-stage">
          <SceneArt sceneId={lesson.sceneId} active priority />
        </div>
      </section>

      <section className="daily-tickets" aria-label="今天的学习任务">
        {todayLessons.map((task, index) => {
          const taskScene = sceneForLesson(task);
          const completed = progress.completedLessonIds.includes(task.id);
          const allowed = completed || canStartLesson(progress, task);
          return (
            <article key={task.id} className={`daily-ticket subject-${task.subject}`}>
              <div className="ticket-art">
                <SceneArt sceneId={task.sceneId} active />
              </div>
              <div className="ticket-main">
                <p className="ticket-kicker">
                  第 {task.slot} 节
                  <span>{task.estimatedMinutes} 分钟</span>
                  <span>{taskScene.name}</span>
                  <span className={completed ? 'completed' : ''}>{completed ? '已完成' : '待学习'}</span>
                </p>
                <h2 className="ticket-title">{task.title}</h2>
                <p className="ticket-copy">
                  {index + 1}/{todayLessons.length} · {task.objectives[0]}。
                </p>
                <div className="ticket-actions">
                  <button
                    type="button"
                    className="primary-button"
                    disabled={!allowed}
                    onClick={() => onStartLesson(task)}
                  >
                    {completed ? '复习闯关' : '开始闯关'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      {!canStartLesson(progress, lesson) && (
        <p className="rest-note">今天的 2 节任务已经完成。休息一下，明天地图会继续等你。</p>
      )}

      <nav className="home-nav" aria-label="学习导航">
        <button
          type="button"
          className="nav-card"
          onClick={() => { onSpeak('打开长安地图', 'zh-CN'); onOpenMap(); }}
        >
          <span className="nav-icon"><MapIcon /></span>
          <strong>长安地图</strong>
          <small>看已经点亮的地方</small>
        </button>
        <button
          type="button"
          className="nav-card"
          onClick={() => { onSpeak('打开我的作品', 'zh-CN'); onOpenWorks(); }}
        >
          <span className="nav-icon"><WorksIcon /></span>
          <strong>我的作品</strong>
          <small>收集创作卡和成果</small>
        </button>
        <button
          type="button"
          className="nav-card"
          onClick={() => { onSpeak('请家长确认', 'zh-CN'); onOpenParent(); }}
        >
          <span className="nav-icon"><ParentIcon /></span>
          <strong>给家长</strong>
          <small>查看进度和设置</small>
        </button>
      </nav>

      <section className="panel" aria-label="听一听今天做什么">
        <div className="panel-heading">
          <div>
            <h2>先听一听</h2>
            <p>{lesson.objectives.join('；')}。</p>
          </div>
          <SpeakButton
            text={`今天学习${subjectNames[lesson.subject]}，${lesson.title}。${lesson.objectives[0]}`}
            speechText={lesson.subject === 'pinyin'
              ? toChinesePinyinSpeech(`今天学习${subjectNames[lesson.subject]}，${lesson.title}。${lesson.objectives[0]}`)
              : undefined}
            language={lesson.subject === 'english' ? 'en-US' : 'zh-CN'}
            rate={progress.settings.speechRate}
            volume={progress.settings.volume}
            voiceURI={progress.settings.voiceURI}
          />
        </div>
      </section>
    </div>
  );
}
