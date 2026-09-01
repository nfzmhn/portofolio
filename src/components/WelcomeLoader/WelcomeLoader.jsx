import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaCode, FaUser, FaGithub, FaGlobe } from 'react-icons/fa';
import DarkVeil from '../DarkVeil/DarkVeil';
import './WelcomeLoader.css';

const WelcomeLoader = () => {
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const name = 'nfzmhn';
    let i = 0;

    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;

        setTyped(name.slice(0, i));

        if (i >= name.length) {
          clearInterval(interval);

          // Tunggu sebentar setelah typing selesai
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      }, 120);
    }, 1800);

    return () => clearTimeout(delay);
  }, []);
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          aria-label="Loading"
          className="welcome-loader"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: 'blur(10px)',
            transition: { duration: 1.3, ease: 'easeInOut' },
          }}
        >
          <div className="welcome-loader__darkveil" aria-hidden="true">
            <DarkVeil
              speed={1.3}
              hueShift={20}
              warpAmount={0.6}
              noiseIntensity={0.1}
              scanlineFrequency={500}
              resolutionScale={1.0}
            />
          </div>
          <div className="welcome-loader__overlay" aria-hidden="true" />

          <div className="welcome-loader__icons">
            <span className="welcome-loader__icon">
              <FaCode />
            </span>
            <span className="welcome-loader__icon">
              <FaUser />
            </span>
            <span className="welcome-loader__icon">
              <FaGithub />
            </span>
          </div>

          <div className="welcome-loader__heading">
            <span className="welcome-loader__word">Welcome To My</span>
            <br />
            <span className="welcome-loader__word welcome-loader__word--gradient">
              Portfolio
            </span>
            <span className="welcome-loader__word welcome-loader__word--gradient">
              Website
            </span>
          </div>

          <motion.a
            href="https://github.com/nfzmhn"
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-loader__link"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <FaGlobe />
            <span className="welcome-loader__typed">
              {typed}
              <span className="welcome-loader__caret">|</span>
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeLoader;