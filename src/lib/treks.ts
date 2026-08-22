export type TrekCategory =
  | "one-day"
  | "night-trek"
  | "backpacking"
  | "waterfall";

export interface IncludedItem {
  title: string;
  description: string;
}

export interface CarryItem {
  emoji: string;
  title: string;
  note: string;
}

export interface Trek {
  slug: string;
  name: string;
  location: string;
  date: string;
  duration: string;
  durationDays: number;
  difficulty: string;
  distance: string;
  pickup: string;
  price: number;
  category: TrekCategory;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  badge: string;
  shortDescription: string;
  overview: string[];
  included: IncludedItem[];
  notIncluded: string[];
  carry: CarryItem[];
}

export const CATEGORY_LABELS: Record<TrekCategory, string> = {
  "one-day": "One Day Trek",
  "night-trek": "Night Trek",
  backpacking: "Backpacking Tour",
  waterfall: "Waterfall Expedition",
};

export const treks: Trek[] = [
  {
    slug: "rajgad-fort-trek",
    name: "Rajgad Fort Trek",
    location: "Pune, Maharashtra",
    date: "12 Sept 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Moderate - Difficult",
    distance: "Approx. 12-15 km",
    pickup: "Kolhapur CBS",
    price: 1499,
    category: "one-day",
    categoryLabel: CATEGORY_LABELS["one-day"],
    image: "/img/tt-trekking.webp",
    imageAlt: "Rajgad Fort Trek",
    badge: "12 Sept 2026",
    shortDescription:
      "Explore the historical capital of the Maratha Empire, hike the famous Padmavati and Sanjeevani Machi ridges.",
    overview: [
      "Rajgad (literally meaning Royal Fort) is one of the most prominent forts in Pune district, Maharashtra. Shivaji Maharaj stayed here for over 25 years, making it the capital of the Maratha Empire. The fort is renowned for its architectural design, featuring three massive 'Maches' (Padmavati Machi, Suvela Machi, and Sanjeevani Machi) and a fortified 'Bale Killa' (central citadel).",
      "This trek is highly popular among adventure seekers and historians. Walking along the rocky ridges of Sanjeevani Machi and climbing the steep steps of the Bale Killa will test your endurance while treating you to breathtaking sights of the Sahyadri mountains.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Comfortable private transport from Kolhapur CBS and back.",
      },
      {
        title: "Breakfast & Lunch",
        description:
          "Traditional Maharashtrian breakfast and delicious local lunch.",
      },
      {
        title: "Dinner",
        description: "Nutritional dinner provided post-descent.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Experienced guides certified in wilderness navigation.",
      },
      {
        title: "First-Aid Kit",
        description:
          "Essential medicines and first-aid coordinators available throughout.",
      },
      {
        title: "Basic Safety Equipment",
        description:
          "Trek co-ordination ropes and safety gear for tough patches.",
      },
    ],
    notIncluded: [
      "Personal Expenses (cold drinks, mineral water, snacks, etc.)",
      "Personal Food & Beverages ordered during transit.",
      "Personal Medicines and specific medical requirements.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Good grip is mandatory" },
      { emoji: "💧", title: "2-3L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Heavy showers expected" },
      { emoji: "🎒", title: "Small Backpack", note: "Double shoulder pack" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
      {
        emoji: "🔦",
        title: "Torch / Headlamp",
        note: "Essential for late descent",
      },
    ],
  },
  {
    slug: "harishchandragad-night-trek",
    name: "Harishchandragad Peak",
    location: "Ahmednagar, MH",
    date: "19 Sept 2026",
    duration: "2 Days (Night Trek)",
    durationDays: 2,
    difficulty: "Difficult",
    distance: "Approx. 10-12 km",
    pickup: "Pune",
    price: 2199,
    category: "night-trek",
    categoryLabel: CATEGORY_LABELS["night-trek"],
    image: "/img/hero.webp",
    imageAlt: "Harishchandragad Trek",
    badge: "19 Sept 2026",
    shortDescription:
      "Camp under the stars at Konkan Kada, marvel at the mighty semi-circular cliff and natural caves.",
    overview: [
      "Harishchandragad is one of the most challenging and rewarding treks in the Sahyadris. The fort complex dates back to the 6th century and is home to the famous Konkan Kada, a concave cliff that offers a vertigo-inducing view of the surrounding valleys.",
      "The night trek begins from the base village and ascends through forests and rock patches under the open sky. Camping near the temple and watching the sunrise from Konkan Kada is an unforgettable experience.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Private non-AC transport from Pune and back.",
      },
      {
        title: "Camping Stay",
        description: "Tents and sleeping mats near the fort.",
      },
      {
        title: "All Meals",
        description: "Dinner, breakfast, and packed lunch.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Certified night-trek leaders.",
      },
      {
        title: "Safety Equipment",
        description: "Ropes, headlamps, and first-aid support.",
      },
    ],
    notIncluded: [
      "Personal expenses during transit.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Ankle support preferred" },
      { emoji: "🧥", title: "Warm Layer", note: "Night temperature drops" },
      { emoji: "🔦", title: "Headlamp", note: "Mandatory for night ascent" },
      { emoji: "💧", title: "2L Water", note: "Refill at base" },
      { emoji: "🎒", title: "Backpack", note: "Lightweight" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "devkund-waterfall-trek",
    name: "Devkund Secret Waterfall",
    location: "Raigad, MH",
    date: "27 Sept 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Moderate",
    distance: "Approx. 14 km",
    pickup: "Mumbai/Pune",
    price: 1299,
    category: "waterfall",
    categoryLabel: CATEGORY_LABELS["waterfall"],
    image: "/img/tt-coastal-adventure.jpg",
    imageAlt: "Devkund Waterfall",
    badge: "27 Sept 2026",
    shortDescription:
      "Trek through dense forests and streams to witness one of the most beautiful plunge waterfalls in India.",
    overview: [
      "Devkund is a hidden plunge waterfall tucked deep inside the Bhira region of Raigad. The trek follows a river stream through dense forests, with multiple river crossings that make the journey as exciting as the destination.",
      "During and after the monsoon, the waterfall flows in full force, creating a natural pool at its base. The round trip involves a mix of forest trails, rocky patches, and streamside walking.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Pickup and drop from Mumbai and Pune.",
      },
      {
        title: "Breakfast & Lunch",
        description: "Hot local meals provided.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Experienced local guides.",
      },
      {
        title: "First-Aid Kit",
        description: "Basic first-aid available on route.",
      },
    ],
    notIncluded: [
      "Personal expenses and snacks.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Waterproof Shoes", note: "Multiple stream crossings" },
      { emoji: "💧", title: "2L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Monsoon-ready" },
      { emoji: "🎒", title: "Dry Bag", note: "Protect electronics" },
      { emoji: "👕", title: "Extra Clothes", note: "For the return journey" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "kalsubai-peak-trek",
    name: "Kalsubai Peak Trek",
    location: "Igatpuri, MH",
    date: "4 Oct 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Moderate",
    distance: "Approx. 11 km",
    pickup: "Pune",
    price: 1399,
    category: "one-day",
    categoryLabel: CATEGORY_LABELS["one-day"],
    image: "/img/pick-trekking.webp",
    imageAlt: "Kalsubai Peak Trek",
    badge: "Highest Peak",
    shortDescription:
      "Scale the highest peak of Maharashtra standing at 5,400 feet.",
    overview: [
      "Kalsubai is the highest peak in Maharashtra at 5,400 feet. The trail climbs through lush fields, iron ladders, and rocky steps, opening up to panoramic views of the surrounding Sahyadri range.",
      "A sunrise or daytime summit rewards trekkers with views of Bhandardara, Wilson Dam, and on clear days, the distant forts of the region.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Pickup and drop from Pune.",
      },
      {
        title: "Breakfast & Lunch",
        description: "Local Maharashtrian meals.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Certified trek leaders.",
      },
      {
        title: "First-Aid Kit",
        description: "Basic medical support.",
      },
    ],
    notIncluded: [
      "Personal expenses and snacks.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Good grip needed" },
      { emoji: "💧", title: "2L Water", note: "Carry enough water" },
      { emoji: "🧢", title: "Cap", note: "Sun protection" },
      { emoji: "🎒", title: "Backpack", note: "Lightweight" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "sandhan-valley-trek",
    name: "Sandhan Valley Giant Swing",
    location: "Samrad, MH",
    date: "11 Oct 2026",
    duration: "2 Days",
    durationDays: 2,
    difficulty: "Difficult",
    distance: "Approx. 12 km",
    pickup: "Pune",
    price: 2999,
    category: "backpacking",
    categoryLabel: CATEGORY_LABELS["backpacking"],
    image: "/img/tt-rafting.webp",
    imageAlt: "Sandhan Valley",
    badge: "Valley of Shadow",
    shortDescription:
      "Experience a deep canyon trek with suspension bridges and giant swings.",
    overview: [
      "Sandhan Valley, known as the Valley of Shadows, is a deep canyon carved between two mountain walls. The trek involves rappelling and wading through water pools in the dry season.",
      "The backpacking experience includes camping inside the valley, bonfire, and stargazing, followed by a climb out through the famous Tarzan Swing section.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Private transport from Pune.",
      },
      {
        title: "Camping & Meals",
        description: "Tents, dinner, breakfast, and lunch.",
      },
      {
        title: "Safety Equipment",
        description: "Rappelling gear, ropes, and harnesses.",
      },
      {
        title: "Trek Leaders",
        description: "Multiple certified leaders and support staff.",
      },
    ],
    notIncluded: [
      "Personal expenses.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Grippy soles" },
      { emoji: "🎒", title: "Backpack", note: "Overnight gear" },
      { emoji: "🔦", title: "Headlamp", note: "For night in valley" },
      { emoji: "🧥", title: "Warm Layer", note: "Cool nights" },
      { emoji: "💧", title: "2L Water", note: "Refill points available" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "andharban-dark-forest-trek",
    name: "Andharban Dark Forest Trek",
    location: "Tamhini Ghat, MH",
    date: "18 Oct 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Easy - Moderate",
    distance: "Approx. 13 km",
    pickup: "Pune",
    price: 1250,
    category: "one-day",
    categoryLabel: CATEGORY_LABELS["one-day"],
    image: "/img/tt-wildlife.webp",
    imageAlt: "Andharban Forest Trek",
    badge: "Dark Forest",
    shortDescription:
      "Descend into mystical dense jungle shadows with views of Kundalika valley.",
    overview: [
      "Andharban, meaning dark forest, is a monsoon trek through a dense evergreen forest. The trail is mostly a gentle descent with occasional gurgling streams and viewpoints over the Kundalika valley.",
      "It is considered one of the most scenic and beginner-friendly treks in the Tamhini Ghat region, ideal for those who want lush greenery and misty forest trails.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Pickup and drop from Pune.",
      },
      {
        title: "Breakfast & Lunch",
        description: "Simple, hearty local meals.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Friendly and experienced leaders.",
      },
      {
        title: "First-Aid Kit",
        description: "Basic first-aid support.",
      },
    ],
    notIncluded: [
      "Personal expenses and snacks.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Water-resistant preferred" },
      { emoji: "💧", title: "2L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Forest showers" },
      { emoji: "🎒", title: "Backpack", note: "Day pack" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "visapur-fort-trek",
    name: "Visapur Fort Trek",
    location: "Lonavala, MH",
    date: "25 Oct 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Easy - Moderate",
    distance: "Approx. 7-8 km",
    pickup: "Pune",
    price: 1199,
    category: "waterfall",
    categoryLabel: CATEGORY_LABELS["waterfall"],
    image: "/img/tt-biking.webp",
    imageAlt: "Visapur Fort",
    badge: "Waterfall Climb",
    shortDescription:
      "Climb alongside cascading waterfalls to a scenic hill fort near Lonavala.",
    overview: [
      "Visapur Fort is a popular monsoon trek near Lonavala, known for its waterfall-lined trail and stone ruins. The fort offers commanding views of the Lohagad and Visapur twin forts.",
      "The route includes stone steps, gentle ascents, and seasonal streams, making it a great option for first-time trekkers.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Pickup and drop from Pune.",
      },
      {
        title: "Breakfast & Lunch",
        description: "Local meals provided.",
      },
      {
        title: "Trek Leader & Guide",
        description: "Experienced guides.",
      },
      {
        title: "First-Aid Kit",
        description: "Basic first-aid support.",
      },
    ],
    notIncluded: [
      "Personal expenses and snacks.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Grippy soles" },
      { emoji: "💧", title: "2L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Monsoon-ready" },
      { emoji: "🎒", title: "Backpack", note: "Day pack" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
  {
    slug: "vasota-jungle-fort-trek",
    name: "Vasota Jungle & Fort Trek",
    location: "Koyna, MH",
    date: "1 Nov 2026",
    duration: "1 Day (Full day)",
    durationDays: 1,
    difficulty: "Moderate",
    distance: "Approx. 10 km",
    pickup: "Pune",
    price: 1599,
    category: "one-day",
    categoryLabel: CATEGORY_LABELS["one-day"],
    image: "/img/tt-safari.webp",
    imageAlt: "Vasota Jungle Trek",
    badge: "Jungle Adventure",
    shortDescription:
      "Cross the Koyna backwaters on a boat and hike through deep reserve jungles.",
    overview: [
      "Vasota Fort sits deep inside the Koyna Wildlife Sanctuary. The journey begins with a boat ride across the Koyna backwaters, followed by a forested climb to the ancient fort.",
      "The trek offers a chance to spot wildlife and experience the untouched greenery of the Sahyadri tiger reserve buffer zone.",
    ],
    included: [
      {
        title: "Travelling & Transportation",
        description: "Pickup and drop from Pune.",
      },
      {
        title: "Boat Ride",
        description: "Backwater crossing to the trailhead.",
      },
      {
        title: "Breakfast & Lunch",
        description: "Local meals provided.",
      },
      {
        title: "Forest Entry & Guide",
        description: "Permits and certified local guide.",
      },
    ],
    notIncluded: [
      "Personal expenses and snacks.",
      "Personal medicines.",
      "Anything not listed in inclusions.",
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Grippy soles" },
      { emoji: "💧", title: "2L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Forest showers" },
      { emoji: "🎒", title: "Backpack", note: "Day pack" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
    ],
  },
];

export const featuredTreks = treks.slice(0, 3);

export function getTrek(slug: string): Trek | undefined {
  return treks.find((trek) => trek.slug === slug);
}
