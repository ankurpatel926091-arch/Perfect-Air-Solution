import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BRAND } from "@/lib/colors";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const email = formEl.email.value.trim();
    if (!email) { toast.error("Email is required"); return; }
    if (!validateEmail(email)) { toast.error("Please enter a valid email"); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success("Subscribed successfully 🎉");
      formEl.reset();
      setLoading(false);
    }, 400);
  };

  return (
    <section style={{ padding: "64px 24px", background: BRAND.white, borderTop: `1px solid ${BRAND.slate100}`, borderBottom: `1px solid ${BRAND.slate100}`, fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", background: `${BRAND.primarySky}80`, borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "320px", height: "320px", background: `${BRAND.primarySky}59`, borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}
      >
        <div style={{ display: "inline-block", background: `${BRAND.primary}1A`, border: `1px solid ${BRAND.primary}40`, color: BRAND.primary, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "20px" }}>
          Newsletter
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight font-sans mb-3">
          Stay Updated with Latest HVAC Trends
        </h2>
        <p style={{ color: BRAND.slate400, fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "24px", fontWeight: 400 }}>
          Subscribe for industry insights, product updates, maintenance tips, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          <input
            name="email" type="email" placeholder="Enter your email address" required
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{
              flex: "1 1 240px", padding: "13px 20px", borderRadius: "10px",
              border: `1.5px solid ${focused ? BRAND.primary : BRAND.slate200}`,
              background: BRAND.bgSoft, color: BRAND.dark, fontSize: "0.95rem",
              outline: "none", fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s",
            }}
          />
          <button type="submit" disabled={loading} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "13px 28px",
            background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
            color: BRAND.white, fontWeight: 700, fontSize: "0.95rem",
            borderRadius: "10px", border: "none", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.65 : 1,
            boxShadow: `0 8px 20px ${BRAND.primary}47`,
            whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif", transition: "opacity 0.2s"
          }}>
            <span>{loading ? "Subscribing..." : "Subscribe"}</span> <Send size={17} />
          </button>
        </form>

        <p style={{ marginTop: "16px", fontSize: "0.78rem", color: BRAND.slate400, fontWeight: 500 }}>
          No spam, ever. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
