"use client";

import WalletWrapper from "@/components/WalletWrapper";

export default function WalletConnectButton({ text, className }) {
  return (
    <WalletWrapper
      className={className || "min-w-[90px] bg-blue-500 hover:bg-blue-600"}
      text={text || "Connect Wallet"}
      withWalletAggregator={true}
    />
  );
}
