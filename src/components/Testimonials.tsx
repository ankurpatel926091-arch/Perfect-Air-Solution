import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, ShieldCheck, Clock, Award, ThumbsUp, Sparkles, Building2, Stethoscope, Hotel } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  tag: string;
  icon: React.ElementType;
  comment: string;
  rating: number;
  avatarLetter: string;
  gradient: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Vikram Malhotra",
    role: "Facility Director",
    company: "Apex Tech Tower Complex",
    tag: "Commercial Real Estate",
    icon: Building2,
    comment: "Perfect Air Solution designed and executed the 12-story VRF system for our commercial tower. Their engineering precision, ducting finish, and commitment to timeline were outstanding.",
    rating: 5,
    avatarLetter: "V",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "2",
    name: "Dr. Ananya Sharma",
    role: "Chief Medical Administrator",
    company: "CityCare Multispecialty Hospital",
    tag: "Healthcare & OT Suites",
    icon: Stethoscope,
    comment: "Maintaining sterile environmental temperatures and HEPA ventilation is critical for our OT suites. Perfect Air Solution installed our AHUs and manages our AMC with flawless 24/7 support.",
    rating: 5,
    avatarLetter: "A",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    id: "3",
    name: "Rajesh Singhania",
    role: "General Manager",
    company: "Grand Horizon Hotel & Banquets",
    tag: "Hospitality & Luxury",
    icon: Hotel,
    comment: "We replaced our aging central cooling with Perfect Air Solution's cassette and ductable AC systems. Energy consumption dropped noticeably, and guest satisfaction scores are at an all-time high.",
    rating: 5,
    avatarLetter: "R",
    gradient: "from-blue-600 to-indigo-600",
  },
];

const metrics = [
  {
    icon: Clock,
    value: "99.4%",
    label: "On-Time Project Delivery",
    desc: "Strict adherence to commercial timelines",
  },
  {
    icon: Award,
    value: "100%",
    label: "Certified Technicians",
    desc: "OEM trained HVAC specialists",
  },
  {
    icon: ShieldCheck,
    value: "24/7",
    label: "AMC Emergency Support",
    desc: "Instant breakdown assistance",
  },
  {
    icon: ThumbsUp,
    value: "5,000+",
    label: "Cooling Systems Serviced",
    desc: "Trusted by top industry leaders",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#F0F8FF] via-[#F6FBFF] to-[#EBF5FA] text-slate-800 relative overflow-hidden font-sans">
      {/* Background glow and dot matrix decoration */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-sky-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 via-cyan-500/15 to-sky-500/10 border border-sky-300/40 text-[#0284C7] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
            <span>Client Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#051B30] tracking-tight leading-tight"
          >
            Trusted by Commercial &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent">
              Residential Clients
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg mt-4 font-medium leading-relaxed"
          >
            See what property managers, hospital administrators, and hotel owners say about our engineering excellence.
          </motion.p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => {
            const SectorIcon = t.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-xl shadow-sky-950/5 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between relative group transition-all duration-300 overflow-hidden"
              >
                {/* Top color gradient highlight bar on hover */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${t.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

                {/* Subtle watermark quote icon */}
                <Quote className="absolute top-6 right-6 text-slate-150 group-hover:text-cyan-400/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 w-10 h-10 pointer-events-none" />

                <div>
                  {/* Sector Tag & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/70 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors">
                      <SectorIcon className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{t.tag}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-lg">
                      <div className="flex text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 ml-1">5.0</span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal mb-8 relative z-10">
                    "{t.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-slate-100/90 flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-white font-bold text-base shadow-md shadow-sky-900/15 shrink-0`}>
                    {t.avatarLetter}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors flex items-center gap-1.5 truncate">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 fill-cyan-500/10 shrink-0" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {t.role}, <span className="text-[#0284C7] font-semibold">{t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Glassmorphic Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-sky-950/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {metrics.map((m, i) => {
            const MetricIcon = m.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-2 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-50 to-cyan-100 border border-cyan-200/60 flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <MetricIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#051B30] group-hover:text-[#0284C7] transition-colors tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                    {m.label}
                  </div>
                  <div className="text-[12px] text-slate-500 mt-0.5 font-normal">
                    {m.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

