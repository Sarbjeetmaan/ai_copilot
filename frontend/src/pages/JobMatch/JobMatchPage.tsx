import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Briefcase,
  MapPin,
  GraduationCap,
  DollarSign,
  BadgeCheck,
} from "lucide-react";
import { generateJobMatches } from "@/api/jobmatch";
type JobRecommendation = {
  title: string;
  company_type: string;
  match: string;
  location: string;
  employment: string;
  salary: string;
  reason: string;
  skills: string[];
};

export default function JobMatchPage() {
  const [resume, setResume] = useState<File | null>(null);

  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const [loading, setLoading] = useState(false);

const [jobs, setJobs] = useState<JobRecommendation[]>([]);

  async function handleGenerate() {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateJobMatches(
        resume,
        location,
        experience,
        employmentType
      );

      console.log(data);

      setJobs(data.recommended_jobs || []);

    } catch (err) {
      console.error(err);
      alert("Failed to generate job recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-6 py-16">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-10">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">

            <Briefcase className="h-8 w-8 text-amber-500" />

          </div>

          <h1 className="text-5xl font-bold">
            AI Job Match
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Discover jobs that best match your resume using Artificial Intelligence.
          </p>

        </div>

        {/* Form */}

        <Card className="rounded-3xl p-8">

          <label className="mb-2 block font-medium">
            Resume (Required)
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(e.target.files?.[0] || null)
            }
            className="w-full rounded-xl border p-3"
          />

          {/* Location */}

          <div className="mt-8">

            <label className="mb-2 flex items-center gap-2 font-medium">

              <MapPin size={18} />

              Preferred Location

            </label>

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Remote, London, New York..."
              className="w-full rounded-xl border p-3"
            />

          </div>

          {/* Experience */}

          <div className="mt-8">

            <label className="mb-2 flex items-center gap-2 font-medium">

              <GraduationCap size={18} />

              Experience Level

            </label>

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="">Any</option>
              <option>Intern</option>
              <option>Fresher</option>
              <option>Junior</option>
              <option>Mid Level</option>
              <option>Senior</option>
            </select>

          </div>

          {/* Employment */}

          <div className="mt-8">

            <label className="mb-2 block font-medium">
              Employment Type
            </label>

            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="">Any</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>

          </div>

          <Button
            className="mt-8 w-full"
            size="lg"
            onClick={handleGenerate}
            disabled={loading}
          >

            <UploadCloud className="mr-2 h-5 w-5" />

            {loading
              ? "Finding Jobs..."
              : "Find Matching Jobs"}

          </Button>

        </Card>

        {/* Results */}

        {jobs.length > 0 && (

          <div className="mt-12">

            <h2 className="mb-8 text-3xl font-bold">
              Recommended Jobs
            </h2>

            <div className="space-y-6">

              {jobs.map((job, index) => (

                <Card
                  key={index}
                  className="rounded-3xl p-7 shadow-sm transition hover:shadow-lg"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-2xl font-bold">
                        {job.title}
                      </h3>

                      <p className="text-muted-foreground">
                        {job.company_type}
                      </p>

                    </div>

                    <div className="rounded-full bg-emerald-500/10 px-4 py-2">

                      <span className="font-semibold text-emerald-600">

                        {job.match}

                      </span>

                    </div>

                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-3">

                    <div className="flex items-center gap-2">

                      <MapPin size={18} />

                      {job.location}

                    </div>

                    <div className="flex items-center gap-2">

                      <Briefcase size={18} />

                      {job.employment}

                    </div>

                    <div className="flex items-center gap-2">

                      <DollarSign size={18} />

                      {job.salary}

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="mb-2 flex items-center gap-2">

                      <BadgeCheck
                        size={18}
                        className="text-emerald-500"
                      />

                      <span className="font-semibold">
                        Why this matches you
                      </span>

                    </div>

                    <p className="text-muted-foreground leading-7">
                      {job.reason}
                    </p>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">

                    {job.skills.map((skill: string) => (

                      <span
                        key={skill}
                        className="rounded-full bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-600"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </Card>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}