import "./globals.css";
import Script from "next/script";

<Script
 src="https://checkout.razorpay.com/v1/checkout.js"
/>

export const metadata = {
  title: "Go Dash",
  description: "Pickleball & Box Cricket Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}