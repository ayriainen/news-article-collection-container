import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '@/App';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { toast } from 'sonner';

test('renders app component', async () => {
  render(<App />);
  expect(screen.getByText(/News article collector/i)).toBeInTheDocument();
  expect(await screen.findByText(/Enter RSS feed URL/i)).toBeInTheDocument();
});

test('starts RSS fetching', async () => {
  render(<App />);

  const activateFetchButton = await screen.findByText(/Activate RSS fetching/i);
  fireEvent.click(activateFetchButton);

  await waitFor(() => {
    expect(screen.getByText(/Disable RSS fetching/i)).toBeInTheDocument();
  });
});

test('stops RSS fetching', async () => {
  render(<App />);

  const disableFetchButton = await screen.findByText(/Disable RSS fetching/i);
  fireEvent.click(disableFetchButton);

  await waitFor(() => {
    expect(screen.getByText(/Activate RSS fetching/i)).toBeInTheDocument();
  });
});

test('adds RSS feed URL to the list', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('RSS-feed address here...');
  fireEvent.change(input, { target: { value: 'https://blabla.com/feed' } });

  const addToListButton = screen.getByText(/Add to list/i);
  fireEvent.click(addToListButton);

  await waitFor(() => {
    expect(screen.getByText('https://blabla.com/feed')).toBeInTheDocument();
  });
});

test('submits RSS feed URLs', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('RSS-feed address here...');
  fireEvent.change(input, { target: { value: 'https://blabla.com/feed' } });

  const addToListButton = screen.getByText(/Add to list/i);
  fireEvent.click(addToListButton);

  const sendFeedsButton = screen.getByText(/Send selected RSS feeds/i);
  fireEvent.click(sendFeedsButton);

  await waitFor(() => {
    expect(toast.promise).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        loading: 'Submitting...',
        success: expect.any(Function),
      })
    );
  });
});

test('downloads articles', async () => {
  render(<App />);

  const downloadButton = screen.getByText(/Download articles/i);
  fireEvent.click(downloadButton);

  await waitFor(() => {
    expect(toast.promise).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        loading: 'Downloading...',
        success: expect.any(Function),
      })
    );
  });
});

test('searches articles based on query', async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Insert search query...');
  const searchButton = screen.getByRole('button', { name: /Search/i });

  await act(async () => {
    fireEvent.change(searchInput, { target: { value: 'Full text 1' } });
    fireEvent.click(searchButton);
  });

  const fullText1 = screen.getByText('Full text 1', { exact: false });
  expect(fullText1).toBeInTheDocument();

  const fullText2 = screen.queryByText('Full text 2', { exact: false });
  expect(fullText2).not.toBeInTheDocument();
});