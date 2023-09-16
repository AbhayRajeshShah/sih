import React from "react";
import "./sidePanel.scss"; // Import your SCSS file

function SidePanel() {
  return (
    <div className="side-panel">
      <div className="profile">
        <i className="fa-solid fa-user fa-3x"></i>
        <h2 className="profile-name">John Doe</h2>
      </div>
      <div className="sections">
        <div className="section">
          <h3>Student Profile</h3>
          {/* Add content for the Student Profile section here */}
        </div>
        <div className="section">
          <h3>Courses Enrolled In</h3>
          {/* Add content for the Courses Enrolled In section here */}
        </div>
        <div className="section">
          <h3>Quiz Taken</h3>
          {/* Add content for the Quiz Taken section here */}
        </div>
        <div className="section">
          <h3>Leadership Board</h3>
          {/* Add content for the Leadership Board section here */}
        </div>
        <div className="section">
          <h3>Help Desk</h3>
          {/* Add content for the Help Desk section here */}
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
