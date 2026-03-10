"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function CTASection() {
  return (
    <section className="bg-olive py-[100px] lg:py-[120px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-white">
            The Opportunity
          </h2>
          <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            Raising $5–15M AUD in development capital. The window to establish
            position is 18–24 months.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center mt-8 px-8 py-4 bg-white text-olive font-medium rounded-[7px] hover:bg-cream transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
