import { useEffect, useMemo, useRef, useState } from 'react';
import { SubscriberListDemo } from './SubscriberListDemo';
import './styles/listPanel.css';

type Theme = 'connect-light' | 'connect-dark';

const PANEL_WIDTH = 518;
const PANEL_HEIGHT = 760;
const PANEL_PAD = 24;

function readQuery() {
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get('theme');
  const theme: Theme =
    themeParam === 'dark' ? 'connect-dark' : 'connect-light';
  const embed =
    params.get('embed') === '1' ||
    params.get('embed') === 'true' ||
    window.self !== window.top;
  return { theme, embed };
}

export default function App() {
  const initial = useMemo(() => readQuery(), []);
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const embed = initial.embed;
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    document.body.className = theme;
    document.documentElement.dataset.embed = embed ? 'true' : 'false';
  }, [theme, embed]);

  useEffect(() => {
    if (!embed) return;
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const next = Math.min(
        1,
        (width - PANEL_PAD * 2) / PANEL_WIDTH,
        (height - PANEL_PAD * 2) / PANEL_HEIGHT,
      );
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [embed]);

  return (
    <div
      ref={shellRef}
      className={`app-shell${embed ? ' app-shell--embed' : ''}`}
    >
      {!embed && (
        <button
          type="button"
          className="app-shell__theme-toggle"
          onClick={() =>
            setTheme((current) =>
              current === 'connect-light' ? 'connect-dark' : 'connect-light',
            )
          }
        >
          {theme === 'connect-light' ? 'Dark theme' : 'Light theme'}
        </button>
      )}
      <div
        className="app-shell__stage"
        style={
          embed
            ? {
                width: PANEL_WIDTH * scale,
                height: PANEL_HEIGHT * scale,
              }
            : undefined
        }
      >
        <div
          className="app-shell__scaler"
          style={
            embed
              ? {
                  width: PANEL_WIDTH,
                  height: PANEL_HEIGHT,
                  transform: `scale(${scale})`,
                }
              : undefined
          }
        >
          <SubscriberListDemo />
        </div>
      </div>
    </div>
  );
}
