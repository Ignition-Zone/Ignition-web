import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    headers: {
      "Access-Control-Allow-Origin":  "*",
    },
    proxy: {
      "/page-table": {
        target: "http://127.0.0.1:10018/page-table",
        changeOrigin: true,
        rewrite: (path) => path.replace('/page-table', '/')
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
