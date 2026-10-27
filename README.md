# IP Ledger — Blockchain-Based Patent Ownership & IP Management

A demonstrable full-stack application for intellectual-property record management and document-integrity verification, with a Hyperledger Fabric simulation layer and documented real-Fabric integration path.

> **Notice:** This application supports intellectual-property record management and document-integrity verification. Blockchain records do not independently grant patents or determine legal ownership. Official patent status and legal rights must be verified through appropriate authorities and applicable legal procedures. All data shown in the demo is synthetic DEMO DATA.

## Tech stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (navy/white/cyan theme)
- **Database:** Supabase (PostgreSQL) — persistent records, RLS-enabled
- **Hashing:** Web Crypto API (SHA-256), client-side
- **Blockchain:** Simulation mode (default) + documented Hyperledger Fabric integration path

## Quick start (demo mode — no paid APIs)

```bash
npm install
npm run dev
```

The app runs in **SIMULATION MODE** out of the box. No Hyperledger Fabric installation is required.

### Build

```bash
npm run build      # production build to dist/
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Database setup

The Supabase project is provisioned automatically. The schema migration is applied via the Supabase MCP tool (`mcp__supabase__apply_migration`) and lives in `supabase/migrations/`. Tables:

- `inventions` — patent ownership records with state-machine status
- `documents` — file metadata + SHA-256 hashes (file contents are never stored)
- `licenses` — license records
- `transfers` — ownership transfer requests
- `disputes` — disputes raised against inventions/transfers
- `audit_events` — append-only event log with transaction mode + status

All tables have RLS enabled with anon+authenticated CRUD (single-tenant demo).

## Environment variables

Supabase vars are pre-populated in `.env`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

For local Hyperledger Fabric integration (not available in hosted tier), see the Settings page in-app or the template below — these stay in the **backend** `.env` only and are never exposed to the browser:

```
FABRIC_ENDPOINT=localhost:7051
FABRIC_CHANNEL=mychannel
FABRIC_MSP_ID=Org1MSP
FABRIC_CERT_PATH=./crypto/.../cert.pem
FABRIC_KEY_PATH=./crypto/.../priv_sk
FABRIC_TLS_CERT_PATH=./crypto/.../tls/ca.crt
```

## Features

- Dashboard with stats computed from real records
- Role switcher (Inventor / Institution/IP Administrator / Rights Holder / Licensee / Auditor)
- Invention registration with file upload, validation, SHA-256 hashing
- Document integrity verification (MATCH / MISMATCH / UNAVAILABLE)
- Ownership workflow state machine (PROPOSED → PENDING_APPROVAL → APPROVED → RECORDED → COMPLETED; REJECTED / DISPUTED alternatives)
- Licensing management (request, approve, activate, terminate)
- Ownership transfers (request, approve, complete; blocked when disputed)
- Searchable, exportable audit history with SIMULATED / HYPERLEDGER FABRIC transaction modes
- Built-in 12-test executable test suite
- Sample data loader (Smart Irrigation Controller, AI Speech Recognition, Battery Management)
- Persistent SIMULATION MODE / FABRIC CONNECTED indicator
- Legal & security notices throughout

## Hyperledger Fabric integration

See the **Settings** page in the app for the full chaincode source (Go), the Node.js + Fabric Gateway backend integration code, the `.env` template, and step-by-step test-network setup instructions.

REAL FABRIC MODE is only enabled after a backend `verifyConnection()` call confirms a genuine committed transaction. A successful simulation never activates it.

## Hosted environment note

This Bolt-hosted deployment runs the React frontend + Supabase backend. A separate Node.js/Express backend and Docker (required for a real Fabric network) are not available in the hosted tier, so the app runs in SIMULATION MODE here. The Fabric chaincode and backend code are provided for local deployment.

## Running on Windows (step by step)

1. **Install Node.js 18+** — Download the LTS installer from https://nodejs.org and run it. Accept the default options (the installer adds Node to your PATH automatically). Verify in a new **Command Prompt** or **PowerShell**:
   ```powershell
   node -v
   npm -v
   ```
   Both should print a version number.

2. **Extract the project ZIP** — Right-click `ip-ledger.zip` → **Extract All…** → choose a folder, e.g. `C:\Users\YourName\Projects\ip-ledger`. Avoid paths with spaces if possible.

3. **Open a terminal in the project folder** — In File Explorer, navigate to the extracted folder, then in the address bar type `cmd` and press Enter. Or open PowerShell and `cd` into it:
   ```powershell
   cd C:\Users\YourName\Projects\ip-ledger
   ```

4. **Configure environment variables** — Copy `.env.example` to `.env` in the project root:
   ```powershell
   copy .env.example .env
   ```
   Open `.env` in Notepad and fill in your Supabase project URL and anon key (these come from your Supabase project dashboard → Settings → API):
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   Save and close. The Hyperledger Fabric variables at the bottom of `.env.example` are for optional local Fabric deployment only — leave them as-is for demo mode.

5. **Apply the database schema** — The SQL migration in `supabase/migrations/20261025092401_create_ip_ledger_schema.sql` must be run against your Supabase project. Either:
   - Open the Supabase Dashboard → **SQL Editor** → paste the contents of that file → **Run**, or
   - Use the Supabase CLI: `supabase db push` (requires Supabase CLI installed and linked).

6. **Install dependencies** — In the terminal:
   ```powershell
   npm install
   ```
   This downloads all required packages into `node_modules/`. It may take a few minutes on first run.

7. **Start the development server**:
   ```powershell
   npm run dev
   ```
   Vite prints a local URL like `http://localhost:5173`. Open it in your browser. The app runs in **SIMULATION MODE** by default — no Hyperledger Fabric installation is required.

8. **Build for production** (optional):
   ```powershell
   npm run build
   npm run preview
   ```
   `npm run build` outputs optimized files to `dist/`. `npm run preview` serves the production build locally.

### Windows troubleshooting

- **`npm` not recognized** — Restart your terminal after installing Node.js so PATH updates take effect. If still failing, re-run the Node installer and check "Add to PATH".
- **Long path errors during `npm install`** — Enable long paths: open PowerShell as Administrator and run `New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force`, then retry.
- **Port 5173 already in use** — Vite will auto-pick the next free port; check the terminal output for the actual URL.
- **Blank page after `npm run dev`** — Check the browser console (F12). If you see a Supabase connection error, verify `.env` has valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values and that the migration from step 5 was applied.
