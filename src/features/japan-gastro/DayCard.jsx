import { motion } from "framer-motion";
import { CalendarDays, MapPin, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { formatDate } from "@/features/japan-gastro/utils";


export function DayCard({ d }) {
return (
<motion.article
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.45 }}
className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
>
<div className="flex flex-col sm:flex-row gap-4">
<img
src={d.imageUrl}
alt={`${d.city} — ${d.title}`}
loading="lazy"
decoding="async"
width="256"
height="256"
className="w-full sm:w-32 sm:h-32 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
/>
<div className="flex-1 min-w-0">
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
<div className="flex items-center gap-3">
<Pill>Day {d.n}</Pill>
<Badge icon={CalendarDays}>{formatDate(d.date)}</Badge>
</div>
<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
<MapPin className="h-4 w-4" /> {d.city}
</div>
</div>
<h3 className="mt-3 text-xl font-semibold">{d.title}</h3>
<p className="mt-2 text-gray-700 dark:text-gray-200">{d.blurb}</p>
<div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
<Badge icon={UtensilsCrossed}>Meals: {d.meals}</Badge>
</div>
</div>
</div>
</motion.article>
);
}