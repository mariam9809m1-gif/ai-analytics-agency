import { useState, useRef, useEffect, FormEvent } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Service is required.';
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }
  return errors;
}

function Toast({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-slate-800 border border-emerald-500/40 rounded-xl px-5 py-4 shadow-2xl shadow-black/40 max-w-sm animate-slide-up">
      <CheckCircle size={20} className="text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Message received!</p>
        <p className="text-xs text-slate-400 mt-0.5">We'll get back to you within 24 hours.</p>
      </div>
      <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
        <X size={16} />
      </button>
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

const subjects = [
  'AI & Machine Learning Project',
  'Business Intelligence Dashboard',
  'Data Engineering & ETL',
  'Analytics Consulting',
  'Other',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useIntersection(sectionRef);

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const e = validate({ ...form, [field]: value });
      setErrors(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const touch = (field: keyof FormState) => {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validate(form);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      setShowToast(true);
    }, 1400);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">Contact</span>
          <h2 className="section-heading mt-4 mb-4">
            Let's Turn Your Data Into{' '}
            <span className="text-gradient-cyan">Results</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Tell us about your challenge. We'll respond within 24 hours with a clear plan forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info sidebar */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {[
              { icon: Mail, label: 'Email', value: 'mariam@example.ai', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
              { icon: MapPin, label: 'Location', value: 'Remote — Worldwide', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
              { icon: Clock, label: 'Response Time', value: 'Within 24 hours', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                <div className={`p-2.5 rounded-lg border ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-sm text-slate-200 font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <p className="text-sm text-slate-400 leading-relaxed">
                We currently have capacity for new projects in{' '}
                <span className="text-cyan-400 font-medium">AI & machine learning</span>{' '}
                and{' '}
                <span className="text-emerald-400 font-medium">data analytics</span>.
                Short-term engagements and long-term partnerships welcome.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`lg:col-span-3 rounded-2xl bg-slate-900/60 border border-slate-800 p-7 card-glow transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Full Name <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  onBlur={() => touch('name')}
                  placeholder="Jane Smith"
                  className={`w-full bg-slate-800/60 border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 ${
                    errors.name ? 'border-red-500/60' : 'border-slate-700 hover:border-slate-600'
                  }`}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Email Address <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  onBlur={() => touch('email')}
                  placeholder="jane@company.com"
                  className={`w-full bg-slate-800/60 border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 ${
                    errors.email ? 'border-red-500/60' : 'border-slate-700 hover:border-slate-600'
                  }`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Service Needed <span className="text-cyan-500">*</span>
              </label>
              <select
                value={form.subject}
                onChange={e => update('subject', e.target.value)}
                onBlur={() => touch('subject')}
                className={`w-full bg-slate-800/60 border rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 ${
                  form.subject ? 'text-slate-200' : 'text-slate-600'
                } ${errors.subject ? 'border-red-500/60' : 'border-slate-700 hover:border-slate-600'}`}
              >
                <option value="" disabled>Select a service...</option>
                {subjects.map(s => (
                  <option key={s} value={s} className="bg-slate-800 text-slate-200">{s}</option>
                ))}
              </select>
              {errors.subject && (
                <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400">
                  <AlertCircle size={12} /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Tell Us About Your Project <span className="text-cyan-500">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => update('message', e.target.value)}
                onBlur={() => touch('message')}
                placeholder="Describe your data challenge, business goals, current tools, and any relevant context..."
                rows={5}
                className={`w-full bg-slate-800/60 border rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 resize-none ${
                  errors.message ? 'border-red-500/60' : 'border-slate-700 hover:border-slate-600'
                }`}
              />
              <div className="flex items-center justify-between mt-1.5">
                {errors.message ? (
                  <p className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className={`text-xs ${form.message.length < 20 && form.message.length > 0 ? 'text-amber-500' : 'text-slate-600'}`}>
                  {form.message.length} / 20 min
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {showToast && <Toast onClose={() => setShowToast(false)} />}
    </section>
  );
}
