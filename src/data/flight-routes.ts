/**
 * Flight route pages (/flights/[slug]).
 *
 * Only add a route when it has real, checked content of its own: Google treats
 * near-identical pages made at scale as spam. Fare tables come from the travel
 * provider at request time and simply don't render when there is no data.
 * Re-check the facts here and bump `lastChecked` at least every few months.
 */

export interface RouteAirport {
  code: string;
  name: string;
}

export interface RoutePlace {
  city: string;
  /** IATA city code used for fare lookups and search links. */
  iata: string;
  airports: RouteAirport[];
  /** Slug of our /destinations page for this place, if we have one. */
  destinationSlug?: string;
}

export interface RouteSection {
  heading: string;
  paragraphs: string[];
  /** Internal links shown under the section. */
  links?: { label: string; href: string }[];
}

export interface FlightRoute {
  slug: string;
  origin: RoutePlace;
  destination: RoutePlace;
  /** Short line for the hero, e.g. "Gateway to Makkah for Umrah". */
  tagline: string;
  intro: string;
  flightTime: string;
  nonStop: string;
  /** Marks the route as an Umrah route: adds it to the Umrah hub and shows Umrah links. */
  umrah: boolean;
  sections: RouteSection[];
  faqs: { question: string; answer: string }[];
  /** Blog slugs to show as further reading. */
  relatedPosts: string[];
  lastChecked: string;
}

export const FLIGHT_ROUTES: FlightRoute[] = [
  {
    slug: "london-to-jeddah",
    origin: {
      city: "London",
      iata: "LON",
      airports: [
        { code: "LHR", name: "Heathrow" },
        { code: "LGW", name: "Gatwick" },
        { code: "STN", name: "Stansted" },
      ],
      destinationSlug: "london",
    },
    destination: {
      city: "Jeddah",
      iata: "JED",
      airports: [{ code: "JED", name: "King Abdulaziz International" }],
      destinationSlug: "makkah",
    },
    tagline: "The main gateway to Makkah for Umrah",
    intro:
      "Jeddah is where most UK pilgrims land for Umrah: Makkah is about an hour and a half away by road or by the Haramain high-speed train. This page covers what the big booking sites leave out: when to put on ihram on the plane, how to make sure your meal is halal, and where to pray at both airports.",
    flightTime: "About 6 hours non-stop; 9 to 14 hours with one stop",
    nonStop:
      "Saudia flies non-stop from Heathrow. Non-stop services have also run from Gatwick, but schedules on this route have changed often, so check the airline before you book. One-stop flights via the Gulf or Istanbul are often cheaper.",
    umrah: true,
    sections: [
      {
        heading: "Ihram and the miqat on a flight to Jeddah",
        paragraphs: [
          "If you are flying in for Umrah, you need to be in ihram before the plane crosses the miqat, which happens before you land in Jeddah. Buying ihram clothing in the arrival hall is too late.",
          "Many pilgrims change into ihram at home or at the departure airport and make the intention on board when the crew announce the miqat, usually 20 to 40 minutes before landing. If you might be asleep, or are not sure your airline makes the announcement, many scholars advise entering ihram before you board. Ask a scholar you trust about your own situation.",
        ],
        links: [{ label: "How to perform Umrah step by step", href: "/blog/umrah-step-by-step-guide" }],
      },
      {
        heading: "Halal food on board",
        paragraphs: [
          "Saudia serves halal food only and does not serve alcohol. On other airlines, request a Muslim meal (code MOML) when you book, or at least 24 to 48 hours before departure, and check it is on your booking.",
        ],
        links: [{ label: "How to request halal meals on major airlines", href: "/blog/how-to-request-halal-airline-meals-guide" }],
      },
      {
        heading: "Praying and wudu at the airports",
        paragraphs: [
          "Heathrow has multi-faith prayer rooms in every terminal, airside and landside. Jeddah's King Abdulaziz Airport has prayer areas throughout the terminals.",
          "If you are changing into ihram at the airport, allow extra time: the prayer room washrooms get busy on Umrah-season flights.",
        ],
        links: [
          { label: "How to perform wudu in airport restrooms", href: "/blog/how-to-perform-wudu-in-airport-restrooms-guide" },
          { label: "How to find prayer spaces when travelling", href: "/blog/how-to-find-prayer-spaces-when-traveling" },
        ],
      },
      {
        heading: "From Jeddah Airport to Makkah",
        paragraphs: [
          "Makkah is about 80 km from the airport. The Haramain high-speed train runs from the airport station to Makkah in roughly 30 minutes of travel time; taxis and pre-booked transfers take about 75 to 90 minutes depending on traffic.",
        ],
        links: [
          { label: "Best hotels near Masjid al-Haram", href: "/blog/best-hotels-near-masjid-al-haram" },
          { label: "Makkah city guide", href: "/destinations/makkah" },
        ],
      },
    ],
    faqs: [
      {
        question: "How long is the flight from London to Jeddah?",
        answer:
          "About 6 hours non-stop. With one stop, usually in the Gulf or Istanbul, expect 9 to 14 hours door to door.",
      },
      {
        question: "Which airlines fly non-stop from London to Jeddah?",
        answer:
          "Saudia flies non-stop from Heathrow. Non-stop flights have also operated from Gatwick, but this has changed several times, so check the airline's own schedule before booking.",
      },
      {
        question: "When should I put on ihram when flying to Jeddah for Umrah?",
        answer:
          "Before the plane crosses the miqat, which is before landing. Many pilgrims change at home or at the airport and make the intention when the crew announce the miqat. This is general travel guidance, not a religious ruling, so check with a scholar.",
      },
      {
        question: "When are flights from London to Jeddah cheapest?",
        answer:
          "Outside Ramadan and UK school holidays. Fares rise sharply in the last ten days of Ramadan and in the summer, Easter and December holidays. The fare table on this page shows the lowest recent prices for each month.",
      },
      {
        question: "Can I fly into Madinah instead?",
        answer:
          "Yes. Flying into Madinah lets you start your trip there and enter ihram at Dhul-Hulayfah on the way to Makkah. There are fewer direct flights from London, so it is usually a one-stop journey.",
      },
    ],
    relatedPosts: [
      "umrah-cost-2026-budget-breakdown",
      "best-hotels-near-masjid-al-haram",
      "umrah-step-by-step-guide",
    ],
    lastChecked: "November 2026",
  },
];

export function getFlightRoute(slug: string): FlightRoute | undefined {
  return FLIGHT_ROUTES.find((route) => route.slug === slug);
}
