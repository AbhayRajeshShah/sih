// Leaderboard.js
import React from 'react';
import './ledearboard.css';

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboarddiv">
      {users.map((user, index) => {
        return (
        <div
          className={`leaderboard-item ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}
          key={user.id}
        >
          <div className="position">{index + 1}</div>
          <div className="user-details">
          <p className='leaderboard-p'>
              <span className="user-name">{user.name}</span>
              <p className="score">Score: {user.score}</p>
            </p>   
          </div>
        </div>
        );
})}
    </div>
  );
};

export default Leaderboard;
