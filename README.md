# StudyNook

StudyNook is a responsive Next.js frontend for discovering, listing, and reserving private library study rooms. It connects to an existing REST API and uses secure, HTTP-only cookie authentication.

## Links

- Live URL: `https://your-studynook-client.example.com`
- Client repository: `https://github.com/your-account/studynook-clint`
- Server repository: `https://github.com/your-account/studynook-server`

## Key features

- Search rooms by name and filter by multiple amenities with shareable URL parameters
- Email/password registration and login, plus Google Identity Services login
- Secure JWT sessions through HTTP-only cookies—tokens never enter browser storage
- Room details with amenities, owner information, booking count, and ownership controls
- Create, edit, and delete personal room listings with custom confirmations
- Live booking cost calculation, conflict handling, and date/time validation
- Booking history with status-aware cancellation controls
- Responsive, accessible interface with loading, empty, not-found, and error states

## Technologies

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, React Context API, native Fetch API, Sonner, Lucide React, and Google Identity Services.

## Local installation

1. Install Node.js 20.9 or newer.
2. Clone the client repository and enter its directory.
3. Install dependencies with `npm install`.
4. Copy `.env.example` to `.env.local` and update both values.
5. Start the backend API.
6. Run `npm run dev` and open `http://localhost:3000`.

## Environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

`NEXT_PUBLIC_API_URL` is the backend origin without a trailing `/api` path. `NEXT_PUBLIC_GOOGLE_CLIENT_ID` comes from a Google Cloud OAuth web client configured for the client origin.

## Authentication

The app checks `GET /api/auth/me` on initial load and keeps protected content behind an authentication loading state. Login responses establish JWT sessions through backend-managed HTTP-only cookies. Every API request includes credentials, and logout invalidates the cookie through the backend. No token is read by JavaScript or stored in `localStorage` or `sessionStorage`.

## API integration

All backend calls pass through the shared client in `src/lib/api.ts`. It reads the API URL from the environment, includes cookies, adds JSON headers when appropriate, normalizes backend errors, and throws a reusable `ApiError` with HTTP status and validation details. Feature-specific functions live in `src/services` for authentication, rooms, and bookings.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
