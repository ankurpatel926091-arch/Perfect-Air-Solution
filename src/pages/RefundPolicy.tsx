import { motion } from "framer-motion";
import { BRAND } from "@/lib/colors";
import { RotateCcw, CheckCircle, XCircle, Clock, CreditCard, Mail, HelpCircle } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const sections = [
  {
    icon: CheckCircle,
    title: "Eligible for Refund",
    content: [
      "Products that are defective or damaged upon delivery — report within 24 hours of receipt with photographic evidence.",
      "Wrong product delivered — we will arrange a replacement or full refund at no additional cost.",
      "Cancellation of order before dispatch — full refund will be processed within 5–7 business days.",
      "Service not rendered as agreed — partial or full refund based on the scope of incomplete work.",
    ],
  },
  {
    icon: XCircle,
    title: "Not Eligible for Refund",
    content: [
      "Products that have been installed and used, unless they are defective due to manufacturing faults covered under warranty.",
      "Damage caused by improper use, unauthorized repairs, or failure to follow installation guidelines.",
      "Change of mind after product installation has been completed.",
      "Consumable items such as filters, gas refills, and cleaning supplies once opened or used.",
    ],
  },
  {
    icon: Clock,
    title: "Refund Timeline",
    content: [
      "Refund requests must be initiated within 7 days of product delivery or service completion.",
      "Once approved, refunds are processed within 5–7 business days to the original payment method.",
      "For Cash on Delivery orders, refunds will be processed via bank transfer. You will need to provide your bank account details.",
      "You will receive email and SMS notifications at each stage of the refund process.",
    ],
  },
  {
    icon: RotateCcw,
    title: "Exchange Policy",
    content: [
      "We offer product exchanges for items of equal or higher value within 7 days of delivery.",
      "The product must be in its original packaging and unused condition for exchange eligibility.",
      "Exchange requests are subject to product availability. If the replacement is unavailable, a refund will be issued.",
    ],
  },
  {
    icon: CreditCard,
    title: "Refund Process",
    content: [
      "Contact our customer support team via email (info@perfectairsolution.com) or phone (+91 98391 71701) to initiate a refund request.",
      "Provide your order number, reason for refund, and any supporting images if applicable.",
      "Our team will review your request and respond within 48 hours with the resolution.",
      "Approved refunds will be credited back to the original payment method used during purchase.",
    ],
  },
  {
    icon: Mail,
    title: "Need Help?",
    content: [
      "For any refund-related queries, reach out to us at info@perfectairsolution.com or call +91 98391 71701.",
      "Our customer support team is available Monday to Saturday, 9:00 AM – 7:00 PM.",
      "Perfect Air Solution, Civil Lines, Uttar Pradesh 241001.",
    ],
  },
];

const RefundPolicy = () => (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <section
      className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 text-white"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkMid} 50%, ${BRAND.primary} 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <HelpCircle size={16} style={{ color: BRAND.primaryLight }} />
            <span className="text-sm font-medium text-white/80">Customer Assurance</span>
          </div>
          <h1 className="heading-1 text-white mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Your satisfaction is our priority. Learn about our hassle-free refund and exchange process.
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
            className="rounded-md p-8 border"
            style={{ background: BRAND.white, borderColor: BRAND.slate100 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: BRAND.primaryPale }}>
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

export default RefundPolicy;
