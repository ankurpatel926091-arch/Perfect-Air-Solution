import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { sendQuoteViaWhatsApp } from "@/lib/whatsapp";
import {
  Wind,
  Snowflake,
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
  Calendar,
  User,
  Mail,
  Phone,
  Send,
  Check,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import heroBg1 from "../assets/hero_ac_bg.jpg";
import heroBg2 from "../assets/about_ac_showcase.jpg";
import heroBg3 from "../assets/why_choose_indoor.jpg";

const heroBackgrounds = [
  {
    src: heroBg1,
    alt: "Modern HVAC Air Conditioning Interior Background",
  },
  {
    src: heroBg2,
    alt: "Premium Indoor Climate & Cooling Solutions",
  },
  {
    src: heroBg3,
    alt: "Commercial VRF & Industrial HVAC Ducting Plant",
  },
];

type BookingService =
  | "repair"
  | "installation"
  | "maintenance"
  | "ac seeling"
  | "general enquiry";

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  service: BookingService | "";
};

type BookingErrors = Partial<Record<keyof BookingForm, string>>;

const serviceOptions = [
  { value: "repair", label: "AC Repair & Servicing" },
  { value: "installation", label: "AC Installation & Piping" },
  { value: "maintenance", label: "AMC Services & Maintenance" },
  { value: "ac seeling", label: "Commercial VRF / Ductable System" },
  { value: "general enquiry", label: "General HVAC Enquiry" },
];

const bookingSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: Yup.string()
    .required("Email address is required")
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .max(100, "Email is too long"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  service: Yup.string()
    .required("Please select a service")
    .oneOf(
      ["repair", "installation", "maintenance", "ac seeling", "general enquiry"],
      "Please select a valid service"
    ),
});

