import { motion } from "framer-motion";
import { FileText, ShoppingCart, Truck, AlertTriangle, Scale, Gavel, Mail, Phone, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const keyHighlights = [
  { icon: ShieldCheck, title: "OEM Warranty Backed", desc: "All HVAC units carry official manufacturer warranty coverage" },
  { icon: Truck, title: "Certified Delivery", desc: "Safe transit, site delivery, and expert technician installation" },
  { icon: Scale, title: "Fair & Transparent", desc: "Clear pricing, upfront quotations, and no hidden charges" },
];

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    tag: "General",
    content: [
      "By accessing or using the Perfect Air Solution website, booking HVAC services, or placing product orders, you agree to be bound by these Terms & Conditions.",
      "We reserve the right to revise or update these terms periodically. Continued engagement with our services constitutes active acceptance of any changes.",
      "All digital assets, technical drawings, branding, and website content remain the exclusive intellectual property of Perfect Air Solution.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "2. Orders, Pricing & Payments",
    tag: "Billing",
    content: [
      "All product orders and AMC contracts are subject to unit availability and engineering inspection confirmation. We reserve the right to adjust or cancel orders in cases of stock unavailability or technical incompatibility.",
      "Prices displayed on our platform are in Indian Rupees (INR) and include GST unless explicitly mentioned as an ex-warehouse commercial quote.",
      "Payment terms: 100% advance for standard residential units; staged milestones for commercial VRF and chiller projects as outlined in individual contract agreements.",
      "We accept all major secure payment methods: UPI, Net Banking, Credit/Debit cards, and Bank RTGS/NEFT transfers.",
    ],
  },
  {
    icon: Truck,
    title: "3. Delivery & On-Site Installation",
    tag: "Logistics",
    content: [
      "Delivery schedules are coordinated post-order confirmation. Our dispatch team contacts you to schedule an optimal delivery and technician arrival slot.",
      "Site Readiness: The client is responsible for ensuring adequate power supply (proper voltage, MCB, and earthing) and clear physical access for indoor/outdoor unit mounting.",
      "Standard installation includes piping and bracket accessories specified in the service package. Additional copper tubing, core cutting, or heavy masonry work will be billed at standard itemized rates.",
      "Any transit damage must be inspected upon delivery and reported within 24 hours to initiate priority replacement.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "4. Warranty & Workmanship Guarantee",
    tag: "Warranty",
    content: [
      "All air conditioning units (Split, Window, Cassette, VRF) carry primary manufacturer warranties on compressors and electronic circuit boards (PCB).",
      "Perfect Air Solution provides a dedicated workmanship service warranty on our installation and ductwork as specified on the installation invoice.",
      "Warranty does not cover damages arising from voltage fluctuations, unauthorized third-party repairs, external tampering, or improper physical handling.",
      "Routine annual maintenance by certified engineers is recommended to maintain optimal compressor health and preserve manufacturer warranty terms.",
    ],
  },
  {
    icon: Scale,
    title: "5. Limitation of Liability & Dispute Resolution",
    tag: "Legal",
    content: [
      "Perfect Air Solution shall not be liable for incidental, indirect, or consequential damages resulting from improper third-party usage or unauthorized electrical modifications.",
      "In the unlikely event of any disagreement, parties agree to seek amicable resolution through good-faith customer service mediation first.",
      "Any unresolved legal dispute shall fall under the jurisdiction of the competent courts of Uttar Pradesh, India.",
    ],
  },
];

const TermsConditions = () => {
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
              <Gavel size={14} className="text-cyan-400" />
              <span>LEGAL AGREEMENT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
              Terms &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-[#38BDF8]">Conditions</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-4">
              Please review these service terms carefully before booking air conditioning solutions, HVAC products, or engineering contracts.
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

          {/* ── Support & Legal Inquiry Card ── */}
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
                  <span>LEGAL &amp; COMMERCIAL DESK</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
                  Need clarification on project contracts or terms?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-normal">
                  Our commercial team is available to discuss custom project scope, AMC contracts, or tender requirements.
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
                  <span>Email Inquiries</span>
                </a>
                <a
                  href="tel:+918429152092"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-colors"
                >
                  <Phone size={16} />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
