import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import path from "path";
import { defineConfig } from "vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
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
    monacoEditorPlugin.default({}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
