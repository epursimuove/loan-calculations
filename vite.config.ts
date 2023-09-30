import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  base: "./",

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  define: {
    // "__APP_NAME__": JSON.stringify(process.env.npm_package_name),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
