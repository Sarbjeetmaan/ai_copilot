import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Briefcase,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "Extract skills, education, experience and structure using AI.",
  },
  {
    icon: Brain,
    title: "ATS Score",
    desc: "Keyword + semantic matching against any job description.",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    desc: "Recommend jobs based on resume embeddings.",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    desc: "Generate personalized interview questions instantly.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="mb-16 text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">
          Features
        </p>

        <h2 className="mt-3 text-5xl font-bold">
          Everything you need
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          AI Career Copilot helps you optimize resumes,
          prepare for interviews and discover better jobs —
          all in one place.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {features.map((item) => (
          <Card
            key={item.title}
            className="
              group
              rounded-3xl
              border
              bg-card/60
              p-8
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              hover:border-sky-500/30
            "
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 transition group-hover:bg-sky-500 group-hover:text-white">

              <item.icon size={28} />

            </div>

            <h3 className="mt-7 text-2xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              {item.desc}
            </p>

            <div className="mt-8 flex items-center gap-2 text-sky-500 opacity-0 transition group-hover:opacity-100">

              Learn More

              <ArrowUpRight size={18} />

            </div>

          </Card>
        ))}

      </div>
    </section>
  );
}