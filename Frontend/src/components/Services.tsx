import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import {
  Wrench,
  ShieldCheck,
  MapPin,
  Settings2,
  Wind,
  FileText,
  Building2,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Shield,
  Star
} from "lucide-react";

import installationImg from "@/assets/categories/split-ac.png";
import repairImg from "@/assets/why_choose_showcase.jpg";
import maintenanceImg from "@/assets/categories/air-handling-unit.png";
import ventilationImg from "@/assets/categories/ventilation.jpg";
import amcImg from "@/assets/commercial.jpg";
import ductableImg from "@/assets/categories/ductable.jpg";

const staticServices = [
  {
    title: "AC Installation",
    slug: "ac-installation",
    desc: "Certified installation for Split, Cassette, Ductable, and VRF systems with vacuum leak testing and precision copper piping.",
    icon: Wrench,
    image: installationImg,
    badge: "Quick & Safe Installation",
    points: ["OEM Certified Copper Piping", "Nitrogen Pressure Leak Testing", "Airflow CFM Balancing"]
  },
  {
    title: "AC Repair & Service",
    slug: "ac-repair-service",
    desc: "Fast emergency repairs, chemical jet washing, eco-friendly refrigerant top-up (R32/R410A), and compressor troubleshooting.",
    icon: Activity,
    image: repairImg,
    badge: "Fast & Reliable Solutions",
    points: ["High-Pressure Jet Wash", "Gas Leak Detection & Top-up", "Electrical & PCB Diagnostics"]
  },
  {
    title: "AC Maintenance",
    slug: "ac-maintenance",
    desc: "Periodic preventive servicing, deep coil cleaning, filter sanitization, electrical checks, and performance tuning.",
    icon: Settings2,
    image: maintenanceImg,
    badge: "Regular Care for Longer Life",
    points: ["Periodic Preventive Tune-Up", "Anti-Fungal Coil Descaling", "Electrical Amperage Testing"]
  },
  {
    title: "Ventilation Solutions",
    slug: "ventilation-solutions",
    desc: "Fresh air intake systems, commercial kitchen exhaust, basement ventilation, cleanroom HEPA airflow, and custom ducting.",
    icon: Wind,
    image: ventilationImg,
    badge: "Fresh Air, Better Living",
    points: ["Fresh Air Intake & Circulation", "Kitchen & Basement Exhaust", "Cleanroom HEPA Air Systems"]
  },
  {
    title: "Annual Maintenance Contract",
    slug: "annual-maintenance-contract",
    desc: "Comprehensive & Non-Comprehensive annual contracts ensuring regular preventive maintenance, priority support, and genuine parts.",
    icon: ShieldCheck,
    image: amcImg,
    badge: "Worry Free Year Round",
    points: ["Scheduled Servicing Audits", "< 2 Hour Emergency Response", "100% Genuine Spare Parts"]
  },
  {
    title: "Ductable & Cassette AC Solutions",
    slug: "ductable-cassette-ac",
    desc: "Heavy-duty ductable and 4-way ceiling cassette AC setups engineered for uniform 360-degree air distribution.",
    icon: Wind,
    image: ductableImg,
    badge: "Flush Ceiling Fit",
    points: ["360° Air Diffusion Vents", "Low-Noise Operation", "Sleek Flush Ceiling Design"]
  },
];

const renderIcon = (icon: any) => {
  if (typeof icon === "function") return icon;
  switch (icon) {
    case "ShieldCheck": return ShieldCheck;
    case "MapPin": return MapPin;
    case "Settings2": return Settings2;
    case "Wind": return Wind;
    case "FileText": return FileText;
    case "Building2": return Building2;
    case "Activity": return Activity;
    default: return Wrench;
  }
};

