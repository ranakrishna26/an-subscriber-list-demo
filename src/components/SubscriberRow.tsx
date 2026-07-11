import type { ImpactType, KeySubscriberItem } from '../demoData';
import { impactDotSeverity, orderIssueIcons } from '../demoData';
import { IssueIcon } from './icons';

interface SubscriberRowProps {
  item: KeySubscriberItem;
  selected: boolean;
  impactType: ImpactType;
  onSelect: (id: string) => void;
}

export function SubscriberRow({
  item,
  selected,
  impactType,
  onSelect,
}: SubscriberRowProps) {
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
          <span className="an-sub-row__id">{item.imsi}</span>
          {item.vip && <span className="an-sub-row__vip">VIP</span>}
        </span>
        <span className="an-sub-row__meta">
          <span className="an-sub-row__category">Bad sessions</span>
          <span className="an-sub-row__divider" aria-hidden>
            |
          </span>
          <span className="an-sub-row__count">{item.badSessions}</span>
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
