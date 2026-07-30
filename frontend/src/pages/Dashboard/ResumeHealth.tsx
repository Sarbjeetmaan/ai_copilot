import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
interface ResumeData {
  email?: string;
  phone?: string;
  resume_feedback?: unknown;
  skills?: string[];
  sections?: {
    education?: string;
    projects?: string;
    experience?: string;
    certifications?: string;
  };
}

interface Props {
  data: ResumeData;
}

export default function ResumeHealth({ data }: Props) {
  const health = [
    {
      label: "Contact Information",
      ok: !!data.email && !!data.phone,
    },
    {
      label: "Education Section",
      ok: !!data.sections?.education,
    },
    {
      label: "Projects Section",
      ok: !!data.sections?.projects,
    },
    {
      label: "Technical Skills",
      ok: (data.skills?.length || 0) > 0,
    },
    {
      label: "AI Analysis Generated",
      ok: !!data.resume_feedback,
    },
    {
      label: "Certifications",
      ok: !!data.sections?.certifications,
    },
    {
      label: "Experience",
      ok: !!data.sections?.experience,
    },
  ];

  const score =
    Math.round(
      (health.filter((i) => i.ok).length / health.length) * 100
    );

  return (
    <Card className="mt-8 rounded-3xl p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Resume Health
          </h2>

          <p className="mt-2 text-slate-500">
            Overall completeness of your resume
          </p>

        </div>

        <div className="text-right">

          <h1 className="text-5xl font-black">
            {score}%
          </h1>

          <p className="text-sm text-slate-500">
            Health Score
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {health.map((item) => (

          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4"
          >

            <span className="font-medium">
              {item.label}
            </span>

            {item.ok ? (

              <CheckCircle2
                size={20}
                className="text-sky-500"
              />

            ) : (

              <Circle
                size={18}
                className="text-slate-400"
              />

            )}

          </div>

        ))}

      </div>

    </Card>
  );
}