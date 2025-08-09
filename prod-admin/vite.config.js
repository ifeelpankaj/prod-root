import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: ['4biddencoder.tech', 'www.4biddencoder.tech', 'admin.4biddencoder.tech'],
        port: 4174 // or 4174 for admin app
    }
});
