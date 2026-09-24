import { motion } from "framer-motion";
import { RotateCcw, CheckCircle, XCircle, Clock, CreditCard, Mail, Phone, HelpCircle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const keyHighlights = [
  { icon: Clock, title: "7-Day Return Window", desc: "Initiate return or replacement requests within 7 days of delivery" },
  { icon: CreditCard, title: "Fast 5–7 Days Refund", desc: "Refunds credited directly to your original payment method or bank" },
  { icon: ShieldCheck, title: "100% Transit Assurance", desc: "Free replacement for any unit with verified transit damage" },
];

const sections = [
  {
    icon: CheckCircle,
    iconColor: "from-emerald-500 to-teal-500",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-100",
    title: "1. Eligible for Refund & Replacement",
    tag: "Approved Cases",
    content: [
      "Transit Damage: Products received with physical defects or shipping damage — please notify us within 24 hours of delivery with unboxing photos or videos.",
      "Incorrect Item Delivered: In the rare case you receive a different AC tonnage, model, or brand from what you ordered, we arrange priority same-week exchange or full refund at zero extra cost.",
      "Order Cancellation Prior to Dispatch: Full 100% refund processed within 5–7 business days if cancelled before the unit departs our logistics facility.",
      "Service Unfulfillment: If a booked installation or AMC visit cannot be executed due to technical limitations on our end, an immediate full or pro-rata refund will be issued.",
    ],
  },
  {
    icon: XCircle,
    iconColor: "from-rose-500 to-red-500",
    badgeColor: "text-rose-700 bg-rose-50 border-rose-100",
    title: "2. Non-Refundable Scenarios",
    tag: "Exclusions",
    content: [
      "Installed & Operating Units: Once an air conditioner has been mounted, piped, and commissioned on-site, it is covered under manufacturer warranty rather than immediate product returns.",
      "Improper Physical Handling: Damage resulting from non-certified third-party tampering, power surge spikes, or non-compliance with manufacturer voltage requirements.",
      "Consumable Accessories: Opened copper pipes, refrigerants/gas recharges, chemical wash materials, and air filters once unsealed or applied.",
      "Change of Mind After Installation: Returns cannot be accepted solely due to aesthetic preference after completion of structural wall mounting.",
    ],
  },
  {
    icon: Clock,
    iconColor: "from-[#0284C7] to-cyan-400",
    badgeColor: "text-[#0284C7] bg-sky-50 border-sky-100",
    title: "3. Refund Timelines & Settlement",
    tag: "Timeline",
    content: [
      "Claim Initiation: Return requests must be registered with our customer desk within 7 calendar days of delivery.",
      "Inspection & Verification: Our technical team reviews supporting media or conducts a brief site inspection within 24–48 hours.",
      "Disbursement: Once approved, electronic refunds are initiated within 5–7 business days to the source payment method.",
      "Cash on Delivery Orders: COD refunds are securely transferred via direct NEFT/IMPS to your verified bank account details.",
      "You will receive transparent SMS and email confirmations at each progression checkpoint of the refund cycle.",
    ],
  },
  {
    icon: RotateCcw,
    iconColor: "from-indigo-500 to-sky-500",
    badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-100",
    title: "4. Product Exchange Guidelines",
    tag: "Exchanges",
    content: [
      "Eligible products can be exchanged for alternative tonnage (e.g. upgrading 1.5 Ton to 2.0 Ton) or higher-tier inverter series within 7 days of delivery.",
      "The returned unit must be unused, in its original pristine manufacturer box, with all manuals, warranties, and remote controls intact.",
      "Any price differential between the exchanged products can be paid online or adjusted against the final installation billing.",
    ],
  },
  {
    icon: CreditCard,
    iconColor: "from-sky-600 to-blue-600",
    badgeColor: "text-sky-700 bg-sky-50 border-sky-100",
    title: "5. How to Initiate a Claim",
    tag: "Step-by-Step",
    content: [
      "Step 1: Contact our support desk via email at info@perfectairsolution.com or call +91 84291 52092.",
      "Step 2: Share your invoice number, product serial number, and a brief description accompanied by photographs.",
      "Step 3: Our technical support representative will provide a Return Authorization Number (RAN) and dispatch an inspector or courier pickup.",
      "Step 4: Upon warehouse verification, your exchange or bank refund will be processed promptly.",
    ],
  },
];

const RefundPolicy = () => {
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
              <HelpCircle size={14} className="text-cyan-400" />
              <span>CUSTOMER ASSURANCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans">
              Refund &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-[#38BDF8]">Cancellation</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-4">
              Your satisfaction and trust are our top priorities. Learn about our clear, fair, and hassle-free return and refund procedures.
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
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${s.iconColor} flex items-center justify-center text-white shadow-md`}>
                    <s.icon size={20} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#051B30] tracking-tight">{s.title}</h2>
                </div>
                <span className={`text-[11px] font-bold border px-3 py-1 rounded-full uppercase tracking-wider ${s.badgeColor}`}>
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

          {/* ── Customer Help Desk Card ── */}
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
                  <RotateCcw size={13} />
                  <span>REFUND DESK</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
                  Need help with a return, refund, or exchange?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-normal">
                  Our customer care team is available Monday to Saturday (9:00 AM – 7:00 PM) to help you resolve your request promptly.
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
                  <span>Email Refund Desk</span>
                </a>
                <a
                  href="tel:+918429152092"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-colors"
                >
                  <Phone size={16} />
                  <span>Call Support</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
