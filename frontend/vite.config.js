import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://backend:8000",
      "/cast": "http://backend:8000",
      "/posters": "http://backend:8000",
      "/movies": {
        target: "http://backend:8000",
        changeOrigin: true,
        rewrite: (path) => {
          // Handle movie posters and cast paths
          return path
            .replace(/^\/movies\/(?:posters|cast)/, "") // Remove /movies prefix for direct resources
            .replace(/^\/movies\/\d+\/(cast|posters)(\/?)/, "/$1$2")
            .replace(/^\/movies\/?/, "")
            .replace(/^\/movies\/\d+\/cast\/posters/, "/posters"); // Handle nested cast/posters
        },
      },

      // Consolidated user-related paths
      "/user": {
        target: "http://backend:8000",
        changeOrigin: true,
        rewrite: (path) =>
          path
            .replace(/^\/user\/\d+\/posters/, "/posters")
            .replace(/^\/user\/?/, ""), // Remove /user prefix
      },
    },
    host: "0.0.0.0",
    port: 3000,
  },
});
