/**
 * Umrah budget and itinerary model for the /umrah/planner tool.
 *
 * Everything is an ESTIMATE per person, shown in US dollars. The ranges come
 * from published 2026 guides (see SOURCES), which quote pounds and riyals, so
 * they are converted with the fixed rates below. Flights are NOT estimated:
 * fares depend on where the traveller flies from, so they enter their own.
 *
 * When you re-check prices, update the numbers or rates here and bump
 * LAST_CHECKED: the page shows it. To add a currency later, add its rate
 * next to USD_PER_GBP and convert in `usd()`.
 */

/** Mid-market rate on 13 Nov 2026. Source figures in pounds are multiplied by this. */
export const USD_PER_GBP = 1.32;
/** The Saudi riyal is pegged to the US dollar. */
export const SAR_PER_USD = 3.75;
export const CURRENCY = { code: "USD", symbol: "$", locale: "en-US" } as const;

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

/** Convert a pound range from the source guides to dollars. */
const usd = ([low, high]: Range): Range => [low * USD_PER_GBP, high * USD_PER_GBP];

export const HOTEL_TIERS: Record<HotelTier, { label: string; hint: string; perWeek: Range }> = {
  budget: { label: "Budget", hint: "10 to 20 minutes' walk, or a shuttle", perWeek: usd([200, 300]) },
  three: { label: "3-star", hint: "A short walk from the Haram", perWeek: usd([300, 450]) },
  four: { label: "4-star", hint: "Close to the Haram", perWeek: usd([450, 600]) },
  five: { label: "5-star", hint: "Clock Tower or Jabal Omar", perWeek: usd([600, 900]) },
};

export const SEASONS: Record<Season, { label: string; multiplier: Range }> = {
  offpeak: { label: "Off-peak", multiplier: [1, 1] },
  // Published guides put Ramadan and school holidays 15 to 30% above off-peak
  peak: { label: "Ramadan or school holidays", multiplier: [1.15, 1.3] },
};

export const BOARDS: Record<Board, { label: string; perWeek: Range }> = {
  half: { label: "Half board", perWeek: usd([60, 100]) },
  full: { label: "Full board", perWeek: usd([100, 150]) },
};

const VISA: Range = [400 / SAR_PER_USD, 480 / SAR_PER_USD]; // SAR 400 to 480 including compulsory insurance
const TRANSPORT: Range = usd([50, 80]); // airport and Makkah to Madinah transfers
const ZIYARAT: Range = usd([50, 100]);
const INSURANCE: Range = usd([20, 40]);

export const LIMITS = {
  travellers: { min: 1, max: 12 },
  nights: { min: 0, max: 21 },
  totalNights: { min: 2, max: 30 },
  fare: { min: 50, max: 10000 },
};

export interface PlannerInput {
  travellers: number;
  makkahNights: number;
  madinahNights: number;
  hotel: HotelTier;
  season: Season;
  board: Board;
  /** The traveller's own return fare per person in USD. Flights are left out of the total when undefined. */
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
  /** False until the traveller enters a fare: the totals then cover everything except flights. */
  flightsIncluded: boolean;
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
    flightsIncluded: Boolean(input.ownFare),
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

export function formatMoney(value: number): string {
  return `${CURRENCY.symbol}${Math.round(value).toLocaleString(CURRENCY.locale)}`;
}

export function formatRange([low, high]: Range): string {
  return low === high ? formatMoney(low) : `${formatMoney(low)} to ${formatMoney(high)}`;
}
