import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const pwaPlugin = VitePWA({
  registerType: 'prompt',
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
        src: "/Reactukodus/logo128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/Reactukodus/logo256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/Reactukodus/logo512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    display: "standalone",
    scope: "/Reactukodus",
    start_url: "/Reactukodus",
    theme_color: "#171717",
    background_color: "#000000",
    orientation: "portrait"
  },
  devOptions: {
    enabled: true
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Reactukodus",
  plugins: [
    react(), pwaPlugin
  ],
  envDir: "env"
})
