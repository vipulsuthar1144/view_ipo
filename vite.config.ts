import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const FRONTEND_PORT = process.env.VITE_APP_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(FRONTEND_PORT) || 1818,
    host: "localhost",
  },
});
