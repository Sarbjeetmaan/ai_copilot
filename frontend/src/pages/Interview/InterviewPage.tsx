import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Sparkles,
  FileText,
  Brain,
  Code2,
  Briefcase,
  FolderGit2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import GuestNotice from "@/components/auth/GuestNotice";

export default function InterviewPrepPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generateQuestions = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();

    formData.append("file", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const res = await api.post("/interview", formData);

      localStorage.setItem(
        "interviewQuestions",
        JSON.stringify(res.data)
      );

      navigate("/interview/result");
    } catch (err) {
      console.error(err);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">

      <div className="mx-auto max-w-6xl">

        <GuestNotice />

        {/* Hero */}

        <div className="mb-10 flex items-center gap-5">

          <div className="rounded-2xl bg-violet-500/10 p-4">
            <Brain className="h-8 w-8 text-violet-500" />
          </div>

          <div>

            <h1 className="text-5xl font-bold">
              AI Interview Preparation
            </h1>

            <p className="mt-2 text-muted-foreground">
              Upload your resume and optionally add a job description to
              generate personalized interview questions powered by AI.
            </p>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* LEFT */}

          <Card className="rounded-3xl border p-8 shadow-sm">

            {/* Resume */}

            <div>

              <label className="mb-3 flex items-center gap-2 font-semibold">

                <UploadCloud className="h-5 w-5 text-violet-500" />

                Resume

              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResume(e.target.files?.[0] || null)
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            {/* JD */}

            <div className="mt-8">

              <label className="mb-3 flex items-center gap-2 font-semibold">

                <FileText className="h-5 w-5 text-sky-500" />

                Job Description (Optional)

              </label>

              <textarea
                rows={10}
                value={jobDescription}
                placeholder="Paste the job description here..."
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                className="w-full rounded-xl border p-4 leading-7"
              />

            </div>

            <Button
              onClick={generateQuestions}
              disabled={loading}
              size="lg"
              className="mt-8 w-full rounded-xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />

              {loading
                ? "Generating..."
                : "Generate Interview Questions"}

            </Button>

          </Card>

          {/* RIGHT */}

          <Card className="rounded-3xl border p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
              What You'll Get
            </h2>

            <p className="mt-2 text-muted-foreground">
              AI generates interview questions specifically for your
              resume, skills, projects and target role.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4 rounded-2xl border p-5">

                <div className="rounded-xl bg-sky-500/10 p-3">
                  <Code2 className="h-6 w-6 text-sky-500" />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Technical Questions
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Frameworks, backend, frontend,
                    databases, APIs and system design.
                  </p>

                </div>

              </div>

              <div className="flex gap-4 rounded-2xl border p-5">

                <div className="rounded-xl bg-violet-500/10 p-3">
                  <Briefcase className="h-6 w-6 text-violet-500" />
                </div>

                <div>

                  <h3 className="font-semibold">
                    HR Questions
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Behavioural, communication and leadership questions.
                  </p>

                </div>

              </div>

              <div className="flex gap-4 rounded-2xl border p-5">

                <div className="rounded-xl bg-amber-500/10 p-3">
                  <FolderGit2 className="h-6 w-6 text-amber-500" />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Project Discussion
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Questions based on the projects listed in your resume.
                  </p>

                </div>

              </div>

              <div className="flex gap-4 rounded-2xl border p-5">

                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <Brain className="h-6 w-6 text-emerald-500" />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Coding Challenges
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    AI-generated coding questions tailored to your role.
                  </p>

                </div>

              </div>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );
}