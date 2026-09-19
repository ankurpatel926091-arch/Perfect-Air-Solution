import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Star,
  ChevronDown,
  ChevronRight,
  Layers,
  Thermometer,
  Wind,
  HelpCircle,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import productHeaderBg from "@/assets/HeaderBackgroundImg/ProductBackground.png";

// Images
import splitAcImg from "@/assets/categories/split-ac.png";
import cassetteAcImg from "@/assets/categories/cassette-ac.png";
import towerAcImg from "@/assets/categories/tower-ac.png";
import ductableAcImg from "@/assets/ductable-ac.png";
import vrvImg from "@/assets/vrv-vrf.png";
import chillerImg from "@/assets/chiller.png";
import ahuImg from "@/assets/ahu.png";
import coldRoomImg from "@/assets/cold-room.png";

interface ModelVariant {
  capacity: string;
  roomSize: string;
  powerRating: string;
  idealFor: string;
  priceEstimate: string;
}

interface CategoryDetail {
  slug: string;
  name: string;
  badge: string;
  type: string;
  tagline: string;
  description: string;
  image: string;
  startingPrice: string;
  warranty: string;
  specs: { label: string; value: string }[];
  keyFeatures: string[];
  models: ModelVariant[];
  compatibleBrands: string[];
  applications: string[];
  faqs: { q: string; a: string }[];
}

