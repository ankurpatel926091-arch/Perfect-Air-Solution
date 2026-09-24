import { motion } from "framer-motion";
import { Shield, Eye, Database, Lock, UserCheck, Mail, Phone, CheckCircle2, Sparkles, FileText, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const keyHighlights = [
  { icon: Lock, title: "100% Secure Data", desc: "Industry-grade encryption for transactions & personal records" },
  { icon: Eye, title: "Zero Data Selling", desc: "We never sell or rent your personal info to third parties" },
  { icon: UserCheck, title: "Full User Control", desc: "Easily access, update, or request deletion of your information" },
];

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    tag: "Data Collection",
    content: [
      "Personal information such as your full name, email address, phone number, and physical delivery/site address when you place an order, book a service, or submit an inquiry.",
      "Technical data including your IP address, browser type, operating system, and device details collected automatically through standard secure server logs.",
      "Usage analytics such as pages viewed, session duration, and click pathways to improve website navigation and service responsiveness.",
      "Service history including previous HVAC installations, service requests, and warranty registrations to provide personalized ongoing support.",
    ],
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    tag: "Data Usage",
    content: [
      "To process, confirm, and fulfill your orders, including doorstep delivery and certified HVAC equipment installation.",
      "To communicate important updates regarding your order status, service appointments, and customer support inquiries.",
      "To send timely maintenance reminders, seasonal HVAC care tips, and exclusive offers (you can unsubscribe anytime).",
      "To enhance our technical services, optimize site speed, and maintain system security via aggregate analytics.",
    ],
  },
  {
    icon: Lock,
    title: "3. Data Security & Storage",
    tag: "Protection",
    content: [
      "We implement industry-standard 256-bit SSL encryption and strict access controls across all customer databases.",
      "All payment transactions are handled through PCI-DSS compliant secure payment gateways. We never store credit or debit card details on our servers.",
      "Access to your personal data is strictly limited to authorized personnel who require it to perform specific installation or maintenance tasks.",
      "Regular vulnerability assessments and security audits are conducted to safeguard data against unauthorized access or breaches.",
    ],
  },
  {
    icon: UserCheck,
    title: "4. Your Privacy Rights & Choices",
    tag: "User Control",
    content: [
      "Right to Access: You may request a complete copy of the personal information we currently hold on file.",
      "Right to Correction: You can ask us to update or correct any inaccurate, outdated, or incomplete details.",
      "Right to Erasure: You have the right to request deletion of your personal data where retention is no longer required by law.",
      "Opt-Out: You can unsubscribe from marketing SMS and email notifications at any time via the unsubscribe link or direct contact.",
    ],
  },
  {
    icon: FileText,
    title: "5. Cookies & Tracking Technologies",
    tag: "Preferences",
    content: [
      "We use essential session cookies to remember your navigation state and ensure the cart and checkout operate smoothly.",
      "Analytics cookies help us understand aggregate traffic trends and popular product categories to enhance user experience.",
      "You have full liberty to disable or manage cookie preferences via your web browser settings at any time without restricting core site access.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="font-sans min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex justify-center mb-3">
            <Breadcrumb variant="dark" />
          </div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm">
              <Shield size={14} className="text-cyan-400" />
              <span>LEGAL &amp; COMPLIANCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-[#38BDF8]">Policy</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-4">
              We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Sparkles size={12} className="text-cyan-400" />
              <span>Last updated: March 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Highlights Strip ── */}
      <section className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {keyHighlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 text-[#0284C7]">
                <item.icon size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#051B30] mb-0.5">{item.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Detailed Policy Sections ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                    <s.icon size={20} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#051B30] tracking-tight">{s.title}</h2>
                </div>
                <span className="text-[11px] font-bold text-[#0284C7] bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {s.tag}
                </span>
              </div>

              <ul className="space-y-3.5">
                {s.content.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                    <CheckCircle2 size={18} className="text-[#0284C7] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Contact Support Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-gradient-to-br from-[#051B30] to-[#0B2E4C] text-white p-6 sm:p-8 shadow-lg border border-slate-700/80 mt-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Mail size={13} />
                  <span>PRIVACY OFFICER</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
                  Have questions about your data privacy?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-normal">
                  Our compliance team is here to assist you with data requests, account updates, or privacy questions.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Corporate Office: Perfect Air Solution, Civil Lines, Uttar Pradesh 241001.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="mailto:info@perfectairsolution.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0284C7] hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Mail size={16} />
                  <span>Email Us</span>
                </a>
                <a
                  href="tel:+918429152092"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-colors"
                >
                  <Phone size={16} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
