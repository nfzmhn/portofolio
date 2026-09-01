import { useEffect, useRef } from 'react';
import DarkVeil from '../DarkVeil/DarkVeil';
import BorderGlow from '../BorderGlow/BorderGlow';
import './Process.css';

const STEPS = [
  {
    id: 1,
    title: 'Research & Strategy',
    description:
      'I begin every project with thorough user research and stakeholder interviews to understand the problem space and align on project goals.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Design & Prototype',
    description:
      'From wireframes to high-fidelity designs, I create interactive prototypes that bring ideas to life and enable early user testing.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2 2 0 012.828 2.828L11.828 13.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414L9 11z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Test & Refine',
    description:
      'Through continuous user testing, I iterate and refine designs until they deliver exceptional user experiences and measurable results.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const Process = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

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
    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="process" id="process">
      {/* DarkVeil background — scaleY(-1) flips vertically = rotate 180deg */}
      <div className="process__bg">
      <DarkVeil
        speed={1.3}
        hueShift={20}
        warpAmount={0.6}
        noiseIntensity={0.12}
        resolutionScale={1.0}
      />
      </div>
      {/* Dark overlay */}
      <div className="process__overlay" />

      <div className="process__inner">
        <h2 className="process__title process-anim" ref={titleRef}>
          My Process
        </h2>

        <div className="process__grid">
          {STEPS.map((step, i) => (
            /* Wrapper div gets the animation — avoids conflict with BorderGlow transform */
            <div
              key={step.id}
              className="process-card-wrap process-anim"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <BorderGlow
                className="process-card"
                backgroundColor="rgba(5, 5, 18, 0.9)"
                borderRadius={10}
                glowColor="220 80 70"
                glowRadius={0.5}
                glowIntensity={0.4}
                colors={['#3b82f6', '#6366f1', '#8b5cf6']}
                edgeSensitivity={10}
                animated
              >
                <div className="process-card__inner">
                  <div className="process-card__icon">{step.icon}</div>
                  <h3 className="process-card__title">{step.title}</h3>
                  <p className="process-card__desc">{step.description}</p>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
