"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getOngoingContests, getPastContests } from "@/utils/firebaseService";

export default function ContestsPage() {
  const [ongoingContests, setOngoingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const ongoing = await getOngoingContests();
        const past = await getPastContests();

        setOngoingContests(ongoing);
        setPastContests(past);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading contests...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      {/* Ongoing Contests */}
      <section className="w-[70%]">
        <h2 className="text-2xl font-bold mb-4">Ongoing Contests</h2>
        <div className="space-y-4">
          {ongoingContests.length > 0 ? (
            ongoingContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} isOngoing />
            ))
          ) : (
            <p>No ongoing contests at the moment.</p>
          )}
        </div>
      </section>

      {/* Past Contests */}
      <section className="w-[70%] mt-10">
        <h2 className="text-xl font-semibold mb-4">Past Contests</h2>
        <div className="space-y-4">
          {pastContests.length > 0 ? (
            pastContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))
          ) : (
            <p>No past contests.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function ContestCard({ contest, isOngoing }) {
  // Adapt this component to use your Firestore data structure
  return (
    <div className="flex bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden w-full">
      {/* Contest Image */}
      <div className="w-[15%]">
        <Image
          src={contest.metadata.image || "/api/placeholder/150/100"}
          alt={contest.metadata.title}
          width={150}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contest Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Top Row: Contest Name and Prize Pool */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{contest.metadata.title}</h3>
          <div className="bg-blue-50 px-3 py-1 rounded-full">
            <p className="text-blue-700 font-semibold">
              Prize: {contest.prizes.totalPrizePool} ETH
            </p>
          </div>
        </div>

        {/* Creator and Contract */}
        <div className="mb-4">
          <p className="text-gray-500 mb-2 text-sm">
            Created by: {contest.hostInfo.wallet}
          </p>
          <p className="text-gray-700">{contest.metadata.subtitle}</p>
        </div>

        {/* Bottom Row: Participants, Ends In, and Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <p className="text-sm">
              Participants: {contest.participants.count}
            </p>
            {isOngoing && (
              <p className="text-sm text-red-500">
                Ends in: {contest.timeInfo.endingIn}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {isOngoing && (
              <Link href={`/contest/${contest.id}`}>
                <Button>Join Contest</Button>
              </Link>
            )}
            <Link href={contest.contract.explorerUrl} target="_blank">
              <Button variant="outline">See Contract</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
