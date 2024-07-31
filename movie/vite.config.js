// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify the port here
  },
  resolve: {
    alias: {
      'swiper/css': 'swiper/swiper-bundle.css',
    },
  },
});
