"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/opportunity", label: "The Opportunity" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll(); // set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Always show bg on non-home pages
  const isHome = pathname === "/";
  const showBg = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showBg
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_#E8E5E1]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] sm:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="font-serif text-[22px] text-olive tracking-tight group-hover:text-olive-dark transition-colors duration-200">
                Brightwood
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[15px] transition-colors duration-200 py-1 ${
                    pathname === link.href
                      ? "text-olive font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-olive rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-olive text-white text-[14px] font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-md"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-text-primary hover:text-olive transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-text-primary/20 backdrop-blur-sm"
              onClick={closeMobile}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-cream shadow-2xl pt-[60px] sm:pt-[72px]"
            >
              <div className="flex flex-col px-6 py-8 gap-1 h-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={`block py-3.5 text-lg border-b border-divider ${
                        pathname === link.href
                          ? "text-olive font-medium"
                          : "text-text-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6"
                >
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="inline-flex items-center px-6 py-3 bg-olive text-white text-base font-medium rounded-lg hover:bg-olive-dark transition-colors"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
