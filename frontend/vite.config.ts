import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default (conf: any) => {
  return defineConfig({
    server: {
      host: "0.0.0.0",
      hmr: {
        clientPort: 3308,
      },
      port: 3308,
      watch: {
        usePolling: true,
      },
    },
  });
};
