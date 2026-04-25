import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  FaServer, FaPaintBrush, FaDatabase, FaRocket,
  FaBrain, FaTools, FaChevronLeft, FaChevronRight, FaAws, FaChartBar, FaJava,
} from 'react-icons/fa';
import {
  SiDjango, SiExpress, SiPostman, SiSocketdotio,
  SiJsonwebtokens, SiReact, SiJavascript, SiHtml5,
  SiCss, SiTailwindcss, SiPostgresql, SiMysql,
  SiDocker, SiGithubactions,
  SiScikitlearn, SiTensorflow, SiPytorch, SiPandas,
  SiNumpy, SiGit, SiLinux, SiApachehadoop, SiSpring,
} from 'react-icons/si';

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'backend', label: 'Backend', Icon: FaServer,
    accent: '#3b82f6', accentB: '#06b6d4', glow: 'rgba(59,130,246,0.45)',
    skills: [
      { name: 'Django',               Icon: SiDjango,       color: '#44b78b' },
      { name: 'Django REST',          Icon: SiDjango,       color: '#ff1709' },
      { name: 'Express.js',           Icon: SiExpress,      color: '#ffffff' },
      { name: 'REST API',             Icon: SiPostman,      color: '#ff6c37' },
      { name: 'WebSockets',           Icon: SiSocketdotio,  color: '#ffffff' },
      { name: 'JWT Auth',             Icon: SiJsonwebtokens,color: '#d63aff' },
      { name: 'Java',                 Icon: FaJava,         color: '#f89820' },
      { name: 'Spring',               Icon: SiSpring,       color: '#6db33f' },
    ],
  },
  {
    id: 'frontend', label: 'Frontend', Icon: FaPaintBrush,
    accent: '#a855f7', accentB: '#f472b6', glow: 'rgba(168,85,247,0.45)',
    skills: [
      { name: 'React.js',    Icon: SiReact,       color: '#61dafb' },
      { name: 'JavaScript',  Icon: SiJavascript,  color: '#f7df1e' },
      { name: 'HTML5',       Icon: SiHtml5,       color: '#e34f26' },
      { name: 'CSS3',        Icon: SiCss,         color: '#1572b6' },
      { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06b6d4' },
    ],
  },
  {
    id: 'databases', label: 'Databases', Icon: FaDatabase,
    accent: '#22c55e', accentB: '#34d399', glow: 'rgba(34,197,94,0.45)',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479a1' },
    ],
  },
  {
    id: 'devops', label: 'DevOps', Icon: FaRocket,
    accent: '#f97316', accentB: '#facc15', glow: 'rgba(249,115,22,0.45)',
    skills: [
      { name: 'Docker',          Icon: SiDocker,       color: '#2496ed' },
      { name: 'GitHub Actions',  Icon: SiGithubactions,color: '#2088ff' },
      { name: 'AWS',             Icon: FaAws,          color: '#ff9900' },
    ],
  },
  {
    id: 'ml', label: 'ML / AI', Icon: FaBrain,
    accent: '#ec4899', accentB: '#f472b6', glow: 'rgba(236,72,153,0.45)',
    skills: [
      { name: 'Scikit-learn',  Icon: SiScikitlearn, color: '#f7931e' },
      { name: 'TensorFlow',    Icon: SiTensorflow,  color: '#ff6f00' },
      { name: 'PyTorch',       Icon: SiPytorch,     color: '#ee4c2c' },
      { name: 'Pandas',        Icon: SiPandas,      color: '#7c65a9' },
      { name: 'NumPy',         Icon: SiNumpy,       color: '#4dabcf' },
    ],
  },
  {
    id: 'tools', label: 'Tools', Icon: FaTools,
    accent: '#06b6d4', accentB: '#818cf8', glow: 'rgba(6,182,212,0.45)',
    skills: [
      { name: 'Git',      Icon: SiGit,          color: '#f05032' },
      { name: 'Linux',    Icon: SiLinux,        color: '#fcc624' },
      { name: 'Power BI', Icon: FaChartBar,     color: '#f2c811' },
      { name: 'Hadoop',   Icon: SiApachehadoop, color: '#66ccff' },
    ],
  },
];

