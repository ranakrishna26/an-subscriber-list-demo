import type { ImpactType, WorstCellItem } from '../demoData';
import { impactDotSeverity, orderIssueIcons } from '../demoData';
import { IssueIcon } from './icons';

interface WorstCellRowProps {
  item: WorstCellItem;
  selected: boolean;
  impactType: ImpactType;
  onSelect: (id: string) => void;
}

export function WorstCellRow({
  item,
  selected,
  impactType,
  onSelect,
}: WorstCellRowProps) {
  const severity = impactDotSeverity(item.issues.length, item.kpiBand);
  const orderedIssues = orderIssueIcons(item.issues, impactType);

  return (
    <button
      type="button"
      className="an-sub-row"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(item.id)}
    >
      <span
        className={`an-sub-row__dot an-sub-row__dot--${severity}`}
        aria-hidden
      />
      <span className="an-sub-row__text">
        <span className="an-sub-row__id-line">
          <span className="an-sub-row__id">{item.name}</span>
        </span>
        <span className="an-sub-row__meta">
          <span className="an-sub-row__category">Bad sessions</span>
          <span className="an-sub-row__divider" aria-hidden>
            |
          </span>
          <span className="an-sub-row__count">{item.badSubscriberCount}</span>
        </span>
      </span>
      <span className="an-sub-row__actions">
        <span className="an-sub-row__issues">
          {orderedIssues.map((kind) => (
            <span key={kind} title={kind}>
              <IssueIcon kind={kind} size={18} />
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
