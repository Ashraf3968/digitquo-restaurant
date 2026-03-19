import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { handleApiRequest } from "./api.mjs";

const distDir = resolve(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function serveFile(res, filePath) {
  const ext = extname(filePath);
  res.statusCode = 200;
  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  createReadStream(filePath).pipe(res);
}

createServer(async (req, res) => {
  if (await handleApiRequest(req, res)) {
    return;
  }

  const requestPath = req.url?.split("?")[0] || "/";
  const safePath = normalize(requestPath).replace(/^([.][.][/\\])+/, "");
  const filePath = resolve(join(distDir, safePath === "/" ? "index.html" : safePath));

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    serveFile(res, filePath);
    return;
  }

  serveFile(res, resolve(distDir, "index.html"));
}).listen(port, () => {
  console.log(`Restaurant site running at http://127.0.0.1:${port}`);
});
