# Decentralized Machine Learning Contest Platform with TEE-Based Model Accuracy

This project is a decentralized, Kaggle-inspired platform designed to host machine learning contests with robust security and privacy. The platform leverages TEE (Trusted Execution Environment) to securely compute the accuracy of submitted models, ensuring that the evaluation process is both fair and tamper-proof.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Pages](#pages)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [JSON Schema](#json-schema)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This platform allows users to create and participate in machine learning contests where the model evaluation—specifically the computation of model accuracy—is performed securely within a TEE. Contests are launched via the **/create** page and are managed by smart contracts, ensuring transparency and automated prize payouts based on securely computed scores.

## Features
- **Contest Creation:**  
  Users create contests by entering key details on the **/create** page, including title, subtitle, description, dataset details, and image links. Each contest deploys a smart contract to govern its rules and prize distribution.

- **TEE-Based Model Accuracy:**  
  Participants submit their machine learning models for evaluation. The model accuracy is computed securely within a TEE, protecting the computation from tampering and ensuring that sensitive data remains confidential.

- **Contest Listings:**  
  The **/contest** page provides a list of active contests with summary information, making it easy for users to find and join contests.

- **Detailed Contest View:**  
  The **/contest/[id]** page displays comprehensive details about a specific contest, including:
  - Contest metadata
  - Smart contract details (address, chain, URL, owner)
  - Contest rules
  - Participant leaderboard with model accuracy scores
  - Submission timestamps

- **Blockchain Integration:**  
  Smart contracts are deployed for each contest to manage funds and ensure that prize distributions are executed automatically based on securely computed model accuracies.

## Pages
- **/create:**  
  A page dedicated to contest creation where users input contest details. On submission, the platform deploys a smart contract that governs the contest.
  
- **/contest:**  
  The main page listing all active contests with key details such as contest title, deadline, prize pool, and participant count.

- **/contest/[id]:**  
  A detailed view of a specific contest. This page includes contest metadata, smart contract information, contest rules, participant submissions, and a leaderboard. It also highlights the secure model accuracy computation using TEE.

## Technology Stack
- **Frontend:** React, Next.js  
- **Backend:** Node.js (for additional APIs if required)
- **Blockchain:** Ethereum or any EVM-compatible chain  
- **Smart Contracts:** Solidity  
- **Security:** TEE (Trusted Execution Environment) for secure computation of model accuracy  
- **Storage:** IPFS/Filecoin (for decentralized file storage, if applicable)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/decentralized-kaggle.git
