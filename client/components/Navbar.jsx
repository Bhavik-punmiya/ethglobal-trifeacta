"use client";
import WalletConnectButton from "@/components/WalletConnectButton";

export default function Navbar() {
  return (
    <nav className="fixed top-4 right-6 z-50">
<WalletConnectButton
  text="Connect Wallet"
  className="!bg-blue-600 !px-5 z-12 py-2 !text-white rounded-lg hover:!bg-blue-700 shadow-lg border border-blue-700"
/>

    </nav>
  );
}
