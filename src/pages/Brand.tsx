import { useGetBrandsQuery } from "@/store/api";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/colors";
import Loader from "@/components/ui/Loader";

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
      borderRadius: "18px",
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
    <section style={{
      background: BRAND.bgSoft,
      minHeight: "100vh",
      padding: "80px 40px",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, ${BRAND.slate200} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: "0%", left: "50%", transform: "translate(-50%, 0)",
        width: "800px", height: "500px",
        background: `radial-gradient(ellipse, ${BRAND.primaryPale}CC 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: "56px", position: "relative" }}
      >
        <span style={{
          display: "inline-block",
          background: `${BRAND.primary}1A`,
          border: `1px solid ${BRAND.primary}33`,
          color: BRAND.primary,
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "5px 16px",
          borderRadius: "100px",
          marginBottom: "16px",
        }}>
          Trusted Partners
        </span>

        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: BRAND.dark,
          lineHeight: 1.15,
          fontWeight: 800,
        }}>
          Our Brands
        </h2>

        <div style={{
          margin: "14px auto 0",
          width: "48px",
          height: "3px",
          borderRadius: "2px",
          background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})`,
        }} />
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
      }}>
        {brands.map((brand: any, i: number) => (
          <BrandCard key={brand._id || brand.name} brand={brand} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Brand;
