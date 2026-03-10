"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { Mail, MapPin, User } from "lucide-react";

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Wire up to Formspree or other endpoint
    // For now, simulate submission
    const form = e.currentTarget;
    try {
      const response = await fetch(form.action || "#", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch {
      // Fallback: mark as submitted for demo
      setSubmitted(true);
    }
  };

  return (
    <>
      <section className="pt-[140px] pb-[120px] lg:pt-[180px] lg:pb-[160px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — Info */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-[48px] md:text-[56px] lg:text-[64px] leading-[1.05] text-text-primary"
              >
                Get in Touch
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-lg text-text-secondary leading-relaxed"
              >
                Interested in learning more about Brightwood Energy? We&apos;d
                love to hear from you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 space-y-6"
              >
                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-olive mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-text-primary">
                      Ishan Haque
                    </p>
                    <p className="text-text-secondary text-sm">Founder</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin
                    className="w-5 h-5 text-olive mt-1"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-text-secondary">Brisbane, Australia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-olive mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-text-secondary">
                      hello@brightwoodenergy.com.au
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 p-6 bg-olive-tint rounded-lg border-l-4 border-olive"
              >
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Currently raising $5–15M AUD in development capital and
                  seeking an energy co-founder with Australian project delivery
                  experience.
                </p>
              </motion.div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <FadeIn direction="none">
                  <div className="p-12 bg-olive-tint rounded-lg text-center">
                    <div className="w-16 h-16 bg-olive rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl text-text-primary mb-3">
                      Message Sent
                    </h3>
                    <p className="text-text-secondary">
                      Thank you for your interest. We&apos;ll be in touch
                      shortly.
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/placeholder"
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white border border-divider rounded-[7px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-divider rounded-[7px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Role / Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-white border border-divider rounded-[7px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-colors"
                      placeholder="Your role and company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-white border border-divider rounded-[7px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-colors resize-none"
                      placeholder="Tell us about your interest..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-7 py-3.5 bg-olive text-white font-medium rounded-[7px] hover:bg-olive-dark transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
