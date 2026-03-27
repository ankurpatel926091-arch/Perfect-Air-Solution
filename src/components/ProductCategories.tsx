import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import splitAc from "@/assets/categories/split-ac.png";
import windowAc from "@/assets/categories/window-ac.png";
import cassetteAc from "@/assets/categories/cassette-ac.png";
import towerAc from "@/assets/categories/tower-ac.png";
import waterCooler from "@/assets/categories/water-cooler-dispenser.png";
import vrfImg from "@/assets/categories/vrf.png";

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

const staticCategories: ServiceCategory[] = [
  {
    title: "Split AC",
    tagline: "High-efficiency cooling for your home and office.",
    image: splitAc,
    tag: "Residential",
    badge: "Popular",
    slug: "split-ac"
  },
  {
    title: "Window AC",
    tagline: "Compact and powerful cooling solutions for any room.",
    image: windowAc,
    tag: "Residential",
    slug: "window-ac"
  },
  {
    title: "Cassette AC",
    tagline: "Unobtrusive ceiling-mounted cooling for large spaces.",
    image: cassetteAc,
    tag: "Commercial",
    slug: "cassette-ac"
  },
  {
    title: "Tower AC",
    tagline: "Elegant floor-standing units with high cooling capacity.",
    image: towerAc,
    tag: "Commercial",
    slug: "tower-ac"
  },
  {
    title: "Water Cooler and Dispenser",
    tagline: "Pure, chilled water for offices and public spaces.",
    image: waterCooler,
    tag: "Industrial",
    slug: "water-cooler-and-dispenser"
  },
  {
    title: "VRF",
    tagline: "Advanced Variable Refrigerant Flow systems for complex buildings.",
    image: vrfImg,
    tag: "Industrial",
    badge: "Advanced",
    slug: "vrf"
  }
];

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
  const categories = staticCategories;

  return (
    <section className="section-padding" style={{ background: "hsl(var(--brand-light))" }}>
      <style>{`
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
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0.30) 65%, rgba(0,0,0,0.08) 100%);
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
          letter-spacing: 0.1rem;
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

        .pc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(10px, 1.5vw, 16px);
          width: 100%;
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

        /* ── Breakpoints ── */
        @media (max-width: 960px) {
          .pc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .pc-card {
            aspect-ratio: 16 / 11;
          }
        }

        @media (max-width: 640px) {
          .pc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .pc-card {
            aspect-ratio: 3 / 2.5;
            border-radius: 12px;
          }
          .pc-view-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .pc-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .pc-card {
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              background: "hsl(var(--primary) / 0.1)",
              border: "1px solid hsl(var(--primary) / 0.25)",
              color: "hsl(var(--primary))",
              fontWeight: 700,
          
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 20px",
              borderRadius: "100px",
              marginBottom: "18px"
            }}
          >
           Shop by Top Categories
          </motion.div>

          {/* Heading and View All button row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ margin: 0, flex: 1, letterSpacing: "0.1rem"}}
            >
              Don’t Miss Out – Shop Trending Cooling Products Today
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