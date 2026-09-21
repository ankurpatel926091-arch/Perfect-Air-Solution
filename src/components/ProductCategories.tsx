import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Clean transparent product cutouts
import splitAc from "@/assets/categories/split-ac.png";
import cassetteAc from "@/assets/categories/cassette-ac.png";
import towerAc from "@/assets/categories/tower-ac.png";
import ductableAc from "@/assets/ductable-ac.png";
import vrvImg from "@/assets/vrv-vrf.png";
import chillerImg from "@/assets/chiller.png";
import ahuImg from "@/assets/ahu.png";
import coldRoomImg from "@/assets/cold-room.png";

type CategoryTab = "all" | "residential" | "commercial" | "industrial";

interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  type: "residential" | "commercial" | "industrial";
  typeLabel: string;
  specs: string;
  price: string;
  image: string;
}

const categories: CategoryItem[] = [
  {
    id: "split-ac",
    slug: "split-ac",
    name: "Split Air Conditioners",
    type: "residential",
    typeLabel: "Residential",
    specs: "1.0 - 2.5 Ton • 5★ Inverter",
    price: "From ₹31,990",
    image: splitAc,
  },
  {
    id: "cassette-ac",
    slug: "cassette-ac",
    name: "Ceiling Cassette ACs",
    type: "commercial",
    typeLabel: "Commercial",
    specs: "2.0 - 4.5 Ton • 360° Airflow",
    price: "From ₹62,000",
    image: cassetteAc,
  },
  {
    id: "ductable-ac",
    slug: "ductable-ac",
    name: "Ductable Air Conditioners",
    type: "commercial",
    typeLabel: "Commercial",
    specs: "3.0 - 11.0 Ton • Concealed",
    price: "From ₹95,000",
    image: ductableAc,
  },
  {
    id: "vrv-vrf",
    slug: "vrv-vrf",
    name: "VRF / VRV Central Systems",
    type: "commercial",
    typeLabel: "Commercial",
    specs: "Multi-Zone • Variable Flow",
    price: "Custom BOQ",
    image: vrvImg,
  },
  {
    id: "tower-ac",
    slug: "tower-ac",
    name: "Floor Standing Tower ACs",
    type: "commercial",
    typeLabel: "Commercial",
    specs: "2.5 - 5.0 Ton • High Air Throw",
    price: "From ₹74,500",
    image: towerAc,
  },
  {
    id: "chillers",
    slug: "chiller",
    name: "Central Chillers & Plants",
    type: "industrial",
    typeLabel: "Industrial",
    specs: "10 - 500 TR • Water / Air Cooled",
    price: "Custom BOQ",
    image: chillerImg,
  },
  {
    id: "ahu",
    slug: "air-handling-unit",
    name: "Air Handling Units (AHU)",
    type: "industrial",
    typeLabel: "Industrial",
    specs: "Double Skin • HEPA Filtration",
    price: "Custom BOQ",
    image: ahuImg,
  },
  {
    id: "cold-room",
    slug: "cold-room",
    name: "Cold Rooms & Storage",
    type: "industrial",
    typeLabel: "Industrial",
    specs: "PUF Insulated • -25°C to +15°C",
    price: "Turnkey Setup",
    image: coldRoomImg,
  },
];

const tabs: { key: CategoryTab; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "industrial", label: "Industrial" },
];

export default function ProductCategories() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const navigate = useNavigate();

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((c) => c.type === activeTab);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header (Clean & Minimal) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-[#0284C7] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#0284C7]" />
              HVAC Product Range
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight">
              Shop by Top Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl font-normal">
              Engineered cooling, heating, and ventilation equipment for spaces of every scale.
            </p>
          </div>

          {/* Clean Segment Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#051B30] shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-slate-100 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Modern Product Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#0284C7]/50 shadow-xs hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Bar: Category Pill & Floating Arrow */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 uppercase tracking-wider">
                      {cat.typeLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-[#0284C7] group-hover:border-[#0284C7] group-hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300 shadow-2xs">
                      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Clean Visual Stage (Enlarged Hero Product Image) */}
                  <div className="h-48 sm:h-52 w-full bg-gradient-to-b from-sky-50/60 via-slate-50/40 to-transparent rounded-xl flex items-center justify-center p-2 relative overflow-hidden my-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full max-h-44 sm:max-h-48 w-auto max-w-[92%] object-contain filter drop-shadow-sm group-hover:scale-108 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-1 mt-2">
                    {cat.name}
                  </h3>

                  {/* Concise Spec line */}
                  <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
                    {cat.specs}
                  </p>
                </div>

                {/* Bottom Row: Price & Quick Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#051B30]">
                    {cat.price}
                  </span>
                  <span className="text-xs font-semibold text-[#0284C7] group-hover:text-[#051B30] flex items-center gap-1 transition-colors">
                    Explore
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Sleek Minimal Consultation Strip ── */}
        <div className="mt-12 bg-gradient-to-r from-[#051B30] to-[#0A2540] rounded-2xl p-6 sm:p-7 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need custom HVAC tonnage calculation or commercial BOQ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our certified HVAC engineers provide free site surveys and tailored equipment recommendations.
            </p>
          </div>
          <button
            onClick={() => navigate("/contact")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0275B0] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer hover:shadow-md"
          >
            <PhoneCall size={16} />
            Request Free Site Survey
          </button>
        </div>

      </div>
    </section>
  );
}