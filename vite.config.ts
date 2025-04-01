import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './environment',
  server: {
    host: '0.0.0.0', // Allow connections from any host
    allowedHosts: ['candidate-search-kx1t.onrender.com'], // Allow connections from this host
    port: Number(process.env.PORT) || 5173, // Convert process.env.PORT to a number, fallback to 5173 if undefined or invalid
  },
});
