import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import viteEnvToWindowPlugin from "./config-env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [viteEnvToWindowPlugin(), react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4001,
  },
  define: {
    "process.env": "{}",
  },
});
