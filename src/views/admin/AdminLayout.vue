<template>
  <MyLoading></MyLoading>
  <div class="h-dvh bg-primary-50 md:flex">
    <!-- 桌機版 sidebar -->
    <div
      class="hidden w-1/5 max-w-72 flex-col border-r-2 border-primary-200/20 bg-primary-100 py-8
        md:flex"
    >
      <LogoComponent class="mb-8 text-4xl" />
      <AdminNav />
    </div>
    <!-- 手機版 sidebar -->
    <div
      class="fixed top-0 w-full backdrop-brightness-75 md:hidden"
      :class="{ 'h-full': isMenuOpen }"
    >
      <div class="border-b-2 border-primary-300/50 bg-primary-100">
        <div class="container flex items-center justify-between">
          <LogoComponent class="text-2xl" />
          <button
            type="button"
            class="btn btn-link my-2 -mr-2 p-2 text-primary-950"
            @click="toggleMenu"
          >
            <i class="bi text-4xl" :class="`${isMenuOpen ? 'bi-x' : 'bi-list'}`"></i>
          </button>
        </div>
      </div>
      <!-- menu -->
      <TransitionAccordion>
        <div v-if="isMenuOpen" class="h-[424px] overflow-y-hidden bg-primary-100">
          <div class="container py-6">
            <AdminNav @close-menu="closeMenu"> </AdminNav>
          </div>
        </div>
      </TransitionAccordion>
    </div>
    <!-- 內容 -->
    <div class="mt-[74px] md:mt-0 md:flex-grow">
      <div class="container py-8">
        <RouterView v-if="checkSuccess" />
      </div>
    </div>
  </div>
</template>

<script>
import TransitionAccordion from '@/components/shared/transition/TransitionAccordion.vue';
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import scrollStore from '@/stores/scrollStore';
import AdminNav from '@/components/adminPages/adminLayout/AdminNav.vue';
import LogoComponent from '@/components/shared/logo/LogoComponent.vue';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false,
      isMenuOpen: false,
    };
  },
  components: {
    LogoComponent,
    TransitionAccordion,
    AdminNav,
    MyLoading,
  },
  mounted() {
    const jiayuToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    this.$http.defaults.headers.common.Authorization = jiayuToken;
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      this.showLoading();
      try {
        const url = `${VITE_URL}/api/user/check`;
        await this.$http.post(url);
        this.checkSuccess = true;
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        await this.$swal('請再登入一次');
        this.$router.push('/login');
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(scrollStore, ['getCurrentScroll', 'disableScroll', 'enableScroll']),
  },
  watch: {
    isMenuOpen() {
      if (this.isMenuOpen) {
        this.getCurrentScroll();
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
  },
};
</script>
