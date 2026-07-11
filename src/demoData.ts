export type Severity = 'critical' | 'major' | 'minor' | 'ok';
export type IssueKind = 'connectivity' | 'reliability' | 'signal' | 'throughput';
export type ImpactType = 'all' | IssueKind;
export type SubscriberView = 'key-subscribers' | 'worst-cells';
export type KpiBand = 'breached' | 'nearBreach' | 'meetsTarget';

export interface KeySubscriberItem {
  id: string;
  imsi: string;
  badSessions: number;
  issues: IssueKind[];
  kpiBand: KpiBand;
  vip: boolean;
}

export interface WorstCellItem {
  id: string;
  name: string;
  siteCode: string;
  badSubscriberCount: number;
  issues: IssueKind[];
  kpiBand: KpiBand;
}

export interface SubscriberSearchMatch {
  imsi: string;
  cellName: string;
  vip: boolean;
}

export const KEY_SUBSCRIBERS: KeySubscriberItem[] = [
  { id: '310150123456789', imsi: '310150123456789', badSessions: 14, issues: ['connectivity', 'reliability', 'signal'], kpiBand: 'breached', vip: true },
  { id: '310150987654321', imsi: '310150987654321', badSessions: 11, issues: ['connectivity', 'throughput'], kpiBand: 'breached', vip: false },
  { id: '310150111222333', imsi: '310150111222333', badSessions: 9, issues: ['reliability', 'signal'], kpiBand: 'breached', vip: false },
  { id: '310150444555666', imsi: '310150444555666', badSessions: 8, issues: ['connectivity'], kpiBand: 'nearBreach', vip: true },
  { id: '310150777888999', imsi: '310150777888999', badSessions: 7, issues: ['signal', 'throughput'], kpiBand: 'nearBreach', vip: false },
  { id: '310150222333444', imsi: '310150222333444', badSessions: 6, issues: ['throughput'], kpiBand: 'nearBreach', vip: false },
  { id: '310150555666777', imsi: '310150555666777', badSessions: 5, issues: ['reliability'], kpiBand: 'meetsTarget', vip: false },
  { id: '310150888999000', imsi: '310150888999000', badSessions: 4, issues: ['connectivity', 'reliability'], kpiBand: 'breached', vip: false },
  { id: '310150333444555', imsi: '310150333444555', badSessions: 3, issues: ['signal'], kpiBand: 'meetsTarget', vip: false },
  { id: '310150666777888', imsi: '310150666777888', badSessions: 2, issues: ['throughput'], kpiBand: 'meetsTarget', vip: false },
  { id: '310150999000111', imsi: '310150999000111', badSessions: 2, issues: ['connectivity', 'signal', 'throughput'], kpiBand: 'breached', vip: false },
  { id: '310150123123123', imsi: '310150123123123', badSessions: 1, issues: ['reliability', 'throughput'], kpiBand: 'nearBreach', vip: false },
];

export const WORST_CELLS: WorstCellItem[] = [
  { id: 'cell-001', name: 'Central-parliament-29aue', siteCode: 'PARL-29', badSubscriberCount: 47, issues: ['connectivity', 'reliability', 'signal'], kpiBand: 'breached' },
  { id: 'cell-002', name: 'Downtown-metro-14bx', siteCode: 'METR-14', badSubscriberCount: 38, issues: ['connectivity', 'throughput'], kpiBand: 'breached' },
  { id: 'cell-003', name: 'Airport-terminal-7g', siteCode: 'AERO-07', badSubscriberCount: 31, issues: ['reliability', 'signal'], kpiBand: 'breached' },
  { id: 'cell-004', name: 'Highway-corridor-88vip', siteCode: 'HWY-88', badSubscriberCount: 26, issues: ['connectivity', 'reliability'], kpiBand: 'nearBreach' },
  { id: 'cell-005', name: 'Suburban-ring-52c', siteCode: 'RING-52', badSubscriberCount: 22, issues: ['signal', 'throughput'], kpiBand: 'nearBreach' },
  { id: 'cell-006', name: 'Industrial-park-3f', siteCode: 'IND-03', badSubscriberCount: 18, issues: ['throughput'], kpiBand: 'nearBreach' },
  { id: 'cell-007', name: 'Riverside-12d', siteCode: 'RIVE-12', badSubscriberCount: 12, issues: ['connectivity'], kpiBand: 'meetsTarget' },
  { id: 'cell-008', name: 'Campus-west-5e', siteCode: 'CAMP-05', badSubscriberCount: 9, issues: ['reliability'], kpiBand: 'meetsTarget' },
  { id: 'cell-009', name: 'Stadium-north-2a', siteCode: 'STAD-02', badSubscriberCount: 7, issues: ['signal'], kpiBand: 'meetsTarget' },
  { id: 'cell-010', name: 'Harbor-south-9k', siteCode: 'HARB-09', badSubscriberCount: 5, issues: ['connectivity', 'signal', 'throughput'], kpiBand: 'breached' },
];

export const SUBSCRIBER_SEARCH_CATALOG: SubscriberSearchMatch[] = [
  { imsi: '310150123456789', cellName: 'Central-parliament-29aue', vip: true },
  { imsi: '310150987654321', cellName: 'Downtown-metro-14bx', vip: false },
  { imsi: '310150444555666', cellName: 'Highway-corridor-88vip', vip: true },
  { imsi: '310150111222333', cellName: 'Airport-terminal-7g', vip: false },
  { imsi: '310150555666777', cellName: 'Suburban-ring-52c', vip: false },
  { imsi: '310150888999000', cellName: 'Industrial-park-3f', vip: false },
  { imsi: '310150333444555', cellName: 'Riverside-12d', vip: false },
  { imsi: '310150666777888', cellName: 'Campus-west-5e', vip: false },
];

