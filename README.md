# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```


## Local dev
Create `.umirc.local.ts` as below

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
  },
});

```
