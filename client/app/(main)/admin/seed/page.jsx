// app/admin/seed/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createContest } from "@/utils/firebaseService";

export default function SeedData() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const seedContest = async () => {
    try {
      setLoading(true);
      setResult("");

      // Sample contest data
      const contestData = {
        title: "AI Model Benchmark Challenge",
        subtitle: "Optimize an AI model to win the prize!",
        description:
          "Build and optimize a machine learning model to predict customer churn with the highest accuracy. The winner will be determined based on the model's performance on a hidden test dataset.",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        datasetName: "customer_churn.csv",
        datasetUrl: "/datasets/customer_churn.csv",
        image: "/contest/data-science.webp",
        winners: [
          { place: 1, amount: "5", icon: "🥇" },
          { place: 2, amount: "3", icon: "🥈" },
          { place: 3, amount: "2", icon: "🥉" },
        ],
        totalPrizePool: "10",
        contractAddress: "0x1234...abcd",
        contractOwner: "0x5678...efgh",
        hostWallet: "0x5678...efgh",
        rules: [
          "No external datasets allowed.",
          "Submissions must be made before the deadline.",
          "AI models must not use pre-trained datasets.",
          "Each user can submit only one prediction file per day.",
        ],
      };

      const contestId = await createContest(contestData);
      setResult(`Created contest with ID: ${contestId}`);
    } catch (error) {
      console.error("Error seeding data:", error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Seed Database</h1>
      <Button onClick={seedContest} disabled={loading} className="w-full mb-4">
        {loading ? "Creating Contest..." : "Create Sample Contest"}
      </Button>
      {result && <div className="mt-4 p-3 bg-gray-100 rounded">{result}</div>}
    </div>
  );
}
