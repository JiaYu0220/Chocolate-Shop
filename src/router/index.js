import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: () => import('../views/user/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/user/HomeView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AdminLogin.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'products',
          name: 'adminProducts',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
      ],
    },
  ],
});

export default router;
