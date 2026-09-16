import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import { Wrench, ShieldCheck, MapPin, Settings2, Wind, FileText, Building2, Activity, ArrowRight } from "lucide-react";

import installationImg from "@/assets/split-ac.png";
import repairImg from "@/assets/about_ac_showcase.jpg";
import amcImg from "@/assets/commercial.jpg";
import designImg from "@/assets/categories/ductable.jpg";
import commercialImg from "@/assets/categories/chiller.jpg";
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
    <section className="section-padding py-20 relative overflow-hidden bg-gradient-to-b from-[#EEF8FF] via-[#F4FAFF] to-[#E6F4FA]" style={{  
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Background Dot Overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(2, 132, 199, 0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] font-bold text-xs uppercase tracking-widest px-5 py-1.5 rounded-full mb-4 shadow-sm">
            OUR CORE HVAC EXPERTISE
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-3xl sm:text-4xl lg:text-5xl text-[#051B30] font-normal leading-tight">
            Comprehensive HVAC Services
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mt-3 font-normal">
            From emergency repairs and scheduled AMC to full-scale commercial VRF central plants, Perfect Air Solution ensures optimal climate control.
          </p>
        </motion.div>

        {/* Visual Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "28px" }}>
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
                whileHover={{ y: -8 }}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl shadow-sky-900/5 transition-all duration-300 cursor-pointer hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Top Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/95 border border-sky-100 text-[#0284C7] backdrop-blur-md flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent size={22} />
                  </div>

                  {/* Top Tag Badge */}
                  {s.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 border border-sky-100 text-[#0284C7] text-[11px] font-bold backdrop-blur-md shadow-sm">
                      {s.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-xl sm:text-2xl text-[#051B30] font-bold mb-3 group-hover:text-[#0284C7] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                      {s.desc}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
                    <span>Explore Service Details</span>
                    <div className="w-8 h-8 rounded-full bg-sky-50 group-hover:bg-[#0284C7] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight size={15} />
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
