import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/product" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Close menu on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Subtle shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">

          {/* Logo */}
          <Link to="/" className="header-logo" aria-label="LIMRA Sales & Services – Home">
            <img src={Logo} alt="LIMRA Sales & Services" />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link${isActive(link.path) ? " nav-link--active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="header-actions">
            <a
              href="tel:+919839171701"
              className="enquiry-btn desktop-only"
              aria-label="Call LIMRA Sales and Services"
            >
              <Phone size={17} aria-hidden="true" /> Enquiry Now
            </a>

            <button
              className="mobile-menu-btn mobile-only"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="mobile-nav"
            >
              <div className="mobile-nav-inner">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.22 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`mobile-nav-link${isActive(link.path) ? " mobile-nav-link--active" : ""}`}
                    >
                      {link.name}
                      {isActive(link.path) && <span className="active-dot" aria-hidden="true" />}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.045 + 0.05, duration: 0.22 }}
                >
                  <a
                    href="tel:+919839171701"
                    className="mobile-call-btn"
                    aria-label="Call LIMRA Sales and Services"
                  >
                    <Phone size={16} aria-hidden="true" /> Call Now
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay when mobile menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <style>{`
        /* ════════════════════════════════════════
           SITE HEADER
        ════════════════════════════════════════ */
        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid hsl(var(--border));
          transition: box-shadow 0.3s ease;
        }
        .site-header.scrolled {
          box-shadow: 0 4px 30px hsl(var(--primary) / 0.12);
        }

        /* Inner flex row */
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* Logo */
        .header-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .header-logo img {
          height: 80px;
          width: auto;
          display: block;
        }

        /* ── Desktop Nav ── */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
       .nav-link {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 0.97rem;
  padding: 7px 12px;
  border-radius: 8px;
  color: hsl(var(--brand-dark));
  text-decoration: none;
  white-space: nowrap;
  line-height: 1;
  transition: color 0.2s, background 0.2s;
}
        .nav-link:hover {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.06);
        }
        .nav-link--active {
          color: hsl(var(--primary));
          font-weight: 700;
        }

        /* ── Right actions ── */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Enquiry button */
        .enquiry-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%);
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 100px;
          text-decoration: none;
          white-space: nowrap;
          line-height: 1;
          box-shadow: 0 6px 20px hsl(var(--primary) / 0.3);
          transition: opacity 0.2s, transform 0.2s;
          font-family: Inter, sans-serif;
        }
        .enquiry-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        /* Hamburger button */
        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: hsl(var(--brand-dark));
          -webkit-tap-highlight-color: transparent;
        }

        /* ── Mobile Nav ── */
        .mobile-nav {
          overflow: hidden;
          background: rgba(255, 255, 255, 0.97);
          border-top: 1px solid hsl(var(--border));
        }
        .mobile-nav-inner {
          padding: 12px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
       .mobile-nav-link {
  font-family: Inter, sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  font-weight: 600;
  font-size: 1rem;
  color: hsl(var(--brand-dark));
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.18s, color 0.18s;
}
        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          background: hsl(var(--primary) / 0.07);
          color: hsl(var(--primary));
        }
        .mobile-nav-link--active {
          color: hsl(var(--primary));
        }
        .active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(var(--primary));
          flex-shrink: 0;
        }

        /* Mobile call CTA */
        .mobile-call-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 14px;
          background: linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--primary)) 100%);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 100px;
          text-decoration: none;
          box-shadow: 0 4px 16px hsl(var(--primary) / 0.3);
        }

        /* Backdrop */
        .menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        /* ════════════════════════════════════════
           VISIBILITY HELPERS
        ════════════════════════════════════════ */
        /* Default: mobile layout */
        .desktop-nav    { display: none !important; }
        .mobile-only    { display: flex !important; }
        .desktop-only   { display: none !important; }

        /* ── Tablet (≥ 768px): show desktop nav, hide hamburger ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .desktop-nav { display: flex !important; gap: 0; }
          .nav-link { font-size: 0.85rem; padding: 6px 8px; }
          .mobile-only { display: none !important; }
          /* Enquiry button shows on tablet too */
          .desktop-only { display: inline-flex !important; }
          .enquiry-btn { font-size: 0.85rem; padding: 10px 16px; }
          .header-logo img { height: 54px; }
        }

        /* ── Desktop (≥ 1024px): full layout ── */
        @media (min-width: 1024px) {
          .desktop-nav  { display: flex !important; }
          .mobile-only  { display: none !important; }
          .desktop-only { display: inline-flex !important; }
        }

        /* ── Small phones (≤ 360px) ── */
        @media (max-width: 360px) {
          .header-inner { padding: 0 14px; height: 68px; }
          .header-logo img { height: 52px; }
          .mobile-nav-link { font-size: 0.92rem; padding: 11px 14px; }
        }
      `}</style>
    </>
  );
};

export default SiteHeader;
