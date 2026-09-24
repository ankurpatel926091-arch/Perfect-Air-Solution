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
import Breadcrumb from "@/components/Breadcrumb";

import splitAcImg from "@/assets/categories/split-ac.png";
import repairImg from "@/assets/why_choose_showcase.jpg";
import amcImg from "@/assets/commercial.jpg";
import vrfImg from "@/assets/categories/vrf.png";
import ductableImg from "@/assets/categories/ductable.jpg";
import ahuImg from "@/assets/categories/air-handling-unit.png";
import chillerImg from "@/assets/categories/chiller.jpg";
import copperImg from "@/assets/categories/ventilation.jpg";
import servicesHeaderBg from "@/assets/HeaderBackgroundImg/ServicesBackground.png";

interface StaticService {
  slug: string;
  title: string;
  badge: string;
  desc: string;
  bullets: string[];
  icon: React.ElementType;
  image: string;
}

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  ShieldCheck,
  MapPin,
  Settings2,
  Wind,
  Activity,
  Building2,
};

const getIconComponent = (icon: any): React.ElementType => {
  if (typeof icon === "function") return icon;
  if (typeof icon === "string" && iconMap[icon]) return iconMap[icon];
  return Wrench;
};

const staticServicesList: StaticService[] = [
  {
    slug: "ac-installation",
    title: "AC Installation",
    badge: "Quick & Safe Installation",
    desc: "Certified installation for Split, Cassette, Ductable, and VRF systems with vacuum leak testing and precision copper piping.",
    bullets: ["OEM Certified Copper Piping", "Nitrogen Pressure Leak Testing", "Airflow CFM Balancing"],
    icon: Wrench,
    image: splitAcImg,
  },
  {
    slug: "ac-repair-service",
    title: "AC Repair & Service",
    badge: "Fast & Reliable Solutions",
    desc: "Complete servicing, high-pressure jet washing, eco-friendly gas top-up (R32/R410A), and compressor troubleshooting.",
    bullets: ["Chemical Jet Washing", "Gas Leakage Detection", "Electrical & PCB Diagnostics"],
    icon: Activity,
    image: repairImg,
  },
  {
    slug: "ac-maintenance",
    title: "AC Maintenance",
    badge: "Regular Care for Longer Life",
    desc: "Periodic preventive servicing, deep coil cleaning, filter sanitization, electrical checks, and performance tuning.",
    bullets: ["Periodic Preventive Tune-Up", "Coil Descaling & Rust Protection", "Electrical Amperage Testing"],
    icon: Settings2,
    image: ahuImg,
  },
  {
    slug: "ventilation-solutions",
    title: "Ventilation Solutions",
    badge: "Fresh Air, Better Living",
    desc: "Fresh air intake systems, exhaust solutions, commercial kitchen ventilation, basement ventilation, and HEPA air purification.",
    bullets: ["Fresh Air Intake & Circulation", "Kitchen & Basement Exhaust", "Cleanroom HEPA Air Systems"],
    icon: Wind,
    image: copperImg,
  },
  {
    slug: "annual-maintenance-contract",
    title: "Annual Maintenance Contract",
    badge: "Worry Free Year Round",
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

  const excludedSlugs = [
    "chiller-ahu-services",
    "cleanroom-industrial-ventilation",
    "copper-piping-ductwork",
  ];

  // Merge API services with rich static fallback details & filter out removed services
  const rawServices = (apiServices && apiServices.length > 0)
    ? apiServices.map((apiS: any) => {
        const fallback = staticServicesList.find(f => f.slug === apiS.slug) || staticServicesList[0];
        return {
          slug: apiS.slug || fallback.slug,
          title: apiS.title || fallback.title,
          badge: apiS.badge || fallback.badge,
          desc: apiS.desc || apiS.description || fallback.desc,
          bullets: apiS.highlights || fallback.bullets,
          icon: getIconComponent(apiS.icon || fallback.icon),
          image: apiS.image || fallback.image,
        };
      })
    : staticServicesList;

  const servicesToDisplay = rawServices.filter(
    (s: any) =>
      !excludedSlugs.includes(s.slug) &&
      !s.title?.toLowerCase().includes("chiller") &&
      !s.title?.toLowerCase().includes("cleanroom")
  );

  if (isLoading && (!apiServices || apiServices.length === 0)) return <Loader />;

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans">

      {/* Hero Banner */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Background Image with Clear Visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={servicesHeaderBg}
            alt="Services Perfect Air Solution"
            className="w-full h-full object-cover object-center"
          />
          {/* Balanced soft gradient overlay so diagnostics/technicians image is vividly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/70 via-[#03172C]/30 to-[#03172C]/85" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-3">
            <Breadcrumb variant="dark" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#03172C]/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mt-1.5 sm:mt-2 mb-3 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>PURE AIR • PERFECT CARE • COMPLETE SOLUTION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]"
          >
            Complete Air Solutions <span className="text-cyan-300">For Your Comfort</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-100 text-sm sm:text-base max-w-3xl mx-auto font-medium leading-relaxed mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            We provide professional installation, service and maintenance of all types of air conditioning and ventilation systems.
          </motion.p>

          {/* 3 Core Highlights from Flyer */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-cyan-200 font-semibold pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-cyan-400" /> Better Air Quality
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-cyan-400" /> Reliable Service
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-cyan-400" /> Complete Care
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-4 sm:pb-6">
        
        {/* Intro Header & Theory Above Service Images */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] font-bold text-xs uppercase tracking-wider mb-3 shadow-xs"
          >
            <Sparkles size={13} className="text-[#0284C7]" />
            <span>Our Service Offerings</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051B30] tracking-tight mb-3"
          >
            Engineered Cooling, Precision Repair &amp; Comprehensive Maintenance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            At Perfect Air Solution, we deliver end-to-end climate control solutions backed by certified HVAC technicians, advanced diagnostic tools, and 100% genuine spare parts. From rapid doorstep repairs and precision installations to worry-free AMC contracts and specialized ventilation setups, explore our core services engineered to keep your environment cool, fresh, and energy-efficient.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white hover:border-[#0284C7] transition-all duration-300 cursor-pointer shadow-none hover:shadow-none"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-lg bg-white/95 border border-sky-100 text-[#0284C7] backdrop-blur-md flex items-center justify-center">
                    <IconComp size={20} />
                  </div>

                  {/* Top Badge Tag */}
                  {s.badge && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 border border-sky-100 text-[#0284C7] text-[10px] font-bold backdrop-blur-md">
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
                      <div className="space-y-1.5 mb-2">
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
      </div>

      {/* CTA Section */}
      <div className="pb-10 sm:pb-14">
        <CTASection />
      </div>
    </div>
  );
}