import { useEffect, useRef, useState } from 'react';
import GradientBlinds from '../GradientBlinds/GradientBlinds';
import TextType from '../TextType/TextType';
import './Hero.css';

const Hero = () => {
  const sectionRef = useRef(null);
  const [gradientPaused, setGradientPaused] = useState(true);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setGradientPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* GradientBlinds — fades in on load */}
      <div className="hero__gradient-bg hero-anim-bg">
        <GradientBlinds
          gradientColors={['#000000', '#000814', '#0a1aff', '#1a5aff', '#5D75E7', '#4a7fff']}
          angle={40}
          noise={0.08}
          blindCount={20}
          blindMinWidth={50}
          spotlightRadius={0.45}
          spotlightSoftness={0.7}
          spotlightOpacity={1}
          mouseDampening={0.2}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="soft-light"
          paused={gradientPaused}
        />
      </div>

      <div className="hero__content">
        {/* Title — slides up with delay */}
        <h1 className="hero__title hero-anim-title">
          <span className="hero__title-line">Web</span>
          <span className="hero__title-gradient">Developer</span>
        </h1>

        {/* TextType subtitle */}
        <p className="hero__subtitle hero-anim-sub">
          <TextType
            text={['UI UX Design', 'JavaScript Artisan', 'AI Enthusiast', 'Design Graphic']}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1800}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            className="hero__text-type"
          />
        </p>

        {/* Description */}
        <p className="hero__description hero-anim-desc">
          Creating Innovative, Functional, and User-Friendly Websites
          <br />
          for Digital Solutions.
        </p>
      </div>
    </section>
  );
};

export default Hero;
