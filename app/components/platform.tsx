export default function Platform() {
  return (
    <section className="relative w-full bg-black py-24 px-8 ">
 
      {/* Top heading */}
      <div className="text-center mb-12">
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-orange-500 via-black to-blue-500 mb-4">
          <div className="bg-black rounded-full px-4 py-1">
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              ✦ Platform
            </span>
          </div>
        </div>

        <h2 className="text-5xl font-bold text-white mb-6-xl mx-auto leading-tight">
            One platform.{" "}
            <span className="bg-gradient-to-r from-[rgb(255,82,29)] to-[rgb(255,137,24)] bg-clip-text text-transparent">
             Every tool
            </span>{" "}
                your GTM team needs.
            </h2>

        <p className="text-white/60 text-lg max-w-xl mx-auto">
          From ICP definition to closed deal — Oraami covers the entire revenue journey.
        </p>
      </div>

      {/* First Row  */}
      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto mb-6 lg:grid-cols-3">

        {/* Card 1  */}
        <div className="card-light-border h-[350px] lg:col-span-2">
          <div className="card-inner bg-[#0a0a0a] rounded-2xl overflow-hidden relative w-full h-full">
            <img
              src="/g3.svg"
              alt="logo"
              className="h-full w-full object-cover block"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-light-border aspect-[503/430] p-px lg:col-span-1">
          <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
            <img
              src="/g4.svg"
              alt="logo"
              className="absolute inset-0 w-full h-full object-contain block"
            />
          </div>
        </div>

      </div>

      {/* Second Row -  */}
      <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto lg:grid-cols-3 ">

        {/* Card 3 */}
        <div className="card-light-border aspect-[503/468] p-px lg:col-span-1">
          <div className="relative z-[1] h-full w-full bg-[#0a0a0a] rounded-2xl overflow-hidden">
            <img
              src="/g5.svg"
              alt="logo"
              className="absolute inset-0 w-full h-full object-contain block"
            />
          </div>
        </div>

        {/* Card 4 */}
        <div className="card-light-border h-[450px] lg:col-span-2">
          <div className="card-inner bg-[#0a0a0a] rounded-2xl overflow-hidden relative w-full h-full">
            <img
              src="/g6.svg"
              alt="logo"
              className="h-full w-full object-cover block"
            />
          </div>
        </div>

      </div>

    </section>
  )
}
