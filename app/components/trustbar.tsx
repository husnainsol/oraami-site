export default function TrustBar() {
  return (
    <div className="w-full py-16 bg-black">

      <p className="text-white/100 text-xl text-center mb-10">
        Trusted by 150,000+ users worldwide
      </p>
     
      <div className="overflow-hidden max-w-7xl mx-auto">
        <div className="flex gap-12 animate-marquee">

          {/* First set */}
            <div className="flex items-center gap-2 shrink-0">
            <img src="/Carpolyn.svg" alt="logo1" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Coredirection.svg" alt="logo2" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Covent.svg" alt="logo3" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Mask group.svg" alt="logo4" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/polinate.svg" alt="logo5" className="h-12 opacity-100 "/>
            </div>


          {/* Second set */}
          
            <div className="flex items-center gap-2 shrink-0">
            <img src="/Carpolyn.svg" alt="logo1" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Coredirection.svg" alt="logo2" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Covent.svg" alt="logo3" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/Mask group.svg" alt="logo4" className="h-12 opacity-100 "/>
            </div>

            <div className="flex items-center gap-2 shrink-0">
            <img src="/polinate.svg" alt="logo5" className="h-12 opacity-100 "/>
            </div>
        </div>
      </div>

    </div>
  )
}