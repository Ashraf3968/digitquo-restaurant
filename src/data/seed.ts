import type {
  Category,
  FaqItem,
  MediaItem,
  Product,
  Review,
  StoreDb,
  StoreHours,
  SupportInquiry,
  Testimonial,
  User,
} from "../types";

type CategorySeed = {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  heroImage: string;
  shortDescription: string;
  description: string;
  brand: string;
  features: string[];
  items: Array<{
    name: string;
    unit: string;
    price: number;
    oldPrice?: number;
    stockCount: number;
    rating: number;
    reviewCount: number;
    tag: Product["tag"];
  }>;
};

function buildImageVariant(base: string, itemIndex: number, variantIndex: number) {
  const separator = base.includes("?") ? "&" : "?";
  const widths = [1200, 1020, 940, 860];
  const heights = [900, 860, 820, 760];
  const sats = [0, 6, 10, 14];
  const exps = [0, 2, 6, 10];
  const slot = (itemIndex + variantIndex) % widths.length;

  return `${base}${separator}auto=format&fit=crop&w=${widths[slot]}&h=${heights[slot]}&q=82&sat=${sats[slot]}&exp=${exps[slot]}`;
}

const categorySeeds: CategorySeed[] = [
  {
    slug: "groceries",
    name: "Groceries",
    icon: "Basket",
    accent: "from-amber-300 via-orange-200 to-white",
    heroImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Pantry staples for everyday shopping.",
    description: "A dependable pantry range for home cooks, family kitchens, and bulk weekly grocery planning.",
    brand: "Harvest Lane",
    features: ["Daily essentials", "Trusted staples", "Fresh weekly stock"],
    items: [
      { name: "Premium Basmati Rice", unit: "5 kg", price: 18.99, oldPrice: 21.49, stockCount: 46, rating: 4.8, reviewCount: 164, tag: "Bestseller" },
      { name: "Whole Wheat Atta Flour", unit: "10 kg", price: 13.49, stockCount: 58, rating: 4.7, reviewCount: 129, tag: "Popular" },
      { name: "Organic Brown Lentils", unit: "1 kg", price: 5.99, oldPrice: 7.2, stockCount: 32, rating: 4.6, reviewCount: 83, tag: "Discount" },
      { name: "Cold Pressed Sunflower Oil", unit: "2 L", price: 11.49, stockCount: 25, rating: 4.7, reviewCount: 92, tag: "New" },
    ],
  },
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    icon: "Leaf",
    accent: "from-lime-300 via-emerald-200 to-white",
    heroImage: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Fresh produce selected daily.",
    description: "Seasonal produce handled for color, texture, and premium shelf presentation.",
    brand: "Fresh Orchard",
    features: ["Daily selection", "Farm-picked quality", "Cold-chain handled"],
    items: [
      { name: "Royal Gala Apples", unit: "1 kg", price: 4.99, stockCount: 38, rating: 4.8, reviewCount: 144, tag: "Popular" },
      { name: "Garden Fresh Tomatoes", unit: "1 kg", price: 2.79, stockCount: 41, rating: 4.6, reviewCount: 74, tag: "Bestseller" },
      { name: "Baby Spinach Pack", unit: "250 g", price: 3.49, oldPrice: 3.99, stockCount: 19, rating: 4.5, reviewCount: 61, tag: "Discount" },
      { name: "Seedless Green Grapes", unit: "500 g", price: 3.99, stockCount: 27, rating: 4.7, reviewCount: 88, tag: "New" },
    ],
  },
  {
    slug: "dairy",
    name: "Dairy",
    icon: "Milk",
    accent: "from-sky-300 via-cyan-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Chilled dairy and breakfast staples.",
    description: "Fresh milk, cultured dairy, and breakfast-ready essentials from dependable suppliers.",
    brand: "Meadow Vale",
    features: ["Chilled freshness", "Breakfast ready", "Trusted dairy range"],
    items: [
      { name: "Farm Fresh Whole Milk", unit: "1 L", price: 1.99, stockCount: 54, rating: 4.8, reviewCount: 201, tag: "Bestseller" },
      { name: "Greek Yogurt Natural", unit: "500 g", price: 4.29, stockCount: 31, rating: 4.7, reviewCount: 117, tag: "Popular" },
      { name: "Salted Butter Block", unit: "200 g", price: 3.59, oldPrice: 4.1, stockCount: 22, rating: 4.6, reviewCount: 95, tag: "Discount" },
      { name: "Cheddar Cheese Slices", unit: "250 g", price: 3.99, stockCount: 17, rating: 4.5, reviewCount: 68, tag: "New" },
    ],
  },
  {
    slug: "beverages",
    name: "Beverages",
    icon: "Cup",
    accent: "from-cyan-300 via-blue-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Juices, coffee, and premium hydration.",
    description: "Refreshing drinks designed for breakfast, office hours, and on-the-go convenience.",
    brand: "Pure Sip",
    features: ["Cold shelf favorites", "Hydration ready", "Balanced drink mix"],
    items: [
      { name: "Cold Brew Coffee", unit: "330 ml", price: 2.99, stockCount: 37, rating: 4.7, reviewCount: 121, tag: "Popular" },
      { name: "Valencia Orange Juice", unit: "1 L", price: 4.49, oldPrice: 5.29, stockCount: 24, rating: 4.6, reviewCount: 79, tag: "Discount" },
      { name: "Sparkling Mineral Water", unit: "6 x 330 ml", price: 5.99, stockCount: 43, rating: 4.5, reviewCount: 62, tag: "Bestseller" },
      { name: "Mango Smoothie Blend", unit: "750 ml", price: 4.99, stockCount: 16, rating: 4.8, reviewCount: 58, tag: "New" },
    ],
  },
  {
    slug: "snacks",
    name: "Snacks",
    icon: "Cookie",
    accent: "from-orange-300 via-yellow-200 to-white",
    heroImage: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Savory and sweet snack staples.",
    description: "Crowd-pleasing snack choices for lunchboxes, movie nights, and quick office breaks.",
    brand: "Snack Studio",
    features: ["Lunchbox favorites", "Sweet and savory", "Party-ready selection"],
    items: [
      { name: "Sea Salt Potato Chips", unit: "150 g", price: 2.89, stockCount: 49, rating: 4.7, reviewCount: 142, tag: "Bestseller" },
      { name: "Roasted Almond Mix", unit: "300 g", price: 6.49, stockCount: 28, rating: 4.8, reviewCount: 87, tag: "Popular" },
      { name: "Chocolate Wafer Rolls", unit: "180 g", price: 3.29, oldPrice: 3.79, stockCount: 33, rating: 4.5, reviewCount: 64, tag: "Discount" },
      { name: "Multigrain Trail Bars", unit: "6 pack", price: 4.79, stockCount: 18, rating: 4.6, reviewCount: 53, tag: "New" },
    ],
  },
  {
    slug: "bakery",
    name: "Bakery",
    icon: "Bread",
    accent: "from-amber-200 via-rose-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Fresh breads and breakfast pastries.",
    description: "A warm bakery collection with artisan loaves, pastries, and daily breakfast favorites.",
    brand: "Oven House",
    features: ["Baked fresh", "Breakfast favorites", "Artisan style"],
    items: [
      { name: "Sourdough Country Loaf", unit: "650 g", price: 4.99, stockCount: 18, rating: 4.8, reviewCount: 74, tag: "Popular" },
      { name: "Butter Croissants", unit: "4 pack", price: 5.49, stockCount: 21, rating: 4.7, reviewCount: 83, tag: "Bestseller" },
      { name: "Blueberry Muffins", unit: "4 pack", price: 4.29, oldPrice: 4.89, stockCount: 24, rating: 4.6, reviewCount: 59, tag: "Discount" },
      { name: "Wholegrain Sandwich Bread", unit: "500 g", price: 3.19, stockCount: 35, rating: 4.5, reviewCount: 52, tag: "New" },
    ],
  },
  {
    slug: "household-essentials",
    name: "Household Essentials",
    icon: "Home",
    accent: "from-stone-300 via-zinc-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Practical home staples for busy households.",
    description: "Value-led home support items created for convenience, durability, and monthly shopping.",
    brand: "Home Harbor",
    features: ["Daily convenience", "Bulk-value picks", "Home organization basics"],
    items: [
      { name: "Premium Tissue Rolls", unit: "12 pack", price: 8.99, stockCount: 39, rating: 4.8, reviewCount: 175, tag: "Bestseller" },
      { name: "Aluminum Foil Wrap", unit: "30 m", price: 2.99, stockCount: 34, rating: 4.6, reviewCount: 71, tag: "Popular" },
      { name: "Food Storage Bags", unit: "50 pack", price: 4.49, oldPrice: 5.19, stockCount: 27, rating: 4.5, reviewCount: 44, tag: "Discount" },
      { name: "Laundry Basket Flex", unit: "1 pc", price: 9.99, stockCount: 14, rating: 4.4, reviewCount: 33, tag: "New" },
    ],
  },
  {
    slug: "cleaning-supplies",
    name: "Cleaning Supplies",
    icon: "Sparkles",
    accent: "from-cyan-200 via-slate-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Home cleaning and hygiene solutions.",
    description: "Kitchen, laundry, and surface-care products chosen for trusted household performance.",
    brand: "BrightNest",
    features: ["Home hygiene", "Surface care", "Trusted cleaning staples"],
    items: [
      { name: "Citrus Floor Cleaner", unit: "2 L", price: 6.99, stockCount: 29, rating: 4.7, reviewCount: 69, tag: "Popular" },
      { name: "Laundry Detergent Liquid", unit: "3 L", price: 10.49, oldPrice: 11.99, stockCount: 26, rating: 4.8, reviewCount: 118, tag: "Discount" },
      { name: "Glass Shine Spray", unit: "750 ml", price: 3.89, stockCount: 23, rating: 4.5, reviewCount: 46, tag: "Bestseller" },
      { name: "Heavy Duty Scrub Pads", unit: "6 pack", price: 2.49, stockCount: 31, rating: 4.4, reviewCount: 35, tag: "New" },
    ],
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    icon: "Heart",
    accent: "from-rose-300 via-pink-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Daily wellness and grooming essentials.",
    description: "A dependable hygiene and grooming assortment built around modern daily routines.",
    brand: "Care Ritual",
    features: ["Daily essentials", "Wellness-led", "Trusted grooming range"],
    items: [
      { name: "Hydration Body Wash", unit: "500 ml", price: 5.49, stockCount: 37, rating: 4.7, reviewCount: 82, tag: "Popular" },
      { name: "Repair Shampoo", unit: "400 ml", price: 6.99, oldPrice: 7.49, stockCount: 28, rating: 4.6, reviewCount: 76, tag: "Discount" },
      { name: "Mint Fresh Toothpaste", unit: "150 g", price: 2.79, stockCount: 44, rating: 4.8, reviewCount: 133, tag: "Bestseller" },
      { name: "Sensitive Skin Lotion", unit: "250 ml", price: 7.99, stockCount: 16, rating: 4.5, reviewCount: 41, tag: "New" },
    ],
  },
  {
    slug: "baby-care",
    name: "Baby Care",
    icon: "Baby",
    accent: "from-sky-200 via-emerald-50 to-white",
    heroImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Gentle care for newborn and toddler needs.",
    description: "Family-focused baby essentials with gentle formulations and convenience-led packaging.",
    brand: "Little Bloom",
    features: ["Gentle formulas", "Parent-friendly", "Nursery essentials"],
    items: [
      { name: "Soft Care Baby Diapers", unit: "34 pack", price: 12.99, stockCount: 22, rating: 4.8, reviewCount: 151, tag: "Bestseller" },
      { name: "Baby Wet Wipes", unit: "80 sheets", price: 2.99, stockCount: 47, rating: 4.7, reviewCount: 103, tag: "Popular" },
      { name: "Baby Lotion Gentle", unit: "300 ml", price: 4.89, oldPrice: 5.29, stockCount: 21, rating: 4.6, reviewCount: 58, tag: "Discount" },
      { name: "Feeding Bottle Set", unit: "2 pack", price: 9.49, stockCount: 12, rating: 4.5, reviewCount: 29, tag: "New" },
    ],
  },
  {
    slug: "frozen-foods",
    name: "Frozen Foods",
    icon: "Snow",
    accent: "from-sky-300 via-indigo-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Convenient ready-to-cook freezer staples.",
    description: "Frozen meal support chosen for speed, taste, and family-friendly convenience.",
    brand: "Arctic Table",
    features: ["Quick meal prep", "Freezer convenience", "Family favorites"],
    items: [
      { name: "Frozen Green Peas", unit: "500 g", price: 2.49, stockCount: 36, rating: 4.6, reviewCount: 67, tag: "Popular" },
      { name: "Crispy Veggie Nuggets", unit: "750 g", price: 6.99, oldPrice: 7.99, stockCount: 19, rating: 4.5, reviewCount: 54, tag: "Discount" },
      { name: "Margherita Frozen Pizza", unit: "420 g", price: 5.99, stockCount: 17, rating: 4.7, reviewCount: 88, tag: "Bestseller" },
      { name: "Berry Smoothie Mix", unit: "400 g", price: 4.79, stockCount: 15, rating: 4.8, reviewCount: 39, tag: "New" },
    ],
  },
  {
    slug: "electronics-accessories",
    name: "Electronics Accessories",
    icon: "Plug",
    accent: "from-slate-300 via-slate-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Useful gadgets and everyday accessories.",
    description: "Convenience-led electronics add-ons built for workdays, travel, and home utility.",
    brand: "Volt Line",
    features: ["Daily tech essentials", "Utility-focused", "Reliable accessories"],
    items: [
      { name: "Fast Charge Cable USB-C", unit: "1 m", price: 8.99, stockCount: 33, rating: 4.7, reviewCount: 96, tag: "Bestseller" },
      { name: "Wireless Earbuds Mini", unit: "1 set", price: 24.99, oldPrice: 29.99, stockCount: 12, rating: 4.5, reviewCount: 51, tag: "Discount" },
      { name: "Portable Power Bank", unit: "10000 mAh", price: 19.99, stockCount: 18, rating: 4.6, reviewCount: 64, tag: "Popular" },
      { name: "Smart Plug Twin Pack", unit: "2 pack", price: 21.49, stockCount: 9, rating: 4.4, reviewCount: 28, tag: "New" },
    ],
  },
  {
    slug: "kitchen-items",
    name: "Kitchen Items",
    icon: "ChefHat",
    accent: "from-red-300 via-orange-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Modern kitchenware for meal prep and serving.",
    description: "Durable, practical kitchen tools designed for organized cooking spaces and daily meal preparation.",
    brand: "CookCraft",
    features: ["Kitchen-ready utility", "Modern durability", "Meal prep support"],
    items: [
      { name: "Non-Stick Fry Pan", unit: "28 cm", price: 18.49, stockCount: 15, rating: 4.7, reviewCount: 73, tag: "Popular" },
      { name: "Glass Storage Containers", unit: "3 piece set", price: 16.99, oldPrice: 18.99, stockCount: 13, rating: 4.8, reviewCount: 59, tag: "Discount" },
      { name: "Silicone Spatula Set", unit: "4 pack", price: 7.49, stockCount: 28, rating: 4.6, reviewCount: 45, tag: "Bestseller" },
      { name: "Acacia Chopping Board", unit: "1 pc", price: 14.99, stockCount: 11, rating: 4.5, reviewCount: 31, tag: "New" },
    ],
  },
  {
    slug: "stationery",
    name: "Stationery",
    icon: "Notebook",
    accent: "from-violet-200 via-indigo-50 to-white",
    heroImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Office and school essentials for organized days.",
    description: "Practical stationery chosen for students, home offices, and everyday productivity.",
    brand: "Paper District",
    features: ["School and office", "Neat organization", "Everyday productivity"],
    items: [
      { name: "Executive Notebook", unit: "A5", price: 6.49, stockCount: 26, rating: 4.8, reviewCount: 88, tag: "Bestseller" },
      { name: "Smooth Gel Pen Set", unit: "10 pack", price: 4.29, stockCount: 34, rating: 4.6, reviewCount: 51, tag: "Popular" },
      { name: "Desk Organizer Tray", unit: "1 pc", price: 8.99, oldPrice: 10.49, stockCount: 12, rating: 4.4, reviewCount: 27, tag: "Discount" },
      { name: "Sticky Notes Value Pack", unit: "12 pads", price: 5.49, stockCount: 23, rating: 4.5, reviewCount: 36, tag: "New" },
    ],
  },
  {
    slug: "pet-supplies",
    name: "Pet Supplies",
    icon: "PawPrint",
    accent: "from-amber-200 via-lime-100 to-white",
    heroImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Essentials for healthy and happy pets.",
    description: "Reliable pet care staples for feeding, grooming, and day-to-day home convenience.",
    brand: "Happy Tails",
    features: ["Daily pet care", "Home-friendly picks", "Trusted essentials"],
    items: [
      { name: "Adult Dog Food Chicken", unit: "3 kg", price: 19.49, stockCount: 14, rating: 4.8, reviewCount: 97, tag: "Bestseller" },
      { name: "Cat Litter Clumping", unit: "5 kg", price: 9.99, stockCount: 20, rating: 4.6, reviewCount: 42, tag: "Popular" },
      { name: "Pet Treat Bites", unit: "200 g", price: 4.59, oldPrice: 5.19, stockCount: 18, rating: 4.7, reviewCount: 55, tag: "Discount" },
      { name: "Pet Grooming Brush", unit: "1 pc", price: 8.49, stockCount: 10, rating: 4.5, reviewCount: 22, tag: "New" },
    ],
  },
];

