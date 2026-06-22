import { useState, useEffect } from 'react';
import { fetchApi, apiConfig } from '../utils/apiConfig';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiConfig.endpoints.workouts);
        setWorkouts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="container py-4"><p>Loading workouts...</p></div>;
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
      <h1>Workouts</h1>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || 'Workout'}</h5>
                  <p className="card-text">
                    {workout.description || 'No description'}
                  </p>
                  <p className="card-text">
                    <small>
                      Exercises: {workout.exercises?.length || 0}
                    </small>
                  </p>
                  <p className="card-text">
                    <small>
                      Suggested for:{' '}
                      {workout.suggestedFor?.join(', ') || 'Everyone'}
                    </small>
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
