import HeroSection from "@/components/home/HeroSection";
import CredibilityBar from "@/components/home/CredibilityBar";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ValueChainSection from "@/components/home/ValueChainSection";
import EconomicsSection from "@/components/home/EconomicsSection";
import PricingSection from "@/components/home/PricingSection";
import QuoteSection from "@/components/home/QuoteSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityBar />
      <ProblemSection />
      <HowItWorksSection />
      <ValueChainSection />
      <EconomicsSection />
      <PricingSection />
      <QuoteSection />
      <CTASection />
    </>
  );
}
