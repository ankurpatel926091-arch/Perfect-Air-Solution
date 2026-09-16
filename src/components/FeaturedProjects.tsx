import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/colors";
import { useGetProjectsQuery } from "@/store/api";

import commercialImg from "../assets/commercial.jpg";
import residentialImg from "../assets/resedential.jpg";
import cassetteImg from "../assets/cassette-ac.png";

const fallbackProjects = [
  {
    _id: "p1",
    title: "12-Story Commercial Office VRF System",
    client: "Corporate IT Park",
    location: "Central Business District",
    featuredImage: commercialImg,
  },
  {
    _id: "p2",
    title: "Multi-Split Luxury Villa HVAC Installation",
    client: "Executive Villa Estates",
    location: "Green Avenue",
    featuredImage: residentialImg,
  },
  {
    _id: "p3",
    title: "Hospitality Suite Ceiling Cassette AC Project",
    client: "Grand Conference Hotel",
    location: "Hospitality Zone",
    featuredImage: cassetteImg,
  },
];

const titleVariant = {
  rest: { opacity: 0.9, y: 0 },
  hover: { opacity: 1, y: -2, transition: { duration: 0.3 } },
};

const imageVariant = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function ProjectCard({ project, i }: { project: any; i: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate("/gallery")}
      key={project._id || project.title}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: `0 4px 24px rgba(5, 27, 48, 0.1)`,
        background: BRAND.white,
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        style={{ height: "100%" }}
      >
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <motion.img
            variants={imageVariant}
            src={project.featuredImage || project.images?.[0] || commercialImg}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(5,27,48,0.85) 0%, rgba(5,27,48,0.2) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 20px 20px",
            }}
          >
            {project.client && (
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block mb-1">
                {project.client}
              </span>
            )}
            <motion.h3
              variants={titleVariant}
              style={{
                color: BRAND.white,
                fontSize: "1.15rem",
                marginBottom: "8px",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </motion.h3>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#38BDF8",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              Explore Gallery Showcase <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const navigate = useNavigate();
  const { data: apiProjects = [] } = useGetProjectsQuery();

  const displayProjects = (apiProjects && apiProjects.length > 0)
    ? apiProjects.slice(0, 3)
    : fallbackProjects;

  return (
    <section className="section-padding py-20 bg-slate-50">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-sky-100 text-[#0284C7] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#051B30] tracking-tight">
              Featured Projects &amp; Installations
            </h2>
          </div>
          <button
            onClick={() => navigate("/gallery")}
            className="inline-flex items-center gap-2 font-bold text-sm text-[#0284C7] hover:text-sky-700 transition-colors"
          >
            <span>View Full Project Gallery</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((p: any, i: number) => (
            <ProjectCard key={p._id || i} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}