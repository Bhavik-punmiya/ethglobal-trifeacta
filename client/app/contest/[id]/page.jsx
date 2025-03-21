"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  FileDown 
} from "lucide-react";

export default function ContestDescription() {
  const [activeTab, setActiveTab] = useState("leaderboard");

  // Hardcoded data
  const contestData = {
    title: "Customer Churn Prediction Challenge",
    subtitle: "Predict customer churn using machine learning models",
    endingIn: "3 Days 12 Hours",
    participants: 245,
    contractAddress: "0x1234...ABCD",
    totalPrize: 5,
    hostWallet: "0xHOST...5678",
    deadline: "March 25, 2025",
    description: "Predict customer churn using machine learning models. Your goal is to achieve the highest accuracy using our provided dataset.",
    platformFee: 0.02, // 2%
  };

  const leaderboardData = [
    { rank: 1, wallet: "0xABC...1234", score: 98.7 },
    { rank: 2, wallet: "0xDEF...5678", score: 96.3 },
    { rank: 3, wallet: "0xGHI...9101", score: 94.8 },
    { rank: 4, wallet: "0xJKL...1121", score: 93.5 },
    { rank: 5, wallet: "0xMNO...3141", score: 92.1 },
    { rank: 6, wallet: "0xPQR...5161", score: 91.8 },
    { rank: 7, wallet: "0xSTU...7181", score: 90.5 },
    { rank: 8, wallet: "0xVWX...9202", score: 89.7 },
    { rank: 9, wallet: "0xYZ1...1222", score: 88.9 },
    { rank: 10, wallet: "0x234...3242", score: 87.6 },
  ];

  const rules = [
    "No external datasets allowed.",
    "Submissions must be made before the deadline.",
    "AI models must not use pre-trained datasets.",
    "Each user can submit only one prediction file per day.",
  ];

  const prizes = [
    { place: 1, medal: "🥇", amount: 2.0 },
    { place: 2, medal: "🥈", amount: 1.5 },
    { place: 3, medal: "🥉", amount: 1.0 },
    { place: "4-10", medal: "🏅", amount: 0.4 }
  ];

  const platformFeeAmount = contestData.totalPrize * contestData.platformFee;

  const datasetSample = [
    { customer_id: "CUST_001", age: 25, transactions: 15, subscription: "Premium", churn_probability: 0.05 },
    { customer_id: "CUST_002", age: 32, transactions: 30, subscription: "Standard", churn_probability: 0.35 },
    { customer_id: "CUST_003", age: 28, transactions: 22, subscription: "Basic", churn_probability: 0.15 },
    { customer_id: "CUST_004", age: 40, transactions: 45, subscription: "Premium", churn_probability: 0.02 },
    { customer_id: "CUST_005", age: 22, transactions: 10, subscription: "Basic", churn_probability: 0.40 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="ml-60 max-w-5xl h-64 bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('/api/placeholder/1200/600')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            {contestData.title}
          </h1>
          <p className="text-xl text-center mb-6 max-w-3xl">
            {contestData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Ending in: {contestData.endingIn}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">Registered: {contestData.participants}</span>
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
                      {leaderboardData.map((entry) => (
                        <TableRow 
                          key={entry.rank}
                          className={entry.rank <= 3 ? "bg-yellow-50" : ""}
                        >
                          <TableCell className="font-medium">
                            {entry.rank === 1 ? "🥇" : 
                             entry.rank === 2 ? "🥈" : 
                             entry.rank === 3 ? "🥉" : 
                             `${entry.rank}️⃣`}
                          </TableCell>
                          <TableCell>{entry.wallet}</TableCell>
                          <TableCell className="text-right font-medium">
                            {entry.score.toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contest Details</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Smart Contract Address</h3>
                    <div className="flex items-center">
                      <code className="bg-gray-100 px-2 py-1 rounded">{contestData.contractAddress}</code>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Host</h3>
                    <div className="flex items-center">
                      <code className="bg-gray-100 px-2 py-1 rounded">{contestData.hostWallet}</code>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">Total Prize Pool</h3>
                      <p className="text-xl font-bold">{contestData.totalPrize} ETH 💰</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">Deadline</h3>
                      <p className="text-xl font-bold">{contestData.deadline}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Contest Description</h3>
                    <p className="text-gray-800">{contestData.description}</p>
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
                      All participants must adhere to these rules to be eligible for prizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {rules.map((rule, index) => (
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
                        How the {contestData.totalPrize} ETH prize pool is distributed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {prizes.map((prize) => (
                          <li key={prize.place} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">
                              {typeof prize.place === 'number' 
                                ? `${prize.place}${prize.place === 1 ? 'st' : prize.place === 2 ? 'nd' : 'rd'} Place` 
                                : `${prize.place} Places`} {prize.medal}
                            </span>
                            <span className="text-lg font-bold">{prize.amount.toFixed(1)} ETH</span>
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
                          <span className="font-bold">{contestData.totalPrize} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee (2%):</span>
                          <span>{platformFeeAmount.toFixed(2)} ETH</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span>Net Prize Distribution:</span>
                          <span className="font-bold">{(contestData.totalPrize - platformFeeAmount).toFixed(2)} ETH</span>
                        </div>
                        
                        <div className="pt-4">
                          <p className="text-sm text-gray-600">
                            Prizes will be distributed automatically to winners' wallets after the contest ends.
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <FileDown className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-bold">Format</h3>
                      <p>CSV</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <Database className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-bold">Size</h3>
                      <p>10MB</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <Users className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-bold">Records</h3>
                      <p>50,000 Customers</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Dataset Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      The dataset contains customer demographics, usage patterns, and past transactions. 
                      Use it to predict customer churn probability.
                    </p>
                    <h3 className="font-bold mt-4 mb-2">Submission Guidelines</h3>
                    <p>
                      Submit predictions in CSV format with customer IDs and predicted churn probabilities.
                    </p>
                  </CardContent>
                </Card>
                
                <h3 className="font-bold text-lg mb-2">Data Preview</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Subscription Type</TableHead>
                        <TableHead>Churn Probability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datasetSample.map((row) => (
                        <TableRow key={row.customer_id}>
                          <TableCell className="font-mono">{row.customer_id}</TableCell>
                          <TableCell>{row.age}</TableCell>
                          <TableCell>{row.transactions}</TableCell>
                          <TableCell>{row.subscription}</TableCell>
                          <TableCell>{row.churn_probability.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
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