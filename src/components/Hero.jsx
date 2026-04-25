import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { SiDjango, SiReact, SiDocker, SiPostgresql } from 'react-icons/si';
import { useRef, useState, useEffect } from 'react';
import ProfilePic from '../assets/WailMainPic.jpg';

// ─── Typewriter hook ───────────────────────────────────────────────────────────
const useTypewriter = (words, speed = 90, pause = 1800) => {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
      setTimeout(() => setDeleting(true), delay);
      return;
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplay(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx(i => i + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
};

// ─── Animated counter ──────────────────────────────────────────────────────────
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = target / 40;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 35);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Floating tech badge ───────────────────────────────────────────────────────
const TechOrb = ({ icon: Icon, label, style, delay }) => (
  <motion.div
    className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold backdrop-blur-md select-none pointer-events-none"
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.75)',
      ...style,
    }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{
      opacity: { delay, duration: 0.6 },
      scale: { delay, duration: 0.6 },
      y: { delay: delay + 0.6, duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
    }}
  >
    <Icon size={14} />
    {label}
  </motion.div>
);

// ─── Grid line component ───────────────────────────────────────────────────────
const ScanLine = () => {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-0"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.4), transparent)' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
const Hero = ({ data }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  const roles = ['Full-Stack Developer', 'DevOps Engineer', 'SaaS Builder', 'AI Integrator'];
  const typed = useTypewriter(roles);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#020817' }}
    >
      {/* ── Deep space background ── */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0c1a4e 0%, #020817 60%)' }} />

        {/* Parallax mesh blobs */}
        <motion.div className="absolute"
          style={{
            width: 900, height: 900, top: '-20%', left: '-10%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)',
            filter: 'blur(60px)',
            x: useSpring(useTransform(() => mousePos.x * -30, v => v), { stiffness: 30, damping: 20 }),
            y: useSpring(useTransform(() => mousePos.y * -20, v => v), { stiffness: 30, damping: 20 }),
          }}
        />
        <motion.div className="absolute"
          style={{
            width: 700, height: 700, bottom: '-15%', right: '-8%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)',
            filter: 'blur(60px)',
            x: useSpring(useTransform(() => mousePos.x * 25, v => v), { stiffness: 30, damping: 20 }),
            y: useSpring(useTransform(() => mousePos.y * 20, v => v), { stiffness: 30, damping: 20 }),
          }}
        />
        <motion.div className="absolute"
          style={{
            width: 500, height: 500, top: '30%', right: '20%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden">
          <ScanLine />
        </div>

        {/* Stars */}
        {[...Array(55)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() < 0.3 ? 3 : Math.random() < 0.6 ? 2 : 1.5,
              height: Math.random() < 0.3 ? 3 : Math.random() < 0.6 ? 2 : 1.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#93c5fd', '#c4b5fd', '#fbcfe8', '#ffffff'][Math.floor(Math.random() * 4)],
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 pt-28 pb-24"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ opacity, y: springY }}
      >
        {/* ── LEFT ── */}
        <div className="flex-1 space-y-7 lg:pr-10 max-w-2xl">

          {/* Status badge */}
          <motion.div variants={item}>
            <motion.div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.28)',
                color: '#6ee7b7',
              }}
              animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 18px rgba(16,185,129,0.2)', '0 0 0px rgba(16,185,129,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for new opportunities
            </motion.div>
          </motion.div>

          {/* Name block */}
          <motion.div variants={item} className="space-y-1">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-400 mb-3">
              Portfolio · {new Date().getFullYear()}
            </p>
            <h1 className="font-black text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              Wail
              <br />
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 45%, #f472b6 100%)' }}>
                  Benoulha
                </span>
                {/* Underline decoration */}
                <motion.div className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)' }}
                  initial={{ width: 0 }} animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item}
            className="flex items-center gap-3 text-xl lg:text-2xl font-light text-gray-300"
          >
            <span className="text-gray-600">{'<'}</span>
            <span className="font-mono min-w-[280px]">{typed}</span>
            <motion.span
              className="inline-block w-0.5 h-6 bg-indigo-400 rounded-full"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            <span className="text-gray-600">{'/>'}</span>
          </motion.div>

          {/* Summary */}
          <motion.p variants={item} className="text-gray-400 text-base leading-relaxed max-w-lg">
            {data.personal_info.summary}
          </motion.p>

          {/* Location */}
          <motion.div variants={item} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <FaMapMarkerAlt className="text-indigo-400" size={11} />
            </div>
            <span className="text-gray-500 text-sm">Based in</span>
            <span className="text-white font-semibold text-sm tracking-wide">{data.personal_info.location}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-1">
            <motion.a href="#projects"
              className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 0 36px rgba(99,102,241,0.45)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 56px rgba(99,102,241,0.65)' }}
              whileTap={{ scale: 0.97 }}>
              {/* shimmer */}
              <motion.div className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <span className="relative">View My Work</span>
              <FaArrowRight size={12} className="relative group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a href="#contact"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-purple-300"
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.35)',
              }}
              whileHover={{ scale: 1.04, background: 'rgba(139,92,246,0.18)', boxShadow: '0 0 28px rgba(139,92,246,0.3)' }}
              whileTap={{ scale: 0.97 }}>
              Get In Touch
            </motion.a>

            <motion.a href="/Wail_s_Resume-hackerresume.pdf" download="Wail_Benoulha_Resume.pdf"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <FaDownload size={12} /> Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-3">
            {[
              { icon: FaGithub, href: 'https://github.com/WailBenoulha', label: 'GitHub' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/wail-benoulha/', label: 'LinkedIn' },
              { icon: FaEnvelope, href: 'mailto:wailbnlh@example.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ scale: 1.12, background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                title={label}>
                <Icon size={15} />
              </motion.a>
            ))}
            <div className="w-px h-6 bg-white/10 mx-1" />
            <span className="text-gray-600 text-xs">wailbnlh@gmail.com</span>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
            {[
              { value: 3, suffix: '+', label: 'Years Exp.' },
              { value: 20, suffix: '+', label: 'Projects Built' },
              { value: 4, suffix: '', label: 'Internships' },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="space-y-1">
                <p className="text-3xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #a78bfa)' }}>
                  <Counter target={value} suffix={suffix} />
                </p>
                <p className="text-gray-600 text-xs font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — photo ── */}
        <motion.div className="flex-1 flex justify-center" variants={item}>
          <div className="relative">
            {/* Floating tech badges */}
            <TechOrb icon={SiDjango} label="Django" style={{ top: '-5%', left: '-18%' }} delay={1.1} />
            <TechOrb icon={SiReact} label="React" style={{ top: '12%', right: '-20%' }} delay={1.3} />
            <TechOrb icon={SiDocker} label="Docker" style={{ bottom: '20%', right: '-18%' }} delay={1.5} />
            <TechOrb icon={SiPostgresql} label="PostgreSQL" style={{ bottom: '5%', left: '-22%' }} delay={1.7} />

            {/* Decorative ring */}
            <motion.div
              className="absolute rounded-[2.8rem]"
              style={{
                inset: -18,
                background: 'conic-gradient(from 0deg, #3b82f6, #a78bfa, #f472b6, #22d3ee, #3b82f6)',
                filter: 'blur(2px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            {/* Ring mask */}
            <div className="absolute rounded-[2.4rem]"
              style={{ inset: -5, background: '#020817' }} />

            {/* Glow pulse */}
            <motion.div className="absolute inset-0 rounded-[2rem]"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5))', filter: 'blur(44px)' }}
              animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.06, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Photo */}
            <motion.div
              className="relative overflow-hidden rounded-[2rem]"
              style={{
                width: 'clamp(280px, 28vw, 420px)',
                height: 'clamp(340px, 34vw, 520px)',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={ProfilePic}
                alt="Wail Benoulha"
                className="w-full h-full object-cover object-center"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(2,8,23,0.65) 0%, transparent 45%)' }} />
              {/* Subtle color tint */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 100%)' }} />
              {/* Shine sweep */}
              <motion.div className="absolute inset-0"
                style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
              />

              {/* Name tag inside photo */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-black text-xl leading-none">Wail Benoulha</p>
                <p className="text-indigo-300 text-xs font-semibold mt-1 tracking-wide">{data.personal_info.title}</p>
              </div>
            </motion.div>

            {/* Experience badge — top right */}
            <motion.div
              className="absolute -top-5 -right-5 w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                boxShadow: '0 10px 40px rgba(59,130,246,0.55)',
                border: '1.5px solid rgba(255,255,255,0.15)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <p className="text-2xl font-black text-white leading-none">3+</p>
              <p className="text-[10px] font-bold text-blue-100 leading-tight mt-0.5">Years<br />Exp.</p>
            </motion.div>

            {/* Open to work badge — bottom left */}
            <motion.div
              className="absolute -bottom-5 -left-5 px-4 py-2.5 rounded-2xl flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.25))',
                border: '1px solid rgba(16,185,129,0.4)',
                backdropFilter: 'blur(12px)',
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-300 text-xs font-bold">Open to Work</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}>
        <motion.p
          className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
          Scroll
        </motion.p>
        <div className="w-5 h-9 rounded-full border border-gray-700 flex justify-center pt-1.5 relative overflow-hidden">
          <motion.div className="w-1 h-2 bg-indigo-400 rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;