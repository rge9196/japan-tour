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
  Phone,
  Users,
  CheckCircle2,
  ChefHat,
  FileDown,
  Printer,
  Clock,
} from "lucide-react";

// ---- Utility Components ----
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="py-16 sm:py-20">
    <Container>
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
    </Container>
  </section>
);

const Badge = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
    {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
    {children}
  </span>
);

const Pill = ({ children }) => (
  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
    {children}
  </span>
);

// ---- Data (UPDATED for April 7–17, Tokyo → Kyoto → Osaka → Hakone → Tokyo) ----
const TOUR_START = new Date(2026, 3, 7); // Day 1
const TOUR_DAYS = 11; // Apr 7–17 inclusive
const TOUR_END = new Date(
  new Date(TOUR_START).setDate(TOUR_START.getDate() + (TOUR_DAYS - 1))
);

const formatDate = (d) =>
  d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const day = (n, city, title, blurb, meals = "Breakfast", imageUrl = "") => ({
  n,
  city,
  title,
  blurb,
  meals,
  imageUrl,
});

// New gastro-forward plan with 2 Michelin experiences + street-food markets
const itinerary = [
  day(
    1,
    "Tokyo",
    "Welcome to Japan",
    "Arrival, airport transfer, and welcome tasting walk in a lively neighborhood. Evening ramen stop and sake toast.",
    "Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.DkBX9g31Gl4qQZBH-x1R9wHaEL?pid=Api" // Tokyo Ramen Street
  ),
  day(
    2,
    "Tokyo",
    "Michelin-Star Sushi Omakase",
    "Chef's counter omakase at a Michelin-starred sushi house. Free afternoon for museums or shopping.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.PQfzjY2-XPSE8Z6la-INNAHaLH?pid=Api" // Sushi counter
  ),
  day(
    3,
    "Tokyo",
    "Tsukiji Outer Market + Ramen Crawl",
    "Street-food tastings among classic stalls, then a curated ramen hop in Shinjuku.",
    "Breakfast, Lunch",
    "https://tse1.mm.bing.net/th/id/OIP.XUPP4u7usK6e_aTh-1rgdAHaD2?pid=Api" // Tsukiji Market
  ),
  day(
    4,
    "Kyoto",
    "Shinkansen to Kyoto + Gion",
    "Bullet train to Kyoto. Stroll Gion's lanes at dusk before a refined kaiseki tasting at a Michelin-starred ryōtei.",
    "Breakfast, Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.mPcOtjQqdGTXw05nPPr1YAHaEo?pid=Api" // Gion at night
  ),
  day(
    5,
    "Kyoto",
    "Nishiki Market + Tea Ceremony",
    "Guided bites through Kyoto's kitchen, then a traditional matcha ceremony in a teahouse.",
    "Breakfast, Lunch",
    "https://tse1.mm.bing.net/th/id/OIP.8VlLk_ZHFvtjB-Y1jvGw7wHaFj?pid=Api" // Nishiki Market
  ),
  day(
    6,
    "Osaka",
    "Dotonbori Street Feast",
    "Neon-lit canals and sizzling griddles—takoyaki, okonomiyaki, and kushikatsu along Dotonbori.",
    "Breakfast, Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.Q0N1_p7hJI20RS4-s8vEXQHaHa?pid=Api" // Dotonbori
  ),
  day(
    7,
    "Osaka",
    "Kuromon Market + Izakaya Night",
    "Seafood tastings and wagyu bites at Kuromon Market; craft beer & izakaya hop after dark.",
    "Breakfast, Lunch",
    "https://tse2.mm.bing.net/th/id/OIP.M-TNt8VbP0kxkA5C9hM-zQHaE8?pid=Api" // Kuromon Market
  ),
  day(
    8,
    "Hakone",
    "Ryokan Onsen + Kaiseki",
    "Transfer to Hakone for hot-spring relaxation and a seasonal multi-course ryokan dinner.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.8VlLk_ZHFvtjB-Y1jvGw7wHaFj?pid=Api" // Kaiseki dinner
  ),
  day(
    9,
    "Hakone",
    "Lake Ashi, Ropeway & Local Soba",
    "Views toward Fuji (weather permitting), ropeway ride, and rustic soba & tofu specialties.",
    "Breakfast, Lunch",
    "https://tse2.mm.bing.net/th/id/OIP.9lLg6s7OhDwpMhuYPpGJAgHaE8?pid=Api" // Lake Ashi
  ),
  day(
    10,
    "Tokyo",
    "Return to Tokyo: Ginza Tastes",
    "Back to the capital for gourmet shopping—wagashi sweets, sake—and a tempura & unagi farewell feast.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.PQfzjY2-XPSE8Z6la-INNAHaLH?pid=Api" // Sushi/Tempura
  ),
  day(
    11,
    "Tokyo",
    "Departure Day",
    "Free morning for last-minute treats. Airport transfer and farewell. Arigatō!",
    "Breakfast",
    "https://tse3.mm.bing.net/th/id/OIP.DkBX9g31Gl4qQZBH-x1R9wHaEL?pid=Api" // Tokyo airport ramen vibes
  ),
];

