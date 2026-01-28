import React, { useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { successNotify } from "../utils/notify.util";

const Login = () => {
  const [state, setState] = React.useState<"login" | "register">("login");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth();

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state === "login") {
      setErrorMessage("");
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || "Login failed");
        }

        if (data.success) {
          successNotify("User successfully logged in.");
          setErrorMessage("");
          login(data.user);
          navigate("/");
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
        console.log(error);
      }
    }

    if (state === "register") {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || "SignUp Failed");
        }

        if (data.success) {
          successNotify("User Registered Successfully.");
          setErrorMessage("");
          login(data.user);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
        >
          {/* Heading */}
          <h1 className="text-white text-3xl mt-10 font-medium">
            {state === "login" ? "Welcome back" : "Create your account"}
          </h1>

          {/* Subheading */}
          <p className="text-gray-400 text-sm mt-2">
            {state === "login"
              ? "Sign in to continue to AIrtist"
              : "Start creating high-visual Images ✨"}
          </p>

          {/* Name (Register only) */}
          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-white/60"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <input
                type="text"
                name="username"
                placeholder="Your name"
                className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-purple-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && (
            <p className="mt-3 text-sm text-red-400 text-start">
              {errorMessage}
            </p>
          )}

          {/* Forgot password */}
          {state === "login" && (
            <div className="mt-4 text-left">
              <button
                type="button"
                className="text-sm text-purple-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-500 transition"
          >
            {state === "login" ? "Sign in" : "Create account"}
          </button>

          {/* Toggle */}
          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
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
