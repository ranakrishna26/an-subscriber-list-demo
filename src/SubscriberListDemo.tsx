import { useEffect, useMemo, useState } from 'react';
import { ImpactTypeFilter } from './components/ImpactTypeFilter';
import { ChevronLeftIcon, SearchIcon } from './components/icons';
import { SegmentedControl } from './components/SegmentedControl';
import { SubscriberMatchRow } from './components/SubscriberMatchRow';
import { SubscriberRow } from './components/SubscriberRow';
import { WorstCellRow } from './components/WorstCellRow';
import {
  KEY_SUBSCRIBERS,
  SUBSCRIBER_SEARCH_CATALOG,
  WORST_CELLS,
  getCellSubscribers,
  matchesImpactFilter,
  sortKeySubscribers,
  sortWorstCells,
  type ImpactType,
  type SubscriberView,
  type WorstCellItem,
} from './demoData';

export function SubscriberListDemo() {
  const [view, setView] = useState<SubscriberView>('key-subscribers');
  const [impactType, setImpactType] = useState<ImpactType>('all');
  const [impactOpen, setImpactOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drilledCell, setDrilledCell] = useState<WorstCellItem | null>(null);

  const query = search.trim().toLowerCase();
  const isCellDrill = view === 'worst-cells' && drilledCell !== null;

  const subscriberMatches = useMemo(() => {
    if (view !== 'key-subscribers' || isCellDrill) return [];
    if (query.length < 3 || !/\d/.test(query)) return [];

    return [...SUBSCRIBER_SEARCH_CATALOG]
      .filter((item) => item.imsi.toLowerCase().includes(query))
      .sort((a, b) => {
        if (a.vip !== b.vip) return a.vip ? -1 : 1;
        return a.imsi.localeCompare(b.imsi);
      })
      .slice(0, 25);
  }, [view, query, isCellDrill]);

  const filteredSubscribers = useMemo(() => {
    const filtered = KEY_SUBSCRIBERS.filter((item) => {
      if (!matchesImpactFilter(item.issues, impactType)) return false;
      if (!query) return true;
      return (
        item.imsi.toLowerCase().includes(query) ||
        String(item.badSessions).includes(query)
      );
    });
    return sortKeySubscribers(filtered);
  }, [impactType, query]);

  const filteredCells = useMemo(() => {
    const filtered = WORST_CELLS.filter((item) => {
      if (!matchesImpactFilter(item.issues, impactType)) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.siteCode.toLowerCase().includes(query) ||
        String(item.badSubscriberCount).includes(query)
      );
    });
    return sortWorstCells(filtered);
  }, [impactType, query]);

  const cellSubscribers = useMemo(() => {
    if (!drilledCell) return [];
    const filtered = getCellSubscribers(drilledCell.id).filter((item) => {
      if (!matchesImpactFilter(item.issues, impactType)) return false;
      if (!query) return true;
      return (
        item.imsi.toLowerCase().includes(query) ||
        String(item.badSessions).includes(query)
      );
    });
    return sortKeySubscribers(filtered);
  }, [drilledCell, impactType, query]);

  const visibleIds = useMemo(() => {
    if (isCellDrill) return cellSubscribers.map((s) => s.id);
    if (view === 'key-subscribers') {
      return [
        ...subscriberMatches.map((m) => m.imsi),
        ...filteredSubscribers.map((s) => s.id),
      ];
    }
    return filteredCells.map((c) => c.id);
  }, [
    isCellDrill,
    view,
    cellSubscribers,
    subscriberMatches,
    filteredSubscribers,
    filteredCells,
  ]);

  useEffect(() => {
    setSelectedId(null);
    setDrilledCell(null);
    setSearch('');
  }, [view]);

  useEffect(() => {
    if (selectedId && !visibleIds.includes(selectedId)) {
      setSelectedId(null);
    }
  }, [selectedId, visibleIds]);

  const placeholder = isCellDrill
    ? 'Search for a subscriber'
    : view === 'key-subscribers'
      ? 'Search for a subscriber'
      : 'Search for a cell';

  const isEmpty = isCellDrill
    ? cellSubscribers.length === 0
    : view === 'key-subscribers'
      ? filteredSubscribers.length === 0 && subscriberMatches.length === 0
      : filteredCells.length === 0;

  const emptyMessage = isCellDrill
    ? 'No matching subscribers'
    : view === 'key-subscribers'
      ? 'No matching subscribers'
      : 'No matching cells';

  return (
    <section className="an-sub-panel" aria-label="AN subscriber list">
      <div className="an-sub-panel__controls">
        {isCellDrill ? (
          <button
            type="button"
            className="an-sub-panel__back"
            onClick={() => {
              setDrilledCell(null);
              setSelectedId(null);
              setSearch('');
            }}
          >
            <ChevronLeftIcon size={18} />
            <span className="an-sub-panel__back-text">
              <span className="an-sub-panel__back-label">Worst cells</span>
              <span className="an-sub-panel__back-title">{drilledCell.name}</span>
            </span>
          </button>
        ) : null}

        <label className="an-sub-search">
          <SearchIcon size={16} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </label>

        {!isCellDrill && (
          <div className="an-sub-panel__view-row">
            <SegmentedControl
              value={view}
              onChange={(next) => {
                setView(next);
                setImpactOpen(false);
              }}
            />
            <ImpactTypeFilter
              value={impactType}
              open={impactOpen}
              onOpenChange={setImpactOpen}
              onChange={setImpactType}
            />
          </div>
        )}

        {isCellDrill && (
          <div className="an-sub-panel__view-row an-sub-panel__view-row--drill">
            <div className="an-sub-panel__drill-meta">
              Subscribers in cell
            </div>
            <ImpactTypeFilter
              value={impactType}
              open={impactOpen}
              onOpenChange={setImpactOpen}
              onChange={setImpactType}
            />
          </div>
        )}
      </div>

      <div
        className="an-sub-panel__list"
        role="listbox"
        aria-label={
          isCellDrill
            ? `Subscribers in ${drilledCell.name}`
            : 'Results'
        }
      >
        {isEmpty ? (
          <div className="an-sub-panel__empty">{emptyMessage}</div>
        ) : isCellDrill ? (
          cellSubscribers.map((item) => (
            <SubscriberRow
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              impactType={impactType}
              onSelect={setSelectedId}
            />
          ))
        ) : view === 'key-subscribers' ? (
          <>
            {subscriberMatches.length > 0 && (
              <div className="an-sub-panel__section">
                <div className="an-sub-panel__section-title">
                  Subscriber matches
                </div>
                {subscriberMatches.map((item) => (
                  <SubscriberMatchRow
                    key={`match-${item.imsi}`}
                    item={item}
                    selected={selectedId === item.imsi}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            )}

            {filteredSubscribers.length === 0 ? (
              subscriberMatches.length === 0 ? null : (
                <div className="an-sub-panel__empty an-sub-panel__empty--inline">
                  No matching subscribers
                </div>
              )
            ) : (
              filteredSubscribers.map((item) => (
                <SubscriberRow
                  key={item.id}
                  item={item}
                  selected={selectedId === item.id}
                  impactType={impactType}
                  onSelect={setSelectedId}
                />
              ))
            )}
          </>
        ) : (
          filteredCells.map((item) => (
            <WorstCellRow
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              impactType={impactType}
              onSelect={(id) => {
                setSelectedId(id);
                setDrilledCell(item);
                setSearch('');
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}
