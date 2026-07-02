import Navbar from "./components/navbar"
import Hero from "./components/herosection"
import TrustBar from "./components/trustbar"
import Features from "./components/features"
import AiPowered from "./components/aipowered"
import Platform from "./components/platform"
import Testimonials from "./components/testimonial"


export default function Home() {
  return (
    <main>
    <Navbar/>
    <Hero/>
    <TrustBar/>
    <Features/>
    <Platform/>
    <Testimonials/>
    <AiPowered/>
    </main>
  );
}
