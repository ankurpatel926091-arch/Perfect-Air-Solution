import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

type ServiceCategory = {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  image?: string;
  tagline?: string;
  desc?: string;
  badge?: string;
  tag?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Card({ cat, i }: { cat: ServiceCategory; i: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      onClick={() => navigate("/product")}
      className="pc-card"
      whileHover="hover"
    >
      {/* Image */}
      {cat.image ? (
        <motion.img
          src={cat.image}
          alt={cat.title || "Category"}
          className="pc-card-img"
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div className="pc-card-placeholder" />
      )}

      {/* Gradient overlay */}
      <div className="pc-card-overlay" />

      {/* Top accent strip on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="pc-card-accent"
      />

      {/* Badge */}
      {cat.badge && (
        <div className="pc-card-badge">{cat.badge}</div>
      )}

      {/* Content */}
      <div className="pc-card-content">
        {cat.tag && (
          <div className="pc-card-tag">{cat.tag}</div>
        )}

        <h3 className="pc-card-title">
          {cat.title || "Service"}
        </h3>

        <p className="pc-card-desc">
          {cat.tagline || cat.desc || "Explore this service category and view related products."}
        </p>

        {/* Explore button */}
        <motion.div
          variants={{
            hover: {
              background: "rgba(255,255,255,0.22)",
              borderColor: "rgba(255,255,255,0.4)",
            },
          }}
          className="pc-card-btn"
        >
          <span className="pc-card-btn-label">Explore category</span>
          <motion.div
            variants={{ hover: { x: 2 } }}
            className="pc-card-btn-icon"
          >
            <ArrowRight size={10} color="#fff" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProductCategories() {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useGetServicesQuery();

  if (isLoading) return <Loader />;

  const categories = [...services].reverse().slice(0, 6);

  if (categories.length === 0) return null;

  return (
    <section className="section-padding pc-section">
      <style>{`
        /* ── Global overflow fix ── */
        .pc-section *,
        .pc-section *::before,
        .pc-section *::after {
          box-sizing: border-box;
        }

        /* ── Section ── */
        .pc-section {
          background: hsl(var(--brand-light));
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .pc-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding-left: clamp(16px, 5vw, 48px);
          padding-right: clamp(16px, 5vw, 48px);
        }

        /* ── Header ── */
        .pc-header {
          margin-bottom: clamp(20px, 3.5vw, 32px);
        }

        .pc-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: clamp(9px, 1.1vw, 11px);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
          border: 0.5px solid hsl(var(--primary) / 0.25);
          border-radius: 999px;
          padding: 4px 14px;
          margin-bottom: 10px;
        }

        .pc-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(var(--primary));
          display: inline-block;
          flex-shrink: 0;
        }

        .pc-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .pc-heading {
          font-size: clamp(1rem, 2.2vw, 1.55rem);
          font-weight: 700;
          color: hsl(var(--foreground));
          margin: 0;
          line-height: 1.25;
          flex: 1 1 0%;
          min-width: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .pc-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 600;
          color: hsl(var(--foreground));
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 999px;
          padding: clamp(7px, 1vw, 9px) clamp(14px, 1.8vw, 20px);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 1px 4px hsl(var(--primary) / 0.08);
        }

        /* ── Grid ── */
        .pc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(10px, 1.5vw, 16px);
          width: 100%;
        }

        /* ── Card ── */
        .pc-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          aspect-ratio: 4 / 3;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 0.5px solid rgba(255,255,255,0.08);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .pc-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-card-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.08));
        }

        .pc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.42) 38%, rgba(0,0,0,0.06) 65%, transparent 100%);
          pointer-events: none;
        }

        .pc-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: hsl(var(--primary));
          z-index: 3;
        }

        .pc-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: clamp(8px, 1vw, 10px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,255,255,0.15);
          border: 0.5px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 3px 10px;
          backdrop-filter: blur(6px);
          z-index: 3;
        }

        .pc-card-content {
          position: relative;
          z-index: 2;
          padding: clamp(12px, 2vw, 18px);
        }

        .pc-card-tag {
          font-size: clamp(8px, 1vw, 10px);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 4px;
        }

        .pc-card-title {
          color: #fff;
          font-size: clamp(0.8rem, 1.4vw, 1rem);
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.25;
        }

        .pc-card-desc {
          font-size: clamp(10px, 1vw, 11.5px);
          color: rgba(255,255,255,0.58);
          margin: 0 0 clamp(10px, 1.5vw, 14px);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pc-card-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.10);
          border: 0.5px solid rgba(255,255,255,0.20);
          border-radius: 10px;
          padding: clamp(7px, 1vw, 9px) clamp(10px, 1.2vw, 13px);
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
        }

        .pc-card-btn-label {
          font-size: clamp(10px, 1vw, 12px);
        
          color: #fff;
       
        }

        .pc-card-btn-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Breakpoints ── */

        /* Large tablets / small desktops: 2 columns */
        @media (max-width: 960px) {
          .pc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* Tablets: tighten heading */
        @media (max-width: 768px) {
          .pc-heading {
            font-size: clamp(0.95rem, 3vw, 1.25rem);
          }
          .pc-card {
            aspect-ratio: 16 / 11;
          }
        }

        /* Large phones: still 2 columns but compact */
        @media (max-width: 640px) {
          .pc-heading-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .pc-view-btn {
            width: 100%;
            justify-content: center;
          }
          .pc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .pc-card {
            aspect-ratio: 3 / 2.5;
            border-radius: 12px;
          }
          .pc-card-badge {
            top: 8px;
            left: 8px;
            padding: 2px 8px;
          }
        }

        /* Small phones: 1 column */
        @media (max-width: 400px) {
          .pc-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .pc-card {
            aspect-ratio: 16 / 9;
          }
          .pc-card-desc {
            -webkit-line-clamp: 3;
          }
        }

        /* Landscape phones: 3 columns short cards */
        @media (max-height: 500px) and (orientation: landscape) {
          .pc-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .pc-card {
            aspect-ratio: 16 / 10;
          }
        }

        /* Very wide screens: constrain card heights */
        @media (min-width: 1400px) {
          .pc-card {
            aspect-ratio: 4 / 2.8;
          }
          .pc-card-title {
            font-size: 1.1rem;
          }
          .pc-card-desc {
            font-size: 12.5px;
          }
        }
      `}</style>

      <div className="pc-inner">
        {/* Header */}
        <div className="pc-header">
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="pc-pill"
          >
            <span className="pc-pill-dot" />
            Browse by category
          </motion.div>

          {/* Heading row */}
          <div className="pc-heading-row">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="pc-heading"
            >
              Choose the Right Cooling &amp; Water Solutions
            </motion.h2>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate("/product")}
              whileHover={{ y: -1 }}
              className="pc-view-btn"
            >
              View all products
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="pc-grid">
          {categories.map((cat, i) => (
            <Card
              key={cat._id || cat.id || cat.slug || cat.title || i}
              cat={cat}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}