import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fernando velcic', () => {
  render(<App />);
  const linkElement = screen.getByText("Fernando Velcic");
  expect(linkElement).toBeInTheDocument();
});
