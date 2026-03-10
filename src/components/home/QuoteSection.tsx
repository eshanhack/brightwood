"use client";

import FadeIn from "@/components/FadeIn";

export default function QuoteSection() {
  return (
    <section className="bg-olive py-[100px] lg:py-[140px]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <blockquote className="font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white italic leading-snug">
            &ldquo;The bottleneck isn&apos;t demand. It&apos;s delivery.
            Whoever solves power delivery fastest wins.&rdquo;
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
