import { useEffect, useMemo, useRef, useState } from 'react';
import { SubscriberListDemo } from './SubscriberListDemo';
import './styles/listPanel.css';

type Theme = 'connect-light' | 'connect-dark';

/** Framer embed design frame (fixed aspect). */
export const FRAME_WIDTH = 1106;
export const FRAME_HEIGHT = 718.5;

const PANEL_WIDTH = 518;
const PANEL_HEIGHT = 760;
const PANEL_PAD = 32;

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
  const [frameScale, setFrameScale] = useState(1);

  // Panel scaled to fit inside the design frame, then frame scales to iframe
  const panelScale = Math.min(
    1,
    (FRAME_WIDTH - PANEL_PAD * 2) / PANEL_WIDTH,
    (FRAME_HEIGHT - PANEL_PAD * 2) / PANEL_HEIGHT,
  );

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
      const next = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);
      setFrameScale(Number.isFinite(next) && next > 0 ? next : 1);
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

      {embed ? (
        <div
          className="app-shell__frame"
          style={{
            width: FRAME_WIDTH * frameScale,
            height: FRAME_HEIGHT * frameScale,
          }}
        >
          <div
            className="app-shell__frame-inner"
            style={{
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              transform: `scale(${frameScale})`,
            }}
          >
            <div className="app-shell__frame-content">
              <div
                className="app-shell__stage"
                style={{
                  width: PANEL_WIDTH * panelScale,
                  height: PANEL_HEIGHT * panelScale,
                }}
              >
                <div
                  className="app-shell__scaler"
                  style={{
                    width: PANEL_WIDTH,
                    height: PANEL_HEIGHT,
                    transform: `scale(${panelScale})`,
                  }}
                >
                  <SubscriberListDemo />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SubscriberListDemo />
      )}
    </div>
  );
}
