import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  UtensilsCrossed,
  Train,
  Leaf,
  Wine,
  Coffee,
  Info,
  Mail,
  Users,
  CheckCircle2,
  ChefHat,
  FileDown,
  Printer,
  Clock,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";

import { itinerary, highlights, inclusions, exclusions, faq } from "@/features/japan-gastro/data";
import { TOUR_START, TOUR_DAYS, TOUR_END, CONTACT_WHATSAPP } from "@/features/japan-gastro/constants";
import { formatDate, downloadJSON, mailto } from "@/features/japan-gastro/utils";


export default function JapanGastroTour() {
  const [size, setSize] = useState(2);
  const [diet, setDiet] = useState([]);

  const dateRange = useMemo(
    () => `${formatDate(TOUR_START)} – ${formatDate(TOUR_END)}`,
    []
  );

  const toggleDiet = (val) =>
    setDiet((d) => (d.includes(val) ? d.filter((x) => x !== val) : [...d, val]));

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      size,
      diet: diet.join(", ") || "None",
      notes: data.get("notes"),
      start: formatDate(TOUR_START),
      end: formatDate(TOUR_END),
    };
    window.location.href = mailto(payload);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50/40 text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-gray-950/70 border-b border-emerald-100/60 dark:border-gray-800">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
            <span>Gastro Japan 11‑Day</span>
          </a>
          <nav className="hidden gap-6 sm:flex">
            <a href="#highlights" className="text-sm font-medium hover:text-emerald-700">
              Highlights
            </a>
            <a href="#itinerary" className="text-sm font-medium hover:text-emerald-700">
              Itinerary
            </a>
            <a href="#inclusions" className="text-sm font-medium hover:text-emerald-700">
              What's Included
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-emerald-700">
              FAQ
            </a>
            <a href="#book" className="text-sm font-semibold text-emerald-700">
              Reserve
            </a>
          </nav>
        </Container>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=2000&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        <Container className="relative z-10">
          <div className="py-24 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Badge icon={CalendarDays}>{dateRange}</Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                11‑Day Japan Gastronomy Tour
              </h1>
              <p className="mt-4 text-lg leading-8 text-white/90">
                Spring cherry blossoms frame a food‑first route through Tokyo,
                Kyoto, Osaka, and Hakone—from Michelin‑starred dining to iconic
                street markets.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  Reserve Your Spot
                </a>
                <button
                  onClick={() =>
                    downloadJSON("japan-11d-itinerary.json", {
                      start: formatDate(TOUR_START),
                      end: formatDate(TOUR_END),
                      days: itinerary,
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-white/60 backdrop-blur transition hover:bg-white"
                >
                  <FileDown className="h-4 w-4" /> Export Itinerary JSON
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-white/60 backdrop-blur transition hover:bg-white"
                >
                  <Printer className="h-4 w-4" /> Print Page
                </button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <Section
        id="highlights"
        eyebrow="Why you'll love it"
        title="Designed around cherry blossoms and bold flavors"
        subtitle="Early April brings peak sakura and seasonal menus. This route balances two Michelin‑starred experiences with market crawls and free time."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{h.text}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Itinerary */}
      <Section
        id="itinerary"
        eyebrow="Day by day"
        title="Your 11‑day route"
        subtitle="Tokyo → Kyoto → Osaka → Hakone → Tokyo, with minimal travel time and maximum eating time."
      >
        <div className="space-y-6">
          {itinerary.map((d) => {
            const date = new Date(TOUR_START);
            date.setDate(TOUR_START.getDate() + (d.n - 1));
            return (
              <motion.article
                key={d.n}
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
                    className="w-full sm:w-32 sm:h-32 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Pill>Day {d.n}</Pill>
                        <Badge icon={CalendarDays}>{formatDate(date)}</Badge>
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
          })}
        </div>
      </Section>

      {/* Inclusions */}
      <Section
        id="inclusions"
        eyebrow="What's included"
        title="Transparent inclusions"
        subtitle="We cover the essentials and the tastiest experiences, and leave several meals open so you can chase cravings."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Included
            </h3>
            <ul className="grid list-disc gap-2 pl-5 marker:text-emerald-600">
              {inclusions.map((item) => (
                <li key={item} className="text-gray-700 dark:text-gray-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5 text-gray-600" /> Not Included
            </h3>
            <ul className="grid list-disc gap-2 pl-5 marker:text-gray-400">
              {exclusions.map((item) => (
                <li key={item} className="text-gray-700 dark:text-gray-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="Good to know"
        title="FAQ"
        subtitle="If you have other questions, just ask when you reserve."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-gray-200 bg-white p-5 open:shadow-sm dark:border-gray-800 dark:bg-gray-950"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <Clock className="h-4 w-4 text-gray-500 transition group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Booking */}
      <Section
        id="book"
        eyebrow="Secure your seat"
        title="Reserve now"
        subtitle="No payment collected here — this form sends an email inquiry. We'll reply with availability and next steps."
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium">Full name</span>
                <input
                  required
                  name="name"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-emerald-200 focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="e.g., Il Rabineee"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-emerald-200 focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Phone / WhatsApp</span>
                <input
                  name="phone"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-emerald-200 focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="+52 …"
                />
              </label>
              <div className="grid gap-2">
                <span className="text-sm font-medium">Group size</span>
                <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <Users className="h-4 w-4 text-gray-500" />
                  <input
                    type="range"
                    min={1}
                    max={12}
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="w-8 text-right text-sm tabular-nums">{size}</span>
                </div>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-medium">Dietary preferences</legend>
                <div className="flex flex-wrap gap-2">
                  {["Vegetarian", "Pescatarian", "No pork", "No shellfish", "Gluten‑free"].map((dopt) => (
                    <label
                      key={dopt}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
                        diet.includes(dopt)
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-gray-300 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={diet.includes(dopt)}
                        onChange={() => toggleDiet(dopt)}
                      />
                      {dopt}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="sm:col-span-2 grid gap-2">
                <span className="text-sm font-medium">Notes (optional)</span>
                <textarea
                  name="notes"
                  rows={4}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-emerald-200 focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="Tell us about anniversaries, must‑eat dishes, mobility, or flight ideas."
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                <Mail className="h-4 w-4" /> Send Inquiry
              </button>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-semibold text-white ring-1 ring-inset ring-green-600 transition hover:bg-green-600 dark:bg-green-600 dark:ring-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M20.52 3.48A11.89 11.89 0 0 0 12 0C5.38 0 .02 5.37.02 12c0 2.11.55 4.15 1.6 5.95L0 24l6.22-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22a9.89 9.89 0 0 1-5.07-1.39l-.36-.22-3.68.96.98-3.58-.24-.37A9.9 9.9 0 0 1 2 12c0-5.51 4.49-10 10-10s10 4.49 10 10-4.49 10-10 10zm5.5-7.37c-.3-.15-1.77-.88-2.04-.98s-.47-.15-.67.15-.77.98-.95 1.18-.35.22-.65.07c-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37s-1.05 1.03-1.05 2.5 1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              By sending, you agree to be contacted about availability. Dates shown: {dateRange}.
            </p>
          </form>

          <aside className="lg:col-span-2 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-1 text-lg font-semibold">Trip snapshot</h3>
            <div className="flex flex-wrap gap-2">
              <Pill>{TOUR_DAYS} days</Pill>
              <Pill>4 destinations</Pill>
              <Pill>Food‑first pacing</Pill>
              <Pill>Small groups</Pill>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-emerald-700" /> {dateRange}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-700" /> Tokyo · Kyoto · Osaka · Hakone · Tokyo
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-emerald-700" /> Daily breakfast + key tastings
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
              Early April is peak sakura in many areas. Pack layers and good walking shoes. Some tastings are outdoors.
            </div>
          </aside>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 text-sm dark:border-gray-800 dark:bg-gray-950">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Gastro Journeys. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#highlights" className="hover:text-emerald-700">Highlights</a>
            <a href="#itinerary" className="hover:text-emerald-700">Itinerary</a>
            <a href="#book" className="hover:text-emerald-700">Reserve</a>
          </div>
        </Container>
      </footer>

      {/* Print styles */}
      <style>{`
        @media print {
          header, .no-print { display: none !important; }
          section { page-break-inside: avoid; }
          body { color: #111; }
        }
      `}</style>
    </main>
  );
}
