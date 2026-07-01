export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-gradient.svg')" }}
      />

      <div className="absolute inset-0 bg-black/30"/>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center sm:px-10 lg:px-16">

        
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-orange-500 via-black to-blue-500 mb-3">
          <div className="bg-black rounded-full px-4 py-1">
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              Supercharge Your AI Workflows
            </span>
          </div>
        </div>

        
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Automate Your AI Workflows with AI Agent
        </h1>

        
        <p className="mb-10 max-w-2xl text-base text-gray-200 sm:text-lg">
          Connect your favorite apps, set triggers and watch AI handle the rest - no coding required. Get up and running in minutes.
        </p>

        
        <div className="flex flex-col items-center gap-4 sm:flex-row">

          
          <div className="relative inline-block">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full z-20"/>
        <div className="p-[1px] rounded-xl bg-gradient-to-r from-orange-500 via-black to-blue-500">
         <button className="relative px-6 py-3 rounded-[11px] bg-black text-white font-medium overflow-hidden group">
        <span className="block transition-all duration-400 group-hover:-translate-y-6 group-hover:opacity-0">Get Started - Free</span>
        <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">Get Started - Free</span>
        </button>
        </div>
        </div>

          
          <button className="relative px-6 py-3 rounded-xl border border-white/20 bg-black/50 text-white font-medium overflow-hidden group hover:bg-white/10 transition-all duration-300">
            <span className="block transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0">View Pricing</span>
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">View Pricing</span>
          </button>

        </div>
      </div>
     
    </section>
  )
}
