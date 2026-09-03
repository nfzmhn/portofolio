import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 20;
        setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

        const sections = ['home', 'about', 'portfolio', 'process', 'contact'];
        const offset = 120;

        let currentSection = 'home';

        for (const id of sections) {
          const el = document.getElementById(id);

          if (el) {
            const sectionTop = el.getBoundingClientRect().top;

            if (sectionTop <= offset) {
              currentSection = id;
            }
          }
        }

        setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__logo">Zidni Nurfauzi Mahen</div>
        <ul className="navbar__links">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'portfolio', label: 'Portofolio' },
            { id: 'process', label: 'Process' },
            { id: 'contact', label: 'Contact' },
          ].map(({ id, label }) => (
            <li key={id}>
              <button
                className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;