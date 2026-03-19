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

    if (contentType.includes("application/json")) {
      let parsedMessage = "";
      try {
        parsedMessage = (JSON.parse(text) as { message?: string }).message ?? "";
      } catch {
        parsedMessage = "";
      }
      throw new Error(parsedMessage || text || "Request failed.");
    }

    if (response.status === 404) {
      throw new Error("The local app server API was not found. Run the site with npm run dev or npm run start.");
    }

    throw new Error(text || "Request failed.");
  }

  return response.json() as Promise<T>;
}

export function loginUser(payload: { email: string; password: string }) {
  return requestJson<AuthUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function signupUser(payload: { name: string; email: string; password: string }) {
  return requestJson<AuthUser>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getReviews() {
  return requestJson<ReviewItem[]>("/api/reviews");
}

export function createReview(payload: { name: string; role: string; rating: number; quote: string }) {
  return requestJson<ReviewItem>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createReservation(payload: Omit<ReservationItem, "id" | "status" | "createdAt">) {
  return requestJson<ReservationItem>("/api/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAdminDashboard() {
  return requestJson<{ reservations: ReservationItem[]; reviews: ReviewItem[] }>("/api/admin/dashboard");
}

export function updateReservationStatus(id: string, status: string) {
  return requestJson<ReservationItem>(`/api/admin/reservations/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteReview(id: string) {
  return requestJson<{ ok: true }>(`/api/admin/reviews/${id}`, {
    method: "DELETE",
  });
}
