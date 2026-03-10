"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-cream border-t-4 border-olive py-[60px] lg:py-[80px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Opportunity
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-[1.7] max-w-xl mx-auto">
            We&apos;re building Australia&apos;s dedicated power infrastructure
            for the AI era. Talk to us about partnerships, sites, or joining the
            team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-olive text-white font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-lg"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center px-8 py-4 border-2 border-olive/30 text-olive font-medium rounded-lg hover:border-olive/50 hover:bg-olive/5 transition-all duration-200"
            >
              View FAQ
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
