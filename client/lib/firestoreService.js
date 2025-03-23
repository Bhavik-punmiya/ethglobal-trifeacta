// src/lib/firestoreService.js
import { db } from "./firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	query,
	where,
	orderBy,
	limit,
	deleteDoc,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";

// Contest operations
export async function createContest(contestData) {
	const contestRef = doc(collection(db, "contests"));
	const contestWithTimestamp = {
		...contestData,
		metadata: {
			...contestData.metadata,
			createdAt: serverTimestamp(),
		},
	};
	await setDoc(contestRef, contestWithTimestamp);
	return contestRef.id;
}

export async function getContest(contestId) {
	const contestRef = doc(db, "contests", contestId);
	const contestSnap = await getDoc(contestRef);

	if (contestSnap.exists()) {
		return { id: contestSnap.id, ...contestSnap.data() };
	}
	return null;
}

export async function getContests(status = "ongoing", limitCount = 10) {
	const contestsQuery = query(
		collection(db, "contests"),
		where("metadata.status", "==", status),
		orderBy("metadata.createdAt", "desc"),
		limit(limitCount),
	);

	const querySnapshot = await getDocs(contestsQuery);
	const contests = [];

	querySnapshot.forEach((doc) => {
		contests.push({ id: doc.id, ...doc.data() });
	});

	return contests;
}

export async function updateContest(contestId, updateData) {
	const contestRef = doc(db, "contests", contestId);
	await updateDoc(contestRef, updateData);
}

// Submission operations
export async function submitModel(contestId, walletAddress, accuracy) {
	const submissionData = {
		contestId,
		wallet: walletAddress,
		modelAccuracy: accuracy,
		submittedAt: serverTimestamp(),
	};

	const submissionRef = doc(collection(db, "submissions"));
	await setDoc(submissionRef, submissionData);

	// Update the participants list in the contest
	const contestRef = doc(db, "contests", contestId);
	const contestData = await getDoc(contestRef);

	if (contestData.exists()) {
		const participants = contestData.data().participants || {
			count: 0,
			list: [],
		};

		// Check if this wallet has already submitted
		const existingParticipant = participants.list.find(
			(p) => p.wallet === walletAddress,
		);

		if (existingParticipant) {
			// Update existing submission
			existingParticipant.modelAccuracy = accuracy;
			existingParticipant.submittedAt = new Date().toISOString();
		} else {
			// Add new participant
			participants.list.push({
				wallet: walletAddress,
				modelAccuracy: accuracy,
				submittedAt: new Date().toISOString(),
			});
			participants.count++;
		}

		// Sort participants by accuracy and update ranks
		participants.list.sort((a, b) => b.modelAccuracy - a.modelAccuracy);
		participants.list.forEach((p, idx) => {
			p.rank = idx + 1;
		});

		await updateDoc(contestRef, { participants });
	}

	return submissionRef.id;
}