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
    <section className="mx-auto mt-24 max-w-7xl px-6">

      <div className="rounded-3xl border border-border bg-card p-10 shadow-lg transition-colors">

        {/* Heading */}

        <div className="mb-10">

          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            AI Career Suite
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
            Your AI Workspace
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Access every AI-powered career tool from one place.
            Analyze resumes, prepare for interviews, generate
            cover letters, and discover jobs—all powered by AI.
          </p>

        </div>

        {/* Cards */}

        <div className="space-y-5">

          {tools.map((tool) => (

            <button
              key={tool.title}
              onClick={() => navigate(tool.route)}
              className="
                group
                w-full
                rounded-3xl
                border
                border-border
                bg-background
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-xl
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                  {/* Icon */}

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${tool.color}`}
                  >
                    <tool.icon className="h-8 w-8" />
                  </div>

                  {/* Text */}

                  <div>

                    <h3 className="text-xl font-semibold text-foreground">
                      {tool.title}
                    </h3>

                    <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
                      {tool.description}
                    </p>

                  </div>

                </div>

                {/* Arrow */}

                <div
                  className="
                    rounded-full
                    bg-muted
                    p-3
                    transition-all
                    duration-300
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                    group-hover:translate-x-1
                  "
                >
                  <ArrowRight className="h-5 w-5" />
                </div>

              </div>

            </button>

          ))}

        </div>

      </div>

    </section>
  );
}