import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Env from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Env("all")],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
