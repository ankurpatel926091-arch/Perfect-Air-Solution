import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import splitAc from "@/assets/categories/split-ac.png";
import cassetteAc from "@/assets/categories/cassette-ac.png";
import towerAc from "@/assets/categories/tower-ac.png";
import vrfImg from "@/assets/categories/vrf.png";
import ductableImg from "@/assets/categories/ductable.jpg";
import commercialImg from "@/assets/commercial.jpg";

type ServiceCategory = {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  image?: string;
  tagline?: string;
  desc?: string;
  badge?: string;
  tag?: string;
};

const staticCategories: ServiceCategory[] = [
  {
    title: "Split AC",
    tagline: "High-efficiency, silent cooling for home and office spaces.",
    image: splitAc,
    tag: "Residential",
    badge: "Popular",
    slug: "split-ac"
  },
  {
    title: "Cassette AC",
    tagline: "Flush 360-degree ceiling airflow for showrooms & offices.",
    image: cassetteAc,
    tag: "Commercial",
    slug: "cassette-ac"
  },
  {
    title: "Ductable AC",
    tagline: "Concealed ducted cooling for uniform hall & banquet air distribution.",
    image: ductableImg,
    tag: "Commercial",
    badge: "Featured",
    slug: "ductable-ac"
  },
  {
    title: "VRF / VRV Systems",
    tagline: "Variable refrigerant flow for multi-zone enterprise buildings.",
    image: vrfImg,
    tag: "Enterprise",
    badge: "Advanced",
    slug: "vrf-vrv-systems"
  },
  {
    title: "Floor Standing AC",
    tagline: "Powerful high-tonnage portable & tower cooling units.",
    image: towerAc,
    tag: "Commercial",
    slug: "floor-standing-ac"
  },
  {
    title: "Commercial HVAC Systems",
    tagline: "Centralized chillers, AHUs and large industrial ventilation plants.",
    image: commercialImg,
    tag: "Industrial",
    badge: "High Capacity",
    slug: "commercial-hvac-systems"
  }
];

export default function ProductCategories() {
  const navigate = useNavigate();
  const categories = staticCategories;

  return (
    <section className="py-16 bg-gradient-to-b from-[#F4FAFF] via-[#EEF8FF] to-[#E6F4FA] font-sans relative overflow-hidden">
      {/* Background dot grid overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-block bg-sky-100/90 border border-sky-200/80 text-[#0284C7] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-sm">
              SHOP BY TOP CATEGORIES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight">
              Don’t Miss Out – Shop Trending Cooling Products Today
            </h2>
          </div>

          <button
            onClick={() => navigate("/product")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[#0284C7] font-bold text-xs shadow-sm hover:shadow-md hover:border-sky-300 transition-all self-start md:self-auto"
          >
            <span>View all products</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Compact Clean Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug || cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate("/product")}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {cat.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-sky-100 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {cat.badge}
                  </div>
                )}
                
                {/* Category Tag */}
                {cat.tag && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-slate-900/70 text-white text-[10px] font-semibold backdrop-blur-sm">
                    {cat.tag}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-[#051B30] group-hover:text-[#0284C7] transition-colors mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-sky-600">
                  <span>Explore Category</span>
                  <div className="w-7 h-7 rounded-full bg-sky-50 group-hover:bg-[#0284C7] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}