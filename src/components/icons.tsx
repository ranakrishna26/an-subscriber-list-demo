import type { JSX, SVGProps } from 'react';
import type { IssueKind } from '../demoData';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 18, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    ...rest,
  };
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function CellIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 22V10" />
      <path d="M12 10 7 5" />
      <path d="M12 10l5-5" />
      <path d="M5 22h14" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

export function ConnectivityIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function ReliabilityIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

export function SignalIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 20V4" />
    </svg>
  );
}

export function ThroughputIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M7 3v18" />
      <path d="m3 7 4-4 4 4" />
      <path d="M17 21V3" />
      <path d="m13 17 4 4 4-4" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const ISSUE_ICONS: Record<IssueKind, (props: IconProps) => JSX.Element> = {
  connectivity: ConnectivityIcon,
  reliability: ReliabilityIcon,
  signal: SignalIcon,
  throughput: ThroughputIcon,
};

export function IssueIcon({
  kind,
  ...props
}: IconProps & { kind: IssueKind }) {
  const Icon = ISSUE_ICONS[kind];
  return <Icon {...props} />;
}

export const IMPACT_OPTIONS: {
  value: 'all' | IssueKind;
  label: string;
}[] = [
  { value: 'all', label: 'All impact types' },
  { value: 'connectivity', label: 'Connectivity' },
  { value: 'reliability', label: 'Reliability' },
  { value: 'signal', label: 'Signal' },
  { value: 'throughput', label: 'Throughput' },
];
