import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Process from './components/Process/Process';
import Contact from './components/Contact/Contact';
import WelcomeLoader from './components/WelcomeLoader/WelcomeLoader';
import './App.css';

function App() {
  // Scroll reveal using IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-group');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <WelcomeLoader />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Process />
      <Contact />
      <div className="scroll-blur" />
    </div>
  );
}

export default App;
