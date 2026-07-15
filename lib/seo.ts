import type { Metadata } from "next";

export const SITE_URL = "https://oraami.com";
export const SITE_NAME = "Oraami";
export const SITE_TAGLINE = "The Quality-First AI BDR";
export const SITE_DESCRIPTION =
  "Oraami is the quality-first AI BDR: it caps every ICP at 50 high-fit accounts, runs deep AI research on each prospect and their full buying committee, and sends personalised, trust-building sequences that book meetings — not spam.";
export const X_URL = "https://x.com/oraami";
export const LINKEDIN_URL = "https://www.linkedin.com/company/oraami";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export interface CreateMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  about?: string;
  includeProduct?: boolean;
}

export interface CreateMetaResult {
  metadata: Metadata;
  jsonLd: object | null;
}

export function createMeta(options: CreateMetaOptions): CreateMetaResult {
  const {
    title,
    description,
    path,
    image,
    noIndex = false,
    breadcrumbs,
    faqs,
    about,
    includeProduct = false,
  } = options;

  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? `${title} — ${SITE_NAME}` : title;

  const images = image ? [{ url: image, width: 1200, height: 630, alt: `${fullTitle} — ${SITE_NAME}` }] : undefined;

  const metadata: Metadata = {
    title: path === "/" ? { absolute: fullTitle } : fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },
  };

  const schemas: object[] = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: fullTitle,
    description,
    url,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(about && { about: { "@type": "Thing", name: about } }),
  });

  if (path === "/") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
    });
  } else if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...breadcrumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: c.label,
          item: `${SITE_URL}${c.href}`,
        })),
      ],
    });
  } else {
    const name = path
      .replace(/^\//, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  }

  void faqs;

  if (includeProduct) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${SITE_NAME} ${title}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free trial",
      },
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    });
  }

  const jsonLd = schemas.length === 1 ? schemas[0] : { "@context": "https://schema.org", "@graph": schemas };

  return { metadata, jsonLd };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    sameAs: [X_URL, LINKEDIN_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@oraami.com",
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    featureList: [
      "ICP research & targeting — every ICP capped at 50 high-fit accounts",
      "Deep AI research on each prospect and their full buying committee",
      "Buying-signal detection (hiring, funding, tech changes)",
      "Multi-stakeholder mapping across 6–10 decision-makers per account",
      "Case-study matching to each prospect's exact context",
      "Trust-building sequences — personalised touches over 6–12 weeks",
      "AI quality scoring on every lead and message",
      "Analytics & reporting across every ICP in real time",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial",
      availability: "https://schema.org/InStock",
    },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function createMetadata(opts: { title: string; description: string; path: string }) {
  return createMeta(opts).metadata;
}
