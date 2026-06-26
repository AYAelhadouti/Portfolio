// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Change 'azur-yachts' to the EXACT name of your GitHub repo for deployment
  base: '/ecommerce/',
  plugins: [react()],
})
