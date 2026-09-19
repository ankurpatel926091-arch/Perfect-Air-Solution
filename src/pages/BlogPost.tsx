import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Tag,
  Clock,
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import { useGetBlogsQuery } from "@/store/api";
import CTASection from "@/components/CTASection";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: blogPosts = [], isLoading } = useGetBlogsQuery();

  const post = blogPosts.find((p: any) => p.slug === slug || String(p._id) === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03172C] text-cyan-300 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts
    .filter((p: any) => p.slug !== slug && String(p._id) !== slug)
    .slice(0, 3);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title || "");

  // Format read time without duplicated "READ"
  const rawReadTime = post.readTime || "5 min read";
  const formattedReadTime = rawReadTime.toLowerCase().includes("read")
    ? rawReadTime
    : `${rawReadTime} read`;

  const socialButtons = [
    {
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Share on Facebook",
      color: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    },
    {
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on Twitter / X",
      color: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white",
    },
    {
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      label: "Share on LinkedIn",
      color: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ── HERO HEADER ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03172C] via-[#052848] to-[#041E38]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to Blog Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 mb-6 backdrop-blur-md group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Tag size={13} className="text-cyan-400" />
              {post.category || "HVAC Tech"}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300 text-xs sm:text-sm">
              <Clock size={14} className="text-cyan-400" />
              {formattedReadTime}
            </span>
            {post.date && (
              <span className="inline-flex items-center gap-1 text-slate-300 text-xs sm:text-sm">
                <Calendar size={14} className="text-cyan-400" />
                {post.date}
              </span>
            )}
          </motion.div>

          {/* Article Title (Word wrapping fixed, clean heading) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 font-sans break-words"
          >
            {post.title}
          </motion.h1>

          {/* Author info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#00B4FF] flex items-center justify-center text-white font-bold text-xs border border-white/20">
              <User size={16} />
            </div>
            <div>
              <span className="font-semibold text-white block">Perfect Air HVAC Team</span>
              <span className="text-slate-400 text-[11px]">Engineering & Climate Control Experts</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE CONTENT CARD ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 sm:-mt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-none hover:shadow-none relative"
        >
          {/* Top color gradient highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#051B30] via-[#0284C7] to-cyan-400 rounded-t-3xl" />

          {/* Read time floating pill badge */}
          <div className="absolute -top-4 right-6 sm:right-10 px-4 py-1.5 rounded-full bg-[#051B30] text-white text-xs font-bold uppercase tracking-wider border border-cyan-400/30 flex items-center gap-1.5">
            <Clock size={13} className="text-cyan-400" />
            <span>{formattedReadTime}</span>
          </div>

          {/* Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Share2 size={15} className="text-[#0284C7]" />
              <span>Share Article</span>
            </div>

            <div className="flex items-center gap-2">
              {socialButtons.map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`w-9 h-9 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center transition-all duration-300 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Featured Header Image if present */}
          {post.image && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200/80 max-h-[500px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Text Body */}
          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-6 font-sans">
            {post.content && Array.isArray(post.content) ? (
              post.content.map((para: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <p className={i === 0 ? "text-lg sm:text-xl font-normal text-slate-800 leading-relaxed" : ""}>
                    {para}
                  </p>

                  {/* Highlight Blockquote */}
                  {i === 1 && para.length > 50 && (
                    <blockquote className="my-8 p-6 sm:p-7 rounded-2xl bg-sky-50/80 border-l-4 border-[#0284C7]">
                      <p className="text-base sm:text-lg font-medium italic text-[#051B30] leading-relaxed m-0">
                        "{para.slice(0, 140)}..."
                      </p>
                    </blockquote>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-base sm:text-lg leading-relaxed">{post.content}</p>
            )}
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-200/80">
            {["HVAC", post.category, "Energy Saving", "Climate Control", "Expert Advice"].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#0284C7] hover:text-white border border-slate-200/80 text-slate-600 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-10">
            <CTASection />
          </div>
        </motion.div>
      </main>

      {/* ── RELATED ARTICLES ── */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#051B30] tracking-tight font-sans">
                Recommended Articles
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore more expert insights from Perfect Air Solution
              </p>
            </div>
            <Link
              to="/blog"
              className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-[#051B30] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200"
            >
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp: any, i: number) => (
              <motion.div
                key={rp.slug || rp._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={`/blog/${rp.slug || rp._id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#0284C7] shadow-none hover:shadow-none transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[#0284C7] text-xs font-bold uppercase tracking-wider block mb-2">
                        {rp.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to Top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#051B30] text-white flex items-center justify-center shadow-xl border border-cyan-400/40 hover:bg-[#0284C7] transition-all duration-300 cursor-pointer"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default BlogPost;