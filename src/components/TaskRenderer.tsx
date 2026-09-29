import { useEffect, useMemo, useRef, useState } from 'react';
import type { LessonTask, Subject } from '@/domain/types';

interface TaskRendererProps {
  task: LessonTask;
  subject: Subject;
  onResult: (result: 'correct' | 'correct-after-hint' | 'correct-after-demo', attempts: number, milliseconds: number) => void;
  onSkip: (attempts: number, milliseconds: number) => void;
}

const selectionTasks = new Set(['choice', 'audio-choice', 'counting', 'money', 'clock', 'match', 'creation']);

export function TaskRenderer({ task, subject, onResult, onSkip }: TaskRendererProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'hint' | 'coaching'>('none');
  const startedAt = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const strokeCount = useRef(0);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const isMulti = task.answerIds ? task.answerIds.length > 1 : false;
  const expected = useMemo(() => new Set(task.answerIds ?? []), [task.answerIds]);

  useEffect(() => {
    setSelected([]);
    setAttempts(0);
    setFeedback('none');
    setHasDrawing(false);
    setRecording(false);
    strokeCount.current = 0;
    startedAt.current = Date.now();
  }, [task.id]);

  function finish(result: 'correct' | 'correct-after-hint' | 'correct-after-demo') {
    setFeedback('correct');
    onResult(result, attempts + 1, Date.now() - startedAt.current);
  }

  function check() {
    if (!task.answerIds) return;
    const attempt = attempts + 1;
    setAttempts(attempt);
    const correct = selected.length === task.answerIds.length && selected.every((id) => expected.has(id));
    if (correct) {
      finish(attempt === 1 ? 'correct' : 'correct-after-hint');
      return;
    }
    if (attempt === 1) setFeedback('hint');
    else if (attempt === 2) setFeedback('coaching');
    else {
      setSelected([...task.answerIds]);
      finish('correct-after-demo');
    }
  }

  function toggle(id: string) {
    setFeedback('none');
    setSelected((current) => {
      if (isMulti) return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      return [id];
    });
  }

  function canvasPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function startDraw(event: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    const point = canvasPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    const point = canvasPoint(event);
    context.lineWidth = 8;
    context.lineCap = 'round';
    context.strokeStyle = '#157a67';
    context.lineTo(point.x, point.y);
    context.stroke();
    strokeCount.current += 1;
    if (strokeCount.current === 12) setHasDrawing(true);
  }

  function stopDraw() {
    drawing.current = false;
  }

  async function toggleRecording() {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  }

  if (task.type === 'tracing') {
    return (
      <section className="task-panel" aria-label={task.prompt}>
        <h3>{task.prompt}</h3>
        <canvas
          ref={canvasRef}
          className="trace-canvas"
          width={640}
          height={300}
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={stopDraw}
          onPointerLeave={stopDraw}
        />
        <div className="task-actions">
          <button type="button" className="secondary-button" onClick={() => {
            const canvas = canvasRef.current;
            canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
            strokeCount.current = 0;
            setHasDrawing(false);
          }}>再来一次</button>
          <button type="button" className="primary-button" disabled={!hasDrawing} onClick={() => finish(hasDrawing && attempts === 0 ? 'correct' : 'correct-after-hint')}>
            我写好了
          </button>
        </div>
      </section>
    );
  }

  if (task.type === 'recording') {
    return (
      <section className="task-panel" aria-label={task.prompt}>
        <h3>{task.prompt}</h3>
        <div className="task-actions">
          <button type="button" className={recording ? 'secondary-button' : 'primary-button'} onClick={toggleRecording}>
            {recording ? '停止录音' : '开始跟读'}
          </button>
          <button type="button" className="primary-button" disabled={recording} onClick={() => finish(attempts === 0 ? 'correct' : 'correct-after-hint')}>
            我读对了
          </button>
          <button type="button" className="secondary-button" onClick={() => onSkip(attempts + 1, Date.now() - startedAt.current)}>
            稍后再读
          </button>
        </div>
      </section>
    );
  }

  if (task.type === 'sorting') {
    const orderText = selected.map((id) => task.options?.find((option) => option.id === id)?.label).join(' → ');
    return (
      <section className="task-panel" aria-label={task.prompt}>
        <h3>{task.prompt}</h3>
        <div className="option-grid">
          {task.options?.map((option) => (
            <button key={option.id} type="button" className={selected.includes(option.id) ? 'option selected' : 'option'} onClick={() => toggle(option.id)}>
              <span className="option-label">{option.label}</span>
            </button>
          ))}
        </div>
        <p className="order-preview">{orderText || '按顺序点一点'}</p>
        <div className="task-actions">
          <button type="button" className="secondary-button" onClick={() => setSelected([])}>重新排</button>
          <button type="button" className="primary-button" onClick={check}>完成</button>
        </div>
      </section>
    );
  }

  if (!selectionTasks.has(task.type)) {
    return (
      <section className="task-panel" aria-label={task.prompt}>
        <h3>{task.prompt}</h3>
        <div className="task-actions">
          <button type="button" className="primary-button" onClick={() => finish('correct')}>我完成了</button>
        </div>
      </section>
    );
  }

  return (
    <section className="task-panel" aria-label={task.prompt}>
      <h3>{task.prompt}</h3>
      <div className={task.type === 'match' ? 'option-grid narrow' : 'option-grid'}>
        {task.options?.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected.includes(option.id) ? 'option selected' : 'option'}
            onClick={() => toggle(option.id)}
          >
            <span className="option-label">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="task-actions">
        <button type="button" className="primary-button" disabled={selected.length === 0} onClick={check}>
          我选好了
        </button>
      </div>
      {feedback === 'hint' && <p className="feedback hint">{task.hint}</p>}
      {feedback === 'coaching' && <p className="feedback coaching">{task.coaching}</p>}
      {feedback === 'correct' && <p className="feedback success">你做到了！{subject === 'english' ? 'Great job!' : '继续加油。'}</p>}
    </section>
  );
}
