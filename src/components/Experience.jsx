import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaBuilding, FaCalendarAlt, FaCode, FaTrophy } from 'react-icons/fa';

const typeConfig = {
  Internship: {
    gradient: 'from-violet-500 to-indigo-500',
    glow: 'shadow-violet-500/30',
    border: 'border-violet-500/40',
    dot: 'bg-gradient-to-br from-violet-400 to-indigo-500',
    icon: <FaCode className="text-violet-300" />,
    accent: 'text-violet-300',
  },
  Hackathon: {
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500/40',
    dot: 'bg-gradient-to-br from-amber-400 to-orange-500',
    icon: <FaTrophy className="text-amber-300" />,
    accent: 'text-amber-300',
  },
};

const fallbackConfig = {
  gradient: 'from-cyan-500 to-blue-500',
  glow: 'shadow-cyan-500/30',
  border: 'border-cyan-500/40',
  dot: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  icon: <FaBuilding className="text-cyan-300" />,
  accent: 'text-cyan-300',
};

/* ── single card ── */
const ExpCard = ({ exp, side, index }) => {
  const cfg = typeConfig[exp.type] || fallbackConfig;
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative w-full lg:w-[46%] ${isLeft ? 'lg:mr-auto lg:pr-10' : 'lg:ml-auto lg:pl-10'}`}
    >
      {/* connector line to center */}
      <div
        className={`hidden lg:block absolute top-8 ${isLeft ? 'right-0 -mr-px' : 'left-0 -ml-px'} w-10 h-px bg-gradient-to-${isLeft ? 'r' : 'l'} from-transparent to-white/20`}
      />

      {/* card */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${cfg.border} bg-slate-900/70 backdrop-blur-xl p-6 transition-all duration-500 group-hover:${cfg.glow} group-hover:shadow-2xl group-hover:-translate-y-1`}
      >
        {/* ambient glow top corner */}
        <div
          className={`absolute -top-10 ${isLeft ? '-right-10' : '-left-10'} w-32 h-32 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
        />

        {/* top row */}
        <div className="flex items-center justify-between mb-4 relative">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${cfg.gradient} text-white shadow-lg`}
          >
            {cfg.icon} {exp.type}
          </span>
          <span className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.accent}`}>
            <FaCalendarAlt size={10} /> {exp.period}
          </span>
        </div>

        {/* role */}
        <h3 className="text-xl font-bold text-white mb-1 leading-tight">{exp.role}</h3>

        {/* company */}
        <p className="text-sm text-slate-400 font-medium flex items-center gap-2 mb-4">
          <FaBuilding className="text-slate-500" /> {exp.company}
        </p>

        {/* description */}
        <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>

        {/* bottom accent bar */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${cfg.gradient} rounded-b-2xl`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
          style={{ originX: 0, width: '100%' }}
        />
      </div>
    </motion.div>
  );
};

/* ── center dot ── */
const CenterDot = ({ exp, index }) => {
  const cfg = typeConfig[exp.type] || fallbackConfig;
  return (
    <motion.div
      className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
    >
      <div
        className={`w-4 h-4 rounded-full ${cfg.dot} shadow-lg ring-4 ring-slate-950`}
      />
    </motion.div>
  );
};

/* ── main component ── */
const Experience = ({ data }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-slate-950 overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* ── background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* orbs */}
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 rounded-full bg-violet-700 opacity-10 blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-700 opacity-8 blur-3xl"
          animate={{ y: [0, -80, 0], x: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* ── header ── */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            className="text-violet-400 text-sm font-bold uppercase tracking-[0.3em] mb-3"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            Career Path
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-6xl font-black text-white mb-4 leading-none tracking-tight"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            Professional{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-base max-w-xl mx-auto mt-4"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } }}
          >
            Hands-on roles and competitive challenges that sharpened my craft
          </motion.p>
        </motion.div>

        {/* ── timeline ── */}
        <div className="relative">
          {/* animated vertical line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-500 rounded-full"
              style={{ height: lineH }}
            />
          </div>

          {/* items */}
          <div className="flex flex-col gap-12">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="relative flex items-center">
                <CenterDot exp={exp} index={idx} />
                <ExpCard exp={exp} side={idx % 2 === 0 ? 'left' : 'right'} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;