<template>
  <ul class="text-primary-950 bg-primary-100 flex-grow flex flex-col justify-center w-full
  md:text-lg md:justify-start">
    <li v-for="item in catalog" :key="item.title" class="mb-4 font-bold">
      <RouterLink :to="`/admin/${item.path}`" class="block text-center py-3 rounded-md
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300 mx-2
      md:pl-7 md:text-left"
      @click="$emit('close-menu')">
        <i :class="`bi ${item.icon} me-4`"></i>{{ item.title }}
      </RouterLink>
    </li>
    <li class="font-bold mt-2 md:mt-auto">
      <a class="block text-center cursor-pointer py-3 rounded-md text-primary-700
      border-l-8 border-transparent transition-color duration-300
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md
      md:pl-7 md:mx-2 md:text-left"
      @click="logout">
      <i class="bi bi-door-open-fill me-4"></i>登出
      </a>
    </li>
  </ul>
</template>

<style scoped>
.active {
  @apply bg-primary-800 text-primary-200 shadow-md pointer-events-none
}

@screen md {
  .active {
    @apply mx-0 pl-7 rounded-none border-l-8 bg-primary-100 border-primary-700 text-primary-700
    shadow-none pointer-events-none
  }
}
</style>

<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isMenuOpen: false,
      catalog: [{ title: '產品', path: 'products', icon: 'bi-bag-fill' }, { title: '優惠券', path: 'coupons', icon: 'bi-ticket-perforated-fill' }, { title: '訂單', path: 'orders', icon: 'bi-stickies-fill' }, { title: '文章', path: 'articles', icon: 'bi-file-richtext-fill' }],
    };
  },
  methods: {
    async logout() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/logout`;
        await this.$http.post(url);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";';
        this.$router.push('/login');
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        this.$swal('登出失敗，請再試一次');
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
};
</script>
