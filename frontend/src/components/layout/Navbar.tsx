import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import { useAuth } from "@/context/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    user,
    logout,
  } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent"
        >
          AI Career Copilot
        </Link>

        {/* Navigation */}

        <nav className="hidden gap-8 md:flex">

          <a
            href="/#features"
            className="transition hover:text-cyan-500"
          >
            Features
          </a>

          <a
            href="/#how"
            className="transition hover:text-cyan-500"
          >
            How it Works
          </a>

          <a
            href="/#pricing"
            className="transition hover:text-cyan-500"
          >
            Pricing
          </a>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Theme */}

          <ThemeToggle />

          {/* Guest */}

          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                asChild
              >
                <Link to="/login">
                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link to="/register">
                  Get Started
                </Link>
              </Button>
            </>
          ) : (

            /* Logged In */

            <>
              {/* User Greeting */}

              <span className="hidden text-sm font-medium text-muted-foreground md:block">
                Hi, {user?.name}
              </span>

              {/* History */}

              <Button
                variant="ghost"
                asChild
              >
                <Link to="/user-dashboard">
                  History
                </Link>
              </Button>

              {/* Current Resume Analysis */}

              

              {/* Logout */}

              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}