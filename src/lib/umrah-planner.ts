/**
 * Umrah budget and itinerary model for the /umrah/planner tool.
 *
 * Everything is an ESTIMATE in GBP per person for trips from the UK. The
 * ranges come from published 2026 guides (see SOURCES) and are the same ones
 * used in the "How Much Does Umrah Cost in 2026?" post. When you re-check
 * them, update the numbers here and bump LAST_CHECKED: the page shows both.
 */

export const LAST_CHECKED = "November 2026";

export const SOURCES = [
  {
    title: "Bismillah Travel: Umrah cost from the UK (flights, hotels, food, transport)",
    url: "https://www.bismillahtravel.co.uk/blog/complete-guide-umrah-cost-from-uk.html",
  },
  {
    title: "Wego: Umrah visa price 2026",
    url: "https://blog.wego.com/2026-umrah-visa-price/",
  },
  {
    title: "Nusuk, the official Umrah platform",
    url: "https://umrah.nusuk.sa/",
  },
];

export type HotelTier = "budget" | "three" | "four" | "five";
export type Season = "offpeak" | "peak";
export type Board = "half" | "full";
export type FirstCity = "makkah" | "madinah";

type Range = [low: number, high: number];

export const HOTEL_TIERS: Record<HotelTier, { label: string; hint: string; perWeek: Range }> = {
  budget: { label: "Budget", hint: "10 to 20 minutes' walk, or a shuttle", perWeek: [200, 300] },
  three: { label: "3-star", hint: "A short walk from the Haram", perWeek: [300, 450] },
  four: { label: "4-star", hint: "Close to the Haram", perWeek: [450, 600] },
  five: { label: "5-star", hint: "Clock Tower or Jabal Omar", perWeek: [600, 900] },
};

export const SEASONS: Record<Season, { label: string; multiplier: Range }> = {
  offpeak: { label: "Off-peak", multiplier: [1, 1] },
  // Published guides put Ramadan and school holidays 15 to 30% above off-peak
  peak: { label: "Ramadan or school holidays", multiplier: [1.15, 1.3] },
};

export const BOARDS: Record<Board, { label: string; perWeek: Range }> = {
  half: { label: "Half board", perWeek: [60, 100] },
  full: { label: "Full board", perWeek: [100, 150] },
};

const FLIGHT_RETURN: Range = [400, 600]; // UK economy return
const VISA: Range = [80, 100]; // about SAR 400 to 480 including compulsory insurance
const TRANSPORT: Range = [50, 80]; // airport and Makkah to Madinah transfers
const ZIYARAT: Range = [50, 100];
const INSURANCE: Range = [20, 40];

export const LIMITS = {
  travellers: { min: 1, max: 12 },
  nights: { min: 0, max: 21 },
  totalNights: { min: 2, max: 30 },
  fare: { min: 50, max: 5000 },
};

export interface PlannerInput {
  travellers: number;
  makkahNights: number;
  madinahNights: number;
  hotel: HotelTier;
  season: Season;
  board: Board;
  /** The traveller's own return fare per person in GBP. Leave undefined to use the typical UK range. */
  ownFare?: number;
  includeZiyarat: boolean;
  includeInsurance: boolean;
  firstCity: FirstCity;
}

export interface CostLine {
  key: string;
  label: string;
  note?: string;
  low: number;
  high: number;
}

export interface PlanDay {
  day: number;
  city: "Makkah" | "Madinah" | "Travel";
  title: string;
  detail: string;
}

export interface PlanResult {
  lines: CostLine[];
  perPerson: Range;
  group: Range;
  totalNights: number;
  days: PlanDay[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? Math.round(value) : min));

const round5 = (value: number) => Math.round(value / 5) * 5;

function scale([low, high]: Range, factorLow: number, factorHigh = factorLow): Range {
  return [low * factorLow, high * factorHigh];
}

export function normaliseInput(input: PlannerInput): PlannerInput {
  const makkahNights = clamp(input.makkahNights, LIMITS.nights.min, LIMITS.nights.max);
  let madinahNights = clamp(input.madinahNights, LIMITS.nights.min, LIMITS.nights.max);
  // Umrah itself happens in Makkah, so a plan needs at least one night there
  const safeMakkah = Math.max(1, makkahNights);
  if (safeMakkah + madinahNights > LIMITS.totalNights.max) {
    madinahNights = LIMITS.totalNights.max - safeMakkah;
  }
  const ownFare =
    typeof input.ownFare === "number" && Number.isFinite(input.ownFare) && input.ownFare > 0
      ? clamp(input.ownFare, LIMITS.fare.min, LIMITS.fare.max)
      : undefined;
  return {
    ...input,
    travellers: clamp(input.travellers, LIMITS.travellers.min, LIMITS.travellers.max),
    makkahNights: safeMakkah,
    madinahNights,
    ownFare,
  };
}

