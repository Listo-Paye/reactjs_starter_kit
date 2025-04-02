import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            '@core': '/src/core',
            '@data': '/src/data',
            '@domain': '/src/domain',
            '@presentation': '/src/presentation',
        }
    },
    server: {
        watch: {
            usePolling: true
        },
        host: true,
        allowedHosts: true
    }
})
