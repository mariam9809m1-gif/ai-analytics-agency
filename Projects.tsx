import { useState, useRef, useEffect } from 'react';
import { X, ExternalLink, TrendingUp, Users, Zap, Clock } from 'lucide-react';

type Category = 'All' | 'AI & ML' | 'Data Analytics';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'AI & ML' | 'Data Analytics';
  image: string;
  tags: string[];
  detail: {
    overview: string;
    features: string[];
    metrics: { label: string; value: string; icon: React.ElementType }[];
    challenges: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'RetailIQ — Demand Forecasting Engine',
    description: 'Machine learning pipeline predicting weekly product demand across 500+ SKUs for a regional retail chain, reducing overstock by 34%.',
    category: 'AI & ML',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'Prophet', 'scikit-learn', 'SQL', 'Azure'],
    detail: {
      overview: 'RetailIQ is an end-to-end ML forecasting system that ingests POS data, external demand signals, and calendar events to produce SKU-level weekly forecasts with automated reorder recommendations delivered to buyers each Monday.',
      features: [
        'Ensemble model combining Prophet + XGBoost for MAPE < 7%',
        'Automated feature engineering from 3 years of historical data',
        'Azure-hosted retraining pipeline with drift detection',
        'Buyer-facing forecast dashboard with confidence intervals',
        'Slack alerting for anomaly detection on high-velocity SKUs',
      ],
      metrics: [
        { label: 'Forecast Accuracy', value: '93%', icon: TrendingUp },
        { label: 'SKUs Covered', value: '500+', icon: Zap },
        { label: 'Overstock Reduction', value: '34%', icon: Clock },
        { label: 'Cost Savings/yr', value: '$210K', icon: Users },
      ],
      challenges: 'Handling extreme seasonality and COVID-era demand shocks required training a hybrid ensemble: Prophet handled trend/seasonality while XGBoost captured promotional lift signals missed by time-series alone.',
    },
  },
  {
    id: 2,
    title: 'FinSight — Executive Analytics Suite',
    description: 'Real-time Power BI platform consolidating P&L, cash flow, and KPI data for a multi-entity financial services firm.',
    category: 'Data Analytics',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Power BI', 'DAX', 'SQL', 'Python', 'Azure Data Factory'],
    detail: {
      overview: 'FinSight replaced 14 disparate Excel reports with a unified Power BI suite covering consolidated P&L, budget vs actuals, cash flow, and entity-level KPI scorecards — refreshed every 15 minutes from the ERP system.',
      features: [
        'Unified semantic model covering 8 legal entities',
        'Custom DAX measures for EBITDA, burn rate, runway, and LTV',
        'Row-level security by business unit and region',
        'Scheduled PDF executive digest via Power Automate',
        'Drill-through from group summary to individual transaction',
      ],
      metrics: [
        { label: 'Reports Consolidated', value: '14 → 1', icon: TrendingUp },
        { label: 'Data Freshness', value: '15 min', icon: Clock },
        { label: 'Reporting Time Saved', value: '80%', icon: Zap },
        { label: 'Leadership Users', value: '30+', icon: Users },
      ],
      challenges: 'Calculating intercompany eliminations dynamically in DAX across 8 entities required building a bridging dimension table with a star-schema overhaul, enabling accurate consolidated P&L without manual adjustments.',
    },
  },
  {
    id: 3,
    title: 'MediPredict — Patient Readmission Model',
    description: 'Supervised ML classifier predicting 30-day hospital readmission risk, enabling early intervention for high-risk patients.',
    category: 'AI & ML',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'XGBoost', 'SHAP', 'PostgreSQL', 'Pandas'],
    detail: {
      overview: 'MediPredict is a clinical risk stratification tool deployed within a regional hospital system. It scores newly discharged patients on 30-day readmission risk, surfaces the top risk drivers via SHAP explainability, and flags cases for care coordination follow-up.',
      features: [
        'XGBoost classifier achieving AUC-ROC of 0.88 on held-out test set',
        'SHAP explainability layer surfacing top 5 risk drivers per patient',
        'HIPAA-compliant PHI de-identification in preprocessing pipeline',
        'Integration with EHR system via REST API',
        'Weekly model retraining with automated performance monitoring',
      ],
      metrics: [
        { label: 'AUC-ROC', value: '0.88', icon: TrendingUp },
        { label: 'Readmissions Cut', value: '18%', icon: Users },
        { label: 'Early Flags', value: '48h prior', icon: Clock },
        { label: 'Patients/Month', value: '2,400', icon: Zap },
      ],
      challenges: 'Handling severe class imbalance (5:1 non-readmit:readmit) required SMOTE oversampling plus calibrated probability outputs to ensure clinically meaningful risk scores, not just binary predictions.',
    },
  },
  {
    id: 4,
    title: 'SupplyLens — Supply Chain Intelligence',
    description: 'End-to-end Tableau analytics platform tracking supplier performance, lead times, and stockout risk across a global supply chain.',
    category: 'Data Analytics',
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Tableau', 'SQL', 'Python', 'NumPy', 'PostgreSQL'],
    detail: {
      overview: 'SupplyLens provides procurement teams with a live view of the supply chain: supplier scorecards, lead time variability, PO fulfillment rates, and a stockout probability heat map — all updated nightly from ERP and logistics APIs.',
      features: [
        'Supplier scorecard with 12 KPI dimensions',
        'Stockout probability heat map by SKU and warehouse',
        'Lead time variability trend with SLA breach alerts',
        'Automated nightly ETL from SAP and 3PL APIs',
        'Executive summary email auto-generated on Mondays',
      ],
      metrics: [
        { label: 'Suppliers Tracked', value: '320+', icon: Users },
        { label: 'SLA Breach Rate', value: '-28%', icon: TrendingUp },
        { label: 'PO Visibility', value: '100%', icon: Zap },
        { label: 'ETL Runtime', value: '< 6 min', icon: Clock },
      ],
      challenges: 'Normalizing PO data from SAP, Oracle, and two 3PL APIs into a single semantic layer required a custom Python reconciliation engine with fuzzy supplier name matching, achieving 99.4% entity resolution accuracy.',
    },
  },
  {
    id: 5,
    title: 'TalentScope — HR People Analytics',
    description: 'Attrition prediction model and Power BI people analytics dashboard helping HR teams identify flight risk employees 60 days early.',
    category: 'AI & ML',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'Logistic Regression', 'Power BI', 'SQL', 'DAX'],
    detail: {
      overview: 'TalentScope combines a logistic regression attrition model with a Power BI people analytics suite to give HR business partners early visibility into attrition risk, enabling proactive retention conversations before employees hand in notice.',
      features: [
        'Attrition model with 76% precision at 60-day horizon',
        'SHAP-based risk factor explanation per employee',
        'Power BI HRBP dashboard with drill-through to team level',
        'Engagement score trend tracking and correlation analysis',
        'Privacy-preserving design with anonymized manager views',
      ],
      metrics: [
        { label: 'Prediction Horizon', value: '60 days', icon: Clock },
        { label: 'Model Precision', value: '76%', icon: TrendingUp },
        { label: 'Retention Improvement', value: '22%', icon: Users },
        { label: 'Cost Saved/yr', value: '$340K', icon: Zap },
      ],
      challenges: 'Balancing predictive accuracy with employee privacy required aggregating risk signals at team-manager level in dashboards, while keeping individual scores accessible only to senior HR leadership with audit logging.',
    },
  },
  {
    id: 6,
    title: 'CXMetrics — Customer Experience Analytics',
    description: 'NLP-powered sentiment analysis pipeline processing 50K+ monthly support tickets to surface product quality signals and CX trends.',
    category: 'AI & ML',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'NLP', 'BERT', 'Tableau', 'PostgreSQL'],
    detail: {
      overview: 'CXMetrics processes inbound support tickets and customer survey responses through a fine-tuned BERT sentiment and topic classification model, then visualizes the output in a Tableau dashboard tracking issue trends, CSAT drivers, and escalation patterns by product line.',
      features: [
        'Fine-tuned BERT model for 12-category ticket classification (F1: 0.91)',
        'Sentiment trending with week-over-week change alerts',
        'Topic clustering using BERTopic for emerging issue detection',
        'Tableau dashboard with CSAT correlation and drill-through',
        'Slack integration for real-time critical sentiment alerts',
      ],
      metrics: [
        { label: 'Tickets/Month', value: '50K+', icon: Zap },
        { label: 'Classification F1', value: '0.91', icon: TrendingUp },
        { label: 'CSAT Improvement', value: '+14pts', icon: Users },
        { label: 'Issue Detection', value: '5 days early', icon: Clock },
      ],
      challenges: 'Domain-adapting BERT to the client\'s proprietary product vocabulary required a two-stage fine-tuning approach: first on a general customer support corpus, then on 8K labeled in-house tickets, boosting F1 by 11 points over the zero-shot baseline.',
    },
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/50">
        {/* Image */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-600 text-slate-300 text-xs font-code">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-slate-300 leading-relaxed text-sm">{project.detail.overview}</p>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.detail.metrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl bg-slate-800/60 border border-slate-700 p-3 text-center">
                  <Icon size={16} className="text-emerald-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-xs text-slate-500 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">What We Built</h3>
            <ul className="space-y-2">
              {project.detail.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 mt-1">▸</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">Challenge Solved</h3>
            <p className="text-slate-400 text-sm leading-relaxed bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              {project.detail.challenges}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="btn-primary flex-1 justify-center"
            >
              <ExternalLink size={15} />
              Discuss This Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function Projects() {
  const [filter, setFilter] = useState<Category>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">Case Studies</span>
          <h2 className="section-heading mt-4 mb-4">
            Projects We've{' '}
            <span className="text-gradient-cyan">Delivered</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Real client projects. Real outcomes. Click any card for the full breakdown.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {(['All', 'AI & ML', 'Data Analytics'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className={`text-left rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden group card-glow card-glow-hover transition-all duration-500 hover:-translate-y-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${
                  project.category === 'AI & ML'
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                }`}>
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-white text-sm mb-2 leading-tight group-hover:text-cyan-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-xs font-code">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 text-xs">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-cyan-500 transition-colors duration-200 font-medium">
                  View case study
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
