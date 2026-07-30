import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function InterviewResultPage() {
  const data = JSON.parse(
    localStorage.getItem("interviewQuestions") || "{}"
  );

  const questions = data.interview_questions || {};

  const renderSection = (
    title: string,
    items: string[] = []
  ) => (
    <Card className="rounded-3xl p-8">

      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <div className="space-y-4">

        {items.length === 0 ? (
          <p className="text-muted-foreground">
            No questions generated.
          </p>
        ) : (
          items.map((question, index) => (
            <details
              key={index}
              className="rounded-2xl border p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">

                {question}

                <ChevronRight className="h-5 w-5" />

              </summary>

            </details>
          ))
        )}

      </div>

    </Card>
  );

  return (
    <div className="min-h-screen bg-background px-6 py-12">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold">
          Interview Questions
        </h1>

        <p className="mt-3 text-muted-foreground">
          AI-generated interview questions tailored to your resume.
        </p>

        <div className="mt-10 grid gap-6">

          {renderSection(
            "Technical Questions",
            questions.technical_questions
          )}

          {renderSection(
            "Project Questions",
            questions.project_questions
          )}

          {renderSection(
            "Coding Questions",
            questions.coding_questions
          )}

          {renderSection(
            "HR Questions",
            questions.hr_questions
          )}

        </div>

      </div>

    </div>
  );
}