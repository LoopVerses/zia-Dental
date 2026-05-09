import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustMarquee } from "@/components/TrustMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatsSection } from "@/components/StatsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
// import { IntroLoader } from "@/components/IntroLoader";
import { PremiumCursor } from "@/components/PremiumCursor";

export default function HomePage() {
  return (
    <>
      {/* <IntroLoader /> */}
      <SmoothScroll />
      <PremiumCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TrustMarquee />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <FeaturesSection />
        <GallerySection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
