// app/contest/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getContest } from "@/lib/firebase-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Download,
  Clock,
  Users,
  ExternalLink,
  Info,
  ScrollText,
  Database,
  FileDown,
} from "lucide-react";

export default function ContestDescription() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        setLoading(true);
        const contestData = await getContest(params.id);
        setContest(contestData);
      } catch (error) {
        console.error("Error fetching contest:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchContest();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading contest...
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex justify-center items-center h-screen">
        Contest not found
      </div>
    );
  }

  // Calculate platform fee
  const platformFeeAmount =
    contest.prizes.totalPrizePool * (contest.prizes.platformFee || 0.02);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="ml-60 max-w-5xl h-64 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('${
            contest.metadata.image || "/api/placeholder/1200/600"
          }')`,
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            {contest.metadata.title}
          </h1>
          <p className="text-xl text-center mb-6 max-w-3xl">
            {contest.metadata.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">
                Ending in: {contest.timeInfo.endingIn}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">
                Registered: {contest.participants.count}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-0">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mx-2 w-full grid grid-cols-2 md:grid-cols-5 rounded-md h-full">
                <TabsTrigger value="leaderboard" className="py-3">
                  <Trophy className="w-4 h-4 mr-2" /> Leaderboard
                </TabsTrigger>
                <TabsTrigger value="details" className="py-3">
                  <Info className="w-4 h-4 mr-2" /> Details
                </TabsTrigger>
                <TabsTrigger value="rules" className="py-3">
                  <ScrollText className="w-4 h-4 mr-2" /> Rules
                </TabsTrigger>
                <TabsTrigger value="prizes" className="py-3">
                  <Trophy className="w-4 h-4 mr-2" /> Prizes
                </TabsTrigger>
                <TabsTrigger value="dataset" className="py-3 mr-2">
                  <Database className="w-4 h-4 mr-2" /> Dataset
                </TabsTrigger>
              </TabsList>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="p-6">
                <h2 className="text-2xl font-bold mb-4">Current Leaderboard</h2>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead className="text-right">Score (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contest.participants.list.length > 0 ? (
                        contest.participants.list.map((entry) => (
                          <TableRow
                            key={entry.rank}
                            className={entry.rank <= 3 ? "bg-yellow-50" : ""}
                          >
                            <TableCell className="font-medium">
                              {entry.rank === 1
                                ? "🥇"
                                : entry.rank === 2
                                ? "🥈"
                                : entry.rank === 3
                                ? "🥉"
                                : `${entry.rank}️⃣`}
                            </TableCell>
                            <TableCell>{entry.wallet}</TableCell>
                            <TableCell className="text-right font-medium">
                              {entry.modelAccuracy.toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">
                            No submissions yet. Be the first to submit!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contest Details</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Smart Contract Address
                    </h3>
                    <div className="flex items-center">
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        {contest.contract.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() =>
                          window.open(contest.contract.explorerUrl, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Host</h3>
                    <div className="flex items-center">
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        {contest.hostInfo.wallet}
                      </code>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Total Prize Pool
                      </h3>
                      <p className="text-xl font-bold">
                        {contest.prizes.totalPrizePool} ETH 💰
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Deadline
                      </h3>
                      <p className="text-xl font-bold">
                        {contest.timeInfo.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Contest Description
                    </h3>
                    <p className="text-gray-800">
                      {contest.metadata.description}
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Rules Tab */}
              <TabsContent value="rules" className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contest Rules</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Official Rules and Guidelines</CardTitle>
                    <CardDescription>
                      All participants must adhere to these rules to be eligible
                      for prizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {contest.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p>{rule}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prizes Tab */}
              <TabsContent value="prizes" className="p-6">
                <h2 className="text-2xl font-bold mb-4">Prize Distribution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prize Breakdown</CardTitle>
                      <CardDescription>
                        How the {contest.prizes.totalPrizePool} ETH prize pool
                        is distributed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {contest.prizes.winners.map((prize) => (
                          <li
                            key={prize.place}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <span className="font-medium">
                              {typeof prize.place === "number"
                                ? `${prize.place}${
                                    prize.place === 1
                                      ? "st"
                                      : prize.place === 2
                                      ? "nd"
                                      : "rd"
                                  } Place`
                                : `${prize.place} Places`}{" "}
                              {prize.icon}
                            </span>
                            <span className="text-lg font-bold">
                              {prize.amount.toFixed(1)} ETH
                            </span>
                          </li>
                        ))}
                        <li className="flex justify-between items-center border-b pb-2 text-gray-500">
                          <span className="font-medium">Platform Fee (2%)</span>
                          <span>{platformFeeAmount.toFixed(2)} ETH</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader>
                      <CardTitle>Prize Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Prize Pool:</span>
                          <span className="font-bold">
                            {contest.prizes.totalPrizePool} ETH
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee (2%):</span>
                          <span>{platformFeeAmount.toFixed(2)} ETH</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span>Net Prize Distribution:</span>
                          <span className="font-bold">
                            {(
                              contest.prizes.totalPrizePool - platformFeeAmount
                            ).toFixed(2)}{" "}
                            ETH
                          </span>
                        </div>

                        <div className="pt-4">
                          <p className="text-sm text-gray-600">
                            Prizes will be distributed automatically to winners'
                            wallets after the contest ends.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Dataset Tab */}
              <TabsContent value="dataset" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Dataset Information</h2>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Dataset
                  </Button>
                </div>

                {/* Dataset details here... */}

                <div className="flex justify-center mt-8">
                  <Button className="w-full max-w-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Submit Your Prediction
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button className="w-full max-w-md" size="lg">
            Join This Contest
          </Button>
        </div>
      </div>
    </div>
  );
}
