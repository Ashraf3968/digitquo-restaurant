import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const DB_PATH = resolve(process.cwd(), "server", "data", "app-db.json");

const initialData = {
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
  return JSON.parse(readFileSync(DB_PATH, "utf8"));
}

function writeDb(data) {
  ensureDb();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
