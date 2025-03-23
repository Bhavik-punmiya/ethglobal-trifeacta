"use client";
import { GlobalProvider } from "@/contexts/UserContext";
// import { NextUIProvider } from "@nextui-org/react";
import  WagmiProvider  from "@/utils/wagmi-provider"
require("dotenv").config();
export default function Providers({ children }) {
  return (
    <GlobalProvider>
      <WagmiProvider>
      {children}
      </WagmiProvider>
    </GlobalProvider>
  );
}
