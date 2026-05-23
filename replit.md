# OpenBSP UI (wakit)

An open-source, web-based interface for the WhatsApp Business Platform. Provides a WhatsApp Web-like experience for managing conversations, contacts, AI agents, message templates, and integrations.

## Tech Stack

- **Frontend**: React 19 + Vite (rolldown-vite)
- **State**: Zustand + TanStack Query v5
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS v4 + Ant Design
- **Backend/BaaS**: Supabase (Auth, Database, Realtime)
- **Language**: TypeScript

## Setup

This is a pure frontend SPA that connects to a Supabase backend (the [OpenBSP API](https://github.com/matiasbattocchia/open-bsp-api)).

### Required Environment Variables

Set these in the Secrets tab or update the shared env vars:

- `VITE_SUPABASE_URL` — Your Supabase project URL (e.g. `https://xxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` — Your Supabase anon/public key
- `VITE_META_APP_ID` — (Optional) Meta App ID for WhatsApp Business login
- `VITE_FB_LOGIN_CONFIG_ID` — (Optional) Facebook Login configuration ID

> The default values are placeholders for local Supabase development. Replace them with your actual Supabase project credentials.

## Development

```bash
npm run dev       # Start dev server on port 5000
npm run build     # Build for production (output: dist/)
npm run lint      # Run ESLint
```

## Deployment

Configured as a **static** site deployment:
- Build command: `npm run build`
- Output directory: `dist/`

## User Preferences

- Keep existing project structure and conventions
