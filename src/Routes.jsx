import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupDefaultPage from "./pages/auth/Signup";
import Header from "./pages/components/header";
import SubjectCard from "./pages/components/subject";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<><Header /> <SubjectCard/></>} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
