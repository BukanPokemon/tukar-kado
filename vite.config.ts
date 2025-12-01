import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tukar-kado/', // <-- updated repo name
  plugins: [react()],
})
