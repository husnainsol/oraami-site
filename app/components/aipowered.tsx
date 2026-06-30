export default function AIPowered() {
  return (
    <section className="relative w-full bg-black py-32 px-16">

      <div className="flex items-center justify-center gap-4 mb-16">

        <img 
            src="https://framerusercontent.com/images/VNxTg4trlyPkvi55POCdKXQ04kY.png" 
            alt="logo" 
            className="spin-ball w-35 h-35 rounded-full"
/>

        <h2 className="text-9xl font-bold text-white">AI</h2>

        <h2 className="powered-text text-9xl font-bold"
          style={{
            backgroundImage: "linear-gradient(90deg, rgb(0,152,243) 0%, rgb(0,191,251) 37.5%, rgb(255,82,29) 70%, rgb(159,78,0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Powered
        </h2>

      </div>

      <div className="max-w-6xl mx-auto">
        <img
          src="https://framerusercontent.com/images/JvSbWQlPTNqa6sLHVMbkbF3gmE.png"
          alt="AI Powered Dashboard"
          className="w-full rounded-2xl border border-white/10"
        />
      </div>

    </section>
  )
}