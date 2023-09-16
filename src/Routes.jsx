import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/components/header";
import SubjectCard from "./pages/components/subject";
import SidePanel from "./pages/components/sidePanel";
import "./Routes.scss";
import SignupDefaultPage from "./pages/auth/Signup";
import SigninDefaultPage from "./pages/auth/Signin";
import Teacher from "./pages/roles/Teacher";
import EditCourse from "./pages/roles/Teacher/editCourse";
import Course from "./pages/roles/Student/Course";
import Quiz from "./pages/actions/Quiz";
import Rank from "./pages/roles/Teacher/Rank";
// import Header from "./components/Header";
// import Teacher from "./components/Teacher";xxxxxx

const ProjectRoutes = () => {
  const subjects = ["DSA", "Java", "ADS", "Web Programming"];
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="main-content">
                  <SidePanel />
                  <div className="subject-cards">
                    {subjects.map((subject) => {
                      return <SubjectCard subjectName={subject} />;
                    })}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/course/:course_details" element={<Course />} />
          <Route path="/signup" element={<SignupDefaultPage />} />
          <Route path="/signin" element={<SigninDefaultPage />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route exact path="/teacher/leaderboard" element={<Rank />} />
          <Route exact path="/quizzes/:subject" element={<Quiz />} />
          <Route path="/teacher/:subject" element={<EditCourse />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
