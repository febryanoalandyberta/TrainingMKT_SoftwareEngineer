import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
    plugins: [basicSsl()],
    server: {
        host: '0.0.0.0', // Listen on all network interfaces
        port: 5173,
        strictPort: true,
        https: true, // Enable HTTPS for camera/geolocation access
        proxy: {
            '/api': {
                target: 'https://localhost:5000',
                changeOrigin: true,
                secure: false, // Allow self-signed certificates from backend
            }
        }
    }
})