export const ISSUE_ORDER: IssueKind[] = [
  'connectivity',
  'reliability',
  'signal',
  'throughput',
];

export function kpiBandRank(band: KpiBand): number {
  switch (band) {
    case 'breached':
      return 0;
    case 'nearBreach':
      return 1;
    case 'meetsTarget':
      return 2;
  }
}

export function impactDotSeverity(
  impactCount: number,
  kpiBand: KpiBand,
): Severity {
  if (impactCount >= 2) return 'critical';
  if (impactCount === 1) return kpiBand === 'breached' ? 'critical' : 'minor';
  return 'ok';
}

export function sortKeySubscribers(
  items: KeySubscriberItem[],
): KeySubscriberItem[] {
  return [...items].sort((a, b) => {
    if (a.vip !== b.vip) return a.vip ? -1 : 1;
    if (b.issues.length !== a.issues.length) {
      return b.issues.length - a.issues.length;
    }
    if (b.badSessions !== a.badSessions) return b.badSessions - a.badSessions;
    const bandDiff = kpiBandRank(a.kpiBand) - kpiBandRank(b.kpiBand);
    if (bandDiff !== 0) return bandDiff;
    return a.imsi.localeCompare(b.imsi);
  });
}

export function sortWorstCells(items: WorstCellItem[]): WorstCellItem[] {
  return [...items].sort((a, b) => {
    const bandDiff = kpiBandRank(a.kpiBand) - kpiBandRank(b.kpiBand);
    if (bandDiff !== 0) return bandDiff;
    if (b.badSubscriberCount !== a.badSubscriberCount) {
      return b.badSubscriberCount - a.badSubscriberCount;
    }
    return a.name.localeCompare(b.name);
  });
}

export function orderIssueIcons(
  issues: IssueKind[],
  selectedImpact: ImpactType,
): IssueKind[] {
  const present = ISSUE_ORDER.filter((kind) => issues.includes(kind));
  if (selectedImpact === 'all' || !present.includes(selectedImpact)) {
    return present;
  }
  return [
    ...present.filter((kind) => kind !== selectedImpact),
    selectedImpact,
  ];
}

export function matchesImpactFilter(
  issues: IssueKind[],
  impactType: ImpactType,
): boolean {
  return impactType === 'all' || issues.includes(impactType);
}

const ISSUE_POOL: IssueKind[][] = [
  ['connectivity'],
  ['reliability'],
  ['signal'],
  ['throughput'],
  ['connectivity', 'reliability'],
  ['signal', 'throughput'],
  ['connectivity', 'signal'],
  ['reliability', 'throughput'],
  ['connectivity', 'reliability', 'signal'],
  ['connectivity', 'signal', 'throughput'],
];

const KPI_POOL: KpiBand[] = ['breached', 'nearBreach', 'meetsTarget'];

function buildCellSubscribers(): Record<string, KeySubscriberItem[]> {
  const byName = new Map(
    SUBSCRIBER_SEARCH_CATALOG.map((entry) => [entry.cellName, entry]),
  );
  const keyByImsi = new Map(KEY_SUBSCRIBERS.map((item) => [item.imsi, item]));
  const result: Record<string, KeySubscriberItem[]> = {};

  for (const cell of WORST_CELLS) {
    const list: KeySubscriberItem[] = [];
    const catalogHit = byName.get(cell.name);
    if (catalogHit) {
      const existing = keyByImsi.get(catalogHit.imsi);
      if (existing) {
        list.push(existing);
      } else {
        list.push({
          id: catalogHit.imsi,
          imsi: catalogHit.imsi,
          badSessions: 8,
          issues: cell.issues.slice(0, Math.max(1, cell.issues.length)),
          kpiBand: cell.kpiBand,
          vip: catalogHit.vip,
        });
      }
    }

    // Demo subset: enough to scroll, capped so the panel stays usable
    const target = Math.min(Math.max(cell.badSubscriberCount, 4), 14);
    let n = 0;
    while (list.length < target) {
      const suffix = String(100000 + n * 137 + cell.id.charCodeAt(5)).slice(-6);
      const imsi = `310150${suffix}${String(n).padStart(3, '0')}`.slice(0, 15);
      if (list.some((item) => item.imsi === imsi)) {
        n += 1;
        continue;
      }
      const issues = ISSUE_POOL[n % ISSUE_POOL.length].filter((kind) =>
        cell.issues.includes(kind),
      );
      list.push({
        id: imsi,
        imsi,
        badSessions: Math.max(1, 12 - (n % 11)),
        issues: issues.length > 0 ? issues : [cell.issues[0]],
        kpiBand: KPI_POOL[n % KPI_POOL.length],
        vip: n === 2 || n === 7,
      });
      n += 1;
    }

    result[cell.id] = sortKeySubscribers(list);
  }

  return result;
}

/** Hardcoded subscribers per worst cell (demo drill-down). */
export const CELL_SUBSCRIBERS: Record<string, KeySubscriberItem[]> =
  buildCellSubscribers();

export function getCellSubscribers(cellId: string): KeySubscriberItem[] {
  return CELL_SUBSCRIBERS[cellId] ?? [];
}
