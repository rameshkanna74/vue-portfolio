import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-portfolio/',
  plugins: [
    vue(),
    
    // Gzip compression for better load times
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
      deleteOriginFile: false,
    }),
    
    // Brotli compression (better than gzip, ~20% smaller)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    
    // Bundle analyzer - generates stats.html after build
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // Visual bundle size analysis
    }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  build: {
    outDir: '.portfolio-project/backend/static',
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'esnext',
    
    // Faster minification with esbuild
    minify: 'esbuild',
    
    // Don't report compressed size (faster builds)
    reportCompressedSize: false,
    
    // Stricter chunk size warnings
    chunkSizeWarningLimit: 150,
    
    rollupOptions: {
      output: {
        // Optimized code splitting with GSAP plugins separated
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vendor-vue';
            }
            if (id.includes('gsap')) {
              // Split GSAP plugins into separate chunks
              if (id.includes('ScrollTrigger')) {
                return 'vendor-gsap-scrolltrigger';
              }
              return 'vendor-gsap-core';
            }
            if (id.includes('vue-i18n')) {
              return 'vendor-i18n';
            }
            if (id.includes('@iconify')) {
              return 'vendor-iconify';
            }
            // Other node_modules
            return 'vendor-other';
          }
          
          // Route-based code splitting
          if (id.includes('/views/')) {
            const match = id.match(/views\/(\w+)\.vue/);
            if (match) {
              return `page-${match[1].toLowerCase()}`;
            }
          }
        },
        
        // Organized asset output
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
      
      // Aggressive tree-shaking
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
      },
    },
    
    // CSS optimization
    cssCodeSplit: true,
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'gsap', '@vueuse/core'],
    exclude: ['@iconify/vue'], // Load icons on-demand
  },
  
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
