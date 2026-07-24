import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticSection from "@/components/DiagnosticSection";
import CasesSection from "@/components/CasesSection";
import SolutionsSection from "@/components/SolutionsSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import ROISection from "@/components/ROISection";
import RoadmapSection from "@/components/RoadmapSection";
import EditableSection from "@/components/EditableSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero - Full display with particle animations */}
        <HeroSection />

        {/* Each section below is wrapped in EditableSection for inline content editing */}
        <EditableSection
          id="diagnostic"
          title="Diagnóstico IA"
          className="scroll-mt-20"
        >
          <DiagnosticSection />
        </EditableSection>

        <EditableSection
          id="cases"
          title="Cases"
          className="scroll-mt-20"
        >
          <CasesSection />
        </EditableSection>

        <EditableSection
          id="solutions"
          title="Soluções"
          className="scroll-mt-20"
        >
          <SolutionsSection />
        </EditableSection>

        <EditableSection
          id="marketplace"
          title="Marketplace"
          className="scroll-mt-20"
        >
          <MarketplaceSection />
        </EditableSection>

        <EditableSection
          id="roi"
          title="Calculadora ROI"
          className="scroll-mt-20"
        >
          <ROISection />
        </EditableSection>

        <EditableSection
          id="roadmap"
          title="Roadmap"
          className="scroll-mt-20"
        >
          <RoadmapSection />
        </EditableSection>
      </main>
      <Footer />
    </>
  );
}
