import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { getOpportunities } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Créditos de Cloud e IA para Startups Brasileiras`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "créditos para startups",
    "créditos AWS startup",
    "créditos Google Cloud",
    "créditos OpenAI",
    "créditos Anthropic",
    "aceleradoras Brasil",
    "editais para startups",
    "FAPESP PIPE",
    "Finep Startup",
    "perks para startups",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Créditos de Cloud e IA para Startups Brasileiras`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Créditos e benefícios para startups`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const opportunities = await getOpportunities();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      </head>
      <body className="font-sans">
        <Header opportunities={opportunities} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
