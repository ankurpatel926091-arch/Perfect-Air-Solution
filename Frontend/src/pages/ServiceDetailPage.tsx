import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench, ShieldCheck, MapPin, Settings2, Wind,
  CheckCircle2, Star, Phone, Calendar,
  Shield, Zap, ArrowUpRight, Clock, Award, ArrowRight,
  Activity, Building2
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CTASection from "@/components/CTASection";
import { sendQuoteViaWhatsApp } from "@/lib/whatsapp";
import servicesHeaderBg from "@/assets/HeaderBackgroundImg/ServicesBackground.png";
import { ServiceData, staticServices } from "@/data/staticData";

const iconMap: Record<string, React.ElementType> = { ShieldCheck, MapPin, Settings2, Wind, Wrench, Activity, Building2 };
const renderIcon = (name: string): React.ElementType => iconMap[name] ?? Wrench;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const services = staticServices;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  const service: ServiceData = (services as ServiceData[]).find(
    (s: ServiceData) =>
      s.slug === slug ||
      (slug === "ac-repair" && (s.slug === "ac-repair-service" || s.slug === "ac-repair-maintenance")) ||
      (slug === "ac-repair-maintenance" && (s.slug === "ac-repair-service" || s.slug === "ac-repair-maintenance")) ||
      (slug === "ac-repair-service" && (s.slug === "ac-repair-service" || s.slug === "ac-repair-maintenance")) ||
      (slug === "amc-service" && (s.slug === "annual-maintenance-contract" || s.slug === "amc-services")) ||
      (slug === "amc-services" && (s.slug === "annual-maintenance-contract" || s.slug === "amc-services")) ||
      (slug === "annual-maintenance-contract" && (s.slug === "annual-maintenance-contract" || s.slug === "amc-services")) ||
      (slug === "commercial-hvac" && s.slug === "commercial-hvac-solutions") ||
      (slug === "vrf-vrv-systems" && s.slug === "commercial-hvac-solutions") ||
      (slug === "copper-piping-ductwork" && (s.slug === "ventilation-solutions" || s.slug === "hvac-design-consultation"))
  ) || (services[0] as ServiceData);

  const Icon = renderIcon(service.icon);
  const related = (services as ServiceData[]).filter((s: ServiceData) => s.slug !== service.slug).slice(0, 3);

  const handleBooking = () => {
    sendQuoteViaWhatsApp({
      serviceName: service.title,
      name: "Customer",
      phone: "+91 84291 52092", 
      city: "Uttar Pradesh",
      message: `Hi, I want to book the ${service.title} (${service.price}). Please share available slots.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Top Hero Banner (Matching Site Header & All Subpages) ── */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#03172C] text-white overflow-hidden">
        {/* Background Image with Clear Visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={service.headerImage || servicesHeaderBg}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Balanced soft gradient overlay so diagnostics/technicians image is vividly visible and text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#03172C]/75 via-[#03172C]/35 to-[#03172C]/90" />
        </div>

        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mt-1.5 sm:mt-2 mb-3 backdrop-blur-md">
            <Icon size={14} className="text-cyan-300" />
            <span>{service.badge || "PERFECT AIR SERVICE"}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            {service.longDesc || service.desc}
          </motion.p>

          {/* Inline Trust & Details Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <strong className="text-white font-bold">{service.rating || 4.9}</strong> ({service.reviews || 350}+ Reviews)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-cyan-300" /> Duration: {service.duration || "Same Day"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-cyan-300" /> {service.price || "Best Market Price"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Section Container (Standardized max-w-7xl) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
          
          {/* ── LEFT COLUMN (Main Details) ── */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Service Feature Image Hero Card */}
            {service.image && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative w-full rounded-xl overflow-hidden shadow-none border border-slate-200/80 bg-slate-900 h-64 sm:h-80 md:h-[340px] lg:h-[360px]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="bg-[#0284C7] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2 inline-block shadow-sm">
                      Verified Service Package
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {service.tagline || service.title}
                    </h2>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="bg-white hover:bg-slate-100 text-[#051B30] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Instant Booking</span>
                    <ArrowRight size={15} className="text-[#0284C7]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* What's Included Section */}
            {service.highlights && service.highlights.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-none"
              >
                <div className="flex items-center gap-2.5 text-[#051B30] font-extrabold text-xl mb-6 pb-3 border-b border-slate-100">
                  <ShieldCheck size={24} className="text-[#0284C7]" />
                  <span>Key Service Deliverables &amp; Highlights</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.highlights.map((h: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-slate-800 text-sm font-bold leading-snug">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* How It Works (Process Steps) */}
            {service.process && service.process.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-none"
              >
                <div className="flex items-center gap-2.5 text-[#051B30] font-extrabold text-xl mb-6 pb-3 border-b border-slate-100">
                  <Wrench size={24} className="text-[#0284C7]" />
                  <span>Standard Operating Execution Process</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.process.map((p: { step: string; title: string; desc: string }, idx: number) => (
                    <div
                      key={idx}
                      className="relative p-5 rounded-lg bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200/80 flex flex-col justify-between hover:border-sky-300 transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-9 h-9 rounded-md bg-[#0284C7] text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                            {p.step}
                          </span>
                          <span className="text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-100 px-2.5 py-1 rounded-md">
                            Phase {idx + 1}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-[#051B30] text-base mb-2 group-hover:text-[#0284C7] transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-normal">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Services Showcase */}
            {related.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-none"
              >
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                  <h3 className="text-xl font-extrabold text-[#051B30]">
                    Other Recommended Services
                  </h3>
                  <Link
                    to="/services"
                    className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1 text-decoration-none"
                  >
                    <span>View All Services</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r: ServiceData) => {
                    const RelIcon = renderIcon(r.icon);
                    return (
                      <div
                        key={r.slug}
                        onClick={() => navigate(`/service/${r.slug}`)}
                        className="p-4 rounded-lg border border-slate-200/80 hover:border-sky-300 bg-slate-50 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center mb-3 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                            <RelIcon size={20} />
                          </div>
                          <h4 className="font-bold text-[#051B30] text-sm mb-1 line-clamp-1 group-hover:text-[#0284C7] transition-colors">
                            {r.title}
                          </h4>
                          <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                            {r.desc}
                          </p>
                        </div>
                        <div className="text-xs font-extrabold text-[#0284C7] flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <span>{r.price}</span>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </div>

          {/* ── RIGHT COLUMN (Sticky Booking Card) ── */}
          <div className="lg:col-span-4 sticky top-36 sm:top-40 self-start">
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

              <span className="inline-block bg-sky-100 text-[#0284C7] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-3">
                Transparent Pricing
              </span>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-[#051B30]">
                  {service.price}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 mb-6">
                Estimated duration: {service.duration || "2 Hours"}
              </p>

              {/* Booking Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold text-sm py-3.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Calendar size={18} />
                  <span>Book Service Now</span>
                </button>

                <a
                  href="tel:+918429152092"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-[#051B30] font-bold text-sm py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-all text-decoration-none"
                >
                  <Phone size={16} className="text-[#0284C7]" />
                  <span>Call +91 84291 52092</span>
                </a>
              </div>

              {/* Trust Features */}
              <div className="pt-5 border-t border-slate-100 space-y-3 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#0284C7] flex-shrink-0" />
                  <span>100% Certified OEM Technicians</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award size={16} className="text-[#0284C7] flex-shrink-0" />
                  <span>Satisfaction &amp; Workmanship Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Zap size={16} className="text-[#0284C7] flex-shrink-0" />
                  <span>Nitrogen Leak Check &amp; CFM Audit</span>
                </div>
              </div>

              {/* Free Inspection Callout */}
              <div className="mt-6 p-4 rounded-lg bg-sky-50/80 border border-sky-100 text-center">
                <p className="text-xs font-bold text-[#051B30] mb-1">
                  Need a Custom Commercial BOQ?
                </p>
                <p className="text-[11px] text-slate-600">
                  Our HVAC engineers provide free site inspection for corporate &amp; factory projects across UP.
                </p>
              </div>
            </motion.aside>
          </div>

        </div>
      </div>

      {/* Bottom CTA Banner */}
      <CTASection />
    </div>
  );
}
