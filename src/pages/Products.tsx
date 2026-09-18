import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { sendQuoteViaWhatsApp } from "@/lib/whatsapp";
import {
  Wind,
  Star,
  ChevronRight,
  AirVent,
  Droplets,
  Activity,
  Snowflake,
  Fan,
  Building2,
  Box,
  ThermometerSun,
  Droplet,
  MessageSquare,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import SplitAcImg from "@/assets/categories/split-ac.png";
import WindowAcImg from "@/assets/categories/window-ac.png";
import CassetteAcImg from "@/assets/categories/cassette-ac.png";
import TowerAcImg from "@/assets/categories/tower-ac.png";
import VrvVrfImg from "@/assets/categories/vrf.png";
import WaterCoolerImg from "@/assets/categories/water-cooler-dispenser.png";
import RoPlantImg from "@/assets/categories/ro-system.png";
import SolarHeaterImg from "@/assets/categories/solar-heater.png";
import PortableAcImg from "@/assets/categories/portable-ac.png";
import ModularOtImg from "@/assets/categories/modular-ot.png";
import AirPurifierImg from "@/assets/categories/air-purifier.png";
import FreezerImg from "@/assets/categories/freezer.png";
import ChillerImg from "@/assets/categories/chiller.jpg";
import ColdRoomImg from "@/assets/categories/cold-room.png";
import AhuImg from "@/assets/categories/air-handling-unit.png";
import DuctableAcImg from "@/assets/categories/ductable.jpg";
import HeatPumpImg from "@/assets/categories/heat-pump.jpg";
import VentilationImg from "@/assets/categories/ventilation.jpg";
import {  
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  name: string;
  ton: string;
  price: string;
  stars: number;
}

interface Category {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
  brands: string[];
  price?: string;
  products: Product[];
}

interface EnquiryFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const categories: Category[] = [
  // --- Residential Solution ---
  { 
    id: "split-ac", 
    icon: <Snowflake size={20} />, 
    title: "Split AC", 
    description: "High-efficiency cooling for homes and offices with powerful performance.", 
    image: SplitAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "cassette-ac", 
    icon: <AirVent size={20} />, 
    title: "Cassette Air Conditioners", 
    description: "Sleek ceiling-mounted cooling for residential and commercial spaces.", 
    image: CassetteAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "tower-ac", 
    icon: <ThermometerSun size={20} />, 
    title: "Floor Standing Air Conditioners", 
    description: "Elegant tower AC solutions for large living areas and event spaces.", 
    image: TowerAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "window-ac", 
    icon: <Box size={20} />, 
    title: "Window Air Conditioners", 
    description: "Compact and powerful cooling solutions for any room.", 
    image: WindowAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "portable-ac", 
    icon: <Wind size={20} />, 
    title: "Portable Air Conditioners", 
    description: "Convenient and mobile cooling for flexible space management.", 
    image: PortableAcImg, 
    brands: ["Blue Star", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "water-cooler", 
    icon: <Droplets size={20} />, 
    title: "Water Coolers & Dispensers", 
    description: "Hygienic and energy-efficient chilled water solutions.", 
    image: WaterCoolerImg, 
    brands: ["Blue Star", "Midea", "Carrier"], 
    products: [] 
  },
  { 
    id: "ro-system", 
    icon: <Droplet size={20} />, 
    title: "Alkaline Water RO Systems", 
    description: "Advanced RO systems for pure, healthy, and safe drinking water.", 
    image: RoPlantImg, 
    brands: ["Blue Star"], 
    products: [] 
  },
  { 
    id: "solar-heater", 
    icon: <ThermometerSun size={20} />, 
    title: "Solar Water Heaters", 
    description: "Eco-friendly and sustainable water heating solutions.", 
    image: SolarHeaterImg, 
    brands: ["Blue Star", "Panasonic"], 
    products: [] 
  },
  { 
    id: "ventilation", 
    icon: <Fan size={20} />, 
    title: "Ventilation Fans & HRV Systems", 
    description: "Fresh air and ventilation solutions for a healthier indoor environment.", 
    image: VentilationImg, 
    brands: ["Panasonic", "Mitsubishi", "Daikin"], 
    products: [] 
  },
  { 
    id: "air-purifier", 
    icon: <Wind size={20} />, 
    title: "Air Purifiers & Water Softeners", 
    description: "Advanced technology for pure indoor air and soft water quality.", 
    image: AirPurifierImg, 
    brands: ["Daikin", "Panasonic", "Blue Star", "Midea"], 
    products: [] 
  },
  { 
    id: "freezer-fridge", 
    icon: <Snowflake size={20} />, 
    title: "Deep Freezers & Commercial Refrigerators", 
    description: "Heavy-duty storage solutions for preservation and cooling.", 
    image: FreezerImg, 
    brands: ["Blue Star", "Midea", "Panasonic", "Mitsubishi"], 
    products: [] 
  },

  // --- Commercial HVAC Solution ---
  { 
    id: "vrf-system", 
    icon: <Building2 size={20} />, 
    title: "VRF Systems", 
    description: "Advanced multi-zone cooling solutions for commercial buildings.", 
    image: VrvVrfImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    price: "Starting from Rs. 2,40,000", 
    products: [] 
  },
  { 
    id: "chiller", 
    icon: <Snowflake size={20} />, 
    title: "Chillers", 
    description: "Industrial cooling solutions for large-scale temperature control.", 
    image: ChillerImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Carrier", "Mitsubishi"], 
    price: "Starting from Rs. 3,25,000", 
    products: [] 
  },
  { 
    id: "heat-pump", 
    icon: <Activity size={20} />, 
    title: "Heat Pump", 
    description: "Efficient energy-saving temperature regulation for various applications.", 
    image: HeatPumpImg, 
    brands: ["Daikin", "Blue Star", "Mitsubishi", "Panasonic"], 
    price: "Starting from Rs. 1,50,000", 
    products: [] 
  },
  { 
    id: "ductable-ac", 
    icon: <Wind size={20} />, 
    title: "Ductable ACs", 
    description: "Centralized cooling systems for offices and large commercial spaces.", 
    image: DuctableAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    price: "Starting from Rs. 95,000", 
    products: [] 
  },
  { 
    id: "cold-room", 
    icon: <Snowflake size={20} />, 
    title: "Cold Rooms & Storage", 
    description: "Customized cold storage solutions for preservation needs.", 
    image: ColdRoomImg, 
    brands: ["Blue Star", "Carrier", "Midea"], 
    price: "Starting from Rs. 1,80,000", 
    products: [] 
  },
  { 
    id: "ahu", 
    icon: <Fan size={20} />, 
    title: "Air Handling Units", 
    description: "Robust AHUs for centralized air circulation and filtration.", 
    image: AhuImg, 
    brands: ["Daikin", "Blue Star", "Carrier"], 
    price: "Starting from Rs. 1,10,000", 
    products: [] 
  },
  { 
    id: "modular-ot", 
    icon: <Activity size={20} />, 
    title: "Modular Operating Theatre (OT)", 
    description: "Specialized medical-grade HVAC solutions for hygienic clinical environments.", 
    image: ModularOtImg, 
    brands: ["Daikin", "Blue Star", "Mitsubishi"], 
    price: "Starting from Rs. 5,50,000", 
    products: [] 
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= count ? "text-amber-500 fill-amber-500" : "text-gray-300"} />
      ))}
    </div>
  );
}

