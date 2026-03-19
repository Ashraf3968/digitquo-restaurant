import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const DB_PATH = resolve(process.cwd(), "server", "data", "app-db.json");

const initialData = {
  users: [
    {
      id: "user-seed-1",
      name: "Demo Member",
      email: "member@maisonember.com",
      password: "member123"
    }
  ],
  reservations: [],
  reviews: [
    {
      id: "review-seed-1",
      name: "Aarav Mehta",
      role: "Private Banking Director",
      rating: 5,
      quote: "The design, service, and reservation experience all feel five-star. This is exactly how a modern restaurant brand should present itself online.",
      avatar: "AM",
      createdAt: "2026-03-18T19:30:00.000Z"
    },
    {
      id: "review-seed-2",
      name: "Riya Kapoor",
      role: "Lifestyle Editor",
      rating: 5,
      quote: "Elegant, bright, and beautifully paced. The digital experience mirrors the atmosphere of a truly premium dining room.",
      avatar: "RK",
      createdAt: "2026-03-17T18:10:00.000Z"
    },
    {
      id: "review-seed-3",
      name: "Nikhil Shah",
      role: "Founder, Atelier Events",
      rating: 4,
      quote: "Private dining and event inquiries feel especially polished. It builds trust the moment you land on the site.",
      avatar: "NS",
      createdAt: "2026-03-16T17:05:00.000Z"
    }
  ]
};

function ensureDb() {
  if (!existsSync(DB_PATH)) {
    mkdirSync(dirname(DB_PATH), { recursive: true });
    writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
  }
}

function readDb() {
  ensureDb();
  const data = JSON.parse(readFileSync(DB_PATH, "utf8"));
  if (!Array.isArray(data.users)) {
    data.users = [...initialData.users];
    writeDb(data);
  }
  return data;
}

function writeDb(data) {
  ensureDb();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createUser(payload) {
  const data = readDb();
  const email = payload.email.trim().toLowerCase();
  const existingUser = data.users.find((item) => item.email.toLowerCase() === email);
  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const user = {
    id: createId("user"),
    name: payload.name.trim(),
    email,
    password: payload.password,
  };

  data.users.unshift(user);
  writeDb(data);
  return { id: user.id, name: user.name, email: user.email };
}

export function authenticateUser(payload) {
  const data = readDb();
  const email = payload.email.trim().toLowerCase();
  const user = data.users.find((item) => item.email.toLowerCase() === email && item.password === payload.password);
  if (!user) {
    throw new Error("No registered account matched those login details.");
  }
  return { id: user.id, name: user.name, email: user.email };
}

export function listReviews() {
  const data = readDb();
  return data.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addReview(payload) {
  const data = readDb();
  const review = {
    id: createId("review"),
    name: payload.name.trim(),
    role: payload.role.trim() || "Verified guest",
    rating: Number(payload.rating),
    quote: payload.quote.trim(),
    avatar: payload.name.trim().split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "GU",
    createdAt: new Date().toISOString()
  };
  data.reviews.unshift(review);
  writeDb(data);
  return review;
}

export function listReservations() {
  const data = readDb();
  return data.reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addReservation(payload) {
  const data = readDb();
  const reservation = {
    id: createId("reservation"),
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    email: payload.email.trim(),
    guests: Number(payload.guests),
    date: payload.date,
    time: payload.time,
    seating: payload.seating,
    occasion: payload.occasion,
    specialRequests: payload.specialRequests?.trim() ?? "",
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  data.reservations.unshift(reservation);
  writeDb(data);
  return reservation;
}

export function updateReservation(id, status) {
  const data = readDb();
  const reservation = data.reservations.find((item) => item.id === id);
  if (!reservation) {
    return null;
  }
  reservation.status = status;
  writeDb(data);
  return reservation;
}

export function removeReview(id) {
  const data = readDb();
  data.reviews = data.reviews.filter((item) => item.id !== id);
  writeDb(data);
}

export function getDashboard() {
  return {
    reservations: listReservations(),
    reviews: listReviews()
  };
}
