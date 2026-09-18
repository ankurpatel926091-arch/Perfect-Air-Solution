import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  Clock, Star, Sparkles, ArrowRight, TrendingUp, Award, Activity, Building2, CheckCircle2, Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import CTASection from "@/components/CTASection";

import splitAcImg from "@/assets/categories/split-ac.png";
import repairImg from "@/assets/why_choose_showcase.jpg";
import amcImg from "@/assets/commercial.jpg";
import vrfImg from "@/assets/categories/vrf.png";
import ductableImg from "@/assets/categories/ductable.jpg";
import ahuImg from "@/assets/categories/air-handling-unit.png";
import chillerImg from "@/assets/categories/chiller.jpg";
import copperImg from "@/assets/categories/ventilation.jpg";

interface StaticService {
  slug: string;
  title: string;
  badge: string;
  desc: string;
  bullets: string[];
  icon: React.ElementType;
  image: string;
}

const staticServicesList: StaticService[] = [
  {
    slug: "ac-installation",
    title: "Precision AC Installation",
    badge: "Residential & Commercial",
    desc: "Certified installation for Split, Cassette, Ductable, and VRF systems with vacuum leak testing and precision copper piping.",
    bullets: ["OEM Certified Copper Piping", "Nitrogen Pressure Leak Testing", "Airflow CFM Balancing"],
    icon: Wrench,
    image: splitAcImg,
  },
  {
    slug: "ac-repair-maintenance",
    title: "AC Servicing & Gas Refilling",
    badge: "24/7 Emergency Support",
    desc: "Complete servicing, high-pressure jet washing, eco-friendly gas top-up (R32/R410A), and compressor troubleshooting.",
    bullets: ["Chemical Jet Washing", "Gas Leakage Detection", "Electrical & PCB Diagnostics"],
    icon: Activity,
    image: repairImg,
  },
  {
    slug: "amc-services",
    title: "AMC (Annual Maintenance Contract)",
    badge: "Zero Downtime Guarantee",
    desc: "Comprehensive & Non-Comprehensive annual contracts ensuring regular preventive maintenance and breakdown response.",
    bullets: ["Scheduled Servicing Audits", "< 2 Hour Emergency Response", "100% Genuine Spare Parts"],
    icon: ShieldCheck,
    image: amcImg,
  },
  {
    slug: "vrf-vrv-systems",
    title: "Commercial VRF / VRV Central Cooling",
    badge: "Towers & Malls",
    desc: "Turnkey multi-zone VRF/VRV central air conditioning plant installation for corporate towers, hospitals, and tech parks.",
    bullets: ["Multi-Zone Thermostat Control", "Up to 40% Power Savings", "Daikin & Blue Star Certified"],
    icon: Building2,
    image: vrfImg,
  },
  {
    slug: "ductable-cassette-ac",
    title: "Ductable & Cassette AC Solutions",
    badge: "Flush Ceiling Fit",
    desc: "Heavy-duty ductable and 4-way ceiling cassette AC setups engineered for uniform 360-degree air distribution.",
    bullets: ["360° Air Diffusion Vents", "Low-Noise Operation", "Sleek Flush Ceiling Design"],
    icon: Wind,
    image: ductableImg,
  },
  {
    slug: "chiller-ahu-services",
    title: "Chiller Plants & AHU Systems",
    badge: "Commercial Central Plant",
    desc: "Water-cooled & Air-cooled Chiller servicing, Air Handling Unit (AHU) installation, HEPA filtration, and cleanroom setup.",
    bullets: ["Air & Water-Cooled Chillers", "Cleanroom HEPA Filtration", "Thermal Energy Audits"],
    icon: Settings2,
    image: ahuImg,
  },
  {
    slug: "industrial-cooling-repair",
    title: "Industrial & 3-Phase Machine Repair",
    badge: "Heavy Duty Cooling",
    desc: "Specialized repair and preventive maintenance for 3-phase cooling machines, panel ACs, and industrial chiller units.",
    bullets: ["Heavy Equipment Diagnostics", "Compressor Overhaul", "24/7 Breakdown Crew"],
    icon: Settings2,
    image: chillerImg,
  },
  {
    slug: "copper-piping-ductwork",
    title: "Copper Piping & Ductwork Layout",
    badge: "Precision Engineering",
    desc: "High-grade insulation copper piping and customized GI/PI ductwork fabrication for commercial central air plants.",
    bullets: ["Hard Copper Piping", "Zero Condensation Insulation", "Custom Duct Fabrication"],
    icon: MapPin,
    image: copperImg,
  },
   {
    slug: "ac-repair-maintenance",
    title: "AC Servicing & Gas Refilling",
    badge: "24/7 Emergency Support",
    desc: "Complete servicing, high-pressure jet washing, eco-friendly gas top-up (R32/R410A), and compressor troubleshooting.",
    bullets: ["Chemical Jet Washing", "Gas Leakage Detection", "Electrical & PCB Diagnostics"],
    icon: Activity,
    image: repairImg,
  },
];

