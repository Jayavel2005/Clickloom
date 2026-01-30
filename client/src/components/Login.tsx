import React, { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { successNotify } from "../utils/notify.util";

type AuthState = "login" | "register";

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const [state, setState] = useState<AuthState>("login");
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /* ---------------- Helpers ---------------- */

  const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (state === "register") {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Handlers ---------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const url =
          state === "login"
              ? "http://localhost:5000/api/v1/auth/login"
              : "http://localhost:5000/api/v1/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Authentication failed" });
        return;
      }

      successNotify(
          state === "login"
              ? "User successfully logged in 🎉"
              : "User registered successfully 🎉"
      );

      login(data.user);
      navigate("/");
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <form
              onSubmit={handleSubmit}
              className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
          >
            <h1 className="text-white text-3xl mt-10 font-medium">
              {state === "login" ? "Welcome back" : "Create your account"}
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              {state === "login"
                  ? "Sign in to continue to AIrtist"
                  : "Start creating high-visual Images ✨"}
            </p>

            {/* Username */}
            {state === "register" && (
                <>
                  <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full pl-6">
                    <input
                        type="text"
                        name="username"
                        placeholder="Your name"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                    />
                  </div>
                  {errors.username && (
                      <p className="text-sm text-red-400 text-left mt-1">
                        {errors.username}
                      </p>
                  )}
                </>
            )}

            {/* Email */}
            <div className="flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full pl-6">
              <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              />
            </div>
            {errors.email && (
                <p className="text-sm text-red-400 text-left mt-1">
                  {errors.email}
                </p>
            )}

            {/* Password */}
            <div className="flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full pl-6">
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              />
            </div>
            {errors.password && (
                <p className="text-sm text-red-400 text-left mt-1">
                  {errors.password}
                </p>
            )}

            {errors.general && (
                <p className="mt-3 text-sm text-red-400 text-left">
                  {errors.general}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-500 transition disabled:opacity-50"
            >
              {loading
                  ? "Please wait..."
                  : state === "login"
                      ? "Sign in"
                      : "Create account"}
            </button>

            <p
                onClick={() =>
                    setState((prev) => (prev === "login" ? "register" : "login"))
                }
                className="text-gray-400 text-sm mt-4 mb-11 cursor-pointer"
            >
              {state === "login"
                  ? "New to Clickloom?"
                  : "Already have an account?"}
              <span className="text-purple-400 hover:underline ml-1">
              {state === "login" ? "Create one" : "Sign in"}
            </span>
            </p>
          </form>
        </div>

        <SoftBackdrop />
      </>
  );
};

export default Login;
