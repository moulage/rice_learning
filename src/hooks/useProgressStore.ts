import { create } from 'zustand';
import type { AppProgress, LearningEvent, Lesson, ParentSettings } from '@/domain/types';
import {
  canStartLesson,
  completeLesson,
  createInitialProgress,
  importProgress,
  recordTaskResult,
  startLesson,
  updateSettings,
} from '@/domain/progress';
import { loadProgress, saveProgress } from '@/domain/storage';

interface ProgressStore {
  progress: AppProgress;
  hydrated: boolean;
  initialize: () => Promise<void>;
  start: (lesson: Lesson) => void;
  advanceSegment: () => void;
  recordResult: (event: LearningEvent) => void;
  finish: (lesson: Lesson) => void;
  saveSettings: (settings: Partial<ParentSettings>) => void;
  exportJson: () => string;
  importJson: (raw: string) => boolean;
  reset: () => void;
  deleteRecordings: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: createInitialProgress(),
  hydrated: false,
  initialize: async () => {
    const stored = await loadProgress();
    const imported = typeof stored === 'object' && stored !== null
      ? importProgress(JSON.stringify(stored))
      : null;
    set({ progress: imported ?? createInitialProgress(), hydrated: true });
  },
  start: (lesson) => {
    const current = get().progress;
    if (!canStartLesson(current, lesson)) return;
    const next = startLesson(current, lesson);
    set({ progress: next });
    void saveProgress(next);
  },
  advanceSegment: () => {
    const next = {
      ...get().progress,
      activeSegmentIndex: get().progress.activeSegmentIndex + 1,
    };
    set({ progress: next });
    void saveProgress(next);
  },
  recordResult: (event) => {
    const next = recordTaskResult(get().progress, event);
    set({ progress: next });
    void saveProgress(next);
  },
  finish: (lesson) => {
    const next = completeLesson(get().progress, lesson);
    set({ progress: next });
    void saveProgress(next);
  },
  saveSettings: (settings) => {
    const next = updateSettings(get().progress, settings);
    set({ progress: next });
    void saveProgress(next);
  },
  exportJson: () => JSON.stringify(get().progress, null, 2),
  importJson: (raw) => {
    const imported = importProgress(raw);
    if (!imported) return false;
    set({ progress: imported });
    void saveProgress(imported);
    return true;
  },
  reset: () => {
    const next = createInitialProgress();
    set({ progress: next });
    void saveProgress(next);
  },
  deleteRecordings: () => {
    const next = {
      ...get().progress,
      events: get().progress.events.filter((event) => !event.taskId.startsWith('recording-')),
    };
    set({ progress: next });
    void saveProgress(next);
  },
}));
