const cards = ["/t1.svg", "/t1.svg", "/t1.svg", "/t1.svg", "/t1.svg", "/t1.svg"]

export default function Testimonials() {
  return (
    <section className="relative w-full bg-black py-24 px-16">

      {/* Heading */}
      <div className="text-center mb-20">
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-orange-500 via-black to-blue-500 mb-4">
          <div className="bg-black rounded-full px-4 py-1">
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
               ✦ Testimonials
            </span>
          </div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
          Trusted by{" "}
          <span style={{
            backgroundImage: "linear-gradient(90deg, rgb(255,82,29) 0%, rgb(255,137,24) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Growing Businesses
          </span>
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Discover how teams are improving lead quality and driving better results with our platform.
        </p>
      </div>

      {/* Stacking Rows */}
<div className="max-w-5xl mx-auto flex flex-col gap-10">

  <div className="sticky-card sticky-card-1 grid grid-cols-2 gap-6 bg-black pb-4" style={{ top: "110px", zIndex: 1 }}>
    <img src="/t1.svg" alt="Testimonial 1" className="w-full h-auto block rounded-2xl"/>
    <img src="/t1.svg" alt="Testimonial 2" className="w-full h-auto block rounded-2xl"/>
  </div>

  <div className="sticky-card sticky-card-2 grid grid-cols-2 gap-6 bg-black pb-4" style={{ top: "110px", zIndex: 2 }}>
    <img src="/t1.svg" alt="Testimonial 3" className="w-full h-auto block rounded-2xl"/>
    <img src="/t1.svg" alt="Testimonial 4" className="w-full h-auto block rounded-2xl"/>
  </div>

  <div className="sticky-card grid grid-cols-2 gap-6 bg-black pb-4" style={{ top: "120px", zIndex: 3 }}>
    <img src="/t1.svg" alt="Testimonial 5" className="w-full h-auto block rounded-2xl"/>
    <img src="/t1.svg" alt="Testimonial 6" className="w-full h-auto block rounded-2xl"/>
  </div>

</div>

    </section>
    
  )
}