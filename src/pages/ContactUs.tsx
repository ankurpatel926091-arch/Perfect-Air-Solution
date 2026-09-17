import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Wind,
  MapPin,
  Clock,
  CheckCircle,
  Thermometer,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { sendContactViaWhatsApp } from "@/lib/whatsapp";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceOption = { id: string; label: string; icon: React.ReactNode };
type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

// ─── Yup Validation Schema ────────────────────────────────────────────────────
const contactSchema = Yup.object({
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
    .max(100, "Email is too long")
    .test(
      "no-disposable",
      "Disposable email addresses are not allowed",
      (value) =>
        !value ||
        !/(mailinator|tempmail|10minutemail|guerrillamail)/i.test(value)
    ),

  phone: Yup.string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .trim()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .test(
      "not-repeating",
      "Phone number cannot contain all repeating digits",
      (value) => !value || !/^(\d)\1{9}$/.test(value)
    )
    .test(
      "not-sequential",
      "Sequential numbers are not allowed",
      (value) =>
        !value ||
        !["0123456789", "1234567890", "9876543210"].includes(value)
    ),

  service: Yup.string()
    .optional()
    .oneOf(
      ["AC Installation", "AC Repair", "AMC Service", "VRF", "Cold Storage"],
      "Invalid service selected"
    ),

  message: Yup.string()
    .optional()
    .trim()
    .max(500, "Message cannot exceed 500 characters")
    .test(
      "not-empty",
      "Message cannot be empty",
      (value) => !value || value.trim().length > 0
    ),
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const services: ServiceOption[] = [
  { id: "residential", label: "Residential AC", icon: <Wind size={15} /> },
  { id: "commercial", label: "Commercial HVAC", icon: <Zap size={15} /> },
  { id: "vrf", label: "VRF Systems", icon: <Thermometer size={15} /> },
  { id: "amc", label: "Service & AMC", icon: <CheckCircle size={15} /> },
  { id: "chiller", label: "Chiller Systems", icon: <Wind size={15} /> },
  { id: "other", label: "Other", icon: <MessageSquare size={15} /> },
];

// ─── Slug → Service Picker ID map ─────────────────────────────────────────────
const slugToServiceId: Record<string, string> = {
  "ac-installation": "residential",
  "ac-repair": "residential",
  "amc-service": "amc",
  "vrf": "vrf",
  "cold-storage": "chiller",
  "commercial-hvac": "commercial",
  "residential-ac": "residential",
  "pump-down-services": "residential",
  "ductable-ac": "commercial",
  "ahu-chiller": "chiller",
  "water-cooler": "other",
  "modular-ot": "other",
};

const contactDetails = [
  {
    icon: <Phone size={20} />,
    label: "Call Us",
    value: "+91 98391 71701",
    sub: "Available 24/7 Support",
    href: "tel:+919839171701",
    hoverColor: "rgba(34,197,94,0.08)",
    hoverBorder: "rgba(34,197,94,0.3)",
    iconColor: "#16a34a",
    actionLabel: "Tap to call",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "info@perfectairsolution.com",
    sub: "Reply within 24 hrs",
    href: "mailto:info@perfectairsolution.com",
    hoverColor: "rgba(59,130,246,0.08)",
    hoverBorder: "rgba(59,130,246,0.3)",
    iconColor: "#2563eb",
    actionLabel: "Tap to email",
  },
  {
    icon: <MapPin size={20} />,
    label: "Visit",
    value: "184, New Civil Lines, Hardoi",
    sub: "Serving all Over India",
    href: "https://maps.google.com/?q=184,+New+Civil+Lines,+Hardoi,+Uttar+Pradesh+241001",
    target: "_blank",
    hoverColor: "rgba(239,68,68,0.08)",
    hoverBorder: "rgba(239,68,68,0.3)",
    iconColor: "#dc2626",
    actionLabel: "Open in Maps",
    showExternal: true,
  },
  {
    icon: <Clock size={20} />,
    label: "Hours",
    value: "9:00 AM – 7:00 PM",
    sub: "Monday to Saturday",
    href: null,
    hoverColor: "rgba(124,58,237,0.08)",
    hoverBorder: "rgba(124,58,237,0.3)",
    iconColor: "#7c3aed",
    actionLabel: "Open Mon-Sat",
  },
];

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({
  id, label, type = "text", icon, value, onChange, onBlur,
  required = false, disabled = false, error, maxLength,
}: {
  id: string; label: string; type?: string; icon: React.ReactNode;
  value: string; onChange: (v: string) => void; onBlur?: () => void;
  required?: boolean; disabled?: boolean; error?: string; maxLength?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const hasError = !!error;

  return (
    <div className="relative flex flex-col gap-1">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
          style={{
            boxShadow: hasError
              ? "0 0 0 2px #ef4444, 0 0 16px 2px rgba(239,68,68,0.1)"
              : focused
                ? "0 0 0 2px hsl(var(--primary)), 0 0 20px 2px hsl(var(--primary) / 0.15)"
                : "0 0 0 1.5px hsl(var(--border))",
          }}
        />
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10"
          style={{
            color: hasError ? "#ef4444" : focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
        >
          {icon}
        </span>
        <label
          htmlFor={id}
          className="absolute left-12 z-10 pointer-events-none font-semibold transition-all duration-200"
          style={{
            ...(active
              ? {
                top: "8px",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: hasError ? "#ef4444" : "hsl(var(--primary))",
              }
              : {
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "0.875rem",
                color: "hsl(var(--muted-foreground))",
              }),
          }}
        >
          {label}
        </label>
        <input
          id={id} type={type} required={required} disabled={disabled}
          value={value} maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          className="w-full rounded-xl pl-12 pr-4 pt-6 pb-2 h-14 text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            caretColor: "hsl(var(--primary))",
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
            className="text-[11px] text-red-500 font-medium pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── TextareaField ────────────────────────────────────────────────────────────
const TextareaField = ({
  id, label, icon, value, onChange, onBlur, disabled = false, error,
}: {
  id: string; label: string; icon: React.ReactNode; value: string;
  onChange: (v: string) => void; onBlur?: () => void; disabled?: boolean; error?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
          style={{
            boxShadow: hasError
              ? "0 0 0 2px #ef4444, 0 0 16px 2px rgba(239,68,68,0.1)"
              : focused
                ? "0 0 0 2px hsl(var(--primary)), 0 0 20px 2px hsl(var(--primary) / 0.15)"
                : "0 0 0 1.5px hsl(var(--border))",
          }}
        />
        <span
          className="absolute left-4 top-5 transition-colors duration-200 z-10"
          style={{
            color: hasError ? "#ef4444" : focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
        >
          {icon}
        </span>
        <label
          htmlFor={id}
          className="absolute left-12 z-10 pointer-events-none font-semibold transition-all duration-200"
          style={{
            ...(active
              ? {
                top: "12px",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: hasError ? "#ef4444" : "hsl(var(--primary))",
              }
              : {
                top: "20px",
                fontSize: "0.875rem",
                color: "hsl(var(--muted-foreground))",
              }),
          }}
        >
          {label}
        </label>
        <textarea
          id={id} rows={4} maxLength={500} disabled={disabled} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          className="w-full rounded-xl pl-12 pr-4 pt-8 pb-4 text-sm outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            caretColor: "hsl(var(--primary))",
          }}
        />
      </div>
      <div className="flex justify-between items-center pl-1">
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
              className="text-[11px] text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <span
          className="text-[10px] ml-auto"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {value.length}/500
        </span>
      </div>
    </div>
  );
};

// ─── ServicePicker ────────────────────────────────────────────────────────────
const ServicePicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div>
    <p
      className="text-[10px] tracking-[0.14em] uppercase font-bold pl-0.5 mb-3"
      style={{ color: "hsl(var(--muted-foreground))" }}
    >
      Select Service
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {services.map((s) => {
        const sel = value === s.id;
        return (
          <button
            key={s.id} type="button" onClick={() => onChange(sel ? "" : s.id)}
            className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: sel ? "hsl(var(--brand-light))" : "hsl(var(--card))",
              border: sel
                ? "1.5px solid hsl(var(--primary))"
                : "1.5px solid hsl(var(--border))",
              color: sel ? "hsl(var(--brand-dark))" : "hsl(var(--muted-foreground))",
              boxShadow: sel ? "0 4px 12px hsl(var(--primary) / 0.12)" : "none",
            }}
          >
            <span style={{ color: sel ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}>
              {s.icon}
            </span>
            {s.label}
            {sel && (
              <motion.span
                layoutId="dot"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(var(--primary))" }}
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// ─── Success ──────────────────────────────────────────────────────────────────
const SuccessScreen = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="flex flex-col items-center justify-center text-center py-20 px-8"
  >
    <div className="relative mb-8">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "hsl(var(--brand-light))",
          border: "2px solid hsl(var(--primary) / 0.3)",
        }}
      >
        <CheckCircle size={44} style={{ color: "hsl(var(--primary))" }} />
      </motion.div>
    </div>

    <motion.h3
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      style={{ fontSize: "1.75rem", color: "hsl(var(--brand-dark))", marginBottom: "12px" }}
    >
      Message Received!
    </motion.h3>

    <motion.p
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
      className="body-text mb-10 max-w-xs"
      style={{ color: "hsl(var(--muted-foreground))" }}
    >
      Our expert team will reach out within 24 hours to discuss your HVAC requirements.
    </motion.p>

    <motion.button
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
      onClick={onReset}
      className="text-sm font-bold underline underline-offset-4 transition-colors"
      style={{ color: "hsl(var(--primary))" }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--brand-dark))")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))")}
    >
      Send another message →
    </motion.button>
  </motion.div>
);

// ─── ContactDetailItem ────────────────────────────────────────────────────────
const ContactDetailItem = ({
  detail, index,
}: {
  detail: typeof contactDetails[number];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-4 rounded-xl p-3 -mx-2 transition-all duration-300"
      style={{
        background: hovered && detail.hoverColor ? detail.hoverColor : "transparent",
        border: `1px solid ${hovered && detail.hoverBorder ? detail.hoverBorder : "transparent"}`,
        boxShadow: hovered ? "0 4px 14px -3px rgba(0,0,0,0.06)" : "none",
        cursor: detail.href ? "pointer" : "default",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 transform"
        style={{
          background: hovered && detail.hoverColor ? detail.hoverColor : "hsl(var(--brand-light))",
          border: `1px solid ${hovered && detail.hoverBorder ? detail.hoverBorder : "hsl(var(--primary) / 0.15)"}`,
          color: detail.iconColor,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {detail.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] tracking-widest uppercase font-bold mb-0.5 transition-colors duration-200"
          style={{ color: hovered ? detail.iconColor : "hsl(var(--muted-foreground))" }}
        >
          {detail.label}
        </p>
        <div className="flex items-center gap-1.5">
          <p
            className="font-bold leading-snug truncate transition-colors duration-200 text-sm sm:text-base"
            style={{
              fontFamily: "Inter",
              color: hovered ? detail.iconColor : "hsl(var(--foreground))",
            }}
          >
            {detail.value}
          </p>
          {detail.showExternal && hovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: detail.iconColor }}
            >
              <ExternalLink size={13} />
            </motion.span>
          )}
        </div>
        <p
          className="text-xs font-medium transition-colors duration-200 min-h-[18px] flex items-center gap-1 mt-0.5"
          style={{ color: hovered ? detail.iconColor : "hsl(var(--muted-foreground))" }}
        >
          {hovered && detail.actionLabel ? (
            <>
              <span>{detail.actionLabel}</span>
              <span className="transition-transform duration-200 transform translate-x-0.5">→</span>
            </>
          ) : (
            <span>{detail.sub}</span>
          )}
        </p>
      </div>
    </motion.div>
  );

  if (!detail.href) return inner;

  return (
    <a
      href={detail.href}
      target={(detail as any).target || "_self"}
      rel={(detail as any).target === "_blank" ? "noopener noreferrer" : undefined}
      className="block no-underline"
      aria-label={`${detail.label}: ${detail.value}`}
    >
      {inner}
    </a>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Read ?service=<slug> from URL and auto-select the matching service chip
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const param = searchParams.get("service");
    if (!param) return;

    const id = services.find((s) => s.id === param)
      ? param
      : slugToServiceId[param] ?? "";

    if (id) {
      setForm((prev) => ({ ...prev, service: id }));
    }
  }, [searchParams]);

  const validateField = async (field: keyof FormState, value: string) => {
    try {
      await contactSchema.validateAt(field, { ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof Yup.ValidationError)
        setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const validateAll = async (): Promise<boolean> => {
    try {
      await contactSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((e) => { if (e.path) newErrors[e.path as keyof FormState] = e.message; });
        setErrors(newErrors);
        setTouched({ name: true, email: true, phone: true, message: true });
      }
      return false;
    }
  };

  const set = (k: keyof FormState) => (v: string) => {
    let sanitized = v;
    if (k === "name") sanitized = v.replace(/[^A-Za-z\s]/g, "");
    if (k === "phone") sanitized = v.replace(/\D/g, "").slice(0, 10);
    setForm((p) => ({ ...p, [k]: sanitized }));
    if (touched[k]) validateField(k, sanitized);
  };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    validateField(field, form[field]);
  };

  const reset = () => {
    setSubmitted(false);
    setErrors({});
    setTouched({});
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const isValid = await validateAll();
    if (!isValid) return;

    setLoading(true);
    const toastId = toast.loading("Preparing your message...");
    try {
      sendContactViaWhatsApp(form);
      toast.update(toastId, { render: "✅ Opening WhatsApp with your inquiry!", type: "success", isLoading: false, autoClose: 3000 });
      reset();
      setSubmitted(true);
    } catch (err: any) {
      toast.update(toastId, { render: "❌ Failed to prepare message", type: "error", isLoading: false, autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !loading && form.name.trim() && form.email.trim() && Object.values(errors).every((e) => !e);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, hsl(var(--brand-sky) / 0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* HERO - full width */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 bg-gradient-to-r from-[#041C33] via-[#06375E] to-[#0D5F9F] text-white overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
            <span className="flex items-center gap-1.5"><MessageSquare size={13} /> GET IN TOUCH</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight"
          >
            Let's Build Your <span className="text-cyan-300">Perfect Climate</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-4"
          >
            9+ years of HVAC expertise. Tell us what you need and our engineering experts will take care of the rest.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-cyan-200 font-medium pt-3 border-t border-white/10 max-w-xl mx-auto">
            <span>✓ 24/7 Rapid Response</span>
            <span>✓ Free Technical Site Inspection</span>
            <span>✓ Guaranteed Solution</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT ── */}
          <motion.aside
            initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact details card */}
            <div
              className="rounded-2xl p-6 bg-card"
              style={{ border: "1px solid hsl(var(--border))", boxShadow: "0 10px 25px -5px hsl(var(--brand-dark) / 0.03)" }}
            >
              <h2 className="text-xl font-bold text-[#051B30] tracking-tight mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-sky-600" /> Contact Details
              </h2>
              <div className="space-y-2">
                {contactDetails.map((c, i) => (
                  <ContactDetailItem key={c.label} detail={c} index={i} />
                ))}
              </div>
            </div>

            {/* Brands card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--brand-light)) 100%)",
                border: "1px solid hsl(var(--primary) / 0.15)",
              }}
            >
              <p
                className="text-[10px] tracking-widest uppercase font-bold mb-4"
                style={{ color: "hsl(var(--primary))" }}
              >
                Authorized Dealers
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Daikin", "Blue Star", "Hitachi", "Panasonic", "Mitsubishi", "Carrier", "Midea"].map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                    style={{
                      background: "hsl(var(--card))",
                      color: "hsl(var(--brand-dark))",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="body-text text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Authorized partner for sales & service — your factory warranty is always guaranteed.
              </p>
            </div>

            {/* Trust card */}
            <div
              className="rounded-2xl p-5 bg-card space-y-3"
              style={{ border: "1px solid hsl(var(--border))" }}
            >
              {["5000+ satisfied clients across UP", "Response guaranteed within 24 hours", "Free site inspection for commercial projects"].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                  <span className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl bg-card border border-slate-200/80 shadow-xl shadow-slate-900/5"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen key="success" onReset={reset} />
              ) : (
                <motion.form
                  key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} className="p-6 sm:p-8"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#051B30] tracking-tight mb-1 flex items-center gap-2">
                      <Send className="w-5 h-5 text-sky-600" /> Send Us a Message
                    </h2>
                    <p className="text-slate-500 text-sm font-normal">
                      Describe your needs and a real expert will call you back.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="name" label="Full Name" disabled={loading} icon={<User size={16} />}
                        value={form.name} onChange={set("name")} onBlur={handleBlur("name")}
                        error={touched.name ? errors.name : undefined} required maxLength={50} />
                      <Field id="phone" disabled={loading} label="Phone Number" type="tel" icon={<Phone size={16} />}
                        value={form.phone} onChange={set("phone")} onBlur={handleBlur("phone")}
                        error={touched.phone ? errors.phone : undefined} maxLength={10} />
                    </div>
                    <Field id="email" label="Email Address" disabled={loading} type="email" icon={<Mail size={16} />}
                      value={form.email} onChange={set("email")} onBlur={handleBlur("email")}
                      error={touched.email ? errors.email : undefined} required maxLength={100} />
                    <ServicePicker value={form.service} onChange={set("service")} />
                    <TextareaField id="message" label="Describe your project…" disabled={loading} icon={<MessageSquare size={16} />}
                      value={form.message} onChange={set("message")} onBlur={handleBlur("message")}
                      error={touched.message ? errors.message : undefined} />

                    <button
                      type="submit" disabled={!canSubmit}
                      className="group relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm text-white tracking-wide overflow-hidden transition-all duration-300 mt-2"
                      style={{
                        background: canSubmit
                          ? "linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%)"
                          : "hsl(var(--muted))",
                        color: canSubmit ? "white" : "hsl(var(--muted-foreground))",
                        boxShadow: canSubmit ? "0 10px 20px -5px hsl(var(--primary) / 0.4)" : "none",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                          <span>Send Message — Free Consultation</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] pt-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Privacy First: We never share your contact details with 3rd parties.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
