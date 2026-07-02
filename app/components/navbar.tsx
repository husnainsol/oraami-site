export default function Navbar() {
  return (
    <div className="fixed left-1/2 top-5 z-50 w-full max-w-[80%] -translate-x-1/2 px-4">
      <nav className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
        
        
        <div className="flex items-center gap-2">
          <img 
            src="/O.svg" 
            alt="logo" 
            className="h-10 w-10"
          />
          <span className="text-white font-semibold text-[23px]">raami</span>
        </div>

        
        <div className="flex items-center gap-7">
          <a href="#" className="text-white/70 text-[19px] hover:text-white">About ICP</a>
          <a href="#" className="text-white/70 text-[19px] hover:text-white">Features</a>
          <a href="#" className="text-white/70 text-[19px] hover:text-white">Integrations</a>
          <a href="#" className="text-white/70 text-[19px] hover:text-white">Testimonial</a>
          <a href="#" className="text-white/70 text-[19px] hover:text-white">Contact</a>
          <a href="#" className="text-white/70 text-[19px] hover:text-white">About</a>
        </div>

          <div className="relative inline-block">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full z-20"/>
          <div className="p-[1px] rounded-xl bg-gradient-to-r from-orange-500 via-black to-blue-500">
          <button className="relative px-5 py-2 rounded-[11px] bg-black text-white font-medium overflow-hidden group">
          <span className="block transition-all duration-600 group-hover:-translate-y-6 group-hover:opacity-0">Get Started</span>
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">Get Started</span>
    </button>
  </div>
</div>
      </nav>
    </div>
  )
}
