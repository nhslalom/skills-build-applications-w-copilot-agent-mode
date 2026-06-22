# API Configuration and Vite Environment Variables

## Overview

The OctoFit Tracker frontend uses Vite's environment variables to configure API endpoints for GitHub Codespace deployments. This document explains how to set up and use these variables.

## VITE_CODESPACE_NAME

This is the primary environment variable required for the application to work correctly in a GitHub Codespace.

### What It Does

The `VITE_CODESPACE_NAME` variable is used to construct the API base URL:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

For example:
- If `VITE_CODESPACE_NAME=john-codespace-abc123`, the API URL becomes:
  ```
  https://john-codespace-abc123-8000.app.github.dev/api
  ```

### How to Set It

#### 1. Create `.env.local` File

Create a `.env.local` file in the `octofit-tracker/frontend/` directory:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

**Replace `your-codespace-name`** with your actual Codespace name.

#### 2. Find Your Codespace Name

Your Codespace name appears in:
- The URL bar when using the Codespace: `https://your-codespace-name-{hash}.app.github.dev/`
- GitHub's Codespaces page under your repository
- Terminal prompt if configured

#### 3. Example

If your Codespace URL is:
```
https://nhslalom-beautiful-tribble-v4qwgr5w5h.app.github.dev/
```

Set:
```bash
VITE_CODESPACE_NAME=nhslalom-beautiful-tribble-v4qwgr5w5h
```

## Environment Variable Syntax in Code

Throughout the frontend code, environment variables are accessed using:

```javascript
import.meta.env.VITE_CODESPACE_NAME
```

This is the standard Vite way to access environment variables that start with `VITE_` prefix.

### Example Usage in Components

```javascript
import { apiConfig } from '../utils/apiConfig';

// In a component:
console.log(apiConfig.baseUrl);
// Output: https://your-codespace-name-8000.app.github.dev/api
```

## Safe Fallback Behavior

If `VITE_CODESPACE_NAME` is not set or is set to the placeholder value `your-codespace-name`, the application will:

1. Log a warning in the browser console
2. Fall back to `http://localhost:8000/api`

This allows development without proper Codespace configuration but should not be relied upon for production.

## API Endpoints

Once configured, the following endpoints become available:

| Component | Endpoint |
|-----------|----------|
| Activities | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` |
| Leaderboard | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` |
| Teams | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` |
| Users | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` |
| Workouts | `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` |

## Response Format Handling

The API client handles both response formats:

### Direct Array
```json
[
  { "_id": "1", "name": "Running" },
  { "_id": "2", "name": "Cycling" }
]
```

### Paginated Response
```json
{
  "data": [
    { "_id": "1", "name": "Running" },
    { "_id": "2", "name": "Cycling" }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 2
}
```

The `fetchApi` function automatically handles both formats and returns the data array.

## Development Workflow

1. **Create `.env.local`**:
   ```bash
   echo "VITE_CODESPACE_NAME=your-codespace-name" > .env.local
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Access application**:
   Open `http://localhost:5173` in your browser

4. **Verify API connectivity**:
   - Open DevTools (F12)
   - Go to Network tab
   - Navigate to any page that loads data
   - Check that API requests go to the correct URL

## Troubleshooting

### Problem: "VITE_CODESPACE_NAME is not set" warning

**Solution**: Create `.env.local` with the correct Codespace name.

### Problem: API requests failing with 404

**Solutions**:
- Verify the Codespace name is correct
- Check that the backend server is running on port 8000
- Verify port 8000 is forwarded in the Codespace

### Problem: API requests failing with CORS error

**Solutions**:
- Check that backend is configured to accept requests from the frontend origin
- Verify both frontend and backend are deployed in the same Codespace
- Check browser console for exact CORS error message

### Problem: Undefined in API URLs

**Solution**: If you see URLs like `https://undefined-8000.app.github.dev/...`:
1. Check `.env.local` exists in the frontend directory
2. Verify `VITE_CODESPACE_NAME` is not empty
3. Restart the dev server: `npm run dev`
4. Clear browser cache

## Production Deployment

For production deployments:

1. Set environment variables through your deployment platform
2. Build the application: `npm run build`
3. Deploy the `dist/` directory to your hosting platform

## Additional Vite Information

For more information on Vite environment variables, see:
- [Vite Documentation - Env Variables](https://vitejs.dev/guide/env-and-modes.html)
