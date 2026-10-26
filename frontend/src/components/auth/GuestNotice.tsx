import { Link } from "react-router-dom";

import { useAuth } from "@/context/useAuth";

/*
 * Small banner shown at the top of every AI tool page.
 *
 * Guests can use everything, but nothing is saved.
 * Logged-in users get their results saved to History.
 */
export default function GuestNotice() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm">
        History saving is on. Your result will be added to your{" "}
        <Link
          to="/user-dashboard"
          className="font-semibold underline underline-offset-4"
        >
          history
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm">
      You are using Copilot as a guest. Everything works, but your
      results will not be saved.{" "}
      <Link
        to="/login"
        className="font-semibold underline underline-offset-4"
      >
        Login
      </Link>{" "}
      or{" "}
      <Link
        to="/register"
        className="font-semibold underline underline-offset-4"
      >
        create a free account
      </Link>{" "}
      to keep your history.
    </div>
  );
}
