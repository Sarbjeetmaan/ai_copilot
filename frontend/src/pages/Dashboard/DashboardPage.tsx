import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "./ScoreCard";
import FeedbackCard from "./FeedbackCard";
import ResumeHealth from "./ResumeHealth";
import {
  
  AlertCircle,
 Brain,
  FileText,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const data = JSON.parse(
    localStorage.getItem("resumeResult") || "{}"
  );

  const feedback = data.resume_feedback || {};

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">

    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Resume Analysis
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
          Analysis Complete
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-500">
          Your resume has been parsed successfully. We've extracted
          your skills, calculated ATS compatibility and generated
          AI-powered recommendations.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="rounded-2xl border border-zinc-200 bg-slate-50 px-6 py-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">
            Candidate
          </p>

          <p className="mt-2 text-lg font-semibold">
            {data.name}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-200 bg-slate-50 px-6 py-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">
            Resume
          </p>

          <p className="mt-2 text-lg font-semibold">
            {data.filename}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-200 bg-slate-50 px-6 py-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">
            Skills
          </p>

          <p className="mt-2 text-lg font-semibold">
            {data.skills?.length || 0}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-200 bg-slate-50 px-6 py-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">
            Pages
          </p>

          <p className="mt-2 text-lg font-semibold">
            {data.pages}
          </p>

        </div>

      </div>

    </div>

  </div>
</motion.div>

        {/* Score Cards */}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          <ScoreCard
            title="ATS Score"
            value={data.keyword_ats?.ats_score || 0}
            subtitle="Keyword compatibility"
            icon={FileText}
          />

          <ScoreCard
            title="Semantic Match"
            value={Math.round(data.semantic_ats?.semantic_score || 0)}
            subtitle="AI understanding"
            icon={Brain}
          />

          <ScoreCard
            title="Skills Found"
            value={Math.min(
              ((data.skills?.length || 0) / 30) * 100,
              100
            )}
            suffix=""
            subtitle={`${data.skills?.length || 0} skills detected`}
            icon={Sparkles}
          />

        </div>

        {/* Skills */}

        <Card className="mt-8 rounded-3xl p-8">

          <h2 className="mb-5 text-2xl font-bold">
            Skills Detected
          </h2>

          <div className="flex flex-wrap gap-3">

            {(data.skills || []).map((skill: string) => (
              <Badge key={skill}>
                {skill}
              </Badge>
            ))}

          </div>

        </Card>

        {/* Missing Skills */}

        <Card className="mt-8 rounded-3xl p-8">

          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
            <AlertCircle className="text-amber-500" />
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {(feedback.missing_skills || []).map((item: string) => (
              <Badge
                key={item}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-200"
              >
                {item}
              </Badge>
            ))}

          </div>

        </Card>

        {/* Feedback */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <FeedbackCard
            title="Strengths"
            items={data.resume_feedback?.strengths || []}
          />

          <FeedbackCard
            title="Areas to Improve"
            items={data.resume_feedback?.weaknesses || []}
          />

          <FeedbackCard
            title="Resume Improvements"
            items={data.resume_feedback?.resume_improvements || []}
          />

          <FeedbackCard
            title="ATS Tips"
            items={data.resume_feedback?.ats_tips || []}
          />

        </div>
        <ResumeHealth data={data} />
    </div>

    </div>
  );
}