import { addReservation, addReview, getDashboard, listReviews, removeReview, updateReservation } from "./db.mjs";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  sendJson(res, 404, { message: "Not found" });
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) {
    return {};
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function handleApiRequest(req, res) {
  const url = new URL(req.url || "/", "http://localhost");
  const { pathname } = url;

  if (!pathname.startsWith("/api/")) {
    return false;
  }

  try {
    if (pathname === "/api/reviews" && req.method === "GET") {
      sendJson(res, 200, listReviews());
      return true;
    }

    if (pathname === "/api/reviews" && req.method === "POST") {
      const body = await readBody(req);
      if (!body.name || !body.quote || !body.rating) {
        sendJson(res, 400, { message: "Name, rating, and review message are required." });
        return true;
      }
      sendJson(res, 201, addReview(body));
      return true;
    }

    if (pathname === "/api/reservations" && req.method === "POST") {
      const body = await readBody(req);
      if (!body.fullName || !body.phone || !body.email || !body.date || !body.time) {
        sendJson(res, 400, { message: "Please complete the reservation form before submitting." });
        return true;
      }
      sendJson(res, 201, addReservation(body));
      return true;
    }

    if (pathname === "/api/admin/dashboard" && req.method === "GET") {
      sendJson(res, 200, getDashboard());
      return true;
    }

    if (pathname.startsWith("/api/admin/reservations/") && req.method === "PATCH") {
      const id = pathname.split("/").pop();
      const body = await readBody(req);
      const updated = updateReservation(id, body.status);
      if (!updated) {
        notFound(res);
        return true;
      }
      sendJson(res, 200, updated);
      return true;
    }

    if (pathname.startsWith("/api/admin/reviews/") && req.method === "DELETE") {
      const id = pathname.split("/").pop();
      removeReview(id);
      sendJson(res, 200, { ok: true });
      return true;
    }

    notFound(res);
    return true;
  } catch (error) {
    sendJson(res, 500, { message: error instanceof Error ? error.message : "Unexpected server error." });
    return true;
  }
}
