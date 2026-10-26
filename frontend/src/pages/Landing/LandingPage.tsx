import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";

/*
 * The Navbar is rendered once, globally, in App.tsx.
 * The AI Workspace card lives inside <Hero />.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      <Hero />

      <Features />

      <HowItWorks />

      <Stats />

    </div>
  );
}