import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
} from "lucide-react";
import { toast } from "react-toastify";
import SplitAcImg from "@/assets/split-ac.png";
import WindowAcImg from "@/assets/window-ac.png";
import CassetteAcImg from "@/assets/cassette-ac.png";
import DuctableAcImg from "@/assets/ductable-ac.png";
import TowerAcImg from "@/assets/tower-ac.png";
import PackageAcImg from "@/assets/package-ac.png";
import VrvVrfImg from "@/assets/vrv-vrf.png";
import AhuImg from "@/assets/ahu.png";
import ChillerImg from "@/assets/chiller.png";
import WaterCooledChillerImg from "@/assets/water-cooled-chiller.png";
import ColdRoomImg from "@/assets/cold-room.png";
import IcePlantImg from "@/assets/ice-plant.png";
import WaterDispenserImg from "@/assets/water-dispenser.png";
import RoPlantImg from "@/assets/ro-plant.png";
import WaterCoolerImg from "@/assets/water-cooler.png";
import PanelAcImg from "@/assets/panel-ac.png";
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
  { id: "split-ac", icon: <Snowflake size={22} />, title: "Split AC", description: "Energy-efficient Split AC for homes and offices with powerful cooling performance.", image: SplitAcImg, brands: ["Daikin", "Voltas", "LG", "Samsung"], products: [] },
  { id: "window-ac", icon: <Box size={22} />, title: "Window AC", description: "Compact and budget-friendly Window AC for small rooms with easy installation.", image: WindowAcImg, brands: ["Carrier", "Godrej", "Blue Star"], products: [] },
  { id: "cassette-ac", icon: <AirVent size={22} />, title: "Cassette & Ductable ACs", description: "Ceiling-mounted and ducted AC solutions for offices, showrooms, and larger commercial spaces.", image: CassetteAcImg, brands: ["Daikin", "Mitsubishi", "Carrier"], price: "Starting from Rs. 78,000", products: [] },
  { id: "ductable-ac", icon: <Wind size={22} />, title: "Ductable AC", description: "Centralized ductable AC system for large areas and commercial spaces.", image: DuctableAcImg, brands: ["Daikin", "Blue Star"], price: "Starting from Rs. 95,000", products: [] },
  { id: "water-dispenser", icon: <Droplet size={22} />, title: "Water Dispenser", description: "Hot and cold water dispensers with energy-efficient cooling system.", image: WaterDispenserImg, brands: ["Voltas", "Blue Star"], products: [] },
  { id: "ro-plant", icon: <Droplet size={22} />, title: "RO Plant", description: "Advanced RO plant systems for pure and safe drinking water.", image: RoPlantImg, brands: ["Kent", "Aquaguard"], price: "Starting from Rs. 65,000", products: [] },
  { id: "tower-ac", icon: <ThermometerSun size={22} />, title: "Tower ACs", description: "High-capacity tower AC solutions for large rooms, halls, and event spaces.", image: TowerAcImg, brands: ["Blue Star", "Voltas"], products: [] },
  { id: "package-ac", icon: <Box size={22} />, title: "Package AC", description: "Heavy-duty Package AC for commercial buildings and malls.", image: PackageAcImg, brands: ["Carrier", "Daikin"], price: "Starting from Rs. 1,25,000", products: [] },
  { id: "vrv-vrf", icon: <Building2 size={22} />, title: "Daikin VRF Systems", description: "Advanced Daikin VRF systems for smart multi-zone cooling across commercial spaces.", image: VrvVrfImg, brands: ["Daikin", "Mitsubishi"], price: "Starting from Rs. 2,40,000", products: [] },
  { id: "ahu", icon: <Fan size={22} />, title: "Ventilation & Fresh Air Systems", description: "Fresh air and ventilation systems for healthier airflow in centralized HVAC environments.", image: AhuImg, brands: ["Systemair", "Blue Star"], price: "Starting from Rs. 1,10,000", products: [] },
  { id: "cold-room", icon: <Snowflake size={22} />, title: "Cold Room", description: "Custom-built cold room solutions for storage and preservation.", image: ColdRoomImg, brands: ["Blue Star", "Carrier"], price: "Starting from Rs. 1,80,000", products: [] },
  { id: "chiller", icon: <Snowflake size={22} />, title: "Chillers & Heat Pumps", description: "Industrial chillers and heat pump solutions for large-scale cooling and temperature control.", image: ChillerImg, brands: ["Daikin", "Trane"], price: "Starting from Rs. 3,25,000", products: [] },
  { id: "air-cooled-chiller", icon: <Fan size={22} />, title: "Air-Cooled Chiller", description: "Efficient air-cooled chiller with low maintenance cost.", image: ChillerImg, brands: ["Blue Star", "Carrier"], price: "Starting from Rs. 2,90,000", products: [] },
  { id: "water-cooled-chiller", icon: <Droplets size={22} />, title: "Water-Cooled Chiller", description: "High-capacity water-cooled chiller for heavy-duty applications.", image: WaterCooledChillerImg, brands: ["Daikin", "Trane"], price: "Starting from Rs. 3,60,000", products: [] },
  { id: "ice-plant", icon: <Snowflake size={22} />, title: "Ice Plant", description: "Industrial ice plant for bulk ice production.", image: IcePlantImg, brands: ["Blue Star"], price: "Starting from Rs. 4,20,000", products: [] },
  { id: "panel-ac", icon: <Activity size={22} />, title: "Panel AC", description: "Compact panel AC for electrical control panels.", image: PanelAcImg, brands: ["Pfannenberg"], price: "Starting from Rs. 52,000", products: [] },
  { id: "water-cooler", icon: <Droplets size={22} />, title: "Water Cooler", description: "Commercial water cooler for offices, schools, and public spaces.", image: WaterCoolerImg, brands: ["Voltas", "Blue Star"], products: [] },
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
      className="bg-card rounded-2xl overflow-hidden flex flex-col"
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
        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover hover:scale-105 transition" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: "hsl(var(--primary))",
            fontSize: "1.125rem",
            marginBottom: "4px",
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
    residential: ["split-ac", "window-ac", "tower-ac", "water-dispenser", "water-cooler"],
    commercial: ["vrv-vrf", "cassette-ac", "chiller", "ahu", "package-ac", "ductable-ac", "panel-ac", "ro-plant", "cold-room", "ice-plant", "air-cooled-chiller", "water-cooled-chiller"],
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
    const toastId = toast.loading("Submitting enquiry...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enquiryForm,
          service: selectedEnquiryProduct.title,
          inquiryType: "product",
          productTitle: selectedEnquiryProduct.title,
          productPrice: selectedEnquiryProduct.price,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit enquiry");

      toast.update(toastId, {
        render: "Enquiry submitted successfully.",
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
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message || "Failed to submit enquiry.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-hero-gradient text-center" style={{ padding: "56px 24px", marginTop: "48px" }}>
        <h1 style={{ color: "white", marginBottom: "12px" }}>
          Our Products
        </h1>
        <p className="body-text" style={{ color: "rgba(255, 255, 255, 0.88)" }}>
          Explore our wide range of air conditioning solutions.
        </p>
      </div>

      <div
        className="bg-card sticky top-0 z-10"
        style={{ borderBottom: "1px solid hsl(var(--border))", padding: "12px 24px" }}
      >
        <div className="flex gap-2 overflow-x-auto w-full px-2 no-scrollbar justify-start sm:justify-center">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
              style={{
                background: activeFilter === f.id ? "hsl(var(--brand-dark))" : "transparent",
                color: activeFilter === f.id ? "white" : "hsl(var(--foreground) / 0.7)",
                border: `1px solid ${activeFilter === f.id ? "hsl(var(--brand-dark))" : "hsl(var(--border))"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
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
