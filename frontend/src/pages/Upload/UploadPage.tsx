import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Briefcase,
  Sparkles,
  Loader2,
} from "lucide-react";

import api from "@/services/api";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import GuestNotice from "@/components/auth/GuestNotice";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * services/api.ts already automatically adds:
       *
       * Authorization: Bearer <access_token>
       *
       * through its Axios interceptor.
       *
       * Therefore we DO NOT manually read "token" here.
       */

      const res = await api.post("/upload", formData);

      /*
       * Store the latest analysis so /dashboard
       * can display it immediately.
       */
      localStorage.setItem(
        "resumeResult",
        JSON.stringify(res.data)
      );

      /*
       * Go to the current resume analysis.
       */
      navigate("/dashboard");
    } catch (err) {
      console.error("Resume upload error:", err);

      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl">

        <GuestNotice />

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-sky-500" />

            <span className="text-sm font-medium">
              AI Powered Resume Analyzer
            </span>
          </div>

          <h1 className="text-5xl font-black tracking-tight">
            Upload Your Resume
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Upload your resume and compare it against any job
            description using AI. Receive ATS score, semantic
            matching, resume feedback and personalized
            improvements.
          </p>
        </motion.div>

        {/* Upload Card */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="mt-10 rounded-3xl border bg-card p-8 shadow-lg">

            {/* Resume Upload */}

            <div>
              <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <UploadCloud className="h-5 w-5 text-sky-500" />
                Resume (PDF)
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
                className="w-full rounded-2xl border border-border bg-background px-4 py-4 transition focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              {file && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Selected:

                  <span className="ml-2 font-semibold text-foreground">
                    {file.name}
                  </span>
                </p>
              )}
            </div>

            {/* Job Description */}

            <div className="mt-8">
              <label className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="h-5 w-5 text-emerald-500" />
                Job Description
              </label>

              <textarea
                rows={12}
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                placeholder="Paste the complete job description here..."
                className="w-full rounded-2xl border border-border bg-background p-5 transition focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Analyze Button */}

            <Button
              onClick={uploadResume}
              disabled={loading}
              size="lg"
              className="mt-10 h-14 w-full rounded-xl text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>

          </Card>
        </motion.div>

      </div>
    </div>
  );
}