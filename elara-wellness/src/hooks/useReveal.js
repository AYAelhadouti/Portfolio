import { useEffect, useRef } from 'react';

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const els = container.querySelectorAll('.rv');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => { el.classList.remove('in'); obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return ref;
}