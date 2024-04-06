import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  esbuild: {
    logLevel: 'debug'
  },
  plugins: [vue()],
  build: {
    
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'MultiVideoPlayer',
      fileName: (format) => `sync-video-player.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: { 
      input: {
        main: './index.html',
      },
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
