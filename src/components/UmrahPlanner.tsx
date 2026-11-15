"use client";

import { useState } from "react";
import {
  BOARDS,
  HOTEL_TIERS,
  LIMITS,
  CURRENCY,
  SEASONS,
  buildPlan,
  formatMoney,
  formatRange,
  type Board,
  type FirstCity,
  type HotelTier,
  type PlannerInput,
  type Season,
} from "@/lib/umrah-planner";

interface Props {
  flightsHref: string;
  hotelsHref: string;
}

const AFFILIATE_PROPS = { target: "_blank", rel: "noopener noreferrer sponsored" } as const;

const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";
const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D6A5B]/30";

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)));
  const buttonClass =
    "h-10 w-10 flex-shrink-0 rounded-lg border border-gray-200 text-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40";
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => set(value - 1)}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(event) => set(Number(event.target.value) || min)}
          className={`${fieldClass} text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        />
        <button
          type="button"
          className={buttonClass}
          onClick={() => set(value + 1)}
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function UmrahPlanner({ flightsHref, hotelsHref }: Props) {
  const [travellers, setTravellers] = useState(2);
  const [makkahNights, setMakkahNights] = useState(4);
  const [madinahNights, setMadinahNights] = useState(3);
  const [hotel, setHotel] = useState<HotelTier>("three");
  const [season, setSeason] = useState<Season>("offpeak");
  const [board, setBoard] = useState<Board>("half");
  const [fare, setFare] = useState("");
  const [includeZiyarat, setIncludeZiyarat] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [firstCity, setFirstCity] = useState<FirstCity>("makkah");

  const input: PlannerInput = {
    travellers,
    makkahNights,
    madinahNights,
    hotel,
    season,
    board,
    ownFare: fare ? Number(fare) : undefined,
    includeZiyarat,
    includeInsurance,
    firstCity,
  };
  const plan = buildPlan(input);
  const maxHigh = Math.max(...plan.lines.map((line) => line.high), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Inputs */}
      <form
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden"
        onSubmit={(event) => event.preventDefault()}
      >
        <h2 className="text-lg font-semibold text-gray-900">Your trip</h2>

        <Stepper
          id="travellers"
          label="Travellers"
          value={travellers}
          min={LIMITS.travellers.min}
          max={LIMITS.travellers.max}
          onChange={setTravellers}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Stepper id="makkah" label="Nights in Makkah" value={makkahNights} min={1} max={LIMITS.nights.max} onChange={setMakkahNights} />
          <Stepper id="madinah" label="Nights in Madinah" value={madinahNights} min={0} max={LIMITS.nights.max} onChange={setMadinahNights} />
        </div>

        {madinahNights > 0 && (
          <div>
            <label htmlFor="first-city" className={labelClass}>
              Which city first?
            </label>
            <select id="first-city" className={fieldClass} value={firstCity} onChange={(event) => setFirstCity(event.target.value as FirstCity)}>
              <option value="makkah">Makkah first, then Madinah</option>
              <option value="madinah">Madinah first, then Makkah</option>
            </select>
          </div>
        )}

        <fieldset>
          <legend className={labelClass}>Hotel level</legend>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(HOTEL_TIERS) as HotelTier[]).map((tier) => (
              <label
                key={tier}
                className={`cursor-pointer rounded-lg border p-3 text-sm transition-colors ${
                  hotel === tier ? "border-[#1D6A5B] bg-[#E8F5F1]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input type="radio" name="hotel" value={tier} checked={hotel === tier} onChange={() => setHotel(tier)} className="sr-only" />
                <span className="block font-semibold text-gray-900">{HOTEL_TIERS[tier].label}</span>
                <span className="block text-xs text-gray-500">{HOTEL_TIERS[tier].hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="season" className={labelClass}>
              When
            </label>
            <select id="season" className={fieldClass} value={season} onChange={(event) => setSeason(event.target.value as Season)}>
              {(Object.keys(SEASONS) as Season[]).map((key) => (
                <option key={key} value={key}>
                  {SEASONS[key].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="board" className={labelClass}>
              Meals
            </label>
            <select id="board" className={fieldClass} value={board} onChange={(event) => setBoard(event.target.value as Board)}>
              {(Object.keys(BOARDS) as Board[]).map((key) => (
                <option key={key} value={key}>
                  {BOARDS[key].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="fare" className={labelClass}>
            Your return flight price per person, in US dollars
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{CURRENCY.symbol}</span>
            <input
              id="fare"
              type="number"
              inputMode="numeric"
              min={LIMITS.fare.min}
              max={LIMITS.fare.max}
              placeholder="e.g. 850"
              value={fare}
              onChange={(event) => setFare(event.target.value)}
              className={`${fieldClass} pl-7`}
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500">
            Fares depend on where you fly from.{" "}
            <a href={flightsHref} {...AFFILIATE_PROPS} className="font-semibold text-[#1D6A5B] hover:underline">
              Check live fares
            </a>{" "}
            and enter the price to complete your estimate.
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm text-gray-900">
            <input type="checkbox" checked={includeZiyarat} onChange={(event) => setIncludeZiyarat(event.target.checked)} className="h-4 w-4 accent-[#1D6A5B]" />
            Include Ziyarat tours
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-900">
            <input type="checkbox" checked={includeInsurance} onChange={(event) => setIncludeInsurance(event.target.checked)} className="h-4 w-4 accent-[#1D6A5B]" />
            Include travel insurance
          </label>
        </div>
      </form>

      {/* Results */}
      <div className="space-y-6">
        <section aria-live="polite" className="rounded-2xl bg-[#0F1923] p-5 text-white sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">Estimated cost</p>
          <p className="mt-2 text-3xl font-bold sm:text-4xl">{formatRange(plan.perPerson)}</p>
          <p className="text-sm text-white/70">
            per person, {plan.totalNights} nights{plan.flightsIncluded ? ", including flights" : ", excluding flights"}
          </p>
          {travellers > 1 && (
            <p className="mt-3 text-base">
              <span className="font-semibold">{formatRange(plan.group)}</span>{" "}
              <span className="text-white/70">for {travellers} travellers</span>
            </p>
          )}

          {!plan.flightsIncluded && (
            <p className="mt-4 rounded-lg border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3 py-2 text-sm text-white">
              Flights are not included yet. Add your flight price on the left to see your full cost.
            </p>
          )}

          <ul className="mt-5 space-y-3">
            {plan.lines.map((line) => (
              <li key={line.key}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span>
                    {line.label}
                    {line.note && <span className="block text-xs text-white/50">{line.note}</span>}
                  </span>
                  <span className="whitespace-nowrap font-semibold">
                    {line.low === line.high ? formatMoney(line.low) : `${formatMoney(line.low)}–${formatMoney(line.high)}`}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.max(4, (line.high / maxHigh) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-white/60">
            An estimate, not a quote. Prices are per adult sharing a room, in US dollars, and change with dates,
            demand and exchange rates.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 print:hidden">
            <a href={flightsHref} {...AFFILIATE_PROPS} className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90">
              Check flight prices →
            </a>
            <a href={hotelsHref} {...AFFILIATE_PROPS} className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">
              Compare hotels →
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Your day-by-day outline</h2>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 print:hidden"
            >
              Print or save as PDF
            </button>
          </div>
          <ol className="space-y-4">
            {plan.days.map((planDay, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F5F1] text-xs font-bold text-[#1D6A5B]">
                  {planDay.day}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {planDay.title}
                    <span className="ml-2 text-xs font-normal text-gray-500">{planDay.city}</span>
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">{planDay.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
