import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy requests starting with /api to your backend server
//       '/api': {
//         target: 'http://localhost:5000', // Backend server URL
//         changeOrigin: true, // Ensures the host header matches the target
//         rewrite: (path) => path.replace(/^\/api/, '/api') // Keep the same path
//       }
//     }
//   }
// })
