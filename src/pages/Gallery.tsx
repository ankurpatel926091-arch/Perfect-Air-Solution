import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ZoomIn, MapPin, Building, ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

import commercialImg from "@/assets/commercial.jpg";
import residentialImg from "@/assets/resedential.jpg";
import cassetteImg from "@/assets/cassette-ac.png";
import vrfImg from "@/assets/vrv-vrf.png";
import ductableImg from "@/assets/ductable-ac.png";
import ahuImg from "@/assets/ahu.png";

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
    title: "Luxury Residence Split & Multi-Split AC Setup",
    category: "residential",
    categoryLabel: "Residential Split AC",
    image: residentialImg,
    location: "Executive Villa Complex",
    description: "Silent, inverter-driven split air conditioning solution engineered for optimal indoor climate and aesthetic harmony."
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
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    location: "Metropolitan Mall Complex",
    description: "High-tonnage water-cooled chiller plant delivering reliable environmental control across retail, food court, and cinema zones."
  },
  {
    id: "8",
    title: "Commercial Supermarket Ducted Cooling",
    category: "ductable",
    categoryLabel: "Ductable System",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    location: "Retail Chain Superstore",
    description: "Precision-engineered ducted air distribution keeping retail floor and perishables at exact thermal thresholds."
  }
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
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* Header Banner */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden mb-8">
        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3.5 backdrop-blur-md">
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
              onClick={() => setActiveCategory(cat.key)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5 lg:gap-5">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative flex flex-col h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              onClick={() => setSelectedImage(item)}
            >
              {/* Full Bright Card Image */}
              <div className="relative flex-1 overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Zoom Icon (Blue Circle) */}
                <div className="absolute top-3 right-3 bg-[#0284C7] p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                  <ZoomIn size={15} />
                </div>
              </div>

              {/* Bright Bottom Title Bar */}
              <div className="bg-white px-4 py-3 border-t border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-1 group-hover:text-[#0284C7] transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="h-80 md:h-96 relative bg-slate-900">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#051B30] text-cyan-400 text-xs font-bold px-3 py-1 rounded-md border border-cyan-500/30">
                    {selectedImage.categoryLabel}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#0284C7] mb-2">
                    <MapPin size={16} />
                    <span>{selectedImage.location}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    {selectedImage.title}
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        navigate("/contact");
                      }}
                      className="px-6 py-3 bg-[#0284C7] hover:bg-sky-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-sky-500/20 flex items-center gap-2"
                    >
                      <Phone size={16} />
                      Request Quote for Similar Project
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Box */}
        <div className="mt-20 bg-gradient-to-br from-[#051B30] to-[#0F4C81] rounded-3xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
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
