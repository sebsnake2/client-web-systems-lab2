import { defineConfig } from 'vite';

export default defineConfig({
  base: '/client-web-systems-lab2/',

  server: {
    port: 9000,
    open: true,
  },

  preview: {
    port: 9000,
    open: true,
  },
});
