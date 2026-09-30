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

import { getActiveBlogs, getBlogById } from "@/api/blog.api";

import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import aboutHeaderBg from "@/assets/HeaderBackgroundImg/AboutBackground.png";

const BlogPost = () => {
  const { slug } = useParams();

  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);

        if (!slug) {
          setPost(null);
          return;
        }

        // Get current blog
        const response = await getBlogById(slug);

        if (!response?.data) {
          setPost(null);
          return;
        }

        const currentBlog = response.data;

        setPost(currentBlog);

        // Get active blogs for related articles
        const activeResponse = await getActiveBlogs();

        const allBlogs = Array.isArray(activeResponse?.data)
          ? activeResponse.data
          : [];

        const related = allBlogs
          .filter(
            (blog: any) =>
              blog._id !== currentBlog._id &&
              blog.slug !== currentBlog.slug
          )
          .slice(0, 3);

        setRelatedPosts(related);
      } catch (error) {
        setPost(null);
        setRelatedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Scroll handling
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0284C7] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600 font-medium">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  // Blog not found
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title || "");

  // Read time formatting
  const rawReadTime = post.readTime || "5 min read";

  const formattedReadTime = rawReadTime
    .toLowerCase()
    .includes("read")
    ? rawReadTime
    : `${rawReadTime} read`;

  // Use first tag as category
  const category =
    post.tags?.length > 0 ? post.tags[0] : null;

  // Social buttons
  const socialButtons = [
    {
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Share on Facebook",
      color:
        "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    },
    {
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on Twitter / X",
      color:
        "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white",
    },
    {
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      label: "Share on LinkedIn",
      color:
        "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* ── HERO HEADER ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={post.image?.url || aboutHeaderBg}
            alt={post.title || "Blog"}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/80 via-[#03172C]/40 to-[#03172C]/95" />
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-4">
            <Breadcrumb
              variant="dark"
              customTitle={post.title}
            />
          </div>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 mb-6 backdrop-blur-md group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />

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
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Tag size={13} className="text-cyan-400" />
                {category}
              </span>
            )}

            <span className="inline-flex items-center gap-1 text-slate-300 text-xs sm:text-sm">
              <Clock size={14} className="text-cyan-400" />
              {formattedReadTime}
            </span>

            {post.date && (
              <span className="inline-flex items-center gap-1 text-slate-300 text-xs sm:text-sm">
                <Calendar
                  size={14}
                  className="text-cyan-400"
                />
                {post.date}
              </span>
            )}
          </motion.div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 font-sans break-words"
          >
            {post.title}
          </motion.h1>

          {/* Author */}
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
              <span className="font-semibold text-white block">
                {post.author || "Perfect Air HVAC Team"}
              </span>

              <span className="text-slate-400 text-[11px]">
                Engineering & Climate Control Experts
              </span>
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
          className="bg-white rounded-xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-none hover:shadow-none relative"
        >

          {/* Top Gradient Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#051B30] via-[#0284C7] to-cyan-400 rounded-t-xl" />

          {/* Read Time */}
          <div className="absolute -top-4 right-6 sm:right-10 px-4 py-1.5 rounded-full bg-[#051B30] text-white text-xs font-bold uppercase tracking-wider border border-cyan-400/30 flex items-center gap-1.5">
            <Clock size={13} className="text-cyan-400" />
            <span>{formattedReadTime}</span>
          </div>

          {/* Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Share2
                size={15}
                className="text-[#0284C7]"
              />

              <span>Share Article</span>
            </div>

            <div className="flex items-center gap-2">
              {socialButtons.map(
                ({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-9 h-9 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center transition-all duration-300 ${color}`}
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Featured Image */}
          {post.image?.url && (
            <div className="mb-8 rounded-xl overflow-hidden border border-slate-200/80 max-h-[500px]">
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-6 font-sans">

            {post.content &&
            Array.isArray(post.content) ? (
              post.content.map(
                (para: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <p
                      className={
                        i === 0
                          ? "text-lg sm:text-xl font-normal text-slate-800 leading-relaxed"
                          : ""
                      }
                    >
                      {para}
                    </p>

                    {i === 1 &&
                      para.length > 50 && (
                        <blockquote className="my-8 p-6 sm:p-7 rounded-md bg-sky-50/80 border-l-4 border-[#0284C7]">
                          <p className="text-base sm:text-lg font-medium italic text-[#051B30] leading-relaxed m-0">
                            "{para.slice(0, 140)}..."
                          </p>
                        </blockquote>
                      )}
                  </motion.div>
                )
              )
            ) : typeof post.content === "string" &&
              post.content.includes("<") ? (
              <div
                className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed font-sans blog-rich-content"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            ) : (
              <p className="text-base sm:text-lg leading-relaxed">
                {post.content}
              </p>
            )}
          </div>

          {/* Article Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-200/80">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#0284C7] hover:text-white border border-slate-200/80 text-slate-600 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
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

            {relatedPosts.map(
              (rp: any, i: number) => (
                <motion.div
                  key={rp.slug || rp._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.4,
                  }}
                >
                  <Link
                    to={`/blog/${rp.slug || rp._id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-[#0284C7] shadow-none hover:shadow-none transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">

                      {rp.image?.url ? (
                        <img
                          src={rp.image.url}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-grow">

                      <div>
                        {rp.tags?.length > 0 && (
                          <span className="text-[#0284C7] text-xs font-bold uppercase tracking-wider block mb-2">
                            {rp.tags[0]}
                          </span>
                        )}

                        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-2">
                          {rp.title}
                        </h3>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              )
            )}

          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection />

      {/* Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
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