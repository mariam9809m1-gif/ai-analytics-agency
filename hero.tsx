import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Linkedin, Sparkles, BrainCircuit, BarChart3, Bot } from 'lucide-react';

const roles = [
  'AI & Data Analytics Agency',
  'Business Intelligence Solutions',
  'Machine Learning Consulting',
  'Data-Driven Growth Partner',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 75;

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          timerRef.current = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
        setCharIndex(c => c + 1);
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % roles.length);
          setCharIndex(0);
          return;
        }
        setCharIndex(c => c - 1);
      }
    }, speed);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center">
        {/* Status badge */}
        <div className="mb-6 animate-fade-in">
          <span className="section-tag">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now accepting new clients
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2">
          Hi, I'm{' '}
          <span className="text-gradient-cyan">Mariam Mamdouh</span>
        </h1>

        <p className="text-slate-500 text-base sm:text-lg font-medium mb-5 tracking-wide">
          Founder & Lead Data Scientist
        </p>

        {/* Typewriter role */}
        <div className="h-12 flex items-center justify-center mb-6">
          <p className="text-xl sm:text-2xl font-code text-slate-400">
            <span className="text-cyan-400">&gt;</span>{' '}
            <span className="text-slate-200">{displayed}</span>
            <span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Bio */}
        <p className="max-w-2xl text-slate-400 text-lg leading-relaxed mb-10">
          We help businesses unlock the power of their data — from building
          intelligent AI models to designing executive dashboards and automated
          analytics pipelines. Specializing in{' '}
          <span className="text-slate-200 font-medium">Python, Power BI, Machine Learning, and SQL</span>{' '}
          to turn raw data into strategic decisions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button onClick={scrollToProjects} className="btn-primary text-base px-8 py-3.5">
            <Sparkles size={16} />
            See Our Work
          </button>
          <button onClick={scrollToContact} className="btn-secondary text-base px-8 py-3.5">
            Start a Project
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-16">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm font-medium group"
          >
            <Linkedin size={18} className="group-hover:text-cyan-400 transition-colors duration-200" />
            LinkedIn
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg w-full">
          {[
            { icon: BrainCircuit, label: 'AI Models Deployed', value: '25+' },
            { icon: BarChart3, label: 'Dashboards Delivered', value: '60+' },
            { icon: Bot, label: 'Clients Served', value: '40+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={16} className="text-cyan-500 mb-1" />
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs text-slate-500 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan-400 transition-colors duration-200 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
