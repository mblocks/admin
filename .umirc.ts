import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    {
      path: '/apps/:app_id',
      component: '@/layouts/apps',
      routes: [
        { path: '/apps/:app_id', component: '@/pages/apps/item' },
        { path: '/apps/:app_id/roles', component: '@/pages/apps/roles' },
      ],
    },
    { path: '/users/:user_id', component: '@/pages/users/item' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', redirect: '/apps' },
        { path: '/apps', component: '@/pages/apps/index' },
        { path: '/users', component: '@/pages/users/index' },
      ],
    },
  ],
  fastRefresh: {},
});
