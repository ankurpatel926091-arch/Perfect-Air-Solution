import { motion } from "framer-motion";
import { Hotel, Cross, GraduationCap, Briefcase, ShoppingBag, BarChart2, ArrowRight, Server, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const applications = [
  { icon: <Cross size={30} strokeWidth={1.5} color="#EF4444" />,    label: "Healthcare HVAC Solutions",             slug: "hospitals-clinics" },
  { icon: <Hotel size={30} strokeWidth={1.5} color="#F59E0B" />,    label: "Hospitality & Hotel HVAC Solutions",    slug: "hotels-restaurants" },
  { icon: <Briefcase size={30} strokeWidth={1.5} color="#6366F1" />,label: "Commercial Office HVAC Solutions",      slug: "offices-it-parks" },
  { icon: <ShoppingBag size={30} strokeWidth={1.5} color="#F97316" />, label: "Retail & Mall HVAC Solutions",      slug: "retail-stores" },
  { icon: <BarChart2 size={30} strokeWidth={1.5} color="#14B8A6" />,label: "Industrial & Manufacturing HVAC Solutions", slug: "industrial-buildings" },
  { icon: <GraduationCap size={30} strokeWidth={1.5} color="#3B82F6" />, label: "Educational Institution HVAC Solutions", slug: "schools-colleges" },
  { icon: <Server size={30} strokeWidth={1.5} color="#8B5CF6" />,   label: "Data Center HVAC Solutions",            slug: "data-centers" },
  { icon: <Warehouse size={30} strokeWidth={1.5} color="#0EA5E9" />,label: "Warehouse & Cold Storage HVAC Solutions", slug: "warehouses-cold-storage" },
];

export function CommercialApplications() {
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ background: "hsl(var(--card))" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)",
            color: "hsl(var(--primary))", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            padding: "5px 14px", borderRadius: "100px"
          }}>
            Industries We Serve
          </div>

          <h2 style={{ marginTop: 0 }}>
            Commercial HVAC Applications
          </h2>
        </motion.div>

        {/* 
          Mobile  (< 480px) : 2 columns
          Tablet  (480–767px): 3 columns
          Desktop (768px+)   : auto-fill, minmax 250px
        */}
        <style>{`
          .applications-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 40px;
          }
          @media (min-width: 480px) {
            .applications-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 14px;
            }
          }
          @media (min-width: 768px) {
            .applications-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 16px;
            }
          }
        `}</style>

        <div className="applications-grid">
          {applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px hsl(var(--primary) / 0.14)" }}
              onClick={() => navigate(`/hvac-applications/${app.slug}`)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "12px",
                background: "hsl(var(--brand-light))", borderRadius: "6px",
                padding: "28px 16px", cursor: "pointer",
                border: "1px solid hsl(var(--border))",
                transition: "all 0.25s",
              }}
            >
              <div>{app.icon}</div>
              <span
                className="body-text"
                style={{ fontSize: "0.82rem", color: "hsl(var(--muted-foreground))", fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}
              >
                {app.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/hvac-applications")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
              color: "white", fontWeight: 700, fontSize: "0.9rem",
              padding: "14px 36px", borderRadius: "100px", border: "none",
              cursor: "pointer", boxShadow: "0 8px 24px hsl(var(--primary) / 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommercialApplications;