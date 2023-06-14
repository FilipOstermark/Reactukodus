import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: [
        "**/*",
      ],
      manifest: {
        name: "Ukodus",
        short_name: "Ukodus",
        description: "A simple sudoku app",
        icons: [
          {
            src: "/vite.svg",
            sizes: "512x512",
            type: "image/svg+xml"
          },
          {
            src: "/37499.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        display: "standalone",
        scope: "/",
        start_url: "/",
        theme_color: "#171717",
        background_color: "#000000",
        orientation: "portrait"
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
