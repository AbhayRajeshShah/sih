import React, { useState } from "react";
import "./subject.scss";

function SubjectCard() {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const teacherOptions = ["Teacher 1", "Teacher 2", "Teacher 3", "Teacher 4", "Teacher 5"];

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);

    // Route to the selected teacher's course immediately
    // For example: history.push(`/courses/${e.target.value}`);
  };

  return (
    <div className="subject-card">
      <h2 className="subject-name">Subject Name</h2>
      <div className="dropdown-container">
        <select
          id="teacherSelect"
          className="teacher-dropdown"
          value={selectedTeacher}
          onChange={handleTeacherChange}
          size={3} // Display only 3 options before using a scrollbar
        >
          {teacherOptions.map((teacher, index) => (
            <option key={index} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SubjectCard;
