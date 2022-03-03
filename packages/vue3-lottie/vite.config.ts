import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('lottie-player'),
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-lottie',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', 'lottie-web', '@lottiefiles/lottie-player'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'lottie-web': 'Lottie',
          '@lottiefiles/lottie-player': 'LottiePlayer',
        },
      },
    },
  },
  define: {
    VERSION: JSON.stringify(require('./package.json').version),
  },
})
