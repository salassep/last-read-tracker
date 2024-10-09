import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        background: 'src/background.ts',
        content: 'src/content.ts',
        pdfViewer: 'src/pdf-viewer.tsx',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
