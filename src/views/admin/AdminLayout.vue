<template>
  <MyLoading></MyLoading>
  <div class="md:flex h-dvh bg-primary-50">
    <!-- 桌機版 sidebar -->
    <div class="hidden md:flex flex-col w-1/5 max-w-72 bg-primary-100 py-8
     border-r-2 border-primary-200/20">
    <LogoComponent class="mb-8 text-4xl"/>
    <AdminNav/>
    </div>
    <!-- 手機版 sidebar -->
    <div class="fixed top-0 md:hidden backdrop-brightness-75
    w-full" :class="{'h-full':isMenuOpen}">
      <div class="bg-primary-100 border-b-2 border-primary-300/50">
        <div class="container flex justify-between items-center">
          <LogoComponent class="text-2xl"/>
          <button type="button" class="btn btn-link p-2 my-2 -mr-2 text-primary-950"
          @click="toggleMenu">
            <i class="bi text-4xl" :class="`${isMenuOpen?'bi-x':'bi-list'}`"></i>
          </button>
        </div>
      </div>
      <!-- menu -->
      <TransitionAccordion>
        <div v-if="isMenuOpen" class="bg-primary-100 overflow-y-hidden h-[424px]">
          <div class="container py-6">
            <AdminNav
            @close-menu="closeMenu">
            </AdminNav>
          </div>
        </div>
      </TransitionAccordion>

    </div>
    <!-- 內容 -->
    <div class="mt-[74px] md:flex-grow md:mt-0">
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
    LogoComponent, TransitionAccordion, AdminNav, MyLoading,
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
