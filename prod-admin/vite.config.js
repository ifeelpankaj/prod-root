import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: ['cabservice-admin.4biddencoder.tech', 'localhost', '127.0.0.1'],
        port: 4174 // or 4174 for admin app
    }
});
