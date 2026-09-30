import { useEffect, useState } from 'react';
import { getTodayLessons } from './domain/curriculum';
import { useProgressStore } from './hooks/useProgressStore';
import { HomePage } from './components/HomePage';
import { LessonPlayer } from './components/LessonPlayer';
import { MapPage } from './components/MapPage';
import { ParentCenter } from './components/ParentCenter';
import { ParentGate } from './components/ParentGate';
import { WorksPage } from './components/WorksPage';
import { knowledgePoints, lessons, scenes } from './content';

type View = 'home' | 'map' | 'lesson' | 'works' | 'parent';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const progress = useProgressStore((state) => state.progress);
  const hydrated = useProgressStore((state) => state.hydrated);
  const initialize = useProgressStore((state) => state.initialize);
  const start = useProgressStore((state) => state.start);
  const advanceSegment = useProgressStore((state) => state.advanceSegment);
  const recordResult = useProgressStore((state) => state.recordResult);
  const finish = useProgressStore((state) => state.finish);
  const saveSettings = useProgressStore((state) => state.saveSettings);
  const exportJson = useProgressStore((state) => state.exportJson);
  const importJson = useProgressStore((state) => state.importJson);
  const reset = useProgressStore((state) => state.reset);
  const deleteRecordings = useProgressStore((state) => state.deleteRecordings);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  if (!hydrated) {
    return <main className="shell loading">正在打开长安学习城...</main>;
  }

  const activeLesson = lessons.find((lesson) => lesson.id === progress.activeLessonId);
  const todayLessons = getTodayLessons(progress, lessons);
  const lesson = activeLesson ?? todayLessons[0];
  const scene = scenes[Math.min(15, Math.max(0, lesson.sourceWeek - 1))];
  const knowledgeNames = Object.fromEntries(knowledgePoints.map((item) => [item.id, item.name]));

  function speak(text: string, language: string) {
    if (typeof speechSynthesis === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = progress.settings.speechRate;
    utterance.volume = progress.settings.volume;
    speechSynthesis.speak(utterance);
  }

  return (
    <main className="shell">
      {view === 'lesson' && activeLesson ? (
        <LessonPlayer
          lesson={activeLesson}
          progress={progress}
          onResult={(taskId, knowledgeId, result, attempts, milliseconds) => recordResult({
            lessonId: activeLesson.id,
            taskId,
            knowledgeId,
            result,
            attemptCount: attempts,
            timeSpentMs: milliseconds,
            recordedAt: new Date().toISOString(),
          })}
          onSkip={(taskId, knowledgeId, attempts, milliseconds) => recordResult({
            lessonId: activeLesson.id,
            taskId,
            knowledgeId,
            result: 'skipped',
            attemptCount: attempts,
            timeSpentMs: milliseconds,
            recordedAt: new Date().toISOString(),
          })}
          onAdvance={advanceSegment}
          onFinish={() => {
            finish(activeLesson);
            setView('home');
          }}
          onExit={() => setView('map')}
        />
      ) : view === 'map' ? (
        <MapPage
          scenes={scenes}
          lessons={lessons}
          progress={progress}
          onBack={() => setView('home')}
          onEnterLesson={(nextLesson) => {
            start(nextLesson);
            setView('lesson');
          }}
        />
      ) : view === 'works' ? (
        <WorksPage
          lessons={lessons}
          completedLessonIds={progress.completedLessonIds}
          onBack={() => setView('home')}
        />
      ) : view === 'parent' ? (
        <ParentCenter
          progress={progress}
          lessons={lessons}
          knowledgeNames={knowledgeNames}
          onBack={() => setView('home')}
          onSettings={saveSettings}
          onExport={exportJson}
          onImport={importJson}
          onReset={reset}
          onDeleteRecordings={deleteRecordings}
        />
      ) : (
        <HomePage
          progress={progress}
          todayLessons={todayLessons}
          scenes={scenes}
          scene={scene}
          onSpeak={speak}
          onStartLesson={(nextLesson) => {
            start(nextLesson);
            setView('lesson');
          }}
          onOpenMap={() => setView('map')}
          onOpenWorks={() => setView('works')}
          onOpenParent={() => setParentGateOpen(true)}
        />
      )}

      {parentGateOpen && (
        <ParentGate
          onClose={() => setParentGateOpen(false)}
          onSuccess={() => {
            setParentGateOpen(false);
            setView('parent');
          }}
        />
      )}
    </main>
  );
}
