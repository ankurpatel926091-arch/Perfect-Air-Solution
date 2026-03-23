import { useState } from "react";
import { Phone, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/colors";

const WhatsAppIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="white">
    <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.88 1.885 6.99L2 30l7.232-1.857A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.527a11.49 11.49 0 0 1-5.89-1.617l-.422-.25-4.294 1.103 1.136-4.16-.276-.436A11.473 11.473 0 0 1 4.527 16c0-6.33 5.146-11.473 11.476-11.473S27.473 9.67 27.473 16c0 6.33-5.146 11.527-11.47 11.527zm6.29-8.61c-.344-.172-2.04-1.006-2.356-1.12-.315-.115-.545-.172-.775.172-.23.344-.888 1.12-1.09 1.35-.2.23-.4.258-.745.086-.344-.172-1.452-.536-2.765-1.707-1.022-.912-1.713-2.04-1.913-2.385-.2-.344-.022-.53.15-.702.155-.154.344-.4.516-.602.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.775-1.87-1.062-2.56-.28-.672-.564-.58-.775-.59-.2-.01-.43-.013-.66-.013-.23 0-.602.086-.917.43-.315.344-1.204 1.177-1.204 2.87s1.233 3.33 1.405 3.56c.172.23 2.427 3.707 5.88 5.198.823.355 1.464.567 1.964.725.825.263 1.576.226 2.17.137.662-.1 2.04-.833 2.327-1.637.287-.803.287-1.492.2-1.637-.085-.143-.315-.23-.66-.4z" />
  </svg>
);

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", fontFamily: "'Inter', sans-serif" }}>
      <AnimatePresence>
        {open && (
          <>
            <motion.a key="whatsapp" initial={{ opacity: 0, y: 16, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.6 }} transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.05 }} href="https://wa.me/919839171701" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#25D366", color: BRAND.white, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(37,211,102,0.45)" }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
              <WhatsAppIcon size={24} />
            </motion.a>
            <motion.a key="call" initial={{ opacity: 0, y: 16, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.6 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} href="tel:+919839171701" aria-label="Call" style={{ width: "50px", height: "50px", borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, color: BRAND.white, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 20px ${BRAND.primary}66` }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
              <Phone size={21} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setOpen(!open)} aria-label="Contact options" animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} style={{ width: "58px", height: "58px", borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primaryLight} 100%)`, color: BRAND.white, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: open ? `0 8px 32px ${BRAND.primary}80` : `0 8px 28px ${BRAND.primary}61`, transition: "box-shadow 0.3s" }}>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }} style={{ display: "flex" }}><X size={26} /></motion.span>
          ) : (
            <motion.span key="open" initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.18 }} style={{ display: "flex" }}><MessageCircle size={26} /></motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
