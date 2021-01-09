import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue()],
  alias: [
    { find: /^~/, replacement: path.resolve(__dirname, 'src') }
  ],
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
    exclude: [
      'firebase'
    ]
  }
})
