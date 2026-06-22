import { useState, useEffect } from 'react';
import { fetchApi, apiConfig } from '../utils/apiConfig';

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiConfig.endpoints.teams);
        setTeams(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <div className="container py-4"><p>Loading teams...</p></div>;
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
      <h1>Teams</h1>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.name} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Team'}</h5>
                  <p className="card-text">
                    Mascot: {team.mascot || 'N/A'}
                  </p>
                  <p className="card-text">
                    <small>Members: {team.members?.length || 0}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
