import { Upload, Brain, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your PDF resume securely.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI extracts skills, experience and calculates ATS score.",
  },
  {
    icon: Briefcase,
    title: "Get Results",
    description: "Receive job matches, resume improvements and interview questions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="mt-4 text-center text-zinc-400">
          Three simple steps to improve your resume using AI.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                <step.icon className="text-cyan-400" size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {index + 1}. {step.title}
              </h3>

              <p className="mt-4 text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}