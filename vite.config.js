import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vercel(), react()],

  build: {
    rollupOptions: {
      external: ["react-quill/dist/quill.snow.css"],
    },
  },

  optimizeDeps: {
    include: ["react-quill"],
  },
});
