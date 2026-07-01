export default function Features() {
  return (
    <section className="relative w-full bg-black py-24 px-16">

      
      <div className="text-center mb-16">
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-orange-500 via-black to-blue-500 mb-3">
          <div className="bg-black rounded-full px-4 py-1">
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              AI-DRIVEN FEATURES
            </span>
          </div>
        </div>

        <h2 className="text-5xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
          Build, scale and manage entire AI workforce
        </h2>

        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Fusion AI helps you tackle data bottlenecks, streamline analysis, and make smarter decisions with ease.
        </p>
      </div>

      {/* row- 1*/}
      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* card 1*/}

  <div className=" aspect-[600/451] p-px">
  <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
    <img
      src="/g1.svg"
      alt="Seamless Integrations"
      className="absolute inset-0 h-full w-full object-cover block"
    />
  </div>
</div>


        {/* Card 2*/}
        
  <div className="card-light-border h-[420px] p-px">
  <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
    <iframe
      src="/oraami-icp-chat.html"
      title="Oraami ICP chat"
      className="absolute inset-0 h-full w-full rounded-2xl border-0"
    />
  </div>
</div>


      </div>
      

    </section>
  )
}
