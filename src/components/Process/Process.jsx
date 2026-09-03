import { useEffect, useRef, useState } from 'react';
import DarkVeil from '../DarkVeil/DarkVeil';
import BorderGlow from '../BorderGlow/BorderGlow';
import './Process.css';

const TYPING_LINES = [
  'const designSystem = {',
  '  colors: ["#6366f1", "#8b5cf6"],',
  '  spacing: [4, 8, 16, 24],',
  '  radius: "0.75rem",',
  '  typography: "Geist Sans",',
  '};',
];

function TypingAnimation({ started = true }) {
  const [displayLines, setDisplayLines] = useState([]);
  const [activeLine, setActiveLine] = useState('');
  const [lineNum, setLineNum] = useState(1);
  const [showCursor, setShowCursor] = useState(true);
  const timersRef = useRef([]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (!started) return;
    timersRef.current = [];
    let lineIdx = 0;

    function typeLine() {
      if (lineIdx >= TYPING_LINES.length) return;
      const target = TYPING_LINES[lineIdx];
      let charIdx = 0;

      function typeChar() {
        if (charIdx <= target.length) {
          setActiveLine(target.slice(0, charIdx));
          charIdx++;
          const t = setTimeout(typeChar, 25 + Math.random() * 30);
          timersRef.current.push(t);
        } else {
          const t1 = setTimeout(() => {
            setDisplayLines((prev) => [...prev, target]);
            setActiveLine('');
            setLineNum((n) => n + 1);
            lineIdx++;
            typeLine();
          }, 400);
          timersRef.current.push(t1);
        }
      }
      typeChar();
    }

    typeLine();

    return () => timersRef.current.forEach(clearTimeout);
  }, [started]);

  return (
    <div className="process-typing">
      {displayLines.map((text, i) => (
        <div key={i} className="process-typing__line">
          <span className="process-typing__line-num">{i + 1}</span>
          <span className="process-typing__line-content">
            {colorize(text)}
          </span>
        </div>
      ))}
      {activeLine || (displayLines.length < TYPING_LINES.length) ? (
        <div className="process-typing__line">
          <span className="process-typing__line-num">{lineNum}</span>
          <span className="process-typing__line-content">
            {colorize(activeLine)}
            <span className={`process-typing__cursor ${showCursor ? 'on' : ''}`}>|</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

function colorize(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  const keywordRe = /\b(const|let|var|return|function|=>)\b/;
  const stringRe = /("[^"]*"|'[^']*'|`[^`]*`)/;
  const numberRe = /\b(\d+(?:\.\d+)?)\b/;
  const bracketRe = /([{}[\]()])/;
  const colonRe = /(:)/;

  while (remaining.length > 0) {
    let earliest = null;
    let earliestIdx = remaining.length;
    let type = '';

    for (const [re, t] of [[keywordRe, 'kw'], [stringRe, 'str'], [numberRe, 'num'], [bracketRe, 'br'], [colonRe, 'punc']]) {
      re.lastIndex = 0;
      const m = re.exec(remaining);
      if (m && m.index < earliestIdx) {
        earliest = m;
        earliestIdx = m.index;
        type = t;
      }
    }

    if (!earliest) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (earliestIdx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, earliestIdx)}</span>);
    }
    parts.push(
      <span key={key++} className={`process-typing__${type}`}>
        {earliest[0]}
      </span>
    );
    remaining = remaining.slice(earliestIdx + earliest[0].length);
  }

  return parts;
}

