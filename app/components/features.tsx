export default function Features() {
  return (
    <section className="relative w-full bg-black py-24 px-16">

      
      <div className="text-center mb-16">
        <div className="inline-block border border-white/20 rounded-full px-4 py-1 mb-2">
          <span className="text-white text-xs font-semibold tracking-widest uppercase">
            AI-Driven Features
          </span>
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

  <div className="card-light-border aspect-[600/451] p-px">
  <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
    <img
      src="/g1.svg"
      alt="Seamless Integrations"
      className="absolute inset-0 h-full w-full object-cover block"
    />
  </div>
</div>


        {/* Card 2*/}
        
  <div className="card-light-border aspect-[600/451] p-px">
  <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
    <img
      src="/g2.svg"
      alt="Seamless Integrations"
      className="absolute inset-0 w-full h-full object-contain block"
    />
  </div>
</div>


      </div>
      {/* Second Row*/}
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">

  {/* Card 3 */}
  <div className="col-span-2 card-light-border">
  <div className="card-inner bg-[#0a0a0a] rounded-2xl overflow-hidden">
    
    <img
      src="https://framerusercontent.com/images/TlvPA50zhT5k8DxWWkYnT1FShQ.png"
      alt="Visual Workflow Designer"
      className="w-full h-auto block"
    />

    <div className="p-8">
      <h3 className="text-white text-2xl font-semibold mb-7">
        Visual Workflow Designer
      </h3>
      <p className="text-white text-base">
        Drag & drop AI actions to build workflows visually—no coding required.
      </p>
    </div>

  </div>
</div>

  {/* Card 4  */}
  <div className="col-span-1 card-light-border">
  <div className="card-inner bg-[#0a0a0a] rounded-2xl overflow-hidden">
    
    <img
      src="https://framerusercontent.com/images/xu3Rm8ZKi6rTLrVdLsojwkBuuRY.png"
      alt="Multi-Channel Automation"
      className="w-full h-auto block"
    />

    <div className="p-8">
      <h3 className="text-white text-2xl font-semibold mb-10">
        Multi-Channel Automation
      </h3>
      <p className="text-white text-base">
        Trigger email, SMS & chat messages automatically on schedule.
      </p>
    </div>

  </div>
</div>

</div>

    </section>
  )
}
