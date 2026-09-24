import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import perfectAirLogo from "../assets/perfect-air-logo-white.png";
import cclogo from "../assets/cc-logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/product" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
   { label: "blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
  { label: "Refund Policy", to: "/refund-policy" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const SiteFooter = () => {
  const servicesList = [
    { title: "AC Installation", to: "/service/ac-installation" },
    { title: "AC Repair & Service", to: "/service/ac-repair-service" },
    { title: "AC Maintenance", to: "/service/ac-maintenance" },
    { title: "Ventilation Solutions", to: "/service/ventilation-solutions" },
    { title: "Annual Maintenance Contract", to: "/service/annual-maintenance-contract" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.01 }}
      variants={containerVariants}
      className="bg-[#051B30] text-slate-200 border-t border-slate-800 mt-0"
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 3,
          background: "linear-gradient(90deg, #0284C7, #38BDF8, #0284C7)",
          transformOrigin: "left",
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-stretch">
          
          {/* Brand Column */}
          <motion.div variants={colVariants} className="lg:pr-4 flex flex-col justify-between h-full">
            <div>
              <Link
                to="/"
                aria-label="Perfect Air Solution – Home"
                className="inline-block group mb-1"
              >
                <img
                  src={perfectAirLogo}
                  alt="Perfect Air Solution"
                  className="h-10 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <p className="text-[14px] leading-relaxed mb-2 text-slate-200 font-normal">
                Perfect Air Solution is a leading HVAC and air conditioning company offering turnkey residential, commercial, and industrial solutions.
              </p>
              <p className="text-[14px] leading-relaxed mb-1 text-slate-200 font-normal">
                Certified HVAC Engineers & Technicians
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-[#0284C7] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-700/60"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants}>
            <p className="text-sm font-extrabold text-cyan-300 uppercase tracking-[0.2em] mb-3.5">
              Quick Links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-base font-normal text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-all duration-200 text-decoration-none group"
                  >
                    <ChevronRight size={15} className="text-[#0284C7] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* HVAC Services */}
          <motion.div variants={colVariants}>
            <p className="text-sm font-extrabold text-cyan-300 uppercase tracking-[0.2em] mb-3.5">
              Our Services
            </p>
            <ul className="space-y-2">
              {servicesList.map((s) => (
                <li key={s.title}>
                  <Link
                    to={s.to}
                    className="text-base font-normal text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-all duration-200 text-decoration-none group"
                  >
                    <ChevronRight size={15} className="text-[#0284C7] group-hover:translate-x-1 transition-transform" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={colVariants}>
            <p className="text-sm font-extrabold text-cyan-300 uppercase tracking-[0.2em] mb-3.5">
              Contact Us
            </p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919839171701" className="flex items-start gap-3 group text-decoration-none">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-semibold">Phone Call / WhatsApp</p>
                    <p className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">+91 84291 52092</p>
                  </div>
                </a>
              </li>

              <li>
                <a href="mailto:info@perfectairsolution.com" className="flex items-start gap-3 group text-decoration-none">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-semibold">Email Support</p>
                    <p className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">info@perfectairsolution.com</p>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5 font-semibold">Corporate Office</p>
                    <p className="text-sm text-slate-200 font-medium leading-normal">Perfect Air Solution Centre, Civil Lines, Uttar Pradesh 241001</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Bottom Copyright Bar - Bold Removed (font-normal) */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-sm sm:text-base text-slate-200 font-normal">
            © {new Date().getFullYear()} Perfect Air Solution. All rights reserved.
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center text-sm sm:text-base font-normal">
            {policyLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-slate-300 hover:text-cyan-300 text-decoration-none transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a
            href="https://www.codecrafter.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm sm:text-base text-slate-200 hover:text-white transition-colors text-decoration-none"
          >
            <span className="font-normal">Designed by</span>
            <img src={cclogo} alt="CodeCrafter" className="h-10 sm:h-12 w-auto object-contain brightness-125 hover:scale-105 transition-transform" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default SiteFooter;