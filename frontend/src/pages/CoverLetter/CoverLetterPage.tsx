import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateCoverLetter } from "@/api/cover";
import GuestNotice from "@/components/auth/GuestNotice";

import {
  UploadCloud,
  FileText,
  Sparkles,
  Copy,
  FileDown,
} from "lucide-react";

import jsPDF from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
} from "docx";
import { saveAs } from "file-saver";

export default function CoverLetterPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateCoverLetter(
        resume,
        jobDescription
      );

      setCoverLetter(data.cover_letter);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLetter() {
    await navigator.clipboard.writeText(coverLetter);
    alert("Copied!");
  }

  function downloadPDF() {
    const pdf = new jsPDF();

    const lines = pdf.splitTextToSize(
      coverLetter,
      180
    );

    pdf.text(lines, 15, 20);

    pdf.save("Cover_Letter.pdf");
  }

  async function downloadDOCX() {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: coverLetter,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    saveAs(blob, "Cover_Letter.docx");
  }

  return (
    <div className="min-h-screen bg-background px-6 py-16">

      <div className="mx-auto max-w-5xl">

        <GuestNotice />

        {/* Heading */}

        <div className="mb-10 flex items-center gap-5">

          <div className="rounded-2xl bg-sky-500/10 p-4">
            <Sparkles className="h-8 w-8 text-sky-500" />
          </div>

          <div>

            <h1 className="text-5xl font-bold">
              AI Cover Letter Generator
            </h1>

            <p className="mt-2 text-muted-foreground">
              Create a personalized cover letter using your
              resume and the job description.
            </p>

          </div>

        </div>

        {/* Upload Section */}

        <Card className="rounded-3xl border p-8 shadow-sm">

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold">

              <FileText className="h-5 w-5 text-sky-500" />

              Resume

            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files?.[0] || null)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="mt-8">

            <label className="mb-3 flex items-center gap-2 font-semibold">

              <FileText className="h-5 w-5 text-violet-500" />

              Job Description

            </label>

            <textarea
              rows={10}
              placeholder="Paste the Job Description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              className="w-full rounded-xl border p-4 leading-7"
            />

          </div>

          <Button
            className="mt-8 w-full rounded-xl"
            size="lg"
            disabled={loading}
            onClick={handleGenerate}
          >
            <UploadCloud className="mr-2 h-5 w-5" />

            {loading
              ? "Generating..."
              : "Generate Cover Letter"}

          </Button>

        </Card>

        {/* Result */}

        {coverLetter && (

          <Card className="mt-10 rounded-3xl border p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold">
                  Generated Cover Letter
                </h2>

                <p className="mt-1 text-muted-foreground">
                  Ready to download or copy.
                </p>

              </div>

              <div className="flex gap-3">

                <Button
                  variant="outline"
                  onClick={copyLetter}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>

                <Button
                  variant="outline"
                  onClick={downloadPDF}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  PDF
                </Button>

                <Button
                  variant="outline"
                  onClick={downloadDOCX}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  DOCX
                </Button>

              </div>

            </div>

            <div className="rounded-2xl border bg-muted/30 p-8">

              <pre className="whitespace-pre-wrap font-sans leading-8 text-[15px]">
                {coverLetter}
              </pre>

            </div>

          </Card>

        )}

      </div>

    </div>
  );
}