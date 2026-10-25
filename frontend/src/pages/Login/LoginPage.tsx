import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { loginUser } from "@/api/auth";
import { useAuth } from "@/context/useAuth";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  BrainCircuit,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      login(data.access_token, {
        name: data.name,
        email: data.email,
      });

      alert("Login Successful!");

      navigate("/");

    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {
        alert(
          err.response?.data?.detail ??
          "Invalid email or password."
        );
      } else {
        alert("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-6">

      <Card className="w-full max-w-md rounded-3xl p-10 shadow-xl">

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950">

            <BrainCircuit className="h-10 w-10 text-blue-600 dark:text-blue-400" />

          </div>

        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Login to AI Career Copilot
        </p>

        {/* Email */}

        <div className="mt-8">

          <label className="font-medium">
            Email
          </label>

          <div className="mt-2 flex items-center rounded-xl border px-4">

            <Mail className="h-5 w-5 text-slate-400" />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div className="mt-6">

          <label className="font-medium">
            Password
          </label>

          <div className="mt-2 flex items-center rounded-xl border px-4">

            <Lock className="h-5 w-5 text-slate-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-500" />
              ) : (
                <Eye className="h-5 w-5 text-slate-500" />
              )}
            </button>

          </div>

        </div>

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="mt-8 w-full"
          size="lg"
        >
          {loading
            ? "Signing In..."
            : "Login"}

          {!loading && (
            <ArrowRight className="ml-2 h-5 w-5" />
          )}
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </Card>

    </div>
  );
}