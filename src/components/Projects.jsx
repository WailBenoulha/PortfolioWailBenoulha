import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft,
  FaChevronRight, FaExpand, FaLayerGroup, FaCode
} from 'react-icons/fa';

// ─── Asset Maps ────────────────────────────────────────────────────────────────
const PROJECT_ASSETS = {
  Qarini: {
    hero: new URL('../assets/qarini-bg.png', import.meta.url).href,
    gallery: [
      new URL('../assets/qarini/qarini1.png', import.meta.url).href,
      new URL('../assets/qarini/qarini2.png', import.meta.url).href,
      new URL('../assets/qarini/qarini3.png', import.meta.url).href,
      new URL('../assets/qarini/qarini4.png', import.meta.url).href,
      new URL('../assets/qarini/qarini5.png', import.meta.url).href,
      new URL('../assets/qarini/qarini6.png', import.meta.url).href,
      new URL('../assets/qarini/qarini7.png', import.meta.url).href,
      new URL('../assets/qarini/qarini8.png', import.meta.url).href,
      new URL('../assets/qarini/qarini9.png', import.meta.url).href,
      new URL('../assets/qarini/qarini10.png', import.meta.url).href,
      new URL('../assets/qarini/qarini11.png', import.meta.url).href,
    ],
  },
  Italyst: {
    hero: new URL('../assets/Italyst-w.png', import.meta.url).href,
    gallery: [
      new URL('../assets/italyst/Screenshot (218).png', import.meta.url).href,
      new URL('../assets/italyst/Screenshot (219).png', import.meta.url).href,
      new URL('../assets/italyst/Screenshot (220).png', import.meta.url).href,
      new URL('../assets/italyst/Screenshot (221).png', import.meta.url).href,
      new URL('../assets/italyst/Screenshot (222).png', import.meta.url).href,
      new URL('../assets/italyst/Screenshot (223).png', import.meta.url).href,
    ],
  },
  ArtisanConnect: {
    hero: new URL('../assets/artcon.png', import.meta.url).href,
    gallery: [
      new URL('../assets/artcon/Screenshot (164).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (168).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (169).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (171).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (175).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (177).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (181).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (182).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (185).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (186).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (192).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (193).png', import.meta.url).href,
      new URL('../assets/artcon/Screenshot (195).png', import.meta.url).href,
    ],
  },
  Bazario: {
    hero: new URL('../assets/bazario-l.png', import.meta.url).href,
    gallery: [
      new URL('../assets/bazario/Screenshot (208).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (211).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (212).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (235).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (236).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (238).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (239).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (240).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (241).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (242).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (243).png', import.meta.url).href,
      new URL('../assets/bazario/Screenshot (244).png', import.meta.url).href,
    ],
  },
};

// ─── Per-project links ─────────────────────────────────────────────────────────
const PROJECT_LINKS = {
  Qarini: {
    github: 'https://github.com/orgs/Qarini/repositories',
    live: null,
  },
  Italyst: {
    github: 'https://github.com/WailBenoulha/Italyst-front',
    live: 'https://wailbenoulha.github.io/Italyst-front/',
  },
  ArtisanConnect: {
    github: 'https://github.com/orgs/ArtisansConnect/repositories',
    live: null,
  },
  Bazario: {
    github: 'https://github.com/WailBenoulha/Bazario-Front',
    live: null,
  },
};

const COLORS = {
  'from-blue-500 to-cyan-400':     { a: '#3b82f6', b: '#22d3ee', glow: 'rgba(59,130,246,0.4)',  text: '#7dd3fc' },
  'from-purple-500 to-pink-400':   { a: '#a855f7', b: '#f472b6', glow: 'rgba(168,85,247,0.4)',  text: '#d8b4fe' },
  'from-orange-500 to-yellow-400': { a: '#f97316', b: '#facc15', glow: 'rgba(249,115,22,0.4)',  text: '#fdba74' },
  'from-green-500 to-emerald-400': { a: '#22c55e', b: '#34d399', glow: 'rgba(34,197,94,0.4)',   text: '#86efac' },
};

