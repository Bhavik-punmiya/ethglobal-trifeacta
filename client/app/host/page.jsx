// app/host/page.jsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  Medal,
  Award,
  Upload,
  Plus,
  Calendar as CalendarIcon,
  FileUp,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { createContest } from "@/lib/firebase-utils";

export default function CreateCompetition() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [winners, setWinners] = useState([
    { place: 1, amount: "", icon: "🥇" },
    { place: 2, amount: "", icon: "🥈" },
    { place: 3, amount: "", icon: "🥉" },
  ]);
  const [endDate, setEndDate] = useState(new Date());
  const [dataset, setDataset] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [datasetName, setDatasetName] = useState("");
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingDataset, setIsDraggingDataset] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef(null);
  const datasetInputRef = useRef(null);
  const router = useRouter();

  // Calculate total prize pool
  const calculateTotalPrize = () => {
    return winners
      .reduce((total, winner) => {
        return total + (parseFloat(winner.amount) || 0);
      }, 0)
      .toFixed(2);
  };

  // Handle winner prize amount change
  const handleWinnerChange = (index, value) => {
    const newWinners = [...winners];
    newWinners[index].amount = value;
    setWinners(newWinners);
  };

  // Add additional winner
  const addWinner = () => {
    setWinners([
      ...winners,
      {
        place: winners.length + 1,
        amount: "",
        icon: "🏅",
      },
    ]);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle dataset upload
  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDataset(file);
      setDatasetName(file.name);
    }
  };

  // Handle image drag and drop
  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDraggingImage(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDatasetDrop = (e) => {
    e.preventDefault();
    setIsDraggingDataset(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setDataset(file);
      setDatasetName(file.name);
    }
  };

  const handleDragOver = (e, setDragging) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (setDragging) => {
    setDragging(false);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const removeDataset = () => {
    setDataset(null);
    setDatasetName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (calculateTotalPrize() <= 0) {
      alert("Please set prize amounts for winners");
      return;
    }

    if (!image) {
      alert("Please upload a contest image");
      return;
    }

    if (!dataset) {
      alert("Please upload a dataset");
      return;
    }

    try {
      setIsSubmitting(true);

      // TODO: Upload image and dataset to Firebase Storage
      // For now, we'll just use placeholder URLs
      const imageUrl = imagePreview || "/api/placeholder/400/200";
      const datasetUrl = "/datasets/placeholder.csv";

      // Mock contract address for now (would come from your smart contract deployment)
      const contractAddress =
        "0x" + Math.random().toString(16).substring(2, 10) + "...ABCD";
      const hostWallet =
        "0x" + Math.random().toString(16).substring(2, 10) + "...5678";

      // Prepare the contest data
      const contestData = {
        title,
        subtitle,
        description,
        endDate: endDate.toISOString(),
        datasetName: datasetName,
        datasetUrl: datasetUrl,
        image: imageUrl,
        winners,
        totalPrizePool: calculateTotalPrize(),
        contractAddress,
        contractOwner: hostWallet,
        hostWallet,
        rules: [
          "No external datasets allowed.",
          "Submissions must be made before the deadline.",
          "AI models must not use pre-trained datasets.",
          "Each user can submit only one prediction file per day.",
        ],
      };

      // Create the contest in Firestore
      const contestId = await createContest(contestData);

      // Navigate to the new contest page
      router.push(`/contest/${contestId}`);
    } catch (error) {
      console.error("Error creating contest:", error);
      alert("Failed to create contest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Create a Competition
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contest Image Upload */}
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                isDraggingImage
                  ? "bg-blue-50 border-blue-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => imageInputRef.current.click()}
              onDragOver={(e) => handleDragOver(e, setIsDraggingImage)}
              onDragLeave={() => handleDragLeave(setIsDraggingImage)}
              onDrop={handleImageDrop}
            >
              <input
                ref={imageInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Contest preview"
                    className="max-h-48 rounded mx-auto"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-lg font-medium">
                    Upload your contest display image
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended size: 1200x600px
                  </p>
                </>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <Input
                placeholder="Enter contest title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg py-6"
                required
              />
              <Input
                placeholder="Enter a short tagline for your contest"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="py-5"
                required
              />
            </div>

            {/* Description */}
            <Textarea
              placeholder="Describe your contest in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 p-4"
              required
            />

            {/* Winners & Prize Distribution */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                <h3 className="text-xl font-semibold">Winners & Prizes</h3>
              </div>

              <div className="space-y-4">
                {winners.map((winner, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 text-center text-xl">
                      {winner.icon}
                    </div>
                    <div className="font-medium w-16">
                      {winner.place === 1
                        ? "1st"
                        : winner.place === 2
                        ? "2nd"
                        : winner.place === 3
                        ? "3rd"
                        : `${winner.place}th`}
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={winner.amount}
                          onChange={(e) =>
                            handleWinnerChange(index, e.target.value)
                          }
                          className="pl-12 py-2"
                          required={index < 3} // First 3 winners are required
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          ETH
                        </div>
                      </div>
                    </div>
                    {index > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          const newWinners = [...winners];
                          newWinners.splice(index, 1);
                          setWinners(newWinners);
                        }}
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addWinner}
                  className="mt-4"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add More Winners
                </Button>

                <div className="mt-6 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                  <span className="font-medium">Total Prize Pool:</span>
                  <span className="text-lg font-bold">
                    {calculateTotalPrize()} ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Contest End Date - with Popover Calendar */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                <h3 className="text-xl font-semibold">Contest End Date</h3>
              </div>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-14 border-gray-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Dataset Upload */}
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                isDraggingDataset
                  ? "bg-blue-50 border-blue-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => datasetInputRef.current.click()}
              onDragOver={(e) => handleDragOver(e, setIsDraggingDataset)}
              onDragLeave={() => handleDragLeave(setIsDraggingDataset)}
              onDrop={handleDatasetDrop}
            >
              <input
                ref={datasetInputRef}
                type="file"
                className="hidden"
                accept=".csv,.json,.zip"
                onChange={handleDatasetUpload}
              />

              {datasetName ? (
                <div>
                  <FileUp className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <p className="font-medium">{datasetName}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDataset();
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <>
                  <FileUp className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-lg font-medium">Upload your dataset</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: CSV, JSON, or ZIP
                  </p>
                </>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Contest..." : "Create Contest"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
