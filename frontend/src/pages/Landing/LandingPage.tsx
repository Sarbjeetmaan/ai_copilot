import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-6xl font-bold">
          AI Career Copilot
        </h1>

        <p className="mt-6 text-xl text-gray-400">
          Analyze Resume • Match Jobs • AI Interview Preparation
        </p>
      </div>
    </div>
  );
}