import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import Platform from "@/components/sections/platform"
import Results from "@/components/sections/results"
import Comparison from "@/components/sections/comparison"
import Solutions from "@/components/sections/solutions"
import WhyChooseUs from "@/components/sections/why-choose-us"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import Security from "@/components/sections/security"

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Platform />
      <Results />
      <Comparison />
      <Solutions />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <Security />
    </main>
  )
}
