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
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">About Us</span>
          <h2 className="section-heading mt-4 mb-4">
            Where Data Meets{' '}
            <span className="text-gradient-cyan">Intelligence</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            We are a boutique AI & Data Analytics agency transforming complex data into
            clear strategy, automated insights, and intelligent products.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio card */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 card-glow h-full">
              <h3 className="text-xl font-semibold text-white mb-4">Our Story</h3>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Founded by Mariam Mamdouh, the agency was born from a conviction that
                  most businesses are sitting on untapped gold — their data. Mariam
                  combined her background in applied mathematics and software engineering
                  to bridge the gap between raw numbers and real decisions.
                </p>
                <p>
                  Today the agency operates as a full-service data partner: we design
                  ETL pipelines, build predictive ML models, create executive-grade BI
                  dashboards, and integrate AI directly into client workflows — all under
                  one roof.
                </p>
                <p>
                  We partner with startups, scale-ups, and enterprise teams who are
                  serious about becoming data-driven. No fluff. Just measurable outcomes.
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-3">
                {highlights.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skill Categories */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {skillCategories.map(({ icon: Icon, label, color, borderColor, bgColor, skills }) => (
              <div
                key={label}
                className={`rounded-xl border ${borderColor} ${bgColor} p-6 transition-all duration-200 card-glow-hover`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-slate-900 border ${borderColor}`}>
                    <Icon size={18} className={color} />
                  </div>
                  <h3 className={`font-semibold text-sm ${color}`}>{label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
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
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">About Us</span>
          <h2 className="section-heading mt-4 mb-4">
            Where Data Meets{' '}
            <span className="text-gradient-cyan">Intelligence</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            We are a boutique AI & Data Analytics agency transforming complex data into
            clear strategy, automated insights, and intelligent products.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio card */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 card-glow h-full">
              <h3 className="text-xl font-semibold text-white mb-4">Our Story</h3>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Founded by Mariam Mamdouh, the agency was born from a conviction that
                  most businesses are sitting on untapped gold — their data. Mariam
                  combined her background in applied mathematics and software engineering
                  to bridge the gap between raw numbers and real decisions.
                </p>
                <p>
                  Today the agency operates as a full-service data partner: we design
                  ETL pipelines, build predictive ML models, create executive-grade BI
                  dashboards, and integrate AI directly into client workflows — all under
                  one roof.
                </p>
                <p>
                  We partner with startups, scale-ups, and enterprise teams who are
                  serious about becoming data-driven. No fluff. Just measurable outcomes.
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-3">
                {highlights.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skill Categories */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {skillCategories.map(({ icon: Icon, label, color, borderColor, bgColor, skills }) => (
              <div
                key={label}
                className={`rounded-xl border ${borderColor} ${bgColor} p-6 transition-all duration-200 card-glow-hover`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-slate-900 border ${borderColor}`}>
                    <Icon size={18} className={color} />
                  </div>
                  <h3 className={`font-semibold text-sm ${color}`}>{label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

