import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
