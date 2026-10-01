import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Take2 | Curated dating experiences in NYC",
  description:
    "Curated in-person dating events for NYC singles who still believe in the meet-cute. No swiping, and no pressure to get the first impression right.",
  metadataBase: new URL("https://take2.social"),
  icons: { icon: "/assets/favicon.png" },
  openGraph: {
    title: "Take2 | Curated dating experiences in NYC",
    description: "Dating experiences you don't want to miss.",
    url: "https://take2.social",
    siteName: "Take2",
    images: ["/assets/hero.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
