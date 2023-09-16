// Leaderboard.js
import React from "react";
import "./ledearboard.scss";

const Leaderboard = ({ users }) => {
  console.log(users);
  return (
    <div className="leaderboarddiv">
      <div className="head">Leaderboard</div>
      {users.map((user, index) => {
        return (
          <div
            className={`leaderboard-item ${
              index === 0
                ? "first"
                : index === 1
                ? "second"
                : index === 2
                ? "third"
                : ""
            }`}
            key={index}
          >
            <p className="user-name">{user.teacher}</p>
            <p className="score">{user.creds}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
