import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Paynah PRO",
  description:
    "Votre solution de paynah en Côte d'Ivoire et dans la sous région.",
  icons: {
    icon: "/icons/mini-logo.svg",
  },
  openGraph: {
    images: "/icons/mini-logo.svg",
  },
  twitter: {
    images: "/icons/mini-logo.svg",
  },
  keywords: ["paynah", "paynah pro"],
  authors: [{ name: "Paynah", url: "https://paynah.com" }],
  creator: "Paynah",
  publisher: "Paynah",
  formatDetection: {
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
