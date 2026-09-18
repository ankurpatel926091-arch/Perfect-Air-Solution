import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building, Hospital, Hotel, Factory, Building2, ArrowRight, Sparkles, School } from "lucide-react";
import commercialImage from "../assets/commercial.jpg";

const sectors = [
  {
    icon: Building,
    name: "Offices & Corporate Towers",
    description: "Quiet, multi-zone VRF and centralized ductable cooling ensuring optimal productivity and low energy bills.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    slug: "offices"
  },
  {
    icon: Hospital,
    name: "Hospitals & Healthcare",
    description: "Precision temperature, humidity control, and HEPA Air Handling Units (AHUs) meeting strict medical cleanroom standards.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    slug: "hospitals"
  },
  {
    icon: Hotel,
    name: "Hotels & Hospitality",
    description: "Silent room ACs and high-capacity central chillers delivering 24/7 guest comfort across suites and banquet halls.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    slug: "hotels"
  },
  {
    icon: Building2,
    name: "Commercial Buildings & Malls",
    description: "Heavy-tonnage central chiller plants and cassette units built to handle high footfall thermal loads effortlessly.",
    image: commercialImage,
    slug: "commercial-buildings"
  },
  {
    icon: Factory,
    name: "Industrial & Manufacturing Spaces",
    description: "Heavy-duty ventilation, exhaust systems, process cooling chillers, and ductable HVAC for factory floors.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    slug: "industrial-spaces"
  },
  {
    icon: School,
    name: "Educational & Institutional Complexes",
    description: "Energy-efficient centralized cooling solutions designed for universities, auditoriums, and institutional campuses.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    slug: "educational-institutions"
  },
];

export default function HVACSolutions() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F7FC] to-[#E6F4FA] text-slate-800 relative overflow-hidden font-sans">
      {/* Background Decorative Glow Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] font-extrabold text-xs uppercase tracking-wider mb-3.5 shadow-sm"
          >
            <Sparkles size={14} className="text-[#0284C7]" />
            <span>INDUSTRIES &amp; SECTORS SERVED</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#051B30] tracking-tight font-sans leading-tight"
          >
            Engineered Cooling for Every{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-sky-500 to-cyan-400">
              Industry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg mt-4 font-normal leading-relaxed"
          >
            Perfect Air Solution provides customized HVAC design, VRF systems, cassette units, and maintenance contracts engineered for diverse corporate and industrial requirements.
          </motion.p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => navigate(`/hvac-applications`)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer font-sans"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Glowing Icon Badge */}
                  <div className="absolute top-4 left-4 z-10 w-11 h-11 rounded-xl bg-gradient-to-tr from-[#051B30] to-[#0284C7] flex items-center justify-center text-white shadow-lg shadow-sky-600/30 border border-white/20">
                    <IconComponent size={22} />
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-2 leading-snug font-sans">
                      {sector.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {sector.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
                    <span>Explore Sector Solutions</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform text-[#0284C7]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
