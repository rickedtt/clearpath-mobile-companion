import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('ClearPath Mobile Companion', () => {
  it('identifies the demo as an optional companion using sample data', () => {
    render(<HomePage />);
    expect(screen.getByText('Optional by design.')).toBeInTheDocument();
    expect(screen.getByText(/core ClearPath PC business system works fully without/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample data only/i)).toBeInTheDocument();
  });

  it('lets an employee clock out and back in', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'Clock out for today' }));
    expect(screen.getByText('Ready when you are')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clock in for today' }));
    expect(screen.getByText('2h 18m')).toBeInTheDocument();
  });

  it('opens a job and advances its status', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: /Open Walk-in cooler inspection/i }));
    expect(screen.getByRole('heading', { name: 'Walk-in cooler inspection' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add observations/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Start job/i }));
    expect(screen.getByText('In progress')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Mark complete/i }));
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('switches to owner visibility and exposes team activity', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'Owner' }));
    expect(screen.getByText('Good morning, Sam')).toBeInTheDocument();
    expect(screen.getByText('Bell & Finch needs a technician')).toBeInTheDocument();
    expect(screen.getByText('Jordan Miles')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Today’s jobs' }));
    expect(screen.getByText('Riverside Market')).toBeInTheDocument();
    expect(screen.getByText('Unassigned')).toBeInTheDocument();
  });
});
