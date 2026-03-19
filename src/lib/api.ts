export type ReviewItem = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
  createdAt: string;
};

export type ReservationItem = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seating: string;
  occasion: string;
  specialRequests: string;
  status: string;
  createdAt: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AdminUser = AuthUser & {
  password: string;
  status: "Active" | "Suspended";
  createdAt: string;
  lastLoginAt: string | null;
};

type DemoDb = {
  users: AdminUser[];
  reviews: ReviewItem[];
  reservations: ReservationItem[];
};

const STORAGE_KEY = "digitquo-demo-db";

const seededReviews: ReviewItem[] = [
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
];

const initialDb: DemoDb = {
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
  reviews: seededReviews,
  reservations: [],
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeUsers(users: unknown): AdminUser[] {
  if (!Array.isArray(users)) {
    return structuredClone(initialDb.users);
  }

  return users.map((item) => {
    const user = item as Partial<AdminUser>;
    return {
      id: String(user.id ?? createId("user")),
      name: String(user.name ?? "Member"),
      email: String(user.email ?? ""),
      password: String(user.password ?? "member123"),
      status: user.status === "Suspended" ? "Suspended" : "Active",
      createdAt: String(user.createdAt ?? new Date().toISOString()),
      lastLoginAt: user.lastLoginAt ? String(user.lastLoginAt) : null,
    };
  });
}

function readLocalDb(): DemoDb {
  if (!isBrowser()) {
    return structuredClone(initialDb);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
    return structuredClone(initialDb);
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DemoDb>;
    const db: DemoDb = {
      users: normalizeUsers(parsed.users),
      reviews: Array.isArray(parsed.reviews) && parsed.reviews.length > 0 ? parsed.reviews : structuredClone(initialDb.reviews),
      reservations: Array.isArray(parsed.reservations) ? parsed.reservations : [],
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return db;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
    return structuredClone(initialDb);
  }
}

function writeLocalDb(data: DemoDb) {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toAuthUser(user: AdminUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email };
}

function isApiUnavailableError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("local app server api was not found") ||
    message.includes("shared storage is not configured") ||
    message.includes("failed to fetch") ||
    message.includes("load failed") ||
    message.includes("networkerror")
  );
}

async function requestJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    const text = await response.text();

    if (response.status === 404) {
      throw new Error("The local app server API was not found.");
    }

    if (contentType.includes("application/json")) {
      let parsedMessage = "";
      try {
        parsedMessage = (JSON.parse(text) as { message?: string }).message ?? "";
      } catch {
        parsedMessage = "";
      }
      throw new Error(parsedMessage || text || "Request failed.");
    }

    throw new Error(text || "Request failed.");
  }

  return response.json() as Promise<T>;
}

export async function loginUser(payload: { email: string; password: string }) {
  try {
    return await requestJson<AuthUser>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const email = payload.email.trim().toLowerCase();
    const user = db.users.find((item) => item.email.toLowerCase() === email && item.password === payload.password);
    if (!user) {
      throw new Error("No registered account matched those login details.");
    }
    if (user.status === "Suspended") {
      throw new Error("This account has been suspended. Contact the administrator.");
    }
    user.lastLoginAt = new Date().toISOString();
    writeLocalDb(db);
    return toAuthUser(user);
  }
}

export async function signupUser(payload: { name: string; email: string; password: string }) {
  try {
    return await requestJson<AuthUser>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const email = payload.email.trim().toLowerCase();
    const exists = db.users.some((item) => item.email.toLowerCase() === email);
    if (exists) {
      throw new Error("An account with this email already exists.");
    }

    const user: AdminUser = {
      id: createId("user"),
      name: payload.name.trim(),
      email,
      password: payload.password,
      status: "Active",
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };
    db.users.unshift(user);
    writeLocalDb(db);
    return toAuthUser(user);
  }
}

export async function getReviews() {
  try {
    return await requestJson<ReviewItem[]>("/api/reviews");
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    return [...db.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export async function createReview(payload: { name: string; role: string; rating: number; quote: string }) {
  try {
    return await requestJson<ReviewItem>("/api/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const review: ReviewItem = {
      id: createId("review"),
      name: payload.name.trim(),
      role: payload.role.trim() || "Verified guest",
      rating: Number(payload.rating),
      quote: payload.quote.trim(),
      avatar: payload.name.trim().split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "GU",
      createdAt: new Date().toISOString(),
    };
    db.reviews.unshift(review);
    writeLocalDb(db);
    return review;
  }
}

export async function createReservation(payload: Omit<ReservationItem, "id" | "status" | "createdAt">) {
  try {
    return await requestJson<ReservationItem>("/api/reservations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const reservation: ReservationItem = {
      id: createId("reservation"),
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      guests: Number(payload.guests),
      date: payload.date,
      time: payload.time,
      seating: payload.seating,
      occasion: payload.occasion,
      specialRequests: payload.specialRequests.trim(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    db.reservations.unshift(reservation);
    writeLocalDb(db);
    return reservation;
  }
}

export async function getAdminDashboard() {
  try {
    return await requestJson<{ reservations: ReservationItem[]; reviews: ReviewItem[]; users: AdminUser[] }>("/api/admin/dashboard");
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    return {
      reservations: [...db.reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      reviews: [...db.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      users: [...db.users],
    };
  }
}

export async function updateReservationStatus(id: string, status: string) {
  try {
    return await requestJson<ReservationItem>(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const reservation = db.reservations.find((item) => item.id === id);
    if (!reservation) {
      throw new Error("Reservation not found.");
    }
    reservation.status = status;
    writeLocalDb(db);
    return reservation;
  }
}

export async function updateUserStatus(id: string, status: AdminUser["status"]) {
  try {
    return await requestJson<AdminUser>(`/api/admin/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    const user = db.users.find((item) => item.id === id);
    if (!user) {
      throw new Error("User not found.");
    }
    user.status = status;
    writeLocalDb(db);
    return user;
  }
}

export async function deleteUser(id: string) {
  try {
    return await requestJson<{ ok: true }>(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    db.users = db.users.filter((item) => item.id !== id);
    writeLocalDb(db);
    return { ok: true as const };
  }
}

export async function deleteReview(id: string) {
  try {
    return await requestJson<{ ok: true }>(`/api/admin/reviews/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    const db = readLocalDb();
    db.reviews = db.reviews.filter((item) => item.id !== id);
    writeLocalDb(db);
    return { ok: true as const };
  }
}
