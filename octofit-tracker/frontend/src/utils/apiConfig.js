/**
 * API Configuration Utility
 * Provides a safe way to construct API endpoints using Vite environment variables
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (!codespaceName || codespaceName === 'your-codespace-name') {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Please configure it in .env.local'
    );
    // Safe fallback for development without proper configuration
    return 'http://localhost:8000/api';
  }

  if (codespaceName === 'localhost' || codespaceName === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }

  return `https://${codespaceName}-8000.app.github.dev/api`;

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  endpoints: {
    activities: '/activities',
    leaderboard: '/leaderboard',
    teams: '/teams',
    users: '/users',
    workouts: '/workouts',
  },
};

/**
 * Fetch helper that handles both paginated and array responses
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${apiConfig.baseUrl}${endpoint}`;

  try {
    const { headers, ...rest } = options;
    const response = await fetch(url, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle both paginated responses and direct arrays
    // Paginated: { data: [...], total, page, pageSize }
    // Direct: [...]
    return Array.isArray(data) ? data : data.data || data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
