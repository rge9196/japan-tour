// Tour constants
export const TOUR_START = new Date(2026, 3, 7); // April is month index 3
export const TOUR_DAYS = 11; // Apr 7–17 inclusive
export const TOUR_END = new Date(
  new Date(TOUR_START).setDate(TOUR_START.getDate() + (TOUR_DAYS - 1))
);