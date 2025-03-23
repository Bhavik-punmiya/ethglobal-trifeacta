import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // ✅ Added Sidebar back
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Model Wars",
  description: "Show the Highest Accuracy Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black flex`}>
        <Sidebar /> {/* ✅ Sidebar is back */}
        <div className="flex-1">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
