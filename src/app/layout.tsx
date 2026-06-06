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