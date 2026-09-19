import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

export interface BreadcrumbProps {
  customTitle?: string;
  variant?: "dark" | "light";
  className?: string;
}

const ROUTE_MAP: Record<string, { label: string; parentPath?: string }> = {
  about: { label: "About Us" },
  services: { label: "Services" },
  service: { label: "Services", parentPath: "/services" },
  product: { label: "Products", parentPath: "/products" },
  products: { label: "Products" },
  "case-studies": { label: "Projects" },
  gallery: { label: "Gallery" },
  contact: { label: "Contact Us" },
  blog: { label: "Blog" },
  shop: { label: "Shop" },
  checkout: { label: "Checkout" },
  "order-success": { label: "Order Success" },
  brands: { label: "Brands" },
  brand: { label: "Brands", parentPath: "/brands" },
  "hvac-applications": { label: "HVAC Applications" },
  "privacy-policy": { label: "Privacy Policy" },
  "terms-conditions": { label: "Terms & Conditions" },
  "refund-policy": { label: "Refund Policy" },
  login: { label: "Login" },
  register: { label: "Register" },
};

function formatSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  customTitle,
  variant = "dark",
  className = "",
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Do not render breadcrumbs on Home page
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  interface Item {
    label: string;
    path?: string;
    isCurrent?: boolean;
  }

  const items: Item[] = [{ label: "Home", path: "/" }];

  if (segments.length === 1) {
    const key = segments[0].toLowerCase();
    const label = customTitle || ROUTE_MAP[key]?.label || formatSlug(segments[0]);
    items.push({ label, isCurrent: true });
  } else if (segments.length >= 2) {
    const firstKey = segments[0].toLowerCase();
    const parentLabel = ROUTE_MAP[firstKey]?.label || formatSlug(segments[0]);
    const parentPath = ROUTE_MAP[firstKey]?.parentPath || `/${segments[0]}`;

    items.push({ label: parentLabel, path: parentPath });

    const currentLabel = customTitle || formatSlug(segments[1]);
    items.push({ label: currentLabel, isCurrent: true });
  }

  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`inline-flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium ${className}`}
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className={`shrink-0 ${
                    isDark ? "text-slate-400/80" : "text-slate-400"
                  }`}
                />
              )}

              {item.isCurrent || isLast || !item.path ? (
                <span
                  className={`font-semibold truncate max-w-[200px] sm:max-w-[320px] md:max-w-none ${
                    isDark
                      ? "text-cyan-300 drop-shadow-sm"
                      : "text-[#0284C7] font-bold"
                  }`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    isDark
                      ? "text-slate-200 hover:text-cyan-300"
                      : "text-slate-600 hover:text-[#0284C7]"
                  }`}
                >
                  {index === 0 && <Home size={14} className="shrink-0 mb-0.5" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
