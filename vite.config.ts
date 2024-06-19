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
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@helpers": path.resolve(__dirname, "./src/helpers"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@icons": path.resolve(__dirname, "./src/assets/images/icons"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@services": path.resolve(__dirname, "./src/services"),
      },
    },
});
