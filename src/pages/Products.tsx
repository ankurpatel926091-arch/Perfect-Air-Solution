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
    icon: <Snowflake size={22} />, 
    title: "Split AC", 
    description: "High-efficiency cooling for homes and offices with powerful performance.", 
    image: SplitAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "cassette-ac", 
    icon: <AirVent size={22} />, 
    title: "Cassette Air Conditioners", 
    description: "Sleek ceiling-mounted cooling for residential and commercial spaces.", 
    image: CassetteAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "tower-ac", 
    icon: <ThermometerSun size={22} />, 
    title: "Floor Standing Air Conditioners", 
    description: "Elegant tower AC solutions for large living areas and event spaces.", 
    image: TowerAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "window-ac", 
    icon: <Box size={22} />, 
    title: "Window Air Conditioners", 
    description: "Compact and powerful cooling solutions for any room.", 
    image: WindowAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "portable-ac", 
    icon: <Wind size={22} />, 
    title: "Portable Air Conditioners", 
    description: "Convenient and mobile cooling for flexible space management.", 
    image: PortableAcImg, 
    brands: ["Blue Star", "Carrier", "Midea"], 
    products: [] 
  },
  { 
    id: "water-cooler", 
    icon: <Droplets size={22} />, 
    title: "Water Coolers & Dispensers", 
    description: "Hygienic and energy-efficient chilled water solutions.", 
    image: WaterCoolerImg, 
    brands: ["Blue Star", "Midea", "Carrier"], 
    products: [] 
  },
  { 
    id: "ro-system", 
    icon: <Droplet size={22} />, 
    title: "Alkaline Water RO Systems", 
    description: "Advanced RO systems for pure, healthy, and safe drinking water.", 
    image: RoPlantImg, 
    brands: ["Blue Star"], 
    products: [] 
  },
  { 
    id: "solar-heater", 
    icon: <ThermometerSun size={22} />, 
    title: "Solar Water Heaters", 
    description: "Eco-friendly and sustainable water heating solutions.", 
    image: SolarHeaterImg, 
    brands: ["Blue Star", "Panasonic"], 
    products: [] 
  },
  { 
    id: "ventilation", 
    icon: <Fan size={22} />, 
    title: "Ventilation Fans & HRV Systems", 
    description: "Fresh air and ventilation solutions for a healthier indoor environment.", 
    image: VentilationImg, 
    brands: ["Panasonic", "Mitsubishi", "Daikin"], 
    products: [] 
  },
  { 
    id: "air-purifier", 
    icon: <Wind size={22} />, 
    title: "Air Purifiers & Water Softeners", 
    description: "Advanced technology for pure indoor air and soft water quality.", 
    image: AirPurifierImg, 
    brands: ["Daikin", "Panasonic", "Blue Star", "Midea"], 
    products: [] 
  },
  { 
    id: "freezer-fridge", 
    icon: <Snowflake size={22} />, 
    title: "Deep Freezers & Commercial Refrigerators", 
    description: "Heavy-duty storage solutions for preservation and cooling.", 
    image: FreezerImg, 
    brands: ["Blue Star", "Midea", "Panasonic", "Mitsubishi"], 
    products: [] 
  },

  // --- Commercial HVAC Solution ---
  { 
    id: "vrf-system", 
    icon: <Building2 size={22} />, 
    title: "VRF Systems", 
    description: "Advanced multi-zone cooling solutions for commercial buildings.", 
    image: VrvVrfImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    price: "Starting from Rs. 2,40,000", 
    products: [] 
  },
  { 
    id: "chiller", 
    icon: <Snowflake size={22} />, 
    title: "Chillers", 
    description: "Industrial cooling solutions for large-scale temperature control.", 
    image: ChillerImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Carrier", "Mitsubishi"], 
    price: "Starting from Rs. 3,25,000", 
    products: [] 
  },
  { 
    id: "heat-pump", 
    icon: <Activity size={22} />, 
    title: "Heat Pump", 
    description: "Efficient energy-saving temperature regulation for various applications.", 
    image: HeatPumpImg, 
    brands: ["Daikin", "Blue Star", "Mitsubishi", "Panasonic"], 
    price: "Starting from Rs. 1,50,000", 
    products: [] 
  },
  { 
    id: "ductable-ac", 
    icon: <Wind size={22} />, 
    title: "Ductable ACs", 
    description: "Centralized cooling systems for offices and large commercial spaces.", 
    image: DuctableAcImg, 
    brands: ["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"], 
    price: "Starting from Rs. 95,000", 
    products: [] 
  },
  { 
    id: "cold-room", 
    icon: <Snowflake size={22} />, 
    title: "Cold Rooms & Storage", 
    description: "Customized cold storage solutions for preservation needs.", 
    image: ColdRoomImg, 
    brands: ["Blue Star", "Carrier", "Midea"], 
    price: "Starting from Rs. 1,80,000", 
    products: [] 
  },
  { 
    id: "ahu", 
    icon: <Fan size={22} />, 
    title: "Air Handling Units", 
    description: "Robust AHUs for centralized air circulation and filtration.", 
    image: AhuImg, 
    brands: ["Daikin", "Blue Star", "Carrier"], 
    price: "Starting from Rs. 1,10,000", 
    products: [] 
  },
  { 
    id: "modular-ot", 
    icon: <Activity size={22} />, 
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
        <Star key={i} size={13} className={i <= count ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
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
    <div
      className="bg-card rounded-xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 4px 16px hsl(var(--brand-dark) / 0.07)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px hsl(var(--brand-dark) / 0.13)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 16px hsl(var(--brand-dark) / 0.07)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="relative h-52 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <div
          className="absolute top-4 left-4 z-10 rounded-xl p-2"
          style={{ background: "hsl(var(--brand-dark))", color: "white" }}
        >
          {cat.icon}
        </div>
        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: "hsl(var(--primary))",
            fontSize: "1.125rem",
            marginBottom: "4px",
            letterSpacing: "0.1rem",
          }}
        >
          {cat.title}
        </h3>

        <p
          className="body-text"
          style={{
            fontSize: "0.875rem",
            color: "hsl(var(--foreground) / 0.72)",
            marginBottom: "12px",
          }}
        >
          {cat.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--foreground) / 0.65)" }}>
            Available Brands
          </p>
          <div className="flex flex-wrap gap-1">
            {cat.brands.map((b) => (
              <span
                key={b}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  background: "hsl(var(--brand-dark) / 0.1)",
                  color: "hsl(var(--brand-dark))",
                  border: "1px solid hsl(var(--brand-dark) / 0.25)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {cat.products.map((p) => (
          <div key={p.name} className="flex justify-between items-center text-sm mb-2">
            <div>
              <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{p.name}</p>
              <StarRating count={p.stars} />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                color: "hsl(var(--accent))",
                fontSize: "1rem",
              }}
            >
              {p.price}
            </span>
          </div>
        ))}

        {isCommercialProduct ? (
          <button
            onClick={() => onEnquireNow(cat)}
            className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition"
            style={{
              border: "2px solid hsl(var(--brand-dark))",
              color: "white",
              background: "hsl(var(--brand-dark))",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 10px 22px hsl(var(--brand-dark) / 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <MessageSquare size={15} />
            Enquire Now
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/contact")}
            className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition"
            style={{
              border: "2px solid hsl(var(--brand-dark))",
              color: "hsl(var(--brand-dark))",
              background: "transparent",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand-dark))";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "hsl(var(--brand-dark))";
            }}
          >
            <MessageSquare size={15} />
            Get Quote
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
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3.5 leading-tight"
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
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
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
              <DialogTitle>Enquire Now</DialogTitle>
              <DialogDescription className="mt-2">
                {selectedEnquiryProduct
                  ? `Share your details for ${selectedEnquiryProduct.title}. The enquiry will be saved and emails will be sent to both admin and user.`
                  : "Share your details and our team will contact you shortly."}
              </DialogDescription>
            </div>
          </DialogHeader>

          {selectedEnquiryProduct ? (
            <form className="grid gap-3 px-5 pb-5" onSubmit={handleEnquirySubmit}>
              <div
                className="rounded-xl border px-3 py-2.5"
                style={{
                  borderColor: "hsl(var(--border))",
                  background: "hsl(var(--brand-light))",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-center" style={{ color: "hsl(var(--brand-dark) / 0.7)" }}>
                  Selected Product
                </p>
                <p className="mt-1 text-base font-semibold text-center" style={{ color: "hsl(var(--primary))" }}>
                  {selectedEnquiryProduct.title}
                </p>
              </div>

              <input
                type="text"
                value={enquiryForm.name}
                onChange={(e) => updateEnquiryField("name", e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "hsl(var(--border))" }}
                required
              />
              <input
                type="email"
                value={enquiryForm.email}
                onChange={(e) => updateEnquiryField("email", e.target.value)}
                placeholder="Your Email"
                className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "hsl(var(--border))" }}
                required
              />
              <input
                type="tel"
                value={enquiryForm.phone}
                onChange={(e) => updateEnquiryField("phone", e.target.value)}
                placeholder="Phone Number"
                className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "hsl(var(--border))" }}
                required
              />
              <textarea
                value={enquiryForm.message}
                onChange={(e) => updateEnquiryField("message", e.target.value)}
                placeholder="Write your requirement"
                className="min-h-[92px] w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "hsl(var(--border))" }}
                required
              />

              <button
                type="submit"
                disabled={isSubmittingEnquiry}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                  opacity: isSubmittingEnquiry ? 0.85 : 1,
                }}
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
