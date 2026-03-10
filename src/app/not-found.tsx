"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-[80dvh] flex items-center justify-center">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-[80px] md:text-[120px] text-olive/20 leading-none">
            404
          </p>
          <h1 className="font-serif text-[36px] md:text-[44px] text-text-primary mt-4">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center mt-8 px-7 py-3.5 bg-olive text-white font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-md"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
