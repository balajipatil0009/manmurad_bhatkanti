import { getPayload } from "payload";
import config from "./src/payload.config.ts";
import fs from "fs";
import path from "path";

const payload = await getPayload({ config });

async function uploadImage(filename: string, alt: string): Promise<number | string | null> {
  try {
    const filePath = path.resolve("public/img", filename);
    if (!fs.existsSync(filePath)) return null;
    const media = await payload.create({
      collection: "media",
      data: { alt },
      filePath,
    });
    console.log(`Media: ${filename} -> ${media.id}`);
    return media.id;
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

const trekImages: Record<string, number | string | null> = {
  "tt-trekking.webp": null,
  "hero.webp": null,
  "tt-coastal-adventure.jpg": null,
  "pick-trekking.webp": null,
  "tt-rafting.webp": null,
  "tt-wildlife.webp": null,
  "tt-biking.webp": null,
  "tt-safari.webp": null,
};

console.log("Cleaning up database...");
try {
  await payload.delete({
    collection: "treks",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "trek-categories",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "features",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "testimonials",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "media",
    where: { id: { exists: true } },
  });
  console.log("Database cleaned successfully.");
} catch (e) {
  console.warn("Database cleanup encountered warnings:", e);
}

for (const filename of Object.keys(trekImages)) {
  trekImages[filename] = await uploadImage(filename, filename.replace(/\.[^.]+$/, ""));
}

const categories = [
  { name: "One Day Trek", slug: "one-day" },
  { name: "Night Trek", slug: "night-trek" },
  { name: "Backpacking Tour", slug: "backpacking" },
  { name: "Waterfall Expedition", slug: "waterfall" },
];

const categoryMap: Record<string, number | string> = {};

for (const cat of categories) {
  const doc = await payload.create({
    collection: "trek-categories",
    data: {
      name: cat.name,
      slug: cat.slug,
      _status: "published",
    },
  });
  categoryMap[cat.slug] = doc.id;
  console.log(`Category: ${cat.name} -> ${doc.id}`);
}

const treks = [
  {
    name: "Rajgad Fort Trek",
    slug: "rajgad-fort-trek",
    category: "one-day",
    location: "Pune, Maharashtra",
    date: "2026-09-12",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Moderate - Difficult",
    distance: "Approx. 12-15 km",
    pickup: "Kolhapur CBS",
    price: 1499,
    image: trekImages["tt-trekking.webp"],
    imageAlt: "Rajgad Fort Trek",
    badge: "12 Sept 2026",
    shortDescription:
      "Explore the historical capital of the Maratha Empire, hike the famous Padmavati and Sanjeevani Machi ridges.",
    isPopular: false,
    isUpcoming: true,
    included: [
      { title: "Travelling & Transportation", description: "Comfortable private transport from Kolhapur CBS and back." },
      { title: "Breakfast & Lunch", description: "Traditional Maharashtrian breakfast and delicious local lunch." },
      { title: "Dinner", description: "Nutritional dinner provided post-descent." },
      { title: "Trek Leader & Guide", description: "Experienced guides certified in wilderness navigation." },
      { title: "First-Aid Kit", description: "Essential medicines and first-aid coordinators available throughout." },
      { title: "Basic Safety Equipment", description: "Trek co-ordination ropes and safety gear for tough patches." },
    ],
    notIncluded: [
      { label: "Personal Expenses (cold drinks, mineral water, snacks, etc.)" },
      { label: "Personal Food & Beverages ordered during transit." },
      { label: "Personal Medicines and specific medical requirements." },
    ],
    carry: [
      { emoji: "🥾", title: "Trekking Shoes", note: "Good grip is mandatory" },
      { emoji: "💧", title: "2-3L Water", note: "Keep hydrated" },
      { emoji: "🧥", title: "Raincoat", note: "Heavy showers expected" },
      { emoji: "🎒", title: "Small Backpack", note: "Double shoulder pack" },
      { emoji: "💊", title: "Personal Medicines", note: "If any prescribed" },
      { emoji: "🔦", title: "Torch / Headlamp", note: "Essential for late descent" },
    ],
  },
  {
    name: "Harishchandragad Peak",
    slug: "harishchandragad-night-trek",
    category: "night-trek",
    location: "Ahmednagar, MH",
    date: "2026-09-19",
    durationDays: 2,
    duration: "2 Days (Night Trek)",
    difficulty: "Difficult",
    distance: "Approx. 10-12 km",
    pickup: "Pune",
    price: 2199,
    image: trekImages["hero.webp"],
    imageAlt: "Harishchandragad Trek",
    badge: "19 Sept 2026",
    shortDescription:
      "Camp under the stars at Konkan Kada, marvel at the mighty semi-circular cliff and natural caves.",
    isPopular: false,
    isUpcoming: true,
    included: [
      { title: "Travelling & Transportation", description: "Private non-AC transport from Pune and back." },
      { title: "Camping Stay", description: "Tents and sleeping mats near the fort." },
      { title: "All Meals", description: "Dinner, breakfast, and packed lunch." },
      { title: "Trek Leader & Guide", description: "Certified night-trek leaders." },
      { title: "Safety Equipment", description: "Ropes, headlamps, and first-aid support." },
    ],
    notIncluded: [
      { label: "Personal expenses during transit." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Devkund Secret Waterfall",
    slug: "devkund-waterfall-trek",
    category: "waterfall",
    location: "Raigad, MH",
    date: "2026-09-27",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Moderate",
    distance: "Approx. 14 km",
    pickup: "Mumbai/Pune",
    price: 1299,
    image: trekImages["tt-coastal-adventure.jpg"],
    imageAlt: "Devkund Waterfall",
    badge: "27 Sept 2026",
    shortDescription:
      "Trek through dense forests and streams to witness one of the most beautiful plunge waterfalls in India.",
    isPopular: false,
    isUpcoming: true,
    included: [
      { title: "Travelling & Transportation", description: "Pickup and drop from Mumbai and Pune." },
      { title: "Breakfast & Lunch", description: "Hot local meals provided." },
      { title: "Trek Leader & Guide", description: "Experienced local guides." },
      { title: "First-Aid Kit", description: "Basic first-aid available on route." },
    ],
    notIncluded: [
      { label: "Personal expenses and snacks." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Kalsubai Peak Trek",
    slug: "kalsubai-peak-trek",
    category: "one-day",
    location: "Igatpuri, MH",
    date: "2026-10-04",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Moderate",
    distance: "Approx. 11 km",
    pickup: "Pune",
    price: 1399,
    image: trekImages["pick-trekking.webp"],
    imageAlt: "Kalsubai Peak Trek",
    badge: "Highest Peak",
    shortDescription:
      "Scale the highest peak of Maharashtra standing at 5,400 feet.",
    isPopular: true,
    isUpcoming: false,
    included: [
      { title: "Travelling & Transportation", description: "Pickup and drop from Pune." },
      { title: "Breakfast & Lunch", description: "Local Maharashtrian meals." },
      { title: "Trek Leader & Guide", description: "Certified trek leaders." },
      { title: "First-Aid Kit", description: "Basic medical support." },
    ],
    notIncluded: [
      { label: "Personal expenses and snacks." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Sandhan Valley Giant Swing",
    slug: "sandhan-valley-trek",
    category: "backpacking",
    location: "Samrad, MH",
    date: "2026-10-11",
    durationDays: 2,
    duration: "2 Days",
    difficulty: "Difficult",
    distance: "Approx. 12 km",
    pickup: "Pune",
    price: 2999,
    image: trekImages["tt-rafting.webp"],
    imageAlt: "Sandhan Valley",
    badge: "Valley of Shadow",
    shortDescription:
      "Experience a deep canyon trek with suspension bridges and giant swings.",
    isPopular: true,
    isUpcoming: false,
    included: [
      { title: "Travelling & Transportation", description: "Private transport from Pune." },
      { title: "Camping & Meals", description: "Tents, dinner, breakfast, and lunch." },
      { title: "Safety Equipment", description: "Rappelling gear, ropes, and harnesses." },
      { title: "Trek Leaders", description: "Multiple certified leaders and support staff." },
    ],
    notIncluded: [
      { label: "Personal expenses." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Andharban Dark Forest Trek",
    slug: "andharban-dark-forest-trek",
    category: "one-day",
    location: "Tamhini Ghat, MH",
    date: "2026-10-18",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Easy - Moderate",
    distance: "Approx. 13 km",
    pickup: "Pune",
    price: 1250,
    image: trekImages["tt-wildlife.webp"],
    imageAlt: "Andharban Forest Trek",
    badge: "Dark Forest",
    shortDescription:
      "Descend into mystical dense jungle shadows with views of Kundalika valley.",
    isPopular: true,
    isUpcoming: false,
    included: [
      { title: "Travelling & Transportation", description: "Pickup and drop from Pune." },
      { title: "Breakfast & Lunch", description: "Simple, hearty local meals." },
      { title: "Trek Leader & Guide", description: "Friendly and experienced leaders." },
      { title: "First-Aid Kit", description: "Basic first-aid support." },
    ],
    notIncluded: [
      { label: "Personal expenses and snacks." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Visapur Fort Trek",
    slug: "visapur-fort-trek",
    category: "waterfall",
    location: "Lonavala, MH",
    date: "2026-10-25",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Easy - Moderate",
    distance: "Approx. 7-8 km",
    pickup: "Pune",
    price: 1199,
    image: trekImages["tt-biking.webp"],
    imageAlt: "Visapur Fort",
    badge: "Waterfall Climb",
    shortDescription:
      "Climb alongside cascading waterfalls to a scenic hill fort near Lonavala.",
    isPopular: false,
    isUpcoming: false,
    included: [
      { title: "Travelling & Transportation", description: "Pickup and drop from Pune." },
      { title: "Breakfast & Lunch", description: "Local meals provided." },
      { title: "Trek Leader & Guide", description: "Experienced guides." },
      { title: "First-Aid Kit", description: "Basic first-aid support." },
    ],
    notIncluded: [
      { label: "Personal expenses and snacks." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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
    name: "Vasota Jungle & Fort Trek",
    slug: "vasota-jungle-fort-trek",
    category: "one-day",
    location: "Koyna, MH",
    date: "2026-11-01",
    durationDays: 1,
    duration: "1 Day (Full day)",
    difficulty: "Moderate",
    distance: "Approx. 10 km",
    pickup: "Pune",
    price: 1599,
    image: trekImages["tt-safari.webp"],
    imageAlt: "Vasota Jungle Trek",
    badge: "Jungle Adventure",
    shortDescription:
      "Cross the Koyna backwaters on a boat and hike through deep reserve jungles.",
    isPopular: true,
    isUpcoming: false,
    included: [
      { title: "Travelling & Transportation", description: "Pickup and drop from Pune." },
      { title: "Boat Ride", description: "Backwater crossing to the trailhead." },
      { title: "Breakfast & Lunch", description: "Local meals provided." },
      { title: "Forest Entry & Guide", description: "Permits and certified local guide." },
    ],
    notIncluded: [
      { label: "Personal expenses and snacks." },
      { label: "Personal medicines." },
      { label: "Anything not listed in inclusions." },
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

for (const trek of treks) {
  const doc = await payload.create({
    collection: "treks",
    data: {
      ...trek,
      category: categoryMap[trek.category],
      _status: "published",
    },
  });
  console.log(`Trek: ${trek.name} -> ${doc.id}`);
}

await payload.updateGlobal({
  slug: "site-settings",
  data: {
    siteName: "Manmurad Bhatkanti",
    siteNameMr: "मनमुराद भटकंटी",
    tagline: "Trek • Tour • Travel",
    phone: "+919373398091",
    phoneDisplay: "+91 93733 98091",
    whatsappNumber: "919373398091",
    instagram: "https://www.instagram.com/manmurad_bhatkanti_/",
    instagramHandle: "@manmurad_bhatkanti_",
    designerName: "AKA_BALA.009",
    designerInstagram: "https://www.instagram.com/aka_bala.009",
    footerTagline:
      "Trek • Tour • Travel — Providing safe, highly planned, and extremely memorable trekking experiences in Sahyadris and beyond.",
  },
});
console.log("Global: site-settings seeded");

await payload.updateGlobal({
  slug: "navigation",
  data: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#about" },
      { label: "Upcoming Treks", href: "/#upcoming" },
      { label: "Completed Trips", href: "/#completed" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Contact Us", href: "/#contact" },
    ],
    trekLinks: [
      { label: "One Day Treks", href: "/trips" },
      { label: "Night Treks", href: "/trips" },
      { label: "Backpacking Tours", href: "/trips" },
      { label: "Waterfall Expeditions", href: "/trips" },
    ],
    connectLinks: [
      { label: "Instagram", href: "https://www.instagram.com/manmurad_bhatkanti_/" },
      { label: "WhatsApp Chat", href: "https://wa.me/919373398091" },
      { label: "Call Team", href: "tel:+919373398091" },
    ],
  },
});
console.log("Global: navigation seeded");

const features = [
  { title: "Experienced Team", emoji: "🧗‍♂️", description: "Our leaders have completed certified mountaineering courses and navigated Maharashtra's toughest ridges.", order: 1 },
  { title: "Safety First", emoji: "🛡️", description: "Equipped with certified safety equipment, tracking ropes, and comprehensive first-aid response systems.", order: 2 },
  { title: "Well-Planned Trips", emoji: "🗺️", description: "Custom itineraries detailing pick-up timelines, food stops, guides, and packing essentials.", order: 3 },
  { title: "Affordable Packages", emoji: "💸", description: "Transparent pricing starting from ₹1,199 including transport and local home-style hot meals.", order: 4 },
  { title: "Memorable Experiences", emoji: "⛺", description: "Sunrise viewing peaks, bonfire camping sessions, local histories, and lifelong trekker friendships.", order: 5 },
  { title: "Customer Focused", emoji: "❤️", description: "Continuous coordinate support starting from your booking enquiry down to dropping you off safely.", order: 6 },
];

for (const feature of features) {
  await payload.create({
    collection: "features",
    data: { ...feature, _status: "published" },
  });
}
console.log("Features seeded");

const testimonials = [
  { quote: "The Rajgad Fort trek was extremely well organized. Leaders took special care of beginners during the rock climb step.", name: "Abhishek Patil", role: "Rajgad Trekker", rating: 5, order: 1 },
  { quote: "Loved the camping setups at Harishchandragad. Beautiful sunrise at Konkan Kada and amazing local village lunch.", name: "Pooja Deshmukh", role: "Harishchandragad Camper", rating: 5, order: 2 },
  { quote: "Excellent co-ordination. The pick up at Kolhapur CBS was sharp on time. Safety ropes were used at steep slots.", name: "Saurabh Shinde", role: "Devkund Trekker", rating: 5, order: 3 },
];

for (const testimonial of testimonials) {
  await payload.create({
    collection: "testimonials",
    data: { ...testimonial, _status: "published" },
  });
}
console.log("Testimonials seeded");

process.exit(0);
