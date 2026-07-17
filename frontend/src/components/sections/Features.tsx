import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "AI extracts skills, education and experience.",
  },
  {
    icon: Brain,
    title: "ATS Score",
    desc: "Predict ATS compatibility for any job description.",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    desc: "Find matching jobs using AI embeddings.",
  },
  {
    icon: MessageSquare,
    title: "AI Interview",
    desc: "Generate personalized interview questions.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
      {features.map((item) => (
        <Card
          key={item.title}
          className="border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-2 hover:border-cyan-500"
        >
          <item.icon className="mb-4 text-cyan-400" />

          <h3 className="mb-2 text-xl font-bold">
            {item.title}
          </h3>

          <p className="text-zinc-400">
            {item.desc}
          </p>
        </Card>
      ))}
    </section>
  );
}