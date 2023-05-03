import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'tsx',
  },
  server: { host: 'localhost', port: 3000 },
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, './src/components'),
      '@Constants': path.resolve(__dirname, './src/constants'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
