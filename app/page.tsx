import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { MethodSection } from '@/components/sections/method-section'
import { BenefitsSection } from '@/components/sections/benefits-section'
import { ProgramsSection } from '@/components/sections/programs-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { ScheduleSection } from '@/components/sections/schedule-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { StudioSection } from '@/components/sections/studio-section'
import { ContactSection } from '@/components/sections/contact-section'
import { MobileStickyCTA } from '@/components/shared/mobile-sticky-cta'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <AboutSection />
        <MethodSection />
        <BenefitsSection />
        <ProgramsSection />
        <PricingSection />
        <ScheduleSection />
        <StudioSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
