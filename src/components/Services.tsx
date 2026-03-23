import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { BRAND } from "@/lib/colors";

import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import { Wrench, ShieldCheck, MapPin, Clock, Settings2, Wind } from "lucide-react";

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'MapPin': return MapPin;
    case 'Settings2': return Settings2;
    case 'Wind': return Wind;
    default: return Wrench;
  }
};

export default function Services() {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useGetServicesQuery();
  const topServices = [...services].reverse().slice(0);

  if (isLoading) return <Loader />;
  if (topServices.length === 0) return null;

  return (
    <section className="section-padding" style={{  
      position: "relative", overflow: "hidden",
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)", position: "relative", zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: BRAND.accentOnDark, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "100px", marginBottom: "18px" }}>
            What We Do
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.white, lineHeight: 1.15 }}>
            Professional Services
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "20px" }}>
          {topServices && topServices.map((s: any, i: number) => {
            const Icon = renderIcon(s.icon);
            return (
              <motion.div
                key={s.slug || s.title}
                onClick={() => navigate(`/service/${s.slug}`)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: "32px", borderRadius: "20px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.3s",
                  cursor: "pointer"
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    width: "56px", height: "56px", borderRadius: "14px",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px"
                  }}
                >
                  <Icon size={26} style={{ color: BRAND.accentOnDark }} />
                </motion.div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.white, marginBottom: "10px", fontSize: "1.15rem" }}>{s.title}</h3>
                <p style={{ color: BRAND.textOnDarkMuted, fontSize: "0.87rem", lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
