import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  MapPin,
  Building2,
  Thermometer,
  Wind,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Filter,
  ArrowRight,
} from "lucide-react";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import CTASection from "@/components/CTASection";

import commercialImg from "@/assets/commercial.jpg";
import showcaseAcImg from "@/assets/about_ac_showcase.jpg";
import vrvVrfImg from "@/assets/vrv-vrf.png";
import chillerImg from "@/assets/categories/chiller.jpg";
import coldRoomImg from "@/assets/categories/cold-room.png";
import ahuImg from "@/assets/categories/air-handling-unit.png";
import ductableImg from "@/assets/categories/ductable.jpg";

// PDF Generator Utility
function generatePDF(study: any) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Header Banner
  doc.setFillColor(4, 28, 51);
  doc.rect(0, 0, pageWidth, 48, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("PERFECT AIR SOLUTION", margin, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(56, 189, 248);
  doc.text("Turnkey HVAC Engineering & Technical Case Study", margin, 28);

  doc.setTextColor(200, 225, 255);
  doc.text(`Category: ${study.category || "HVAC Solution"} | Year: ${study.completionYear || "2024"}`, margin, 36);

  y = 65;

  // Title
  doc.setTextColor(5, 27, 48);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(study.title || study.name || "HVAC Project", contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 4;

  // Metadata strip
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Location: ${study.location || "North India"}  |  Client: ${study.client || "Commercial"}  |  System: ${study.systemType || "HVAC System"}`,
    margin,
    y
  );
  y += 12;

  // Divider Line
  doc.setDrawColor(2, 132, 199);
  doc.setLineWidth(1.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Challenge
  doc.setTextColor(5, 27, 48);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Project Challenge & Scope", margin, y);
  y += 7;

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const challengeLines = doc.splitTextToSize(study.challenge || study.description || "Complex engineering setup.", contentWidth);
  doc.text(challengeLines, margin, y);
  y += challengeLines.length * 5 + 10;

  // Solution
  if (study.solution) {
    doc.setTextColor(5, 27, 48);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Engineering Solution Implemented", margin, y);
    y += 7;

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const solutionLines = doc.splitTextToSize(study.solution, contentWidth);
    doc.text(solutionLines, margin, y);
    y += solutionLines.length * 5 + 10;
  }

  // Key Results
  doc.setTextColor(5, 27, 48);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Key Deliverables & Performance Results", margin, y);
  y += 9;

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  const resultsList = study.results || [
    "Successfully installed and commissioned with zero operational downtime",
    "Completed on-time within approved engineering budget parameters",
    "Optimized seasonal energy consumption and indoor air quality standards",
  ];

  resultsList.forEach((r: string) => {
    doc.setFillColor(2, 132, 199);
    doc.circle(margin + 3, y - 1.5, 1.5, "F");
    doc.text(r, margin + 9, y);
    y += 7;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Perfect Air Solution | Turnkey Commercial & Residential HVAC | Phone: +91 98391 71701 | info@perfectairsolution.com",
    margin,
    footerY
  );

  doc.save(`${(study.title || study.name || "hvac-project").replace(/\s+/g, "-").toLowerCase()}-case-study.pdf`);
}

// Default Featured Showcase Case Studies
const featuredShowcaseProjects = [
  {
    id: "proj-1",
    title: "Apollo Medical Hospital VRF & Modular OT Cleanroom",
    category: "Hospital & Industrial",
    completionYear: "2024",
    location: "Lucknow, UP",
    client: "Apollo Healthcare Group",
    systemType: "Daikin VRF System + HEPA AHU Units",
    units: "250 HP Capacity (45 Outdoor Units)",
    image: showcaseAcImg,
    challenge:
      "The multi-storey medical hospital required 24/7 continuous temperature and humidity control across sterile surgical operating suites, intensive care units, and diagnostic laboratories with zero tolerance for downtime or contamination.",
    solution:
      "Engineered an inverted multi-module VRF climate control system coupled with specialized Air Handling Units (AHUs) fitted with HEPA filtration to maintain positive air pressure and sub-micron purity.",
    results: [
      "100% Sterile positive-pressure airflow maintained across surgical suites",
      "32% Reduction in seasonal electrical energy consumption",
      "Zero operational downtime achieved during system commissioning",
    ],
  },
  {
    id: "proj-2",
    title: "Grand Palace Hotel & Convention Center Central Chiller Plant",
    category: "Commercial HVAC",
    completionYear: "2023",
    location: "Kanpur, UP",
    client: "Grand Palace Hospitality",
    systemType: "Water-Cooled Screw Chiller & FCU Network",
    units: "400 Tonnage Plant",
    image: commercialImg,
    challenge:
      "The 5-star hotel required ultra-quiet, high-capacity cooling across 180 guest rooms, 3 grand banquet halls, and fine dining restaurants with flexible zone control during peak events.",
    solution:
      "Installed dual high-efficiency Water-Cooled Screw Chillers connected to an automated Building Management System (BMS) for intelligent variable load balancing.",
    results: [
      "Ultra-silent indoor room acoustics (<32 dB noise rating)",
      "Automated energy optimization during low-occupancy hours",
      "Project delivered and commissioned 15 days ahead of schedule",
    ],
  },
  {
    id: "proj-3",
    title: "Apex Agro Fresh Cold Storage & Preservation Park",
    category: "Chiller & Cold Storage",
    completionYear: "2024",
    location: "Unnao Industrial Zone",
    client: "Apex Agro Logistics",
    systemType: "Industrial Refrigeration & Modular Cold Rooms",
    units: "1,500 MT Capacity",
    image: coldRoomImg,
    challenge:
      "Required precise temperature regulation between -25°C to +4°C with dual-chamber insulation for perishable agricultural export storage.",
    solution:
      "Designed heavy-duty industrial condensing units with 150mm polyurethane insulated sandwich panels and automated backup generator failover loops.",
    results: [
      "Precision temperature stability within ±0.5°C tolerance",
      "Rapid pull-down chilling performance during fresh stock intake",
      "Integrated 24/7 IoT remote telemetry and emergency alarm alerts",
    ],
  },
  {
    id: "proj-4",
    title: "Horizon Tech Park Tower-B Commercial VRV Air Conditioning",
    category: "VRF Systems",
    completionYear: "2023",
    location: "Noida, NCR",
    client: "Horizon Realtech Developers",
    systemType: "Heat Recovery VRV + Ceiling Cassettes",
    units: "600 HP (12 Floors)",
    image: vrvVrfImg,
    challenge:
      "A 12-storey commercial IT park required independent tenant power usage billing, simultaneous heating/cooling capability, and low-profile ceiling aesthetic diffusers.",
    solution:
      "Deployed variable refrigerant flow technology with heat recovery units and centralized touch-screen monitoring connected to individual tenant smart meters.",
    results: [
      "Precise individual tenant power metering and billing integration",
      "40% Lower operational energy costs compared to central plant designs",
      "Committed 5-Year Comprehensive AMC Service Agreement",
    ],
  },
  {
    id: "proj-5",
    title: "Premier Textile Manufacturing Facility Ducting & Ventilation",
    category: "Hospital & Industrial",
    completionYear: "2023",
    location: "Hardoi Industrial Area",
    client: "Premier Textiles Ltd",
    systemType: "Heavy-Duty Air Handling Units & Evaporative Ducting",
    units: "80,000 CFM Airflow",
    image: ahuImg,
    challenge:
      "High heat generation from industrial weaving looms and airborne fiber dust compromised worker safety and factory air quality.",
    solution:
      "Engineered positive-pressure evaporative cooling units paired with high-volume centrifugal exhaust fans and galvanized spiral duct distribution.",
    results: [
      "12°C Ambient temperature reduction across the manufacturing floor",
      "99.2% Airborne fiber dust filtration efficiency",
      "Full compliance with industrial safety and air purity norms",
    ],
  },
  {
    id: "proj-6",
    title: "Civil Lines Executive Villa Architectural Ductable Climate System",
    category: "VRF Systems",
    completionYear: "2024",
    location: "Hardoi, UP",
    client: "Private Luxury Residence",
    systemType: "Slim Concealed Ductable ACs & Cassettes",
    units: "35 Tonnage",
    image: ductableImg,
    challenge:
      "The client requested completely hidden air conditioning with architectural linear slot diffusers that blended seamlessly into luxury interior ceiling woodwork.",
    solution:
      "Installed ultra-slim ceiling concealed ductable split units with custom continuous slot diffusers and silent inverter compressor technology.",
    results: [
      "Seamless architectural ceiling integration with zero exposed units",
      "Independent room-by-room Wi-Fi smart mobile app controls",
      "100% Client satisfaction rating and ongoing maintenance",
    ],
  },
];

const filterCategories = [
  "All Projects",
  "Commercial HVAC",
  "VRF Systems",
  "Chiller & Cold Storage",
  "Hospital & Industrial",
];

const CaseStudies = () => {
  const { data: apiProjects = [], isLoading } = useGetProjectsQuery();
  const [activeCategory, setActiveCategory] = useState("All Projects");

  if (isLoading) return <Loader fullScreen />;

  // Combine or select backend projects vs featured showcase
  const combinedProjects =
    apiProjects.length > 0 &&
    !apiProjects.every((p: any) => (p.title || p.name || "").toLowerCase().includes("sample"))
      ? apiProjects.map((p: any, idx: number) => ({
          id: p._id || p.id || `api-${idx}`,
          title: p.title || p.name || "HVAC Project",
          category: p.category || "Commercial HVAC",
          completionYear: p.completionYear || "2024",
          location: p.location || "Uttar Pradesh",
          client: p.client || p.units || "Commercial Client",
          systemType: p.systemType || "HVAC System",
          units: p.units || "Custom Tonnage",
          image: p.featuredImage || p.images?.[0] || p.image || featuredShowcaseProjects[idx % featuredShowcaseProjects.length].image,
          challenge: p.challenge || p.description || "Turnkey HVAC installation engineered for high performance.",
          solution: p.solution || "Custom cooling layout designed by certified engineers.",
          results: p.results || [
            "Successfully installed and commissioned",
            "On-time project delivery",
            "Energy-efficient cooling performance",
          ],
        }))
      : featuredShowcaseProjects;

  const filteredProjects =
    activeCategory === "All Projects"
      ? combinedProjects
      : combinedProjects.filter(
          (p: any) =>
            p.category?.toLowerCase() === activeCategory.toLowerCase() ||
            (activeCategory === "VRF Systems" && p.category?.includes("VRF")) ||
            (activeCategory === "Commercial HVAC" && p.category?.includes("Commercial")) ||
            (activeCategory === "Chiller & Cold Storage" && (p.category?.includes("Chiller") || p.category?.includes("Cold"))) ||
            (activeCategory === "Hospital & Industrial" && (p.category?.includes("Hospital") || p.category?.includes("Industrial")))
        );

  return (
    <main className="bg-slate-50 font-sans min-h-screen">
      
      {/* ── Top Hero Banner ── */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-9 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-2.5 backdrop-blur-md">
            <FileText size={14} className="text-cyan-300" />
            <span>OUR PROJECTS &amp; CASE STUDIES</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3.5 leading-tight"
          >
            HVAC Engineering Projects &amp; <span className="text-cyan-300">Case Studies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-4"
          >
            Explore our portfolio of commercial, industrial, healthcare, and residential HVAC installations across Northern India. Download detailed technical project case studies in PDF format.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-xl mx-auto">
            <span>✓ 500+ Projects Completed</span>
            <span>✓ 15,000+ Commercial Tonnes</span>
            <span>✓ PDF Case Studies</span>
          </div>
        </div>
      </section>

      {/* ── Main Content & Projects Section ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Filter size={18} className="text-[#0284C7]" />
            <span>Filter Projects by Category:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {filterCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-[#0284C7] text-white border-[#0284C7] shadow-md shadow-sky-500/25"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-[#0284C7]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((study: any, i: number) => (
              <motion.article
                key={study.id || i}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Header Image */}
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-[#0284C7] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                        {study.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-slate-900/80 backdrop-blur-md text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">
                        {study.completionYear}
                      </span>
                    </div>

                    {/* Bottom Metadata in Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white flex flex-wrap gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <MapPin size={13} className="text-cyan-400" />
                        {study.location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Building2 size={13} className="text-cyan-400" />
                        {study.client}
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Thermometer size={13} className="text-cyan-400" />
                        {study.systemType}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#051B30] group-hover:text-[#0284C7] transition-colors leading-snug mb-4">
                      {study.title}
                    </h2>

                    {/* Scope & Challenge */}
                    <div className="mb-4">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-sky-700 mb-1.5 flex items-center gap-1.5">
                        <Wind size={14} className="text-[#0284C7]" />
                        <span>Project Challenge &amp; Scope</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {study.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    {study.solution && (
                      <div className="mb-5">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-sky-700 mb-1.5 flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-[#0284C7]" />
                          <span>Engineering Solution</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {study.solution}
                        </p>
                      </div>
                    )}

                    {/* Key Results */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                      <div className="text-xs font-extrabold text-[#051B30] uppercase tracking-wider mb-2.5">
                        Key Performance Results
                      </div>
                      <ul className="space-y-2">
                        {(study.results || []).map((r: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 size={16} className="text-[#0284C7] flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={() => generatePDF(study)}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-sky-500/25 transition-all"
                  >
                    <Download size={16} />
                    <span>Download Project PDF</span>
                  </button>

                  <Link
                    to="/contact"
                    className="w-full sm:w-auto border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-[#0284C7] bg-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-decoration-none"
                  >
                    <span>Enquire Similar Project</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <CTASection />
    </main>
  );
};

export default CaseStudies;