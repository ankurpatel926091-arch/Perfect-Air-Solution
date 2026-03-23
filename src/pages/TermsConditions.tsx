import { motion } from "framer-motion";
import { BRAND } from "@/lib/colors";
import { FileText, ShoppingCart, Truck, AlertTriangle, Scale, Gavel, Mail } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const sections = [
  {
    icon: FileText,
    title: "General Terms",
    content: [
      "By accessing and using the LIMRA Sales & Services website, you agree to be bound by these Terms & Conditions.",
      "We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.",
      "All content on this website, including text, images, and logos, is the property of LIMRA Sales & Services and is protected by intellectual property laws.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Orders & Payments",
    content: [
      "All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order at our discretion.",
      "Prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.",
      "Payment must be completed at the time of order placement. We accept UPI, debit/credit cards, net banking, and cash on delivery for select products.",
      "Order confirmation will be sent to your registered email address and phone number.",
    ],
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    content: [
      "Delivery timelines are estimated and may vary based on product availability and your location within our service area.",
      "Installation services are provided by our certified technicians and are subject to a separate installation fee unless included in the product price.",
      "The customer is responsible for ensuring adequate space and electrical provisions for AC installation as per manufacturer guidelines.",
      "Any damage during delivery must be reported within 24 hours of receipt for resolution.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Warranties & Liability",
    content: [
      "All products sold carry the manufacturer's warranty. LIMRA Sales & Services does not provide additional warranty beyond the manufacturer's terms.",
      "We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.",
      "Service warranties cover workmanship for a period specified at the time of service completion.",
    ],
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    content: [
      "Any disputes arising from these terms shall be governed by the laws of India and subject to the jurisdiction of courts in Hardoi, Uttar Pradesh.",
      "We encourage customers to contact us directly to resolve any issues before pursuing legal remedies.",
    ],
  },
  {
    icon: Mail,
    title: "Contact",
    content: [
      "For any questions regarding these terms, contact us at info@limrasales.com or +91 98391 71701.",
      "LIMRA Sales & Services, Civil Lines, Hardoi, Uttar Pradesh 243001.",
    ],
  },
];

const TermsConditions = () => (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
            <Gavel size={16} style={{ color: BRAND.primaryLight }} />
            <span className="text-sm font-medium text-white/80">Legal Agreement</span>
          </div>
          <h1 className="heading-1 text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Please read these terms carefully before using our website or purchasing our products and services.
          </p>
          <p className="text-sm text-white/40 mt-4">Last updated: March 2026</p>
        </motion.div>
      </div>
    </section>

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

export default TermsConditions;
