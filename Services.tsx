import { useEffect, useRef, useState } from 'react';
import { BrainCircuit, BarChart3, Database, Bot, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning Solutions',
    description: 'Custom ML models — from demand forecasting and churn prediction to NLP pipelines and computer vision — built, validated, and deployed into your production environment.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    iconBg: 'bg-cyan-500/10 border-cyan-500/30',
    features: [
      'Predictive & classification models (XGBoost, BERT, LSTMs)',
      'LLM integration and RAG pipeline development',
      'Model explainability with SHAP / LIME',
      'MLOps: monitoring, retraining, and drift detection',
    ],
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence & Dashboards',
    description: 'Executive-grade Power BI, Tableau, and Looker dashboards that consolidate your data into clear, real-time insights — with automated delivery to your leadership team.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    features: [
      'Power BI & Tableau report development',
      'Advanced DAX, LOD, and calculated measures',
      'Row-level security and workspace governance',
      'Automated report delivery and scheduling',
    ],
  },
  {
    icon: Database,
    title: 'Data Engineering & ETL Pipelines',
    description: 'Robust, scalable data pipelines that extract, transform, and load your data reliably — so your reports and models always run on clean, fresh, trustworthy data.',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    iconBg: 'bg-blue-500/10 border-blue-500/30',
    features: [
      'ETL / ELT pipeline design and build',
      'Data warehouse and star-schema modeling',
      'dbt transformations and documentation',
      'Azure Data Factory, Airflow, and Supabase',
    ],
  },
  {
    icon: Bot,
    title: 'AI Strategy & Analytics Consulting',
    description: 'Not sure where to start? We help leadership teams identify high-ROI AI and analytics opportunities, define data strategy, and build a roadmap that gets results fast.',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    iconBg: 'bg-amber-500/10 border-amber-500/30',
    features: [
      'AI & data maturity assessments',
      'KPI framework and metrics design',
      'Use-case prioritization and ROI modeling',
      'Team upskilling and handover documentation',
    ],
  },
];

function useIntersection(ref: React.RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef);

  return (
    <section id="services" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">Services</span>
          <h2 className="section-heading mt-4 mb-4">
            What We Can{' '}
            <span className="text-gradient-cyan">Do For You</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            End-to-end AI and data services tailored to businesses ready to make smarter, faster, data-driven decisions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, description, color, borderColor, bgColor, iconBg, features }, i) => (
            <div
              key={title}
              className={`rounded-2xl border ${borderColor} ${bgColor} p-7 card-glow-hover transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl border ${iconBg} mb-5`}>
                <Icon size={22} className={color} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-opacity-100 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {description}
              </p>

              <ul className="space-y-2 mb-5">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className={`${color} shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`flex items-center gap-1.5 text-sm font-medium ${color} opacity-70 group-hover:opacity-100 transition-all duration-200`}
              >
                Get in touch
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700 p-8 text-center transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Have a unique challenge?</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm">
            Every business is different. Tell us about your data challenge and we'll design a solution that delivers measurable results.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Start a Conversation
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