export const storeHours: StoreHours[] = [
  { label: "Monday - Saturday", value: "8:00 AM - 10:00 PM" },
  { label: "Sunday", value: "9:00 AM - 8:00 PM" },
  { label: "Express Pickup", value: "7:30 AM - 10:30 PM" },
];

export const mediaItems: MediaItem[] = [
  {
    id: "media-store-tour",
    title: "Store Tour Experience",
    description: "A guided look at our premium aisles, fresh produce bays, and convenience-first checkout zones.",
    thumbnail: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=1200&q=80",
    duration: "02:24",
  },
  {
    id: "media-promo",
    title: "Weekly Offers Preview",
    description: "A campaign-style highlight reel of this week's seasonal offers, family bundles, and kitchen essentials.",
    thumbnail: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&w=1200&q=80",
    duration: "01:42",
  },
  {
    id: "media-delivery",
    title: "Fast Delivery Promise",
    description: "A quick look at our order packing, cold-chain handling, and same-day neighborhood delivery service.",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    duration: "01:58",
  },
];

export const faqItems: FaqItem[] = [
  { id: "faq-1", question: "Do you offer same-day delivery?", answer: "Yes. Same-day delivery is available across our service zones for most orders placed before 6:00 PM." },
  { id: "faq-2", question: "Can I place a bulk or corporate order?", answer: "Yes. Use the contact form or support request to arrange office pantry, event, or recurring household orders." },
  { id: "faq-3", question: "How are fresh and frozen items handled?", answer: "Fresh produce and frozen goods are packed in dedicated temperature-managed bins to protect quality through dispatch." },
  { id: "faq-4", question: "Is there a demo admin account?", answer: "Yes. Use admin@megamart.com with password admin123 to review the local admin dashboard." },
];

