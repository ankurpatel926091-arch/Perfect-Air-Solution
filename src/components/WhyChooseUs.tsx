import { motion } from "framer-motion";
import { Award, Wrench, ShieldCheck, Zap, Headphones, CheckCircle2, Sparkles, Star, Clock } from "lucide-react";
import showcaseImg from "@/assets/why_choose_showcase.jpg";
import indoorImg from "@/assets/why_choose_indoor.jpg";

const features = [
  {
    icon: Award,
    title: "Quality Solutions",
    tag: "Premium Brands",
    description: "Tailored HVAC designs using certified equipment from Daikin, Blue Star, Voltas, Carrier, and Hitachi.",
    bullets: ["OEM Certified Equipment", "Custom Heat Load Design"],
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    tag: "Certified Engineers",
    description: "Precision copper piping, nitrogen pressure leak testing, and calibrated CFM airflow balancing.",
    bullets: ["Zero-Leak Guarantee", "Vacuum Pressure Testing"],
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Maintenance",
    tag: "< 2 Hour Response",
    description: "Comprehensive Annual Maintenance Contracts (AMC) with scheduled preventive servicing and 24/7 support.",
    bullets: ["Preventive Servicing", "Rapid Breakdown Dispatch"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Zap,
    title: "Energy Efficient Systems",
    tag: "Save Up to 40% Power",
    description: "Cutting-edge inverter and VRF technologies engineered to slash annual operational electricity costs.",
    bullets: ["High ISEER Ratings", "Smart Inverter Controls"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Headphones,
    title: "Professional Support",
    tag: "Dedicated Lead",
    description: "Direct access to senior HVAC engineers with transparent upfront quotes and zero hidden charges.",
    bullets: ["Free Site Audit", "Dedicated Project Manager"],
    color: "from-cyan-500 to-sky-600",
  },
];

const trustPoints = [
  { icon: Award, label: "Authorized Brand Partner", sub: "Daikin, Blue Star & Carrier" },
  { icon: Zap, label: "Energy Savings Guarantee", sub: "Optimized VRF Systems" },
  { icon: ShieldCheck, label: "1-Year Workmanship Warranty", sub: "100% Quality Assurance" },
  { icon: Clock, label: "24/7 Emergency Support", sub: "Rapid Service Hotline" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F4FAFE] via-[#FFFFFF] to-[#EBF6FC] font-sans relative overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#0695CD] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0695CD] animate-pulse" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#082A45] tracking-tight leading-tight mb-4">
            Why Choose{" "}
            <span className="text-[#0695CD] relative inline-block">
              Perfect Air Solution
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Discover what sets Perfect Air Solution apart — technical excellence, certified engineers, transparent pricing, and an unwavering commitment to customer comfort.
          </p>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Clean Visual Photo Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 relative flex flex-col justify-between"
          >
            {/* Main Visual Image Wrapper */}
            <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={showcaseImg}
                alt="HVAC Engineer Testing VRF Outdoor System"
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#082A45]/90 via-[#082A45]/30 to-slate-900/40" />

              {/* Top-Left Glass Badge: Rating & Happy Clients */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/80 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-[#082A45]">4.9 / 5.0</span>
                    <span className="text-[10px] text-amber-500 font-semibold">★★★★★</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">5,000+ Happy Clients in UP</p>
                </div>
              </div>

              {/* Top-Right Badge: Experience Seal */}
              <div className="absolute top-4 right-4 z-20 bg-[#082A45]/85 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-white flex items-center gap-2 text-xs font-semibold shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#0695CD]" />
                <span>12+ Years Exp.</span>
              </div>

              {/* Middle-Left Glass Badge: Energy Savings */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-emerald-100 shadow-xl flex items-center gap-3 max-w-[220px]">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 block leading-tight">Up to 40% Savings</span>
                  <span className="text-[10px] text-slate-500 font-medium">Inverter & VRF Systems</span>
                </div>
              </div>

              {/* Bottom-Right Inset Thumbnail: Indoor AC Showcase */}
              <div className="absolute bottom-4 right-4 z-20 w-36 sm:w-44 rounded-xl overflow-hidden border-2 border-white shadow-2xl bg-slate-900">
                <img
                  src={indoorImg}
                  alt="Modern Indoor Air Conditioning Cooling"
                  className="w-full h-24 object-cover"
                />
                <div className="p-1.5 bg-slate-900/90 backdrop-blur-md text-white text-center">
                  <span className="text-[10px] font-bold text-sky-300 block">Indoor Air Quality</span>
                  <span className="text-[9px] text-slate-300">Clean & Silent Cooling</span>
                </div>
              </div>

              {/* Bottom-Left Engineer Tagline */}
              <div className="absolute bottom-4 left-4 z-20 max-w-[200px] text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0695CD] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                  OEM Certified
                </span>
                <p className="text-xs font-semibold text-sky-100 leading-snug">
                  Precision HVAC Installation & AMC Servicing
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: Clean Feature Cards List */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            {features.map((f, i) => {
              const IconComp = f.icon;
              return (
                <motion.div
                  key={f.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-sky-100/90 shadow-sm hover:shadow-md hover:border-[#0695CD]/40 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 group"
                >
                  {/* Icon Box */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/15`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#082A45] group-hover:text-[#0695CD] transition-colors">
                        {f.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-[#0695CD] text-[11px] font-semibold">
                        {f.tag}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-2">
                      {f.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      {f.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Bottom Trust & Guarantee Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-14 pt-8 border-t border-sky-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trustPoints.map((tp) => {
            const TpIcon = tp.icon;
            return (
              <div
                key={tp.label}
                className="p-3.5 rounded-xl bg-white/90 border border-sky-100 flex items-center gap-3 shadow-sm hover:shadow transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-100/70 text-[#0695CD] flex items-center justify-center shrink-0">
                  <TpIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#082A45] leading-snug">{tp.label}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{tp.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}