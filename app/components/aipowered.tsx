export default function AIPowered() {
  return (
    <section className="relative w-full bg-black px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <div className="mb-28 flex items-center justify-center gap-4 lg:mb-42">
        <img
          src="/O.svg"
          alt="logo"
          className="spin-ball h-20 w-20 rounded-full sm:h-28 sm:w-28 lg:h-35 lg:w-35"
        />

        <h2 className="text-5xl font-bold text-white sm:text-7xl lg:text-9xl">AI</h2>

        <h2 className="powered-text bg-[linear-gradient(90deg,rgb(0,152,243)_0%,rgb(0,191,251)_37.5%,rgb(255,82,29)_70%,rgb(159,78,0)_100%)] bg-clip-text text-5xl font-bold text-transparent sm:text-7xl lg:text-9xl">
          Powered
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.05fr] lg:gap-16">
        <div className="pt-2">
          <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Let's <span className="text-[#ff5a1f]">talk</span> with us
          </h3>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/85 sm:text-base">
            Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
          </p>

          <div className="mt-9 flex flex-col gap-6 text-base text-white/90">
            <div className="flex items-center gap-4">
              <svg className="h-5 w-5 text-[#ff5a1f]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-6.05 7-12a7 7 0 1 0-14 0c0 5.95 7 12 7 12Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>abc,street 123</span>
            </div>

            <div className="flex items-center gap-4">
              <svg className="h-5 w-5 text-[#ff5a1f]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.92Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path d="M14.5 3.5A6 6 0 0 1 20.5 9.5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                <path d="M14.5 7.5A2 2 0 0 1 16.5 9.5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              </svg>
              <span>+1 234 678 9108 99</span>
            </div>

            <div className="flex items-center gap-4">
              <svg className="h-5 w-5 text-[#ff5a1f]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="m22 7-10 6L2 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Contact@oraami.com</span>
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-white/10 bg-[#101010] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.5)] sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="h-11 rounded-[9px] border border-[#ff5a1f] bg-black px-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20"
              placeholder="John"
              type="text"
            />
            <input
              className="h-11 rounded-[9px] border border-white/10 bg-black px-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20"
              placeholder="Last Name"
              type="text"
            />
          </div>

          <input
            className="mt-4 h-11 w-full rounded-[9px] border border-white/10 bg-black px-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20"
            placeholder="Email*"
            type="email"
          />

          <input
            className="mt-4 h-11 w-full rounded-[9px] border border-white/10 bg-black px-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20"
            placeholder="Phone Number"
            type="tel"
          />

          <textarea
            className="mt-4 min-h-28 w-full resize-y rounded-[9px] border border-white/10 bg-black px-4 py-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/20"
            placeholder="Your message..."
          />

          <button
            className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-[9px] bg-[#ff5a1f] text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,90,31,0.32)] transition hover:bg-[#ff6a2d]"
            type="button"
          >
            Send Message
            <span aria-hidden="true"></span>
          </button>
        </form>
      </div>
    </section>
  )
}
