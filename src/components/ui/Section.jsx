import React from "react";
import { motion } from "framer-motion";

export const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 max-w-3xl text-base text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);