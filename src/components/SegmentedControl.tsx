import type { SubscriberView } from '../demoData';
import { CellIcon, UsersIcon } from './icons';

interface SegmentOption {
  value: SubscriberView;
  label: string;
  icon: 'users' | 'cell';
}

const OPTIONS: SegmentOption[] = [
  {
    value: 'key-subscribers',
    label: 'Impacted subscribers',
    icon: 'users',
  },
  {
    value: 'worst-cells',
    label: 'Worst cells',
    icon: 'cell',
  },
];

interface SegmentedControlProps {
  value: SubscriberView;
  onChange: (value: SubscriberView) => void;
}

export function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div
      className="an-segmented-control"
      role="radiogroup"
      aria-label="Subscriber view"
    >
      {OPTIONS.map((option) => {
        const checked = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={`an-segment${checked ? ' an-segment--selected' : ''}`}
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(option.value)}
          >
            {option.icon === 'users' ? (
              <UsersIcon size={18} />
            ) : (
              <CellIcon size={18} />
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
