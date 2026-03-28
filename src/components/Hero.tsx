// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Phone, Eye, CheckCircle, MapPin, Clock } from "lucide-react";
// import heroImage from "@/assets/heroimage.webp";

// const badges = [
//   { icon: CheckCircle, text: "5,000+ Bookings" },
//   { icon: Clock, text: "Slots Filling Fast" },
//   { icon: MapPin, text: "Lucknow & UP" },
// ];

// export default function HeroSection() {
//   return (
//     <section className="hero-section">
//       {/* Grid overlay */}
//       <div className="hero-grid-overlay" />

//       {/* Right photo */}
//       <div className="hero-image-container">
//         <img
//           src={heroImage}
//           alt="AC service booking in Lucknow Uttar Pradesh"
//           loading="eager"
//           className="hero-image"
//         />
//         <div className="hero-image-fade" />
//       </div>

//       {/* Content */}
//       <div className="hero-content-wrapper">

//         {/* Urgency pill */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="hero-urgency-pill"
//         >
//           <span className="urgency-dot" />
// Climate Care
//         </motion.div>

//         {/* Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           className="hero-heading"
//         >
//         Your Partner for Total Climate Control{" "}
//           {/* <span className="heading-accent">
//             Limra’s Best-Selling Products
//           </span>{" "} */}
         
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="hero-subtitle"
//         >
//            Discover high-performance AC units, cooling solutions & accessories trusted across Lucknow & UP.
//           <strong style={{ color: "white" }}>
//            Fast selling items — grab yours before stock runs out.
//           </strong>{" "}
         
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="hero-cta-group"
//         >
//           <Link to="/contact" className="btn-primary">
//             <Phone size={16} fill="white" stroke="none" /> Get Free Site Inspection
//           </Link>

//           <Link to="/product" className="btn-outline">
//             <Eye size={16} /> View Our Products
//           </Link>
//         </motion.div>

//         {/* Trust badges */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.45 }}
//           className="hero-badges"
//         >
//           {badges.map((b, i) => (
//             <span key={i} className="hero-badge-item">
//               <b.icon size={13} className="badge-icon" />
//               {b.text}
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       <style>{`
//         .hero-section {
//           background: var(--bg-hero-gradient, hsl(var(--brand-dark)));
//           position: relative;
//           width: 100%;
//           min-height: calc(100vh - 80px);
//           margin-top: 80px;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//         }

//         .hero-grid-overlay {
//           position: absolute;
//           inset: 0;
//           opacity: 0.07;
//           background-image:
//             linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
//           background-size: 56px 56px;
//           pointer-events: none;
//         }

//         .hero-image-container {
//           position: absolute;
//           right: 2%;
//           top: 0;
//           width: 46%;
//           height: 100%;
//           z-index: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .hero-image {
//           width: 100%;
//           height: 85%;
//           object-fit: contain;
//           object-position: center;
//         }

//         .hero-image-fade {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(
//             to right,
//             hsl(var(--brand-dark)) 0%,
//             hsl(var(--brand-dark) / 0.7) 25%,
//             transparent 100%
//           );
//           pointer-events: none;
//         }

//         .hero-content-wrapper {
//           position: relative;
//           z-index: 10;
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 48px 24px;
//         }

//         .hero-urgency-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: hsl(var(--primary) / 0.18);
//           border: 1px solid hsl(var(--primary) / 0.5);
//           color: hsl(var(--brand-sky));
//           font-weight: 700;
//           font-size: 0.72rem;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           padding: 5px 14px;
//           border-radius: 100px;
//           margin-bottom: 18px;
//         }

//         .urgency-dot {
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: #22c55e;
//           box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
//           animation: pulse-dot 1.8s ease-in-out infinite;
//         }

//         @keyframes pulse-dot {
//           0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
//           50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
//         }

//         .hero-heading {
//           color: white;
//           margin-bottom: 16px;
//           max-width: 680px;
//           line-height: 1.2;
//         }

//         .heading-accent {
//           color: hsl(var(--brand-sky));
//         }

//         .hero-subtitle {
//           color: hsl(var(--brand-sky) / 0.75);
//           max-width: 480px;
//           margin-bottom: 28px;
//           font-size: 1rem;
//           line-height: 1.6;
//         }

//         .hero-cta-group {
//           display: flex;
//           gap: 12px;
//           margin-bottom: 28px;
//         }

//         .btn-primary {
//           background: hsl(var(--primary));
//           color: #fff;
//           font-weight: 700;
//           padding: 14px 28px;
//           border-radius: 8px;
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           text-decoration: none;
//         }

//         .btn-outline {
//           background: transparent;
//           color: #fff;
//           font-weight: 700;
//           padding: 13px 28px;
//           border-radius: 8px;
//           border: 2px solid rgba(255,255,255,0.35);
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           text-decoration: none;
//         }

//         .hero-badges {
//           display: flex;
//           gap: 20px;
//         }

//         .hero-badge-item {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           color: hsl(var(--brand-sky) / 0.65);
//           font-size: 0.83rem;
//         }

//         .badge-icon {
//           color: hsl(var(--brand-sky));
//         }
//       `}</style>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Eye, Wrench, CalendarCheck, BadgeDollarSign } from "lucide-react";
import heroBgImage from "@/assets/hero1.webp";

