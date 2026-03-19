import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error Local Node runtime module used by Vite dev middleware.
import { handleApiRequest } from "./server/api.mjs";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "digitquo-local-api",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const handled = await handleApiRequest(req, res);
          if (!handled) {
            next();
          }
        });
      },
    },
  ],
});
