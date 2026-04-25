import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaSchool,
  FaTrophy,
  FaCheck,
  FaExternalLinkAlt,
  FaMedal,
} from 'react-icons/fa';

// ── Cert links ────────────────────────────────────────────────────────────────
const CERT_LINKS = {
  'AWS Academy Cloud Foundations':
    'https://www.credly.com/badges/4acbe4eb-bb04-4493-9e1e-239a3340ea8d/linked_in_profile',
  'AWS Academy Cloud Developing':
    'https://www.credly.com/badges/272bad0b-929e-4f9d-83f6-37912fb03ef5/linked_in_profile',
  'Supervised Machine Learning: Regression and Classification - DeepLearning.AI':
    'https://www.coursera.org/account/accomplishments/verify/KVSGHWAQ381Z',
  'Advanced Learning Algorithms - Coursera':
    'https://www.coursera.org/account/accomplishments/verify/V5EJ435H7Z39',
};

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  'In Progress': {
    gradient: 'from-amber-500 to-orange-400',
    ring: 'ring-amber-500/30',
    barColor: 'from-amber-500 to-orange-400',
    pulse: true,
  },
  Completed: {
    gradient: 'from-emerald-500 to-green-400',
    ring: 'ring-emerald-500/30',
    barColor: 'from-emerald-500 to-teal-400',
    pulse: false,
  },
};

// ── Stagger container ──────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ── Education Card ─────────────────────────────────────────────────────────────
const EduCard = ({ edu, index }) => {
  const cfg = statusConfig[edu.status] || statusConfig['Completed'];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.28 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-xl p-6 transition-shadow duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      {/* glow blob */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-emerald-600 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

      {/* header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-white leading-snug mb-1">{edu.degree}</h4>
          <p className="text-sm text-slate-400 flex items-center gap-1.5 truncate">
            <FaSchool className="flex-shrink-0 text-slate-500" size={13} />
            {edu.institution}
          </p>
        </div>
        <span
          className={`relative flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${cfg.gradient} text-white ring-2 ${cfg.ring} shadow-lg`}
        >
          {cfg.pulse && (
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          )}
          {edu.status}
        </span>
      </div>

      {/* progress bar */}
      <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${cfg.barColor} rounded-full`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

// ── Cert Item ──────────────────────────────────────────────────────────────────
const CertItem = ({ cert, index }) => {
  const link = CERT_LINKS[cert];

  const Inner = (
    <motion.div
      variants={fadeLeft}
      whileHover={{ x: 6, transition: { duration: 0.2 } }}
      className="group/item relative flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-slate-900/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-900/80"
    >
      {/* check circle */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <FaCheck className="text-white" size={11} />
      </div>

      <span className="flex-1 text-sm text-slate-300 font-medium leading-snug group-hover/item:text-white transition-colors duration-300">
        {cert}
      </span>

      {link && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
        >
          <FaExternalLinkAlt className="text-emerald-400" size={11} />
        </motion.div>
      )}

      {/* left accent */}
      <motion.div
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {Inner}
    </a>
  ) : (
    Inner
  );
};

// ── Section Label ──────────────────────────────────────────────────────────────
const SectionLabel = ({ icon: Icon, label, color }) => (
  <motion.div
    variants={fadeUp}
    className={`flex items-center gap-3 mb-8`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${color}`}
    >
      <Icon size={18} />
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">{label}</h3>
    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
  </motion.div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Education = ({ data }) => {
  return (
    <section
      className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(52,211,153,0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-emerald-700 opacity-10 blur-3xl"
          animate={{ y: [0, -80, 0], x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-teal-700 opacity-8 blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, -30, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* ── header ── */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p
            className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em] mb-3"
            variants={fadeUp}
          >
            Learning & Growth
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-6xl font-black text-white mb-4 leading-none tracking-tight"
            variants={fadeUp}
          >
            Education &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-base max-w-xl mx-auto mt-4"
            variants={fadeUp}
          >
            Continuous learning and professional development that keep me sharp
          </motion.p>
        </motion.div>

        {/* ── grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Education column ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <SectionLabel icon={FaGraduationCap} label="Education" color="bg-gradient-to-br from-emerald-500 to-teal-600" />

            {/* stat row */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="flex-1 p-3 rounded-xl border border-white/8 bg-slate-900/40 text-center">
                <p className="text-2xl font-black text-white">{data.education.length}</p>
                <p className="text-xs text-slate-500 mt-0.5">Degrees</p>
              </div>
              <div className="flex-1 p-3 rounded-xl border border-white/8 bg-slate-900/40 text-center">
                <p className="text-2xl font-black text-white">
                  {data.education.filter(e => e.status === 'In Progress').length}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">In Progress</p>
              </div>
              <div className="flex-1 p-3 rounded-xl border border-white/8 bg-slate-900/40 text-center">
                <p className="text-2xl font-black text-white">
                  {data.education.filter(e => e.status === 'Completed').length}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Completed</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <EduCard key={idx} edu={edu} index={idx} />
              ))}
            </div>
          </motion.div>

          {/* ── Certifications column ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <SectionLabel icon={FaMedal} label="Certifications" color="bg-gradient-to-br from-teal-500 to-cyan-600" />

            {/* total count badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-semibold mb-6">
              <FaTrophy size={13} className="text-teal-400" />
              {data.certifications.length} certifications earned
            </motion.div>

            <div className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <CertItem key={idx} cert={cert} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;