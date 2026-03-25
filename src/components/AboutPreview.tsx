import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountUp from "./ui/CountUp";

const stats = [
  { value: 5000, suffix: "+", label: "Customers" },
  { value: 500, suffix: "+", label: "Commercial Projects" },
  { value: 9, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function AboutPreview() {
  return (
    <section className="section-padding" style={{
      background: "hsl(var(--brand-light))"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              background: "hsl(var(--primary) / 0.1)",
              border: "1px solid hsl(var(--primary) / 0.25)",
              color: "hsl(var(--primary))",
              fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              padding: "5px 20px", borderRadius: "100px",
            }}
          >
            LIMRA Sales &amp; Services
          </motion.div>

          {/* h2 — global: DM Serif Display, 400, brand-dark */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Trusted HVAC &amp; Cooling Experts in Uttar Pradesh
          </motion.h2>

          {/* body-text */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            className="body-text"
            style={{ color: "hsl(var(--muted-foreground))", textAlign: "justify", marginTop: "16px", fontSize: "1rem" }}
          >
            LIMRA Sales &amp; Services is a leading HVAC and air conditioning solutions provider based in Uttar Pradesh, delivering reliable installation, maintenance, and large-scale commercial cooling projects across the state. With strong technical expertise and years of hands-on industry experience, we provide complete climate control solutions for residential, commercial, and industrial spaces.

            From standard AC installations to advanced VRF systems, ducting, ventilation, cold rooms, ice plants, and chiller plants, our team ensures every project is executed with precision, safety, and efficiency. We specialize in the installation and servicing of Window, Split, Cassette, Ductable, Package AC, and AHU systems, along with copper piping and complete HVAC line work.

            With a commitment to quality workmanship, transparent service, and long-term customer satisfaction, LIMRA Sales &amp; Services continues to build trust through performance and professionalism.
          </motion.p>
        </div>

        {/* Stats */}
        <div style={{ padding: "0 0 10px", margin: "0 auto", width: "100%" }}>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp}
                style={{
                  color: "white",
                  background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                  borderRadius: "16px", padding: "32px 24px", textAlign: "center",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.08)",
                }}
              >
                {/* Stat number — DM Serif display, white */}
                <div style={{
                  fontFamily: "DM Serif Display",
                  fontSize: "2.2rem", color: "white",
                  lineHeight: 1, marginBottom: "8px", fontWeight: 400,
                }}>
                  <CountUp from={0} to={s.value} duration={1.2} separator="," direction="up" startWhen={true} />
                  {s.suffix}
                </div>
                <div className="body-text" style={{ fontSize: "0.85rem", color: "white", fontWeight: 500 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ textAlign: "center" }}
        >
          <a
            href="/about"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "hsl(var(--primary))", fontWeight: 700,
              fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Learn More About Us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}