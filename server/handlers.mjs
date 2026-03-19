import {
  addReservation,
  addReview,
  authenticateUser,
  createUser,
  getDashboard,
  listReviews,
  removeReview,
  removeUser,
  updateReservation,
  updateUserStatus,
} from "./db.mjs";

function makeResponse(status, payload) {
  return { status, payload };
}

export async function handleApiRoute({ pathname, method, body }) {
  if (pathname === "/api/auth/signup" && method === "POST") {
    if (!body.name || !body.email || !body.password) {
      return makeResponse(400, { message: "Name, email, and password are required to create an account." });
    }

    try {
      return makeResponse(201, await createUser(body));
    } catch (error) {
      return makeResponse(409, { message: error instanceof Error ? error.message : "Could not create account." });
    }
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    if (!body.email || !body.password) {
      return makeResponse(400, { message: "Email and password are required to login." });
    }

    try {
      return makeResponse(200, await authenticateUser(body));
    } catch (error) {
      return makeResponse(401, { message: error instanceof Error ? error.message : "Login failed." });
    }
  }

  if (pathname === "/api/reviews" && method === "GET") {
    return makeResponse(200, await listReviews());
  }

  if (pathname === "/api/reviews" && method === "POST") {
    if (!body.name || !body.quote || !body.rating) {
      return makeResponse(400, { message: "Name, rating, and review message are required." });
    }
    return makeResponse(201, await addReview(body));
  }

  if (pathname === "/api/reservations" && method === "POST") {
    if (!body.fullName || !body.phone || !body.email || !body.date || !body.time) {
      return makeResponse(400, { message: "Please complete the reservation form before submitting." });
    }
    return makeResponse(201, await addReservation(body));
  }

  if (pathname === "/api/admin/dashboard" && method === "GET") {
    return makeResponse(200, await getDashboard());
  }

  if (pathname.startsWith("/api/admin/reservations/") && method === "PATCH") {
    const id = pathname.split("/").pop();
    const updated = await updateReservation(id, body.status);
    if (!updated) {
      return makeResponse(404, { message: "Not found" });
    }
    return makeResponse(200, updated);
  }

  if (pathname.startsWith("/api/admin/users/") && pathname.endsWith("/status") && method === "PATCH") {
    const id = pathname.split("/")[4];
    const updated = await updateUserStatus(id, body.status);
    if (!updated) {
      return makeResponse(404, { message: "Not found" });
    }
    return makeResponse(200, updated);
  }

  if (pathname.startsWith("/api/admin/users/") && method === "DELETE") {
    const id = pathname.split("/").pop();
    await removeUser(id);
    return makeResponse(200, { ok: true });
  }

  if (pathname.startsWith("/api/admin/reviews/") && method === "DELETE") {
    const id = pathname.split("/").pop();
    await removeReview(id);
    return makeResponse(200, { ok: true });
  }

  return makeResponse(404, { message: "Not found" });
}
