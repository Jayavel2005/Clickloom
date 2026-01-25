import { footerData } from "../data/footer";
import {
  DribbbleIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
      <motion.div
        className="flex flex-wrap items-start gap-10 md:gap-35"
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        {/* Brand */}
        <Link to="/">
          <img
            className="size-8 aspect-square"
            src="/assets/footer-logo.svg"
            alt="AIrtist logo"
            width={32}
            height={32}
          />
        </Link>

        {/* Footer sections */}
        {footerData.map((section, index) => (
          <div key={index}>
            <p className="text-slate-100 font-semibold">{section.title}</p>
            <ul className="mt-2 space-y-2">
              {section.links.map((link: IFooterLink, index: number) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-purple-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Right side */}
      <motion.div
        className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <p className="max-w-60">
          Turning ideas into expressive visuals with the power of AI.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-4 mt-3">
          <a href="#" aria-label="Dribbble">
            <DribbbleIcon className="size-5 hover:text-purple-400" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <LinkedinIcon className="size-5 hover:text-purple-400" />
          </a>
          <a href="#" aria-label="Twitter">
            <TwitterIcon className="size-5 hover:text-purple-400" />
          </a>
          <a href="#" aria-label="YouTube">
            <YoutubeIcon className="size-6 hover:text-purple-400" />
          </a>
        </div>

        <p className="mt-3 text-center">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-slate-200">AIrtist</span>. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
