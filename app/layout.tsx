import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Paws Rescue",
  description: "A modern campus stray animal rescue and adoption platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
