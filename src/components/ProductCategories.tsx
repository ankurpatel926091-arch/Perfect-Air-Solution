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
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
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
      whileHover={{ y: -4 }}
      onClick={() => navigate("/product")}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 2px 16px hsl(var(--primary) / 0.08)",
          transition: "all 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            borderRadius: "14px",
            overflow: "hidden",
            background: "hsl(var(--muted))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          {cat.image ? (
            <img
              src={cat.image}
              alt={cat.title || "Service category"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--muted-foreground))",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              No Image
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <h3
            style={{
              color: "hsl(var(--primary))",
              fontSize: "1.05rem",
              margin: 0,
            }}
          >
            {cat.title || "Service"}
          </h3>
          {cat.badge ? (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "hsl(var(--brand-dark))",
                background: "hsl(var(--brand-dark) / 0.08)",
                border: "1px solid hsl(var(--brand-dark) / 0.14)",
                borderRadius: "999px",
                padding: "4px 10px",
                whiteSpace: "nowrap",
              }}
            >
              {cat.badge}
            </span>
          ) : null}
        </div>

        <p
          className="body-text"
          style={{
            fontSize: "0.87rem",
            color: "hsl(var(--muted-foreground))",
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}
        >
          {cat.tagline ||
            cat.desc ||
            "Explore this service category and view related products."}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            marginTop: "auto",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "hsl(var(--primary))",
            }}
          >
            View More
          </span>
          <ArrowRight size={16} style={{ color: "hsl(var(--primary))" }} />
        </div>
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
    <section
      className="section-padding"
      style={{ background: "hsl(var(--brand-light))" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 48px)",
        }}
      >
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
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 20px",
              borderRadius: "100px",
              marginBottom: "5px",
            }}
          >
            Browse by Category
          </motion.div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm sm:text-base md:text-3xl"
              style={{ marginBottom: "5px", marginTop: 0 }}
            >
          Choose the Right Cooling & Water Solutions

            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => navigate("/product")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background:
                    "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px hsl(var(--primary) / 0.25)",
                  transition: "all 0.25s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px hsl(var(--primary) / 0.38)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px hsl(var(--primary) / 0.25)";
                }}
              >
                View All Products <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
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
