import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo4.png";

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : "shadow-none"
        }`}
      >
        {/* ── Inner flex row ── */}
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between gap-3 px-4 sm:px-5 md:px-6 lg:px-8 h-[60px] sm:h-[64px] md:h-[68px] lg:h-[72px]">

          {/* Logo */}
          <Link
            to="/"
            aria-label="LIMRA Sales & Services – Home"
            className="flex items-center flex-shrink-0"
          >
            <img
              src={Logo}
              alt="LIMRA Sales & Services"
              className="h-[36px] sm:h-[40px] md:h-[44px] lg:h-[48px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav — md and above */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center justify-center flex-1 gap-0.5 xl:gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative whitespace-nowrap rounded-lg leading-none transition-all duration-200 font-medium
                  text-[0.72rem] px-2 py-1.5
                  lg:text-[0.82rem] lg:px-2.5 lg:py-[7px]
                  xl:text-[0.875rem] xl:px-3
                  ${isActive(link.path)
                    ? "text-[hsl(var(--primary))] font-bold"
                    : "text-[hsl(var(--brand-dark))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.07)]"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Enquiry button — md and above */}
            <a
              href="tel:+919839171701"
              aria-label="Call LIMRA Sales and Services"
              className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-br from-[hsl(var(--brand-dark))] to-[hsl(var(--primary))] text-white font-bold rounded-full shadow-lg shadow-[hsl(var(--primary)/0.25)] hover:opacity-90 hover:-translate-y-px transition-all duration-200 whitespace-nowrap no-underline
                text-[0.72rem] px-3 py-2
                lg:text-[0.82rem] lg:px-4 lg:py-2.5
                xl:text-[0.875rem] xl:px-5"
            >
              <Phone size={13} className="lg:w-[15px] lg:h-[15px]" aria-hidden="true" />
              Enquiry Now
            </a>

            {/* Hamburger — below md */}
            <button
              className="md:hidden flex items-center justify-center w-[42px] h-[42px] rounded-lg bg-transparent border-0 cursor-pointer text-[hsl(var(--brand-dark))] active:bg-[hsl(var(--primary)/0.08)] transition-colors"
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
                  className="flex"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden bg-white md:hidden"
            >
              <div className="px-4 pt-2 pb-4 flex flex-col gap-1">
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
                      className={`flex items-center justify-between px-3.5 py-3 rounded-[10px] font-semibold text-[0.95rem] transition-all duration-200 no-underline ${
                        isActive(link.path)
                          ? "text-[hsl(var(--primary))]"
                          : "text-[hsl(var(--brand-dark))] hover:bg-[hsl(var(--primary)/0.07)] hover:text-[hsl(var(--primary))]"
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] flex-shrink-0"
                        />
                      )}
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
                    aria-label="Call LIMRA Sales and Services"
                    className="mt-2 flex justify-center items-center gap-2 px-4 py-3 bg-gradient-to-br from-[hsl(var(--brand-dark))] to-[hsl(var(--primary))] text-white font-bold text-[0.95rem] rounded-full shadow-lg shadow-[hsl(var(--primary)/0.28)] active:opacity-85 active:scale-[0.98] transition-all no-underline"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Call Now
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/35 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;