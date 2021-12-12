import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/apps' },
    {
      path: '/apps/:id/roles/:role_id',
      component: '@/layouts/app',
      routes: [
        {
          path: '/apps/:id/roles/:role_id',
          component: '@/pages/apps/roles/item',
        },
      ],
    },
    {
      path: '/apps/:id',
      component: '@/layouts/app',
      routes: [
        { path: '/apps/:id', component: '@/pages/apps/item' },
        { path: '/apps/:id/roles', component: '@/pages/apps/roles' },
      ],
    },
    {
      path: '/users/:id',
      component: '@/layouts/user',
      routes: [{ path: '/users/:id', component: '@/pages/users/item' }],
    },
    {
      path: '/apps',
      component: '@/layouts/index',
      routes: [{ path: '/apps', component: '@/pages/apps' }],
    },
    {
      path: '/users',
      component: '@/layouts/index',
      routes: [{ path: '/users', component: '@/pages/users' }],
    },
  ],
  fastRefresh: {},
});
