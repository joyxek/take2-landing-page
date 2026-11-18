import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { getCopy } from "./content";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getCopy();
  return {
    title: c.t("seo.title"),
    description: c.t("seo.description"),
    metadataBase: new URL("https://take2.social"),
    icons: { icon: "/assets/favicon.png" },
    openGraph: {
      title: c.t("seo.title"),
      description: c.t("seo.share"),
      url: "https://take2.social",
      siteName: "Take2",
      images: ["/assets/hero.jpg"],
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