function ProductCard({
  cat,
  onEnquireNow,
}: {
  cat: Category;
  onEnquireNow: (product: Category) => void;
}) {
  const navigate = useNavigate();
  const isCommercialProduct = Boolean(cat.price);

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 group font-sans">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {/* Category Icon Badge */}
        <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-xl bg-gradient-to-tr from-[#051B30] to-[#0284C7] flex items-center justify-center text-white shadow-lg shadow-sky-600/30 border border-white/20">
          {cat.icon}
        </div>
        <img
          src={cat.image}
          alt={cat.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title in Plus Jakarta Sans */}
        <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-snug mb-2 group-hover:text-[#0284C7] transition-colors">
          {cat.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4 flex-1">
          {cat.description}
        </p>

        {/* Price / Starting tag if commercial */}
        {cat.price && (
          <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100 inline-block w-fit">
            <span className="text-xs font-extrabold text-[#0284C7]">{cat.price}</span>
          </div>
        )}

        {/* Available Brands */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Available Brands
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cat.brands.map((b) => (
              <span
                key={b}
                className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 hover:bg-sky-50 hover:text-[#0284C7] hover:border-sky-200 transition-colors"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {cat.products.map((p) => (
          <div key={p.name} className="flex justify-between items-center text-sm mb-2">
            <div>
              <p className="font-semibold text-slate-900">{p.name}</p>
              <StarRating count={p.stars} />
            </div>
            <span className="font-bold text-[#0284C7] text-sm">
              {p.price}
            </span>
          </div>
        ))}

        {/* Action Button */}
        {isCommercialProduct ? (
          <button
            onClick={() => onEnquireNow(cat)}
            className="mt-auto w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#051B30] via-[#0B2E4C] to-[#0284C7] hover:from-[#0B2E4C] hover:to-[#0369A1] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageSquare size={15} />
            <span>Enquire Now</span>
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/contact")}
            className="mt-auto w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-[#051B30] text-slate-800 hover:text-white border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
          >
            <MessageSquare size={15} />
            <span>Get Quote</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("residential");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEnquiryProduct, setSelectedEnquiryProduct] = useState<Category | null>(null);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState<EnquiryFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const filters = [
    { id: "residential", label: "Residential Solution" },
    { id: "commercial", label: "Commercial HVAC Solution" },
  ];

  const filterMap: Record<string, string[]> = {
    residential: [
      "split-ac", 
      "cassette-ac", 
      "tower-ac", 
      "window-ac", 
      "portable-ac", 
      "water-cooler", 
      "ro-system", 
      "solar-heater", 
      "ventilation", 
      "air-purifier",
      "freezer-fridge"
    ],
    commercial: [
      "vrf-system", 
      "chiller", 
      "heat-pump", 
      "ductable-ac", 
      "cold-room", 
      "ahu", 
      "modular-ot"
    ],
  };

  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");

    if (categoryFromQuery && categories.some((category) => category.id === categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);

      const matchedFilter = Object.entries(filterMap).find(([, ids]) => ids.includes(categoryFromQuery))?.[0] ?? "residential";
      setActiveFilter(matchedFilter);
      return;
    }

    setSelectedCategory("all");
    setActiveFilter("residential");
  }, [searchParams]);

  const visible = categories.filter((c) => {
    const matchesFilter = filterMap[activeFilter]?.includes(c.id);
    const matchesCategory = selectedCategory === "all" || c.id === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  const updateEnquiryField = (field: keyof EnquiryFormState, value: string) => {
    let nextValue = value;

    if (field === "name") nextValue = value.replace(/[^A-Za-z\s]/g, "");
    if (field === "phone") nextValue = value.replace(/\D/g, "").slice(0, 10);

    setEnquiryForm((prev) => ({ ...prev, [field]: nextValue }));
  };

  const closeEnquiryDialog = () => {
    if (isSubmittingEnquiry) return;
    setSelectedEnquiryProduct(null);
    setEnquiryForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEnquiryProduct || isSubmittingEnquiry) return;
    if (!enquiryForm.name.trim() || !enquiryForm.email.trim() || !enquiryForm.phone.trim() || !enquiryForm.message.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setIsSubmittingEnquiry(true);
    const toastId = toast.loading("Preparing product enquiry...");

    try {
      sendQuoteViaWhatsApp({
        name: enquiryForm.name.trim(),
        phone: enquiryForm.phone.trim(),
        email: enquiryForm.email.trim(),
        service: `Product Enquiry: ${selectedEnquiryProduct.title}`,
        notes: enquiryForm.message.trim(),
      });

      toast.update(toastId, {
        render: "✅ Opening WhatsApp with product enquiry!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setSelectedEnquiryProduct(null);
      setEnquiryForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err: any) {
      toast.update(toastId, {
        render: "❌ Failed to prepare product enquiry.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* ── Hero Banner ── */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-9 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-2.5 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>PREMIUM HVAC PRODUCTS</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3.5 leading-tight font-sans"
          >
            Cooling Products &amp; <span className="text-cyan-300">Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
          >
            Explore our comprehensive range of high-performance split, cassette, ductable, VRF, and industrial air conditioning systems engineered for maximum energy efficiency and long-term durability.
          </motion.p>

          {/* Inline Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span>✓ 100% Genuine Brand Warranties</span>
            <span>✓ Daikin, Blue Star, Voltas &amp; Carrier</span>
            <span>✓ Free Site Consultation</span>
          </div>
        </div>
      </section>

      {/* ── Sticky Category Filter Bar ── */}
      <div className="bg-white/95 backdrop-blur-md sticky top-[64px] lg:top-[96px] z-[900] border-b border-sky-100 py-3.5 px-4 shadow-sm">
        <div className="flex gap-2.5 overflow-x-auto w-full px-2 no-scrollbar justify-start sm:justify-center max-w-5xl mx-auto">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  setSelectedCategory("all");
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-[#0284C7] text-white shadow-md shadow-sky-500/25 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-[#0284C7] border border-slate-200/80"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((cat) => (
            <ProductCard key={cat.id} cat={cat} onEnquireNow={setSelectedEnquiryProduct} />
          ))}
        </div>
      </div>

      <Dialog open={Boolean(selectedEnquiryProduct)} onOpenChange={(open) => !open && closeEnquiryDialog()}>
        <DialogContent className="z-[120] sm:max-w-[460px] p-0 overflow-hidden">
          <DialogHeader>
            <div className="px-5 pt-5 text-center sm:text-center">
              <DialogTitle className="font-extrabold text-slate-900">Enquire Now</DialogTitle>
              <DialogDescription className="mt-2 text-slate-500">
                {selectedEnquiryProduct
                  ? `Share your details for ${selectedEnquiryProduct.title}. Our team will contact you shortly.`
                  : "Share your details and our team will contact you shortly."}
              </DialogDescription>
            </div>
          </DialogHeader>

          {selectedEnquiryProduct ? (
            <form className="grid gap-3.5 px-5 pb-5" onSubmit={handleEnquirySubmit}>
              <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-2.5 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  Selected Product
                </p>
                <p className="mt-0.5 text-base font-extrabold text-[#051B30]">
                  {selectedEnquiryProduct.title}
                </p>
              </div>

              <input
                type="text"
                value={enquiryForm.name}
                onChange={(e) => updateEnquiryField("name", e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all"
                required
              />
              <input
                type="email"
                value={enquiryForm.email}
                onChange={(e) => updateEnquiryField("email", e.target.value)}
                placeholder="Your Email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all"
                required
              />
              <input
                type="tel"
                value={enquiryForm.phone}
                onChange={(e) => updateEnquiryField("phone", e.target.value)}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all"
                required
              />
              <textarea
                value={enquiryForm.message}
                onChange={(e) => updateEnquiryField("message", e.target.value)}
                placeholder="Write your requirement"
                className="min-h-[92px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all"
                required
              />

              <button
                type="submit"
                disabled={isSubmittingEnquiry}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white transition bg-gradient-to-r from-[#051B30] to-[#0284C7] hover:opacity-95 shadow-md shadow-sky-600/20 cursor-pointer"
              >
                {isSubmittingEnquiry ? <LoaderCircle size={16} className="animate-spin" /> : <MessageSquare size={16} />}
                {isSubmittingEnquiry ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
