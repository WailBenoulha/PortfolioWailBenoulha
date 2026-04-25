import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { Icon: FaLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/wail-benoulha/' },
    { Icon: FaGithub, label: 'GitHub', url: 'https://github.com/WailBenoulha' },
    { Icon: FaEnvelope, label: 'Email', url: 'mailto:wailbnlh@gmail.com' },
    { Icon: FaTwitter, label: 'Twitter', url: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [-200, 200, -200], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              W
            </div>
            <p className="text-gray-400 leading-relaxed">
              Full-stack developer passionate about building scalable and innovative solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Skills', 'Projects', 'Experience'].map((link) => (
                <li key={link}>
                  <motion.button
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-bold text-lg">Services</h3>
            <ul className="space-y-2">
              {['Full-Stack Dev', 'Backend Dev', 'DevOps', 'ML/AI'].map((service) => (
                <li key={service}>
                  <motion.button
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-bold text-lg">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-lg hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          origin="left"
        />

        {/* Bottom Section */}
        <motion.div
          className="py-8 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="text-gray-500 text-sm" variants={itemVariants}>
            © 2026 Wail Benoulha. All rights reserved.
          </motion.p>
          <motion.div className="flex items-center gap-6 text-sm" variants={containerVariants} initial="hidden" animate="visible">
            <motion.button
              className="text-gray-400 hover:text-white transition-colors duration-300"
              variants={itemVariants}
            >
              Privacy Policy
            </motion.button>
            <motion.button
              className="text-gray-400 hover:text-white transition-colors duration-300"
              variants={itemVariants}
            >
              Terms of Service
            </motion.button>
            <motion.button
              className="text-gray-400 hover:text-white transition-colors duration-300"
              variants={itemVariants}
            >
              Contact
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <FaArrowUp className="text-lg" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
