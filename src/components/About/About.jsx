import { useRef, useEffect } from 'react';
import fotoProfil from '../../assets/foto-profil.png';
import cv from '../../assets/CV_ATS_ZIDNI_NURFAUZI_MAHEN.pdf';
import './About.css';
import { FaDownload } from 'react-icons/fa';

const About = () => {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (i) => (el) => { refs.current[i] = el; };

  return (
    <section id="about" className="about">
      <div className="about__inner">
        {/* Section label */}
        <div className="about__section-label fade-up" ref={ref(0)}>About Me</div>

        <div className="about__grid">
          {/* Photo slides from left */}
          <div className="about__photo-wrap fade-left" ref={ref(1)}>
            <img src={fotoProfil} alt="Zidni Nurfauzi Mahen" className="about__photo" />
          </div>

          {/* Content slides from right, slight delay */}
          <div className="about__content fade-right delay-2" ref={ref(2)}>
            <h2 className="about__heading">
              Crafting Visual Stories
              <br />
              &amp; Building Software
            </h2>
            <p className="about__text">
              Hi, I'm <strong>Zidni Nurfauzi Mahen</strong>, an Information Technology
              graduate with a passion for software development, machine learning, and
              creative design. I enjoy turning ideas into functional and meaningful digital
              experiences, from developing applications and exploring intelligent systems to
              creating engaging visual designs.
            </p>
            <p className="about__text">
              With experience in web development, UI/UX Design, machine learning, and graphic
              design, I'm always exploring new technologies and challenging myself to turn
              ideas into impactful projects.
            </p>

            <div className="about__buttons">
              <a href={cv} className="btn btn--primary" download="CV_ATS_ZIDNI_NURFAUZI_MAHEN.pdf">
                <FaDownload />
                Download CV
              </a>
              <button
                className="btn btn--outline"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
