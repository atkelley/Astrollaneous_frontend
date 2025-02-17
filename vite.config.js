import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cesium from "vite-plugin-cesium-build";

export default defineConfig({
  build: {
    target: "es2022"
  },
  esbuild: {
    target: "es2022"
  },
  optimizeDeps:{
    esbuildOptions: {
      target: "es2022",
    }
  },
  plugins: [react(), cesium()],
})