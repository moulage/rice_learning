import { useState } from 'react';

interface ParentGateProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function ParentGate({ onSuccess, onClose }: ParentGateProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className="modal" role="dialog" aria-label="家长确认">
      <div className="modal-card">
        <h2>请家长确认</h2>
        <p>3 + 4 = ?</p>
        <input
          value={answer}
          inputMode="numeric"
          onChange={(event) => {
            setAnswer(event.target.value);
            setError(false);
          }}
          aria-label="家长确认答案"
        />
        {error && <p className="feedback coaching">答案不对，请再试一次。</p>}
        <div className="task-actions">
          <button type="button" className="secondary-button" onClick={onClose}>返回</button>
          <button
            type="button"
            className="primary-button"
            onClick={() => (answer.trim() === '7' ? onSuccess() : setError(true))}
          >
            进入家长中心
          </button>
        </div>
      </div>
    </div>
  );
}