const categoriesData: Record<string, CategoryDetail> = {
  "split-ac": {
    slug: "split-ac",
    name: "Split Air Conditioners",
    badge: "RESIDENTIAL & COMMERCIAL COOLING",
    type: "Residential Cooling",
    tagline: "Ultra-quiet inverter cooling engineered for maximum power efficiency and superior air purification.",
    description:
      "Split Air Conditioners offer the perfect balance of aesthetic design, whisper-quiet operation, and advanced inverter technology. Perfect Air Solution supplies and installs 100% genuine split AC units from Daikin, Blue Star, Voltas, Hitachi, and Carrier. Designed with 100% copper condensers and eco-friendly R32/R410A refrigerants to deliver instant cooling even at extreme 52°C ambient temperatures.",
    image: splitAcImg,
    startingPrice: "₹31,990",
    warranty: "1 Year Comprehensive + 10 Years Compressor Warranty",
    specs: [
      { label: "Available Capacities", value: "1.0 Ton, 1.5 Ton, 2.0 Ton, 2.5 Ton" },
      { label: "Energy Efficiency", value: "3-Star & 5-Star ISEER Rated" },
      { label: "Condenser Coil", value: "100% Pure Grooved Copper" },
      { label: "Operating Noise", value: "Silent Operation as low as 19 dB" },
      { label: "Refrigerant", value: "Eco-Friendly R32 / R410A Green Gas" },
      { label: "Smart Controls", value: "WiFi IoT App & Alexa / Google Home Voice" },
    ],
    keyFeatures: [
      "Dual Rotary Inverter Compressor for variable-load power savings",
      "PM 2.5 and Anti-Bacterial Micro-Dust Air Filtration filters",
      "Stabilizer-free operation (130V to 285V voltage surge protection)",
      "Turbo Cool feature for instant drop in room temperature within minutes",
      "Anti-corrosive Blue Fin / Gold Fin protection for humid environments",
      "Precision digital thermostat with intelligent self-diagnosis errors",
    ],
    models: [
      { capacity: "1.0 Ton", roomSize: "Up to 110 sq. ft.", powerRating: "5★ Inverter", idealFor: "Small Bedrooms & Study Rooms", priceEstimate: "Starts ₹31,990" },
      { capacity: "1.5 Ton", roomSize: "110 - 180 sq. ft.", powerRating: "3★ / 5★ Inverter", idealFor: "Master Bedrooms & Living Rooms", priceEstimate: "Starts ₹37,500" },
      { capacity: "2.0 Ton", roomSize: "180 - 260 sq. ft.", powerRating: "3★ / 5★ Inverter", idealFor: "Large Halls, Executive Cabins & Dining", priceEstimate: "Starts ₹49,990" },
      { capacity: "2.5 Ton", roomSize: "260 - 350 sq. ft.", powerRating: "Heavy-Duty Inverter", idealFor: "Commercial Lounges & Conference Rooms", priceEstimate: "Starts ₹63,000" },
    ],
    compatibleBrands: ["Daikin", "Blue Star", "Voltas", "Hitachi", "Carrier", "Mitsubishi Electric", "Midea"],
    applications: ["Master Bedrooms", "Living Rooms", "Private Offices", "Boutique Retail Stores", "Clinics & Consultation Rooms"],
    faqs: [
      {
        q: "What tonnage split AC should I choose for my room?",
        a: "Generally, for rooms up to 110 sq. ft. a 1.0 Ton unit is recommended; for 110 to 180 sq. ft., a 1.5 Ton unit is ideal; and for areas above 180 sq. ft., a 2.0 Ton or higher capacity is advised. If your room is top-floor or receives direct sunlight, consider adding 0.5 Ton extra capacity.",
      },
      {
        q: "Do you offer professional installation and piping?",
        a: "Yes! Perfect Air Solution provides certified factory-grade installation including nitrogen pressure leak tests, vacuum pump evacuation, genuine copper piping, and heavy-duty outdoor mounting brackets.",
      },
      {
        q: "What is the warranty coverage on split air conditioners?",
        a: "All our supplied units carry 100% genuine OEM manufacturer warranties, typically 1 year comprehensive coverage and up to 10 years warranty on the inverter compressor.",
      },
    ],
  },
  "cassette-ac": {
    slug: "cassette-ac",
    name: "Ceiling Cassette Air Conditioners",
    badge: "COMMERCIAL & ARCHITECTURAL HVAC",
    type: "Commercial Cooling",
    tagline: "Sleek 360-degree flush ceiling cooling engineered for open corporate offices, showrooms, and luxury residences.",
    description:
      "Ceiling Cassette air conditioners integrate seamlessly into false ceilings, leaving wall space completely clutter-free while distributing conditioned air evenly in 4 directions or 360-degree round flow. Engineered for uniform cooling across large floor plates, cassette units are favored by interior designers and architects for luxury bungalows, boardrooms, retail showrooms, and restaurants.",
    image: cassetteAcImg,
    startingPrice: "₹62,000",
    warranty: "1 Year Machine + 5 Years Compressor Warranty",
    specs: [
      { label: "Available Capacities", value: "2.0 Ton, 3.0 Ton, 4.0 Ton, 4.5 Ton" },
      { label: "Air Distribution", value: "4-Way / 360-Degree Circular Airflow" },
      { label: "Condensate Drain", value: "Built-in High-Lift Drain Pump (Up to 850mm)" },
      { label: "Aesthetics", value: "Ultra-slim decorative ceiling panel" },
      { label: "Refrigerant", value: "R410A / R32 High-Efficiency Gas" },
      { label: "Control Options", value: "Wireless LCD Remote & Wired Wall Controller" },
    ],
    keyFeatures: [
      "360-degree uniform draft-free air throw eliminating cooling dead spots",
      "Independent louvre angle control for customized zone comfort",
      "Integrated high-lift drain pump prevents water condensation leakages",
      "Fresh air intake duct provision for improved indoor oxygen levels",
      "Ultra-compact casing fitting standard 600x600 and 900x900 ceiling grids",
      "Quiet centrifugal turbo fan design maintaining calm acoustics",
    ],
    models: [
      { capacity: "2.0 Ton", roomSize: "180 - 250 sq. ft.", powerRating: "Inverter Rotary", idealFor: "Small Cafes, Director Cabins & Boutiques", priceEstimate: "Starts ₹62,000" },
      { capacity: "3.0 Ton", roomSize: "250 - 380 sq. ft.", powerRating: "Heavy Inverter", idealFor: "Restaurants, Conference Rooms & Clinics", priceEstimate: "Starts ₹82,000" },
      { capacity: "4.0 Ton", roomSize: "380 - 520 sq. ft.", powerRating: "Commercial 3-Phase", idealFor: "Open Corporate Offices & Retail Stores", priceEstimate: "Starts ₹1,08,000" },
      { capacity: "4.5 Ton", roomSize: "500 - 650 sq. ft.", powerRating: "Twin Inverter", idealFor: "Banquet Lounges, Banks & Gymnasiums", priceEstimate: "Starts ₹1,24,000" },
    ],
    compatibleBrands: ["Daikin", "Blue Star", "Carrier", "Mitsubishi Heavy", "Voltas", "Hitachi"],
    applications: ["Corporate Offices", "Restaurants & Cafes", "Showrooms & Retail Outlets", "Boutique Hotels", "Luxury Living Rooms"],
    faqs: [
      {
        q: "Can a cassette AC be installed without a false ceiling?",
        a: "While cassette ACs are designed to fit flush inside false ceilings (requiring approximately 250mm to 350mm ceiling drop), they can also be suspended exposed in contemporary industrial-themed cafes and studios with aesthetic finish.",
      },
      {
        q: "How does the built-in drain pump work?",
        a: "Cassette ACs come equipped with a built-in condensate lift pump that pumps water upward up to 750-850mm, allowing seamless drainage even when gradient is limited in false ceilings.",
      },
    ],
  },
  "ductable-ac": {
    slug: "ductable-ac",
    name: "Ductable Air Conditioners",
    badge: "CENTRAL CONCEALED HVAC",
    type: "Commercial HVAC",
    tagline: "High-tonnage concealed centralized air conditioning delivering uniform comfort via custom engineered ductwork.",
    description:
      "Ductable AC systems deliver centralized climate control through insulated ductwork concealed above ceilings, venting through discreet linear diffusers or grills. They are the ideal choice for corporate complexes, sprawling banquet halls, luxury residences, and department stores that require powerful cooling with zero visible indoor machinery.",
    image: ductableAcImg,
    startingPrice: "₹95,000",
    warranty: "1 Year Comprehensive + 5 Years Compressor Warranty",
    specs: [
      { label: "Available Capacities", value: "3.0 Ton to 16.5 Ton Modular Units" },
      { label: "External Static Pressure", value: "Medium to High Static Pressure (up to 200 Pa)" },
      { label: "Air Filtration", value: "Washable synthetic filters / MERV / HEPA" },
      { label: "Condenser", value: "Heavy-duty copper tube with hydrophilic aluminum fins" },
      { label: "Piping Length", value: "Extended refrigerant piping up to 50 meters" },
    ],
    keyFeatures: [
      "Completely concealed unit with only architectural grills visible",
      "Flexible ducting distribution allowing multiple rooms cooling from 1 unit",
      "High external static pressure for long, complex ducting runs",
      "Modulating capacity control with inverter scroll/twin rotary compressors",
      "Quiet centrifugal blowers housed in acoustic dampening insulation",
      "Compatible with motorized volume control dampers and VAV systems",
    ],
    models: [
      { capacity: "3.0 Ton", roomSize: "300 - 450 sq. ft.", powerRating: "3-Phase / 1-Phase", idealFor: "Luxury Villas, Master Suites & Small Offices", priceEstimate: "Starts ₹95,000" },
      { capacity: "5.5 Ton", roomSize: "500 - 750 sq. ft.", powerRating: "Inverter Scroll", idealFor: "Boutiques, Training Rooms & Restaurants", priceEstimate: "Starts ₹1,45,000" },
      { capacity: "8.5 Ton", roomSize: "800 - 1200 sq. ft.", powerRating: "High-Static Scroll", idealFor: "Corporate Offices & Banquet Halls", priceEstimate: "Starts ₹2,15,000" },
      { capacity: "11.0 Ton", roomSize: "1100 - 1600 sq. ft.", powerRating: "Heavy Scroll Unit", idealFor: "Shopping Complexes & Large Event Spaces", priceEstimate: "Starts ₹2,90,000" },
    ],
    compatibleBrands: ["Daikin", "Blue Star", "Carrier", "Voltas", "Hitachi", "Midea"],
    applications: ["Banquet Halls & Marriage Lawns", "IT Parks & Corporate Offices", "Shopping Malls & Department Stores", "Luxury Duplex Villas", "Auditoriums"],
    faqs: [
      {
        q: "What is the difference between Ductable AC and Cassette AC?",
        a: "Cassette ACs are standalone indoor units mounted directly in the ceiling of a single room, whereas Ductable AC indoor units are tucked away in a utility area or plant room, distributing conditioned air across multiple areas through insulated sheet metal or pre-insulated ducting.",
      },
      {
        q: "Does Perfect Air Solution fabricate ducting and insulation?",
        a: "Yes, we handle complete turnkey ducting projects including GI sheet ducting, pre-insulated ducting (PID), thermal acoustic nitrile rubber/glass wool insulation, linear diffusers, and volume control dampers.",
      },
    ],
  },
  "vrv-vrf": {
    slug: "vrv-vrf",
    name: "VRF / VRV Central Systems",
    badge: "ADVANCED MULTI-ZONE HVAC",
    type: "Commercial HVAC",
    tagline: "Intelligent variable refrigerant flow technology connecting dozens of indoor units to a single outdoor system.",
    description:
      "Variable Refrigerant Flow (VRF/VRV) systems represent the pinnacle of modern commercial HVAC engineering. A single high-efficiency outdoor condenser can power up to 64 individual indoor units (split, cassette, ductable, floor-standing) with independent temperature control for each room. By varying the refrigerant flow dynamically according to exact cooling demands, VRF delivers up to 40% energy savings compared to conventional systems.",
    image: vrvImg,
    startingPrice: "Custom BOQ",
    warranty: "1 Year Warranty + 5 Years OEM Compressor Warranty",
    specs: [
      { label: "System Capacities", value: "6 HP to 120 HP (Modular Combination)" },
      { label: "Indoor Connectivity", value: "Up to 64 indoor units per outdoor system" },
      { label: "Piping Flexibility", value: "Total piping length up to 1,000 meters" },
      { label: "Compressor Technology", value: "All-DC Inverter Variable Speed Scroll" },
      { label: "BMS Compatibility", value: "BACnet, Modbus & Centralized Web Touch Controllers" },
    ],
    keyFeatures: [
      "Simultaneous cooling & individual zone temperature customization",
      "Part-load energy efficiency reducing monthly commercial electricity bills by up to 40%",
      "Small outdoor footprint saving precious rooftop and terrace real estate",
      "Mix-and-match indoor units (wall-mounted, cassette, concealed duct, slim duct)",
      "Smart centralized scheduling, tenant billing, and smartphone control",
      "Night quiet operation mode with reduced outdoor condenser decibel levels",
    ],
    models: [
      { capacity: "6 HP - 10 HP", roomSize: "Up to 1,200 sq. ft.", powerRating: "Top Discharge Inverter", idealFor: "Luxury Duplexes & Small Clinics", priceEstimate: "Custom BOQ" },
      { capacity: "12 HP - 24 HP", roomSize: "1,500 - 3,500 sq. ft.", powerRating: "Modular All-DC Inverter", idealFor: "Corporate Offices, Hotels & Hospitals", priceEstimate: "Custom BOQ" },
      { capacity: "26 HP - 48 HP", roomSize: "3,500 - 7,500 sq. ft.", powerRating: "Heavy Commercial Bank", idealFor: "IT Parks, Colleges & Commercial Hubs", priceEstimate: "Custom BOQ" },
      { capacity: "54 HP - 120 HP", roomSize: "8,000+ sq. ft.", powerRating: "Multi-Module Centralized", idealFor: "High-Rise Towers & Large Industrial Facilities", priceEstimate: "Custom BOQ" },
    ],
    compatibleBrands: ["Daikin (VRV)", "Blue Star", "Mitsubishi Electric (City Multi)", "Carrier", "Hitachi (Set Free)", "Midea"],
    applications: ["Hotels & Resorts", "Hospitals & Medical Centers", "Commercial Office Towers", "Educational Institutions", "Luxury Residential Villas"],
    faqs: [
      {
        q: "Why choose VRF over traditional chiller or multiple split ACs?",
        a: "VRF systems eliminate the clutter of having 30-40 outdoor units by combining them into 1-2 modular rooftop units. They save up to 40% electricity because the compressor only pumps the exact amount of cooling requested by rooms in use.",
      },
      {
        q: "How does Perfect Air Solution assist in VRF projects?",
        a: "We provide complete engineering BOQs, computer-aided heat load simulation, OEM certified copper refnet joint piping, nitrogen pressure testing, and factory commissioning.",
      },
    ],
  },
  "tower-ac": {
    slug: "tower-ac",
    name: "Floor Standing Tower ACs",
    badge: "HEAVY-DUTY FLOOR COOLING",
    type: "Commercial Cooling",
    tagline: "Powerful vertical airflow column systems designed for spacious banquet halls, showrooms, and places of worship.",
    description:
      "Floor Standing Tower Air Conditioners are freestanding, high-capacity cooling pillars designed for spaces where ceiling or wall mounting is unfeasible or undesirable. Featuring powerful fan throw reaching up to 15-20 meters and contemporary vertical aesthetics, tower ACs are the go-to solution for high-ceiling exhibition halls, banquet lobbies, luxury living spaces, and religious centers.",
    image: towerAcImg,
    startingPrice: "₹74,500",
    warranty: "1 Year Warranty + 5 Years Compressor Warranty",
    specs: [
      { label: "Available Capacities", value: "2.5 Ton, 3.0 Ton, 4.0 Ton, 5.0 Ton" },
      { label: "Air Throw Distance", value: "Powerful Airflow up to 15 to 20 meters" },
      { label: "Control Panel", value: "Sleek touch capacitive LCD panel + Wireless remote" },
      { label: "Power Supply", value: "Single-Phase (2.5T) & Three-Phase (3T/4T/5T)" },
      { label: "Air Oscillation", value: "Auto 4-Way horizontal & vertical motorized swing" },
    ],
    keyFeatures: [
      "No ceiling modification or wall drilling needed — simple floor placement",
      "Instant powerful air throw cooling deep, expansive halls quickly",
      "Modern aesthetic tower column that complements interior architecture",
      "Integrated child lock, sleep timer, and auto-restart functions",
      "Washable heavy-duty air filter panels with clean filter reminder",
    ],
    models: [
      { capacity: "2.5 Ton", roomSize: "220 - 320 sq. ft.", powerRating: "Single Phase Inverter", idealFor: "Living Halls, Boutiques & Restaurants", priceEstimate: "Starts ₹74,500" },
      { capacity: "3.0 Ton", roomSize: "300 - 420 sq. ft.", powerRating: "3-Phase Commercial", idealFor: "Showrooms, Bank Branches & Lounges", priceEstimate: "Starts ₹89,990" },
      { capacity: "4.0 Ton", roomSize: "400 - 580 sq. ft.", powerRating: "Heavy Rotary Scroll", idealFor: "Banquet Halls & Marriage Lawns", priceEstimate: "Starts ₹1,18,000" },
      { capacity: "5.0 Ton", roomSize: "500 - 750 sq. ft.", powerRating: "Industrial 3-Phase", idealFor: "Places of Worship, Gyms & Event Halls", priceEstimate: "Starts ₹1,42,000" },
    ],
    compatibleBrands: ["Blue Star", "Voltas", "Daikin", "Carrier", "Midea"],
    applications: ["Banquet & Wedding Halls", "Automobile Showrooms", "Religious Centers & Temples", "Hotel Lobbies & Lounges", "Fitness Centers"],
    faqs: [
      {
        q: "Where is the outdoor unit placed for a tower AC?",
        a: "Just like a split AC, a tower AC consists of an indoor vertical cabinet and a weatherproof outdoor condenser unit installed outdoors, connected via insulated refrigerant copper pipes.",
      },
    ],
  },
  "chiller": {
    slug: "chiller",
    name: "Central Chillers & Plants",
    badge: "INDUSTRIAL & LARGE CENTRAL PLANTS",
    type: "Industrial HVAC",
    tagline: "Heavy-tonnage water-cooled and air-cooled liquid chillers engineered for continuous 24/7 commercial cooling.",
    description:
      "Central Chillers are the backbone of large-scale commercial and industrial temperature regulation. Perfect Air Solution supplies, installs, and services cutting-edge Air-Cooled and Water-Cooled Chillers (Screw, Scroll, and Centrifugal) from Daikin, Blue Star, Carrier, and Trane. Capable of handling hundreds of tons of refrigeration, our chiller plants ensure optimal efficiency in shopping malls, pharmaceutical cleanrooms, hospitals, and plastic molding industries.",
    image: chillerImg,
    startingPrice: "Custom BOQ",
    warranty: "1 Year OEM Warranty + Comprehensive AMC Plans",
    specs: [
      { label: "Plant Capacity", value: "10 TR to 500+ TR Single & Modular Banks" },
      { label: "Chiller Types", value: "Air-Cooled Screw / Water-Cooled Centrifugal & Scroll" },
      { label: "Refrigerants", value: "R134a, R410A, R1234ze Low-GWP Green Gases" },
      { label: "Evaporator & Condenser", value: "Shell & Tube / Brazed Plate Heat Exchangers" },
      { label: "Control System", value: "Microprocessor DDC with SCADA & BMS integration" },
    ],
    keyFeatures: [
      "Exceptional IPLV (Integrated Part Load Value) minimizing operating kilowatt hours",
      "VFD driven compressors for smooth modulation between 10% to 100% cooling load",
      "Robust industrial construction designed for 24/7 non-stop manufacturing plants",
      "Comprehensive protection against freeze-ups, low oil pressure, and phase reversals",
      "Turnkey installation including cooling towers, primary/secondary pumps, and hydronic piping",
    ],
    models: [
      { capacity: "10 - 30 TR", roomSize: "Small Industrial / Clinics", powerRating: "Air-Cooled Scroll", idealFor: "Medical Imaging (MRI/CT), Small Breweries & Labs", priceEstimate: "Custom BOQ" },
      { capacity: "40 - 100 TR", roomSize: "Medium Commercial", powerRating: "Screw Compressor Chiller", idealFor: "Hotels, Hospitals & Commercial Hubs", priceEstimate: "Custom BOQ" },
      { capacity: "120 - 300 TR", roomSize: "Large Plants & Malls", powerRating: "Water-Cooled Screw", idealFor: "Shopping Malls, IT Campuses & Food Processing", priceEstimate: "Custom BOQ" },
      { capacity: "350 - 500+ TR", roomSize: "Mega Infrastructure", powerRating: "Centrifugal / VFD Screw", idealFor: "Pharma Manufacturing, Airports & Industrial Estates", priceEstimate: "Custom BOQ" },
    ],
    compatibleBrands: ["Daikin", "Blue Star", "Carrier", "Trane", "York", "Voltas"],
    applications: ["Pharma & Chemical Plants", "Hospitals & Healthcare", "Shopping Malls & Multiplexes", "Data Centers", "Manufacturing & Plastic Injection Plants"],
    faqs: [
      {
        q: "Should I select an Air-Cooled or Water-Cooled chiller?",
        a: "Air-cooled chillers require no cooling tower or water treatment and are easier to maintain, making them ideal when water supply is constrained. Water-cooled chillers require a cooling tower but operate at higher thermodynamic efficiency for large industrial plants.",
      },
    ],
  },
  "air-handling-unit": {
    slug: "air-handling-unit",
    name: "Air Handling Units (AHU)",
    badge: "CLEANROOM & VENTILATION ENGINEERING",
    type: "Industrial HVAC",
    tagline: "Double-skin thermal break air handlers ensuring hygienic air conditioning, humidity control, and HEPA filtration.",
    description:
      "Air Handling Units (AHUs) connect with central chilled water or DX condensing plants to circulate, condition, and purify air for buildings. Our custom-engineered double-skin AHUs feature certified thermal-break extruded aluminum profiles, polyurethane foam insulation, and multi-stage filtration (Pre-filter, Fine MERV, and terminal HEPA filters) required for hospital operation theatres, pharmaceutical laboratories, and food packaging lines.",
    image: ahuImg,
    startingPrice: "Custom BOQ",
    warranty: "1 Year OEM Warranty + Preventative AMC",
    specs: [
      { label: "Airflow Capacity", value: "1,000 CFM to 40,000+ CFM Custom Built" },
      { label: "Casing Construction", value: "Double Skin GI / Pre-coated / SS304 with 25/50mm PUF" },
      { label: "Fans & Blowers", value: "Plug Fans with High-Efficiency EC Motors / Backward Curved" },
      { label: "Cooling Coils", value: "4-Row / 6-Row / 8-Row Chilled Water & Direct Expansion" },
      { label: "Filtration Stages", value: "EU-4 Pre, EU-7 Fine Micro, EU-9/13 Terminal HEPA" },
    ],
    keyFeatures: [
      "Thermal break profile preventing external condensation and thermal bridges",
      "Smooth hygienic internal walls compliant with cGMP & NABH hospital standards",
      "Direct drive EC plug fans delivering up to 30% electrical energy savings",
      "Integrated heat recovery wheels (HRV) for optimal enthalpy fresh air exchange",
      "Precision relative humidity control with integrated steam/electrode humidifiers",
    ],
    models: [
      { capacity: "1,500 - 3,500 CFM", roomSize: "Labs & Clinics", powerRating: "EC Plug Fan", idealFor: "Diagnostic Labs, IVF Centers & ICU Rooms", priceEstimate: "Custom BOQ" },
      { capacity: "4,000 - 8,000 CFM", roomSize: "Operation Theatres", powerRating: "NABH Cleanroom Spec", idealFor: "Modular OTs, Hospital Wards & Cleanrooms", priceEstimate: "Custom BOQ" },
      { capacity: "10,000 - 25,000 CFM", roomSize: "Industrial Plants", powerRating: "Heavy Double-Skin", idealFor: "Pharma Packaging, Electronics & Food Processing", priceEstimate: "Custom BOQ" },
      { capacity: "30,000+ CFM", roomSize: "Commercial Malls", powerRating: "Central Plant AHU", idealFor: "Airports, Large Auditoriums & Office Parks", priceEstimate: "Custom BOQ" },
    ],
    compatibleBrands: ["Daikin", "Blue Star", "Carrier", "Systemair", "Zeco", "Edgetech"],
    applications: ["Hospital Operation Theatres & ICUs", "Pharma Formulations & Cleanrooms", "Semiconductor Cleanrooms", "Commercial Office Towers", "Food & Beverage Processing"],
    faqs: [
      {
        q: "Are your AHUs compliant with hospital NABH cleanroom guidelines?",
        a: "Yes, our cleanroom AHUs feature antimicrobial coatings, double-skin PUF panels with zero thermal bridging, and multi-tier HEPA filtration satisfying NABH, cGMP, and ISO 14644 cleanroom classes.",
      },
    ],
  },
  "cold-room": {
    slug: "cold-room",
    name: "Cold Rooms & Cold Storage",
    badge: "TEMPERATURE CONTROLLED PRESERVATION",
    type: "Industrial Cooling",
    tagline: "Hermetically sealed PUF insulated walk-in chillers and deep blast freezers for perishables, dairy, and pharmaceuticals.",
    description:
      "Perfect Air Solution designs and installs precision-engineered Cold Rooms, Walk-in Chillers (+2°C to +8°C), and Deep Freezers (-18°C to -25°C). Utilizing high-density polyurethane (PUF) tongue-and-groove insulated panels, heavy-duty commercial condensing units, and digital temperature data loggers, our cold chains safeguard dairy products, fruits, vegetables, medicines, vaccines, and frozen meats.",
    image: coldRoomImg,
    startingPrice: "Turnkey Setup",
    warranty: "1 Year Turnkey Warranty + 24/7 Breakdown Assistance",
    specs: [
      { label: "Operating Temperature", value: "Chiller: +2°C to +8°C | Freezer: -18°C to -25°C" },
      { label: "Insulation Panels", value: "60mm, 80mm, 100mm, 120mm High Density PUF (40±2 kg/m³)" },
      { label: "Refrigeration Unit", value: "Hermetic / Semi-Hermetic Scroll Condensing Units" },
      { label: "Safety & Access", value: "Heavy-duty flush doors with inside release safety glow push" },
      { label: "Temperature Logging", value: "Microprocessor Digital Controller with SMS/IoT Alarm" },
    ],
    keyFeatures: [
      "Tongue and groove cam-lock PUF panels with zero thermal leakage",
      "Non-slip aluminum chequered plate / heavy PUF flooring",
      "High airflow ceiling evaporators ensuring uniform cold air circulation",
      "Optional dual standby refrigeration system for zero downtime guarantee",
      "Strip curtains and air curtains to prevent cold air loss during loading",
    ],
    models: [
      { capacity: "10x10x8 ft Walk-In", roomSize: "800 Cu. Ft.", powerRating: "+2°C to +8°C Chiller", idealFor: "Restaurants, Florists & Hotels", priceEstimate: "Turnkey Setup" },
      { capacity: "15x12x10 ft Cold Room", roomSize: "1,800 Cu. Ft.", powerRating: "+2°C to +4°C Storage", idealFor: "Dairy, Fruits, Vegetables & Beverages", priceEstimate: "Turnkey Setup" },
      { capacity: "20x15x10 ft Deep Freezer", roomSize: "3,000 Cu. Ft.", powerRating: "-18°C to -25°C Freezer", idealFor: "Frozen Food, Meat, Ice Cream & Seafood", priceEstimate: "Turnkey Setup" },
      { capacity: "Commercial Pharma Vault", roomSize: "Custom Vault", powerRating: "Validated +2°C to +8°C", idealFor: "Vaccines, Biologics & Pharmaceutical Depots", priceEstimate: "Turnkey Setup" },
    ],
    compatibleBrands: ["Blue Star", "Carrier", "Midea", "Emerson Copeland", "Danfoss", "Bitzer"],
    applications: ["Dairy & Milk Chilling Centers", "Pharma & Vaccine Distribution", "Meat, Poultry & Seafood Processing", "Hotels, Banquet & Catering", "Fruits, Vegetables & Floriculture"],
    faqs: [
      {
        q: "What backup protection is provided against power cuts?",
        a: "We offer dual refrigeration configurations (100% standby unit) connected with automatic changeover panels and generator integration, ensuring continuous temperature preservation without spoilage.",
      },
    ],
  },
};

