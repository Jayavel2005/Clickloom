import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import type { INavLink } from "../types";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { h1, p } from "motion/react-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useAuth();

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4  px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to="/">
          <div className="flex items-center justify-center gap-0">
            <span className="text-lg font-medium">AIrtist.</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/" className="hover:text-purple-500 transition">
            Home
          </Link>
          <Link to="/generate" className="hover:text-purple-500 transition">
            Generate
          </Link>
          <Link
            to="/my-generations"
            className="hover:text-purple-500 transition"
          >
            My Generations
          </Link>
          <Link to="/#contact" className="hover:text-purple-500 transition">
            Contact
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-300">Hi, {user?.username}</span>
            <button
              onClick={logout}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all rounded-full"
          >
            Get Started
          </button>
        )}

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} className="active:scale-90 transition" />
        </button>
      </motion.nav>

      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link
          to="/"
          onClick={() => {
            (setIsOpen(false), navigate("/"));
          }}
          className="hover:text-purple-500 transition"
        >
          Home
        </Link>
        <Link
          to="/generate"
          onClick={() => {
            (setIsOpen(false), navigate("/generate"));
          }}
          className="hover:text-purple-500 transition"
        >
          Generate
        </Link>
        <Link
          to="/my-generations"
          onClick={() => {
            (setIsOpen(false), navigate("/my-generations"));
          }}
          className="hover:text-purple-500 transition"
        >
          My Generations
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            (setIsOpen(false), navigate("/contact"));
          }}
          className="hover:text-purple-500 transition"
        >
          Contact
        </Link>
        <Link
          to="/login"
          onClick={() => {
            (setIsOpen(false), navigate("/login"));
          }}
          className="hover:text-purple-500 transition"
        >
          Login
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
