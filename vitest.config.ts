import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        svgoConfig: {
          plugins: [
            { name: 'removeViewBox' },
            { name: 'removeDimensions' },
            { name: 'prefixIds' },
          ],
        },
      },
    }),
  ],
  test: {
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    // },
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './'),
    },
  },
})
