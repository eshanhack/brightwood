"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-olive py-[100px] lg:py-[120px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-white">
            The Opportunity
          </h2>
          <p className="mt-4 text-lg text-white/80 leading-[1.7] max-w-xl mx-auto">
            We&apos;re building Australia&apos;s dedicated power infrastructure
            for the AI era. Talk to us about partnerships, sites, or joining the
            team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-all duration-200 hover:shadow-lg"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
