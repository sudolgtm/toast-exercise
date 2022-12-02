import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

import { fetchLikedFormSubmissions, saveLikedFormSubmission, onMessage } from './service/mockServer';

afterEach(() => cleanup());

test('renders header text', () => {
  render(<App />);

  const heading  = screen.getByRole('heading', { name: /toast exercise/i});
  expect(heading).toBeInTheDocument();
});

test('display toast', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: /new submission/i} );
  expect(button).toBeInTheDocument();
  expect(screen.queryByRole('alert')).toBeNull();
  fireEvent.click(button);
  
  const toast = screen.getByRole('alert');
  expect(toast).toBeInTheDocument();
})