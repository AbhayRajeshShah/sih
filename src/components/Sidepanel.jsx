import React from 'react';
import './Sidepanel.css'; // You can create this CSS file for styling

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="logo">Google Classroom</div>
      <div className="menu">
        <ul>
          <li className="active">Classes</li>
          <li>Stream</li>
          <li>People</li>
          <li>Grades</li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
