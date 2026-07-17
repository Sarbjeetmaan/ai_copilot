import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, UploadCloud, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24">

      {/* Background Blur */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Sparkles size={18} />
            AI Powered Resume Intelligence
          </div>

          <h1 className="text-6xl font-black leading-tight">
            Analyze Your Resume
            <span className="block bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Using Artificial Intelligence
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Upload your resume and receive ATS score,
            job matching, interview questions and AI
            powered resume improvements.
          </p>

          <div className="mt-10 flex gap-4">

            <Button size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Upload Resume
            </Button>

            <Button variant="outline" size="lg">
              Live Demo
            </Button>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity:0, x:50 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:.2 }}
        >

          <Card className="rounded-3xl p-8">

            <div className="flex items-center gap-3">

              <FileCheck className="text-green-500"/>

              <div>

                <h3 className="font-bold">
                  Resume Analysis
                </h3>

                <p className="text-sm text-muted-foreground">
                  Completed Successfully
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-5">

              <div>
                <div className="flex justify-between">
                  <span>ATS Score</span>
                  <span>94%</span>
                </div>

                <div className="mt-2 h-2 rounded bg-muted">
                  <div className="h-2 w-[94%] rounded bg-green-500"></div>
                </div>

              </div>

              <div>
                <div className="flex justify-between">
                  <span>Job Match</span>
                  <span>91%</span>
                </div>

                <div className="mt-2 h-2 rounded bg-muted">
                  <div className="h-2 w-[91%] rounded bg-cyan-500"></div>
                </div>

              </div>

              <div>
                <div className="flex justify-between">
                  <span>Skills Found</span>
                  <span>18</span>
                </div>

                <div className="mt-2 h-2 rounded bg-muted">
                  <div className="h-2 w-[85%] rounded bg-violet-500"></div>
                </div>

              </div>

            </div>

          </Card>

        </motion.div>

      </div>

    </section>
  );
}