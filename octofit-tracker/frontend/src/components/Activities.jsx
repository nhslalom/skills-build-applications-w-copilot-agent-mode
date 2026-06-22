import { useState, useEffect } from 'react';
import { fetchApi, apiConfig } from '../utils/apiConfig';

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiConfig.endpoints.activities);
        setActivities(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <div className="container py-4"><p>Loading activities...</p></div>;
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
      <h1>Activities</h1>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="row">
          {activities.map((activity) => (
            <div key={activity._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.type || 'Activity'}</h5>
                  <p className="card-text">
                    {activity.duration ? `Duration: ${activity.duration} min` : 'N/A'}
                  </p>
                  <p className="card-text">
                    {activity.date
                      ? `Date: ${new Date(activity.date).toLocaleDateString()}`
                      : 'N/A'}
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
