// ❌ Remove this line if NOT using Next.js App Router
// "use client";

import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // ✅ REQUIRED by Web3Forms
    formData.append("access_key", "049c376b-0768-410f-91ed-e047aee0e4a9");
    formData.append("subject", "New Contact Message - Airtist");
    formData.append("from_name", "Airtist Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Web3Forms response:", data);

      if (!data.success) {
        throw new Error(data.message || "Submission failed");
      }

      setStatus("success");
      setFeedback("Message sent successfully ✨");
      form.reset();
    } catch (error) {
      console.error("Web3Forms error:", error);
      setStatus("error");
      setFeedback("Failed to send message. Please try again.");
    }
  };

  return (
      <div className="px-4 md:px-16 lg:px-24 xl:px-32" id="contact">
        <SectionTitle
            text1="Contact"
            text2="Let’s build better Visuals"
            text3="Whether it’s feedback, support, or feature ideas — drop us a message and we’ll get back to you."
        />

        <form
            onSubmit={onSubmit}
            className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full"
            id="airtist-contact-section"
        >
          {/* 🔒 Bot Protection (required) */}
          <input type="checkbox" name="botcheck" className="hidden" />

          {/* Name */}
          <motion.div
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 70 }}
          >
            <p className="mb-2 font-medium">Your name</p>
            <div className="flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-purple-500">
              <UserIcon className="size-5" />
              <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 280, damping: 70 }}
          >
            <p className="mb-2 font-medium">Email id</p>
            <div className="flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-purple-500">
              <MailIcon className="size-5" />
              <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
              className="sm:col-span-2"
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 240, damping: 70 }}
          >
            <p className="mb-2 font-medium">Message</p>
            <textarea
                name="message"
                rows={8}
                required
                placeholder="Enter your message"
                className="resize-none w-full p-3 outline-none rounded-lg border border-slate-700 focus:border-purple-500 bg-transparent"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
              type="submit"
              disabled={status === "loading"}
              className="w-max flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-10 py-3 rounded-full"
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 280, damping: 70 }}
          >
            {status === "loading" ? "Sending..." : "Submit"}
            <ArrowRightIcon className="size-5" />
          </motion.button>

          {/* Feedback */}
          {feedback && (
              <p
                  className={`sm:col-span-2 text-sm ${
                      status === "success" ? "text-green-400" : "text-red-400"
                  }`}
              >
                {feedback}
              </p>
          )}
        </form>
      </div>
  );
}
