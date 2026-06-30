import Navbar from "./components/navbar"
import Hero from "./components/herosection"
import TrustBar from "./components/trustbar"
import Heroimg from "./components/heroimg"
import Features from "./components/features"
import AiPowered from "./components/aipowered"


export default function Home() {
  return (
    <main>
    <Navbar/>
    <Hero/>
    <Heroimg/>
    <TrustBar/>
    <Features/>
    <AiPowered/>
    </main>
  );
}