const STATS = [
  { num: "5000+", label: "Projects Delivered", icon: <TrendingUp size={16} className="text-cyan-400" /> },
  { num: "4.9/5", label: "Customer Rating", icon: <Star size={16} className="text-amber-400 fill-amber-400" /> },
  { num: "< 2 Hrs", label: "AMC Response Time", icon: <Clock size={16} className="text-cyan-400" /> },
  { num: "100%", label: "OEM Certified Parts", icon: <Award size={16} className="text-cyan-400" /> },
];

export default function ServicesPage(): React.ReactElement {
  const navigate = useNavigate();
  const { data: apiServices = [], isLoading } = useGetServicesQuery();

  // Merge API services with rich static fallback details
  const servicesToDisplay = (apiServices && apiServices.length > 0)
    ? apiServices.map((apiS: any, i: number) => {
        const fallback = staticServicesList[i % staticServicesList.length];
        return {
          slug: apiS.slug || fallback.slug,
          title: apiS.title || fallback.title,
          badge: apiS.badge || fallback.badge,
          desc: apiS.desc || apiS.description || fallback.desc,
          bullets: apiS.highlights || fallback.bullets,
          icon: fallback.icon,
          image: apiS.image || fallback.image,
        };
      })
    : staticServicesList;

  if (isLoading && (!apiServices || apiServices.length === 0)) return <Loader />;

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans">

      {/* Hero Banner */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-9 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mt-1.5 sm:mt-2 mb-2.5 backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>Complete HVAC Expertise</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3.5 text-white"
          >
            Comprehensive HVAC &amp; <span className="text-cyan-300">Cooling Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-4"
          >
            From precision AC installation and scheduled AMC to commercial VRF central plants and cleanroom AHU systems — Perfect Air Solution delivers engineered comfort you can depend on.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span>✓ 5,000+ Projects Delivered</span>
            <span>✓ 4.9/5 Customer Rating</span>
            <span>✓ &lt; 2 Hrs Emergency AMC Response</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesToDisplay.map((s, idx) => {
            const IconComp = s.icon || Wrench;
            return (
              <motion.div
                key={s.slug || s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                onClick={() => navigate(`/service/${s.slug}`)}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-[#0284C7]/40 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/95 border border-sky-100 text-[#0284C7] backdrop-blur-md flex items-center justify-center shadow-md">
                    <IconComp size={20} />
                  </div>

                  {/* Top Badge Tag */}
                  {s.badge && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 border border-sky-100 text-[#0284C7] text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {s.badge}
                    </span>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-2 leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4 line-clamp-2">
                      {s.desc}
                    </p>

                    {/* Bullet Highlights */}
                    {s.bullets && s.bullets.length > 0 && (
                      <div className="space-y-1.5 mb-4">
                        {s.bullets.slice(0, 3).map((b: string) => (
                          <div key={b} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
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

        {/* CTA Section */}
        <div className="mt-16">
          <CTASection />
        </div>

      </div>
    </div>
  );
}