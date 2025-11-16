import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";

import Providers from "./providers";
import { getBaseUrl } from "@/utils/helpers";
import { AppConfig } from "@/utils/app-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: AppConfig.name,
    template: `%s | ${AppConfig.name}`,
  },
  description: AppConfig.description,
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
  authors: [{ name: AppConfig.name, url: getBaseUrl() }],
  creator: AppConfig.name,
  publisher: AppConfig.name,
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
