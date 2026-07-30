import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileSearch,
  Brain,
  FileSignature,
  Briefcase,
} from "lucide-react";

const tools = [
  {
    title: "Resume Analyzer",
    description:
      "Analyze ATS score, keyword match and receive AI-powered resume feedback.",
    route: "/upload",
    icon: FileSearch,
    color: "bg-sky-500/10 text-sky-500",
  },
  {
    title: "Interview Preparation",
    description:
      "Generate personalized technical, HR and coding interview questions from your resume.",
    route: "/interview",
    icon: Brain,
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    title: "Cover Letter Generator",
    description:
      "Create professional AI-generated cover letters tailored to every application.",
    route: "/cover-letter",
    icon: FileSignature,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Job Recommendations",
    description:
      "Discover AI-powered job recommendations based on your resume and skills.",
    route: "/job-match",
    icon: Briefcase,
    color: "bg-amber-500/10 text-amber-500",
  },
];

export default function AIWorkspace() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">

      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">

        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            AI Workspace
          </h2>

          <p className="mt-2 text-slate-500">
            Choose any AI-powered tool to accelerate your career.
          </p>
        </div>

        <div className="space-y-5">

          {tools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => navigate(tool.route)}
              className="group w-full rounded-3xl border border-zinc-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tool.color}`}
                  >
                    <tool.icon className="h-7 w-7" />
                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-slate-900">
                      {tool.title}
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {tool.description}
                    </p>

                  </div>

                </div>

                <ArrowRight className="h-6 w-6 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-700" />

              </div>
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}