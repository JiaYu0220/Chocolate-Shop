import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
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
          path: 'dashboard',
          name: 'adminDashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
        },
        {
          path: 'products',
          name: 'adminProducts',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
        {
          path: 'articles',
          name: 'adminArticles',
          component: () => import('../views/admin/AdminArticles.vue'),
        },
      ],
    },
  ],
});

export default router;
