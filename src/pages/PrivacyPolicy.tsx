import { motion } from "framer-motion";
import { BRAND } from "@/lib/colors";
import { Shield, Eye, Database, Lock, UserCheck, Mail } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Personal information such as name, email address, phone number, and delivery address when you place an order or contact us.",
      "Technical data including IP address, browser type, and device information collected automatically when you visit our website.",
      "Usage data such as pages visited, time spent on pages, and navigation patterns to improve our services.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "To process and fulfill your orders, including delivery and installation of HVAC products.",
      "To communicate with you regarding your orders, service appointments, and customer support inquiries.",
      "To send promotional offers, newsletters, and updates about our products and services (with your consent).",
      "To improve our website, products, and customer experience through analytics.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.",
      "All payment transactions are processed through secure, encrypted channels. We do not store credit/debit card details on our servers.",
      "Access to personal data is restricted to authorized employees who need it to perform their job functions.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal information at any time by contacting us.",
      "You can opt out of marketing communications by clicking the unsubscribe link in our emails or contacting us directly.",
      "You may request a copy of all personal data we hold about you.",
    ],
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy, please contact us at info@limrasales.com or call +91 98391 71701.",
      "LIMRA Sales & Services, Civil Lines, Bareilly, Uttar Pradesh 243001.",
    ],
  },
];

const PrivacyPolicy = () => (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
    {/* Hero */}
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
        padding: "100px 0 60px",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Shield size={16} style={{ color: BRAND.primaryLight }} />
            <span className="text-sm font-medium text-white/80">Your Privacy Matters</span>
          </div>
          <h1 className="heading-1 text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We are committed to protecting your personal information and being transparent about how we use it.
          </p>
          <p className="text-sm text-white/40 mt-4">Last updated: March 2026</p>
        </motion.div>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 px-6" style={{ background: BRAND.bgSoft }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl p-8 border"
            style={{ background: BRAND.white, borderColor: BRAND.slate100 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: BRAND.primaryPale }}>
                <s.icon size={20} style={{ color: BRAND.primary }} />
              </div>
              <h2 className="heading-2" style={{ color: BRAND.dark }}>{s.title}</h2>
            </div>
            <ul className="space-y-3">
              {s.content.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: BRAND.slate600 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BRAND.primary }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
