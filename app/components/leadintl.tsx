export default function LeadIntl() {
  return (
    <section className="relative w-full bg-black py-16 px-16">

      {/* Gradient border wrapper */}
<div className="max-w-5xl mx-auto p-[1px] rounded-3xl"
  style={{
    background: "linear-gradient(90deg, #FF5702 3%, transparent 50%, #0098F3 100%)"
  }}>

  {/* Card */}
  <div className="relative rounded-3xl p-16 text-center"
    style={{
      background: "radial-gradient(ellipse at center center, rgba(244,98,10,0.15) 2%, rgba(0,0,0,0.95) 70%)"
    }}>

    {/* Badge */}
    <div className="inline-flex items-center gap-2 border border-orange-500/50 rounded-full px-4 py-1 mb-8">
      <span className="text-orange-500 text-xs">⚡</span>
      <span className="text-white text-xs font-semibold tracking-widest uppercase">Start in 5 minutes</span>
    </div>

    {/* Heading */}
    <h2 className="text-5xl font-bold text-white mb-6 leading-tight max-w-2xl mx-auto">
      Start your Lead Intelligence Journey
    </h2>

    {/* Subtext */}
    <p className="text-white/50 text-base max-w-md mx-auto mb-10">
      Join thousands of sales teams using Oraami to find and close their best customers.
    </p>

    {/* Button row */}
    <div className="flex items-center justify-center gap-4">
      <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300">
        Get Started Free →
      </button>
      <p className="text-white/40 text-sm">No credit card required · 14-day free trial</p>
    </div>

  </div>
</div>

    </section>
  )
}