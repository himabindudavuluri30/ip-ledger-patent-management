# IP Ledger — Blockchain-Based Patent Ownership and Intellectual Property Management System

## Demo

**Live Demo:** [Click here to view IP Ledger](https://ip-ledger-uxh0.bolt.host)

## Overview

IP Ledger is a web-based system designed to support secure, transparent, and traceable management of patent ownership records and intellectual property information using blockchain-inspired technology.

The system helps users submit invention details, manage ownership-related workflows, verify document integrity, and maintain an audit trail of important activities.

## Objectives

- Maintain transparent records of invention and ownership-related activities.
- Verify document integrity using SHA-256 hashing.
- Support approval, rejection, and dispute workflows.
- Maintain an audit trail for important operations.
- Provide a user-friendly interface for managing intellectual property records.

## Key Features

- **Invention Management:** Create and manage invention records.
- **Document Integrity:** Generate SHA-256 hashes to help detect document modifications.
- **Workflow Management:** Track proposed, pending approval, approved, rejected, and disputed records.
- **Verification:** Check document hashes against recorded values.
- **Ownership Transfers:** Support ownership-transfer workflows.
- **Audit Trail:** Review recorded system activities.
- **Simulation Mode:** Explore the application's core features without requiring a live blockchain network.

## Technology Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Cryptography:** SHA-256 document hashing
- **Database Integration:** Supabase / Bolt Database
- **Blockchain Approach:** Designed around a permissioned blockchain architecture, with Hyperledger Fabric as the proposed framework

## How It Works

1. A user submits invention information and supporting documents.
2. The application processes the document and generates a SHA-256 hash.
3. The record moves through the relevant approval workflow.
4. The system supports verification and auditing of recorded information.
5. Ownership transfers and disputes can be tracked through their respective workflows.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/ip-ledger.git
cd ip-ledger
```

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
copy .env.example .env
```

Configure the required environment variables using your database project's settings. Never commit your `.env` file or expose real credentials.

Apply the database migration using the appropriate database dashboard or migration workflow, if required.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Current Implementation Status

The current application runs in **Simulation Mode**. A live Hyperledger Fabric network is not configured by default. Blockchain-related operations should therefore be understood as application-level demonstrations unless a real blockchain network has been integrated and verified.

The system supports intellectual property record management; it does not itself grant patents or replace the authority of an official patent office.

## Future Enhancements

- Integrate a live Hyperledger Fabric network.
- Implement blockchain smart contracts (chaincode).
- Add secure digital-signature verification.
- Integrate official patent registry services where available.
- Strengthen authentication, authorization, and dispute-resolution workflows.
- Expand automated testing and security validation.

## Security

- Never commit `.env` files, API keys, database credentials, or passwords.
- Use `.env.example` to document required environment variables with placeholders.
- Restrict database access according to least-privilege principles.

## Author

Developed as an academic project focused on blockchain technology and intellectual property management.

## License

No license has been specified yet. All rights are reserved unless a license is added to this repository.
