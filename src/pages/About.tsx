import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Target, Phone, ArrowRight, Clock, Users, Building, MapPin } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import CTASection from "@/components/CTASection";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Commercial Projects" },
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities Covered" },
];

const values = [
  {
    icon: Shield,
    title: "Reliability & Trust",
    desc: "We stand behind every AC installation and industrial cooling project with dependable service, strong workmanship, and responsive after-sales support.",
  },
  {
    icon: Award,
    title: "Engineering Excellence",
    desc: "We deliver HVAC solutions with certified technicians, premium components, and no shortcuts. Every project reflects our technical precision.",
  },
  {
    icon: CheckCircle,
    title: "Strict Quality Assurance",
    desc: "Through rigorous performance testing, we guarantee reliable and energy-efficient air conditioning systems across all installations.",
  },
  {
    icon: Target,
    title: "Modern Innovation",
    desc: "We continuously adopt modern, energy-efficient, and smart HVAC technologies to deliver advanced cooling solutions for all sectors.",
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

const Badge = ({ label }: { label: string }) => (
  <div className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-sm">
    {label}
  </div>
);

const About = () => (
  <main className="bg-slate-50 font-sans min-h-screen">
    
    {/* ── Hero Banner ── */}
    <section className="relative pt-24 pb-20 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <span>ABOUT PERFECT AIR SOLUTION</span>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Building Comfort &amp; Engineering Trust Since 2012
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Perfect Air Solution is a premier HVAC and air conditioning company delivering reliable, energy-efficient cooling solutions for homes, offices, hospitals, hotels, and industrial facilities.
        </motion.p>
      </div>
    </section>

    {/* ── Our Story ── */}
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EEF8FF] via-[#F4FAFF] to-[#E6F4FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <Badge label="Our Story" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051B30] tracking-tight mb-6 leading-tight">
              Delivering Comfort, Building Trust
            </h2>
            
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Founded in 2012, <strong className="text-[#051B30] font-semibold">Perfect Air Solution</strong> began with a clear vision — to provide reliable, honest, and high-quality cooling solutions that customers can truly depend on. What started as a focused HVAC service initiative has steadily evolved into a trusted name in air conditioning and industrial cooling across multiple cities.
              </p>
              <p>
                Over the years, we have successfully installed and serviced thousands of climate control systems — from residential Split and Window AC units to advanced VRF systems, cold rooms, and large-scale industrial chiller plants. Our growth is driven by strong technical expertise, prompt service delivery, and an unwavering commitment to quality workmanship.
              </p>
              <p>
                Today, with <span className="text-[#0284C7] font-bold">5,000+ satisfied customers</span> and <span className="text-[#0284C7] font-bold">500+ completed commercial projects</span>, we continue to focus on innovation, energy-efficient solutions, and long-term client partnerships.
              </p>
            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-sky-900/5 text-center hover:border-sky-300 transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0284C7] mb-1">
                    <CountUp
                      from={0}
                      to={s.value}
                      duration={1.2}
                      separator=","
                      direction="up"
                      startWhen={true}
                    />
                    {s.suffix}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ── Values ── */}
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge label="Our Core Values" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051B30] tracking-tight">
            What Drives Us Forward
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100/80 text-[#0284C7] border border-sky-200/60 flex items-center justify-center mb-5 shadow-sm">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#051B30] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {v.desc}
                  </p>
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
              <Badge label="Milestones" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051B30] tracking-tight">
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
                  <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-[#0284C7] border-4 border-white shadow-sm" />
                  
                  <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block text-xs font-extrabold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-md mb-2">
                      {m.year}
                    </span>
                    <p className="text-slate-700 text-xs sm:text-sm font-normal leading-relaxed">
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
              className="bg-gradient-to-br from-[#041C33] to-[#07365E] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 mb-6 backdrop-blur-md">
                  <Target size={28} />
                </div>
                
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">
                  Our Mission
                </h3>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-4">
                  Our mission is to provide reliable, energy-efficient, and cost-effective air conditioning and industrial cooling solutions tailored to residential, commercial, and industrial needs.
                </p>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  We are committed to delivering quality workmanship, advanced HVAC technology, and prompt service support to ensure long-term customer satisfaction and dependable performance.
                </p>
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
    <div className="py-6">
      <CTASection />
    </div>
  </main>
);

export default About;
