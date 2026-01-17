"use client";
import SectionTitle from "../components/SectionTitle";
import { pricingData } from "../data/pricing";
import type { IPricing } from "../types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

export default function PricingSection() {
  return (
    <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="Pricing"
        text2="Our Pricing Plans"
        text3="Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up."
      />

      <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
        {pricingData.map((plan: IPricing, index: number) => (
          <motion.div
            key={index}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 260,
              damping: 26,
            }}
            className={`relative w-72 rounded-xl border border-purple-900 p-6 pb-10 text-center
      ${plan.mostPopular ? "bg-purple-950" : "bg-purple-950/40"}
    `}
          >
            {/* Most Popular badge */}
            {plan.mostPopular && (
              <span className="absolute -top-3 left-4 rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </span>
            )}

            {/* Plan name */}
            <p className="mb-2 text-sm font-semibold text-purple-300">
              {plan.name}
            </p>

            {/* Price */}
            <div className="mb-6 flex items-end justify-center gap-1">
              <span className="text-4xl font-semibold">${plan.price}</span>
              <span className="text-sm text-slate-400">/{plan.period}</span>
            </div>

            {/* Features */}
            <ul className="mb-8 space-y-3 text-left text-sm text-slate-300">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              type="button"
              className={`w-full rounded-md py-2.5 text-sm font-medium transition
        ${
          plan.mostPopular
            ? "bg-white text-purple-700 hover:bg-slate-200"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }
      `}
            >
              Start Creating
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
