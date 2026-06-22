import { useState, useEffect } from 'react';
import { fetchApi, apiConfig } from '../utils/apiConfig';

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiConfig.endpoints.leaderboard);
        setLeaderboard(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="container py-4"><p>Loading leaderboard...</p></div>;
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id || entry.user || index}>
                <td>{index + 1}</td>
                <td>{entry.user || 'Unknown'}</td>
                <td>{entry.team || 'N/A'}</td>
                <td>{entry.points || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