const features = [
  {
    icon: Wrench,
    title: "Expert Technicians",
    desc: "Certified pros delivering reliable solutions & exceptional service.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Scheduling",
    desc: "Book at your convenience — morning, evening or weekend slots.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    desc: "No hidden charges. Pay only for what you need, every time.",
  },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background image overlay */}
      <div className="hero-bg-image" />

      {/* Grid overlay */}
      <div className="hero-grid-overlay" />

      {/* Top glow */}
      <div className="hero-glow" />

      {/* Centered Content */}
      <div className="hero-content-wrapper">
        {/* Urgency pill */}
        {/* <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-urgency-pill"
        >
          <span className="urgency-dot" />
       Get Affordable AC Solutions for Home & Business
        </motion.div> */}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-heading"
        >
          Get Affordable <span className="heading-accent">AC Solutions</span>
          <br />
          <span className="heading-accent">for Home & Business</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subtitle"
        >
          Expert installation, genuine products & quick service – all in one place.
{" "}
          <strong style={{ color: "#bae6fd" }}>
          Request a free inspection and get the best quote today.
          </strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-cta-group"
        >
          <Link to="/contact" className="btn-primary">
            <Phone size={16} fill="white" stroke="none" />
           Get Free Quote
          </Link>
          <Link to="/product" className="btn-outline">
            <Eye size={16} />
            Call Now
          </Link>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="hero-divider" />

      {/* Feature Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="hero-features"
      >
        {features.map((f, i) => (
          <div key={i} className="hero-feat-item">
            <div className="feat-icon-wrap">
              <f.icon size={22} color="#38bdf8" strokeWidth={1.8} />
            </div>
            <div>
              <p className="feat-title">{f.title}</p>
              <p className="feat-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 80px);
          margin-top: 80px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a1628 0%, #0d2244 50%, #0f2a52 100%);
        }

        /* Faint AC background image */
        .hero-bg-image {
          position: absolute;
          inset: 0;
          background: url('${heroBgImage}') center / cover no-repeat;
          opacity: 0.12;
          pointer-events: none;
        }

        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 420px;
          background: radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Content — centered */
        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 24px 36px;
          max-width: 800px;
          width: 100%;
          flex: 1;
          justify-content: center;
        }

        .hero-urgency-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(56,189,248,0.12);
          border: 1px solid rgba(56,189,248,0.4);
          color: #7dd3fc;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .urgency-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
          animation: pulse-dot 1.8s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }

        .hero-heading {
          color: white;
          font-size: clamp(1.7rem, 4.2vw, 2.8rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          max-width: 720px;
        }

        .heading-accent {
          color: #38bdf8;
        }

        .hero-subtitle {
          color: rgba(186,230,253,0.75);
          font-size: 1rem;
          line-height: 1.65;
          max-width: 520px;
          margin-bottom: 32px;
        }

        .hero-cta-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: hsl(var(--primary, 210 80% 42%));
          color: #fff;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.88; }

        .btn-outline {
          background: transparent;
          color: #fff;
          font-weight: 700;
          padding: 13px 28px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.32);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.65); }

        /* Divider */
        .hero-divider {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        /* Feature strip */
        .hero-features {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          justify-content: center;
          background: rgba(5,20,50,0.55);
          backdrop-filter: blur(6px);
          padding: 28px 24px;
        }

        .hero-feat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          max-width: 360px;
          padding: 0 20px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .hero-feat-item:last-child {
          border-right: none;
        }

        .feat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(29,110,181,0.22);
          border: 1px solid rgba(56,189,248,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feat-title {
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          margin: 0 0 4px;
          white-space: nowrap;
        }

        .feat-desc {
          color: rgba(186,230,253,0.6);
          font-size: 0.8rem;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-features {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .hero-feat-item {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 0 0 20px;
            max-width: 100%;
            width: 100%;
          }
          .hero-feat-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}