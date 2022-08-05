import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue(), monacoEditorPlugin.default({})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
