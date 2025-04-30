import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiyatro Biletleri | Paylaşılabilir Sanat | tiyatrolar.com.tr",
  description: "Tiyatro biletleri, Tiyatro oyunları, resitaller, toplulukları ve sahnelerine, sergiler ve galerilere İstanbul, Ankara, İzmir, Bursa, Eskişehir, Antalya ve ülkenin her noktasından tek tıkla ulaşabilirsiniz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${openSans.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
