// vite.config.ts
import { defineConfig } from "file:///C:/Users/kawan/Projects/outros/zahir-website-react/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kawan/Projects/outros/zahir-website-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/kawan/Projects/outros/zahir-website-react/node_modules/vite-plugin-svgr/dist/index.js";
import mkcert from "file:///C:/Users/kawan/Projects/outros/zahir-website-react/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { VitePWA } from "file:///C:/Users/kawan/Projects/outros/zahir-website-react/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "prompt",
      injectRegister: false,
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"]
      },
      pwaAssets: {
        disabled: false,
        config: true
      },
      manifest: {
        name: "sitedozahir",
        short_name: "zahir",
        theme_color: "#6c46cb",
        background_color: "#f4f0ff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/"
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    }),
    mkcert(),
    svgr({
      svgrOptions: {
        dimensions: false,
        prettier: true,
        expandProps: "end"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrYXdhblxcXFxQcm9qZWN0c1xcXFxvdXRyb3NcXFxcemFoaXItd2Vic2l0ZS1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca2F3YW5cXFxcUHJvamVjdHNcXFxcb3V0cm9zXFxcXHphaGlyLXdlYnNpdGUtcmVhY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2thd2FuL1Byb2plY3RzL291dHJvcy96YWhpci13ZWJzaXRlLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJ1xyXG5pbXBvcnQgbWtjZXJ0IGZyb20gXCJ2aXRlLXBsdWdpbi1ta2NlcnRcIjtcclxuXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgc3RyYXRlZ2llczogJ2luamVjdE1hbmlmZXN0JyxcclxuICAgICAgc3JjRGlyOiAnc3JjJyxcclxuICAgICAgZmlsZW5hbWU6ICdzdy50cycsXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXHJcbiAgICAgIGluamVjdFJlZ2lzdGVyOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgaW5qZWN0TWFuaWZlc3Q6IHtcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsc3ZnLHBuZyxpY299J10sXHJcbiAgICAgIH0sXHJcblxyXG5cclxuICAgICAgcHdhQXNzZXRzOiB7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgfSxcclxuXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ3NpdGVkb3phaGlyJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnemFoaXInLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzZjNDZjYicsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmNGYwZmYnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0JyxcclxuICAgICAgICBzY29wZTogJy8nLFxyXG4gICAgICAgIHN0YXJ0X3VybDogJy8nLFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcclxuICAgICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICxcclxuICAgIG1rY2VydCgpLFxyXG4gICAgc3Zncih7XHJcbiAgICAgIHN2Z3JPcHRpb25zOiB7XHJcbiAgICAgICAgZGltZW5zaW9uczogZmFsc2UsXHJcbiAgICAgICAgcHJldHRpZXI6IHRydWUsXHJcbiAgICAgICAgZXhwYW5kUHJvcHM6IFwiZW5kXCJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsb0JBQW9CO0FBQ2pYLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBRW5CLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUloQixnQkFBZ0I7QUFBQSxRQUNkLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxNQUNqRDtBQUFBLE1BR0EsV0FBVztBQUFBLFFBQ1QsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUVBLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFFQSxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixrQkFBa0I7QUFBQSxRQUNsQixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBRUQsT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLE1BQ0gsYUFBYTtBQUFBLFFBQ1gsWUFBWTtBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
