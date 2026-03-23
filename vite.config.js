import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/SandCloud/',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
