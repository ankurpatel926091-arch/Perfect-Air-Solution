import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { sendQuoteViaWhatsApp } from "@/lib/whatsapp";
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Snowflake, 
  Calendar, 
  Play, 
  Star, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Wrench, 
  Send,
  Check
} from "lucide-react";
import heroBg from "../assets/hero_ac_bg.jpg";

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

const bookingSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .matches(/^(?!.*\s{2,})/, "Name cannot contain multiple consecutive spaces")
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
    } catch (error: any) {
      toast.update(toastId, {
        render: error?.message || "Booking request received! Our team will contact you shortly.",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setErrors({});
      setTouched({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden min-h-[88vh] flex items-center bg-[#041F38]">
      {/* Background Image with Darker Navy Blue on Left transitioning to Rich Ocean Blue on Right */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Professional HVAC Air Conditioning Cooling Interior"
          className="w-full h-full object-cover object-center opacity-88 transform scale-100"
        />
        {/* Darker Left Gradient Overlay for enhanced contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041C33] via-[#06375E]/90 to-[#0D5F9F]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041C33]/95 via-transparent to-[#052847]/40" />
        
        {/* Soft Ambient Radial Light Glow behind AC / Center-Right */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-400/25 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#094775]/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md shadow-sm">
              <Zap size={14} className="text-cyan-400 fill-cyan-400 animate-pulse" />
              <span>TRUSTED AC &amp; REFRIGERATION EXPERTS</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Complete HVAC &amp; Air Conditioning Solutions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200">
                Powered by Technology
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg font-medium mb-6">
              Perfect Air Solution – <span className="text-cyan-300 font-bold">get instant AC service today</span>
            </p>

            {/* 4 Feature Points Grid (Photo 1 Reference Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 w-full mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#084572]/90 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-sm">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">Real-time Booking</h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 font-light">Book service in just a few clicks</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#084572]/90 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-sm">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">Same-day Service</h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 font-light">Fast &amp; reliable support</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#084572]/90 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-sm">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">Certified Technicians</h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 font-light">Skilled &amp; verified professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#084572]/90 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-sm">
                  <Snowflake size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">Hassle-free Cooling Solutions</h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5 font-light">For home &amp; business</p>
                </div>
              </div>
            </div>

            {/* Action Buttons (Photo 1 Reference) */}
            <div className="flex flex-wrap items-center gap-4 w-full mb-6">
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#009BF2] to-[#00D4FF] hover:from-sky-500 hover:to-cyan-300 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar size={18} />
                <span>Book Service Instantly →</span>
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <Play size={16} className="fill-white" />
                <span>Get Instant Quote</span>
              </button>
            </div>

            {/* Stats Bar (Photo 1 Reference) */}
            <div className="w-full bg-[#083E6A]/80 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-3.5 grid grid-cols-3 gap-2 text-center divide-x divide-white/15 shadow-md">
              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs sm:text-sm">
                  <Star size={15} className="fill-cyan-400 text-cyan-400" />
                  <span>4.8 Rating</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-0.5">Customer Satisfaction</span>
              </div>

              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs sm:text-sm">
                  <FileText size={15} className="text-cyan-400" />
                  <span>10,000+ Services</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-0.5">Successfully Completed</span>
              </div>

              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs sm:text-sm">
                  <Zap size={15} className="fill-cyan-400 text-cyan-400" />
                  <span>30 Min Response</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-0.5">Quick Support</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — QUICK SERVICE BOOKING FORM */}
          <div className="lg:col-span-5 w-full lg:mt-7 lg:translate-y-2">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-800 relative">
              
              {/* Card Title */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0091EE] flex-shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#051B30] leading-tight">
                    Quick Service Booking
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill in details and we'll get back to you instantly.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                {/* Full Name */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-slate-400" />
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
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
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
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-3.5 text-slate-400" />
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
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all"
                    required
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.phone}</p>
                  )}
                </div>

                {/* Select Service */}
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
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0091EE] focus:bg-white transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled hidden>
                      Choose a service
                    </option>
                    <option value="repair">AC Repair &amp; Servicing</option>
                    <option value="installation">AC Installation &amp; Piping</option>
                    <option value="maintenance">AMC Services &amp; Maintenance</option>
                    <option value="ac seeling">Commercial VRF / Ductable System</option>
                    <option value="general enquiry">General HVAC Enquiry</option>
                  </select>
                </div>
                {touched.service && errors.service && (
                  <p className="text-red-500 text-xs mt-1 pl-1">{errors.service}</p>
                )}

                {/* Submit Button (Photo 1 Reference) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0091EE] via-[#00B4FF] to-[#00D4FF] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-2"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting..." : "Get Instant Quote →"}</span>
                </button>
              </form>

              {/* Form Bottom Features Box (Photo 1 Reference) */}
              <div className="mt-5 p-3 rounded-2xl bg-[#F0F7FF] border border-sky-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-600">
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

      {/* Bottom Curved Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[35px] sm:h-[50px] lg:h-[65px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
