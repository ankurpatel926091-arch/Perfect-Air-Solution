import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import { Wrench, ShieldCheck, MapPin, Settings2, Wind, FileText, Building2, Activity, ArrowRight, Sparkles } from "lucide-react";

import installationImg from "@/assets/categories/split-ac.png";
import repairImg from "@/assets/why_choose_showcase.jpg";
import amcImg from "@/assets/commercial.jpg";
import designImg from "@/assets/categories/ductable.jpg";
import commercialImg from "@/assets/categories/vrf.png";
import preventiveImg from "@/assets/categories/air-handling-unit.png";

const staticServices = [
  {
    title: "AC Installation",
    slug: "ac-installation",
    desc: "Precision installation for Split, Cassette, Ductable, and VRF systems with vacuum leak testing and certified piping.",
    icon: Wrench,
    image: installationImg,
    badge: "Residential & Commercial"
  },
  {
    title: "AC Repair & Maintenance",
    slug: "ac-repair-maintenance",
    desc: "Fast emergency repairs, gas refilling, compressor troubleshooting, and performance tuning by certified technicians.",
    icon: Activity,
    image: repairImg,
    badge: "24/7 Emergency Support"
  },
  {
    title: "AMC Services",
    slug: "amc-services",
    desc: "Comprehensive Annual Maintenance Contracts (Non-Comprehensive & Comprehensive AMC) ensuring zero downtime.",
    icon: ShieldCheck,
    image: amcImg,
    badge: "Zero Downtime Guarantee"
  },
  {
    title: "HVAC Design & Consultation",
    slug: "hvac-design-consultation",
    desc: "Thermal heat load calculation, duct layout design, air balancing, and energy audit for residential & commercial sites.",
    icon: FileText,
    image: designImg,
    badge: "Certified Engineers"
  },
  {
    title: "Commercial HVAC Solutions",
    slug: "commercial-hvac-solutions",
    desc: "Turnkey VRF/VRV central cooling, chiller plants, Air Handling Units (AHUs), and ventilation systems for towers & malls.",
    icon: Building2,
    image: commercialImg,
    badge: "Industrial & Malls"
  },
  {
    title: "Preventive Maintenance",
    slug: "preventive-maintenance",
    desc: "Scheduled chemical jet washing, filter replacement, electrical checks, and coil descaling to extend HVAC lifespan.",
    icon: Settings2,
    image: preventiveImg,
    badge: "Extended Equipment Life"
  },
  
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'MapPin': return MapPin;
    case 'Settings2': return Settings2;
    case 'Wind': return Wind;
    case 'FileText': return FileText;
    case 'Building2': return Building2;
    case 'Activity': return Activity;
    default: return Wrench;
  }
};

export default function Services() {
  const navigate = useNavigate();
  const { data: apiServices = [], isLoading } = useGetServicesQuery();

  const displayServices = (apiServices && apiServices.length > 0)
    ? apiServices.map((s: any, idx: number) => ({
        ...s,
        image: s.image || staticServices[idx % staticServices.length].image,
        badge: s.badge || staticServices[idx % staticServices.length].badge
      }))
    : staticServices;

  if (isLoading && (!apiServices || apiServices.length === 0)) return <Loader />;

  return (
    <section className="py-16 sm:py-15 bg-gradient-to-b from-[#EEF8FF] via-[#F4FAFF] to-[#E6F4FA] font-sans relative overflow-hidden">
      {/* Background Dot Overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(2, 132, 199, 0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#0284C7] font-bold text-xs uppercase tracking-widest mb-3.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7] animate-pulse" />
            <span>OUR CORE HVAC EXPERTISE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight mb-4"
          >
            Comprehensive{" "}
            <span className="text-[#0284C7] relative inline-block">
              HVAC Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal"
          >
            From emergency repairs and scheduled AMC to full-scale commercial VRF central plants, Perfect Air Solution ensures optimal climate control.
          </motion.p>
        </div>

        {/* Visual Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "16px" }}>
          {displayServices.map((s: any, i: number) => {
            const IconComponent = typeof s.icon === 'function' ? s.icon : renderIcon(s.icon);
            return (
              <motion.div
                key={s.slug || s.title}
                onClick={() => navigate(`/service/${s.slug}`)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white transition-all duration-300 cursor-pointer hover:border-[#0284C7] shadow-none hover:shadow-none"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Top Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/95 border border-sky-100 text-[#0284C7] backdrop-blur-md flex items-center justify-center">
                    <IconComponent size={18} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-1.5 leading-snug font-sans tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-2">
                      {s.desc}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
                    <span>Explore Service Details</span>
                    <div className="w-7 h-7 rounded-full bg-sky-50 group-hover:bg-[#0284C7] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight size={14} />
                    </div>
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
