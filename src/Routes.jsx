import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupDefaultPage from "./pages/auth/Signup";
import SigninDefaultPage from "./pages/auth/Signin";
import Teacher from "./pages/roles/Teacher";
import EditCourse from "./pages/roles/Teacher/editCourse";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
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
