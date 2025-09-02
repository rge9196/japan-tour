import React from "react";

export const Badge = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
    {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
    {children}
  </span>
);
