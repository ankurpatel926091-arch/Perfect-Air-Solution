import { motion } from "framer-motion";
import { Award, Users, ShieldCheck, Zap } from "lucide-react";
import { BRAND } from "@/lib/colors";

const features = [
  { icon: Award, title: "Industry Leader", description: "Recognized as the leading HVAC provider in Uttar Pradesh." },
  { icon: Users, title: "50,000+ Happy Clients", description: "Serving homes, offices, hospitals, and industrial facilities." },
  { icon: ShieldCheck, title: "Quality Assured", description: "Certified team with comprehensive warranty and 24/7 support." },
  { icon: Zap, title: "Latest Technology", description: "Cutting-edge energy-efficient and smart HVAC systems." },
];

const staggerReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }),
};

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "64px 0", background: BRAND.bgSoft, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px" }}>
            Why Choose Us
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15 }}>
            The LIMRA Difference
          </h2>
          <p style={{ color: BRAND.slate400, fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Discover what sets LIMRA Sales And Services apart — innovation, reliability, and commitment to excellence in every installation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerReveal}
              whileHover={{ y: -4 }}
              style={{
                background: BRAND.white, borderRadius: "20px",
                padding: "36px 28px", textAlign: "center",
                border: `1px solid ${BRAND.slate100}`,
                boxShadow: `0 2px 16px ${BRAND.primary}14`,
                transition: "all 0.3s"
              }}
            >
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: `0 8px 24px ${BRAND.primary}40`
              }}>
                <f.icon size={28} style={{ color: BRAND.white }} />
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "1.15rem", color: BRAND.dark, marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.88rem", color: BRAND.slate400, lineHeight: 1.65 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}