import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaTerminal, FaTimes } from 'react-icons/fa';

// ─── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'Home',       id: 'home',       index: '00' },
  { name: 'Skills',     id: 'skills',     index: '01' },
  { name: 'Projects',   id: 'projects',   index: '02' },
  { name: 'Experience', id: 'experience', index: '03' },
  { name: 'Education',  id: 'education',  index: '04' },
];

// ─── Scroll-aware active section tracker ──────────────────────────────────────
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [ids]);

  return active;
};

// ─── Glitch text effect on hover ──────────────────────────────────────────────
const GlitchText = ({ text, isActive }) => {
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const intervalRef = useRef(null);

  const startGlitch = () => {
    if (isActive) return;
    setGlitching(true);
    let iterations = 0;
    const original = text.toUpperCase();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        original.split('').map((char, i) =>
          i < iterations ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      );
      iterations += 0.5;
      if (iterations > original.length) {
        clearInterval(intervalRef.current);
        setDisplayText(original);
        setGlitching(false);
      }
    }, 35);
  };

  useEffect(() => {
    setDisplayText(text.toUpperCase());
  }, [text]);

  return (
    <span
      className="font-mono text-xs tracking-[0.18em] transition-colors duration-200"
      onMouseEnter={startGlitch}
      style={{ letterSpacing: '0.18em' }}
    >
      {displayText}
    </span>
  );
};

// ─── Desktop nav pill ─────────────────────────────────────────────────────────
const NavPill = ({ item, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl group"
      whileTap={{ scale: 0.94 }}
    >
      {/* Active background */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="nav-active-bg"
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.12))',
              border: '1px solid rgba(99,102,241,0.35)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      />

      {/* Index number */}
      <span
        className="font-mono text-[9px] tabular-nums transition-colors duration-200"
        style={{ color: isActive ? 'rgba(165,180,252,0.7)' : 'rgba(100,116,139,0.5)' }}
      >
        {item.index}
      </span>

      {/* Label */}
      <span style={{ color: isActive ? '#a5b4fc' : 'rgba(203,213,225,0.75)' }}>
        <GlitchText text={item.name} isActive={isActive} />
      </span>

      {/* Active dot */}
      {isActive && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#818cf8', boxShadow: '0 0 6px #818cf8' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        />
      )}

      {/* Hover underline sweep */}
      <motion.div
        className="absolute bottom-0.5 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.5), transparent)' }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map(i => i.id));
  const { scrollYProgress } = useScroll();

  // Scroll progress bar value
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left z-10"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, #6366f1, #a78bfa, #f472b6)',
          }}
        />

        {/* Nav bar surface */}
        <motion.div
          className="mx-4 mt-3 rounded-2xl overflow-hidden"
          animate={{
            background: scrolled
              ? 'rgba(2, 8, 23, 0.88)'
              : 'rgba(2, 8, 23, 0.55)',
            borderColor: scrolled
              ? 'rgba(99, 102, 241, 0.2)'
              : 'rgba(255,255,255,0.07)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 4px 20px rgba(0,0,0,0.2)',
          }}
          transition={{ duration: 0.35 }}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="px-5 py-3 flex items-center justify-between">

            {/* ── Logo ── */}
            <motion.button
              onClick={() => handleScroll('home')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Logo mark */}
              <div className="relative w-9 h-9">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-base tracking-tight select-none">W</span>
                </div>
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', filter: 'blur(8px)', opacity: 0.5 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* Name + title */}
              <div className="hidden sm:flex flex-col -space-y-0.5">
                <span className="text-white font-black text-sm tracking-tight leading-none">Wail Benoulha</span>
                <span className="text-indigo-400 font-mono text-[9px] tracking-[0.22em] uppercase opacity-75">
                  Full-Stack Dev
                </span>
              </div>
            </motion.button>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavPill
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => handleScroll(item.id)}
                />
              ))}
            </div>

            {/* ── CTA + hamburger ── */}
            <div className="flex items-center gap-3">
              {/* Contact CTA */}
              <motion.button
                onClick={() => handleScroll('experience')}
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-white relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 30px rgba(99,102,241,0.6)' }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8 }}
                />
                <FaTerminal size={10} className="relative" />
                <span className="relative font-mono">Hire Me</span>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                onClick={() => setIsOpen(v => !v)}
                whileTap={{ scale: 0.92 }}
              >
                <div className="w-5 flex flex-col gap-[5px]">
                  <motion.span
                    className="block h-px w-full bg-white rounded-full origin-center"
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    className="block h-px bg-white rounded-full origin-right"
                    animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="block h-px w-full bg-white rounded-full origin-center"
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile full-screen menu overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(16px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, rgba(10,15,50,0.98) 0%, rgba(2,8,23,0.99) 100%)',
                borderLeft: '1px solid rgba(99,102,241,0.18)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p className="text-white font-black text-lg">Navigation</p>
                  <p className="text-indigo-400 font-mono text-[10px] tracking-[0.25em] uppercase opacity-70 mt-0.5">
                    portfolio · 2025
                  </p>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.9 }}>
                  <FaTimes size={13} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl group relative overflow-hidden"
                    style={{
                      background: activeSection === item.id
                        ? 'rgba(99,102,241,0.12)'
                        : 'transparent',
                      border: activeSection === item.id
                        ? '1px solid rgba(99,102,241,0.3)'
                        : '1px solid transparent',
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />

                    {/* Index */}
                    <span className="font-mono text-[10px] tabular-nums w-6 text-right"
                      style={{ color: activeSection === item.id ? '#818cf8' : 'rgba(100,116,139,0.5)' }}>
                      {item.index}
                    </span>

                    {/* Divider */}
                    <div className="w-px h-4"
                      style={{ background: activeSection === item.id ? 'rgba(129,140,248,0.5)' : 'rgba(100,116,139,0.2)' }} />

                    {/* Name */}
                    <span className="font-mono text-sm tracking-widest uppercase font-semibold transition-colors duration-200"
                      style={{ color: activeSection === item.id ? '#a5b4fc' : 'rgba(203,213,225,0.65)' }}>
                      {item.name}
                    </span>

                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: '#818cf8', boxShadow: '0 0 8px #818cf8' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Panel footer */}
              <div className="px-6 py-6 space-y-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <motion.button
                  onClick={() => handleScroll('experience')}
                  className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase text-white font-mono relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <FaTerminal size={10} />
                    Hire Me
                  </span>
                </motion.button>

                <p className="text-center text-gray-700 text-[10px] font-mono tracking-widest">
                  wailbenoulha · algeria
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;