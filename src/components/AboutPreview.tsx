import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Leaf, ArrowRight, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "./ui/CountUp";
import aboutImg from "../assets/about_ac_showcase.jpg";

const stats = [
  { value: 5000, suffix: "+", label: "Customers" },
  { value: 650, suffix: "+", label: "Commercial Projects" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Cities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#E6F4FA] via-[#F4FAFF] to-[#E6F4FA] font-sans relative overflow-hidden">
      {/* Background Dot Overlay */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,rgba(2,132,199,0.12)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 2-Column Section (Reference Photo 2 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
              <Snowflake size={14} className="text-[#0284C7]" />
              <span>PERFECT AIR SOLUTION</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-[1.2] mb-4">
              Premier HVAC &amp; Cooling Experts{" "}
              <span className="text-[#0284C7]">Uttar Pradesh</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
              Perfect Air Solution is a leading HVAC and air conditioning solutions provider based in Uttar Pradesh, delivering reliable installation, maintenance, and large-scale commercial cooling projects across the state. With strong technical expertise and years of hands-on industry experience, we provide complete climate control solutions for residential, commercial, and industrial spaces.
            </p>

            {/* 3 Feature Boxes (Photo 2 Reference) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-md border border-sky-100 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-sky-100 flex items-center justify-center text-[#0284C7] flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[#051B30] font-bold text-xs leading-tight">Precision Installation</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">Best-in-class setup</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-md border border-sky-100 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-sky-100 flex items-center justify-center text-[#0284C7] flex-shrink-0">
                  <Wrench size={20} />
                </div>
                <div>
                  <h4 className="text-[#051B30] font-bold text-xs leading-tight">Expert Technicians</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">Skilled &amp; Certified</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-md border border-sky-100 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-sky-100 flex items-center justify-center text-[#0284C7] flex-shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="text-[#051B30] font-bold text-xs leading-tight">Energy Efficient</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">Sustainable Cooling</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — FEATURED AC GRAPHIC CARD (Photo 2 Reference) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-md overflow-hidden shadow-2xl shadow-sky-500/15 border-4 border-white bg-white group">
              <img
                src={aboutImg}
                alt="Perfect Air Solution HVAC Cooling Setup Showcase"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051B30]/40 via-transparent to-transparent opacity-60" />
            </div>
          </div>

        </div>

        {/* BOTTOM STATS ROW (Photo 2 Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 MT-0 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-gradient-to-br from-[#051B30] to-[#0284C7] text-white rounded-md p-6 text-center shadow-lg shadow-sky-900/20 flex flex-col items-center justify-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-2">
                <CountUp from={0} to={s.value} duration={1.2} separator="," direction="up" startWhen={true} />
                {s.suffix}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}