import { useEffect, useId, useRef } from 'react';
import type { ImpactType, IssueKind } from '../demoData';
import {
  ChevronDownIcon,
  IMPACT_OPTIONS,
  IssueIcon,
} from './icons';

interface ImpactTypeFilterProps {
  value: ImpactType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: ImpactType) => void;
}

export function ImpactTypeFilter({
  value,
  open,
  onOpenChange,
  onChange,
}: ImpactTypeFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected =
    IMPACT_OPTIONS.find((opt) => opt.value === value) ?? IMPACT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div className="an-impact-filter" ref={rootRef}>
      <button
        type="button"
        className="an-impact-filter__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => onOpenChange(!open)}
      >
        <span className="an-impact-filter__label">
          {value !== 'all' && (
            <IssueIcon kind={value as IssueKind} size={16} />
          )}
          {value === 'all' ? 'Impact types' : selected.label}
        </span>
        <ChevronDownIcon size={16} />
      </button>

      {open && (
        <ul
          id={listId}
          className="an-impact-filter__menu"
          role="listbox"
          aria-label="Impact types"
        >
          {IMPACT_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  className={`an-impact-filter__option${
                    isSelected ? ' an-impact-filter__option--selected' : ''
                  }`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                >
                  {option.value !== 'all' && (
                    <IssueIcon kind={option.value} size={16} />
                  )}
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
