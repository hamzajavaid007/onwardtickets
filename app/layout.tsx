import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Open_Sans, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "OnwardTickets – Flight Itinerary & Visa Documents for Visa Applications",
    template: "%s | OnwardTickets",
  },
  description: "Get verified flight itineraries, hotel reservations, travel plans, and cover letters for your visa application. Trusted by 10,000+ travelers. Starting at £5.",
  keywords: ["flight itinerary for visa", "hotel reservation for visa", "visa documents", "onward ticket", "travel plan", "cover letter for visa"],
  openGraph: {
    title: "OnwardTickets – Visa Documents & Flight Itineraries",
    description: "Professional visa application documents. Flight itineraries, hotel reservations, travel plans & cover letters delivered within 24 hours.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${openSans.variable} ${plusJakarta.variable} ${poppins.variable} antialiased flex flex-col min-h-screen`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
