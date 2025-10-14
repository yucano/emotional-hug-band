import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StatsCard } from '../StatsCard';
import { Heart } from 'lucide-react';

describe('StatsCard', () => {
  it('renders with correct title and value', () => {
    const { getByText } = render(
      <StatsCard
        title="Heart Rate"
        value="75"
        subtitle="bpm"
        icon={Heart}
        iconColor="bg-red-500"
      />
    );

    expect(getByText('Heart Rate')).toBeInTheDocument();
    expect(getByText('75')).toBeInTheDocument();
    expect(getByText('bpm')).toBeInTheDocument();
  });

  it('renders without subtitle when not provided', () => {
    const { getByText } = render(
      <StatsCard
        title="Test Stat"
        value="100"
        icon={Heart}
        iconColor="bg-blue-500"
      />
    );

    expect(getByText('Test Stat')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });
});
