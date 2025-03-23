// src/utils/firebaseService.js
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// Create a new contest
export async function createContest(contestData) {
  try {
    // Check if running in browser
    if (typeof window === 'undefined') {
      throw new Error('This function can only be run on the client side');
    }

    // Format the data according to your schema
    const formattedData = {
      metadata: {
        title: contestData.title,
        subtitle: contestData.subtitle,
        description: contestData.description,
        endDate: contestData.endDate,
        createdAt: serverTimestamp(),
        status: 'ongoing',
        datasetName: contestData.datasetName,
        datasetUrl: contestData.datasetUrl,
        image: contestData.image
      },
      prizes: {
        totalPrizePool: parseFloat(contestData.totalPrizePool),
        platformFee: 0.02, // 2% fixed fee
        winners: contestData.winners.map(winner => ({
          place: winner.place,
          amount: parseFloat(winner.amount) || 0,
          icon: winner.icon
        }))
      },
      contract: {
        address: contestData.contractAddress,
        chain: "Ethereum",
        chainId: 1,
        explorerUrl: `https://etherscan.io/address/${contestData.contractAddress}`,
        owner: contestData.contractOwner
      },
      rules: contestData.rules || [
        "No external datasets allowed.",
        "Submissions must be made before the deadline.",
        "AI models must not use pre-trained datasets.",
        "Each user can submit only one prediction file per day."
      ],
      participants: {
        count: 0,
        list: []
      },
      hostInfo: {
        wallet: contestData.hostWallet
      },
      timeInfo: {
        endingIn: calculateTimeRemaining(new Date(contestData.endDate)),
        deadline: new Date(contestData.endDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    };

    // Add the document to Firestore
    const docRef = await addDoc(collection(db, "contests"), formattedData);
    console.log("Contest created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating contest:", error);
    throw error;
  }
}

// Get a single contest by ID
export async function getContest(contestId) {
  try {
    // Check if running in browser
    if (typeof window === 'undefined') {
      return null; // Return null or mock data for SSR
    }
    
    const docRef = doc(db, "contests", contestId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Add the ID to the returned data
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such contest!");
      return null;
    }
  } catch (error) {
    console.error("Error getting contest:", error);
    throw error;
  }
}

// Get all ongoing contests
export async function getOngoingContests() {
  try {
    // Check if running in browser
    if (typeof window === 'undefined') {
      return []; // Return empty array or mock data for SSR
    }
    
    const contestsQuery = query(
      collection(db, "contests"),
      where("metadata.status", "==", "ongoing"),
      orderBy("metadata.createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(contestsQuery);
    const contests = [];
    
    querySnapshot.forEach((doc) => {
      contests.push({ id: doc.id, ...doc.data() });
    });
    
    return contests;
  } catch (error) {
    console.error("Error getting ongoing contests:", error);
    return [];
  }
}

// Get all past contests
export async function getPastContests() {
  try {
    // Check if running in browser
    if (typeof window === 'undefined') {
      return []; // Return empty array or mock data for SSR
    }
    
    const contestsQuery = query(
      collection(db, "contests"),
      where("metadata.status", "==", "past"),
      orderBy("metadata.createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(contestsQuery);
    const contests = [];
    
    querySnapshot.forEach((doc) => {
      contests.push({ id: doc.id, ...doc.data() });
    });
    
    return contests;
  } catch (error) {
    console.error("Error getting past contests:", error);
    return [];
  }
}

// Helper function to calculate time remaining
function calculateTimeRemaining(endDate) {
  const now = new Date();
  const diff = endDate - now;
  
  if (diff <= 0) return "Ended";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return `${days}d ${hours}h`;
}