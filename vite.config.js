import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@constants': '/src/constants',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
