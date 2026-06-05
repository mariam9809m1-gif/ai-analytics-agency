import { useEffect, useRef, useState } from 'react';
import { BrainCircuit, BarChart3, Database, CheckCircle } from 'lucide-react';

const skillCategories = [
  {
    icon: BrainCircuit,
    label: 'AI & Machine Learning',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    skills: ['Python', 'scikit-learn', 'TensorFlow', 'NLP', 'LLM Integration', 'Model Deployment'],
  },
  {
    icon: BarChart3,
    label: 'Data Analytics & BI',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    skills: ['Power BI', 'Tableau', 'Looker', 'DAX', 'Advanced Excel', 'Google Data Studio'],
  },
  {
    icon: Database,
    label: 'Data Engineering',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    skills: ['SQL / PostgreSQL', 'ETL Pipelines', 'Pandas / NumPy', 'Azure', 'Supabase', 'dbt'],
  },
];

const highlights = [
  '4+ years delivering AI & analytics solutions across industries',
  'Served 40+ clients in finance, healthcare, retail, and logistics',
  'Reduced reporting time by up to 80% through automation',
  'Built ML models generating measurable ROI for every client',
];

function useIntersection(ref: React.RefObject<Element | null>) {
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
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag mb-4">About Us</span>
          <h2 className="section-heading mt-4 mb-4">Where Data Meets <span className="text-gradient-cyan">Intelligence</span></h2>
        </div>
      </div>
    </section>
  );
}
