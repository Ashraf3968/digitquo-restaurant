import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { get, list, put } from "@vercel/blob";

const LOCAL_DB_PATH = resolve(process.cwd(), "server", "data", "app-db.json");
const REMOTE_DB_PATH = "digitquo/restaurant-demo/app-db.json";

const initialData = {
  users: [
    {
      id: "user-seed-1",
      name: "Demo Member",
      email: "member@maisonember.com",
      password: "member123",
      status: "Active",
      createdAt: "2026-03-10T10:00:00.000Z",
      lastLoginAt: null,
    },
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
      createdAt: "2026-03-18T19:30:00.000Z",
    },
    {
      id: "review-seed-2",
      name: "Riya Kapoor",
      role: "Lifestyle Editor",
      rating: 5,
      quote: "Elegant, bright, and beautifully paced. The digital experience mirrors the atmosphere of a truly premium dining room.",
      avatar: "RK",
      createdAt: "2026-03-17T18:10:00.000Z",
    },
    {
      id: "review-seed-3",
      name: "Nikhil Shah",
      role: "Founder, Atelier Events",
      rating: 4,
      quote: "Private dining and event inquiries feel especially polished. It builds trust the moment you land on the site.",
      avatar: "NS",
      createdAt: "2026-03-16T17:05:00.000Z",
    },
  ],
};

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeUsers(users) {
  if (!Array.isArray(users)) {
    return structuredCloneSafe(initialData.users);
  }

  return users.map((user) => ({
    id: String(user?.id ?? createId("user")),
    name: String(user?.name ?? "Member"),
    email: String(user?.email ?? ""),
    password: String(user?.password ?? "member123"),
    status: user?.status === "Suspended" ? "Suspended" : "Active",
    createdAt: String(user?.createdAt ?? new Date().toISOString()),
    lastLoginAt: user?.lastLoginAt ? String(user.lastLoginAt) : null,
  }));
}

function normalizeDb(data) {
  return {
    users: normalizeUsers(data?.users),
    reservations: Array.isArray(data?.reservations) ? data.reservations : [],
    reviews: Array.isArray(data?.reviews) && data.reviews.length > 0 ? data.reviews : structuredCloneSafe(initialData.reviews),
  };
}

function ensureLocalDb() {
  if (!existsSync(LOCAL_DB_PATH)) {
    mkdirSync(dirname(LOCAL_DB_PATH), { recursive: true });
    writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
  }
}

function readLocalDb() {
  ensureLocalDb();
  const parsed = JSON.parse(readFileSync(LOCAL_DB_PATH, "utf8"));
  const normalized = normalizeDb(parsed);
  writeFileSync(LOCAL_DB_PATH, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

function writeLocalDb(data) {
  ensureLocalDb();
  writeFileSync(LOCAL_DB_PATH, JSON.stringify(normalizeDb(data), null, 2), "utf8");
}

function hasRemoteStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readRemoteDb() {
  if (!hasRemoteStore()) {
    throw new Error("Shared storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel to enable cross-device login and data sync.");
  }

  const result = await list({
    prefix: REMOTE_DB_PATH,
    limit: 10,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const blob = result.blobs.find((item) => item.pathname === REMOTE_DB_PATH);
  if (!blob) {
    await writeRemoteDb(initialData);
    return structuredCloneSafe(initialData);
  }

  const response = await get(REMOTE_DB_PATH, {
    access: "private",
    useCache: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (!response?.stream) {
    await writeRemoteDb(initialData);
    return structuredCloneSafe(initialData);
  }

  const text = await new Response(response.stream).text();

  try {
    return normalizeDb(JSON.parse(text));
  } catch {
    await writeRemoteDb(initialData);
    return structuredCloneSafe(initialData);
  }
}

async function writeRemoteDb(data) {
  if (!hasRemoteStore()) {
    throw new Error("Shared storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel to enable cross-device login and data sync.");
  }

  await put(REMOTE_DB_PATH, JSON.stringify(normalizeDb(data), null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function readDb() {
  if (process.env.VERCEL === "1") {
    return readRemoteDb();
  }

  return readLocalDb();
}

async function writeDb(data) {
  if (process.env.VERCEL === "1") {
    await writeRemoteDb(data);
    return;
  }

  writeLocalDb(data);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createUser(payload) {
  const data = await readDb();
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
    status: "Active",
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
  };

  data.users.unshift(user);
  await writeDb(data);
  return { id: user.id, name: user.name, email: user.email };
}

export async function authenticateUser(payload) {
  const data = await readDb();
  const email = payload.email.trim().toLowerCase();
  const user = data.users.find((item) => item.email.toLowerCase() === email && item.password === payload.password);
  if (!user) {
    throw new Error("No registered account matched those login details.");
  }
  if (user.status === "Suspended") {
    throw new Error("This account has been suspended. Contact the administrator.");
  }
  user.lastLoginAt = new Date().toISOString();
  await writeDb(data);
  return { id: user.id, name: user.name, email: user.email };
}

export async function listUsers() {
  const data = await readDb();
  return data.users;
}

export async function updateUserStatus(id, status) {
  const data = await readDb();
  const user = data.users.find((item) => item.id === id);
  if (!user) {
    return null;
  }
  user.status = status;
  await writeDb(data);
  return user;
}

export async function removeUser(id) {
  const data = await readDb();
  data.users = data.users.filter((item) => item.id !== id);
  await writeDb(data);
}

export async function listReviews() {
  const data = await readDb();
  return data.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addReview(payload) {
  const data = await readDb();
  const review = {
    id: createId("review"),
    name: payload.name.trim(),
    role: payload.role.trim() || "Verified guest",
    rating: Number(payload.rating),
    quote: payload.quote.trim(),
    avatar: payload.name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "GU",
    createdAt: new Date().toISOString(),
  };
  data.reviews.unshift(review);
  await writeDb(data);
  return review;
}

export async function listReservations() {
  const data = await readDb();
  return data.reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addReservation(payload) {
  const data = await readDb();
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
    createdAt: new Date().toISOString(),
  };
  data.reservations.unshift(reservation);
  await writeDb(data);
  return reservation;
}

export async function updateReservation(id, status) {
  const data = await readDb();
  const reservation = data.reservations.find((item) => item.id === id);
  if (!reservation) {
    return null;
  }
  reservation.status = status;
  await writeDb(data);
  return reservation;
}

export async function removeReview(id) {
  const data = await readDb();
  data.reviews = data.reviews.filter((item) => item.id !== id);
  await writeDb(data);
}

export async function getDashboard() {
  const [users, reservations, reviews] = await Promise.all([listUsers(), listReservations(), listReviews()]);
  return { users, reservations, reviews };
}
