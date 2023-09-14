import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupDefaultPage from "./pages/auth/Signup";
import Sidepanel from "./components/Sidepanel";
import Header from "./components/Header";
import Subjects from "./components/Subjects";
import Teacher from "./components/Teacher";
import Leaderboard from "./components/leaderboard";
import Score from "./components/score";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<><Score /><Sidepanel/><Header/></>} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
