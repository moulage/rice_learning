import { useRef, useState } from 'react';
import type { AppProgress, Lesson } from '@/domain/types';
import { subjectProgress } from '@/domain/curriculum';

interface ParentCenterProps {
  progress: AppProgress;
  lessons: Lesson[];
  knowledgeNames: Record<string, string>;
  onBack: () => void;
  onSettings: (settings: Partial<AppProgress['settings']>) => void;
  onExport: () => string;
  onImport: (raw: string) => boolean;
  onReset: () => void;
  onDeleteRecordings: () => void;
}

export function ParentCenter({
  progress,
  lessons,
  knowledgeNames,
  onBack,
  onSettings,
  onExport,
  onImport,
  onReset,
  onDeleteRecordings,
}: ParentCenterProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [importError, setImportError] = useState(false);
  const totalMinutes = progress.events.length * 1;
  const subjects: Array<'math' | 'pinyin' | 'english'> = ['math', 'pinyin', 'english'];
  const needReview = Object.values(progress.mastery).filter((item) => item.status === 'review-needed');
  const masteredCount = Object.values(progress.mastery).filter((item) => item.status === 'mastered').length;

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const success = onImport(String(reader.result));
      setImportError(!success);
    };
    reader.readAsText(file);
  }

  return (
    <div className="parent-center">
      <header className="page-header">
        <button type="button" className="secondary-button" onClick={onBack}>返回</button>
        <h1>家长中心</h1>
        <span>{progress.completedLessonIds.length} 节完成</span>
      </header>

      <section className="stat-grid" aria-label="学习概览">
        <article className="stat-card">
          <strong>{progress.completedLessonIds.length}</strong>
          <span>完成课节</span>
        </article>
        <article className="stat-card">
          <strong>{masteredCount}</strong>
          <span>已掌握知识点</span>
        </article>
        <article className="stat-card">
          <strong>{needReview.length}</strong>
          <span>待复习知识点</span>
        </article>
        <article className="stat-card">
          <strong>{totalMinutes}</strong>
          <span>累计任务数</span>
        </article>
      </section>

      <section className="parent-grid">
        <article className="parent-card">
          <h2>三科进度</h2>
          {subjects.map((subject) => (
            <div key={subject} className="subject-progress">
              <span>{subject === 'math' ? '数学' : subject === 'pinyin' ? '语文拼音' : '英语字母'}</span>
              <progress value={subjectProgress(progress, lessons, subject)} max={100} />
              <strong>{subjectProgress(progress, lessons, subject)}%</strong>
            </div>
          ))}
          <p>累计学习任务：{totalMinutes} 分钟左右</p>
        </article>

        <article className="parent-card">
          <h2>待复习</h2>
          {needReview.length === 0 ? (
            <p>当前没有明显薄弱点。</p>
          ) : (
            <ul>
              {needReview.slice(0, 10).map((item) => (
                <li key={item.knowledgeId}>{knowledgeNames[item.knowledgeId] ?? item.knowledgeId}</li>
              ))}
            </ul>
          )}
        </article>

        <article className="parent-card">
          <h2>学习设置</h2>
          <label>
            每日课程上限
            <input
              type="number"
              min={1}
              max={5}
              value={progress.settings.dailyMainLessonLimit}
              onChange={(event) => onSettings({ dailyMainLessonLimit: Math.max(1, Math.min(5, Number(event.target.value) || 1)) })}
            />
          </label>
          <label>
            音量
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={progress.settings.volume}
              onChange={(event) => onSettings({ volume: Number(event.target.value) })}
            />
          </label>
          <label>
            语速
            <input
              type="range"
              min={0.6}
              max={1.2}
              step={0.1}
              value={progress.settings.speechRate}
              onChange={(event) => onSettings({ speechRate: Number(event.target.value) })}
            />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={progress.settings.animationLevel === 'normal'}
              onChange={(event) => onSettings({ animationLevel: event.target.checked ? 'normal' : 'low' })}
            />
            标准动画
          </label>
        </article>

        <article className="parent-card">
          <h2>数据管理</h2>
          <div className="task-actions">
            <button type="button" className="secondary-button" onClick={() => {
              const blob = new Blob([onExport()], { type: 'application/json' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'changan-learning-progress.json';
              link.click();
              URL.revokeObjectURL(link.href);
            }}>导出进度</button>
            <button type="button" className="secondary-button" onClick={() => fileRef.current?.click()}>导入备份</button>
            <button type="button" className="secondary-button" onClick={onDeleteRecordings}>删除录音</button>
            <button type="button" className="danger-button" onClick={() => {
              if (window.confirm('确定要重置全部学习进度吗？')) onReset();
            }}>重置进度</button>
          </div>
          {importError && <p className="feedback coaching">备份文件无法读取。</p>}
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="file-input"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) readFile(file);
              event.target.value = '';
            }}
          />
        </article>
      </section>
    </div>
  );
}
