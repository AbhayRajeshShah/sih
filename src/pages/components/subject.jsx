import React, { useState, useEffect } from "react";
import "./subject.scss";
import { useNavigate } from "react-router-dom";

function SubjectCard({ subjectName }) {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [teacherOptions, setTeacherOptions] = useState([]);

  useEffect(() => {
    const getTeacherNames = async () => {
      let response = await fetch(`${baseUrl}/${subjectName}`)
        .then((data) => data.json())
        .then((data) => data);
      console.log(response);
      setTeacherOptions(response);
    };
    getTeacherNames();
  });

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
    // Route to the selected teacher's course immediately
    // For example: history.push(`/courses/${e.target.value}`);
  };

  return (
    <div className="subject-card">
      <h2 className="subject-name">{subjectName}</h2>
      <div className="dropdown-container">
        {teacherOptions.length > 0 ? (
          <div
            id="teacherSelect"
            className="teacher-dropdown"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            size={3} // Display only 3 options before using a scrollbar
          >
            {teacherOptions.map((teacher, index) => (
              <div
                key={index}
                // value={teacher.teacher}
                onClick={() => {
                  navigate(`/course/${subjectName}_${teacher.teacher}`);
                }}
              >
                {teacher.teacher}
              </div>
            ))}
          </div>
        ) : (
          <div className="teacher-dropdown">
            <div>No Teachers Available</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectCard;
