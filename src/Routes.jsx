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
          <Route path="/signup" element={<SignupDefaultPage />} />
          <Route path="/signin" element={<SigninDefaultPage />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/:subject" element={<EditCourse />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
