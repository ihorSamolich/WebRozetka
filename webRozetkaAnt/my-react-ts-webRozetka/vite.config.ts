import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components : '/src/components',
      hooks : '/src/hooks',
      interfaces : '/src/interfaces',
      utils : '/src/utils',
      store : '/src/store',
      views : '/src/views',
      assets : '/src/assets',
      constants : '/src/constants',
    },
  },
});

