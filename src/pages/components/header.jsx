import React from "react";
import "./header.scss";

function Header() {
  return (
    <header className="header">
      <h1 className="head">EduConnect</h1>
      <div className="header-content">
        <h2 className="courses">Courses</h2>
        <h2 className="leaderboard">Leaderboard</h2>
      </div>
    </header>
  );
}

export default Header;