export const testimonials: Testimonial[] = [
  { id: "t-1", name: "Aisha Verma", role: "Operations Director", rating: 5, quote: "Mega Mart feels like a real national retail brand. The ordering flow is fast, and the product quality presentation builds trust immediately." },
  { id: "t-2", name: "Rahul Sethi", role: "IT Consultant", rating: 5, quote: "The mobile experience is excellent. Filters, checkout, and product details all feel commercial-grade rather than demo-level." },
  { id: "t-3", name: "Naina Kapoor", role: "Working Parent", rating: 4, quote: "Fresh produce, baby care, and household essentials in one clean order flow is exactly what I expect from a premium supermarket app." },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function titleFromTag(tag: Product["tag"]) {
  if (tag === "Bestseller") return "A top-selling choice";
  if (tag === "Discount") return "A value-led pick";
  if (tag === "New") return "Fresh into the catalog";
  return "A customer favorite";
}

function formatSku(category: string, index: number) {
  return `${category.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`;
}

export function createSeedCategories(): Category[] {
  return categorySeeds.map((category, index) => ({
    id: `category-${index + 1}`,
    slug: category.slug,
    name: category.name,
    description: category.description,
    shortDescription: category.shortDescription,
    accent: category.accent,
    heroImage: category.heroImage,
    icon: category.icon,
  }));
}

export function createSeedProducts(categories = createSeedCategories()): Product[] {
  return categorySeeds.flatMap((categorySeed, categoryIndex) => {
    const category = categories[categoryIndex];

    return categorySeed.items.map((item, itemIndex) => {
      const productIndex = categoryIndex * 4 + itemIndex;
      const isDiscounted = typeof item.oldPrice === "number";

      return {
        id: `product-${productIndex + 1}`,
        slug: slugify(item.name),
        name: item.name,
        categoryId: category.id,
        categoryName: category.name,
        brand: categorySeed.brand,
        unit: item.unit,
        price: item.price,
        oldPrice: item.oldPrice ?? null,
        shortDescription: `${titleFromTag(item.tag)} in ${category.name.toLowerCase()} for reliable weekly shopping.`,
        description: `${item.name} is part of our ${category.name.toLowerCase()} selection, curated for consistency, shelf appeal, and dependable home use. ${categorySeed.description}`,
        features: categorySeed.features,
        image: buildImageVariant(categorySeed.heroImage, itemIndex, 0),
        gallery: [
          buildImageVariant(categorySeed.heroImage, itemIndex, 0),
          buildImageVariant(categorySeed.heroImage, itemIndex, 1),
          buildImageVariant(categorySeed.heroImage, itemIndex, 2),
          buildImageVariant(categorySeed.heroImage, itemIndex, 3),
        ],
        stockStatus: item.stockCount <= 0 ? "Out of Stock" : item.stockCount < 15 ? "Low Stock" : "In Stock",
        stockCount: item.stockCount,
        rating: item.rating,
        reviewCount: item.reviewCount,
        sku: formatSku(category.slug, itemIndex),
        tag: item.tag,
        isFeatured: itemIndex === 0 || item.tag === "Bestseller",
        isNewArrival: item.tag === "New",
        isBestSeller: item.tag === "Bestseller",
        isDiscounted,
        popularity: 100 - productIndex + item.reviewCount,
        createdAt: new Date(2026, 2, Math.max(1, 20 - productIndex)).toISOString(),
      };
    });
  });
}

export function createSeedReviews(products = createSeedProducts()): Review[] {
  const authors = [
    ["Sara Khan", "Consistently good quality"],
    ["Dev Arora", "Worth reordering"],
    ["Priya Nair", "Exactly as described"],
    ["Omar Sheikh", "Great packaging and freshness"],
  ] as const;

  return products.slice(0, 12).flatMap((product, index) => {
    const first = authors[index % authors.length];
    const second = authors[(index + 1) % authors.length];

    return [
      {
        id: `review-${index * 2 + 1}`,
        productId: product.id,
        name: first[0],
        rating: Math.max(4, Math.round(product.rating)),
        title: first[1],
        text: `The ${product.name.toLowerCase()} arrived well packed and matched the premium quality shown on the site.`,
        createdAt: new Date(2026, 2, 12 - index).toISOString(),
        verified: true,
      },
      {
        id: `review-${index * 2 + 2}`,
        productId: product.id,
        name: second[0],
        rating: 5,
        title: second[1],
        text: `${product.name} felt fresh, properly stocked, and easy to reorder through the Mega Mart flow.`,
        createdAt: new Date(2026, 2, 10 - index).toISOString(),
        verified: index % 2 === 0,
      },
    ];
  });
}

function createSeedUsers(): User[] {
  return [
    {
      id: "user-admin",
      name: "Mega Mart Admin",
      email: "admin@megamart.com",
      password: "admin123",
      role: "admin",
      createdAt: "2026-03-01T08:00:00.000Z",
      lastLoginAt: null,
    },
    {
      id: "user-customer",
      name: "Demo Shopper",
      email: "shopper@megamart.com",
      password: "shopper123",
      role: "customer",
      createdAt: "2026-03-03T09:30:00.000Z",
      lastLoginAt: null,
    },
  ];
}

function createSeedOrders(products: Product[]): StoreDb["orders"] {
  return [
    {
      id: "order-1",
      orderNumber: "MM-240318-1001",
      customerName: "Priya Nair",
      email: "priya.nair@example.com",
      phone: "+91 98765 43210",
      address: "24 Lakeview Residency, Sector 14",
      city: "Kolkata",
      notes: "Please ring the side gate.",
      paymentMethod: "Cash on Delivery",
      items: [
        { productId: products[0].id, name: products[0].name, quantity: 1, unitPrice: products[0].price, image: products[0].image },
        { productId: products[9].id, name: products[9].name, quantity: 2, unitPrice: products[9].price, image: products[9].image },
      ],
      subtotal: Number((products[0].price + products[9].price * 2).toFixed(2)),
      deliveryFee: 2.99,
      total: Number((products[0].price + products[9].price * 2 + 2.99).toFixed(2)),
      status: "Packed",
      createdAt: "2026-03-18T14:15:00.000Z",
    },
    {
      id: "order-2",
      orderNumber: "MM-240319-1002",
      customerName: "Rahul Sethi",
      email: "rahul.sethi@example.com",
      phone: "+91 99887 66554",
      address: "19 Park Street",
      city: "Kolkata",
      notes: "",
      paymentMethod: "Wallet",
      items: [{ productId: products[44].id, name: products[44].name, quantity: 1, unitPrice: products[44].price, image: products[44].image }],
      subtotal: Number(products[44].price.toFixed(2)),
      deliveryFee: 0,
      total: Number(products[44].price.toFixed(2)),
      status: "Confirmed",
      createdAt: "2026-03-19T10:20:00.000Z",
    },
  ];
}

function createSeedInquiries(): SupportInquiry[] {
  return [
    {
      id: "inquiry-1",
      name: "Naina Kapoor",
      email: "naina@example.com",
      phone: "+91 90909 11223",
      subject: "Bulk office pantry request",
      message: "We need a weekly office pantry refill plan for around 45 team members.",
      type: "order",
      createdAt: "2026-03-19T09:00:00.000Z",
      status: "In Progress",
    },
    {
      id: "inquiry-2",
      name: "Sameer Khan",
      email: "sameer@example.com",
      phone: "+91 88881 45670",
      subject: "Delivery slot support",
      message: "Can I schedule delivery after 8 PM for my next grocery order?",
      type: "support",
      createdAt: "2026-03-20T12:45:00.000Z",
      status: "New",
    },
  ];
}

export function createInitialStore(): StoreDb {
  const categories = createSeedCategories();
  const products = createSeedProducts(categories);

  return {
    categories,
    products,
    reviews: createSeedReviews(products),
    testimonials,
    inquiries: createSeedInquiries(),
    orders: createSeedOrders(products),
    users: createSeedUsers(),
    hours: storeHours,
    media: mediaItems,
    faqs: faqItems,
  };
}
