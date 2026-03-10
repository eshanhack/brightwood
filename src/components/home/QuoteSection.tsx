"use client";

import FadeIn from "@/components/FadeIn";

export default function QuoteSection() {
  return (
    <section className="py-[100px] lg:py-[140px] border-t border-b border-divider">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <blockquote className="font-serif text-[26px] md:text-[34px] lg:text-[40px] text-text-primary italic leading-[1.3]">
            &ldquo;The bottleneck isn&apos;t demand. It&apos;s delivery.
            Whoever solves power delivery fastest wins.&rdquo;
          </blockquote>
          <div className="mt-6 w-12 h-[2px] bg-olive mx-auto" />
        </FadeIn>
      </div>
    </section>
  );
}
