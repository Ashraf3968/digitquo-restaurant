import { handleApiRoute } from "../server/handlers.mjs";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  const url = new URL(req.url || "/", "https://digitquo.vercel.app");

  try {
    const body =
      req.method === "GET" || req.method === "DELETE"
        ? {}
        : typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};

    const { status, payload } = await handleApiRoute({
      pathname: url.pathname,
      method: req.method || "GET",
      body,
    });

    res.status(status).json(payload);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
}
