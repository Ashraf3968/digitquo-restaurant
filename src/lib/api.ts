import { createInitialStore } from "../data/seed";
import type {
  AuthUser,
  Category,
  DashboardMetrics,
  Order,
  Product,
  Review,
  StoreDb,
  SupportInquiry,
  User,
} from "../types";

const STORAGE_KEY = "megamart-enterprise-store";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mergeSeededItems<T extends { id: string }>(seeded: T[], stored: T[]) {
  const storedMap = new Map(stored.map((item) => [item.id, item]));
  const seededIds = new Set(seeded.map((item) => item.id));
  const mergedSeeded = seeded.map((item) => storedMap.get(item.id) ? { ...storedMap.get(item.id), ...item } : item);
  const customItems = stored.filter((item) => !seededIds.has(item.id));
  return [...mergedSeeded, ...customItems];
}

function readDb(): StoreDb {
  const initial = createInitialStore();

  if (!isBrowser()) {
    return clone(initial);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return clone(initial);
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoreDb>;
    const next: StoreDb = {
      ...initial,
      ...parsed,
      categories: Array.isArray(parsed.categories) && parsed.categories.length > 0 ? mergeSeededItems(initial.categories, parsed.categories) : initial.categories,
      products: Array.isArray(parsed.products) && parsed.products.length > 0 ? mergeSeededItems(initial.products, parsed.products) : initial.products,
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : initial.reviews,
      testimonials: Array.isArray(parsed.testimonials) ? mergeSeededItems(initial.testimonials, parsed.testimonials) : initial.testimonials,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : initial.inquiries,
      orders: Array.isArray(parsed.orders) ? parsed.orders : initial.orders,
      users: Array.isArray(parsed.users) ? parsed.users : initial.users,
      hours: Array.isArray(parsed.hours) ? mergeSeededItems(initial.hours.map((item) => ({ ...item, id: item.label })), parsed.hours.map((item) => ({ ...item, id: item.label }))).map(({ id: _id, ...item }) => item) : initial.hours,
      media: Array.isArray(parsed.media) ? mergeSeededItems(initial.media, parsed.media) : initial.media,
      faqs: Array.isArray(parsed.faqs) ? mergeSeededItems(initial.faqs, parsed.faqs) : initial.faqs,
    };
    writeDb(next);
    return clone(next);
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return clone(initial);
  }
}

function writeDb(data: StoreDb) {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function sanitizeUser(user: User): AuthUser {
  const { password: _password, ...safe } = user;
  return safe;
}

export function resetStore() {
  const fresh = createInitialStore();
  writeDb(fresh);
  return fresh;
}

export async function getStoreData() {
  return readDb();
}

export async function getCategories() {
  return readDb().categories;
}

export async function getProducts() {
  return readDb().products;
}

export async function getProductBySlug(slug: string) {
  const db = readDb();
  return db.products.find((product) => product.slug === slug) ?? null;
}

export async function getProductReviews(productId: string) {
  return readDb()
    .reviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createReview(payload: { productId: string; name: string; rating: number; title: string; text: string }) {
  const db = readDb();
  const review: Review = {
    id: createId("review"),
    productId: payload.productId,
    name: payload.name.trim(),
    rating: payload.rating,
    title: payload.title.trim(),
    text: payload.text.trim(),
    createdAt: new Date().toISOString(),
    verified: false,
  };

  db.reviews.unshift(review);

  const product = db.products.find((item) => item.id === payload.productId);
  if (product) {
    const totalScore = product.rating * product.reviewCount + payload.rating;
    product.reviewCount += 1;
    product.rating = Number((totalScore / product.reviewCount).toFixed(1));
  }

  writeDb(db);
  return review;
}

export async function signupUser(payload: { name: string; email: string; password: string }) {
  const db = readDb();
  const email = payload.email.trim().toLowerCase();

  if (db.users.some((item) => item.email.toLowerCase() === email)) {
    throw new Error("An account with this email already exists.");
  }

  const user: User = {
    id: createId("user"),
    name: payload.name.trim(),
    email,
    password: payload.password,
    role: "customer",
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
  };

  db.users.unshift(user);
  writeDb(db);
  return sanitizeUser(user);
}

export async function loginUser(payload: { email: string; password: string }) {
  const db = readDb();
  const email = payload.email.trim().toLowerCase();
  const user = db.users.find((item) => item.email.toLowerCase() === email && item.password === payload.password);

  if (!user) {
    throw new Error("No account matched those login details.");
  }

  user.lastLoginAt = new Date().toISOString();
  writeDb(db);
  return sanitizeUser(user);
}

export async function submitInquiry(payload: Omit<SupportInquiry, "id" | "createdAt" | "status">) {
  const db = readDb();
  const inquiry: SupportInquiry = {
    id: createId("inquiry"),
    ...payload,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    createdAt: new Date().toISOString(),
    status: "New",
  };

  db.inquiries.unshift(inquiry);
  writeDb(db);
  return {
    inquiry,
    mailPreview: `Support request captured locally for ${inquiry.email}. Subject: ${inquiry.subject}`,
  };
}

export async function createOrder(payload: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">) {
  const db = readDb();
  const order: Order = {
    ...payload,
    id: createId("order"),
    orderNumber: `MM-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  db.orders.unshift(order);
  writeDb(db);
  return order;
}

export async function getAdminDashboard() {
  const db = readDb();
  const metrics: DashboardMetrics = {
    totalRevenue: Number(db.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)),
    totalOrders: db.orders.length,
    totalCustomers: db.users.filter((user) => user.role === "customer").length,
    pendingOrders: db.orders.filter((order) => order.status === "Pending").length,
    lowStockProducts: db.products.filter((product) => product.stockCount < 15).length,
    averageRating: Number((db.products.reduce((sum, product) => sum + product.rating, 0) / db.products.length).toFixed(1)),
  };

  return { ...db, metrics };
}

export async function createOrUpdateProduct(payload: Product) {
  const db = readDb();
  const index = db.products.findIndex((product) => product.id === payload.id);

  if (index >= 0) {
    db.products[index] = payload;
  } else {
    db.products.unshift({ ...payload, id: createId("product") });
  }

  writeDb(db);
  return payload;
}

export async function deleteProduct(productId: string) {
  const db = readDb();
  db.products = db.products.filter((product) => product.id !== productId);
  db.reviews = db.reviews.filter((review) => review.productId !== productId);
  writeDb(db);
  return { ok: true as const };
}

export async function createCategory(payload: Omit<Category, "id">) {
  const db = readDb();
  const category: Category = { ...payload, id: createId("category") };
  db.categories.unshift(category);
  writeDb(db);
  return category;
}

export async function updateOrderStatus(orderId: string, status: Order["status"]) {
  const db = readDb();
  const order = db.orders.find((item) => item.id === orderId);
  if (!order) {
    throw new Error("Order not found.");
  }
  order.status = status;
  writeDb(db);
  return order;
}

export async function getRelatedProducts(categoryId: string, exceptId: string) {
  return readDb()
    .products
    .filter((product) => product.categoryId === categoryId && product.id !== exceptId)
    .slice(0, 4);
}
