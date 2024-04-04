import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  linkExactActiveClass: 'active',
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
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/user/AboutView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/user/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/user/ProductInfo.vue'),
          props: (route) => ({
            id: route.params.id,
          }),
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../views/user/FavoriteProduct.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/user/CartView.vue'),
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('../views/user/ArticlesView.vue'),
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/user/ArticleInfo.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: () => import('../views/NotFound.vue'),
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
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: () => import('../views/admin/AdminCoupons.vue'),
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
