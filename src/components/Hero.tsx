import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./Hero.css";

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
      [
        "repair",
        "installation",
        "maintenance",
        "ac seeling",
        "general enquiry",
      ],
      "Please select a valid service",
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
  const [touched, setTouched] = useState<
    Partial<Record<keyof BookingForm, boolean>>
  >({});

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
        { abortEarly: false },
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
    const toastId = toast.loading("Submitting booking...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            service,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit booking.");
      }

      toast.update(toastId, {
        render: "Booking submitted successfully.",
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
        render: error?.message || "Server error. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT SECTION */}
        <div className="hero-left">
          {/* Using your global .heading-1 class logic via CSS */}
          <h1 className="hero-title">
            <span className="title-line1">Smart AC Sales &amp; Services</span>
            <br />
            <span className="title-nowrap">Powered by Technology</span>
          </h1>

          <p className="subtitle">
            Don't wait in heat – <span>get instant AC service today</span>
          </p>

          <p className="description">
            <span className="description-line-nowrap">
              Real-time booking | Same-day service | Certified technicians
            </span>
            <span className="description-line-secondary">
              Experience fast, reliable & hassle-free cooling solutions
            </span>
          </p>

          <div className="buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/services")}
              type="button"
            >
              Book Service Instantly
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/contact")}
              type="button"
            >
              Get Instant Quote
            </button>
          </div>

          <a href="tel:+919839171701" className="expert-link">
            Talk to Expert Now &rarr;
          </a>

          <div className="stats-bar">
            <div className="stat-item">
              <svg
                className="stat-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              4.8 Rating
            </div>
            <div className="divider"></div>
            <div className="stat-item">
              <svg
                className="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              10,000+ Services
            </div>
            <div className="divider"></div>
            <div className="stat-item">
              <svg
                className="stat-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              30 Min Response
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <div className="hero-form-wrapper">
          <div className="hero-form">
            <h2 className="form-title">
              <svg
                className="form-title-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Quick Service Booking
            </h2>

            <form onSubmit={handleBookingSubmit}>
              <input
                type="text"
                placeholder="Full Name"
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
                required
              />
              {touched.name && errors.name && (
                <p className="hero-field-error">{errors.name}</p>
              )}
              <input
                type="email"
                placeholder="Email Address"
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
                required
              />
              {touched.email && errors.email && (
                <p className="hero-field-error">{errors.email}</p>
              )}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const nextValue = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setPhone(nextValue);
                  if (touched.phone) validateField("phone", nextValue);
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, phone: true }));
                  validateField("phone", phone);
                }}
                disabled={isSubmitting}
                required
                maxLength={10}
              />
              {touched.phone && errors.phone && (
                <p className="hero-field-error">{errors.phone}</p>
              )}

              <div className="select-wrapper">
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
                  required
                >
                  <option value="" disabled hidden>
                    Select Service
                  </option>
                  <option value="repair">AC Repair</option>
                  <option value="installation">AC Installation</option>
                  <option value="maintenance">AC Maintenance</option>
                  <option value="ac seeling">AC Seeling</option>
                  <option value="general enquiry">General Enquiry</option>
                </select>
              </div>
              {touched.service && errors.service && (
                <p className="hero-field-error">{errors.service}</p>
              )}

              <button
                type="submit"
                className="quote-btn"
                disabled={isSubmitting}
              >
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 2c-5.62 0-9.25 4.35-10.3 8.35a6.52 6.52 0 0 0-.17 2.08l1.37 1.37 4.1-4.11a1 1 0 0 1 1.42 1.42l-4.11 4.1 1.37 1.37c.68-.04 1.38-.1 2.08-.17 4-1.05 8.35-4.68 8.35-10.3V2h-4.11zm1.2 5.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM2 22l4.82-3.18a9.48 9.48 0 0 0 2.36-2.36L2 22z" />
                </svg>
                {isSubmitting ? "SUBMITTING..." : "GET INSTANT QUOTE"}
              </button>
            </form>

            <div className="form-features">
              {/* First Line */}
              <div className="features-row">
                <p>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  100% Secure
                </p>
                <p>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  No Hidden Charges
                </p>
              </div>

              {/* Second Line */}
              <div className="features-row">
                <p>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Instant Response
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
