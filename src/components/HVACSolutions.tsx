import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building, Hospital, Hotel, Factory, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import commercialImage from "../assets/commercial.jpg";
import resedentialImage from "../assets/resedential.jpg";

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
    icon: Building,
    name: "Offices & Corporate Towers",
    description: "Quiet, multi-zone VRF and centralized ductable cooling ensuring optimal productivity and low energy bills.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    slug: "offices"
  },
];

export default function HVACSolutions() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-[#E6F4FA] via-[#F4FAFF] to-[#EEF8FF] text-slate-800 relative overflow-hidden">
      {/* Background radial dot grid */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full mb-3 shadow-sm"
          >
            Industries &amp; Sectors Served
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#051B30] tracking-tight"
          >
            Engineered Cooling for Every Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-lg mt-4 font-normal leading-relaxed"
          >
            Perfect Air Solution provides customized HVAC design, VRF systems, cassette units, and maintenance contracts engineered for diverse corporate and industrial requirements.
          </motion.p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/hvac-applications`)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl shadow-sky-900/5 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md border border-sky-100 flex items-center justify-center text-[#0284C7] shadow-md">
                    <IconComponent size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-2">
                      {sector.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {sector.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284C7] group-hover:text-sky-600">
                    <span>Explore Sector Solutions</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
