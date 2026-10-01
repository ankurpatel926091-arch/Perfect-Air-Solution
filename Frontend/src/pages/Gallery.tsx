import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";

import galleryHeaderBg from "@/assets/HeaderBackgroundImg/GalleryBackground.png";

import { getGallery, getGalleryCategories } from "@/api/gallery.api";

type GalleryItem = {
  _id: string;
  image?: {
    url?: string;
    public_id?: string;
  };
  galleryCategory?: {
    _id?: string;
    title?: string;
    slug?: string;
    isActive?: boolean;
  };
  isActive?: boolean;
};

type GalleryFilter = {
  key: string;
  label: string;
};

export default function Gallery() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<GalleryFilter[]>([
    { key: "all", label: "All Projects" },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ PAGINATION STATES
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 9;

  // ============================
  // GET ACTIVE CATEGORIES API
  // ============================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getGalleryCategories({ status: "active" });
        const catList = response?.galleryCategories || [];
        if (Array.isArray(catList)) {
          setCategories([
            { key: "all", label: "All Projects" },
            ...catList.map((cat: any) => ({
              key: cat.title,
              label: cat.title,
            })),
          ]);
        }
      } catch (err) {
        console.error("Failed to load active gallery categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // ============================
  // GET GALLERY API (With Pagination)
  // ============================
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");
        setSelectedIndex(null);

        const params: {
          category?: string;
          status: string;
          page: number;
          limit: number;
        } = {
          status: "active",
          page: page,
          limit: LIMIT,
        };

        // Category filter
        if (activeCategory !== "all") {
          params.category = activeCategory;
        }

        const response = await getGallery(params);
        const newItems = Array.isArray(response?.gallery)
          ? response.gallery
          : [];

        // ✅ Page 1 par replace, baaki par append
        if (page === 1) {
          setGalleryItems(newItems);
        } else {
          setGalleryItems((prev) => [...prev, ...newItems]);
        }

        const totalAvailable = response?.filteredTotal ?? response?.total;
        if (typeof totalAvailable === "number") {
          setHasMore(page * LIMIT < totalAvailable);
        } else {
          setHasMore(newItems.length === LIMIT);
        }
      } catch (error) {
        setError("Failed to load gallery images.");
        if (page === 1) setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [activeCategory, page]);

  // ============================
  // FILTERED ITEMS
  // ============================
  const filteredItems = galleryItems.filter((item) => {
    if (item.galleryCategory && item.galleryCategory.isActive === false) {
      return false;
    }
    return true;
  });

  // ============================
  // SELECTED ITEM
  // ============================
  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  // ============================
  // PREVIOUS IMAGE
  // ============================
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (selectedIndex === null || filteredItems.length === 0) {
      return;
    }

    setSelectedIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1,
    );
  };

  // ============================
  // NEXT IMAGE
  // ============================
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (selectedIndex === null || filteredItems.length === 0) {
      return;
    }

    setSelectedIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1,
    );
  };

  // ============================
  // KEYBOARD NAVIGATION
  // ============================
  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev !== null
            ? prev === 0
              ? filteredItems.length - 1
              : prev - 1
            : null,
        );
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev !== null
            ? prev === filteredItems.length - 1
              ? 0
              : prev + 1
            : null,
        );
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, filteredItems]);

  // ============================
  // LOCK BODY SCROLL
  // ============================
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ============================
          HEADER BANNER
      ============================ */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden mb-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={galleryHeaderBg}
            alt="Gallery Perfect Air Solution"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/70 via-[#03172C]/30 to-[#03172C]/85" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex justify-center mb-3">
            <Breadcrumb variant="dark" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#03172C]/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md shadow-sm">
            <span>FEATURED WORK</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]"
          >
            Perfect Air Solution <span className="text-cyan-300">Showcase</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-100 text-sm sm:text-base max-w-3xl mx-auto font-medium leading-relaxed mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Explore our completed HVAC installations, commercial VRF systems,
            ductable air conditioning, and industrial climate solutions across
            UP &amp; All India.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span>✓ Verified Installations</span>
            <span>✓ Commercial &amp; Residential</span>
            <span>✓ Certified Engineers</span>
          </div>
        </div>
      </section>

      {/* ============================
          MAIN CONTAINER
      ============================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================
            CATEGORY FILTERS
        ============================ */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 sm:mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setSelectedIndex(null);
                setPage(1); // ✅ Page reset
                setGalleryItems([]); // ✅ Purane items clear
              }}
              className={`px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 shadow-sm ${
                activeCategory === cat.key
                  ? "bg-[#0284C7] text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-[#0284C7] border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ============================
            LOADING (Only first load)
        ============================ */}
        {loading && page === 1 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 font-medium">Loading gallery...</p>
          </div>
        )}

        {/* ============================
            ERROR
        ============================ */}
        {!loading && error && (
          <div className="py-20 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* ============================
            EMPTY STATE
        ============================ */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 font-medium">
              No gallery images found.
            </p>
          </div>
        )}

        {/* ============================
            GALLERY GRID
        ============================ */}
        {!error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (idx % LIMIT) * 0.05,
                }}
                className="group relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden border border-slate-200/90 shadow-none transition-all duration-300 cursor-pointer bg-white"
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="relative w-full h-full overflow-hidden bg-white">
                  <img
                    src={item.image?.url}
                    alt={item.galleryCategory?.title || "HVAC Installation"}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Zoom Icon */}
                  <div className="absolute top-3 right-3 bg-[#0284C7] p-2.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ============================
            ✅ LOAD MORE BUTTON
        ============================ */}
        {!error && filteredItems.length > 0 && hasMore && (
          <div className="flex justify-center mt-10 mb-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#0284C7] text-[#0284C7] hover:text-white font-bold px-8 py-3.5 rounded-md border-2 border-[#0284C7] transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && page > 1 ? "Loading..." : "Load More Images"}
              {!(loading && page > 1) && <ArrowRight size={18} />}
            </button>
          </div>
        )}

        {/* ============================
            ✅ NO MORE ITEMS
        ============================ */}
        {!error && filteredItems.length > 0 && !hasMore && (
          <div className="text-center mt-10 mb-6">
            <p className="text-slate-400 text-sm font-medium">
              — You've seen all images —
            </p>
          </div>
        )}

        {/* ============================
            LIGHTBOX MODAL
        ============================ */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
              }}
              className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4 sm:p-6 select-none"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full h-[65vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white p-2.5 rounded-full transition-colors border border-white/20 shadow-lg cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Previous */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-[#0284C7] text-white p-3 rounded-full transition-all duration-200 border border-white/20 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-[#0284C7] text-white p-3 rounded-full transition-all duration-200 border border-white/20 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    key={selectedItem._id}
                    src={selectedItem.image?.url}
                    alt={
                      selectedItem.galleryCategory?.title || "HVAC Installation"
                    }
                    className="max-w-full max-h-full object-contain rounded-md select-none transition-opacity duration-150"
                  />
                </div>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/70 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full border border-white/15 pointer-events-none">
                  {(selectedIndex ?? 0) + 1} / {filteredItems.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================
            CTA
        ============================ */}
        <div className="mt-20 mb-12 sm:mb-20 bg-gradient-to-br from-[#051B30] to-[#0F4C81] rounded-md p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-extrabold mb-4 whitespace-nowrap">
              Need Custom HVAC System Design or Installation?
            </h2>

            <p className="text-slate-300 text-sm md:text-base mb-8 font-light">
              Contact Perfect Air Solution today for expert site inspection,
              load calculations, VRF system layout, and AMC consultation.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-md text-base transition-all shadow-lg hover:shadow-sky-500/30 transform hover:-translate-y-0.5"
            >
              <span>Get Free HVAC Quote</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
