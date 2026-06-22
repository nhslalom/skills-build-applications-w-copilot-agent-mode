# React 19 Frontend - Quick Reference Guide

## File Structure Overview

```
octofit-tracker/frontend/
├── .env.local                    # Environment variables (local, not committed)
├── FRONTEND_README.md            # Complete setup guide
├── ENV_SETUP.md                  # Vite environment variable documentation
├── package.json                  # Dependencies & scripts
├── src/
│   ├── App.jsx                   # Main app with routing (replaced)
│   ├── App.css                   # Application styling (updated)
│   ├── main.jsx                  # Entry point (updated)
│   ├── index.css                 # Global styles
│   ├── components/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Activities.jsx        # Activity list view
│   │   ├── Leaderboard.jsx       # Competitive rankings
│   │   ├── Teams.jsx             # Team directory
│   │   ├── Users.jsx             # User profiles
│   │   └── Workouts.jsx          # Workout suggestions
│   └── utils/
│       └── apiConfig.js          # API configuration & fetch helper
```

## Key Components

### App.jsx (Main Application)
- **Purpose**: Application shell with React Router setup
- **Features**:
  - Responsive Bootstrap navbar
  - Client-side routing with 6 main routes
  - Sticky header navigation
  - Footer section
- **Routes**: `/`, `/activities`, `/leaderboard`, `/teams`, `/users`, `/workouts`

### apiConfig.js (API Integration)
- **Purpose**: Centralized API configuration and data fetching
- **Key Functions**:
  - `getApiBaseUrl()` - Constructs base URL from Vite env vars
  - `fetchApi(endpoint, options)` - Wrapper for fetch with error handling
- **Features**:
  - Reads `VITE_CODESPACE_NAME` from environment
  - Falls back to localhost:8000 if env var not set
  - Handles both paginated and array API responses
  - Automatic Content-Type header

### Component Pattern
All data components follow this pattern:
```javascript
1. Import hooks and API utilities
2. Set up state: data, loading, error
3. useEffect() to fetch data on mount
4. Conditional rendering: loading → error → data
5. Use fetchApi() for all API calls
```

## Configuration

### Environment Setup (.env.local)

**Must be created before running the app:**

```bash
# In octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-actual-codespace-name
```

**Example**: If your Codespace URL is `https://john-xyz-123.app.github.dev/`, use:
```
VITE_CODESPACE_NAME=john-xyz-123
```

### API Endpoints

| Component | Endpoint | URL |
|-----------|----------|-----|
| Activities | `/api/activities/` | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` |
| Leaderboard | `/api/leaderboard/` | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` |
| Teams | `/api/teams/` | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` |
| Users | `/api/users/` | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` |
| Workouts | `/api/workouts/` | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` |

## Common Tasks

### Running Development Server
```bash
npm --prefix octofit-tracker/frontend run dev
# Runs at http://localhost:5173
```

### Building for Production
```bash
npm --prefix octofit-tracker/frontend run build
# Output in dist/ directory
```

### Checking Code Quality
```bash
npm --prefix octofit-tracker/frontend run lint
# Uses ESLint to check code
```

### Adding a New Component

1. Create file: `src/components/MyComponent.jsx`
2. Use this template:
   ```javascript
   import { useState, useEffect } from 'react';
   import { fetchApi, apiConfig } from '../utils/apiConfig';
   
   export default function MyComponent() {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       const loadData = async () => {
         try {
           setLoading(true);
           const result = await fetchApi(apiConfig.endpoints.myendpoint);
           setData(Array.isArray(result) ? result : []);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       };
       loadData();
     }, []);
   
     if (loading) return <div className="container py-4"><p>Loading...</p></div>;
     if (error) return <div className="container py-4"><div className="alert alert-danger">Error: {error}</div></div>;
   
     return (
       <div className="container py-4">
         {/* Your component JSX here */}
       </div>
     );
   }
   ```
3. Add route to `App.jsx`:
   ```javascript
   import MyComponent from './components/MyComponent';
   // In Routes:
   <Route path="/mycomponent" element={<MyComponent />} />
   ```
4. Add nav link in App.jsx navbar

## Response Format Handling

The `fetchApi()` helper automatically handles two response formats:

**Direct Array:**
```json
[
  { "_id": "1", "name": "Item 1" },
  { "_id": "2", "name": "Item 2" }
]
```

**Paginated Response:**
```json
{
  "data": [
    { "_id": "1", "name": "Item 1" },
    { "_id": "2", "name": "Item 2" }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 2
}
```

Both return the data array to the component.

## Styling

- **Framework**: Bootstrap 5
- **Custom Styles**: `src/App.css`
- **Bootstrap Classes Used**:
  - Layout: `d-flex`, `flex-column`, `container`, `row`, `col-md-4`
  - Navigation: `navbar`, `navbar-dark`, `nav-link`
  - Cards: `card`, `card-body`, `card-title`, `card-text`
  - Tables: `table`, `table-striped`
  - Alerts: `alert`, `alert-danger`
  - Utilities: `py-4`, `mb-3`, `mt-4`, etc.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API 404 errors | Check VITE_CODESPACE_NAME in .env.local |
| CORS errors | Verify backend CORS configuration |
| "undefined" in URLs | Restart dev server: `npm run dev` |
| ESLint warnings | Run `npm run lint` to check errors |
| Components not rendering | Check browser console for errors |
| Styling issues | Clear cache: Ctrl+Shift+Del (Cmd+Shift+Del on Mac) |

## Dependencies

```json
{
  "bootstrap": "^5.3.8",
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "react-router-dom": "^7.17.0"
}
```

All are already installed via `npm install`.

## Important Notes

✅ All files are ESLint compliant  
✅ React 19 syntax throughout  
✅ Bootstrap responsive design  
✅ Environment variable safety with fallback  
✅ Error and loading state handling  
✅ Dual response format support  

⚠️ **Must set VITE_CODESPACE_NAME** before API calls will work  
⚠️ Backend must be running on port 8000  
⚠️ .env.local is git-ignored (not committed)
