import React, { useContext, useState } from 'react';
import { LeaderboardContext } from '../../context/LeaderboardContext';
import { formatTime } from '../../utils/formatTime';
// import './Leaderboard.css';

const Leaderboard = () => {
  const { scores, clearScores } = useContext(LeaderboardContext);
  const [difficulty, setDifficulty] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  // Filter scores based on selected difficulty
  const filteredScores = difficulty === 'all'
    ? scores
    : scores.filter(score => score.difficulty.toLowerCase() === difficulty.toLowerCase());

  // Sort scores by time (ascending)
  const sortedScores = [...filteredScores].sort((a, b) => a.time - b.time);

  // Format the date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`leaderboard ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="toggle-leaderboard"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>

      {isOpen && (
        <div className="leaderboard-content">
          <h2>Leaderboard</h2>

          <div className="leaderboard-controls">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="custom">Custom</option>
            </select>

            <button
              className="clear-scores"
              onClick={clearScores}
              disabled={scores.length === 0}
            >
              Clear All Scores
            </button>
          </div>

          {sortedScores.length === 0 ? (
            <p className="no-scores">No scores yet.</p>
          ) : (
            <table className="scores-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Difficulty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedScores.map((score, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.name}</td>
                    <td>{formatTime(score.time)}</td>
                    <td>{score.difficulty}</td>
                    <td>{formatDate(score.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
