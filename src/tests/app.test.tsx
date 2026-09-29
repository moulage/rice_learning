import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

describe('App shell', () => {
  it('shows the child home and opens the parent gate', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /开始学习|今天该休息了/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /请家长确认|给家长/ }));
    expect(screen.getByRole('dialog', { name: '家长确认' })).toBeInTheDocument();
    await user.type(screen.getByLabelText('家长确认答案'), '7');
    await user.click(screen.getByRole('button', { name: '进入家长中心' }));
    expect(screen.getByRole('heading', { name: '家长中心' })).toBeInTheDocument();
  });
});
