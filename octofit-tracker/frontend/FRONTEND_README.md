# OctoFit Tracker - Frontend

A React 19 + Vite application for the OctoFit Tracker multi-tier application. This frontend provides a user interface for tracking fitness activities, viewing leaderboards, managing teams, and discovering personalized workouts.

## Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM v7** - Client-side routing for navigation
- **Bootstrap 5** - Responsive UI styling

## Project Structure

```
src/
├── components/          # React components for each section
│   ├── Home.jsx        # Landing page
│   ├── Activities.jsx  # Activity tracking view
│   ├── Leaderboard.jsx # Competitive rankings
│   ├── Teams.jsx       # Team management
│   ├── Users.jsx       # User profiles
│   └── Workouts.jsx    # Personalized workout suggestions
├── utils/
│   └── apiConfig.js    # API configuration and helpers
├── App.jsx             # Main app with routing
├── main.jsx            # React entry point
└── .env.local          # Environment variables (local)
```

## Environment Variables

The application requires the `VITE_CODESPACE_NAME` environment variable to construct API endpoints.

### Setup

1. **Create `.env.local`** in the frontend directory:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

Replace `your-codespace-name` with your actual GitHub Codespace name (e.g., `username-codespace-xyz`).

2. **For development**, if running locally without a Codespace, you can use:

```bash
VITE_CODESPACE_NAME=localhost
```

The API configuration will fall back to `http://localhost:8000/api` in this case.

## API Endpoints

The application uses the following API endpoint pattern:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

### Supported Endpoints

- `GET /api/activities/` - List all activities
- `GET /api/leaderboard/` - Get leaderboard entries
- `GET /api/teams/` - List teams
- `GET /api/users/` - List users
- `GET /api/workouts/` - List available workouts

### Response Handling

The API client (`apiConfig.js`) handles both:
- **Direct array responses**: `[...]`
- **Paginated responses**: `{ data: [...], total, page, pageSize }`

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

```bash
cd octofit-tracker/frontend
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Navigation

The application uses React Router for client-side navigation. The main routes are:

- `/` - Home page
- `/activities` - Activities view
- `/leaderboard` - Leaderboard rankings
- `/teams` - Teams directory
- `/users` - User profiles
- `/workouts` - Workout suggestions

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Bootstrap Styling** - Professional UI with Bootstrap components
- **API Integration** - Fetches data from the Express backend
- **Error Handling** - Graceful error messages for failed requests
- **Loading States** - User feedback during data fetching
- **Safe API Configuration** - Fallback for missing environment variables

## Important Notes

- **VITE_CODESPACE_NAME Required**: Without proper configuration, API calls will use a fallback URL. Set `VITE_CODESPACE_NAME` in `.env.local` for correct operation.
- **CORS Handling**: Ensure the backend is configured to accept requests from the frontend's origin.
- **Backend Port**: The backend API server must be running on port 8000.

## Troubleshooting

### API Requests Failing

1. Check that `VITE_CODESPACE_NAME` is set in `.env.local`
2. Verify the backend server is running on port 8000
3. Check browser console for CORS errors
4. Verify the API endpoint is correct in the Network tab

### Components Not Loading

1. Clear the browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
2. Restart the dev server: `npm run dev`
3. Check browser console for JavaScript errors

### Styling Issues

1. Ensure Bootstrap CSS is loaded: Check `<link>` tag in DevTools
2. Run `npm install` to ensure all dependencies are installed
3. Restart the dev server

## Contributing

When modifying components:

1. Keep components focused on a single responsibility
2. Use the `fetchApi` helper from `apiConfig.js` for all API calls
3. Maintain Bootstrap class naming conventions
4. Test with both paginated and direct array responses from the API
