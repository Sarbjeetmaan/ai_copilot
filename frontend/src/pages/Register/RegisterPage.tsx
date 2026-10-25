import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "@/api/auth";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  BrainCircuit,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

async function handleRegister() {
  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    await registerUser({
      name,
      email,
      password,
    });

    alert("Registration Successful!");

    navigate("/login");

  } catch (err: unknown) {

    if (axios.isAxiosError(err)) {
      alert(
        err.response?.data?.detail ||
        "Registration Failed."
      );
    } else {
      alert("Something went wrong.");
    }

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center px-6">

      <Card className="w-full max-w-md rounded-3xl p-10 shadow-xl">

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">

            <BrainCircuit className="h-10 w-10 text-blue-600" />

          </div>

        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Join AI Career Copilot
        </p>

        {/* Name */}

        <div className="mt-8">

          <label className="font-medium">
            Full Name
          </label>

          <div className="mt-2 flex items-center rounded-xl border px-4">

            <User className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

          </div>

        </div>

        {/* Email */}

        <div className="mt-6">

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
              placeholder="Create password"
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
          onClick={handleRegister}
          disabled={loading}
          className="mt-8 w-full"
          size="lg"
        >
          <UserPlus className="mr-2 h-5 w-5" />

          {loading
            ? "Creating Account..."
            : "Register"}
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </Card>

    </div>
  );
}