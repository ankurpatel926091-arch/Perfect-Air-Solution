import { motion } from "framer-motion";
import { Wind, Building, Droplets, Filter, Snowflake, AppWindow, AirVent, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Snowflake, title: "Split AC",        type: "Residential", desc: `Energy-efficient Split AC for homes and offices with powerful cooling performance.\nLow noise operation and modern wall-mounted design.\nProfessional installation and reliable after-sales support available.` },
  { icon: AppWindow, title: "Window AC",       type: "Residential", desc: `Compact and budget-friendly Window AC for small rooms.\nEasy installation with strong cooling output.\nIdeal for residential and rental properties.` },
  { icon: AirVent,   title: "Cassette AC",     type: "Commercial",  desc: `Ceiling-mounted Cassette AC for uniform 360° air distribution.\nPerfect for offices, showrooms, and commercial spaces.\nStylish design with high cooling efficiency.` },
  { icon: Building,  title: "Ductable AC",     type: "Commercial",  desc: `Centralized Ductable AC system for large areas and halls.\nHidden installation with powerful airflow control.\nBest solution for commercial and industrial cooling needs.` },
  { icon: Droplets,  title: "Water Dispenser", type: "Residential", desc: `Hot and cold Water Dispensers for offices and commercial use.\nEnergy-efficient and durable cooling system.\nReliable performance with easy maintenance support.` },
  { icon: Filter,    title: "RO Plant",        type: "Commercial",  desc: `Advanced RO Plant systems for pure and safe drinking water.\nSuitable for commercial and industrial applications.\nHigh filtration efficiency with long-lasting components.` },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

function Card({ cat, i }: { cat: typeof categories[0]; i: number }) {
  const navigate = useNavigate();
  const Icon = cat.icon;

  return (
    <motion.div
      custom={i} initial="hidden" whileInView="visible"
      viewport={{ once: true }} variants={fadeUp}
      whileHover={{ y: -4 }} onClick={() => navigate("/product")}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
        borderRadius: "16px", padding: "28px",
        boxShadow: "0 2px 16px hsl(var(--primary) / 0.08)",
        transition: "all 0.3s", height: "100%",
        display: "flex", flexDirection: "column", gap: "12px",
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "12px",
          background: "hsl(var(--brand-light))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={22} style={{ color: "hsl(var(--primary))" }} />
        </div>

        {/* h3 — global Inter 600, override color to primary */}
        <h3 style={{ color: "hsl(var(--primary))", fontSize: "1.05rem", margin: 0 }}>
          {cat.title}
        </h3>

        <p className="body-text" style={{ fontSize: "0.87rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65, margin: 0, flex: 1 }}>
          {cat.desc}
        </p>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "12px", marginTop: "auto",
          borderTop: "1px solid hsl(var(--border))",
        }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "hsl(var(--primary))" }}>View More</span>
          <ArrowRight size={16} style={{ color: "hsl(var(--primary))" }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductCategories() {
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ background: "hsl(var(--brand-light))" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)",
              color: "hsl(var(--primary))", fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              padding: "5px 20px", borderRadius: "100px", marginBottom: "5px",
            }}
          >
            Our Products
          </motion.div>

         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
             <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-sm sm:text-base md:text-3xl"
  style={{ marginBottom: "5px", marginTop: 0 }}
>
  Cooling Solutions for Every Need
</motion.h2>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <button
                onClick={() => navigate("/product")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                  color: "white", fontWeight: 700, fontSize: "0.9rem",
                  padding: "10px 22px", borderRadius: "100px", border: "none",
                  cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.25)",
                  transition: "all 0.25s", whiteSpace: "nowrap" as const,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px hsl(var(--primary) / 0.38)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px hsl(var(--primary) / 0.25)";
                }}
              >
                View All Products <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px", marginBottom: "20px" }}>
          {categories.map((cat, i) => <Card key={cat.title} cat={cat} i={i} />)}
        </div>
      </div>
    </section>
  );
}
