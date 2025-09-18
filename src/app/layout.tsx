import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, Instrument_Serif, Carlito, Philosopher, Mulish, Lavishly_Yours, Inter, Orbit, Gilda_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const carlito = Carlito({
  variable: "--font-carlita",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lavishlyYours = Lavishly_Yours({
  variable: "--font-lavishly-yours",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const orbit = Orbit({
  variable: "--font-orbit",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Take2 - Meet People You're Actually Compatible With",
  description: "Take2 is an invite-only dating event where singles in your city meet IRL. Skip the apps, skip the stress - just show up to meet compatible singles.",
  keywords: "dating, events, IRL dating, singles, compatibility, invite-only, dating apps alternative",
  authors: [{ name: "Take2" }],
  creator: "Take2",
  publisher: "Take2",
  openGraph: {
    title: "Take2 - Meet People You're Actually Compatible With",
    description: "Skip the apps, skip the stress. Take2 is an invite-only dating event where singles in your city meet IRL.",
    url: "https://take2.dating",
    siteName: "Take2",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Take2 - Meet People You're Actually Compatible With",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take2 - Meet People You're Actually Compatible With",
    description: "Skip the apps, skip the stress. Take2 is an invite-only dating event where singles in your city meet IRL.",
    images: ["/og-image.jpg"],
    creator: "@take2dating",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/profile-pic.png" sizes="any" />
        <link rel="apple-touch-icon" href="/profile-pic.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6EE7B7" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${instrumentSerif.variable} ${carlito.variable} ${philosopher.variable} ${mulish.variable} ${lavishlyYours.variable} ${inter.variable} ${orbit.variable} ${gildaDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
