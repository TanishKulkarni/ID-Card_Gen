import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env': {
        BASE_URL: env.BASE_URL,
      },
    },
    plugins: [
      react(),
      NodeGlobalsPolyfillPlugin({
        buffer: true,
      }),
    ],
    resolve: {
      alias: {
        stream: 'stream-browserify',
      },
    },
  };
});