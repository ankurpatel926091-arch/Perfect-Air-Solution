import { motion } from "framer-motion";
import { Download, MapPin, Building2, Thermometer } from "lucide-react";
import jsPDF from "jspdf";
import { useGetProjectsQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";

function generatePDF(study: any) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFillColor(8, 42, 69);
  doc.rect(0, 0, pageWidth, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("LIMRA SALES AND SERVICES", margin, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Project Report", margin, 30);
  doc.text(`${study.category} | ${study.completionYear}`, margin, 37);

  y = 60;
  doc.setTextColor(8, 42, 69);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(study.title || study.name, margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${study.location}  |  System: ${study.systemType}  |  Scale: ${study.units}`, margin, y);
  y += 15;
  doc.setDrawColor(6, 149, 205);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  doc.setTextColor(8, 42, 69);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("The Challenge", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const challengeLines = doc.splitTextToSize(study.challenge, contentWidth);
  doc.text(challengeLines, margin, y);
  y += challengeLines.length * 5 + 12;

  doc.setTextColor(8, 42, 69);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Our Solution", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const solutionLines = doc.splitTextToSize(study.solution, contentWidth);
  doc.text(solutionLines, margin, y);
  y += solutionLines.length * 5 + 12;

  doc.setTextColor(8, 42, 69);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Results", margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  study.results.forEach((r: string) => {
    doc.setFillColor(6, 149, 205);
    doc.circle(margin + 2, y - 1.5, 1.5, "F");
    doc.text(r, margin + 8, y);
    y += 7;
  });

  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("LIMRA Sales And Services | Hardoi & Shahjahanpur, UP | www.limrasales.com", margin, footerY);

  doc.save(`${(study.title || study.name || "study").replace(/\s+/g, "-").toLowerCase()}-case-study.pdf`);
}

const CaseStudies = () => {
  const { data: projects = [], isLoading } = useGetProjectsQuery();

  if (isLoading) return <Loader fullScreen />;

  return (
    <main className="bg-background min-h-screen">

      {/* ── Header ── */}
      <section
        className="bg-hero-gradient"
        style={{ padding: "80px 32px", position: "relative", overflow: "hidden" }}
      >
        {/* dot pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none",
        }} />

      <div
  className="bg-hero-gradient text-center"
  style={{ paddingTop: "10px",
paddingRight: "24px",

paddingLeft: "24px", }}
>
  {/* h1 — global: DM Serif Display */}
  <h1 style={{ color: "white" }}>
    Our Projects
  </h1>

  {/* body text */}
  <p
    className="body-text"
    style={{ color: "hsl(var(--brand-sky))", maxWidth: "620px", margin: "0 auto" }}
  >
    Explore our featured HVAC projects — from universities to luxury resorts.
    Download detailed project reports as PDFs.
  </p>
</div>



      </section>

      {/* ── Project Cards ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          {projects.map((study: any, i: number) => (
            <motion.article
              key={study._id || study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 60 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                background: "hsl(var(--card))",
                borderRadius: "20px",
                border: "1px solid hsl(var(--border))",
                overflow: "hidden",
                boxShadow: "0 4px 24px hsl(var(--primary) / 0.08)",
                transition: "box-shadow 0.4s",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: "280px" }}>
                <img
                  src={study.featuredImage || study.images?.[0] || study.image}
                  alt={study.title || study.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(var(--brand-dark) / 0.5) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, hsl(var(--brand-dark)), hsl(var(--primary)))" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{
                    background: "hsl(var(--brand-dark))",
                    color: "white",
                    fontSize: "0.7rem", fontWeight: 700,
                    padding: "5px 14px", borderRadius: "100px",
                    letterSpacing: "0.08em",
                  }}>
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  {/* Meta pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
                    {[
                      { icon: <MapPin size={13} />, text: study.location || "Various Locations" },
                      { icon: <Building2 size={13} />, text: study.client || study.units || "Commercial" },
                      { icon: <Thermometer size={13} />, text: study.systemType || "HVAC System" },
                    ].map((m, idx) => (
                      <span key={idx} style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        fontSize: "0.8rem", color: "hsl(var(--muted-foreground))",
                      }}>
                        <span style={{ color: "hsl(var(--primary))" }}>{m.icon}</span>
                        {m.text}
                      </span>
                    ))}
                  </div>

                  {/* h2 — global: DM Serif Display, 400, brand-dark. Keep size override for card context */}
                  <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", marginBottom: "20px", marginTop: 0 }}>
                    {study.title || study.name}
                  </h2>

                  {/* Project details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                    <div>
                      {/* h3 — global: Inter 600, foreground color */}
                      <h3 style={{ fontSize: "0.875rem", marginBottom: "5px" }}>Project Details</h3>
                      <p className="body-text" style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>
                        {study.description || study.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div>
                    <h3 style={{ fontSize: "0.875rem", marginBottom: "10px" }}>Key Results</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {(study.results || ["Successfully installed and commissioned", "On-time completion", "Energy-efficient operation"]).map((r: string, idx: number) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.82rem", color: "hsl(var(--muted-foreground))" }}>
                          <span style={{
                            marginTop: "5px", width: "7px", height: "7px",
                            borderRadius: "50%", background: "hsl(var(--primary))",
                            flexShrink: 0, display: "block",
                          }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Download button */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid hsl(var(--border))" }}>
                  <button
                    onClick={() => generatePDF(study)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      background: "linear-gradient(135deg, hsl(var(--brand-dark)), hsl(var(--primary)))",
                      color: "white", padding: "11px 22px",
                      borderRadius: "10px", border: "none", cursor: "pointer",
                      fontWeight: 600, fontSize: "0.875rem",
                      boxShadow: "0 4px 14px hsl(var(--primary) / 0.28)",
                      transition: "all 0.2s",
                    }}
                  >
                    <Download size={15} />
                    Download Project PDF
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;