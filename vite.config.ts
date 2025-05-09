import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
  optimizeDeps: {
    exclude: ['@dqbd/tiktoken']
  },
  build: {
    chunkSizeWarningLimit: 1200, // Set back to default
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Use function form as recommended by Vite
        manualChunks: (id) => {
          // React and related packages
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          
          // Stripe related
          if (id.includes('node_modules/@stripe/')) {
            return 'vendor-stripe';
          }
          
          // CSV parsing
          if (id.includes('node_modules/papaparse')) {
            return 'vendor-papaparse';
          }
          
          // Tokenizer
          if (id.includes('node_modules/@dqbd/tiktoken')) {
            return 'vendor-tiktoken';
          }
          
          // Split app code by feature
          if (id.includes('/src/components/')) {
            return 'app-components';
          }
          
          if (id.includes('/src/hooks/')) {
            return 'app-hooks';
          }
          
          if (id.includes('/src/utils/')) {
            return 'app-utils';
          }
        },
        // Organize asset files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.mp3')) {
            return 'assets/audio/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.wasm')) {
            return 'assets/wasm/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
