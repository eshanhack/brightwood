"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { Mail, MapPin, User, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const inputClasses =
  "w-full px-4 py-3 bg-white border border-divider rounded-lg text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all duration-200";

export default function ContactContent() {
  const [formState, setFormState] = useState<FormState>("idle");
  const isLoading = formState === "loading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    const form = e.currentTarget;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setFormState(response.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section className="pt-[140px] pb-[120px] lg:pt-[180px] lg:pb-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] text-text-primary"
            >
              Get in Touch
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-text-secondary leading-[1.7]"
            >
              Interested in learning more about Brightwood Energy? We&apos;d
              love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-olive-tint rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-olive" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Ishan Haque</p>
                  <p className="text-text-muted text-sm">Founder</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-olive-tint rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-olive" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-text-secondary">Brisbane, Australia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-olive-tint rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-olive" strokeWidth={1.5} />
                </div>
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
              <p className="text-text-secondary leading-[1.7] text-[15px]">
                Whether you&apos;re a data centre operator exploring power
                options, an energy professional interested in what we&apos;re
                building, or an investor — we&apos;d love to hear from you.
              </p>
            </motion.div>
          </div>

          {/* Right — Form */}
          <div>
            {formState === "success" ? (
              <FadeIn direction="none">
                <div className="p-12 bg-olive-tint rounded-lg text-center">
                  <div className="w-16 h-16 bg-olive rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-text-primary mb-3">
                    Message Sent
                  </h3>
                  <p className="text-text-secondary">
                    Thank you for your interest. We&apos;ll be in touch shortly.
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
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    className={`${inputClasses} disabled:opacity-60 disabled:cursor-not-allowed`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Email <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className={`${inputClasses} disabled:opacity-60 disabled:cursor-not-allowed`}
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
                    disabled={isLoading}
                    autoComplete="organization"
                    className={`${inputClasses} disabled:opacity-60 disabled:cursor-not-allowed`}
                    placeholder="Your role and company"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    I&apos;m a... <span className="text-red">*</span>
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiry-type"
                    required
                    disabled={isLoading}
                    className={`${inputClasses} disabled:opacity-60 disabled:cursor-not-allowed`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one...
                    </option>
                    <option value="data-centre-operator">Data Centre Operator</option>
                    <option value="energy-professional">Energy Professional</option>
                    <option value="investor">Investor</option>
                    <option value="government-regulatory">Government / Regulatory</option>
                    <option value="media">Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Message <span className="text-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={isLoading}
                    maxLength={2000}
                    className={`${inputClasses} resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
                    placeholder="Tell us about your interest..."
                  />
                </div>

                {/* Error message */}
                {formState === "error" && (
                  <div role="alert" className="flex items-center gap-2 p-3 bg-red-tint rounded-lg text-red text-sm">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-7 py-3.5 bg-olive text-white font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === "loading" ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