const Hero = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<BookingService | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingForm, boolean>>>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length);
  };

  const validateField = async (field: keyof BookingForm, value: string) => {
    try {
      await bookingSchema.validateAt(field, {
        name,
        email,
        phone,
        service,
        [field]: value,
      });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const validateAll = async (): Promise<boolean> => {
    try {
      await bookingSchema.validate(
        { name, email, phone, service },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const nextErrors: BookingErrors = {};
        err.inner.forEach((e) => {
          if (e.path) nextErrors[e.path as keyof BookingForm] = e.message;
        });
        setErrors(nextErrors);
        setTouched({ name: true, email: true, phone: true, service: true });
      }
      return false;
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = await validateAll();
    if (!isValid) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Preparing your booking...");

    try {
      sendQuoteViaWhatsApp({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: serviceOptions.find(s => s.value === service)?.label || service,
      });

      toast.update(toastId, {
        render: "✅ Opening WhatsApp with your booking details!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setErrors({});
      setTouched({});
    } catch (error: any) {
      toast.update(toastId, {
        render: error?.message || "Booking request received! Our team will contact you shortly.",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-[#03172C] text-white">
      {/* Background Image Slider & Layered Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroBackgrounds.map((bg, idx) => (
          <div
            key={idx}
            style={{ transitionDuration: "1000ms" }}
            className={`absolute inset-0 transition-all ease-in-out ${
              idx === currentSlide ? "opacity-90 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <img
              src={bg.src}
              alt={bg.alt}
              className="w-full h-full object-cover object-[75%_25%] brightness-110 contrast-[1.05]"
            />
          </div>
        ))}

        {/* Deep Navy to Ocean Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03172C] via-[#042442]/85 to-[#0B5A96]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03172C] via-transparent to-transparent pointer-events-none" />

        {/* Ambient Cyan Light Glow Spotlights */}
        <div className="absolute top-5 right-1/4 w-[500px] h-[500px] bg-sky-400/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Copy, Highlights & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#083A63]/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-md shadow-lg shadow-cyan-950/50">
              <Wind size={15} className="text-cyan-400 animate-pulse" />
              <span>HVAC &amp; AIR CONDITIONING SOLUTIONS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-3">
              Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-100">
                Air Solution
              </span>
            </h1>

            {/* Subheading */}
            <h2 className="text-cyan-300 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 drop-shadow-sm">
              Comfort You Can Count On
            </h2>

            {/* Short Description */}
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8 drop-shadow-sm">
              Reliable HVAC solutions for homes, offices &amp; businesses.Expert installation, maintenance & complete cooling solutions.
            </p>

            {/* 4 Compact Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-xl mb-10">
              
              {/* 1. Cooling Solutions */}
              <div
                onClick={() => navigate("/services")}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#052848]/80 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-[#073660] transition-all duration-300 backdrop-blur-md group shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0091FF] to-[#00D4FF] flex items-center justify-center text-white shadow-[0_0_16px_rgba(0,180,255,0.75)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Snowflake size={18} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm">Cooling Solutions</span>
                </div>
                <ArrowRight size={16} className="text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

              {/* 2. Expert Installation */}
              <div
                onClick={() => navigate("/services")}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#052848]/80 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-[#073660] transition-all duration-300 backdrop-blur-md group shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00C9A7] to-[#00E5BC] flex items-center justify-center text-white shadow-[0_0_16px_rgba(0,210,180,0.75)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Wrench size={18} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm">Expert Installation</span>
                </div>
                <ArrowRight size={16} className="text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

              {/* 3. Trusted Service */}
              <div
                onClick={() => navigate("/services")}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#052848]/80 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-[#073660] transition-all duration-300 backdrop-blur-md group shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#903AFF] to-[#B666FF] flex items-center justify-center text-white shadow-[0_0_16px_rgba(160,85,255,0.75)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm">Trusted Service</span>
                </div>
                <ArrowRight size={16} className="text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

              {/* 4. Energy Efficient */}
              <div
                onClick={() => navigate("/services")}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#052848]/80 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-[#073660] transition-all duration-300 backdrop-blur-md group shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9F1C] to-[#FFC107] flex items-center justify-center text-white shadow-[0_0_16px_rgba(255,159,28,0.75)] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Zap size={18} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm">Energy Efficient</span>
                </div>
                <ArrowRight size={16} className="text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#009BF2] via-[#00B4FF] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-cyan-400/40 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md"
              >
                <span>Get a Quote</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Quick Service Booking Form Card (Offset from top) */}
          <div className="lg:col-span-5 w-full lg:mt-12 lg:translate-y-3">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-800 relative">
              
              {/* Card Header */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0091EE] flex-shrink-0 shadow-sm">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#051B30] leading-tight">
                    Quick Service Booking
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">
                    Fill in details and we'll get back to you instantly.
                  </p>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                {/* Full Name Input */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      const nextValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
                      setName(nextValue);
                      if (touched.name) validateField("name", nextValue);
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, name: true }));
                      validateField("name", name);
                    }}
                    disabled={isSubmitting}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Address Input */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      setEmail(nextValue);
                      if (touched.email) validateField("email", nextValue);
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, email: true }));
                      validateField("email", email);
                    }}
                    disabled={isSubmitting}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number Input */}
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 98391 71701"
                    value={phone}
                    onChange={(e) => {
                      const nextValue = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(nextValue);
                      if (touched.phone) validateField("phone", nextValue);
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, phone: true }));
                      validateField("phone", phone);
                    }}
                    disabled={isSubmitting}
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.phone}</p>
                  )}
                </div>

                {/* Service Selection Dropdown */}
                <div className="relative">
                  <Wrench size={18} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
                  <select
                    value={service}
                    onChange={(e) => {
                      const nextValue = e.target.value as BookingService | "";
                      setService(nextValue);
                      if (touched.service) validateField("service", nextValue);
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, service: true }));
                      validateField("service", service);
                    }}
                    disabled={isSubmitting}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled hidden>
                      Choose a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {touched.service && errors.service && (
                  <p className="text-red-500 text-xs mt-1 pl-1">{errors.service}</p>
                )}

                {/* Form Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0091EE] via-[#00B4FF] to-[#00D4FF] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting..." : "GET INSTANT QUOTE →"}</span>
                </button>
              </form>

              {/* Bottom Security Highlights Pill Box */}
              <div className="mt-5 p-3 rounded-xl bg-[#F0F7FF] border border-sky-100 flex items-center justify-between gap-1 text-[11px] font-semibold text-slate-600">
                <span className="flex items-center gap-1 text-[#0088FF]">
                  <Check size={14} className="text-[#0088FF]" /> 100% Secure
                </span>
                <span className="flex items-center gap-1 text-[#0088FF]">
                  <Check size={14} className="text-[#0088FF]" /> No Hidden Charges
                </span>
                <span className="flex items-center gap-1 text-[#0088FF]">
                  <Clock size={13} className="text-[#0088FF]" /> Instant Response
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Background Slider Indicator Dots & Navigation Controls */}
      <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-[#03172C]/70 backdrop-blur-md border border-cyan-400/30 shadow-xl">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-cyan-500/80 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="flex items-center gap-2">
          {heroBackgrounds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to background slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide
                  ? "w-8 bg-cyan-400 shadow-[0_0_12px_#00D4FF]"
                  : "w-2.5 bg-white/30 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-cyan-500/80 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bottom Soft Curved Transition */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[32px] sm:h-[48px] lg:h-[60px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#E6F4FA"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
