import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Trophy, Heart, IndianRupee, Star, CheckCircle2, ArrowRight, Shield, ChevronRight } from 'lucide-react';
import { useGetBrandsQuery } from '@/store/api';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { BRAND } from '@/lib/colors';
import Loader from '@/components/ui/Loader';

const renderIcon = (iconName: string): React.ReactNode => {
  const style = { color: BRAND.primary };
  switch (iconName) {
    case 'trophy': return <Trophy size={24} style={style} />;
    case 'heart': return <Heart size={24} style={style} />;
    case 'rupee': return <IndianRupee size={24} style={style} />;
    case 'star': return <Star size={24} style={style} />;
    default: return <Star size={24} style={style} />;
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function BrandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: brands = [], isLoading } = useGetBrandsQuery();
  const brand = brands.find((b: any) => b.slug === slug);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!brand) {
    return (
      <PageTransition>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: BRAND.white, fontFamily: "'Inter', sans-serif" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: BRAND.dark, marginBottom: "12px" }}>Brand not found</h2>
          <p style={{ color: BRAND.slate400, marginBottom: "24px" }}>We couldn't find details for "{slug}".</p>
          <Link to="/" style={{
            background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})`,
            color: BRAND.white, padding: "10px 24px", borderRadius: "8px",
            textDecoration: "none", fontWeight: 600
          }}>
            Go Back Home
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div style={{ width: "100%", background: BRAND.white }}>

        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
          }}
        >
          <div style={{
            position: "absolute", inset: 0, opacity: 0.07,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px", pointerEvents: "none"
          }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px", position: "relative", zIndex: 2 }}>
            <motion.div style={{ flex: "1 1 320px" }}
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: BRAND.accentOnDark, padding: "6px 16px", borderRadius: "100px",
                fontSize: "0.8rem", fontWeight: 600, marginBottom: "24px"
              }}>
                <Shield size={13} /> Authorized Dealer in Hardoi
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                color: BRAND.white, lineHeight: 1.1, marginBottom: "12px", fontWeight: 800
              }}>
                <span style={{ color: BRAND.accentOnDark }}>{brand.brandName}</span>
                <br />{brand.title}
              </h1>

              <p style={{ color: BRAND.textOnDarkMuted, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                {brand.subtitle}
              </p>
              <p style={{ color: BRAND.textOnDark, lineHeight: 1.75, maxWidth: "500px", fontWeight: 300, marginBottom: "28px" }}>
                {brand.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a href="tel:+919839171701" style={{
                  background: BRAND.white, color: BRAND.dark,
                  padding: "12px 24px", borderRadius: "10px", fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  textDecoration: "none", fontSize: "0.9rem",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
                }}>
                  <Phone size={16} /> Get {brand.brandName} Quote
                </a>
                <a href={`https://wa.me/919839171701?text=Hi, I'm interested in ${brand.brandName} products`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.1)", color: BRAND.white,
                    border: "1px solid rgba(255,255,255,0.25)",
                    padding: "12px 24px", borderRadius: "10px", fontWeight: 600,
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    textDecoration: "none", fontSize: "0.9rem"
                  }}>
                  WhatsApp Us <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            <motion.div style={{ flex: "1 1 280px" }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", inset: "-12px",
                  background: `${BRAND.primary}33`,
                  borderRadius: "20px", filter: "blur(24px)"
                }} />
                <img src={brand.heroImage} alt={brand.title}
                  style={{ width: "100%", borderRadius: "16px", boxShadow: "0 24px 60px rgba(0,0,0,0.3)", position: "relative", zIndex: 1, display: "block" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{ padding: "80px 24px", background: BRAND.white }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div style={{ textAlign: "center", marginBottom: "56px" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{
                display: "inline-block",
                background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
                color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: "100px", marginBottom: "16px"
              }}>Why Choose</div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: BRAND.dark, fontWeight: 800 }}>
                {brand.brandName} in Hardoi
              </h2>
              <div style={{ width: "48px", height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})`, borderRadius: "2px", margin: "16px auto 0" }} />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {brand.features && brand.features.map((feature: any, idx: number) => (
                <motion.div key={idx} custom={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "18px",
                    padding: "24px", background: BRAND.white,
                    border: `1px solid ${BRAND.slate100}`, borderRadius: "16px",
                    boxShadow: `0 2px 12px ${BRAND.primary}14`,
                    transition: "all 0.3s"
                  }}>
                  <div style={{ padding: "12px", borderRadius: "12px", background: BRAND.primarySky, flexShrink: 0 }}>
                    {renderIcon(feature.icon || "star")}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, color: BRAND.dark, fontSize: "1rem", marginBottom: "6px" }}>{feature.title}</h3>
                    <p style={{ color: BRAND.slate400, fontSize: "0.875rem", lineHeight: 1.6 }}>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Product Range ── */}
        <section style={{ padding: "80px 24px", background: BRAND.bgSoft }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div style={{ textAlign: "center", marginBottom: "56px" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{
                display: "inline-block",
                background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`,
                color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: "100px", marginBottom: "16px"
              }}>Our Collection</div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: BRAND.dark, fontWeight: 800 }}>
                {brand.brandName} Product Range
              </h2>
              <div style={{ width: "48px", height: "3px", background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})`, borderRadius: "2px", margin: "16px auto 0" }} />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {brand.products && brand.products.map((product: any, idx: number) => (
                <motion.div key={idx} custom={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{
                    background: BRAND.white, border: `1px solid ${BRAND.slate100}`,
                    borderRadius: "20px", overflow: "hidden",
                    boxShadow: `0 2px 16px ${BRAND.primary}14`,
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${BRAND.primary}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 16px ${BRAND.primary}14`;
                  }}>
                  <div style={{
                    height: "200px", background: BRAND.primaryPale,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "24px", position: "relative", overflow: "hidden"
                  }}>
                    <div style={{ height: "3px", position: "absolute", top: 0, left: 0, right: 0, background: `linear-gradient(90deg, ${BRAND.dark}, ${BRAND.primary})` }} />
                    <img src={product.image} alt={product.title} style={{ maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ padding: "24px", borderTop: `1px solid ${BRAND.slate100}` }}>
                    <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: BRAND.dark, marginBottom: "6px" }}>{product.title}</h3>
                    <p style={{ color: BRAND.slate400, fontSize: "0.875rem", marginBottom: "18px" }}>{product.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {Array.isArray(product.featuresList) && product.featuresList.map((item: string, fIdx: number) => (
                        <li key={fIdx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: BRAND.slate600 }}>
                          <CheckCircle2 size={15} style={{ color: BRAND.primary, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="tel:+919839171701" style={{
                      width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})`,
                      color: BRAND.white, padding: "11px", borderRadius: "10px",
                      textDecoration: "none", fontWeight: 600, fontSize: "0.875rem",
                      boxShadow: `0 4px 14px ${BRAND.primary}40`
                    }}>
                      <Phone size={14} /> Enquire Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section style={{
          background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
          padding: "80px 24px", textAlign: "center",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.08,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "28px 28px", pointerEvents: "none"
          }} />
          <motion.div style={{ maxWidth: "580px", margin: "0 auto", position: "relative", zIndex: 2 }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)", color: BRAND.white, marginBottom: "16px", fontWeight: 800 }}>
              Ready to Experience <span style={{ color: BRAND.accentOnDark }}>{brand.brandName}</span>?
            </h2>
            <p style={{ color: BRAND.textOnDark, marginBottom: "36px", fontSize: "1.05rem", fontWeight: 300 }}>
              Get the best deals on {brand.brandName} air conditioners in Hardoi with expert installation &amp; service.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
              <a href="tel:+919839171701" style={{
                background: BRAND.white, color: BRAND.dark,
                padding: "13px 28px", borderRadius: "10px", fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: "8px",
                textDecoration: "none", fontSize: "0.95rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
              }}>
                <Phone size={16} /> Call for Best Price
              </a>
              <Link to="/contact" style={{
                background: "rgba(255,255,255,0.1)", color: BRAND.white,
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "13px 28px", borderRadius: "10px", fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: "8px",
                textDecoration: "none", fontSize: "0.95rem"
              }}>
                Visit Showroom
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
