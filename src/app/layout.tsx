import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/components/providers/LenisProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtor Guide | Real Estate Marketing Agency",
  description: "Generate leads that convert. Premium real estate marketing solutions for developers and brokers.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased`} style={{ background: "#F8F6FF", color: "#1E1B4B" }}>
        <ReactLenis root>
          {children}
        </ReactLenis>
        <Analytics />
      </body>
    </html>
  );
}
