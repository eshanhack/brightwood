"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left hidden md:block pointer-events-none"
      style={{ opacity }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-olive-light to-olive rounded-r-full"
        style={{ width }}
      />
    </motion.div>
  );
}
