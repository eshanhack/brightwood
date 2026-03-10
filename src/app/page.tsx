import HeroSection from "@/components/home/HeroSection";
import CredibilityBar from "@/components/home/CredibilityBar";
import ProblemSection from "@/components/home/ProblemSection";
import GlobalShiftSection from "@/components/home/GlobalShiftSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ValueChainSection from "@/components/home/ValueChainSection";
import WhyQueenslandSection from "@/components/home/WhyQueenslandSection";
import EconomicsSection from "@/components/home/EconomicsSection";
import PricingSection from "@/components/home/PricingSection";
import PolicyTailwindSection from "@/components/home/PolicyTailwindSection";
import QuoteSection from "@/components/home/QuoteSection";
import CTASection from "@/components/home/CTASection";
import HomeSourcesPanel from "@/components/home/HomeSourcesPanel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityBar />
      <ProblemSection />
      <GlobalShiftSection />
      <HowItWorksSection />
      <ValueChainSection />
      <WhyQueenslandSection />
      <EconomicsSection />
      <PricingSection />
      <PolicyTailwindSection />
      <QuoteSection />
      <HomeSourcesPanel />
      <CTASection />
    </>
  );
}
