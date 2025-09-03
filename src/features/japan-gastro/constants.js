// Tour constants
export const TOUR_START = new Date(2026, 3, 7); // April is month index 3
export const TOUR_DAYS = 11; // Apr 7–17 inclusive
export const TOUR_END = new Date(
  new Date(TOUR_START).setDate(TOUR_START.getDate() + (TOUR_DAYS - 1))
);
// Contact info (edit these once, used everywhere)
export const CONTACT_EMAIL = "tours@yourcompany.com"; // replace with your real inbox
export const CONTACT_WHATSAPP = "521234567890"; // numbers only, country code first
