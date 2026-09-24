import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTAProps {
  phoneNumber?: string;
  onConsultationClick?: () => void;
}

const CTASection: React.FC<CTAProps> = ({
  phoneNumber = "+91 84291 52092",
  onConsultationClick,
}) => {
  const navigate = useNavigate();
  const handleConsultationClick =
    onConsultationClick || (() => navigate("/contact"));

  return (
    <section className="w-full bg-background pt-2 pb-8 sm:pt-4 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #051B30 0%, #0B2E4C 50%, #0284C7 100%)",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "clamp(24px, 4vw, 48px)",
            paddingRight: "clamp(24px, 4vw, 48px)",
            boxShadow: "0 16px 32px rgba(5, 27, 48, 0.2)",
          }}
        >
          {/* Subtle Background Elements */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "280px",
              height: "280px",
              background: "rgba(56, 189, 248, 0.2)",
              borderRadius: "50%",
              filter: "blur(48px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "280px",
              height: "280px",
              background: "rgba(2, 132, 199, 0.3)",
              borderRadius: "50%",
              filter: "blur(48px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#38BDF8",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                padding: "5px 16px",
                borderRadius: "100px",
                marginBottom: "14px",
              }}
            >
              Get In Touch With Perfect Air Solution
            </div>

            {/* Title */}
            <h2 style={{ color: "white", fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 800, marginBottom: "12px", marginTop: 0, lineHeight: 1.2 }}>
              Ready for Turnkey Commercial &amp; Residential HVAC Solutions?
            </h2>

            {/* Description */}
            <p
              style={{
                color: "rgba(224, 242, 254, 0.9)",
                maxWidth: "600px",
                margin: "0 auto 22px",
                fontSize: "0.95rem",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Contact our HVAC engineering specialists for site inspection, load calculations, VRF system layout, and AMC plans.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <button
                onClick={handleConsultationClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  background: "white",
                  color: "#051B30",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              >
                <span>Request Free Quote</span>
                <ArrowRight size={18} />
              </button>
              <a
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 32px",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "10px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <Phone size={18} className="text-cyan-300" />
                <span>Call {phoneNumber}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