// Map alternate slugs to canonical keys
const slugAliases: Record<string, string> = {
  "vrf-system": "vrv-vrf",
  "ahu": "air-handling-unit",
  "chillers": "chiller",
  "freezer-fridge": "cold-room",
};

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const canonicalKey = slug && slugAliases[slug] ? slugAliases[slug] : slug || "split-ac";
  const category = categoriesData[canonicalKey] || categoriesData["split-ac"];

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  const otherCategories = Object.values(categoriesData).filter(
    (c) => c.slug !== category.slug
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* ── Top Hero Banner (Deep Brand Navy) ── */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={productHeaderBg}
            alt={category.name}
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/85 via-[#03172C]/65 to-[#03172C]/95" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-4 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-500" />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={13} className="text-slate-500" />
            <span className="text-cyan-300 font-semibold">{category.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                <Sparkles size={13} className="text-cyan-300" />
                {category.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {category.name}
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-6 max-w-2xl">
                {category.tagline}
              </p>

              {/* Quick Specs Chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-slate-100 font-medium flex items-center gap-1.5">
                  <Thermometer size={14} className="text-cyan-400" />
                  <span>Starting: <strong className="text-white">{category.startingPrice}</strong></span>
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-slate-100 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>OEM Warranty: <strong className="text-white">{category.warranty.split("+")[0]}</strong></span>
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-slate-100 font-medium flex items-center gap-1.5">
                  <Zap size={14} className="text-cyan-400" />
                  <span>Free Site Heat Load Survey</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0275B0] text-white text-sm font-bold shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  Get Instant Quotation
                </button>
                <a
                  href="tel:+919839171701"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Phone size={16} className="text-cyan-400" />
                  Call: +91 98391 71701
                </a>
              </div>
            </div>

            {/* Right Product Hero Stage */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl p-6 backdrop-blur-md flex items-center justify-center min-h-[300px] shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.2),transparent_70%)] pointer-events-none" />
                <motion.img
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={category.image}
                  alt={category.name}
                  className="max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Overview & Key Features ── */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Detailed Description & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Engineering & Performance
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#051B30] mt-3">
                  Overview & Engineering Excellence
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {category.description}
              </p>

              <h3 className="text-lg font-bold text-[#051B30] pt-2">
                Key Performance Advantages
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {category.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs sm:text-sm font-medium"
                  >
                    <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Compatible Brands Strip */}
              <div className="pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Available Across Leading OEM Brands
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.compatibleBrands.map((brand, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-[#051B30] text-xs font-bold"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#051B30]">
                      Technical Specifications
                    </h3>
                    <p className="text-xs text-slate-500">Standard OEM configurations</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-200/70 mt-3">
                  {category.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-[#051B30] text-right max-w-[55%]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Assurance Box */}
                <div className="mt-6 p-4 rounded-xl bg-sky-50/80 border border-sky-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] mb-1">
                    <ShieldCheck size={16} />
                    <span>Certified Perfect Air Solution Delivery</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Includes factory unboxing verification, certified copper lines, vacuum pressure checks, and digital commissioning.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Capacity & Models Guide ── */}
      <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Capacity Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#051B30] mt-2">
              Available Models &amp; Tonnage Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Choose the right tonnage according to your carpet area, occupancy load, and floor layout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {category.models.map((model, mIdx) => (
              <div
                key={mIdx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#0284C7]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-base font-extrabold text-[#051B30]">
                      {model.capacity}
                    </span>
                    <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 uppercase">
                      {model.powerRating}
                    </span>
                  </div>

                  <div className="space-y-1.5 my-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-800">Coverage:</strong> {model.roomSize}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-800">Ideal for:</strong> {model.idealFor}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#051B30]">
                    {model.priceEstimate}
                  </span>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Select Model &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FAQ Section ── */}
      {category.faqs.length > 0 && (
        <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-extrabold tracking-wider uppercase text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Help &amp; Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#051B30] mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {category.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#051B30] hover:text-[#0284C7] cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle size={16} className="text-[#0284C7] shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-[#0284C7]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Explore Other Categories Carousel / Grid ── */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold tracking-wider uppercase text-[#0284C7]">
                Related HVAC Categories
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#051B30] mt-1">
                Explore Other Cooling &amp; Industrial Systems
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-[#0284C7] hover:underline flex items-center gap-1"
            >
              View Full Product Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherCategories.slice(0, 4).map((other) => (
              <div
                key={other.slug}
                onClick={() => navigate(`/category/${other.slug}`)}
                className="group bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-[#0284C7]/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 w-full bg-white rounded-xl flex items-center justify-center p-2 mb-3 border border-slate-100">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="max-h-24 w-auto object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors line-clamp-1">
                    {other.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {other.startingPrice}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#0284C7] mt-3 flex items-center gap-1">
                  View Specs &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTASection />
    </div>
  );
}
