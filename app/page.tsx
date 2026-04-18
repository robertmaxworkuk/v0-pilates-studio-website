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
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let initialUserStatus = {
    isAuthenticated: false,
    role: null as string | null,
    bookingCount: 0,
  }

  if (user) {
    const [profileResult, bookingsResult] = await Promise.all([
      supabase.from('users_profile').select('role').eq('id', user.id).single(),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])

    initialUserStatus = {
      isAuthenticated: true,
      role: profileResult.data?.role ?? 'user',
      bookingCount: bookingsResult.count ?? 0,
    }
  }

  return (
    <>
      <Header initialUserStatus={initialUserStatus} />
      <main>
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
    </>
  )
}
