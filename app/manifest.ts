import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — The Quality-First AI BDR`,
    short_name: SITE_NAME,
    description:
      "Deep research and trust-building outreach that books meetings, not spam.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffefb",
    theme_color: "#ff4f00",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
