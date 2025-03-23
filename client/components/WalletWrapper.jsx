"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";

export default function WalletWrapper({ className, text, withWalletAggregator = false }) {
  return (
    <Wallet>
      <ConnectWallet withWalletAggregator={withWalletAggregator} text={text} className={className}>
        <Avatar className="h-6 w-6 text-white bg-white" />
        <Name className="text-white" />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
