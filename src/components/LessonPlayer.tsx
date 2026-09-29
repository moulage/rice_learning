import { useEffect, useMemo, useState } from 'react';
import type { AppProgress, Lesson } from '@/domain/types';
import { TaskRenderer } from './TaskRenderer';
import { SpeakButton } from './SpeakButton';

interface LessonPlayerProps {
  lesson: Lesson;
  progress: AppProgress;
  onResult: (
    taskId: string,
    knowledgeId: string,
    result: 'correct' | 'correct-after-hint' | 'correct-after-demo',
    attempts: number,
    milliseconds: number,
  ) => void;
  onSkip: (taskId: string, knowledgeId: string, attempts: number, milliseconds: number) => void;
  onAdvance: () => void;
  onFinish: () => void;
  onExit: () => void;
}

export function LessonPlayer({
  lesson,
  progress,
  onResult,
  onSkip,
  onAdvance,
  onFinish,
  onExit,
}: LessonPlayerProps) {
  const segmentIndex = Math.min(progress.activeSegmentIndex, lesson.segments.length - 1);
  const segment = lesson.segments[segmentIndex];
  const tasks = segment.tasks ?? [];
  const [taskIndex, setTaskIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const language = lesson.subject === 'english' ? 'en-US' : 'zh-CN';
  const task = tasks[taskIndex];
  const isLastSegment = segmentIndex === lesson.segments.length - 1;

  useEffect(() => {
    setTaskIndex(0);
  }, [segment.id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowRest(true);
    }, 5 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const completion = useMemo(() => {
    const total = lesson.segments.reduce((count, item) => count + (item.tasks?.length ?? 1), 0);
    const done = lesson.segments.slice(0, segmentIndex).reduce((count, item) => count + (item.tasks?.length ?? 1), 0);
    return Math.round(((done + taskIndex) / Math.max(total, 1)) * 100);
  }, [lesson.segments, segmentIndex, taskIndex]);

  function handleResult(
    result: 'correct' | 'correct-after-hint' | 'correct-after-demo',
    attempts: number,
    milliseconds: number,
  ) {
    if (!task) return;
    onResult(task.id, task.knowledgeId, result, attempts, milliseconds);
    window.setTimeout(() => nextTask(), 900);
  }

  function handleSkip(attempts: number, milliseconds: number) {
    if (!task) return;
    onSkip(task.id, task.knowledgeId, attempts, milliseconds);
    window.setTimeout(() => nextTask(), 500);
  }

  function nextTask() {
    if (taskIndex + 1 < tasks.length) {
      setTaskIndex(taskIndex + 1);
      return;
    }
    if (isLastSegment) {
      onFinish();
      return;
    }
    onAdvance();
  }

  return (
    <div className="lesson-player">
      <header className="lesson-header">
        <button type="button" className="secondary-button" onClick={onExit}>回到地图</button>
        <div>
          <p className="lesson-meta">第 {lesson.week} 周 · 第 {lesson.weekday} 天</p>
          <h2>{lesson.title}</h2>
        </div>
        <span className="completion">{completion}%</span>
      </header>

      <div className="progress-track" aria-label="课程进度">
        <div style={{ width: `${completion}%` }} />
      </div>

      <section className="segment-panel">
        <div className="segment-head">
          <span className={`subject-badge ${lesson.subject}`}>{segment.title}</span>
          <SpeakButton text={segment.script} language={language} rate={progress.settings.speechRate} volume={progress.settings.volume} />
        </div>
        <p className="segment-script">{segment.script}</p>

        {task ? (
          <TaskRenderer
            key={task.id}
            task={task}
            subject={lesson.subject}
            onResult={handleResult}
            onSkip={handleSkip}
          />
        ) : (
          <div className="task-actions center">
            {isLastSegment ? (
              <button type="button" className="primary-button" onClick={onFinish}>完成课程</button>
            ) : (
              <button type="button" className="primary-button" onClick={onAdvance}>下一步</button>
            )}
          </div>
        )}

        {!task && tasks.length > 0 && (
          <div className="task-actions center">
            <button type="button" className="primary-button" onClick={() => setTaskIndex(0)}>开始练习</button>
          </div>
        )}
      </section>

      {showRest && (
        <div className="modal" role="dialog" aria-label="休息提醒">
          <div className="modal-card">
            <h3>休息一下</h3>
            <p>站起来，伸伸手，看看窗外远处。</p>
            <button type="button" className="primary-button" onClick={() => setShowRest(false)}>我休息好了</button>
          </div>
        </div>
      )}
    </div>
  );
}