const highlights = [
  {
    icon: UtensilsCrossed,
    title: "11 days of flavors",
    text: "From Michelin-star kaiseki & sushi to iconic markets and street eats—paced for maximum taste.",
  },
  {
    icon: Train,
    title: "Smooth rail links",
    text: "Shinkansen and limited express rides with reserved seats and seamless transfers.",
  },
  {
    icon: Leaf,
    title: "Spring & blossoms",
    text: "Early April timing to catch cherry blossoms alongside seasonal menus.",
  },
  {
    icon: Wine,
    title: "Pairings & tastings",
    text: "Curated sake flights, regional brews, and optional tea pairings.",
  },
  {
    icon: ChefHat,
    title: "Two Michelin moments",
    text: "Tokyo omakase counter and Kyoto ryōtei kaiseki—both Michelin-recognized.",
  },
  {
    icon: CalendarDays,
    title: "Balanced schedule",
    text: "Guided headline meals plus free time to follow your appetite.",
  },
];

const inclusions = [
  "10 nights hand‑picked stays (boutique hotels/ryokan mix)",
  "Breakfast daily + curated tastings and featured meals",
  "Airport transfers on arrival & departure",
  "Intercity rail tickets with seat reservations",
  "Local expert hosts and culinary guides",
  "All entry fees for included activities",
];

const exclusions = [
  "International flights",
  "Travel insurance",
  "Personal expenses and optional add‑ons",
  "Some lunches/dinners to keep flexibility",
];

// ---- Helpers ----
const downloadJSON = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const mailto = ({ name, email, phone, size, diet, notes }) => {
  const to = "tours@yourcompany.com"; // ← change this to your inbox
  const subject = encodeURIComponent(
    "Japan 11‑Day Gastronomy Tour — Booking Inquiry"
  );
  const body = encodeURIComponent(
    `Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Group size: ${size}
Dietary notes: ${diet}

Message:
${notes}

Preferred dates: ${formatDate(TOUR_START)} – ${formatDate(TOUR_END)} (11 days)`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
};

// ---- Page ----
export default function JapanGastroTour() {
  const [size, setSize] = useState(2);
  const [diet, setDiet] = useState([]);

  const dateRange = useMemo(
    () => `${formatDate(TOUR_START)} – ${formatDate(TOUR_END)}`,
    []
  );

  const toggleDiet = (val) =>
    setDiet((d) =>
      d.includes(val) ? d.filter((x) => x !== val) : [...d, val]
    );

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
            <a
              href="#highlights"
              className="text-sm font-medium hover:text-emerald-700"
            >
              Highlights
            </a>
            <a
              href="#itinerary"
              className="text-sm font-medium hover:text-emerald-700"
            >
              Itinerary
            </a>
            <a
              href="#inclusions"
              className="text-sm font-medium hover:text-emerald-700"
            >
              What's Included
            </a>
            <a
              href="#faq"
              className="text-sm font-medium hover:text-emerald-700"
            >
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
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                <h.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {h.text}
              </p>
            </motion.div>
          ))}
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
                  {/* Image on the left */}
                  <img
                    src={d.imageUrl}
                    alt={`${d.city} — ${d.title}`}
                    loading="lazy"
                    className="w-full sm:w-32 sm:h-32 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                  />

                  {/* Text content on the right */}
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
                    <p className="mt-2 text-gray-700 dark:text-gray-200">
                      {d.blurb}
                    </p>
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
          {[
            {
              q: "How physical is the tour?",
              a: "Expect 8,000–12,000 steps on market days with breaks. Most transfers are by rail with minimal luggage handling.",
            },
            {
              q: "Can you handle dietary needs?",
              a: "We accommodate pescatarian, vegetarian, and no‑pork requests with advance notice. Severe allergies require custom arrangements.",
            },
            {
              q: "What are the exact hotels and restaurants?",
              a: "Final list is shared ~30 days prior and may vary by date to reflect seasonal availability and quality.",
            },
            {
              q: "Is this suitable for first‑time visitors?",
              a: "Yes — we blend must‑try classics with local gems, plus free time to explore at your own pace.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-gray-200 bg-white p-5 open:shadow-sm dark:border-gray-800 dark:bg-gray-950"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <Clock className="h-4 w-4 text-gray-500 transition group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                {f.a}
              </p>
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
                  <span className="w-8 text-right text-sm tabular-nums">
                    {size}
                  </span>
                </div>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-medium">
                  Dietary preferences
                </legend>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Vegetarian",
                    "Pescatarian",
                    "No pork",
                    "No shellfish",
                    "Gluten‑free",
                  ].map((dopt) => (
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
                href="tel:+521234567890"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:ring-gray-700"
              >
                <Phone className="h-4 w-4" /> Call Us
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              By sending, you agree to be contacted about availability. Dates
              shown: {dateRange}.
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
                <CalendarDays className="h-4 w-4 text-emerald-700" />{" "}
                {dateRange}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-700" /> Tokyo · Kyoto ·
                Osaka · Hakone · Tokyo
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-emerald-700" /> Daily breakfast
                + key tastings
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
              Early April is peak sakura in many areas. Pack layers and good
              walking shoes. Some tastings are outdoors.
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
            <a href="#highlights" className="hover:text-emerald-700">
              Highlights
            </a>
            <a href="#itinerary" className="hover:text-emerald-700">
              Itinerary
            </a>
            <a href="#book" className="hover:text-emerald-700">
              Reserve
            </a>
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
