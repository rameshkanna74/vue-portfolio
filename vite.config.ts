import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base:'/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
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
    cssCodeSplit: true,
    sourcemap: false,
    
    rollupOptions: {
      output: {
        // manualChunks removed to rely on Vite default behavior
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    chunkSizeWarningLimit: 1000,
  },

  optimizeDeps: {
    include: ['gsap', '@iconify/react', 'react', 'react-dom', 'react-router-dom', 'zustand', '@iconify/react'],
  },

  server: {
    port: 5173,
  },

})