function UsabilityChart() {
  const bars = [25, 20, 15, 10, 12, 8, 5, 3, 2, 1];
  return (
    <svg viewBox="0 0 300 90" className="process-chart-svg">
      <defs>
        <pattern id="dots-bg" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-bg)" />
      {bars.map((y, i) => (
        <rect key={i} x={20 + i * 20} y={y} width="3" height={70 - y} fill="#10B981" />
      ))}
      <polyline
        points={bars.map((y, i) => `${22 + i * 20},${y + 35}`).join(' ')}
        fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

function ABTestChart() {
  const bars = [37, 35, 36, 34, 32, 30, 27, 25, 24];
  return (
    <svg viewBox="0 0 180 70" className="process-chart-svg">
      {bars.map((y, i) => (
        <rect key={i} x={10 + i * 15} y={y} width="2" height={60 - y} fill="#10B981" />
      ))}
      <polyline
        points={bars.map((y, i) => `${11 + i * 15},${y + 1}`).join(' ')}
        fill="none" stroke="#10B981" strokeWidth="1" strokeLinecap="round"
      />
    </svg>
  );
}

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

const CARDS = [
  {
    title: 'Research & Strategy',
    description: (
      <>I begin every project with thorough <strong>user research</strong> and stakeholder interviews to
        understand the problem space and align on project goals.</>
    ),
    timeline: 'Week 1-2',
  },
  {
    title: 'Design & Prototype',
    description: (
      <>From wireframes to high-fidelity designs, I create <strong>interactive prototypes</strong> that
        bring ideas to life and enable early user testing.</>
    ),
    timeline: 'Week 3-5',
  },
  {
    title: 'Test & Refine',
    description: (
      <>Through continuous <strong>user testing</strong> and data analysis, I iterate and refine
        designs until they deliver exceptional user experiences and measurable results.</>
    ),
    timeline: 'Week 6-8',
  },
];

const Process = () => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('process-anim--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    const section = sectionRef.current;
    if (section) {
      section.querySelectorAll('.process-card').forEach((el) => observer.observe(el));
    }

    const fallback = setTimeout(() => {
      const sec = sectionRef.current;
      if (!sec) return;
      sec.querySelectorAll('.process-anim').forEach((el) => el.classList.add('process-anim--visible'));
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const typingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTypingStarted(true);
            typingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );
    typingObserver.observe(target);
    return () => typingObserver.disconnect();
  }, []);

  const glowProps = {
    backgroundColor: '#0d0d1a',
    borderRadius: 12,
    glowColor: '220 80 70',
    glowRadius: 35,
    glowIntensity: 1.2,
    colors: ['#3b82f6', '#6366f1', '#8b5cf6'],
    edgeSensitivity: 25,
  };

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__bg">
        <DarkVeil speed={1.3} hueShift={20} warpAmount={0.6}
          noiseIntensity={0.12} resolutionScale={1.0} />
      </div>
      <div className="process__overlay" />

      <div className="process__inner">
        <div className="process__heading-wrap process-anim" ref={titleRef}>
          <div className="process__heading-sheen" aria-hidden="true" />
          <h2 className="process__title">
            My <span className="process__title-accent">Process</span>
          </h2>
        </div>

        <div className="process__grid">
          {/* Card 1: Research & Strategy */}
          <BorderGlow
            className="process-card process-anim"
            backgroundColor={glowProps.backgroundColor}
            borderRadius={glowProps.borderRadius}
            glowColor={glowProps.glowColor}
            glowRadius={glowProps.glowRadius}
            glowIntensity={glowProps.glowIntensity}
            colors={glowProps.colors}
            edgeSensitivity={glowProps.edgeSensitivity}
          >
            <div>
              <div className="process-card__visual">
                <div className="process-card__browser">
                <div className="process-card__browser-frame">
                  <div className="process-card__inset-glow" aria-hidden="true" />
                  <div className="process-card__dotted-grid">
                    <div className="process-win process-win--left">
                      <div className="process-win__bar"><div className="process-win__label" style={{ width: 32 }} /></div>
                      <div className="process-win__body">
                        <div className="process-win__placeholder">User Journey</div>
                      </div>
                    </div>
                    <div className="process-win process-win--right">
                      <div className="process-win__bar"><div className="process-win__label" style={{ width: 40 }} /></div>
                      <div className="process-win__body">
                        <div className="process-win__circle">Personas</div>
                      </div>
                    </div>
                    <div className="process-win process-win--center">
                      <div className="process-win__bar process-win__bar--indigo">
                        <div className="process-win__label process-win__label--indigo" style={{ width: 64 }} />
                        <div className="process-win__label process-win__label--indigo" style={{ width: 32 }} />
                      </div>
                      <div className="process-win__body process-win__body--center">
                        <div className="process-win__line" style={{ width: '50%', opacity: 0.6 }} />
                        <div className="process-win__line" style={{ width: '66%', opacity: 0.3 }} />
                        <div className="process-win__line" style={{ width: '33%', opacity: 0.2 }} />
                      </div>
                    </div>
                    <div className="process-card__vignette" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
            <div className="process-card__meta">
              <div className="process-card__meta-row">
                <span className="process-card__phase">Research &amp; Strategy</span>
                <span className="process-card__dot">·</span>
                <span className="process-card__timeline"><ClockIcon /> Week 1-2</span>
              </div>
            </div>
            <div className="process-card__text">
              <h3 className="process-card__text-title">{CARDS[0].title}</h3>
              <p className="process-card__text-desc">{CARDS[0].description}</p>
            </div>
            </div>
          </BorderGlow>

          {/* Card 2: Design & Prototype */}
          <BorderGlow
            className="process-card process-anim"
            backgroundColor={glowProps.backgroundColor}
            borderRadius={glowProps.borderRadius}
            glowColor={glowProps.glowColor}
            glowRadius={glowProps.glowRadius}
            glowIntensity={glowProps.glowIntensity}
            colors={glowProps.colors}
            edgeSensitivity={glowProps.edgeSensitivity}
          >
            <div>
              <div className="process-card__visual">
                <div className="process-editor">
                  <div className="process-editor__bar">
                    <span className="process-editor__dot process-editor__dot--red" />
                    <span className="process-editor__dot process-editor__dot--yellow" />
                    <span className="process-editor__dot process-editor__dot--green" />
                  </div>
                  <TypingAnimation started={typingStarted} />
                </div>
              </div>
              <div className="process-card__text">
                <h3 className="process-card__text-title">{CARDS[1].title}</h3>
                <p className="process-card__text-desc">{CARDS[1].description}</p>
              </div>
            </div>
          </BorderGlow>

          {/* Card 3: Test & Refine */}
          <BorderGlow
            className="process-card process-anim"
            backgroundColor={glowProps.backgroundColor}
            borderRadius={glowProps.borderRadius}
            glowColor={glowProps.glowColor}
            glowRadius={glowProps.glowRadius}
            glowIntensity={glowProps.glowIntensity}
            colors={glowProps.colors}
            edgeSensitivity={glowProps.edgeSensitivity}
          >
            <div>
              <div className="process-card__visual">
                <div className="process-dashboard">
                  <div className="process-panel process-panel--usability">
                    <div className="process-panel__header">
                      <span className="process-panel__label">USABILITY</span>
                      <span className="process-panel__badge">+94%</span>
                    </div>
                    <div className="process-panel__chart"><UsabilityChart /></div>
                  </div>
                  <div className="process-panel process-panel--metrics">
                    <div className="process-panel__header">
                      <span className="process-panel__label">METRICS</span>
                    </div>
                    <div className="process-panel__rows">
                      <div className="process-panel__row">
                        <span>Task Success</span><span className="process-panel__val">94%</span>
                      </div>
                      <div className="process-panel__row">
                        <span>Time to Complete</span><span className="process-panel__val">-40%</span>
                      </div>
                      <div className="process-panel__row">
                        <span>User Satisfaction</span><span className="process-panel__val">4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="process-panel process-panel--ab">
                    <div className="process-panel__header">
                      <span className="process-panel__label">A/B TEST</span>
                    </div>
                    <div className="process-panel__chart"><ABTestChart /></div>
                  </div>
                </div>
              </div>
              <div className="process-card__text">
                <h3 className="process-card__text-title">{CARDS[2].title}</h3>
                <p className="process-card__text-desc">{CARDS[2].description}</p>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
};

export default Process;
