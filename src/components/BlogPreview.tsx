import { Tag, ChevronRight, BookOpen, Wrench, Thermometer, Wind, Zap, ChevronLeft, Sparkles } from "lucide-react";
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
    case "Maintenance": return <Wrench size={20} />;
    case "Buying Guide": return <Zap size={20} />;
    case "Tips & Tricks": return <Thermometer size={20} />;
    case "Commercial HVAC": return <Wind size={20} />;
    default: return <BookOpen size={20} />;
  }
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[#0284C7] bg-sky-50 border border-sky-100 text-xs font-extrabold px-3 py-1 rounded-full">
      <Tag size={12} className="text-[#0284C7]" /> {category}
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
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-200/90 hover:border-[#0284C7] shadow-none hover:shadow-none transition-all duration-300 group font-sans h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {/* Category Icon Badge */}
        <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-xl bg-gradient-to-tr from-[#051B30] to-[#0284C7] flex items-center justify-center text-white border border-white/20">
          {getCategoryIcon(post.category)}
        </div>
        
        {post.featured && (
          <div className="absolute top-4 right-4 z-10 text-white text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
            Featured
          </div>
        )}

        <img
          src={post.image}
          alt={`${post.title} - HVAC blog article`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category || "Uncategorized"} />
        </div>

        <h3 className="font-extrabold text-[#051B30] text-lg sm:text-xl font-sans group-hover:text-[#0284C7] transition-colors leading-snug mb-2">
          {post.title}
        </h3>

        <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5 flex-1 line-clamp-3">
          {excerpt}
        </p>

        <Link
          aria-label={`Read article: ${post.title}`}
          to={`/blog/${post.slug || post._id}`}
          className="mt-auto w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-[#051B30] text-slate-800 hover:text-white border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-decoration-none"
        >
          <BookOpen size={15} />
          <span>Read Article</span>
          <ChevronRight size={14} />
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

      {activeIndex > 0 && (
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous article"
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#051B30] text-white flex items-center justify-center shadow-lg border-0 cursor-pointer z-10"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {activeIndex < posts.length - 1 && (
        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next article"
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#051B30] text-white flex items-center justify-center shadow-lg border-0 cursor-pointer z-10"
        >
          <ChevronRight size={18} />
        </button>
      )}

      <div className="flex justify-center gap-2 mt-5">
        {posts.map((_: ApiBlogPost, i: number) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full border-0 cursor-pointer transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-[#0284C7]" : "w-2 bg-slate-300"
            }`}
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
    <section className="py-16 sm:py-15 bg-gradient-to-b from-[#EBF5FA] via-[#F4FAFE] to-[#F8FAFC] text-slate-800 relative overflow-hidden font-sans">
      {/* Background Dot overlay */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] font-extrabold text-xs uppercase tracking-wider mb-3.5 shadow-sm">
            <Sparkles size={14} className="text-[#0284C7]" />
            <span>OUR BLOG</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight font-sans leading-tight mb-4">
            Latest{" "}
            <span className="text-[#0284C7]">
              Insights &amp; Updates
            </span>
          </h2>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 border border-sky-200 text-[#0284C7] font-extrabold text-xs uppercase tracking-wider transition-all group text-decoration-none"
          >
            <span>View All Articles</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#0284C7]" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post: any, i: number) => (
              <motion.div
                key={post._id || post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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