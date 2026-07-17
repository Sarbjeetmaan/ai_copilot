import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent"
        >
          AI Career Copilot
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          <a href="#features" className="hover:text-cyan-500 transition">
            Features
          </a>

          <a href="#how" className="hover:text-cyan-500 transition">
            How it Works
          </a>

          <a href="#pricing" className="hover:text-cyan-500 transition">
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button variant="ghost">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>

      </div>
    </header>
  );
}