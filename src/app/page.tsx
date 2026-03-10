import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/home/HeroSection";
import CredibilityBar from "@/components/home/CredibilityBar";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AdvantageSection from "@/components/home/AdvantageSection";
import BusinessModelSection from "@/components/home/BusinessModelSection";
import ValidationSection from "@/components/home/ValidationSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <CredibilityBar />
      <ProblemSection />
      <HowItWorksSection />
      <AdvantageSection />
      <BusinessModelSection />
      <ValidationSection />
      <CTASection />
    </>
  );
}
