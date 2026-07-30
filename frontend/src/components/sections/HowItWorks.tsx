import { Upload, Brain, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your PDF resume securely. We instantly extract skills, education and experience.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Advanced NLP and semantic matching calculate ATS score and identify strengths.",
  },
  {
    icon: Briefcase,
    title: "Get Results",
    description:
      "Receive job recommendations, interview questions and personalized improvements.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 px-6">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">
            Workflow
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            How it works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Three simple steps to optimize your resume with AI.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="
                group
                relative
                rounded-3xl
                border
                bg-card/60
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              <div className="absolute right-6 top-6 text-5xl font-black text-muted/40">
                0{index + 1}
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 transition group-hover:bg-sky-500 group-hover:text-white">

                <step.icon size={30} />

              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}