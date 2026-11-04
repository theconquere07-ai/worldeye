import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
    allowedHosts: ['3002-i3wq5f3ew7pyhhfn5pmoq-77a2c1b4.sg2.manus.computer']
  }
});
