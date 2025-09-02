import React from "react";

export const Pill = ({ children }) => (
  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
    {children}
  </span>
);
