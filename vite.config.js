import { defineConfig } from 'vite'
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue'
import babel from 'vite-plugin-babel';
import liveReload from 'vite-plugin-live-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy';
const fs = require('fs');

export default defineConfig({
  root: './',
  base: './',
  publicDir: './assets/build',
  server: {
    // required to load scripts from custom host
    cors: true,
    strictPort: true,
    port: 3000,
    hmr: {
      port: 3000,
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    outDir: resolve(__dirname, './'),
    emptyOutDir: false,
    manifest: true,
  },
  resolve: {
    alias: {
      '@': './assets/js'
    }
  },
  plugins: [
    babel(),
    vue(),
    legacy({
      targets: ['defaults']
    }),
//    viteStaticCopy({
//      targets: [
//        {
//          src: './assets/svg',
//          dest: '../'
//        }
//      ]
//    }),
    liveReload([
      `**/*\.hbs`,
      `**/*\.html`
    ]),
  ]
});
