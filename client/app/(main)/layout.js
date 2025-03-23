// app/layout.js
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </>
  );
}
