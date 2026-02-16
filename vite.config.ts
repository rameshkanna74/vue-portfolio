import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',

  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
          'ui-vendor': ['@iconify/vue', 'gsap'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    chunkSizeWarningLimit: 500,
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'gsap', '@iconify/vue'],
  },

  server: {
    port: 5173,
  },
})
