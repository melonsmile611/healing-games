import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "治愈小屋 · Healing Corner",
  description: "Mini healing games to help you slow down — sound mystery box, breathing, bubbles, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={nunito.variable}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
