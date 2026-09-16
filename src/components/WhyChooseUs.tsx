import { motion } from "framer-motion";
import { Award, Wrench, ShieldCheck, Zap, Headphones, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/colors";

const features = [
  {
    icon: Award,
    title: "Quality Solutions",
    description: "Tailored HVAC designs using premium components from Daikin, Blue Star, Voltas, and Carrier.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Certified HVAC engineers guaranteeing precision piping, vacuum pressure testing, and optimal airflow.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Maintenance",
    description: "Comprehensive AMC plans with rapid response times and scheduled preventive servicing.",
  },
  {
    icon: Zap,
    title: "Energy Efficient Systems",
    description: "Cutting-edge inverter and VRF technologies engineered to slash operational electricity costs.",
  },
  {
    icon: Headphones,
    title: "Professional Support",
    description: "Dedicated customer service and technical support available for emergency troubleshooting.",
  },
];

const staggerReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "80px 0", background: BRAND.bgSoft, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "100px", marginBottom: "14px" }}>
            Why Choose Us
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BRAND.dark, lineHeight: 1.15 }}>
            Why Choose Perfect Air Solution
          </h2>
          <p style={{ color: BRAND.slate400, fontSize: "1.05rem", maxWidth: "560px", margin: "12px auto 0", lineHeight: 1.7 }}>
            Discover what sets Perfect Air Solution apart — technical excellence, transparent service, and unwavering commitment to customer comfort.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerReveal}
              whileHover={{ y: -6 }}
              style={{
                background: BRAND.white, borderRadius: "20px",
                padding: "32px 20px", textAlign: "center",
                border: `1px solid ${BRAND.slate100}`,
                boxShadow: `0 4px 20px rgba(5, 27, 48, 0.06)`,
                transition: "all 0.3s ease",
                display: "flex", flexDirection: "column", alignItems: "center"
              }}
            >
              <div style={{
                width: "64px", height: "64px", borderRadius: "16px",
                background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
                boxShadow: `0 8px 20px ${BRAND.primary}35`
              }}>
                <f.icon size={28} style={{ color: BRAND.white }} />
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "1.1rem", color: BRAND.dark, marginBottom: "10px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.86rem", color: BRAND.slate400, lineHeight: 1.65 }}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}