export default function Services() {
  const navigate = useNavigate();
  const { data: apiServices = [], isLoading } = useGetServicesQuery();

  // Map services cleanly prioritizing our 6 core services (2 rows of 3)
  const displayServices = (apiServices && apiServices.length > 0)
    ? apiServices.slice(0, 6).map((s: any, idx: number) => {
        const fallback = staticServices.find((f) => f.slug === s.slug) || staticServices[idx % staticServices.length];
        return {
          ...s,
          title: s.title || fallback.title,
          badge: s.badge || fallback.badge,
          desc: s.desc || fallback.desc,
          points: s.highlights || fallback.points,
          image: s.image || fallback.image,
          icon: s.icon || fallback.icon,
        };
      })
    : staticServices;

  if (isLoading && (!apiServices || apiServices.length === 0)) return <Loader />;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EEF8FF] via-[#F4FAFF] to-[#E6F4FA] font-sans relative overflow-hidden">
      {/* Background Dot Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage: "radial-gradient(circle, rgba(2, 132, 199, 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#0284C7] font-bold text-xs uppercase tracking-widest mb-3 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7] animate-pulse" />
            <span>PURE AIR • PERFECT CARE • COMPLETE SOLUTION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight mb-3"
          >
            Complete Air Solutions{" "}
            <span className="text-[#0284C7] relative inline-block">
              For Your Comfort
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-6"
          >
            We provide professional installation, service and maintenance of all types of air conditioning and ventilation systems.
          </motion.p>

          {/* 3 Core Highlights from Reference Poster */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#0284C7]"
          >
            <span className="flex items-center gap-1.5 bg-white/90 border border-sky-200 px-3.5 py-1.5 rounded-full shadow-sm">
              <CheckCircle2 size={14} className="text-[#0284C7]" /> Better Air Quality
            </span>
            <span className="flex items-center gap-1.5 bg-white/90 border border-sky-200 px-3.5 py-1.5 rounded-full shadow-sm">
              <CheckCircle2 size={14} className="text-[#0284C7]" /> Reliable Service
            </span>
            <span className="flex items-center gap-1.5 bg-white/90 border border-sky-200 px-3.5 py-1.5 rounded-full shadow-sm">
              <CheckCircle2 size={14} className="text-[#0284C7]" /> Complete Care
            </span>
          </motion.div>
        </div>

        {/* Visual Cards Grid - Featuring the 5 Core Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((s: any, i: number) => {
            const IconComponent = renderIcon(s.icon);
            return (
              <motion.div
                key={s.slug || s.title}
                onClick={() => navigate(`/service/${s.slug}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white transition-all duration-300 cursor-pointer hover:border-[#0284C7] shadow-sm hover:shadow-md"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Top Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051B30]/75 via-transparent to-transparent" />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-lg bg-white/95 border border-sky-100 text-[#0284C7] backdrop-blur-md flex items-center justify-center shadow-sm">
                    <IconComponent size={18} />
                  </div>

                  {/* Subtitle / Badge from Poster */}
                  {s.badge && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 border border-sky-100 text-[#0284C7] text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {s.badge}
                    </span>
                  )}

                  {/* Bottom Image Title Overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-3 line-clamp-2">
                      {s.desc}
                    </p>

                    {/* Bullet Points */}
                    {s.points && s.points.length > 0 && (
                      <div className="space-y-1.5 mb-2">
                        {s.points.slice(0, 3).map((p: string) => (
                          <div key={p} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{p}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
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

        {/* Brand Promise & Direct Contact Strip from Reference Poster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-[#03172C] via-[#052b52] to-[#0284C7] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-400/30">
              Quality You Deserve • Service You Can Trust
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              "We don't just install AC, We care for your <span className="text-cyan-300">EVERY BREATH</span>."
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl">
              Professional HVAC installation, preventive maintenance, repair, and ventilation solutions across Lucknow and Uttar Pradesh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:8429152092"
              className="flex items-center gap-3 bg-white text-[#051B30] hover:bg-cyan-50 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#0284C7] flex items-center justify-center">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase leading-none">Contact Number</div>
                <div className="text-base font-extrabold leading-tight text-[#0284C7]">84291 52092</div>
              </div>
            </a>
            <div className="text-center sm:text-left text-xs text-slate-200">
              <span className="block text-[10px] text-cyan-300 font-bold uppercase">Address</span>
              <span className="font-semibold">Lucknow, Uttar Pradesh</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
