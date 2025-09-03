import { motion } from "framer-motion";


export function HighlightCard({ Icon, title, text, delay = 0 }) {
return (
<motion.div
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.5, delay }}
className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
>
<div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
<Icon className="h-6 w-6" aria-hidden />
</div>
<h3 className="text-lg font-semibold">{title}</h3>
<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>
</motion.div>
);
}