import { handleApiRoute } from "./handlers.mjs";

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
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
    const body = req.method === "GET" || req.method === "DELETE" ? {} : await readBody(req);
    const { status, payload } = await handleApiRoute({
      pathname,
      method: req.method || "GET",
      body,
    });

    sendJson(res, status, payload);
    return true;
  } catch (error) {
    sendJson(res, 500, {
      message: error instanceof Error ? error.message : "Unexpected server error.",
    });
    return true;
  }
}
