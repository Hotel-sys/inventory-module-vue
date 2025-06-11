import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from '@tailwindcss/vite'


// import {} from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // css: {
  //   postcss: {
  //     plugins: [autoprefixer()],
  //   },
  // },
  base: "/",
  resolve: {
    alias: {
      // Set alias for Vue to support Vue 2 compatibility mode
      // vue: "@vue/compat",
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  build: {
    sourcemap: false, // Disable source maps in production
    rollupOptions: {
      output: {
        manualChunks: {
          // You can set manual chunks here if you need
        },
      },
    },
  },
  server: {
    open: true, // Automatically open the app in the browser
    port: 5173, // Set to preferred port
    strictPort: true,
    // proxy: {
    //   "/api": {
    //     target: process.env.VITE_BASE_URL,
    //   },
    // },
  },

  // Optional: Integrate Vite Bundle Analyzer Plugin for analyzing build
  // If you want to use `webpackBundleAnalyzer`, switch to `rollup-plugin-visualizer`
  // Uncomment and install `rollup-plugin-visualizer` if you want similar functionality.
  // plugins: [
  //   vue(),
  //   visualizer({ open: true }), // Shows analysis in the browser
  // ],
});
