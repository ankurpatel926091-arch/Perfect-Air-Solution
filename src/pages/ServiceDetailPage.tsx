import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  CheckCircle2, Star, Phone, Calendar,
  Shield, Zap, ArrowUpRight, Clock
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetServicesQuery } from "@/store/api";
import Loader from "@/components/ui/Loader";
import { BRAND } from "@/lib/colors";

const iconMap: Record<string, React.ElementType> = { ShieldCheck, MapPin, Settings2, Wind, Wrench };
const renderIcon = (name: string): React.ElementType => iconMap[name] ?? Wrench;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useGetServicesQuery();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  if (isLoading) return <Loader fullScreen />;

  const service = services.find((s: any) => s.slug === slug);
  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600 font-medium">Service not found.</p>
      </div>
    );
  }

  const Icon = renderIcon(service.icon);
  const related = services.filter((s: any) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Banner */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full py-1 px-4 text-xs font-bold uppercase tracking-widest mb-4 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 backdrop-blur-md">
              <Icon size={13} /> {service.badge || "Service"}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-3 text-cyan-300">{service.tagline}</p>
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6 text-slate-200">{service.longDesc}</p>

            <div className="flex flex-wrap gap-5 items-center">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <Star size={15} color="#d97706" fill="#d97706" />
                <strong className="font-bold">{service.rating}</strong>
                <span className="text-slate-300">({service.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock size={14} className="text-cyan-300" /> {service.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <Zap size={14} className="text-cyan-300" />
                <strong className="font-bold">{service.price}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* Main Content */}
          <div>
            {/* What's Included */}
            {service.highlights?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
                <SectionHeading>What's Included</SectionHeading>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                  {service.highlights.map((h: string, i: number) => (
                    <motion.div key={h} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 py-4 px-5 rounded-xl"
                      style={{ background: BRAND.white, border: `1px solid ${BRAND.slate100}`, boxShadow: "0 1px 3px rgba(6,149,205,0.05)" }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.primarySky}` }}>
                        <CheckCircle2 size={14} color={BRAND.primary} />
                      </div>
                      <span className="text-[0.86rem] font-medium" style={{ color: BRAND.darkMid }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* How It Works */}
            {service.process?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
                <SectionHeading>How It Works</SectionHeading>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
                  {service.process.map((p: any, i: number) => (
                    <motion.div key={p.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="p-6 rounded-2xl relative overflow-hidden transition-all duration-200 hover:shadow-md"
                      style={{ background: BRAND.white, border: `1px solid ${BRAND.slate100}`, boxShadow: "0 1px 3px rgba(6,149,205,0.05)" }}>
                      <div className="absolute top-3 right-4 text-[3.5rem] leading-none select-none"
                        style={{ fontFamily: "'DM Serif Display', serif", color: `${BRAND.primary}08` }}>{p.step}</div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 font-bold text-xs"
                        style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.primarySky}`, color: BRAND.primary }}>{p.step}</div>
                      <h4 className="text-base mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: BRAND.dark }}>{p.title}</h4>
                      <p className="text-[0.84rem] leading-[1.75]" style={{ color: `${BRAND.dark}70` }}>{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Services */}
            {related.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <SectionHeading>Other Services</SectionHeading>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                  {related.map((s: any, i: number) => {
                    const RelIcon = renderIcon(s.icon);
                    return (
                      <motion.div key={s.slug} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-4 py-4 px-5 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        style={{ background: BRAND.white, border: `1px solid ${BRAND.slate100}`, boxShadow: "0 1px 3px rgba(6,149,205,0.05)" }}
                        onClick={() => navigate(`/service/${s.slug}`)}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.primarySky}` }}>
                          <RelIcon size={18} color={BRAND.primary} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[0.92rem] mb-[2px]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: BRAND.dark }}>{s.title}</div>
                          <div className="text-[0.78rem]" style={{ color: `${BRAND.dark}70` }}>{s.price}</div>
                        </div>
                        <ArrowUpRight size={15} color={BRAND.primary} />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="sticky top-6 rounded-2xl p-7"
            style={{ background: BRAND.white, border: `1px solid ${BRAND.slate100}`, boxShadow: `0 4px 16px rgba(6,149,205,0.08)` }}>
            <div className="text-[2rem] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: BRAND.dark }}>{service.price}</div>
            <div className="text-[0.82rem] mb-7" style={{ color: `${BRAND.dark}70` }}>{service.duration}</div>

            {/* ✅ Book Now: uses navigate() for SPA routing + passes service slug as query param */}
            <button
              onClick={() => navigate(`/contact?service=${service.slug}`)}
              className="flex items-center justify-center gap-2 w-full p-[15px] rounded-xl font-semibold text-[0.93rem] mb-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})`,
                color: BRAND.white,
                boxShadow: `0 6px 20px ${BRAND.primary}35`,
                border: "none",
                cursor: "pointer",
              }}>
              <Calendar size={15} /> Book Now
            </button>

            <a href="tel:+919839171701"
              className="flex items-center justify-center gap-2 w-full p-[14px] rounded-xl font-medium text-[0.88rem] no-underline transition-all duration-200 hover:opacity-90"
              style={{ background: BRAND.primaryPale, color: BRAND.dark, border: `1px solid ${BRAND.slate100}` }}>
              <Phone size={14} color={BRAND.primary} /> Call Us
            </a>

            <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${BRAND.slate100}` }}>
              {[
                { icon: Shield, text: "Certified technicians" },
                { icon: Star, text: "Satisfaction guarantee" },
              ].map(({ icon: I, text }) => (
                <div key={text} className="flex items-center gap-2 mb-3 text-[0.82rem]" style={{ color: `${BRAND.dark}70` }}>
                  <I size={13} color={BRAND.primary} /> {text}
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[1.6rem] mb-7 flex items-center gap-4"
      style={{ fontFamily: "DM Serif Display", fontWeight: 400, color: BRAND.dark }}>
      {children}
      <span className="flex-1 h-px" style={{ background: BRAND.slate100 }} />
    </h2>
  );
}
