import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders main title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText(/משימות|Tasks|המשימות שלך/i);
  expect(title).toBeInTheDocument();
});
