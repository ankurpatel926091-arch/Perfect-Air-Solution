import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/colors";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          title="Scroll to top"
          style={{
            position: "fixed",
            bottom: "148px",
            right: "24px",
            zIndex: 999,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
            color: BRAND.white,
            border: "1.5px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 24px ${BRAND.primary}75`,
            fontFamily: "'Inter', sans-serif",
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
