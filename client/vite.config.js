import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://ai-web-builder-1-8bm9.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
