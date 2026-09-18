import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import React from "react";
import Loader from "@/components/ui/Loader";

const Blog = () => {
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="bg-background min-h-screen">

      {/* ── HERO ── */}
      <div
        className="bg-hero-gradient text-center"
        style={{ padding: "56px 24px", marginTop: "48px" }}
      >
        {/* h1 global: DM Serif Display, 400, clamp size, brand-dark — override only color for hero */}
        <h1 style={{ color: "white", marginBottom: "12px" }}>
          HVAC Insights &amp; Tips
        </h1>

        {/* body-text class: Inter, base/lg, leading-relaxed */}
        <p className="body-text" style={{ color: "hsl(var(--brand-sky))" }}>
          Expert advice on air conditioning, maintenance, and energy efficiency.
        </p>
      </div>

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
                    boxShadow: "0 4px 16px hsl(var(--brand-dark) / 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 32px hsl(var(--brand-dark) / 0.13)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 16px hsl(var(--brand-dark) / 0.07)";
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