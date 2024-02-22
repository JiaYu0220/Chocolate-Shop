<template>
  <div class="md:flex h-dvh">
    <!-- 桌機版 sidebar -->
    <div class="hidden md:flex flex-col w-1/5 max-w-72 bg-primary-100 py-8
     border-r-2 border-primary-200/20">
      <h1 class="font-zenMaru text-3xl text-primary-800 text-center mb-8">歐可可</h1>
      <ul class="text-primary-950 text-lg flex-grow flex flex-col">
        <li class="mb-4 font-bold">
          <RouterLink to="/admin/dashboard" class="block pl-7 py-3 mx-2 rounded-md
          hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300">
            <i class="bi bi-clipboard-data-fill me-4"></i>總覽
          </RouterLink>
        </li>
        <li class="mb-4 font-bold">
          <RouterLink to="/admin/products" class="block pl-7 py-3 mx-2 rounded-md
          hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300">
            <i class="bi bi-bag-fill me-4"></i>產品
          </RouterLink>
        </li>
        <li class="mb-4 font-bold">
          <RouterLink to="/admin/orders" class="block pl-7 py-3 mx-2 rounded-md
          hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300">
            <i class="bi bi-stickies-fill me-4"></i>訂單
          </RouterLink>
        </li>
        <li class="mb-4 font-bold">
          <RouterLink to="/admin/articles" class="block pl-7 py-3 mx-2 rounded-md
          hover:bg-primary-800 hover:text-primary-200 hover:shadow-md duration-300">
            <i class="bi bi-file-richtext-fill me-4"></i>文章
          </RouterLink>
        </li>
        <li class="font-bold mt-auto">
          <a class="block cursor-pointer py-3 pl-7 mx-2 rounded-md duration-300
          hover:bg-primary-800 hover:text-primary-200 hover:shadow-md"
          @click="logout">
          <i class="bi bi-caret-left-square-fill me-4"></i>登出
          </a>
        </li>
      </ul>
    </div>
    <!-- 手機版 sidebar -->
    <div class="bg-primary-100 relative md:hidden">
      <div class="container flex justify-between items-center border-b-2 border-b-primary-50">
        <h1 class="font-zenMaru text-2xl text-primary-950 text-center">歐可可</h1>
        <button type="button" class="btn btn-link p-2 my-2 -mr-2 text-primary-950"
        @click="isMenuOpen = !isMenuOpen">
          <i class="bi text-4xl" :class="`${isMenuOpen?'bi-x':'bi-list'}`"></i>
        </button>
      </div>
      <!-- menu -->
      <TransitionAccordion>
        <ul v-if="isMenuOpen"
        class="absolute bg-primary-100 w-full text-primary-950 flex-grow
        flex flex-col justify-center overflow-y-hidden h-[376px]">
          <li class="mb-4 font-bold">
            <RouterLink to="/admin/dashboard" class="block text-center py-3 mx-2 rounded-md"
            @click="isMenuOpen = false">
              <i class="bi bi-clipboard-data-fill me-4"></i>總覽
            </RouterLink>
          </li>
          <li class="mb-4 font-bold">
            <RouterLink to="/admin/products" class="block text-center py-3 mx-2 rounded-md"
            @click="isMenuOpen = false">
              <i class="bi bi-bag-fill me-4"></i>產品
            </RouterLink>
          </li>
          <li class="mb-4 font-bold">
            <RouterLink to="/admin/orders" class="block text-center py-3 mx-2 rounded-md"
            @click="isMenuOpen = false">
              <i class="bi bi-stickies-fill me-4"></i>訂單
            </RouterLink>
          </li>
          <li class="mb-4 font-bold">
            <RouterLink to="/admin/articles" class="block text-center py-3 mx-2 rounded-md"
            @click="isMenuOpen = false">
              <i class="bi bi-file-richtext-fill me-4"></i>文章
            </RouterLink>
          </li>
          <li class="font-bold mt-2">
            <a class="block py-3 text-center rounded-md cursor-pointer" @click="logout">
              <i class="bi bi-caret-left-square-fill me-4"></i>登出
            </a>
          </li>
        </ul>
      </TransitionAccordion>

    </div>
    <!-- 內容 -->
    <div class="md:flex-grow bg-primary-50">
      <RouterView v-if="checkSuccess" />
    </div>
  </div>
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
import TransitionAccordion from '@/components/shared/transition/TransitionAccordion.vue';
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false,
      isMenuOpen: false,
    };
  },
  components: {
    TransitionAccordion,
  },
  mounted() {
    const jiayuToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    this.$http.defaults.headers.common.Authorization = jiayuToken;
    this.checkout();
  },
  methods: {
    async checkout() {
      try {
        const url = `${VITE_URL}/api/user/check`;
        await this.$http.post(url);
        this.checkSuccess = true;
      } catch (error) {
        this.$swal('請再登入一次');
        this.$router.push('/login');
      }
    },
    async logout() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/logout`;
        await this.$http.post(url);
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
