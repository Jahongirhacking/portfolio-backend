import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"), // Map "@" to the "src" directory
    },
  },
  build: {
    outDir: "../server/dist",
  },
});
