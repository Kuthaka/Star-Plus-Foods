import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Plus Foods | Your Favorite Foods Ready in Minutes",
  description: "Star Plus Foods: Recipes From the Master Chefs of Nameless Streets of India",
};

import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9BRYSNRQFK"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9BRYSNRQFK');
          `}
        </Script>
      </head>
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
