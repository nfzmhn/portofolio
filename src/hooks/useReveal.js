import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches an IntersectionObserver to multiple refs.
 * When an element approaches the viewport, adds visibleClass to it.
 *
 * @param {string}  visibleClass class to add when visible (default: 'is-visible')
 * @param {number}  threshold    0–1, portion of element that must be visible (default: 0.15)
 * @param {string}  rootMargin   expands the observation area so animations start a touch
 *                                earlier than the element entering the screen (default: '0px 0px -10% 0px')
 * @returns {Function} setRef    callback ref — use as <span ref={setRef(index)}>
 */
export function useReveal(
  visibleClass = 'is-visible',
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px'
) {
  const els = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    els.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [visibleClass, threshold, rootMargin]);

  const setRef = (i) => (el) => {
    els.current[i] = el;
  };

  return setRef;
}
