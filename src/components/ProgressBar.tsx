import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 z-[9999] origin-left shadow-sm shadow-blue-400/30"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ProgressBar;
