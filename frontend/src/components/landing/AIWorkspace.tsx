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
    color:
      "bg-sky-500/15 dark:bg-sky-500/20 text-sky-500",
  },
  {
    title: "Interview Preparation",
    description:
      "Generate personalized technical, HR and coding interview questions.",
    route: "/interview",
    icon: Brain,
    color:
      "bg-violet-500/15 dark:bg-violet-500/20 text-violet-500",
  },
  {
    title: "Cover Letter Generator",
    description:
      "Generate professional AI-powered cover letters tailored for every job.",
    route: "/cover-letter",
    icon: FileSignature,
    color:
      "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-500",
  },
  {
    title: "Job Recommendations",
    description:
      "Discover AI-powered job recommendations based on your resume and skills.",
    route: "/job-match",
    icon: Briefcase,
    color:
      "bg-amber-500/15 dark:bg-amber-500/20 text-amber-500",
  },
];

export default function AIWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-lg transition-colors sm:p-8">

      {/* Heading */}

      <div className="mb-6">

        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          AI Career Suite
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Your AI Workspace
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Access every AI-powered career tool from one place.
          Analyze resumes, prepare for interviews, generate
          cover letters, and discover jobs—all powered by AI.
        </p>

      </div>

      {/* Cards */}

      <div className="space-y-3">

        {tools.map((tool) => (

          <button
            key={tool.title}
            onClick={() => navigate(tool.route)}
            className="
              group
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/40
              hover:shadow-xl
            "
          >

            <div className="flex items-center justify-between">

              <div className="flex min-w-0 items-center gap-4">

                {/* Icon */}

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${tool.color}`}
                >
                  <tool.icon className="h-6 w-6" />
                </div>

                {/* Text */}

                <div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {tool.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {tool.description}
                  </p>

                </div>

              </div>

              {/* Arrow */}

              <div
                className="
                  ml-3
                  shrink-0
                  rounded-full
                  bg-muted
                  p-2.5
                  transition-all
                  duration-300
                  group-hover:bg-primary
                  group-hover:text-primary-foreground
                  group-hover:translate-x-1
                "
              >
                <ArrowRight className="h-4 w-4" />
              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}