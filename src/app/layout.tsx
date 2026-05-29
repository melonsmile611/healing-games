import type { Metadata } from "next";
import { Nunito, DM_Serif_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import VisitorBadge from "@/components/VisitorBadge";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const serif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Healing Corner",
  description: "Mini healing games to help you slow down — sound mystery box, breathing, bubbles, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${serif.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
        <VisitorBadge site="healing-corner" />
      </body>
    </html>
  );
}
