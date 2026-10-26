import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FileText,
  Mic,
  Mail,
  Briefcase,
  ArrowRight,
  History,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import api from "@/services/api";

import {
  InterviewHistoryList,
  CoverLetterHistoryList,
  JobHistoryList,
  type InterviewHistoryItem,
  type CoverLetterHistoryItem,
  type JobHistoryItem,
} from "./HistoryLists";

// Every history endpoint answers { history: [...] } (oldest first).
// We show the newest first.
async function loadHistory<T>(url: string): Promise<T[]> {
  const response = await api.get(url);

  return [...(response.data?.history || [])].reverse();
}

interface ResumeHistoryItem {
  filename: string;
  uploaded_at: number;
  job_description: string;

  result: {
    filename?: string;
    pages?: number;
    name?: string;
    email?: string;
    phone?: string;

    skills?: string[];

    sections?: Record<string, unknown>;

    entities?: unknown;

    keyword_ats?: {
      ats_score?: number;
      [key: string]: unknown;
    };

    semantic_ats?: {
      semantic_score?: number;
      [key: string]: unknown;
    };

    resume_feedback?: {
      strengths?: string[];
      weaknesses?: string[];
      missing_skills?: string[];
      resume_improvements?: string[];
      ats_tips?: string[];
      [key: string]: unknown;
    };

    resume_improvements?: unknown;

    [key: string]: unknown;
  };
}

