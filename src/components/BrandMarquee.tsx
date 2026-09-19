import { useState } from "react";
import { motion } from "framer-motion";
import { useGetBrandsQuery } from "@/store/api";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";

function BrandCard({ brand }: { brand: any }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = brand.heroImage || brand.image;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        flexShrink: 0,
        width: "180px",
        background: BRAND.white,
        border: `1px solid ${BRAND.slate100}`,
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "center",
        padding: "14px 12px",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 4px 16px rgba(2, 132, 199, 0.08)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "64px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logoSrc && !imgError ? (
          <img
            src={logoSrc}
            alt={brand.brandName || brand.name}
            onError={() => setImgError(true)}
            style={{ maxHeight: "56px", maxWidth: "90%", objectFit: "contain" }}
          />
        ) : (
          <div style={{ fontWeight: 800, fontSize: "1.1rem", color: BRAND.dark, letterSpacing: "0.05em" }}>
            {brand.brandName || brand.name}
          </div>
        )}
      </div>
      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284C7", marginTop: "4px" }}>
        {brand.brandName || brand.name}
      </span>
    </motion.div>
  );
}

const BrandMarquee = () => {
  const { data: brands = [], isLoading } = useGetBrandsQuery();
  const doubled = [...brands, ...brands];

  if (isLoading) return <Loader />;
  if (brands.length === 0) return null;

  return (
    <section className="section-padding py-16" style={{ background: BRAND.white, overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "36px", padding: "0 24px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "14px" }}>
            TRUSTED BRANDS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight font-sans">
            We Work With The Best
          </h2>
        </div>

        {/* Fade edges */}
        <div style={{ pointerEvents: "none", position: "absolute", zIndex: 10, left: 0, top: 0, bottom: 0, width: "96px", background: "linear-gradient(to right, #ffffff, transparent)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", top: 0, bottom: 0, right: 0, width: "96px", zIndex: 10, background: "linear-gradient(to left, #ffffff, transparent)" }} />

        <div style={{ overflow: "hidden" }}>
          <div
            style={{ display: "flex", gap: "20px", width: "max-content", animation: "marquee 28s linear infinite" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
          >
            {doubled.map((brand: any, i: number) => (
              <BrandCard key={i} brand={brand} />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
};

export default BrandMarquee;