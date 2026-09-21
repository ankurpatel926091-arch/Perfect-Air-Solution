import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Wind, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import perfectAirLogo from "/public/Perfect Air Logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/product" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  // { name: "Contact Us", path: "/contact" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        className={`fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl transition-colors duration-300 ${
          scrolled ? "border-b border-slate-200" : "border-b border-slate-100/80"
        }`}
      >
        {/* Top Info Strip */}
        <div className="hidden lg:block bg-[#051B30] text-slate-300 text-xs py-1.5 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <ShieldCheck size={14} /> Certified HVAC Engineers & Technicians
              </span>
              <span>•</span>
              <span>Email: <a href="mailto:info@perfectairsolution.com" className="hover:text-cyan-400 transition-colors">info@perfectairsolution.com</a></span>
            </div>
            <div className="flex items-center gap-4">
              <span>Working Hours: Mon - Sat 9:00 AM - 7:00 PM</span>
              <span>•</span>
              <a href="tel:+919839171701" className="text-cyan-400 font-bold hover:underline">
                Call: +91 98391 71701
              </a>
            </div>
          </div>
        </div>

        {/* Inner flex row */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-[64px] sm:h-[68px] md:h-[72px]">

          {/* Perfect Air Solution Brand Logo */}
          {/* Perfect Air Solution Brand Logo */}
{/* Perfect Air Solution Brand Logo */}
<Link
  to="/"
  aria-label="Perfect Air Solution – Home"
  className="flex items-center flex-shrink-0 group"
>
  <img
    src={perfectAirLogo}
    alt="Perfect Air Solution"
    className="h-20 sm:h-22 md:h-24 lg:h-26 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
  />
</Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 px-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative whitespace-nowrap rounded-md transition-all duration-200 font-semibold text-xs xl:text-sm px-2.5 py-2
                  ${isActive(link.path)
                    ? "text-[#0284C7] bg-sky-50 font-bold"
                    : "text-slate-700 hover:text-[#0284C7] hover:bg-slate-50"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate("/contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#051B30] to-[#0284C7] hover:from-[#0B2E4C] hover:to-[#0369A1] text-white font-bold rounded-md text-xs xl:text-sm px-5 py-2.5 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Contact Us</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md bg-slate-100 border-0 cursor-pointer text-[#051B30] active:bg-slate-200 transition-colors"
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden bg-white lg:hidden border-t border-b border-slate-200"
            >
              <div className="px-4 pt-3 pb-6 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-md font-semibold text-sm transition-all ${
                        isActive(link.path)
                          ? "bg-sky-50 text-[#0284C7] font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#0284C7]"
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.05, duration: 0.2 }}
                  className="mt-2 pt-2 border-t border-slate-100"
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/contact");
                    }}
                    className="w-full flex justify-center items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#051B30] to-[#0284C7] text-white font-bold text-sm rounded-md shadow-lg shadow-sky-500/20 active:opacity-90 transition-all"
                  >
                    <Phone size={16} />
                    <span>Get a Quote / Call Now</span>
                  </button>
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
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm lg:hidden"
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