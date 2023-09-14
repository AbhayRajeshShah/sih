import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/components/header";
import SubjectCard from "./pages/components/subject";
import SidePanel from "./pages/components/sidePanel";
import "./Routes.scss";

const ProjectRoutes = () => {
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
                    <SubjectCard />
                    <SubjectCard />
                    <SubjectCard />
                    <SubjectCard />
                    <SubjectCard />
                    {/* Add more SubjectCard components as needed */}
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
