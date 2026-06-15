import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Go Dash — Pickleball & Box Cricket Booking | Ahmedabad",
  description:
    "Book your Pickleball court or Box Cricket turf in seconds at Go Dash, Ahmedabad's premier sports destination. Real-time slot availability, instant confirmation.",
  keywords: "pickleball booking Ahmedabad, box cricket turf booking, Go Dash sports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CRITICAL: without this meta, all CSS media queries are ignored on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#030712" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}