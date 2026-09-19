import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import React from "react";
import Loader from "@/components/ui/Loader";
import Breadcrumb from "@/components/Breadcrumb";
import aboutHeaderBg from "@/assets/HeaderBackgroundImg/AboutBackground.png";

const Blog = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Background Image with Clear Visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={aboutHeaderBg}
            alt="Expert HVAC Articles"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/75 via-[#03172C]/35 to-[#03172C]/90" />
        </div>

        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex justify-center mb-3">
            <Breadcrumb variant="dark" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>EXPERT HVAC ARTICLES</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
          >
            HVAC Insights &amp; <span className="text-cyan-300">Tips</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5"
          >
            Expert advice on air conditioning, maintenance, and energy efficiency.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span>✓ Maintenance Tips</span>
            <span>✓ Energy Saving Advice</span>
            <span>✓ Commercial &amp; Residential</span>
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {blogPosts.map((post: any, i: number) => (
            <motion.div
              key={post.slug || post._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/blog/${post.slug || post._id}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div
                  className="bg-card"
                  style={{
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    border: "1px solid hsl(var(--border))",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--brand-cyan))";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      height: "208px",
                      overflow: "hidden",
                      background: "hsl(var(--muted))",
                    }}
                  >
                    {/* Category badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        zIndex: 10,
                        background: "hsl(var(--brand-dark))",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: "100px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {post.category}
                    </div>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "20px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      className="font-sans font-extrabold"
                      style={{
                        color: "hsl(var(--brand-dark))",
                        fontSize: "1.1rem",
                        lineHeight: 1.4,
                        marginBottom: "8px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt — body-text for Inter size/leading */}
                    <p
                      className="body-text"
                      style={{
                        fontSize: "0.875rem",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "16px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Tags + CTA */}
                    <div style={{ marginTop: "auto" }}>
                      {post.tags?.length > 0 && (
                        <div style={{ marginBottom: "12px" }}>
                          <p
                            style={{
                              fontSize: "0.7rem",
                              color: "hsl(var(--muted-foreground))",
                              fontWeight: 600,
                              marginBottom: "6px",
                            }}
                          >
                            Topics
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {post.tags.slice(0, 3).map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: "0.7rem",
                                  background: "hsl(var(--secondary))",
                                  color: "hsl(var(--secondary-foreground))",
                                  padding: "3px 10px",
                                  borderRadius: "100px",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          border: "2px solid hsl(var(--brand-dark))",
                          color: "hsl(var(--brand-dark))",
                          background: "transparent",
                          borderRadius: "var(--radius)",
                          padding: "8px 0",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background =
                            "hsl(var(--brand-dark))";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "hsl(var(--brand-dark))";
                        }}
                      >
                        Read Article <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;