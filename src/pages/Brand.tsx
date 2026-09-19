import { useGetBrandsQuery } from "@/store/api";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";
import productHeaderBg from "@/assets/HeaderBackgroundImg/ProductBackground.png";

const BrandCard: React.FC<{ brand: any; index: number }> = ({ brand, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.06 }}
    style={{
      background: BRAND.white,
      border: `1px solid ${BRAND.slate100}`,
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 20px",
      cursor: "pointer",
      aspectRatio: "1 / 1",
      boxShadow: `0 2px 16px ${BRAND.primary}14`,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{
      position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
      background: `linear-gradient(90deg, transparent, ${BRAND.primary}4D, transparent)`,
    }} />
    <img src={brand.heroImage || brand.image} alt={brand.brandName || brand.name} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
  </motion.div>
);

const Brand: React.FC = () => {
  const { data: brands = [], isLoading } = useGetBrandsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Background Image with Clear Visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={productHeaderBg}
            alt="Authorised HVAC Partners"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/75 via-[#03172C]/35 to-[#03172C]/90" />
        </div>

        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>AUTHORISED HVAC PARTNERS</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
          >
            Authorized OEM <span className="text-cyan-300">Brands</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
          >
            We partner with world-leading HVAC manufacturers to bring you 100% genuine cooling equipment and parts with manufacturer warranties.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span>✓ 100% Genuine Warranties</span>
            <span>✓ Certified Technicians</span>
            <span>✓ Factory Direct Pricing</span>
          </div>
        </div>
      </section>

      {/* ── Brand Grid ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {brands.map((brand: any, i: number) => (
            <BrandCard key={brand._id || brand.name} brand={brand} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Brand;
