import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/home/HeroSection'
import HighlightsSection from '@/components/home/HighlightsSection'
import WelcomeSection from '@/components/home/WelcomeSection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <WelcomeSection />
        <HighlightsSection />
      </main>
      <Footer />
    </div>
  )
}
