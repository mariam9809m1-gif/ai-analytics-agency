import { useEffect, useRef, useState } from 'react';
import { BrainCircuit, BarChart3, Database, CheckCircle } from 'lucide-react';

function useIntersection(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">About Us</h2>
        <p className="text-center mt-4">Where Data Meets Intelligence</p>
      </div>
    </section>
  );
}
