<template>
  <ul class="text-primary-950 bg-primary-100 flex-grow flex flex-col justify-center w-full
  md:text-lg md:justify-start" :class="ulClass">
    <li class="mb-4 font-bold">
      <RouterLink to="/admin/dashboard" class="block text-center py-3 mx-2 rounded-md
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300
      md:pl-7 md:text-left"
      @click="$emit('close-menu')">
        <i class="bi bi-clipboard-data-fill me-4"></i>總覽
      </RouterLink>
    </li>
    <li class="mb-4 font-bold">
      <RouterLink to="/admin/products" class="block text-center py-3 mx-2 rounded-md
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300
      md:pl-7 md:text-left"
      @click="$emit('close-menu')">
        <i class="bi bi-bag-fill me-4"></i>產品
      </RouterLink>
    </li>
    <li class="mb-4 font-bold">
      <RouterLink to="/admin/orders" class="block text-center py-3 mx-2 rounded-md
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300
      md:pl-7 md:text-left"
      @click="$emit('close-menu')">
        <i class="bi bi-stickies-fill me-4"></i>訂單
      </RouterLink>
    </li>
    <li class="mb-4 font-bold">
      <RouterLink to="/admin/articles" class="block text-center py-3 mx-2 rounded-md
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300
      md:pl-7 md:text-left"
      @click="$emit('close-menu')">
        <i class="bi bi-file-richtext-fill me-4"></i>文章
      </RouterLink>
    </li>
    <li class="font-bold mt-2 md:mt-auto">
      <a class="block text-center cursor-pointer py-3 rounded-md duration-300
      hover:bg-primary-800 hover:text-primary-200 hover:shadow-md
      md:pl-7 md:mx-2 md:text-left"
      @click="logout">
      <i class="bi bi-door-open-fill me-4"></i>登出
      </a>
    </li>
  </ul>
</template>

<style>
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
    };
  },
  props: ['ulClass'],
  methods: {
    async logout() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/logout`;
        await this.$http.post(url);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";';
        this.$router.push('/login');
      } catch (error) {
        this.$swal('登出失敗，請再試一次');
      } finally {
        this.hideLoading();
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
};
</script>
