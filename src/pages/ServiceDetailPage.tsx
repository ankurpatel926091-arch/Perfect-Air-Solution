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
      <div className="flex items-center justify-center min-h-screen" style={{ background: BRAND.bgSoft }}>
        <p style={{ color: `${BRAND.dark}70`, fontFamily: "'DM Sans', sans-serif" }}>Service not found.</p>
      </div>
    );
  }

  const Icon = renderIcon(service.icon);
  const related = services.filter((s: any) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: BRAND.bgSoft, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
        padding: "72px 0 56px",
      }}>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full py-[5px] px-4 text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-5 mt-5"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: BRAND.accentOnDark }}>
              <Icon size={12} /> {service.badge || "Service"}
            </div>

            <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] tracking-tight mb-3"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: BRAND.white }}>
              {service.title}
            </h1>
            <p className="text-[1rem] font-medium uppercase tracking-[0.06em] mb-5" style={{ color: BRAND.accentOnDark }}>{service.tagline}</p>
            <p className="text-[0.95rem] leading-[1.8] max-w-[560px] mb-7" style={{ color: BRAND.textOnDark }}>{service.longDesc}</p>

            <div className="flex flex-wrap gap-5 items-center">
              <div className="flex items-center gap-2 text-[0.85rem]" style={{ color: BRAND.textOnDark }}>
                <Star size={15} color="#d97706" fill="#d97706" />
                <strong style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{service.rating}</strong>
                <span style={{ color: BRAND.textOnDarkMuted }}>({service.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-[0.85rem]" style={{ color: BRAND.textOnDarkMuted }}>
                <Clock size={14} color={BRAND.accentOnDark} /> {service.duration}
              </div>
              <div className="flex items-center gap-2 text-[0.85rem]" style={{ color: BRAND.textOnDark }}>
                <Zap size={14} color={BRAND.accentOnDark} />
                <strong style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{service.price}</strong>
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
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.primarySky}`, color: BRAND.primary, fontSize: "0.7rem", fontWeight: 700 }}>{p.step}</div>
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
