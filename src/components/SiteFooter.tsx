import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, UserCheck, ArrowRight, Clock, Shield, ChevronRight } from "lucide-react";
import cclogo from "../assets/cc-logo.png";
import Logo from "../assets/Logo.png";
import { useGetServicesQuery, useGetProjectsQuery } from "@/store/api";

const quickLinks = [
  { label: "Home",         to: "/" },
  { label: "Our Story",    to: "/about" },
  { label: "All Products", to: "/shop" },
  { label: "Our Projects", to: "/case-studies" },
  { label: "Brands",       to: "/brands" },
  { label: "Blog",         to: "/blog" },
  { label: "Contact Us",   to: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy",    to: "/privacy-policy" },
  { label: "Terms & Conditions",to: "/terms-conditions" },
  { label: "Refund Policy",     to: "/refund-policy" },
];

const socialLinks = [
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube,   label: "YouTube",   href: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const SiteFooter = () => {
  const { data: services, isLoading: servicesLoading, isError: servicesError } = useGetServicesQuery();
  const { data: projects } = useGetProjectsQuery();

  return (
    <motion.footer
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.01 }}
      variants={containerVariants}
      style={{ background: "linear-gradient(160deg, hsl(var(--brand-dark)) 0%, #051B30 50%, hsl(var(--brand-dark)) 100%)" }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 3,
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-light)), hsl(var(--primary)))",
          transformOrigin: "left",
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <motion.div variants={colVariants} className="lg:pr-6">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link 
  to="/" 
  style={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    textDecoration: "none" 
  }}
>
  <img
    src={Logo}
    alt="LIMRA Sales & Services"
    style={{ height: "70px", width: "auto", backgroundColor: "white", padding: "5px", marginBottom: "10px" }}
  />
</Link>
            </motion.div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>
              Established in 2012, we are Hardoi's most trusted HVAC partner — delivering expert AC installation, maintenance, and sales for homes &amp; businesses.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: Shield, text: "14+ Years of Trusted Service" },
                { icon: Clock,  text: "Mon – Sat: 9:00 AM – 7:00 PM" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <Icon size={14} style={{ color: "hsl(var(--brand-light))" }} />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.label} href={s.href} aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.18, y: -3 }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(var(--primary) / 0.19)";
                    e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.31)";
                    e.currentTarget.style.color = "hsl(var(--brand-light))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  }}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Quick Links</p>
            <motion.ul
              className="space-y-2.5"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {quickLinks.map((l) => (
                <motion.li key={l.label} variants={linkItemVariants}>
                  <Link
                    to={l.to}
                    className="text-sm flex items-center gap-1.5 transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "hsl(var(--brand-light))";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <ChevronRight size={13} style={{ color: "hsl(var(--brand-light))", opacity: 0.7, flexShrink: 0 }} />
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Our Services</p>
            {servicesLoading ? (
              <div className="space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                    className="h-4 rounded"
                    style={{ background: "rgba(255,255,255,0.06)", width: `${60 + i * 10}%` }}
                  />
                ))}
              </div>
            ) : servicesError ? (
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Unable to load services</p>
            ) : (
              <ul className="space-y-2.5">
                {services && services.length > 0 ? (
                  [...services].reverse().slice(0, 6).map((s: any) => (
                    <li key={s._id || s.id}>
                      <Link
                        to={`/service/${s.slug}`}
                        className="text-sm flex items-center gap-1.5 transition-all duration-200"
                        style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "hsl(var(--brand-light))";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <ChevronRight size={13} style={{ color: "hsl(var(--brand-light))", opacity: 0.7, flexShrink: 0 }} />
                        {s.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>No services available.</li>
                )}
              </ul>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-bold text-white uppercase tracking-[0.16em] mb-5">Contact Us</p>
            <ul className="space-y-4 mb-6">
              {[
                { href: "tel:+919839171701", Icon: Phone, label: "Phone", value: "+91 98391 71701" },
                { href: "mailto:info@limrasales.com", Icon: Mail, label: "Email", value: "info@limrasales.com" },
                { href: "https://maps.google.com/?q=184,+New+Civil+Lines,+Hardoi,+Uttar+Pradesh+241001", Icon: MapPin, label: "Location", value: "184, New Civil Lines, Hardoi, Uttar Pradesh 241001", target: "_blank" },
              ].map(({ href, Icon, label, value, target }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <motion.a
                    href={href} target={target}
                    rel={target ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 group"
                    style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
                    whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--brand-light))"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsl(var(--primary) / 0.08)" }}
                      whileHover={{ scale: 1.15, background: "hsl(var(--primary) / 0.19)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon size={14} style={{ color: "hsl(var(--brand-light))" }} />
                    </motion.div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* Admin Login */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/admin" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)", textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <UserCheck size={14} /> Admin Portal <ArrowRight size={12} style={{ marginLeft: 2 }} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              © {new Date().getFullYear()} LIMRA Sales &amp; Services. All rights reserved.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {policyLinks.map((l) => (
                <Link
                  key={l.label} to={l.to}
                  className="text-xs flex items-center gap-1 transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--brand-light))"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                >
                  {l.label} <ArrowRight size={10} style={{ opacity: 0.6 }} />
                </Link>
              ))}
            </div>

            <a
              href="https://www.codecrafter.co.in/" target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden"
              style={{ textDecoration: "none" }}
            >
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/80 transition-colors duration-500 uppercase z-10">
                Designed by
              </span>
              <div className="relative flex items-center z-10">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 via-white/20 to-white/0 blur-xl opacity-100 transition-all duration-700 ease-out scale-110" />
                <img
                  src={cclogo} alt="CodeCrafter"
                  className="w-[85px] opacity-100 scale-105 transition-all duration-500 filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10"
                />
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default SiteFooter;
