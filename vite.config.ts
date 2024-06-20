/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    test: {
      include: ["**/*.test.ts"],
    },
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
  };
});
