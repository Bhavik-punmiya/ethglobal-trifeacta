import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // ✅ Added Sidebar back

export const metadata = {
  title: "Model Wars",
  description: "Show the Highest Accuracy Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-theme-off-white pt-16 min-h-screen flex">
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