// ─── Skill pill ───────────────────────────────────────────────────────────────
const SkillPill = ({ skill, cat, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default select-none overflow-hidden"
      style={{
        background: hov ? `linear-gradient(145deg,${cat.accent}1e,${cat.accentB}0f)` : 'rgba(255,255,255,0.03)',
        border: `1.5px solid ${hov ? cat.accent + '70' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hov ? `0 0 32px ${cat.glow}, 0 12px 40px rgba(0,0,0,0.6)` : '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        minHeight: 130,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.07 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle at 50% 30%, ${cat.accent}1a, transparent 65%)` }}
      />

      {/* Icon box */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
        style={{
          background: hov ? `linear-gradient(135deg,${cat.accent}30,${cat.accentB}20)` : 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${hov ? cat.accent + '55' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hov ? `0 0 18px ${cat.glow}` : 'none',
          transition: 'all 0.3s ease',
        }}
        animate={hov ? { rotate: [0, -8, 8, 0], scale: 1.12 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        <skill.Icon size={24}
          style={{ color: hov ? skill.color : '#4b5563', transition: 'color 0.3s',
            filter: hov ? `drop-shadow(0 0 6px ${skill.color}80)` : 'none' }}
        />
      </motion.div>

      {/* Name */}
      <p className="relative z-10 text-center font-bold text-xs leading-tight"
        style={{ color: hov ? '#e2e8f0' : '#64748b', transition: 'color 0.3s' }}>
        {skill.name}
      </p>

      {/* Bottom bar */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
        style={{ background: `linear-gradient(90deg,${cat.accent},${cat.accentB})` }}
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Skills = ({ data }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);

  const cat = CATEGORIES[active];

  const go = (d) => {
    if (animating) return;
    setAnimating(true);
    setDir(d);
    setActive(i => (i + d + CATEGORIES.length) % CATEGORIES.length);
    setTimeout(() => setAnimating(false), 550);
  };

  const goTo = (idx) => {
    if (idx === active || animating) return;
    setDir(idx > active ? 1 : -1);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => setAnimating(false), 550);
  };

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 5000);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setDir(1);
      setActive(i => (i + 1) % CATEGORIES.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, scale: 0.94, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#040a14 0%,#06101e 60%,#040a14 100%)' }}
    >
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }}
      />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />

      {/* Ambient glow — morphs per category */}
      <AnimatePresence mode="wait">
        <motion.div key={active} className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <div className="absolute top-[-20%] left-[-5%] w-[700px] h-[600px] rounded-full"
            style={{ background: `radial-gradient(ellipse,${cat.accent}1a 0%,transparent 65%)`, filter: 'blur(90px)' }}
          />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
            style={{ background: `radial-gradient(ellipse,${cat.accentB}14 0%,transparent 65%)`, filter: 'blur(80px)' }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>
            <FaTools size={9} /> Technical Arsenal
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4">
            Skills for{' '}
            <AnimatePresence mode="wait">
              <motion.span key={active} className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: `linear-gradient(135deg,${cat.accent},${cat.accentB})` }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                {cat.label}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Explore each domain — use the tabs or arrows to navigate
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div className="flex justify-center gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
          {CATEGORIES.map((c, i) => {
            const isActive = i === active;
            return (
              <motion.button key={c.id}
                onClick={() => { goTo(i); resetAuto(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300"
                style={{
                  background: isActive ? `linear-gradient(135deg,${c.accent}28,${c.accentB}18)` : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${isActive ? c.accent + '80' : 'rgba(255,255,255,0.07)'}`,
                  color: isActive ? c.accent : '#475569',
                  boxShadow: isActive ? `0 0 20px ${c.glow}` : 'none',
                }}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
                <c.Icon size={12} />
                {c.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Slide area ── */}
        <div className="relative" style={{ minHeight: 320 }}>

          {/* Prev / Next arrows */}
          {[
            { d: -1, cls: 'left-0 -translate-x-4 lg:-translate-x-8', icon: <FaChevronLeft size={14}/> },
            { d:  1, cls: 'right-0 translate-x-4 lg:translate-x-8',  icon: <FaChevronRight size={14}/> },
          ].map(({ d, cls, icon }) => (
            <motion.button key={d}
              onClick={() => { go(d); resetAuto(); }}
              className={`absolute top-1/2 -translate-y-1/2 ${cls} z-20 w-11 h-11 rounded-2xl hidden sm:flex items-center justify-center`}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
              whileHover={{ scale: 1.12, background: `${cat.accent}28`, borderColor: `${cat.accent}60` }}
              whileTap={{ scale: 0.92 }}>
              <span style={{ color: '#94a3b8' }}>{icon}</span>
            </motion.button>
          ))}

          {/* Category slide */}
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
            >
              {/* Category hero strip */}
              <motion.div
                className="relative rounded-3xl px-8 py-6 mb-8 overflow-hidden flex items-center gap-6"
                style={{
                  background: `linear-gradient(135deg,${cat.accent}14,${cat.accentB}08)`,
                  border: `1px solid ${cat.accent}30`,
                  boxShadow: `0 0 50px ${cat.glow}`,
                }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                {/* Glow blob */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 10% 50%,${cat.glow} 0%,transparent 50%)` }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                  style={{
                    background: `linear-gradient(135deg,${cat.accent}30,${cat.accentB}20)`,
                    border: `2px solid ${cat.accent}50`,
                    boxShadow: `0 0 24px ${cat.glow}`,
                  }}
                  animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                  <cat.Icon size={28} style={{ color: cat.accent }} />
                </motion.div>

                <div className="relative">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">Domain</p>
                  <h3 className="text-2xl font-black text-white">{cat.label}</h3>
                  <p className="text-xs mt-0.5 font-semibold" style={{ color: cat.accent }}>
                    {cat.skills.length} technologies
                  </p>
                </div>

                {/* Ghost number */}
                <div className="ml-auto text-8xl font-black tabular-nums select-none hidden md:block"
                  style={{ color: `${cat.accent}18`, letterSpacing: '-0.05em' }}>
                  {String(cat.skills.length).padStart(2,'0')}
                </div>

                {/* Mini dot nav */}
                <div className="flex gap-1.5 flex-shrink-0">
                  {CATEGORIES.map((_, i) => (
                    <button key={i}
                      onClick={() => { goTo(i); resetAuto(); }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? 24 : 6, height: 6,
                        background: i === active ? `linear-gradient(90deg,${cat.accent},${cat.accentB})` : 'rgba(255,255,255,0.15)',
                        boxShadow: i === active ? `0 0 10px ${cat.glow}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Skills grid */}
              <div className={`grid gap-4 ${
                cat.skills.length <= 3 ? 'grid-cols-3' :
                cat.skills.length <= 5 ? 'grid-cols-3 sm:grid-cols-5' :
                'grid-cols-3 sm:grid-cols-4 lg:grid-cols-8'
              }`}>
                {cat.skills.map((skill, si) => (
                  <SkillPill key={skill.name} skill={skill} cat={cat} delay={si * 0.06} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Interests ── */}
        <motion.div className="mt-16"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-4 mb-7">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.07))' }} />
            <span className="text-gray-600 text-xs uppercase tracking-[0.3em] font-black">Interests</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left,transparent,rgba(255,255,255,0.07))' }} />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.interests.map((interest, i) => {
              const c = CATEGORIES[i % CATEGORIES.length];
              return (
                <motion.div key={i}
                  className="relative px-5 py-2.5 rounded-2xl font-bold text-sm cursor-default overflow-hidden"
                  style={{ background: `${c.accent}0f`, border: `1.5px solid ${c.accent}30`, color: c.accent }}
                  initial={{ opacity: 0, scale: 0.8, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -4, boxShadow: `0 10px 28px ${c.glow}` }}>
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.08) 50%,transparent 65%)' }}
                    animate={{ x: ['-150%','150%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">{interest}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;