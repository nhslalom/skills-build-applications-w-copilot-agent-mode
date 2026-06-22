import { useState, useEffect } from 'react';
import { fetchApi, apiConfig } from '../utils/apiConfig';

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchApi(apiConfig.endpoints.users);
        setUsers(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className="container py-4"><p>Loading users...</p></div>;
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
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.username}>
                <td>{user.displayName || user.username || 'Unknown'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.team || 'None'}</td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
