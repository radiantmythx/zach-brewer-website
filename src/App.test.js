import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page title', () => {
  render(<App />);
  const heading = screen.getByText(/Zachary Brewer/i);
  expect(heading).toBeInTheDocument();
});
