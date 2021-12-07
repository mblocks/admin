import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
  },
});
