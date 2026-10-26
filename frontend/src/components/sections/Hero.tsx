import { Button } from "@/components/ui/button";

import { Sparkles, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AIWorkspace from "@/components/landing/AIWorkspace";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16">

      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles size={16} className="text-cyan-500" />
            AI Powered Resume Intelligence
          </div>

          <h1 className="text-5xl font-black leading-[1.1] tracking-tight xl:text-6xl">
            Analyze Your Resume
            <span className="block bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Using Artificial Intelligence
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Upload your resume and receive ATS score,
            job matching, interview questions and AI
            powered resume improvements.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Button size="lg" asChild>
              <Link to="/upload">
                <UploadCloud className="mr-2 h-5 w-5" />
                Upload Resume
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              Live Demo
            </Button>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AIWorkspace />
        </motion.div>

      </div>

    </section>
  );
}