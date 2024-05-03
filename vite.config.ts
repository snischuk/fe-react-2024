import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    base: '/fe-react-2024/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@icons": path.resolve(__dirname, "./src/assets/images/icons"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      },
    },
});
