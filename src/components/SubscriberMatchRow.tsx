import type { SubscriberSearchMatch } from '../demoData';

interface SubscriberMatchRowProps {
  item: SubscriberSearchMatch;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function SubscriberMatchRow({
  item,
  selected,
  onSelect,
}: SubscriberMatchRowProps) {
  return (
    <button
      type="button"
      className="an-sub-row"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(item.imsi)}
    >
      <span className="an-sub-row__dot an-sub-row__dot--ok" aria-hidden />
      <span className="an-sub-row__text">
        <span className="an-sub-row__id-line">
          <span className="an-sub-row__id">{item.imsi}</span>
          {item.vip && <span className="an-sub-row__vip">VIP</span>}
        </span>
        <span className="an-sub-row__meta">
          <span className="an-sub-row__category">{item.cellName}</span>
        </span>
      </span>
    </button>
  );
}
