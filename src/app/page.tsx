import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/home/HeroSection";
import CredibilityBar from "@/components/home/CredibilityBar";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AdvantageSection from "@/components/home/AdvantageSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import BusinessModelSection from "@/components/home/BusinessModelSection";
import ProjectPipelineSection from "@/components/home/ProjectPipelineSection";
import AIStackSection from "@/components/home/AIStackSection";
import ValidationSection from "@/components/home/ValidationSection";
import PressSection from "@/components/home/PressSection";
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
      <SustainabilitySection />
      <BusinessModelSection />
      <ProjectPipelineSection />
      <AIStackSection />
      <ValidationSection />
      <PressSection />
      <CTASection />
    </>
  );
}
