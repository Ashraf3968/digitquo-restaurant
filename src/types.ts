export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  accent: string;
  heroImage: string;
  icon: string;
};

export type ProductTag = "New" | "Bestseller" | "Discount" | "Popular";

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  unit: string;
  price: number;
  oldPrice: number | null;
  shortDescription: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  stockCount: number;
  rating: number;
  reviewCount: number;
  sku: string;
  tag: ProductTag;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isDiscounted: boolean;
  popularity: number;
  createdAt: string;
};

export type Review = {
  id: string;
  productId: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
  verified: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
};

export type SupportInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "contact" | "support" | "order";
  createdAt: string;
  status: "New" | "In Progress" | "Resolved";
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: "Cash on Delivery" | "Card on Delivery" | "Wallet";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "Pending" | "Confirmed" | "Packed" | "Out for Delivery" | "Delivered";
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

export type AuthUser = Omit<User, "password">;

export type StoreHours = {
  label: string;
  value: string;
};

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type DashboardMetrics = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
  averageRating: number;
};

export type StoreDb = {
  categories: Category[];
  products: Product[];
  reviews: Review[];
  testimonials: Testimonial[];
  inquiries: SupportInquiry[];
  orders: Order[];
  users: User[];
  hours: StoreHours[];
  media: MediaItem[];
  faqs: FaqItem[];
};
