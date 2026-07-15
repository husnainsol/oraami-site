import Image from "next/image"

type Logo = { src: string; name: string; width: number; height: number }

const LOGOS: Logo[] = [
  { src: "/Carpolyn.svg", name: "Carpolyn", width: 150, height: 40 },
  { src: "/Coredirection.svg", name: "Coredirection", width: 190, height: 40 },
  { src: "/Covent.svg", name: "Covent", width: 150, height: 40 },
  { src: "/Mask group.svg", name: "Meridian", width: 190, height: 40 },
  { src: "/polinate.svg", name: "Polinate", width: 150, height: 40 },
]

function LogoSet() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {LOGOS.map((l) => (
        <span key={l.src} className="flex w-[230px] shrink-0 items-center justify-center">
          <Image
            src={l.src}
            alt=""
            width={l.width}
            height={l.height}
            className="h-9 w-auto max-w-[190px] object-contain opacity-60 brightness-0"
          />
        </span>
      ))}
    </div>
  )
}

function Marquee() {
  return (
    <div className="flex w-max animate-marquee items-center">
      <LogoSet />
      <LogoSet />
    </div>
  )
}

const LABEL = "text-[15px] font-medium uppercase text-black"

export default function TrustBar() {
  return (
    <section aria-label="Trusted by" className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
      <div className="relative py-10 md:py-16">

        <div className="hidden items-center md:flex">
          <span className={`ml-[8%] shrink-0 whitespace-nowrap pr-[120px] ${LABEL}`}>Trusted by:</span>
          <div className="flex-1 overflow-hidden">
            <Marquee />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:hidden">
          <span className={LABEL}>Trusted by:</span>
          <div className="w-full overflow-hidden">
            <Marquee />
          </div>
        </div>
      </div>
    </section>
  )
}
