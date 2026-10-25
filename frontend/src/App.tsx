import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UploadPage from "./pages/Upload/UploadPage";
import InterviewPage from "./pages/Interview/InterviewPage";
import InterviewResultPage from "./pages/Interview/InterviewResultPage";
import CoverLetterPage from "./pages/CoverLetter/CoverLetterPage";
import JobMatchPage from "./pages/JobMatch/JobMatchPage";
import UserDashboardPage from "./pages/UserDashboard/UserDashboardPage";

function App() {
  return (
    <BrowserRouter>

      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-16">
        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* Resume Upload */}
          <Route
            path="/upload"
            element={<UploadPage />}
          />

          {/* Current Resume Analysis */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Interview */}
          <Route
            path="/interview"
            element={<InterviewPage />}
          />

          <Route
            path="/interview/result"
            element={<InterviewResultPage />}
          />

          {/* Cover Letter */}
          <Route
            path="/cover-letter"
            element={<CoverLetterPage />}
          />

          {/* Job Match */}
          <Route
            path="/job-match"
            element={<JobMatchPage />}
          />

          {/* User History */}
          <Route
            path="/user-dashboard"
            element={<UserDashboardPage />}
          />

        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;