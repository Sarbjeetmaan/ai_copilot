import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import AIWorkspace from "@/components/landing/AIWorkspace";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      <Navbar />

      <Hero />

      <Features />

      <AIWorkspace />

      <HowItWorks />

      <Stats />

    </div>
  );
}