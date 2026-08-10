import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import Platform from "@/components/sections/platform"
import Results from "@/components/sections/results"
import Solutions from "@/components/sections/solutions"
import WhyChooseUs from "@/components/sections/why-choose-us"
import Testimonials from "@/components/sections/testimonials"
import Insights from "@/components/sections/insights"
import Pricing from "@/components/sections/pricing"

export default function Home() {
  return (
    <main className="flex flex-col gap-3 bg-canvas sm:gap-4">
      <Hero />
      <Features />
      <Platform />
      <Results />
      <Solutions />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <Insights />
    </main>
  )
}
