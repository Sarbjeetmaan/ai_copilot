import { useNavigate } from "react-router-dom";
import {
  Mic,
  Mail,
  Briefcase,
  CalendarDays,
  ExternalLink,
  Copy,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* ================================================= */
/* TYPES (what the backend saves for each feature)   */
/* ================================================= */

export interface InterviewHistoryItem {
  filename: string;
  created_at: number;
  job_description?: string;

  result: {
    interview_questions?: Record<string, string[]>;
  };
}

export interface CoverLetterHistoryItem {
  filename: string;
  created_at: number;
  job_description?: string;

  result: {
    cover_letter?: string;
  };
}

interface JobRecommendation {
  title?: string;
  company_type?: string;
  match?: string;
  location?: string;
  employment?: string;
  salary?: string;
  skills?: string[];
}

export interface JobHistoryItem {
  filename: string;
  created_at: number;

  filters?: {
    location?: string;
    experience?: string;
    employment_type?: string;
  };

  result: {
    recommended_jobs?: JobRecommendation[];
  };
}

/* ================================================= */
/* SMALL HELPERS                                     */
/* ================================================= */

function formatDate(timestamp?: number) {
  if (!timestamp) {
    return "Unknown date";
  }

  return new Date(timestamp * 1000).toLocaleString();
}

function Message({ children }: { children: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
      {children}
    </div>
  );
}

function CardHeader({
  icon,
  filename,
  createdAt,
}: {
  icon: React.ReactNode;
  filename: string;
  createdAt: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>

      <div className="min-w-0">
        <h4 className="truncate text-lg font-semibold">
          {filename}
        </h4>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />

          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
}

interface ListProps<T> {
  items: T[];
  loading: boolean;
}

/* ================================================= */
/* INTERVIEW HISTORY                                 */
/* ================================================= */

export function InterviewHistoryList({
  items,
  loading,
}: ListProps<InterviewHistoryItem>) {
  const navigate = useNavigate();

  if (loading) {
    return <Message>Loading your interviews...</Message>;
  }

  if (items.length === 0) {
    return <Message>No interview sessions yet.</Message>;
  }

  // Re-use the existing result page: it reads this key.
  function openQuestions(item: InterviewHistoryItem) {
    localStorage.setItem(
      "interviewQuestions",
      JSON.stringify(item.result)
    );

    navigate("/interview/result");
  }

  return (
    <div className="mt-4 space-y-4">
      {items.map((item, index) => {
        const total = Object.values(
          item.result?.interview_questions ?? {}
        ).reduce(
          (sum, list) => sum + (list?.length ?? 0),
          0
        );

        return (
          <div
            key={`${item.created_at}-${index}`}
            className="flex flex-col gap-4 rounded-2xl border p-6 transition hover:bg-muted/30 hover:shadow-sm lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="min-w-0">
              <CardHeader
                icon={
                  <Mic className="h-5 w-5 text-violet-600" />
                }
                filename={item.filename}
                createdAt={item.created_at}
              />

              <p className="mt-4 text-sm text-muted-foreground">
                {total} questions generated
                {item.job_description
                  ? " for a specific job description"
                  : ""}
              </p>
            </div>

            <Button onClick={() => openQuestions(item)}>
              View Questions
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================= */
/* COVER LETTER HISTORY                              */
/* ================================================= */

export function CoverLetterHistoryList({
  items,
  loading,
}: ListProps<CoverLetterHistoryItem>) {
  if (loading) {
    return <Message>Loading your cover letters...</Message>;
  }

  if (items.length === 0) {
    return <Message>No cover letters yet.</Message>;
  }

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <div className="mt-4 space-y-4">
      {items.map((item, index) => {
        const letter = item.result?.cover_letter ?? "";

        return (
          <details
            key={`${item.created_at}-${index}`}
            className="rounded-2xl border p-6 transition hover:bg-muted/30"
          >
            <summary className="cursor-pointer list-none">
              <CardHeader
                icon={
                  <Mail className="h-5 w-5 text-emerald-600" />
                }
                filename={item.filename}
                createdAt={item.created_at}
              />

              <p className="mt-4 text-sm text-muted-foreground">
                Click to read the letter
              </p>
            </summary>

            <div className="mt-5 rounded-2xl border bg-muted/30 p-6">
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-8">
                {letter}
              </pre>
            </div>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => copy(letter)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </details>
        );
      })}
    </div>
  );
}

/* ================================================= */
/* JOB MATCH HISTORY                                 */
/* ================================================= */

export function JobHistoryList({
  items,
  loading,
}: ListProps<JobHistoryItem>) {
  if (loading) {
    return <Message>Loading your job matches...</Message>;
  }

  if (items.length === 0) {
    return <Message>No job matches yet.</Message>;
  }

  return (
    <div className="mt-4 space-y-4">
      {items.map((item, index) => {
        const jobs = item.result?.recommended_jobs ?? [];

        const filters = [
          item.filters?.location,
          item.filters?.experience,
          item.filters?.employment_type,
        ].filter(Boolean);

        return (
          <details
            key={`${item.created_at}-${index}`}
            className="rounded-2xl border p-6 transition hover:bg-muted/30"
          >
            <summary className="cursor-pointer list-none">
              <CardHeader
                icon={
                  <Briefcase className="h-5 w-5 text-orange-600" />
                }
                filename={item.filename}
                createdAt={item.created_at}
              />

              <p className="mt-4 text-sm text-muted-foreground">
                {jobs.length} jobs found
                {filters.length > 0
                  ? ` · ${filters.join(" · ")}`
                  : ""}
              </p>
            </summary>

            <div className="mt-5 space-y-3">
              {jobs.map((job, jobIndex) => (
                <div
                  key={jobIndex}
                  className="rounded-xl border bg-muted/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {job.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {job.company_type}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">
                      {job.match}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                    )}

                    {job.employment && (
                      <span>{job.employment}</span>
                    )}

                    {job.salary && <span>{job.salary}</span>}
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
