import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`,
        },
    },
    server: {
        host: true,
        port: 5173,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
            },
            '/auth/google': {
                target: 'http://localhost:5000',
            },
        },
    },
});
