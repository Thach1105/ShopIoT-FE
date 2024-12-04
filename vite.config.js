import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  // build: {
  //   outDir: "dist",
  // },
  build: {
    rollupOptions: {
      external: ["react-quill/dist/quill.snow.css"],
    },
  },

  optimizeDeps: {
    include: ["react-quill"],
  },
});
