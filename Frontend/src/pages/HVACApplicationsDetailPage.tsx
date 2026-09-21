import React from "react";
import { motion } from "framer-motion";
import {
  Hotel,
  Cross,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  BarChart2,
  ArrowLeft,
  Thermometer,
  Wind,
  Zap,
  Shield,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  Server,
  Warehouse,
  Sparkles,
  Phone,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import servicesHeaderBg from "@/assets/HeaderBackgroundImg/ServicesBackground.png";

// ─── Application Data ──────────────────────────────────────────────────────────
type ApplicationItem = {
  icon: React.ReactNode;
  label: string;
  badge: string;
  heroDesc: string;
  cards: { icon: React.ReactNode; title: string; desc: string }[];
  features: string[];
};

const applicationData: Record<string, ApplicationItem> = {
  "hospitals-clinics": {
    icon: <Cross size={28} strokeWidth={2} />,
    label: "Healthcare & Hospital HVAC Solutions",
    badge: "HEALTHCARE HVAC",
    heroDesc:
      "Hospitals and healthcare facilities require highly controlled indoor environments to maintain hygiene, infection control, and patient comfort. Our HVAC systems are engineered for precise temperature control, HEPA air filtration, and NABH compliance.",
    cards: [
      {
        icon: <Shield size={22} />,
        title: "Hospitals & Medical Colleges",
        desc: "Specialized HVAC installations ensuring continuous fresh air circulation, HEPA filtration compatibility, and reliable 24/7 performance for critical healthcare operations.",
      },
      {
        icon: <Wind size={22} />,
        title: "Clinics & Diagnostic Labs",
        desc: "Precision-controlled environments for diagnostic centers with strict temperature and humidity regulation to protect sensitive diagnostic equipment and biological samples.",
      },
      {
        icon: <Thermometer size={22} />,
        title: "Operation Theatres (OT)",
        desc: "Positive/negative pressure cleanrooms with 99.97% HEPA air filtration ensuring ultra-sterile conditions for operating suites and surgical procedures.",
      },
      {
        icon: <Zap size={22} />,
        title: "ICUs & Patient Isolation Wards",
        desc: "Dedicated air handling systems with continuous fresh air supply and pressure management to prevent cross-contamination in ICUs and recovery wards.",
      },
    ],
    features: [
      "NABH Compliance Ready",
      "99.97% HEPA Filtration",
      "Redundant System Design",
      "24/7 Air Quality Monitoring",
    ],
  },
  "hotels-restaurants": {
    icon: <Hotel size={28} strokeWidth={2} />,
    label: "Hospitality & Hotel HVAC Solutions",
    badge: "HOSPITALITY HVAC",
    heroDesc:
      "Hotels, resorts, and dining venues require quiet, efficient climate control to provide guests with exceptional comfort. Our HVAC solutions deliver customized temperature zoning, kitchen ventilation, and low-noise air delivery.",
    cards: [
      {
        icon: <Thermometer size={22} />,
        title: "Hotels & Luxury Resorts",
        desc: "Individually controlled VRF/VRV climate units for guest rooms, maintaining personalized room temperature and ultra-quiet <28dB operation.",
      },
      {
        icon: <Wind size={22} />,
        title: "Banquet & Event Halls",
        desc: "High-capacity air handling for large event crowds with automated humidity and cooling controls that adjust rapidly to occupancy changes.",
      },
      {
        icon: <Zap size={22} />,
        title: "Restaurants & Commercial Kitchens",
        desc: "Heavy-duty kitchen hood ventilation, grease extraction, and makeup air systems ensuring fresh, odor-free dining room environments.",
      },
      {
        icon: <Shield size={22} />,
        title: "Conference & Meeting Rooms",
        desc: "Smart occupancy-adaptive climate controls maintaining fresh air exchange and CO₂ balance during long corporate meetings.",
      },
    ],
    features: [
      "24/7 Operational Reliability",
      "Ultra-Quiet Operation (<28dB)",
      "Kitchen Ventilation & Exhaust",
      "Smart BMS Automation Integration",
    ],
  },
  "offices-it-parks": {
    icon: <Briefcase size={28} strokeWidth={2} />,
    label: "Commercial Office & IT Park HVAC",
    badge: "COMMERCIAL OFFICE HVAC",
    heroDesc:
      "Modern corporate offices and IT parks require energy-efficient HVAC systems to maximize workplace comfort and employee productivity. We deliver VRF central plants, VAV zoning, and IoT monitoring.",
    cards: [
      {
        icon: <Wind size={22} />,
        title: "Corporate Offices & Headquarters",
        desc: "Variable Air Volume (VAV) systems with smart multi-zone temperature regulation tailored to open-plan office layouts.",
      },
      {
        icon: <Thermometer size={22} />,
        title: "IT Parks & Tech Campuses",
        desc: "High-tonnage central chiller plants and VRF outdoor modules delivering continuous round-the-clock cooling for IT infrastructure.",
      },
      {
        icon: <Zap size={22} />,
        title: "Co-Working Spaces",
        desc: "Flexible, demand-responsive cooling systems that dynamically adjust airflow to varying daily occupancy across shared work desks.",
      },
      {
        icon: <Shield size={22} />,
        title: "Commercial Towers",
        desc: "Full Building Management System (BMS) integration with energy dashboards and automated predictive maintenance alerts.",
      },
    ],
    features: [
      "Smart BMS & IoT Dashboards",
      "LEED & Green Building Support",
      "Demand-Controlled Ventilation",
      "Multi-Zone VRF Energy Savings",
    ],
  },
  "retail-stores": {
    icon: <ShoppingBag size={28} strokeWidth={2} />,
    label: "Retail & Shopping Mall HVAC Solutions",
    badge: "RETAIL & MALL HVAC",
    heroDesc:
      "High footfall retail environments require reliable cooling and ventilation to keep shoppers engaged. We design ducted air distribution and AHU systems engineered for heavy traffic and fast thermal recovery.",
    cards: [
      {
        icon: <Thermometer size={22} />,
        title: "Shopping Malls & Outlets",
        desc: "Central water-cooled chiller plants paired with ceiling AHUs ensuring even cooling across multi-level retail concourses and food courts.",
      },
      {
        icon: <Wind size={22} />,
        title: "Retail Showrooms",
        desc: "Slim ductable air conditioning and flush ceiling cassettes providing uniform cooling without hot spots across display floors.",
      },
      {
        icon: <Shield size={22} />,
        title: "Supermarkets & Hypermarkets",
        desc: "Integrated HVAC and refrigeration management protecting open product displays while maintaining customer comfort.",
      },
      {
        icon: <Zap size={22} />,
        title: "Multiplex Cinemas",
        desc: "Acoustically insulated ductwork and high-CFM air handling providing silent, draft-free air conditioning for movie halls.",
      },
    ],
    features: [
      "High Foot-Traffic Rating",
      "Rapid Thermal Recovery",
      "Low Operational Maintenance",
      "Zoned Air Metering",
    ],
  },
  "industrial-buildings": {
    icon: <BarChart2 size={28} strokeWidth={2} />,
    label: "Industrial & Manufacturing HVAC Solutions",
    badge: "INDUSTRIAL HVAC",
    heroDesc:
      "Industrial plants, factories, and pharma cleanrooms demand heavy-duty climate control, dust extraction, and humidity regulation to ensure worker safety, production accuracy, and regulatory compliance.",
    cards: [
      {
        icon: <Wind size={22} />,
        title: "Manufacturing Plants",
        desc: "High-volume evaporative and ducted industrial cooling systems delivering continuous airflow across expansive production floors.",
      },
      {
        icon: <Thermometer size={22} />,
        title: "Pharma Cleanrooms",
        desc: "GMP-certified HVAC cleanroom design maintaining positive room pressure, HEPA filtration, and strict relative humidity thresholds.",
      },
      {
        icon: <Zap size={22} />,
        title: "Food Processing Facilities",
        desc: "Hygienic, stainless-steel ducting and washdown-ready AHU units ensuring pristine air quality for food preparation zones.",
      },
      {
        icon: <Shield size={22} />,
        title: "Electronics & ESD Facilities",
        desc: "Precision ESD-safe climate systems maintaining exact relative humidity limits to eliminate electrostatic discharge risks.",
      },
    ],
    features: [
      "GMP & Cleanroom Compliant",
      "Corrosion-Resistant Construction",
      "High Ambient Operation (up to 52°C)",
      "Continuous CFM Airflow Balancing",
    ],
  },
  "schools-colleges": {
    icon: <GraduationCap size={28} strokeWidth={2} />,
    label: "Educational Institution HVAC Solutions",
    badge: "EDUCATION HVAC",
    heroDesc:
      "Classrooms, libraries, and university auditoriums need silent, well-ventilated environments for student focus. We provide energy-efficient, low-noise HVAC systems with CO₂ air quality monitoring.",
    cards: [
      {
        icon: <Wind size={22} />,
        title: "School Classrooms",
        desc: "Energy Recovery Ventilators (ERV) with automatic CO₂ monitoring, infusing fresh oxygen to keep students alert and focused.",
      },
      {
        icon: <Thermometer size={22} />,
        title: "Colleges & Auditoriums",
        desc: "High-capacity air conditioning for university auditoriums and examination centers with scheduled zone-timer controls.",
      },
      {
        icon: <Shield size={22} />,
        title: "University Campuses",
        desc: "Centralized BMS-integrated HVAC infrastructure covering libraries, computer labs, and administrative blocks efficiently.",
      },
      {
        icon: <Zap size={22} />,
        title: "Vocational Labs & Workshops",
        desc: "Dedicated exhaust and ventilation systems clearing dust and fumes from technical training laboratories.",
      },
    ],
    features: [
      "Ultra-Low Noise Air Ducting",
      "CO₂ & Indoor Air Quality Sensors",
      "Scheduled Timer Automation",
      "Energy-Star High EER Rating",
    ],
  },
  "data-centers": {
    icon: <Server size={28} strokeWidth={2} />,
    label: "Data Center Precision Cooling Solutions",
    badge: "DATA CENTER COOLING",
    heroDesc:
      "Data centers and server rooms demand precision cooling systems (PAC) with N+1 redundancy to prevent thermal throttling and protect high-density IT infrastructure 24/7.",
    cards: [
      {
        icon: <Thermometer size={22} />,
        title: "Enterprise Data Centers",
        desc: "Precision Air Conditioning (PAC) units with N+1 redundancy maintaining critical temperature (±0.5°C) and humidity limits.",
      },
      {
        icon: <Shield size={22} />,
        title: "Server Rooms & IT Closets",
        desc: "In-row and perimeter cooling modules optimized for hot/cold aisle containment to maximize PUE efficiency.",
      },
      {
        icon: <Wind size={22} />,
        title: "Network Operation Centers (NOC)",
        desc: "Continuous, dual-circuit cooling systems with automatic failover protection ensuring uninterrupted uptime.",
      },
      {
        icon: <Zap size={22} />,
        title: "Precision Humidity Control",
        desc: "Dehumidification and humidification systems preventing electrostatic discharge and condensation risk.",
      },
    ],
    features: [
      "N+1 Redundant Architecture",
      "Precision ±0.5°C Temp Control",
      "24/7 Remote SNMP Alarms",
      "Hot/Cold Aisle Compatibility",
    ],
  },
  "warehouses-cold-storage": {
    icon: <Warehouse size={28} strokeWidth={2} />,
    label: "Warehouse & Cold Storage HVAC Solutions",
    badge: "COLD STORAGE & WAREHOUSE",
    heroDesc:
      "Cold storage facilities and logistics hubs require precision low-temperature refrigeration and heavy-duty ventilation to prevent product degradation and maintain supply chain integrity.",
    cards: [
      {
        icon: <Thermometer size={22} />,
        title: "Cold Storage & Blast Freezers",
        desc: "Industrial refrigeration plants maintaining precise sub-zero temperatures for perishable foods, agricultural produce, and vaccines.",
      },
      {
        icon: <Wind size={22} />,
        title: "Logistics Hubs & Warehouses",
        desc: "Large-volume ventilation and thermal insulation preventing condensation buildup and maintaining inventory safety.",
      },
      {
        icon: <Shield size={22} />,
        title: "Pharma Storage Facilities",
        desc: "HACCP & WHO-compliant cold rooms with digital temperature datalogging for pharmaceutical storage.",
      },
      {
        icon: <Zap size={22} />,
        title: "Distribution Centers",
        desc: "Multi-zone temperature management allowing separate cooling thresholds for fresh, frozen, and ambient loading bays.",
      },
    ],
    features: [
      "Sub-Zero Temperature Capability",
      "Digital Remote Temp Logging",
      "HACCP Food Safety Compliant",
      "Energy-Saving Inverter Compressors",
    ],
  },
};

// ─── Slug Map ──────────────────────────────────────────────────────────────────
const slugMap: Record<string, string> = {
  "Healthcare HVAC Solutions": "hospitals-clinics",
  "Hospitality & Hotel HVAC Solutions": "hotels-restaurants",
  "Commercial Office HVAC Solutions": "offices-it-parks",
  "Retail & Mall HVAC Solutions": "retail-stores",
  "Industrial & Manufacturing HVAC Solutions": "industrial-buildings",
  "Educational Institution HVAC Solutions": "schools-colleges",
  "Data Center HVAC Solutions": "data-centers",
  "Warehouse & Cold Storage HVAC Solutions": "warehouses-cold-storage",
  "Hotels & Restaurants": "hotels-restaurants",
  "Hospitals & Clinics": "hospitals-clinics",
  "Schools & Colleges": "schools-colleges",
  "Offices & IT Parks": "offices-it-parks",
  "Retail Stores": "retail-stores",
  "Industrial Buildings": "industrial-buildings",
};

export function getApplicationSlug(label: string): string {
  return slugMap[label] ?? label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Page Component ────────────────────────────────────────────────────────────
export function HVACApplicationsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Listing page view when no slug or invalid slug
  if (!slug || !applicationData[slug]) {
    return (
      <main className="bg-slate-50 font-sans min-h-screen">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
          {/* Background Image with Clear Visibility */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={servicesHeaderBg}
              alt="Industries & Applications"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/75 via-[#03172C]/35 to-[#03172C]/90" />
          </div>

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
              <Sparkles size={14} className="text-cyan-300" />
              <span>INDUSTRIES &amp; APPLICATIONS</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
            >
              Commercial HVAC <span className="text-cyan-300">Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
            >
              Explore how Perfect Air Solution provides engineered climate control, VRF plants, and cleanroom air handling across commercial and industrial sectors.
            </motion.p>
          </div>
        </section>

        {/* Industry Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(applicationData).map(([key, item], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => navigate(`/hvac-applications/${key}`)}
                className="group relative bg-white rounded-xl p-6 border border-slate-200 shadow-none hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0284C7] border border-sky-100 flex items-center justify-center mb-4 group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0284C7] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.heroDesc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform">
                  <span>Explore Solutions</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const data = applicationData[slug];

  return (
    <main className="bg-slate-50 font-sans min-h-screen">
      {/* ── Top Hero Banner (Matches Header Standard) ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Background Image with Clear Visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={servicesHeaderBg}
            alt={data.label}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/75 via-[#03172C]/35 to-[#03172C]/90" />
        </div>

        {/* Ambient background light grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Back Navigation Link */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-cyan-200 hover:text-white font-medium mb-3 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Applications</span>
          </button>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
              <span className="flex items-center gap-1.5">{data.icon}</span>
              <span>{data.badge}</span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
          >
            {data.label}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
          >
            {data.heroDesc}
          </motion.p>

          {/* Feature Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3 border-t border-white/10 max-w-3xl mx-auto">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-200 text-xs font-semibold backdrop-blur-md"
              >
                <CheckCircle2 size={13} className="text-cyan-300" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions Cards Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-widest mb-3">
            <span>OUR SPECIALIZED SOLUTIONS</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tailored for <span className="text-[#0284C7]">{data.label}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="group relative bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-none hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0284C7] border border-sky-100 flex items-center justify-center mb-4 group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0284C7] transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform">
                <span>Certified Engineering</span>
                <CheckCircle size={13} className="text-[#0284C7]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Call to Action Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-gradient-to-br from-[#051B30] via-[#08355B] to-[#0F4C81] rounded-xl p-8 sm:p-12 text-white text-center shadow-none relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-3 leading-tight">
              Need Expert HVAC Design for Your Facility?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed">
              Consult with Perfect Air Solution engineers for turnkey HVAC design, load calculations, VRF system layout, and AMC consultation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-sky-500 text-white font-bold px-7 py-3.5 rounded-lg text-sm sm:text-base transition-all shadow-sm hover:shadow-sky-500/30 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <a
                href="tel:+919839171701"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-md text-sm sm:text-base transition-all border border-white/20 backdrop-blur-md cursor-pointer"
              >
                <Phone size={16} className="text-cyan-300" />
                <span>Call +91 98391 71701</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HVACApplicationsDetailPage;