export default function UserDashboardPage() {
  const { user, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [resumeHistory, setResumeHistory] = useState<
    ResumeHistoryItem[]
  >([]);

  const [interviewHistory, setInterviewHistory] = useState<
    InterviewHistoryItem[]
  >([]);

  const [coverLetterHistory, setCoverLetterHistory] =
    useState<CoverLetterHistoryItem[]>([]);

  const [jobHistory, setJobHistory] = useState<
    JobHistoryItem[]
  >([]);

  const [loadingHistory, setLoadingHistory] =
    useState(isLoggedIn);

  const [sessionExpired, setSessionExpired] =
    useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let cancelled = false;

    const fetchHistory = async () => {
      // All four histories load at the same time; one failing
      // does not hide the others.
      const [resume, interview, cover, jobs] =
        await Promise.allSettled([
          loadHistory<ResumeHistoryItem>(
            "/resume/history"
          ),
          loadHistory<InterviewHistoryItem>(
            "/interview/history"
          ),
          loadHistory<CoverLetterHistoryItem>(
            "/cover-letter/history"
          ),
          loadHistory<JobHistoryItem>(
            "/job-match/history"
          ),
        ]);

      if (cancelled) {
        return;
      }

      setResumeHistory(
        resume.status === "fulfilled" ? resume.value : []
      );

      setInterviewHistory(
        interview.status === "fulfilled"
          ? interview.value
          : []
      );

      setCoverLetterHistory(
        cover.status === "fulfilled" ? cover.value : []
      );

      setJobHistory(
        jobs.status === "fulfilled" ? jobs.value : []
      );

      const results = [resume, interview, cover, jobs];

      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error(
            "Failed to fetch history:",
            result.reason
          );
        }
      });

      // 401 = the saved login is no longer valid
      setSessionExpired(
        results.some(
          (result) =>
            result.status === "rejected" &&
            axios.isAxiosError(result.reason) &&
            result.reason.response?.status === 401
        )
      );

      setLoadingHistory(false);
    };

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  function openResumeAnalysis(
    item: ResumeHistoryItem
  ) {
    localStorage.setItem(
      "resumeResult",
      JSON.stringify(item.result)
    );

    navigate("/dashboard");
  }

  function formatDate(timestamp: number) {
    if (!timestamp) {
      return "Unknown date";
    }

    return new Date(
      timestamp * 1000
    ).toLocaleString();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Welcome back,{" "}
            {user?.name || "User"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Manage your career tools and view your
            previous career work with AI Career Copilot.
          </p>
        </div>

        {/* ================================================= */}
        {/* CAREER TOOLS */}
        {/* ================================================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* Resume Analysis */}

          <Card className="rounded-3xl p-7 transition hover:shadow-lg">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Resume Analysis
            </h2>

            <p className="mt-2 text-muted-foreground">
              Analyze your resume, check ATS compatibility,
              find missing skills, and receive AI feedback.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link to="/upload">
                Analyze Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </Card>

          {/* Interview */}

          <Card className="rounded-3xl p-7 transition hover:shadow-lg">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950">
              <Mic className="h-6 w-6 text-violet-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              AI Interview
            </h2>

            <p className="mt-2 text-muted-foreground">
              Generate personalized interview questions
              based on your resume and target job.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link to="/interview">
                Start Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </Card>

          {/* Cover Letter */}

          <Card className="rounded-3xl p-7 transition hover:shadow-lg">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950">
              <Mail className="h-6 w-6 text-emerald-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Cover Letter
            </h2>

            <p className="mt-2 text-muted-foreground">
              Generate a personalized cover letter
              using your resume and job description.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link to="/cover-letter">
                Create Cover Letter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </Card>

          {/* Job Match */}

          <Card className="rounded-3xl p-7 transition hover:shadow-lg">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950">
              <Briefcase className="h-6 w-6 text-orange-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Job Match
            </h2>

            <p className="mt-2 text-muted-foreground">
              Find jobs that match your resume,
              experience, location, and preferences.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link to="/job-match">
                Find Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </Card>

        </div>

        {/* Guest / expired login notice */}

        {(!isLoggedIn || sessionExpired) && (
          <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm">
            {sessionExpired
              ? "Your login has expired. "
              : "History is only saved for logged-in users. "}

            <Link
              to="/login"
              className="font-semibold underline underline-offset-4"
            >
              Login
            </Link>{" "}
            to {sessionExpired ? "see" : "save and see"} your
            previous work.
          </div>
        )}

        {/* ================================================= */}
        {/* PREVIOUS WORK */}
        {/* ================================================= */}

        <Card className="mt-10 rounded-3xl p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <History className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Previous Work
              </h2>

              <p className="text-muted-foreground">
                View your previous career activities.
              </p>
            </div>

          </div>

          {/* ================================================= */}
          {/* RESUME HISTORY */}
          {/* ================================================= */}

          <div className="mt-8">

            <h3 className="text-xl font-bold">
              Resume Analyses
            </h3>

            {loadingHistory ? (

              <div className="mt-4 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                Loading your previous analyses...
              </div>

            ) : resumeHistory.length === 0 ? (

              <div className="mt-4 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                No resume analyses yet.
              </div>

            ) : (

              <div className="mt-4 space-y-4">

                {resumeHistory.map(
                  (item, index) => {

                    const result =
                      item.result || {};

                    const atsScore =
                      result.keyword_ats
                        ?.ats_score ?? 0;

                    const semanticScore =
                      result.semantic_ats
                        ?.semantic_score ?? 0;

                    const skillsCount =
                      result.skills?.length ?? 0;

                    return (

                      <div
                        key={`${item.filename}-${item.uploaded_at}-${index}`}
                        className="rounded-2xl border p-6 transition hover:bg-muted/30 hover:shadow-sm"
                      >

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                          {/* Resume information */}

                          <div className="min-w-0">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>

                              <div className="min-w-0">

                                <h4 className="truncate text-lg font-semibold">
                                  {item.filename}
                                </h4>

                                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

                                  <CalendarDays className="h-4 w-4" />

                                  {formatDate(
                                    item.uploaded_at
                                  )}

                                </div>

                              </div>

                            </div>

                            {/* Candidate information */}

                            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">

                              {result.name && (
                                <span>
                                  Candidate:{" "}
                                  <strong className="text-foreground">
                                    {result.name}
                                  </strong>
                                </span>
                              )}

                              {result.pages !== undefined && (
                                <span>
                                  Pages:{" "}
                                  <strong className="text-foreground">
                                    {result.pages}
                                  </strong>
                                </span>
                              )}

                              <span>
                                Skills:{" "}
                                <strong className="text-foreground">
                                  {skillsCount}
                                </strong>
                              </span>

                            </div>

                          </div>

                          {/* Scores + View */}

                          <div className="flex flex-wrap items-center gap-3">

                            <div className="rounded-xl border px-4 py-3 text-center">

                              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                ATS
                              </p>

                              <p className="mt-1 text-xl font-bold">
                                {Math.round(
                                  atsScore
                                )}
                                %
                              </p>

                            </div>

                            <div className="rounded-xl border px-4 py-3 text-center">

                              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                Semantic
                              </p>

                              <p className="mt-1 text-xl font-bold">
                                {Math.round(
                                  semanticScore
                                )}
                                %
                              </p>

                            </div>

                            <Button
                              onClick={() =>
                                openResumeAnalysis(
                                  item
                                )
                              }
                            >
                              View Analysis

                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>

                          </div>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* ================================================= */}
          {/* INTERVIEW HISTORY */}
          {/* ================================================= */}

          <div className="mt-10">

            <h3 className="text-xl font-bold">
              Interviews
            </h3>

            <InterviewHistoryList
              items={interviewHistory}
              loading={loadingHistory}
            />

          </div>

          {/* ================================================= */}
          {/* COVER LETTER HISTORY */}
          {/* ================================================= */}

          <div className="mt-10">

            <h3 className="text-xl font-bold">
              Cover Letters
            </h3>

            <CoverLetterHistoryList
              items={coverLetterHistory}
              loading={loadingHistory}
            />

          </div>

          {/* ================================================= */}
          {/* JOB MATCH HISTORY */}
          {/* ================================================= */}

          <div className="mt-10">

            <h3 className="text-xl font-bold">
              Job Matches
            </h3>

            <JobHistoryList
              items={jobHistory}
              loading={loadingHistory}
            />

          </div>

        </Card>

      </div>
    </div>
  );
}