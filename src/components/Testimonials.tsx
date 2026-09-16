import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Building2, UserCheck, ShieldCheck } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Vikram Malhotra",
    role: "Facility Director",
    company: "Apex Tech Tower Complex",
    comment: "Perfect Air Solution designed and executed the 12-story VRF system for our commercial tower. Their engineering precision, ducting finish, and commitment to timeline were outstanding.",
    rating: 5,
  },
  {
    id: "2",
    name: "Dr. Ananya Sharma",
    role: "Chief Medical Administrator",
    company: "CityCare Multispecialty Hospital",
    comment: "Maintaining sterile environmental temperatures and HEPA ventilation is critical for our OT suites. Perfect Air Solution installed our AHUs and manages our AMC with flawless 24/7 support.",
    rating: 5,
  },
  {
    id: "3",
    name: "Rajesh Singhania",
    role: "General Manager",
    company: "Grand Horizon Hotel & Banquets",
    comment: "We replaced our aging central cooling with Perfect Air Solution's cassette and ductable AC systems. Energy consumption dropped noticeably, and guest satisfaction scores are at an all-time high.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#EEF8FF] via-[#F4FAFF] to-[#E6F4FA] text-slate-800 relative overflow-hidden">
      {/* Subtle background dot grid */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full mb-3 shadow-sm"
          >
            Client Feedback
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#051B30] tracking-tight"
          >
            Trusted by Commercial &amp; Residential Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base mt-3 font-normal"
          >
            See what property managers, hospital administrators, and hotel owners say about Perfect Air Solution.
          </motion.p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xl shadow-sky-900/5 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between relative group transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 text-slate-200 group-hover:text-sky-400/40 transition-colors" size={36} />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6 font-normal">
                  "{t.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0284C7] to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.role}, <span className="text-[#0284C7] font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust metrics bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">99.4%</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">On-Time Project Delivery</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">100%</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Certified Technicians</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">24/7</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">AMC Emergency Support</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">5,000+</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Cooling Systems Serviced</div>
          </div>
        </div>

      </div>
    </section>
  );
}
