import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), {
    name: "pages-deep-link-fallback",
    closeBundle() {
      const outputDir = path.resolve(import.meta.dirname, "dist");
      fs.copyFileSync(path.join(outputDir, "index.html"), path.join(outputDir, "404.html"));
    },
  }],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