export function buildPlan(rawInput: PlannerInput): PlanResult {
  const input = normaliseInput(rawInput);
  const totalNights = input.makkahNights + input.madinahNights;
  const weeks = totalNights / 7;
  const season = SEASONS[input.season].multiplier;

  const lines: CostLine[] = [];
  const add = (key: string, label: string, [low, high]: Range, note?: string) =>
    lines.push({ key, label, note, low: round5(low), high: round5(high) });

  if (input.ownFare) {
    add("flights", "Flights", [input.ownFare, input.ownFare], "Your own fare");
  } else {
    add(
      "flights",
      "Flights",
      scale(FLIGHT_RETURN, season[0], season[1]),
      "Typical UK economy return"
    );
  }

  add(
    "hotels",
    "Hotels",
    scale(scale(HOTEL_TIERS[input.hotel].perWeek, weeks), season[0], season[1]),
    `${HOTEL_TIERS[input.hotel].label}, ${totalNights} night${totalNights === 1 ? "" : "s"}, sharing a room`
  );
  add("visa", "Visa and compulsory insurance", VISA, "About SAR 400 to 480");
  add("transport", "Transport in Saudi Arabia", TRANSPORT, "Airport and city-to-city transfers");
  add("food", "Food", scale(BOARDS[input.board].perWeek, weeks), BOARDS[input.board].label);
  if (input.includeZiyarat) add("ziyarat", "Ziyarat tours", ZIYARAT, "Historic sites in both cities");
  if (input.includeInsurance) add("insurance", "Travel insurance", INSURANCE);

  const perPerson: Range = [
    lines.reduce((sum, line) => sum + line.low, 0),
    lines.reduce((sum, line) => sum + line.high, 0),
  ];

  return {
    lines,
    perPerson,
    group: [perPerson[0] * input.travellers, perPerson[1] * input.travellers],
    totalNights,
    days: buildDays(input),
  };
}

function buildDays(input: PlannerInput): PlanDay[] {
  const days: PlanDay[] = [];
  let day = 1;
  const push = (city: PlanDay["city"], title: string, detail: string) =>
    days.push({ day: day++, city, title, detail });

  const makkah = (isFirstStop: boolean) => {
    for (let night = 1; night <= input.makkahNights; night++) {
      if (night === 1) {
        push(
          "Makkah",
          "Arrive in Makkah and perform Umrah",
          isFirstStop
            ? "Enter Ihram before the Miqat (on the plane if you fly to Jeddah). Check in, rest if you need to, then perform Tawaf, Sa'i and Halq or Taqsir."
            : "Check in, then perform Tawaf, Sa'i and Halq or Taqsir. Go at a quieter time if you can, such as late evening."
        );
      } else if (night === 2 && input.includeZiyarat && input.makkahNights >= 3) {
        push(
          "Makkah",
          "Ziyarat in Makkah",
          "Visit historic sites such as Jabal al-Nour, Mina, Arafat and Muzdalifah on a morning tour. Back to the Haram for the rest of the day."
        );
      } else {
        push(
          "Makkah",
          "Prayers at the Haram",
          "Pray your five prayers at Masjid al-Haram, make extra Tawaf and spend time in worship. Rest in the heat of the afternoon."
        );
      }
    }
  };

  const madinah = (isFirstStop: boolean) => {
    for (let night = 1; night <= input.madinahNights; night++) {
      if (night === 1) {
        push(
          "Madinah",
          isFirstStop ? "Arrive in Madinah" : "The Prophet's Mosque",
          "Pray at Al-Masjid an-Nabawi and send salam to the Prophet (peace be upon him). Book your Rawdah visit in the Nusuk app in advance."
        );
      } else if (night === 2 && input.includeZiyarat) {
        push(
          "Madinah",
          "Ziyarat in Madinah",
          "Visit Masjid Quba, Masjid al-Qiblatayn and Mount Uhud. Buy dates at the market near the mosque."
        );
      } else {
        push(
          "Madinah",
          "Prayers at the Prophet's Mosque",
          "Spend the day in prayer and reflection at Al-Masjid an-Nabawi, with time to rest and shop for gifts."
        );
      }
    }
  };

  if (input.madinahNights === 0) {
    makkah(true);
  } else if (input.firstCity === "makkah") {
    makkah(true);
    push(
      "Travel",
      "Makkah to Madinah",
      "Make a farewell Tawaf, then take the Haramain high-speed train or a booked transfer to Madinah."
    );
    day--; // the travel day is the first Madinah day
    madinah(false);
  } else {
    madinah(true);
    push(
      "Travel",
      "Madinah to Makkah",
      "Enter Ihram at the Miqat of Dhul Hulayfah (Abyar Ali), just outside Madinah, then take the train or a transfer to Makkah."
    );
    day--; // the travel day is the first Makkah day
    makkah(false);
  }

  push("Travel", "Fly home", "Check out and travel to the airport. Allow extra time for traffic and crowds.");
  return days;
}

export function formatGBP(value: number): string {
  return `£${Math.round(value).toLocaleString("en-GB")}`;
}

export function formatRange([low, high]: Range): string {
  return low === high ? formatGBP(low) : `${formatGBP(low)} to ${formatGBP(high)}`;
}
