import {
  UtensilsCrossed,
  Train,
  Leaf,
  Wine,
  ChefHat,
  CalendarDays,
} from "lucide-react";



// Helpers for constructing data items
const day = (n, city, title, blurb, meals = "Breakfast", imageUrl = "") => ({
  n,
  city,
  title,
  blurb,
  meals,
  imageUrl,
});

export const highlights = [
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


export const inclusions = [
  "10 nights hand‑picked stays (boutique hotels/ryokan mix)",
  "Breakfast daily + curated tastings and featured meals",
  "Airport transfers on arrival & departure",
  "Intercity rail tickets with seat reservations",
  "Local expert hosts and culinary guides",
  "All entry fees for included activities",
];

export const exclusions = [
  "International flights",
  "Travel insurance",
  "Personal expenses and optional add‑ons",
  "Some lunches/dinners to keep flexibility",
];

// Full itinerary (images kept as in original)
export const itinerary = [
  day(
    1,
    "Tokyo",
    "Welcome to Japan",
    "Arrival, airport transfer, and welcome tasting walk in a lively neighborhood. Evening ramen stop and sake toast.",
    "Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.DkBX9g31Gl4qQZBH-x1R9wHaEL?pid=Api"
  ),
  day(
    2,
    "Tokyo",
    "Michelin-Star Sushi Omakase",
    "Chef's counter omakase at a Michelin-starred sushi house. Free afternoon for museums or shopping.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.PQfzjY2-XPSE8Z6la-INNAHaLH?pid=Api"
  ),
  day(
    3,
    "Tokyo",
    "Tsukiji Outer Market + Ramen Crawl",
    "Street-food tastings among classic stalls, then a curated ramen hop in Shinjuku.",
    "Breakfast, Lunch",
    "https://tse1.mm.bing.net/th/id/OIP.XUPP4u7usK6e_aTh-1rgdAHaD2?pid=Api"
  ),
  day(
    4,
    "Kyoto",
    "Shinkansen to Kyoto + Gion",
    "Bullet train to Kyoto. Stroll Gion's lanes at dusk before a refined kaiseki tasting at a Michelin-starred ryōtei.",
    "Breakfast, Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.mPcOtjQqdGTXw05nPPr1YAHaEo?pid=Api"
  ),
  day(
    5,
    "Kyoto",
    "Nishiki Market + Tea Ceremony",
    "Guided bites through Kyoto's kitchen, then a traditional matcha ceremony in a teahouse.",
    "Breakfast, Lunch",
    "https://tse1.mm.bing.net/th/id/OIP.8VlLk_ZHFvtjB-Y1jvGw7wHaFj?pid=Api"
  ),
  day(
    6,
    "Osaka",
    "Dotonbori Street Feast",
    "Neon-lit canals and sizzling griddles—takoyaki, okonomiyaki, and kushikatsu along Dotonbori.",
    "Breakfast, Dinner",
    "https://tse3.mm.bing.net/th/id/OIP.Q0N1_p7hJI20RS4-s8vEXQHaHa?pid=Api"
  ),
  day(
    7,
    "Osaka",
    "Kuromon Market + Izakaya Night",
    "Seafood tastings and wagyu bites at Kuromon Market; craft beer & izakaya hop after dark.",
    "Breakfast, Lunch",
    "https://tse2.mm.bing.net/th/id/OIP.M-TNt8VbP0kxkA5C9hM-zQHaE8?pid=Api"
  ),
  day(
    8,
    "Hakone",
    "Ryokan Onsen + Kaiseki",
    "Transfer to Hakone for hot-spring relaxation and a seasonal multi-course ryokan dinner.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.8VlLk_ZHFvtjB-Y1jvGw7wHaFj?pid=Api"
  ),
  day(
    9,
    "Hakone",
    "Lake Ashi, Ropeway & Local Soba",
    "Views toward Fuji (weather permitting), ropeway ride, and rustic soba & tofu specialties.",
    "Breakfast, Lunch",
    "https://tse2.mm.bing.net/th/id/OIP.9lLg6s7OhDwpMhuYPpGJAgHaE8?pid=Api"
  ),
  day(
    10,
    "Tokyo",
    "Return to Tokyo: Ginza Tastes",
    "Back to the capital for gourmet shopping—wagashi sweets, sake—and a tempura & unagi farewell feast.",
    "Breakfast, Dinner",
    "https://tse1.mm.bing.net/th/id/OIP.PQfzjY2-XPSE8Z6la-INNAHaLH?pid=Api"
  ),
  day(
    11,
    "Tokyo",
    "Departure Day",
    "Free morning for last-minute treats. Airport transfer and farewell. Arigatō!",
    "Breakfast",
    "https://tse3.mm.bing.net/th/id/OIP.DkBX9g31Gl4qQZBH-x1R9wHaEL?pid=Api"
  ),
];

export const faq = [
  {
    q: "How physical is the tour?",
    a: "Expect 8,000–12,000 steps on market days with breaks. Most transfers are by rail with minimal luggage handling.",
  },
  {
    q: "Can you handle dietary needs?",
    a: "We accommodate pescatarian, vegetarian, and no-pork requests with advance notice. Severe allergies require custom arrangements.",
  },
  {
    q: "What are the exact hotels and restaurants?",
    a: "Final list is shared ~30 days prior and may vary by date to reflect seasonal availability and quality.",
  },
  {
    q: "Is this suitable for first-time visitors?",
    a: "Yes — we blend must-try classics with local gems, plus free time to explore at your own pace.",
  },
];

export const DIET_OPTIONS = [
"Vegetarian",
"Pescatarian",
"No pork",
"No shellfish",
"Gluten‑free",
];
