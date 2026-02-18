/**
 * Static SEO blog posts for when Sanity is empty or to ensure minimum content.
 */

const UNSPLASH = "https://images.unsplash.com";

export interface StaticBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  mainImage?: { asset?: { url?: string } };
  author?: string;
  publishedAt: string;
  categories?: string[];
  metaTitle?: string;
  metaDescription?: string;
  body?: { _type: string; children: { _type: string; text: string }[] }[];
  readTime?: string;
}

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
  {
    _id: "blog-1",
    title: "Mastering the Art of Halal Food Hunting in Tokyo",
    slug: { current: "halal-food-hunting-tokyo" },
    shortDescription: "From hidden Wagyu gems in Shibuya to authentic Ramen shops in Asakusa, discover our comprehensive guide to navigating Japan's bustling capital as a Muslim traveler.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1545569341-9eb8b30979d9?w=1200` } },
    author: "Sarah Ahmed",
    publishedAt: "2024-10-24",
    categories: ["Food Guides", "Japan"],
    metaTitle: "Halal Food in Tokyo: Complete Guide for Muslim Travelers | The Halal Explorer",
    metaDescription: "Find halal restaurants, ramen, and sushi in Tokyo. Tips for Muslim travelers in Japan with prayer facilities and halal certification.",
    readTime: "8 min read",
  },
  {
    _id: "blog-2",
    title: "5 Must-Visit Halal Cafes in London's Notting Hill",
    slug: { current: "halal-cafes-london-notting-hill" },
    shortDescription: "Explore the pastel-colored streets and discover the best spots for brunch and pastries that are fully halal-friendly.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1513635269975-59663e0ac1ad?w=1200` } },
    author: "Omar Kassim",
    publishedAt: "2024-10-20",
    categories: ["Food Guides", "Europe"],
    metaTitle: "Best Halal Cafes in London Notting Hill | The Halal Explorer",
    metaDescription: "Halal brunch and cafes in Notting Hill, London. Muslim-friendly dining guide for travelers.",
    readTime: "5 min read",
  },
  {
    _id: "blog-3",
    title: "A Muslimah's Guide to Exploring Scandinavia",
    slug: { current: "muslimah-guide-scandinavia" },
    shortDescription: "Traveling solo in Sweden and Denmark: safety tips, finding prayer rooms, and experiencing the Northern Lights.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1502602898657-3e91760cbb34?w=1200` } },
    author: "Layla Noor",
    publishedAt: "2024-10-15",
    categories: ["Solo Travel", "Europe"],
    metaTitle: "Scandinavia Travel Guide for Muslim Women | The Halal Explorer",
    metaDescription: "Halal food, prayer rooms, and safety tips for Muslim women traveling in Sweden and Denmark.",
    readTime: "12 min read",
  },
  {
    _id: "blog-4",
    title: "Best Travel Apps for Finding Prayer Rooms",
    slug: { current: "travel-apps-prayer-rooms" },
    shortDescription: "We reviewed 10 popular apps to help you maintain your daily prayers while navigating new cities abroad.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1512941937669-90a1b58e7e9c?w=1200` } },
    author: "Zaid Khan",
    publishedAt: "2024-10-10",
    categories: ["Prayer Tips", "Travel Tips"],
    metaTitle: "Best Prayer Room Finder Apps for Muslim Travelers | The Halal Explorer",
    metaDescription: "Top apps for finding mosques and prayer rooms when traveling. Qibla, prayer times, and halal food apps.",
    readTime: "6 min read",
  },
  {
    _id: "blog-5",
    title: "Discovering Islamic History in Cordoba",
    slug: { current: "islamic-history-cordoba" },
    shortDescription: "A journey through the architectural wonders of Al-Andalus and the timeless beauty of the Mezquita.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1583422409516-2895a77ef5ad?w=1200` } },
    author: "Sarah Ahmed",
    publishedAt: "2024-10-05",
    categories: ["Cultural Insight", "Spain"],
    metaTitle: "Islamic Heritage in Cordoba Spain | The Halal Explorer",
    metaDescription: "Guide to the Mezquita and Islamic history in Cordoba, Andalusia. Muslim travel in Spain.",
    readTime: "15 min read",
  },
  {
    _id: "blog-6",
    title: "Finding Qibla and Prayer Spaces in Modern Airports",
    slug: { current: "prayer-spaces-airports" },
    shortDescription: "A comprehensive guide to utilizing technology and locating hidden multifaith rooms in major transit hubs.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1436491865332-7a61a109cc05?w=1200` } },
    author: "Ahmed Khalid",
    publishedAt: "2024-09-28",
    categories: ["Prayer Tips", "Travel Tips"],
    metaTitle: "Prayer Rooms and Qibla in Airports | The Halal Explorer",
    metaDescription: "How to find prayer rooms and Qibla direction in airports worldwide. Tips for Muslim travelers.",
    readTime: "5 min read",
  },
  {
    _id: "blog-7",
    title: "Top 5 Apps for Finding Verified Halal Food Abroad",
    slug: { current: "apps-halal-food-abroad" },
    shortDescription: "Never worry about your next meal with these community-vetted applications available worldwide.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1504674900247-0877df9cc836?w=1200` } },
    author: "Fatima Al-Sayed",
    publishedAt: "2024-09-22",
    categories: ["Food Guides", "Travel Tips"],
    metaTitle: "Best Halal Food Finder Apps for Travel | The Halal Explorer",
    metaDescription: "Halal restaurant apps and how to find verified halal food when traveling. Reviews and tips.",
    readTime: "8 min read",
  },
  {
    _id: "blog-8",
    title: "Essentials for a Muslim Traveler's Carry-On Bag",
    slug: { current: "muslim-traveler-carry-on-essentials" },
    shortDescription: "From portable bidets to travel prayer mats, here is what you need for a comfortable trip.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1488646953014-85cb44e25828?w=1200` } },
    author: "Zaid Rahman",
    publishedAt: "2024-09-15",
    categories: ["Packing", "Travel Tips"],
    metaTitle: "Muslim Travel Packing List: Carry-On Essentials | The Halal Explorer",
    metaDescription: "What to pack for halal travel: prayer mat, wudu bottle, modest clothing, and more.",
    readTime: "4 min read",
  },
  {
    _id: "blog-9",
    title: "Dubai's Best Kept Secret Souks",
    slug: { current: "dubai-secret-souks" },
    shortDescription: "Beyond the malls: discover traditional souks for spices, gold, and textiles in old Dubai.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1512453979798-5ea266f8880c?w=1200` } },
    author: "Omar Kassim",
    publishedAt: "2024-09-10",
    categories: ["Cultural Insight", "UAE"],
    metaTitle: "Best Souks in Dubai for Muslim Travelers | The Halal Explorer",
    metaDescription: "Guide to Dubai souks: Gold Souk, Spice Souk, and traditional markets. Halal-friendly shopping.",
    readTime: "7 min read",
  },
  {
    _id: "blog-10",
    title: "Budgeting for Your First Hajj Trip",
    slug: { current: "budgeting-first-hajj-trip" },
    shortDescription: "Practical advice on saving, packages, and managing expenses for first-time pilgrims.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1567521464028-f22716e2c616?w=1200` } },
    author: "Layla Noor",
    publishedAt: "2024-09-05",
    categories: ["Spiritual", "Saudi Arabia"],
    metaTitle: "Hajj Trip Budget Guide: Costs and Tips | The Halal Explorer",
    metaDescription: "How much does Hajj cost? Tips for budgeting your first pilgrimage to Mecca.",
    readTime: "10 min read",
  },
  {
    _id: "blog-11",
    title: "Ramadan Travel: Best Destinations and Tips",
    slug: { current: "ramadan-travel-destinations-tips" },
    shortDescription: "Where to travel during Ramadan and how to make the most of fasting while abroad.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1596422846543-75c6fc197f07?w=1200` } },
    author: "Sarah Ahmed",
    publishedAt: "2024-08-28",
    categories: ["Ramadan", "Travel Tips"],
    metaTitle: "Ramadan Travel Guide: Destinations and Tips | The Halal Explorer",
    metaDescription: "Best Muslim-friendly destinations for Ramadan travel. Iftar and suhoor while traveling.",
    readTime: "9 min read",
  },
  {
    _id: "blog-12",
    title: "Kuala Lumpur on a Budget: Halal Food and Free Attractions",
    slug: { current: "kuala-lumpur-budget-halal" },
    shortDescription: "Experience Malaysia's capital without breaking the bank. Street food, free mosques, and affordable stays.",
    mainImage: { asset: { url: `${UNSPLASH}/photo-1596422846543-75c6fc197f07?w=1200` } },
    author: "Zaid Khan",
    publishedAt: "2024-08-20",
    categories: ["Budget Travel", "Malaysia"],
    metaTitle: "Kuala Lumpur Budget Guide: Halal Food and Sights | The Halal Explorer",
    metaDescription: "Cheap halal food and free things to do in Kuala Lumpur. Budget travel tips for Muslim travelers.",
    readTime: "6 min read",
  },
];
