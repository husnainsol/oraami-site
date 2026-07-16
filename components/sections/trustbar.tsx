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
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {LOGOS.map((logo) => (
        <span key={logo.src} className="flex w-[148px] shrink-0 items-center justify-center sm:w-[162px] lg:w-[172px]">
          <Image
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            className="h-6 w-auto max-w-[120px] object-contain opacity-100 grayscale sm:h-7 sm:max-w-[134px] lg:h-8 lg:max-w-[146px]"
          />
        </span>
      ))}
    </div>
  )
}

function Marquee() {
  return (
    <div className="flex w-max animate-marquee items-center" style={{ animationDuration: "18s" }}>
      <LogoSet />
      <LogoSet />
    </div>
  )
}

export default function TrustBar() {
  return (
    <div aria-label="Trusted by growing B2B teams" className="w-full max-w-[36rem]">
      <p className="text-[12.5px] font-medium uppercase tracking-[0.15em] text-faint">Trusted by</p>
      <div
        className="mt-3 w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 98%, transparent)",
        }}
      >
        <Marquee />
      </div>
    </div>
  )
}
