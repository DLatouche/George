import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Basics test', () => {
  const { getByText } = render(
    <App />
  );

  expect(getByText(/Hello/i)).toBeInTheDocument();
});
