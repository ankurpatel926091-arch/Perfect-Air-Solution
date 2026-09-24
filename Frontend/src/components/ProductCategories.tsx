import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, PhoneCall, ArrowRight } from "lucide-react";
import {
  SplitAcIcon,
  CassetteAcIcon,
  DuctableAcIcon,
  VrfSystemIcon,
  TowerAcIcon,
  ChillerPlantIcon,
  AhuIcon,
  ColdRoomIcon,
  VentilationIcon,
  WindowAcIcon,
  CleanRoomIcon,
  CommercialFreezerIcon,
  HeatPumpIcon,
  WaterCoolerIcon,
  AirPurifierIcon,
  PrecisionAcIcon,
  AmcServiceIcon,
  AcInstallationIcon,
} from "./icons/HVACCategoryIcons";

type CategoryFilter = "all" | "residential" | "commercial" | "industrial";

interface CategoryItem {
  id: string;
  name: string;
  type: "residential" | "commercial" | "industrial";
  icon: React.FC<{ size?: number; className?: string }>;
  link: string;
}

const categoriesList: CategoryItem[] = [
  {
    id: "split-ac",
    name: "Split Air Conditioners",
    type: "residential",
    icon: SplitAcIcon,
    link: "/category/split-ac",
  },
  {
    id: "cassette-ac",
    name: "Ceiling Cassette ACs",
    type: "commercial",
    icon: CassetteAcIcon,
    link: "/category/cassette-ac",
  },
  {
    id: "ductable-ac",
    name: "Ductable Air Conditioners",
    type: "commercial",
    icon: DuctableAcIcon,
    link: "/category/ductable-ac",
  },
  {
    id: "vrv-vrf",
    name: "VRF / VRV Central Systems",
    type: "commercial",
    icon: VrfSystemIcon,
    link: "/category/vrv-vrf",
  },
  {
    id: "tower-ac",
    name: "Floor Standing Tower ACs",
    type: "commercial",
    icon: TowerAcIcon,
    link: "/category/tower-ac",
  },
  {
    id: "chillers",
    name: "Central Chillers & Plants",
    type: "industrial",
    icon: ChillerPlantIcon,
    link: "/category/chiller",
  },
  {
    id: "ahu",
    name: "Air Handling Units (AHU)",
    type: "industrial",
    icon: AhuIcon,
    link: "/category/air-handling-unit",
  },
  {
    id: "cold-room",
    name: "Cold Rooms & Cold Storage",
    type: "industrial",
    icon: ColdRoomIcon,
    link: "/category/cold-room",
  },
  {
    id: "ventilation",
    name: "Ventilation & Exhaust Systems",
    type: "industrial",
    icon: VentilationIcon,
    link: "/service/ventilation-solutions",
  },
  {
    id: "window-ac",
    name: "Window Air Conditioners",
    type: "residential",
    icon: WindowAcIcon,
    link: "/category/split-ac",
  },
  {
    id: "clean-room",
    name: "Modular OT & Clean Rooms",
    type: "industrial",
    icon: CleanRoomIcon,
    link: "/category/air-handling-unit",
  },
  {
    id: "deep-freezers",
    name: "Commercial Deep Freezers",
    type: "commercial",
    icon: CommercialFreezerIcon,
    link: "/category/cold-room",
  },
  {
    id: "heat-pumps",
    name: "Commercial Heat Pumps",
    type: "commercial",
    icon: HeatPumpIcon,
    link: "/product",
  },
  {
    id: "water-coolers",
    name: "Water Coolers & Dispensers",
    type: "commercial",
    icon: WaterCoolerIcon,
    link: "/product",
  },
  {
    id: "air-purifiers",
    name: "Air Purifiers & Filtration",
    type: "residential",
    icon: AirPurifierIcon,
    link: "/product",
  },
  {
    id: "precision-ac",
    name: "Precision AC (Data Centers)",
    type: "industrial",
    icon: PrecisionAcIcon,
    link: "/category/vrv-vrf",
  },
  {
    id: "amc-service",
    name: "Annual Maintenance (AMC)",
    type: "commercial",
    icon: AmcServiceIcon,
    link: "/service/annual-maintenance-contract",
  },
  {
    id: "ac-installation",
    name: "AC Installation & Piping",
    type: "residential",
    icon: AcInstallationIcon,
    link: "/service/ac-installation",
  },
];

const filterTabs: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All Categories" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "industrial", label: "Industrial & Plants" },
];

export default function ProductCategories() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const navigate = useNavigate();

  const filteredCategories =
    activeTab === "all"
      ? categoriesList
      : categoriesList.filter((c) => c.type === activeTab);

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-[#F8FAFC] via-[#F1F7FC] to-[#E6F4FA] font-sans relative overflow-hidden">
      {/* Soft Ambient Glows matching project style (No harsh grid lines) */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
              <Sparkles size={13} className="text-[#0284C7]" />
              HVAC PRODUCT RANGE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight">
              HVAC Equipment &amp; Categories
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Explore our complete range of residential, commercial, and industrial air conditioning and climate control systems.
            </p>
          </div>

          {/* Segment Filter Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#051B30] font-bold shadow-2xs"
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

        {/* ── Clean Normal Icon Grid (Matching Reference Photo 2) ── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: index * 0.015, duration: 0.25 }}
                  className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:shadow-sky-500/10 hover:border-[#0284C7]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default select-none min-h-[155px] sm:min-h-[170px]"
                >
                  {/* Standalone Detailed Icon - Increased Size */}
                  <div className="flex items-center justify-center h-16 sm:h-18 w-full transition-transform duration-300 group-hover:scale-110">
                    <IconComponent size={62} />
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors leading-snug text-center mt-3 sm:mt-3.5 px-1">
                    {item.name}
                  </h3>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Consultation Bar at Bottom ── */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#051B30] to-[#0A2540] rounded-2xl p-5 sm:p-7 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-700/60">
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white font-sans">
              Need custom HVAC load calculations or a commercial project BOQ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Our certified HVAC engineers offer complimentary site inspections and equipment guidance.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigate("/product")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all border border-white/15 cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0275B0] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer hover:shadow-md"
            >
              <PhoneCall size={15} />
              <span>Get Free Consultation</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}