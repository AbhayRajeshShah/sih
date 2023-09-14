import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupDefaultPage from "./pages/auth/Signup";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<SignupDefaultPage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
