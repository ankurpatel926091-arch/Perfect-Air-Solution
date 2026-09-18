import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ZoomIn, MapPin, Building, ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import commercialImg from "@/assets/commercial.jpg";
import residentialImg from "@/assets/categories/split-ac.png";
import cassetteImg from "@/assets/categories/cassette-ac.png";
import vrfImg from "@/assets/categories/vrf.png";
import ductableImg from "@/assets/categories/ductable.jpg";
import ahuImg from "@/assets/categories/air-handling-unit.png";
import chillerImg from "@/assets/categories/chiller.jpg";
import maintenanceImg from "@/assets/cold-room.png";
import indoor from "@/assets/why_choose_indoor.jpg";

type GalleryItem = {
  id: string;
  title: string;
  category: "all" | "residential" | "commercial" | "vrf" | "ductable" | "maintenance";
  categoryLabel: string;
  image: string;
  location: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Corporate Office VRF Cooling System",
    category: "vrf",
    categoryLabel: "VRF / VRV System",
    image: commercialImg,
    location: "Commercial Tower, Central Business District",
    description: "Multi-zone VRF HVAC installation providing centralized temperature control and ultra-high energy efficiency for a 12-story office complex."
  },
 
   {
    id: "2",
    title: "Air Handling Unit & Ventilation Facility",
    category: "maintenance",
    categoryLabel: "AHU & Maintenance",
    image: indoor,
    location: "Pharmaceutical Lab",
    description: "Cleanroom Air Handling Unit (AHU) installation with HEPA filtration and preventive maintenance schedule."
  },
  {
    id: "3",
    title: "Hospitality Lounge Ceiling Cassette ACs",
    category: "commercial",
    categoryLabel: "Cassette AC",
    image: cassetteImg,
    location: "Grand Hotel & Conference Suite",
    description: "4-way airflow ceiling cassette units providing even temperature distribution and sleek flush-mount aesthetics."
  },
  {
    id: "4",
    title: "Industrial Manufacturing Plant Ductable HVAC",
    category: "ductable",
    categoryLabel: "Ductable System",
    image: ductableImg,
    location: "Industrial Corridor",
    description: "Heavy-duty ductable air conditioning system designed for large industrial volume cooling with continuous air exchange."
  },
  {
    id: "5",
    title: "Multi-Storey Tech Park VRV Central Plant",
    category: "vrf",
    categoryLabel: "VRF / VRV System",
    image: vrfImg,
    location: "IT Hub Park",
    description: "Variable Refrigerant Volume centralized heating & cooling plant customized for 24/7 server rooms and workspace zones."
  },
  {
    id: "6",
    title: "Air Handling Unit & Ventilation Facility",
    category: "maintenance",
    categoryLabel: "AHU & Maintenance",
    image: ahuImg,
    location: "Pharmaceutical Lab",
    description: "Cleanroom Air Handling Unit (AHU) installation with HEPA filtration and preventive maintenance schedule."
  },
  {
    id: "7",
    title: "Shopping Mall Centralized Chiller Plant",
    category: "commercial",
    categoryLabel: "Commercial HVAC",
    image: chillerImg,
    location: "Metropolitan Mall Complex",
    description: "High-tonnage water-cooled chiller plant delivering reliable environmental control across retail, food court, and cinema zones."
  },
  {
    id: "8",
    title: "Commercial Supermarket Ducted Cooling",
    category: "ductable",
    categoryLabel: "Ductable System",
    image: maintenanceImg,
    location: "Retail Chain Superstore",
    description: "Precision-engineered ducted air distribution keeping retail floor and perishables at exact thermal thresholds."
  },
   {
    id: "9",
    title: "Luxury Residence Split & Multi-Split AC Setup",
    category: "residential",
    categoryLabel: "Residential Split AC",
    image: residentialImg,
    location: "Executive Villa Complex",
    description: "Silent, inverter-driven split air conditioning solution engineered for optimal indoor climate and aesthetic harmony."
  },
 
];

const categories = [
  { key: "all", label: "All Projects" },
  { key: "vrf", label: "VRF / VRV Systems" },
  { key: "commercial", label: "Commercial HVAC" },
  { key: "residential", label: "Residential AC" },
  { key: "ductable", label: "Ductable & Cassette" },
  { key: "maintenance", label: "AHU & Maintenance" }
];

export default function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : null));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev !== null ? (prev === filteredItems.length - 1 ? 0 : prev + 1) : null));
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]);

  // Lock body scroll when lightbox modal is open to prevent background jumps
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* Header Banner */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-9 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden mb-8">
        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-2.5 backdrop-blur-md">
            <span>PROJECT PORTFOLIO</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3.5 leading-tight"
          >
            Perfect Air Solution <span className="text-cyan-300">Showcase</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-4"
          >
            Explore our completed HVAC installations, commercial VRF systems, ductable air conditioning, and industrial climate solutions across UP &amp; All India.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-xl mx-auto">
            <span>✓ Verified Installations</span>
            <span>✓ Commercial &amp; Residential</span>
            <span>✓ Certified Engineers</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 sm:mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setSelectedIndex(null);
              }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm ${
                activeCategory === cat.key
                  ? "bg-[#0284C7] text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-[#0284C7] border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden border border-slate-200/90 shadow-none transition-all duration-300 cursor-pointer bg-white"
              onClick={() => setSelectedIndex(idx)}
            >
              {/* Full Bright Card Image */}
              <div className="relative w-full h-full overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Zoom Icon (Blue Circle) */}
                <div className="absolute top-3 right-3 bg-[#0284C7] p-2.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                  <ZoomIn size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal — Smooth Clean Image Only */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4 sm:p-6 select-none"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full h-[65vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white p-2.5 rounded-full transition-colors border border-white/20 shadow-lg cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Left Arrow Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-[#0284C7] text-white p-3 rounded-full transition-all duration-200 border border-white/20 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-[#0284C7] text-white p-3 rounded-full transition-all duration-200 border border-white/20 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Fixed Height & Width Image Display */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    key={selectedItem.id}
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover object-center rounded-2xl select-none transition-opacity duration-150"
                  />
                </div>

                {/* Image Counter Badge at Bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/70 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full border border-white/15 pointer-events-none">
                  {(selectedIndex ?? 0) + 1} / {filteredItems.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Box */}
        <div className="mt-20 mb-12 sm:mb-20 bg-gradient-to-br from-[#051B30] to-[#0F4C81] rounded-xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              Need Custom HVAC System Design or Installation?
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 font-light">
              Contact Perfect Air Solution today for expert site inspection, load calculations, VRF system layout, and AMC consultation.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-full text-base transition-all shadow-lg hover:shadow-sky-500/30 transform hover:-translate-y-0.5"
            >
              <span>Get Free HVAC Quote</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