// ─── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const thumbRef = useRef(null);

  const go = useCallback((dir) => {
    setDirection(dir);
    setCurrent(i => (i + dir + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  useEffect(() => {
    if (thumbRef.current) {
      const el = thumbRef.current.children[current];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [current]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.92, transition: { duration: 0.28 } }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
        <span className="font-mono text-sm text-gray-500 tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <FaTimes size={14} />
        </button>
      </div>

      <div className="relative flex items-center justify-center w-full flex-1 overflow-hidden px-20"
        onClick={e => e.stopPropagation()}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={current} custom={direction} variants={variants}
            initial="enter" animate="center" exit="exit"
            className="absolute" style={{ maxWidth: '1000px', width: '100%' }}>
            <img src={images[current]} alt=""
              className="w-full object-contain rounded-2xl"
              style={{ maxHeight: '70vh', boxShadow: '0 40px 120px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.06)' }} />
          </motion.div>
        </AnimatePresence>

        {[{ d: -1, icon: <FaChevronLeft />, cls: 'left-4' }, { d: 1, icon: <FaChevronRight />, cls: 'right-4' }].map(({ d, icon, cls }) => (
          <motion.button key={d} onClick={e => { e.stopPropagation(); go(d); }}
            className={`absolute ${cls} z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }} whileTap={{ scale: 0.95 }}>
            {icon}
          </motion.button>
        ))}
      </div>

      <div className="w-full flex-shrink-0 pb-4 pt-3"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
        onClick={e => e.stopPropagation()}>
        <div ref={thumbRef} className="flex gap-2 overflow-x-auto px-6 pb-1 justify-center" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, i) => (
            <motion.button key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: 72, height: 48, border: `2px solid ${i === current ? 'rgba(255,255,255,0.6)' : 'transparent'}`, opacity: i === current ? 1 : 0.45 }}
              whileHover={{ opacity: 0.85 }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Project Modal ─────────────────────────────────────────────────────────────
const ProjectModal = ({ project, c, onClose }) => {
  const assets = PROJECT_ASSETS[project.name];
  const links = PROJECT_LINKS[project.name] || { github: null, live: null };
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(18px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full sm:max-w-6xl max-h-[95vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(160deg, #0d1432 0%, #080d20 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.8), 0 0 100px ${c.glow}`,
          }}
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Hero image viewer */}
          <div className="relative flex-shrink-0 h-64 sm:h-72 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img key={activeImg} src={assets.gallery[activeImg]} alt=""
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }} />
            </AnimatePresence>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080d20 0%, transparent 55%)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.a}18 0%, transparent 60%)` }} />

            <button onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <FaTimes size={13} />
            </button>
            <button onClick={() => setLightboxIdx(activeImg)}
              className="absolute top-4 right-16 w-9 h-9 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <FaExpand size={12} />
            </button>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})`, boxShadow: `0 4px 20px ${c.glow}` }}>
                {project.type}
              </span>
            </div>
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{project.name}</h2>
              <p className="text-sm mt-1 font-semibold" style={{ color: c.text }}>{project.role}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              {/* Info panel */}
              <div className="lg:col-span-2 p-6 space-y-5">
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-3 font-semibold">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{ background: `${c.a}18`, border: `1px solid ${c.a}40`, color: c.text }}>
                        <FaCode size={9} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  {/* Live Demo — only shown if the project has a live URL */}
                  {links.live ? (
                    <a
                      href={links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})`, boxShadow: `0 8px 30px ${c.glow}` }}
                    >
                      <FaExternalLinkAlt size={11} /> Live Demo
                    </a>
                  ) : (
                    <div
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white/30 cursor-not-allowed select-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      title="Live demo not available"
                    >
                      <FaExternalLinkAlt size={11} /> Live Demo
                    </div>
                  )}

                  {/* GitHub button */}
                  {links.github ? (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-gray-300 hover:text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <FaGithub size={14} /> View Source Code
                    </a>
                  ) : (
                    <div
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-gray-600 cursor-not-allowed select-none"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <FaGithub size={14} /> View Source Code
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery panel */}
              <div className="lg:col-span-3 p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-xs uppercase tracking-widest font-semibold">
                    Screenshots
                    <span className="ml-2 px-1.5 py-0.5 rounded-md text-[10px] bg-white/5 text-gray-500">{assets.gallery.length}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {assets.gallery.map((img, i) => (
                    <motion.button key={i}
                      className="relative group rounded-xl overflow-hidden"
                      style={{
                        aspectRatio: '16/10',
                        border: `2px solid ${i === activeImg ? c.a : 'transparent'}`,
                        boxShadow: i === activeImg ? `0 0 20px ${c.glow}` : 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveImg(i)}>
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <FaExpand className="text-white" size={14}
                          onClick={e => { e.stopPropagation(); setLightboxIdx(i); }} />
                      </div>
                      {i === activeImg && (
                        <div className="absolute inset-0 rounded-xl"
                          style={{ background: `linear-gradient(135deg, ${c.a}22, ${c.b}22)` }} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox images={assets.gallery} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Main Projects Component ───────────────────────────────────────────────────
const Projects = ({ data }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef(null);
  const projects = data.projects;
  const active = projects[activeIdx];
  const c = COLORS[active.color] || COLORS['from-blue-500 to-cyan-400'];
  const assets = PROJECT_ASSETS[active.name];
  const activeLinks = PROJECT_LINKS[active.name] || { github: null, live: null };

  const go = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setActiveIdx(i => (i + dir + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, projects.length]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 6000);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => go(1), 6000);
    return () => clearInterval(autoRef.current);
  }, [go]);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.94, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050b18 0%, #080d20 50%, #050b18 100%)', minHeight: '100vh' }}
    >
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Dynamic ambient keyed to active project */}
      <AnimatePresence mode="wait">
        <motion.div key={activeIdx} className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
          <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full"
            style={{ background: `radial-gradient(ellipse, ${c.a}20 0%, transparent 65%)`, filter: 'blur(80px)', transform: 'translateY(-30%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full"
            style={{ background: `radial-gradient(ellipse, ${c.b}18 0%, transparent 65%)`, filter: 'blur(80px)', transform: 'translateY(30%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section header */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>
            <FaLayerGroup size={10} /> Featured Work
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-none mb-4 tracking-tight">
            My{' '}
            <AnimatePresence mode="wait">
              <motion.span key={activeIdx} className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: `linear-gradient(135deg, ${c.a}, ${c.b})` }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }}>
                Projects
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Full-stack products built from concept to deployment — click to explore screenshots & details
          </p>
        </motion.div>

        {/* ── Slide ── */}
        <div className="relative" style={{ perspective: '1200px' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
                border: '1px solid rgba(255,255,255,0.065)',
                boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 80px 160px rgba(0,0,0,0.7), 0 0 120px ${c.glow}`,
              }}
            >
              {/* Left: image collage */}
              <div className="relative min-h-[380px] lg:min-h-[540px] overflow-hidden">
                <motion.img
                  src={assets.hero} alt={active.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.06 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${c.a}55 0%, ${c.b}28 100%)`, mixBlendMode: 'multiply' }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(5,11,24,0.55) 0%, transparent 55%), linear-gradient(to top, rgba(5,11,24,0.65) 0%, transparent 55%)' }} />

                {/* Floating screenshot cards */}
                {assets.gallery.slice(1, 4).map((img, i) => {
                  const pos = [
                    { bottom: '10%', right: '7%', rotate: 4,  delay: 0.3, w: 200 },
                    { top:    '8%',  right: '9%', rotate: -5, delay: 0.5, w: 160 },
                    { top:   '40%', right: '3%', rotate: 2,  delay: 0.7, w: 140 },
                  ][i];
                  return (
                    <motion.div key={i}
                      className="absolute rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        bottom: pos.bottom, top: pos.top, right: pos.right,
                        width: pos.w, transform: `rotate(${pos.rotate}deg)`,
                        border: '2px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
                      }}
                      initial={{ opacity: 0, x: 40, rotate: pos.rotate + 12 }}
                      animate={{ opacity: 0.88, x: 0, rotate: pos.rotate }}
                      transition={{ delay: pos.delay, duration: 0.65, ease: 'easeOut' }}>
                      <img src={img} alt="" className="w-full" />
                    </motion.div>
                  );
                })}

                {/* Giant index number */}
                <div className="absolute top-4 left-5 select-none">
                  <span className="font-mono font-black leading-none"
                    style={{ fontSize: 96, color: `${c.a}20`, letterSpacing: '-0.05em' }}>
                    {String(activeIdx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Right: content */}
              <div className="flex flex-col justify-between p-8 lg:p-10">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})`, boxShadow: `0 4px 20px ${c.glow}` }}>
                      {active.type}
                    </span>
                    <span className="text-gray-600 text-xs font-mono tabular-nums">
                      {activeIdx + 1} of {projects.length}
                    </span>
                  </div>

                  <motion.h3
                    className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight leading-none"
                    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                    {active.name}
                  </motion.h3>

                  <motion.p className="text-sm font-semibold mb-5" style={{ color: c.text }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                    {active.role}
                  </motion.p>

                  <motion.p className="text-gray-400 text-sm leading-relaxed mb-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.33 }}>
                    {active.description}
                  </motion.p>

                  {/* Stack */}
                  <motion.div className="flex flex-wrap gap-2 mb-7"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
                    {active.stack.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{ background: `${c.a}18`, border: `1px solid ${c.a}38`, color: c.text }}>
                        {t}
                      </span>
                    ))}
                  </motion.div>

                  {/* Preview strip */}
                  <motion.div className="mb-8"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">
                      Preview — {assets.gallery.length} screenshots
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                      {assets.gallery.slice(0, 6).map((img, i) => (
                        <motion.div key={i}
                          className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                          style={{ width: 70, height: 44, border: '1.5px solid rgba(255,255,255,0.08)' }}
                          whileHover={{ scale: 1.1, borderColor: c.a }}
                          onClick={() => setOpenProject(active)}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                      {assets.gallery.length > 6 && (
                        <div className="flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer"
                          style={{ width: 70, height: 44, background: `${c.a}18`, border: `1.5px solid ${c.a}40`, color: c.text }}
                          onClick={() => setOpenProject(active)}>
                          +{assets.gallery.length - 6}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Actions */}
                <motion.div className="flex gap-3"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
                  <motion.button
                    onClick={() => setOpenProject(active)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})`, boxShadow: `0 8px 32px ${c.glow}` }}
                    whileHover={{ scale: 1.02, boxShadow: `0 12px 44px ${c.glow}` }}
                    whileTap={{ scale: 0.97 }}>
                    <FaExpand size={11} /> View Gallery
                  </motion.button>

                  {/* GitHub icon button */}
                  {activeLinks.github ? (
                    <motion.a
                      href={activeLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 flex items-center justify-center rounded-2xl text-gray-300 hover:text-white transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                      <FaGithub size={16} />
                    </motion.a>
                  ) : (
                    <div className="w-14 flex items-center justify-center rounded-2xl text-gray-600 cursor-not-allowed"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <FaGithub size={16} />
                    </div>
                  )}

                  {/* Live link icon button */}
                  {activeLinks.live ? (
                    <motion.a
                      href={activeLinks.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 flex items-center justify-center rounded-2xl text-gray-300 hover:text-white transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                      <FaExternalLinkAlt size={13} />
                    </motion.a>
                  ) : (
                    <div className="w-14 flex items-center justify-center rounded-2xl text-gray-600 cursor-not-allowed"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <FaExternalLinkAlt size={13} />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side nav arrows */}
          {[{ d: -1, icon: <FaChevronLeft />, cls: 'left-0 -translate-x-6' },
            { d: 1,  icon: <FaChevronRight />, cls: 'right-0 translate-x-6' }].map(({ d, icon, cls }) => (
            <motion.button key={d}
              className={`absolute top-1/2 -translate-y-1/2 ${cls} z-20 w-12 h-12 rounded-2xl items-center justify-center text-white hidden lg:flex`}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.1, background: `${c.a}30`, borderColor: `${c.a}60` }}
              whileTap={{ scale: 0.93 }}
              onClick={() => { go(d); resetAuto(); }}>
              {icon}
            </motion.button>
          ))}
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <motion.button
            className="flex lg:hidden w-10 h-10 rounded-xl items-center justify-center text-gray-400"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={() => { go(-1); resetAuto(); }} whileTap={{ scale: 0.9 }}>
            <FaChevronLeft size={12} />
          </motion.button>

          <div className="flex gap-2.5 items-center">
            {projects.map((p, i) => {
              const pc = COLORS[p.color] || COLORS['from-blue-500 to-cyan-400'];
              return (
                <motion.button key={i}
                  onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); resetAuto(); }}
                  className="rounded-full"
                  style={{
                    width: i === activeIdx ? 36 : 8, height: 8,
                    background: i === activeIdx ? `linear-gradient(135deg, ${pc.a}, ${pc.b})` : 'rgba(255,255,255,0.15)',
                    boxShadow: i === activeIdx ? `0 0 14px ${pc.glow}` : 'none',
                    transition: 'width 0.35s ease, background 0.35s ease',
                  }}
                  whileHover={{ scale: 1.3 }}
                />
              );
            })}
          </div>

          <motion.button
            className="flex lg:hidden w-10 h-10 rounded-xl items-center justify-center text-gray-400"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={() => { go(1); resetAuto(); }} whileTap={{ scale: 0.9 }}>
            <FaChevronRight size={12} />
          </motion.button>
        </div>

        {/* Thumbnails row */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {projects.map((p, i) => {
            const pc = COLORS[p.color] || COLORS['from-blue-500 to-cyan-400'];
            const pa = PROJECT_ASSETS[p.name];
            const isActive = i === activeIdx;
            return (
              <motion.button key={i}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  aspectRatio: '16/9',
                  border: `2px solid ${isActive ? pc.a : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive ? `0 0 28px ${pc.glow}` : '0 8px 24px rgba(0,0,0,0.4)',
                  transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
                onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); resetAuto(); }}
                whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
                <img src={pa.hero} alt={p.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 100%)' }} />
                {isActive && (
                  <motion.div className="absolute inset-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ background: `linear-gradient(135deg, ${pc.a}30, ${pc.b}20)` }} />
                )}
                <div className="absolute bottom-2.5 left-3 right-3">
                  <p className="text-white text-xs font-black leading-none truncate">{p.name}</p>
                  <p className="mt-0.5 text-[10px] font-semibold truncate"
                    style={{ color: isActive ? pc.text : '#475569' }}>{p.type}</p>
                </div>
                {isActive && (
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
                    style={{ background: pc.a, boxShadow: `0 0 8px ${pc.a}` }} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            c={COLORS[openProject.color] || COLORS['from-blue-500 to-cyan-400']}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;