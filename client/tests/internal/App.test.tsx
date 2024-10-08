import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import '@testing-library/jest-dom';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { toast } from 'sonner';
import { MockEventSource } from './setupTests';
import { BrowserRouter as Router } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { handleArticleDownload } from '@/services/article-download';

vi.mock('@/services/article-download', () => ({
  handleArticleDownload: vi.fn(),
}));

describe('App component', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.spyOn(global, 'EventSource').mockImplementation(
      (url: string | URL, eventSourceInitDict?: EventSourceInit) =>
        new MockEventSource(url, eventSourceInitDict)
    );
    render(
      <Router>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </Router>
    );

    await waitFor(() => {
      const registerView = screen.queryByTestId('register-view');
      const loginView = screen.queryByTestId('login-view');

      // Ensure the Register view is not present
      expect(registerView).not.toBeInTheDocument();

      // Ensure the Login view is not present
      expect(loginView).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    }, { timeout: 5000 });

    await waitFor(
      () => {
        const rssFeeds = screen.queryByText(/RSS feeds/i);
        const logOut = screen.queryByText(/Log out/i);
        expect(rssFeeds || logOut).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test('renders app component', async () => {
    expect(screen.getByText(/News Article Collector/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Add or delete feeds/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  test('submits RSS feed URLs', async () => {
    const toastSuccessSpy = vi.spyOn(toast, 'success');

    const input = screen.getByPlaceholderText('Input RSS feed address here...');
    fireEvent.change(input, { target: { value: 'https://blabla.com/feed' } });

    const addToListButton = screen.getByText(/Add to list/i);
    fireEvent.click(addToListButton);

    await waitFor(() => {
      expect(screen.getByText('https://blabla.com/feed')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(toastSuccessSpy).toHaveBeenCalledWith(
        'Feed list updated successfully!'
      );
    }, { timeout: 4000 });
  });

  test('starts RSS fetching', async () => {
    const toggleFetchSwitch = screen.getByTestId('fetchToggle');
    fireEvent.click(toggleFetchSwitch);

    await waitFor(() => {
      expect(toggleFetchSwitch).toBeChecked();
    }, { timeout: 2000 });
  });

  test('stops RSS fetching', async () => {
    const toggleFetchSwitch = screen.getByTestId('fetchToggle');

    fireEvent.click(toggleFetchSwitch);
    await waitFor(() => {
      expect(toggleFetchSwitch).toBeChecked();
    }, { timeout: 2000 });

    fireEvent.click(toggleFetchSwitch);

    await waitFor(() => {
      expect(toggleFetchSwitch).not.toBeChecked();
    }, { timeout: 2000 });
  });

  // note the use of userEvent which solved issues with dropdown menu
  const testDownloadOption = async (format: 'JSON' | 'CSV' | 'Parquet') => {
    const user = userEvent.setup();

    const downloadButton = screen.getByText('Download All Articles');
    expect(downloadButton).toBeInTheDocument();

    await user.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByText(format)).toBeInTheDocument();
    }, { timeout: 2000 });

    const formatOption = screen.getByText(format);
    await user.click(formatOption);

    await waitFor(() => {
      expect(handleArticleDownload).toHaveBeenCalledWith(
        format.toLowerCase() as 'json' | 'csv' | 'parquet',
        false,
        expect.any(Function)
      );
    }, { timeout: 2000 });
  };

  test('clicks JSON download option', async () => {
    await testDownloadOption('JSON');
  });

  test('clicks CSV download option', async () => {
    await testDownloadOption('CSV');
  });

  test('clicks Parquet download option', async () => {
    await testDownloadOption('Parquet');
  });

  // handler at setup is only using generalQuery for now
  test('searches articles based on query', async () => {
    const user = userEvent.setup();

    const searchLink = screen.getByRole('link', { name: /^Search$/ });
    await user.click(searchLink);

    await waitFor(() => {
      expect(screen.getByText(/Search articles/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    const searchInput = screen.getByPlaceholderText('Insert query...');
    const searchButton = screen.getByRole('button', { name: /Search/i });

    await user.type(searchInput, 'Full text 1');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Full text 1.', { exact: false })).toBeInTheDocument();
      expect(screen.queryByText('Full text 2.', { exact: false })).not.toBeInTheDocument();
    }, { timeout: 2000 });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);
  });
});
