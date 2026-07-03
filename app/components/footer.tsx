export default function Footer() {
  return (
    <footer className="relative w-full bg-black py-16 px-16">

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Nav Links */}
      <div className="flex items-center justify-center gap-16 mb-12">
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">About ICP</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Features</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Testimonials</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Contact Us</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Careers</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Help</a>
        <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Privacy</a>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/10 mb-8"/>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-white/40 text-sm">© 2026 Oraami, Inc. All rights reserved.</p>
      </div>

    </footer>
  )
}