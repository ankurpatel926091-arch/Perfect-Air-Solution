import { Tag, ChevronRight, BookOpen, Wrench, Thermometer, Wind, Zap, ChevronLeft } from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export interface ApiBlogPost {
  _id: string; id?: string; slug?: string; title: string;
  content: string | string[]; category: string; image: string;
  createdAt: string; updatedAt?: string; author?: string;
  readTime?: string; date?: string; featured?: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Maintenance": return <Wrench size={22} />;
    case "Buying Guide": return <Zap size={22} />;
    case "Tips & Tricks": return <Thermometer size={22} />;
    case "Commercial HVAC": return <Wind size={22} />;
    default: return <BookOpen size={22} />;
  }
};

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Maintenance": "#e07830",
    "Buying Guide": "#1a3a5c",
    "Tips & Tricks": "#2e7d32",
    "Commercial HVAC": "#6a1b9a",
  };
  const color = colorMap[category] || "hsl(var(--brand-dark))";

  return (
    <span
      style={{ background: color }}
      className="inline-flex items-center gap-1 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
    >
      <Tag size={11} /> {category}
    </span>
  );
}

function BlogCard({ post }: { post: ApiBlogPost }) {
  let excerpt = "Read more about " + post.title;
  if (post.content && Array.isArray(post.content) && post.content.length > 0) {
    excerpt = post.content[0];
  } else if (typeof post.content === "string") {
    excerpt = post.content;
  }

  return (
    <article
      className="bg-card rounded-xl overflow-hidden flex flex-col group h-full"
      style={{
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 4px 16px hsl(var(--brand-dark) / 0.07)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px hsl(var(--brand-dark) / 0.13)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px hsl(var(--brand-dark) / 0.07)";
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <div
          className="absolute top-4 left-4 z-10 rounded-xl p-2"
          style={{ background: "hsl(var(--brand-dark))", color: "white" }}
        >
          {getCategoryIcon(post.category)}
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#e07830" }}>
            Featured
          </div>
        )}
        <img
          src={post.image}
          alt={`${post.title} - HVAC blog article`}
          loading="lazy"
          decoding="async"
          width="600"
          height="350"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category || "Uncategorized"} />
        </div>

        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            color: "hsl(var(--brand-dark))",
            fontSize: "1.125rem",
            marginBottom: "8px",
            lineHeight: 1.4,
            transition: "color 0.2s",
          }}
          className="group-hover:text-[hsl(var(--primary))]"
        >
          {post.title}
        </h3>

        <p
          className="body-text"
          style={{
            fontSize: "0.875rem", color: "hsl(var(--muted-foreground))",
            marginBottom: "16px", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {excerpt}
        </p>

        <Link
          aria-label={`Read article: ${post.title}`}
          to={`/blog/${post.slug || post._id}`}
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition"
          style={{
            border: "2px solid hsl(var(--brand-dark))",
            color: "hsl(var(--brand-dark))",
            background: "transparent",
            borderRadius: "var(--radius)",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "hsl(var(--brand-dark))";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "hsl(var(--brand-dark))";
          }}
        >
          <BookOpen size={15} /> Read Article <ChevronRight size={14} />
        </Link>
      </div>
    </article>
  );
}

// ─── Mobile Carousel ────────────────────────────────────────────────────────
function MobileCarousel({ posts }: { posts: ApiBlogPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(posts.length - 1, index));
    setActiveIndex(clamped);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const diff = e.touches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 5) isDraggingRef.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 50) {
      goTo(diff < 0 ? activeIndex + 1 : activeIndex - 1);
    }
    startXRef.current = null;
  };

  return (
    <div className="relative">
      {/* Carousel track */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 16}px))`,
            gap: "16px",
          }}
        >
          {posts.map((post: ApiBlogPost) => (
            <div
              key={post._id || post.id}
              style={{ minWidth: "100%", flex: "0 0 100%" }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      {activeIndex > 0 && (
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous article"
          style={{
            position: "absolute",
            left: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "hsl(var(--brand-dark))",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {activeIndex < posts.length - 1 && (
        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next article"
          style={{
            position: "absolute",
            right: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "hsl(var(--brand-dark))",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        {posts.map((_: ApiBlogPost, i: number) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "100px",
              background: i === activeIndex ? "hsl(var(--brand-dark))" : "hsl(var(--brand-dark) / 0.25)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function BlogPreview() {
  const { data: blogPosts = [], isLoading, error } = useGetBlogsQuery();
  const recentPosts = blogPosts.slice(0, 3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isLoading || error || recentPosts.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: "hsl(var(--brand-light))" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <div style={{
            display: "inline-block",
            background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)",
            color: "hsl(var(--primary))", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            padding: "5px 14px", borderRadius: "100px"
          }}>
            Our Blog
          </div>

          <h2 style={{ marginBottom: "16px", marginTop: 0 }}>
            Latest Insights &amp; Updates
          </h2>

          <Link
            to="/blog"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "hsl(var(--primary))", fontWeight: 700,
              fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Desktop Grid / Mobile Carousel */}
        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MobileCarousel posts={recentPosts} />
          </motion.div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {recentPosts.map((post: ApiBlogPost, i: number) => (
              <motion.div
                key={post._id || post.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}