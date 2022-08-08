import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    legacy(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
