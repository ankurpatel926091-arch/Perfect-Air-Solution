import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Eye, CheckCircle, MapPin } from "lucide-react";
import heroImage from "@/assets/heroimage.webp";
import type { CSSProperties } from "react";

const badges = [
  { icon: CheckCircle, text: "Free Site Visit & Consultation" },
  { icon: CheckCircle, text: "Expert Installation Team" },
  { icon: MapPin, text: "Uttar Pradesh" },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Grid overlay */}
      <div className="hero-grid-overlay" />

      {/* Right photo */}
      <div className="hero-image-container">
        <img
          src={heroImage}
          alt="Professional HVAC installation and air conditioning service in Uttar Pradesh"
          loading="eager"
          className="hero-image"
        />
        <div className="hero-image-fade" />
      </div>

      {/* Content */}
      <div className="hero-content-wrapper">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-badge"
        >
          HVAC & Air Conditioning Experts
        </motion.div>

        {/* h1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-heading"
        >
          #1 HVAC Installation{" "}
          <span style={{ color: "hsl(var(--brand-sky))" }}>
            &amp; Service Experts in Uttar Pradesh
          </span>{" "}
          Trusted by 5,000+ Customers Since 2012
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subtitle body-text"
        >
          Industrial | Commercial | Residential HVAC Solutions in Lucknow &amp; Across UP
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-cta-group"
        >
          <Link to="/contact" className="btn-primary">
            <Phone size={16} fill="white" stroke="none" /> Get Free Site Inspection
          </Link>
          <Link to="/case-studies" className="btn-outline">
            <Eye size={16} /> View Our Projects
          </Link>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hero-badges"
        >
          {badges.map((b, i) => (
            <span key={i} className="hero-badge-item">
              <b.icon size={14} style={{ color: "hsl(var(--brand-sky))" }} /> {b.text}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* ── Hero Section ── */
      .hero-section {
  background: var(--bg-hero-gradient, hsl(var(--brand-dark)));
  position: relative;
  width: 100%;
  min-height: calc(100vh - 80px);  /* 100vh → calc(100vh - 80px) */
  margin-top: 80px;                /* YEH ADD KARO */
  overflow: hidden;
  display: flex;
  align-items: center;
}

        /* Grid overlay */
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* ── Background image (desktop: right panel, mobile: full blurred bg) ── */
        .hero-image-container {
          position: absolute;
          right: 2%;
          top: 0;
          width: 46%;
          height: 100%;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image {
          width: 100%;
          height: 85%;
          object-fit: contain;
          object-position: center;
        }
        .hero-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            hsl(var(--brand-dark)) 0%,
            hsl(var(--brand-dark) / 0.7) 25%,
            transparent 100%
          );
          pointer-events: none;
        }

       /* ── Content wrapper ── */
.hero-content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 48px;  /* 100px → 48px */
}

        /* ── Badge pill ── */
        .hero-badge {
          display: inline-block;
          background: hsl(var(--primary) / 0.2);
          border: 1px solid hsl(var(--primary) / 0.4);
          color: hsl(var(--brand-sky));
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 100px;
          margin-bottom: 16px;
        }

        /* ── Heading ── */
        .hero-heading {
          color: white;
          word-spacing: 0.05em;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
          max-width: min(95vw, 690px);
          word-break: break-word;
        }

        /* ── Subtitle ── */
        .hero-subtitle {
          color: hsl(var(--brand-sky) / 0.8);
          max-width: 480px;
          margin-bottom: 32px;
          font-weight: 400;
        }

        /* ── CTA group ── */
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }

        /* ── Buttons ── */
        .btn-primary {
          background: hsl(var(--primary));
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 8px;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
        }
        .btn-outline {
          background: transparent;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.35);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
        }

        /* ── Trust badges ── */
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .hero-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: hsl(var(--brand-sky) / 0.7);
          font-size: 0.84rem;
        }

        /* ════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════════════ */

        /* ── Tablet (≤ 1024px): shrink image, narrow content ── */
        @media (max-width: 1024px) {
          .hero-image-container {
            width: 50%;
            right: 0;
          }
          .hero-heading {
            max-width: 100%;
            font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          }
        }

        /* ── Mobile (≤ 767px): stack image behind, full-width content ── */
      @media (max-width: 767px) {
  .hero-section {
    min-height: calc(100svh - 68px);  /* 68px = mobile header height */
    margin-top: 68px;
    align-items: flex-end;
  }

          /* Image becomes a full blurred backdrop */
          .hero-image-container {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 55%;
            top: 0;
            right: 0;
          }
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            opacity: 0.55;
          }
          .hero-image-fade {
            background: linear-gradient(
              to bottom,
              transparent 0%,
              hsl(var(--brand-dark) / 0.6) 50%,
              hsl(var(--brand-dark)) 85%
            );
          }

          /* Content slides up from bottom */
          .hero-content-wrapper {
            padding: 24px 20px 40px;
          }

          .hero-heading {
            font-size: clamp(1.45rem, 6vw, 2rem);
            max-width: 100%;
            line-height: 1.3;
          }

          .hero-subtitle {
            font-size: 0.9rem;
            max-width: 100%;
            margin-bottom: 24px;
          }

          .hero-cta-group {
            flex-direction: column;
            gap: 10px;
          }

          .btn-primary,
          .btn-outline {
            width: 100%;
            justify-content: center;
            font-size: 0.85rem;
            padding: 14px 20px;
          }

          .hero-badges {
            gap: 12px;
          }
          .hero-badge-item {
            font-size: 0.78rem;
          }
        }

        /* ── Very small phones (≤ 380px) ── */
        @media (max-width: 380px) {
          .hero-heading {
            font-size: 1.3rem;
          }
          .hero-badge {
            font-size: 0.65rem;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </section>
  );
}
