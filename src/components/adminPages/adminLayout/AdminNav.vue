<template>
  <ul
    class="flex w-full flex-grow flex-col justify-center bg-primary-100 text-primary-950
      md:justify-start md:text-lg"
  >
    <li v-for="item in catalog" :key="item.title" class="mb-4 font-bold">
      <RouterLink
        :to="`/admin/${item.path}`"
        class="mx-2 block rounded-md py-3 text-center duration-300 hover:bg-primary-800
          hover:text-primary-200 hover:shadow-md md:pl-7 md:text-left"
        @click="$emit('close-menu')"
      >
        <i :class="`bi ${item.icon} me-4`"></i>{{ item.title }}
      </RouterLink>
    </li>
    <li class="mt-2 font-bold md:mt-auto">
      <a
        class="transition-color block cursor-pointer rounded-md border-l-8 border-transparent py-3
          text-center text-primary-700 duration-300 hover:bg-primary-800 hover:text-primary-200
          hover:shadow-md md:mx-2 md:pl-7 md:text-left"
        @click="logout"
      >
        <i class="bi bi-door-open-fill me-4"></i>登出
      </a>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isMenuOpen: false,
      catalog: [
        { title: '產品', path: 'products', icon: 'bi-bag-fill' },
        { title: '優惠券', path: 'coupons', icon: 'bi-ticket-perforated-fill' },
        { title: '訂單', path: 'orders', icon: 'bi-stickies-fill' },
        { title: '文章', path: 'articles', icon: 'bi-file-richtext-fill' },
      ],
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

<style scoped>
.active {
  @apply pointer-events-none bg-primary-800 text-primary-200 shadow-md;
}

@screen md {
  .active {
    @apply pointer-events-none mx-0 rounded-none border-l-8 border-primary-700 bg-primary-100 pl-7
    text-primary-700 shadow-none;
  }
}
</style>
