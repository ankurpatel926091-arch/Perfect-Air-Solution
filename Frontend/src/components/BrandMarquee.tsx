import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/colors";
import { getActiveBrands } from "@/api/brand.api";

function BrandCard({ brand }: { brand: any }) {
  const [imgError, setImgError] = useState(false);

  const logoSrc = brand?.logo?.url || brand?.heroImage || brand?.image || null;

  const brandName = brand?.name || brand?.brandName || "Brand";

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        flexShrink: 0,
        width: "180px",
        background: BRAND.white,
        border: `1px solid ${BRAND.slate100}`,
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "center",
        padding: "14px 12px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(2, 132, 199, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Brand Logo */}
      <div
        style={{
          height: "64px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logoSrc && !imgError ? (
          <img
            src={logoSrc}
            alt={brandName}
            onError={() => setImgError(true)}
            style={{
              maxHeight: "56px",
              maxWidth: "90%",
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.1rem",
              color: BRAND.dark,
              letterSpacing: "0.05em",
            }}
          >
            {brandName}
          </div>
        )}
      </div>

      {/* Brand Name */}
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#0284C7",
          marginTop: "4px",
        }}
      >
        {brandName}
      </span>
    </motion.div>
  );
}

const BrandMarquee = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent duplicate API request in React StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchActiveBrands = async () => {
      try {
        setIsLoading(true);

        const response = await getActiveBrands();

        console.log("Active Brands API Response:", response);

        const activeBrands = Array.isArray(response?.data) ? response.data : [];

        setBrands(activeBrands);
      } catch (error) {
        console.error("Failed to fetch active brands:", error);
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveBrands();
  }, []);

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <section
        className="section-padding py-16"
        style={{
          background: BRAND.white,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "36px",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: `${BRAND.primary}1A`,
                border: `1px solid ${BRAND.primary}40`,
                color: BRAND.primary,
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: "100px",
                marginBottom: "14px",
              }}
            >
              TRUSTED BRANDS
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight">
              We Work With The Best
            </h2>
          </div>

          <div
            style={{
              minHeight: "140px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#64748B",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Loading brands...
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     NO BRANDS
  ========================= */

  if (brands.length === 0) {
    return null;
  }

  return (
    <section
      className="section-padding py-16"
      style={{
        background: BRAND.white,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* =========================
            SECTION HEADING
        ========================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "36px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: `${BRAND.primary}1A`,
              border: `1px solid ${BRAND.primary}40`,
              color: BRAND.primary,
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "100px",
              marginBottom: "14px",
            }}
          >
            TRUSTED BRANDS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051B30] tracking-tight leading-tight font-sans">
            We Work With The Best
          </h2>
        </div>

        {/* =========================
            LEFT FADE
        ========================= */}

        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            zIndex: 10,
            left: 0,
            top: 0,
            bottom: 0,
            width: "96px",
            background: "linear-gradient(to right, #ffffff, transparent)",
          }}
        />

        {/* =========================
            RIGHT FADE
        ========================= */}

        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            zIndex: 10,
            right: 0,
            top: 0,
            bottom: 0,
            width: "96px",
            background: "linear-gradient(to left, #ffffff, transparent)",
          }}
        />

        {/* =========================
            MARQUEE
        ========================= */}

        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            className="brand-marquee-track"
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {[...brands, ...brands].map((brand: any, index: number) => (
              <BrandCard
                key={`${brand?._id || brand?.id}-${index}`}
                brand={brand}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =========================
          MARQUEE CSS
      ========================= */}

      <style>
        {`
    .brand-marquee-track {
      display: flex;
      gap: 20px;
      width: max-content;
      animation: brandMarquee 20s linear infinite;
      will-change: transform;
    }

    @keyframes brandMarquee {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(-50%);
      }
    }

    @media (max-width: 768px) {
      .brand-marquee-track {
        gap: 14px;
        animation-duration: 20s;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .brand-marquee-track {
        animation: none;
      }
    }
  `}
      </style>
    </section>
  );
};

export default BrandMarquee;
