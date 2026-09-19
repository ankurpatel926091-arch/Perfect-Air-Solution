import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Target, ArrowRight, Clock, Users, Building, MapPin, Zap, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import CTASection from "@/components/CTASection";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers", icon: Users, color: "from-[#0091FF] to-[#00D4FF]", shadow: "rgba(0,180,255,0.4)" },
  { value: 500, suffix: "+", label: "Commercial Projects", icon: Building, color: "from-[#00C9A7] to-[#00E5BC]", shadow: "rgba(0,210,180,0.4)" },
  { value: 14, suffix: "+", label: "Years Experience", icon: Award, color: "from-[#903AFF] to-[#B666FF]", shadow: "rgba(160,85,255,0.4)" },
  { value: 20, suffix: "+", label: "Cities Covered", icon: MapPin, color: "from-[#FF9F1C] to-[#FFC107]", shadow: "rgba(255,159,28,0.4)" },
];

const values = [
  {
    icon: Shield,
    title: "Reliability & Trust",
    tag: "100% Commitment",
    desc: "We stand behind every AC installation and industrial cooling project with dependable service, strong workmanship, and responsive after-sales support.",
    bullets: ["24/7 Rapid Response", "Dependable Workmanship"],
    gradient: "from-sky-500 to-blue-600",
  },
  {
    icon: Award,
    title: "Engineering Excellence",
    tag: "Precision First",
    desc: "We deliver HVAC solutions with certified technicians, premium components, and no shortcuts. Every project reflects our technical precision.",
    bullets: ["Certified Technicians", "OEM Parts Guarantee"],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    icon: CheckCircle,
    title: "Strict Quality Assurance",
    tag: "ISO Quality",
    desc: "Through rigorous performance testing, we guarantee reliable and energy-efficient air conditioning systems across all installations.",
    bullets: ["Pressure Leakage Testing", "CFM Airflow Balancing"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Target,
    title: "Modern Innovation",
    tag: "Smart Tech",
    desc: "We continuously adopt modern, energy-efficient, and smart HVAC technologies to deliver advanced cooling solutions for all sectors.",
    bullets: ["Inverter & VRF Systems", "Eco-Smart Controls"],
    gradient: "from-amber-500 to-orange-600",
  },
];

const milestones = [
  {
    year: "2012",
    text: "Founded as a specialized AC service workshop with a vision to deliver reliable cooling solutions across Northern India.",
  },
  {
    year: "2020",
    text: "Expanded services across multiple districts and built a strong base in residential and commercial HVAC projects.",
  },
  {
    year: "2023",
    text: "Entered commercial and industrial cooling sector including VRF systems, Cold Rooms, and Heavy-tonnage Chiller Plants.",
  },
  {
    year: "2024+",
    text: "Successfully completed 500+ commercial projects, strengthening our position as a premier turnkey HVAC partner.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => (
  <main className="bg-slate-50 font-sans min-h-screen">
    
    {/* ── Hero Banner ── */}
    <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
          <Sparkles size={14} className="animate-pulse text-cyan-300" />
          <span>ABOUT PERFECT AIR SOLUTION</span>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
        >
          Building Comfort &amp; Engineering Trust <span className="text-cyan-300 block sm:inline-block">Since 2012</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
        >
          Uttar Pradesh’s premier HVAC company delivering energy-efficient cooling, certified installation, and 24/7 AMC support.
        </motion.p>

        {/* Inline Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
          <span>✓ 5,000+ Installations</span>
          <span>✓ 500+ Commercial Projects</span>
          <span>✓ 24/7 Rapid Response</span>
        </div>
      </div>
    </section>

    {/* ── Our Story ── */}
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F7FC] to-[#E6F4FA] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Story Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] font-extrabold text-xs uppercase tracking-wider mb-4 shadow-sm">
              <HeartHandshake size={15} className="text-[#0284C7]" />
              <span>OUR STORY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight mb-5 leading-[1.18] font-sans">
              Delivering Comfort, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-sky-500 to-cyan-400">Building Trust</span>
            </h2>
            
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal w-full">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 border-l-4 border-l-[#0284C7] shadow-none hover:shadow-none transition-shadow">
                <p>
                  Founded in 2012, <strong className="text-[#051B30] font-bold">Perfect Air Solution</strong> began with a clear vision — to provide reliable, honest, and high-quality cooling solutions that customers can truly depend on. What started as a focused HVAC service initiative has steadily evolved into a trusted name in air conditioning and industrial cooling across multiple cities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 border-l-4 border-l-sky-500 shadow-none hover:shadow-none transition-shadow">
                <p>
                  Over the years, we have successfully installed and serviced thousands of climate control systems — from residential Split and Window AC units to advanced VRF systems, cold rooms, and large-scale industrial chiller plants. Our growth is driven by strong technical expertise, prompt service delivery, and an unwavering commitment to quality workmanship.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 border-l-4 border-l-cyan-400 shadow-none hover:shadow-none transition-shadow">
                <p>
                  Today, with <span className="text-[#0284C7] font-extrabold">5,000+ satisfied customers</span> and <span className="text-[#0284C7] font-extrabold">500+ completed commercial projects</span>, we continue to focus on innovation, energy-efficient solutions, and long-term client partnerships.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Modern Highlight Cards */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {stats.map((s, i) => {
                const IconComp = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-none hover:shadow-none hover:border-[#0284C7] transition-all duration-300 flex flex-col items-start justify-between group"
                  >
                    {/* Glowing Icon Badge */}
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white mb-4 group-hover:scale-108 transition-transform`}
                    >
                      <IconComp size={22} />
                    </div>

                    {/* Number CountUp */}
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#051B30] mb-1 font-sans group-hover:text-[#0284C7] transition-colors">
                      <CountUp
                        from={0}
                        to={s.value}
                        duration={1.2}
                        separator=","
                        direction="up"
                        startWhen={true}
                      />
                      <span className="text-cyan-500">{s.suffix}</span>
                    </div>

                    {/* Label */}
                    <div className="text-xs sm:text-sm font-bold text-slate-600">
                      {s.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ── Core Values Section ── */}
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#F4FAFE] via-[#FFFFFF] to-[#EBF6FC] relative overflow-hidden font-sans">
      {/* Background Decorative Glow Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
            <CheckCircle size={14} className="text-[#0284C7]" />
            <span>Our Core Values</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight mb-4 font-sans">
            What Drives Us{" "}
            <span className="text-[#0284C7] relative inline-block">
              Forward
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#0284C7]/20 rounded-full -z-10" />
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            The core principles and engineering ethics behind every HVAC installation, maintenance contract, and cooling solution we deliver.
          </p>
        </motion.div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="bg-white rounded-2xl p-6 border border-sky-100 shadow-none hover:shadow-none hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon Badge & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} text-white flex items-center justify-center`}>
                      <IconComp size={22} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284C7] text-[10px] font-bold">
                      {v.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-2 leading-snug font-sans">
                    {v.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                    {v.desc}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {v.bullets.map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>

    {/* ── Milestones & Mission ── */}
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#E6F4FA] via-[#F4FAFF] to-[#EEF8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Milestones Timeline */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-8"
            >
              <div className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-sm">
                Milestones
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#051B30] tracking-tight font-sans">
                Our Growth Journey
              </h2>
            </motion.div>

            <div className="space-y-6 relative pl-4 border-l-2 border-sky-200">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative pl-6"
                >
                  {/* Dot */}
                  <div className="absolute -left-[25px] top-2 w-4 h-4 rounded-full bg-[#0284C7] border-4 border-white" />
                  
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-none hover:shadow-none transition-shadow">
                    <span className="inline-block text-xs sm:text-sm font-bold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg mb-2.5">
                      {m.year}
                    </span>
                    <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-[#041C33] to-[#07365E] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between border border-cyan-400/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 mb-6 backdrop-blur-md">
                  <Target size={28} />
                </div>
                
                <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider mb-4 font-sans">
                  Our Mission
                </h3>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-4">
                  Our mission is to provide reliable, energy-efficient, and cost-effective air conditioning and industrial cooling solutions tailored to residential, commercial, and industrial needs.
                </p>

                {/* Core Mission Pillars */}
                <div className="space-y-3 pt-2 mb-6">
                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Energy &amp; Cost Optimization</h4>
                      <p className="text-xs text-slate-300 leading-normal">Maximizing seasonal SEER ratings and lowering operational power costs by up to 40% using inverter VRF technology.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Turnkey Engineering Precision</h4>
                      <p className="text-xs text-slate-300 leading-normal">Delivering end-to-end heat load calculations, GI/PI duct fabrication, nitrogen leak testing, and BMS integration.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">24/7 Breakdown &amp; AMC Guarantee</h4>
                      <p className="text-xs text-slate-300 leading-normal">Providing guaranteed emergency dispatch within 2 hours with 100% genuine spare parts for continuous cooling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-cyan-300">
                <span>Certified HVAC Engineers</span>
                <span>Established 2012</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <div className="py-2">
      <CTASection />
    </div>
  </main>
);

export default About;
