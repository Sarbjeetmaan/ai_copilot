import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UploadPage from "./pages/Upload/UploadPage";
import InterviewPage from "./pages/Interview/InterviewPage";
import InterviewResultPage from "@/pages/Interview/InterviewResultPage";
import CoverLetterPage from "@/pages/CoverLetter/CoverLetterPage";
import JobMatchPage from "@/pages/JobMatch/JobMatchPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route
          path="/interview"
          element={<InterviewPage />}
        />
        <Route
            path="/interview/result"
            element={<InterviewResultPage />}
        />
            <Route
                path="/cover-letter"
                element={<CoverLetterPage />}
            />
          <Route
            path="/job-match"
            element={<JobMatchPage />}
          />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;