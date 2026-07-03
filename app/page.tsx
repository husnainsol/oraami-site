import Navbar from "./components/navbar"
import Hero from "./components/herosection"
import TrustBar from "./components/trustbar"
import Features from "./components/features"
import AiPowered from "./components/aipowered"
import Platform from "./components/platform"
import Testimonials from "./components/testimonial"
import LeadIntl from "./components/leadintl"
import Footer from "./components/footer"


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
    <LeadIntl/>
    <Footer/>
    </main>
  );
}
