export default function Home() {
  return (
    <div className="container py-4">
      <div className="text-center">
        <h1>Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities and compete on the leaderboard</p>
        <div className="mt-4">
          <p>Navigate using the menu above to explore:</p>
          <ul className="list-unstyled">
            <li>📊 <strong>Activities</strong> - View your logged activities</li>
            <li>🏆 <strong>Leaderboard</strong> - See the competitive rankings</li>
            <li>👥 <strong>Users</strong> - Browse user profiles</li>
            <li>🎯 <strong>Teams</strong> - Join and explore teams</li>
            <li>💪 <strong>Workouts</strong> - Discover personalized workout suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
