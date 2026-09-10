import { defineConfig } from "@playwright/test";

const APP_URL = process.env.APP_URL ?? "http://localhost:5173";
const API_URL =
   process.env.API_URL ??
   process.env.VITE_API_URL ??
   "http://localhost:3001/api/equipment";

function isLocalUrl(url: string) {
   const { hostname } = new URL(url);
   return hostname === "localhost" || hostname === "127.0.0.1";
}

const startLocalServers = isLocalUrl(APP_URL) && isLocalUrl(API_URL);

export default defineConfig<{ apiURL: string }>({
   testDir: "./e2e",
   use: {
      baseURL: APP_URL,
      apiURL: API_URL,
   },
   webServer: startLocalServers
      ? [
           {
              command: "npm start",
              cwd: "../backend",
              url: API_URL,
              reuseExistingServer: !process.env.CI,
              timeout: 60_000,
           },
           {
              command: "npm run dev -- --host 0.0.0.0",
              url: APP_URL,
              reuseExistingServer: !process.env.CI,
              timeout: 60_000,
           },
        ]
      : undefined,
});
