export type NavItem = { label: string; to: string };
export type Dish = { name: string; description: string; price: string; tag: string; image: string; category: string };
export type Testimonial = { name: string; role: string; rating: number; quote: string; avatar: string };
export type VideoItem = { title: string; description: string; image: string; duration: string };

export const siteMeta = {
  brand: "Maison Ember",
  shortBrand: "ME",
  tagline: "Seasonal fire-led dining in a luminous modern setting.",
  phone: "+91 81779 57990",
  email: "digitquo@gmail.com",
  address: "14 Park View Crescent, Kolkata, India",
  hours: [
    "Monday - Thursday: 11:00 AM - 10:00 PM",
    "Friday - Saturday: 11:00 AM - 11:30 PM",
    "Sunday: 12:00 PM - 9:00 PM",
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "/reservations" },
  { label: "Reviews", to: "/reviews" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

export const highlights = [
  { title: "Locally sourced produce", text: "Daily-delivered ingredients from trusted farms and artisan suppliers." },
  { title: "Chef-led tasting", text: "A refined menu shaped by seasonal techniques and warm hospitality." },
  { title: "Private dining", text: "Elegant event spaces for celebrations, executive dinners, and intimate gatherings." },
  { title: "Seamless reservations", text: "Conversion-focused booking flows that feel polished on every device." },
  { title: "Fine service", text: "Warm, intuitive hosting designed for premium guest experiences." },
  { title: "Elegant atmosphere", text: "Natural textures, sculpted lighting, and a calm luxury mood." },
];

export const featuredDishes: Dish[] = [
  {
    name: "Whipped Burrata Garden",
    description: "Heirloom tomato conserve, basil oil, fennel pollen, grilled focaccia.",
    price: "Rs. 640",
    tag: "Bestseller",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Saffron Lobster Lumina",
    description: "Butter-poached lobster, citrus beurre blanc, charred greens.",
    price: "Rs. 1,890",
    tag: "Chef Choice",
    category: "Signature Dishes",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dark Cocoa Torte",
    description: "Velvet ganache, espresso caramel, sea salt lace.",
    price: "Rs. 420",
    tag: "Dessert",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
  },
];

export const menuItems: Dish[] = [
  ...featuredDishes,
  {
    name: "Smoked Pumpkin Veloute",
    description: "Toasted seeds, brown butter crumb, sage oil.",
    price: "Rs. 390",
    tag: "Vegetarian",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Rosemary Lamb Linguine",
    description: "Slow-braised lamb, aged pecorino, black pepper jus.",
    price: "Rs. 980",
    tag: "House Made",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Coal-Fired Citrus Salmon",
    description: "Preserved lemon glaze, asparagus, saffron rice.",
    price: "Rs. 1,120",
    tag: "Signature",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Truffle Harvest Risotto",
    description: "Aged parmesan, roasted mushrooms, herb finish.",
    price: "Rs. 860",
    tag: "Seasonal",
    category: "Seasonal Items",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ember Celebration Platter",
    description: "Curated grill assortment with sauces and sides for two.",
    price: "Rs. 2,250",
    tag: "Chef Special",
    category: "Chef Specials",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Vanilla Citrus Pavlova",
    description: "Orange blossom cream, berries, pistachio crunch.",
    price: "Rs. 390",
    tag: "Light",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Jasmine Pear Spritz",
    description: "Pear nectar, jasmine cordial, sparkling tonic.",
    price: "Rs. 320",
    tag: "Zero Proof",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  },
];

export const storyMoments = [
  "Maison Ember was designed as a light-filled dining room where seasonal ingredients, quiet luxury, and intuitive service create a memorable evening from first click to final course.",
  "From our open-fire kitchen to our private dining salon, every touchpoint is carefully composed to feel calm, warm, and unmistakably premium.",
];

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Private Banking Director",
    rating: 5,
    quote: "The design, service, and reservation experience all feel five-star. This is exactly how a modern restaurant brand should present itself online.",
    avatar: "AM",
  },
  {
    name: "Riya Kapoor",
    role: "Lifestyle Editor",
    rating: 5,
    quote: "Elegant, bright, and beautifully paced. The digital experience mirrors the atmosphere of a truly premium dining room.",
    avatar: "RK",
  },
  {
    name: "Nikhil Shah",
    role: "Founder, Atelier Events",
    rating: 4,
    quote: "Private dining and event inquiries feel especially polished. It builds trust the moment you land on the site.",
    avatar: "NS",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
];

export const videoItems: VideoItem[] = [
  {
    title: "A Night at Maison Ember",
    description: "A warm introduction to the dining room, lighting, and evening mood.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    duration: "01:28",
  },
  {
    title: "Chef's Signature Pass",
    description: "See our tasting dishes finished in the open kitchen.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    duration: "00:54",
  },
  {
    title: "Private Dining Evenings",
    description: "Premium events, curated tablescapes, and intimate celebrations.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    duration: "01:12",
  },
];

export const faqItems = [
  { question: "Do you accept reservations?", answer: "Yes. Reservations are available online, by phone, and through private dining inquiries." },
  { question: "Are private events available?", answer: "We host private dinners, celebrations, and executive events with custom menus." },
  { question: "Do you offer vegetarian options?", answer: "Our menu includes multiple vegetarian and seasonal dishes, including tasting options." },
  { question: "What are your opening hours?", answer: "We are open daily with extended service on weekends. Hours are listed in the footer and contact page." },
  { question: "Is parking available?", answer: "Yes. Valet and nearby secure parking are available during dinner service." },
  { question: "Can I order takeaway?", answer: "Selected signature dishes and desserts are available for pickup during lunch and dinner service." },
];

