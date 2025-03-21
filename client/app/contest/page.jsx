'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const contests = {
  ongoing: [
    {
      id: 1,
      title: "AI Model Benchmark Challenge",
      contractAddress: "0x1234...abcd",
      prizePool: "10 ETH",
      description: "Optimize an AI model to win the prize!",
      hostedBy: "0x5678...efgh",
      imageUrl: "/contest/data-science.webp",
      explorerUrl: "https://etherscan.io/address/0x1234...abcd",
      endsIn: "3h 25m",
    },
    {
      id: 2,
      title: "AI Model Benchmark Challenge",
      contractAddress: "0x1234...abcd",
      prizePool: "10 ETH",
      description: "Optimize an AI model to win the prize!",
      hostedBy: "0x5678...efgh",
      imageUrl: "/contest/data-science.webp",
      explorerUrl: "https://etherscan.io/address/0x1234...abcd",
      endsIn: "3h 25m",
    },
  ],
  past: [
    {
      id: 2,
      title: "Decentralized Data Science Hackathon",
      contractAddress: "0xabcd...1234",
      prizePool: "5 ETH",
      description: "A competition to analyze blockchain data.",
      hostedBy: "0xefgh...5678",
      imageUrl: "/contest/data.png",
      explorerUrl: "https://etherscan.io/address/0xabcd...1234",
    },
  ],
};

export default function ContestsPage() {
  return (
    <div className="flex flex-col items-center py-10 px-4">
      {/* Ongoing Contests */}
      <section className="w-[70%]">
        <h2 className="text-2xl font-bold mb-4">Ongoing Contests</h2>
        <div className="space-y-4">
          {contests.ongoing.map((contest) => (
            <ContestCard key={contest.id} contest={contest} isOngoing />
          ))}
        </div>
      </section>

      {/* Past Contests */}
      <section className="w-[70%] mt-10">
        <h2 className="text-xl font-semibold mb-4">Past Contests</h2>
        <div className="space-y-4">
          {contests.past.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ContestCard({ contest, isOngoing }) {
  return (
    <div className="flex bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden w-full">
      {/* Contest Image */}
      <div className="w-[15%]">
        <Image
          src={contest.imageUrl}
          alt={contest.title}
          width={150}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Contest Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{contest.title}</h3>
        <p className="text-sm text-gray-600">{contest.description}</p>
        <p className="text-sm">Prize Pool: <strong>{contest.prizePool}</strong></p>
        <p className="text-sm">Hosted By: <span className="text-blue-500">{contest.hostedBy}</span></p>
        <p className="text-sm">Contract: <span className="text-blue-500">{contest.contractAddress}</span></p>
        {isOngoing && <p className="text-sm text-red-500">Ends in: {contest.endsIn}</p>}
      </div>
      
      {/* Actions */}
      <div className="p-4 flex flex-col justify-center items-end space-y-2">
        {isOngoing && <Button>Join Contest</Button>}
        <Link href={contest.explorerUrl} target="_blank">
          <Button variant="outline">See Contract</Button>
        </Link>
      </div>
    </div>
  );
}