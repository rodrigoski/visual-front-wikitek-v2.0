import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Puerto deseado
    strictPort: true, // Evita que Vite elija otro puerto si 5173 está ocupado
  },
});
