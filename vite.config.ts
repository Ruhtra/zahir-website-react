import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import mkcert from "vite-plugin-mkcert";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      injectRegister: false,



      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },


      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'sitedozahir',
        short_name: 'zahir',
        theme_color: '#6c46cb',
        background_color: '#f4f0ff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
    ,
    mkcert(),
    svgr({
      svgrOptions: {
        dimensions: false,
        prettier: true,
        expandProps: "end"
      }
    })
  ],
})
