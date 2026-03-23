import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Target, Phone } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import CTASection from "@/components/CTASection";

const stats = [
  { value: 5000, suffix: "+", label: "Customers" },
  { value: 500, suffix: "+", label: "Commercial Projects" },
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities" },
];

const values = [
  {
    icon: Shield,
    title: "Reliability",
    desc: "We stand behind every AC installation and industrial cooling project with dependable service, strong workmanship, and responsive after-sales support. Our commitment ensures consistent performance and long-term customer trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We deliver HVAC solutions with certified technicians, premium components, and no shortcuts. Every project reflects our dedication to technical precision and professional standards.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    desc: "Through strict quality checks and performance testing, we guarantee reliable and energy-efficient air conditioning systems. From VRV/VRF systems to chiller plants, quality remains our top priority.",
  },
  {
    icon: Target,
    title: "Innovation",
    desc: "We continuously adopt modern, energy-efficient, and smart HVAC technologies to deliver advanced cooling solutions for residential, commercial, and industrial needs.",
  },
];

const milestones = [
  {
    year: "2012",
    text: "Founded in Hardoi as a small AC service workshop with a vision to deliver reliable cooling solutions.",
  },
  {
    year: "2020",
    text: "Expanded services across nearby districts and built a strong customer base in residential and commercial HVAC projects.",
  },
  {
    year: "2023",
    text: "Entered commercial and industrial cooling sector including VRV/VRF systems, Cold Rooms, and Chiller Plants.",
  },
  {
    year: "2024",
    text: "Successfully completed major commercial and industrial projects across Uttar Pradesh, strengthening our reputation as a trusted HVAC partner.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Reusable section-badge component
const Badge = ({ label }: { label: string }) => (
  <div
    style={{
      display: "inline-block",
      background: "hsl(var(--primary) / 0.1)",
      border: "1px solid hsl(var(--primary) / 0.25)",
      color: "hsl(var(--primary))",
      fontWeight: 700,
      fontSize: "0.72rem",
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      padding: "5px 14px",
      borderRadius: "100px",
    }}
  >
    {label}
  </div>
);

const About = () => (
  <main className="bg-background">
    {/* ── Hero ── */}

    <section
      className="bg-hero-gradient"
      style={{
        paddingTop: "96px",
        paddingRight: "24px",
        paddingBottom: "56px",
        paddingLeft: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "white", marginBottom: "16px" }}
        >
          Building Comfort Since 2012
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="body-text"
          style={{
            color: "hsl(var(--brand-sky))",
            maxWidth: "1200px",
            margin: "0 auto",
            fontWeight: 300,
            fontSize: "14px",
          }}
        >
          LIMRA Sales and Services is a trusted HVAC and air conditioning
          company delivering reliable cooling solutions for homes, offices,
          hospitals, hotels, and industrial facilities. Since 2012, we
          specialize in AC installation, AC servicing, VRV/VRF systems, chiller
          plants, cold rooms, and industrial cooling services with a strong
          commitment to quality, safety, and customer satisfaction.
        </motion.p>
      </div>
    </section>

   
    

    {/* ── Our Story ── */}
    <section
      style={{
       
        paddingLeft: "0",
        paddingRight: "0",
        background: "hsl(var(--brand-light))",
        marginTop: "0px",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Badge label="Our Story" />
          {/* h2 — global: DM Serif Display, 400, brand-dark */}
          <h2>Delivering Comfort, Building Trust</h2>
          <div
            className="body-text"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              color: "hsl(var(--muted-foreground))",
              fontWeight: 300,
              fontSize: "14px",
            }}
          >
            <p style={{ fontSize: "14px" }}>
              Founded in 2012, LIMRA Sales and Services began with a clear
              vision — to provide reliable, honest, and high-quality cooling
              solutions that customers can truly depend on. What started as a
              small HVAC service initiative has steadily evolved into a trusted
              name in air conditioning and industrial cooling solutions across
              multiple cities.
            </p>
            <p style={{ fontSize: "14px" }}>
              Over the years, we have successfully installed and serviced
              thousands of air conditioning systems — from residential Split and
              Window AC units to advanced VRV/VRF systems, cold rooms, and
              large-scale industrial chiller plants. Our growth has been driven
              by strong technical expertise, prompt service delivery, and an
              unwavering commitment to quality workmanship.
            </p>
          <p style={{ fontSize: "14px" }}>
              Today, with 5,000+ satisfied customers and 500+ completed
              commercial projects, we continue to focus on innovation,
              energy-efficient solutions, and long-term client partnerships. For
              us, cooling is more than just a service — it is about delivering
              comfort, reliability, and performance that businesses and families
              can confidently rely on.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
    <section
      style={{ padding: "15px 24px", background: "hsl(var(--brand-light))" }}
    >
     <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1, duration: 0.6 },
                },
              }}
              style={{
                color: "white",
                background:
                  "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Serif Display",
                  fontSize: "2.8rem",
                  color: "white",
                  lineHeight: 1,
                  marginBottom: "8px",
                  fontWeight: 400,
                }}
              >
                <CountUp
                  from={0}
                  to={s.value}
                  duration={1.2}
                  separator=","
                  direction="up"
                  startWhen={true}
                />
                {s.suffix}
              </div>

              <div
                className="body-text"
                style={{
                  fontSize: "0.85rem",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Values ── */}
    <section
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "0",
        paddingRight: "0",
        background: "hsl(var(--card))",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <Badge label="Our Values" />
          {/* h2 — global styles applied */}
          <h2 style={{ marginTop: 0 }}>What Drives Us</h2>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1, duration: 0.5 },
                },
              }}
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "18px",
                padding: "28px",
                boxShadow: "0 2px 16px hsl(var(--primary) / 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  height: "3px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(90deg, hsl(var(--brand-dark)), hsl(var(--primary)))",
                }}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "hsl(var(--brand-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <v.icon size={22} style={{ color: "hsl(var(--primary))" }} />
              </div>
              {/* h3 — global: Inter 600, foreground color */}
              <h3 style={{ marginBottom: "8px", fontSize: "1rem", letterSpacing: "1px" }}>
                {v.title}
              </h3>
              <p
                className="body-text"
                style={{
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                  lineHeight: 1.65,
                  letterSpacing: "1px",
                }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Milestones & Mission ── */}
   <section style={{ paddingTop: "30px", paddingBottom: "36px", paddingLeft: "0", paddingRight: "0", background: "hsl(var(--background))" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "64px",
          alignItems: "flex-start",
        }}
      >
        {/* Timeline */}
        <div style={{ flex: "1 1 55%", minWidth: "320px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ marginBottom: "10px" }}
          >
            <Badge label="Milestones" />
            {/* h2 — global styles applied */}
            <h2 style={{ marginTop: 0 }}>Our Journey</h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Connector line */}
                {i < milestones.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "calc(100% - 40px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      delay: i * 0.15 + 0.3,
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      left: "31px",
                      top: "64px",
                      width: "2px",
                      background:
                        "linear-gradient(to bottom, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.1) 100%)",
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Year badge */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                    boxShadow: "0 6px 20px hsl(var(--primary) / 0.28)",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  {m.year}
                </div>
                {/* Text */}
                <div
                  style={{
                    paddingTop: "14px",
                    flex: 1,
                    paddingBottom: i === milestones.length - 1 ? "0" : "24px",
                  }}
                >
                  <p
                    className="body-text"
                    style={{
                      color: "hsl(var(--foreground) / 0.85)",
                      lineHeight: 1.7,
                    }}
                  >
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Card */}
        <div
          style={{
            flex: "1 1 35%",
            minWidth: "320px",
            position: "sticky",
            top: "120px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              padding: "2px",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, transparent 100%)",
            }}
          >
            <div
              style={{
                background: "hsl(var(--brand-light))",
                borderRadius: "20px",
                padding: "48px 40px",
                boxShadow: "0 24px 48px hsl(var(--brand-dark) / 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "hsl(var(--card))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 16px hsl(var(--brand-dark) / 0.04)",
                  }}
                >
                  <Target size={24} style={{ color: "hsl(var(--primary))" }} />
                </div>
                {/* h3 — global: Inter 600 */}
                <h3
                  style={{
                    fontSize: "1.35rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: 0,
                  }}
                >
                  Our Mission
                </h3>
              </div>
              <p
                className="body-text"
                style={{
                  color: "hsl(var(--foreground) / 0.85)",
                  marginBottom: "24px",
                }}
              >
                Our mission is to provide reliable, energy-efficient, and
                cost-effective air conditioning and industrial cooling solutions
                tailored to residential, commercial, and industrial needs.
              </p>
              <p
                className="body-text"
                style={{ color: "hsl(var(--foreground) / 0.85)" }}
              >
                We are committed to delivering quality workmanship, advanced
                HVAC technology, and prompt service support to ensure long-term
                customer satisfaction and dependable cooling performance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <div style={{ paddingBottom: "36px" }}>
      <CTASection />
    </div>
  </main>
);

export default About;
