import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTAProps {
  phoneNumber?: string;
  onConsultationClick?: () => void;
}

const CTASection: React.FC<CTAProps> = ({
  phoneNumber = "+91 98391 71701",
  onConsultationClick,
}) => {
  const navigate = useNavigate();
  const handleConsultationClick = onConsultationClick || (() => navigate("/contact"));

  return (
    <section style={{ width: "100%", background: "hsl(var(--background))", paddingTop: "30px", paddingLeft: "0", paddingRight: "0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-hero-gradient"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "32px",
            paddingTop: "clamp(28px, 3.5vw, 40px)",       // ⬅ reduced (was 48px–64px)
            paddingBottom: "clamp(28px, 3.5vw, 40px)",     // ⬅ reduced (was 48px–64px)
            paddingLeft: "clamp(32px, 5vw, 64px)",
            paddingRight: "clamp(32px, 5vw, 64px)",
          }}
        >
          {/* Orbs */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", background: "hsl(var(--primary) / 0.18)", borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", background: "hsl(var(--brand-dark) / 0.4)", borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            {/* Badge */}
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              color: "hsl(var(--brand-sky))", fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              padding: "5px 16px", borderRadius: "100px"
            }}>
              Get In Touch
            </div>

            {/* h2 */}
            <h2 style={{ color: "white", marginBottom: "20px", marginTop: 0 }}>
              Ready to Transform Your Business?
            </h2>

            {/* body-text */}
            <p
              className="body-text"
              style={{ color: "hsl(var(--brand-sky) / 0.85)", maxWidth: "520px", margin: "0 auto 32px", fontWeight: 400 }}
            >
              Let's discuss how our HVAC solutions can elevate comfort in your space and keep your customers and team happy year-round.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "0" /* ⬅ was 28px */ }}>
              <button
                onClick={handleConsultationClick}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 32px", background: "hsl(var(--card))",
                  color: "hsl(var(--brand-dark))", fontWeight: 700, fontSize: "0.95rem",
                  borderRadius: "12px", border: "none", cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "Inter",
                }}
              >
                Get Free Consultation <ArrowRight size={17} />
              </button>
              <a
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 32px", background: "transparent",
                  color: "white", fontWeight: 700, fontSize: "0.95rem",
                  borderRadius: "12px", border: "2px solid rgba(255,255,255,0.35)",
                  cursor: "pointer", textDecoration: "none", transition: "all 0.2s",
                  fontFamily: "Inter",
                }}
              >
                <Phone size={17} /> Call {phoneNumber}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
