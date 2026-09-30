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
    expect(screen.getAllByRole('button', { name: /开始闯关|复习闯关|今天休息/ }).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /请家长确认|给家长/ }));
    expect(screen.getByRole('dialog', { name: '家长确认' })).toBeInTheDocument();
    await user.type(screen.getByLabelText('家长确认答案'), '7');
    await user.click(screen.getByRole('button', { name: '进入家长中心' }));
    expect(screen.getByRole('heading', { name: '家长中心' })).toBeInTheDocument();
  });

  it('opens unlocked map lessons and keeps future locations locked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /长安地图/ }));
    expect(screen.getByRole('heading', { name: '长安学习地图' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '进入闯关' }).length).toBeGreaterThan(0);

    await user.click(screen.getAllByRole('button', { name: '进入闯关' })[0]);
    expect(screen.getByRole('button', { name: '回到地图' })).toBeInTheDocument();
  });

  it('disables future map entries with a lock state', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /长安地图/ }));
    await user.click(screen.getByRole('button', { name: /西安城墙/ }));
    expect(screen.getAllByRole('button', { name: '未解锁' }).length).toBeGreaterThan(0);
    screen.getAllByRole('button', { name: '未解锁' }).forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
