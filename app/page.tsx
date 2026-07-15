import Hero from "@/components/sections/hero"
import TrustBar from "@/components/sections/trustbar"
import Features from "@/components/sections/features"
import Platform from "@/components/sections/platform"
import Results from "@/components/sections/results"
import Comparison from "@/components/sections/comparison"
import Solutions from "@/components/sections/solutions"
import Dossier from "@/components/sections/dossier"
import WhyChooseUs from "@/components/sections/why-choose-us"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import Security from "@/components/sections/security"

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Features />
      <Platform />
      <Results />
      <Comparison />
      <Solutions />
      <Dossier />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <Security />
    </main>
  )
}
