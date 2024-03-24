<template>
  <MyLoading />
  <div class="flex flex-col h-dvh">
    <!-- header -->
    <NavbarComponent/>
    <!-- content -->
    <div class="mt-[89px] md:mt-[105px] grow bg-primary-50" >
      <RouterView :my-timer="timer" />
    </div>
    <div class="fixed bottom-0 left-0 z-20 w-full flex flex-wrap justify-center item-center py-2
  bg-orange-600 text-primary-50 text-sm md:text-base md:py-3">
      <p class="pr-4">結帳輸入 ILOVECACAO <span class="font-bold">全館 8 折</span></p>
      <i class="bi bi-alarm me-1 hidden md:inline"></i>
      <ul class="flex gap-1">
        <li v-for="(item, key) in timer" :key="item">
          <p class="font-bold">{{ `${item} ${key}` }}</p>
        </li>
      </ul>
    </div>
    <!-- footer -->
    <footer class="bg-primary-800 text-primary-200 pt-6 pb-16 mt-auto">
      <div class="container">
        <div class="flex justify-between border-b border-primary-200 pb-6 mb-4">
          <div class="flex flex-col">
            <ul class="hidden md:flex gap-12 mb-8
            *:transition-opacity *:duration-150 hover:*:opacity-80">
              <li><RouterLink to="/">首頁</RouterLink></li>
              <li><RouterLink to="/about">關於我們</RouterLink></li>
              <li><RouterLink to="/products">產品列表</RouterLink></li>
              <li><RouterLink to="/articles">最新消息</RouterLink></li>
            </ul>
            <ul class="flex flex-col items-start gap-2
            *:transition-opacity *:duration-150 hover:*:opacity-80 md:gap-3 md:*:text-xl">
              <li><a class="inline-flex items-center gap-3 md:gap-4" href="tel:+886-912345678">
                <i class="bi bi-phone text-xl md:text-3xl"></i>0912345678
              </a></li>
              <li><a class="inline-flex items-center gap-3 md:gap-4" href="mailto:hi@cacao.com">
                <i class="bi bi-envelope text-xl md:text-3xl"></i>hi@cacao.com
              </a></li>
            </ul>
          </div>
          <ul class="flex items-start gap-2 text-xl mb-2
          *:transition-opacity *:duration-150 hover:*:opacity-80
          md:text-4xl md:gap-4">
            <li><a class="px-1" href="https://www.facebook.com/">
              <i class="bi bi-facebook" aria-label="facebook"></i>
            </a></li>
            <li><a class="px-1" href="https://www.instagram.com/">
              <i class="bi bi-instagram" aria-label="instagram"></i>
            </a></li>
            <li><a class="px-1" href="https://liff.line.me/1645278921-kWRPP32q/?accountId=linetw">
              <i class="bi bi-line" aria-label="line"></i>
            </a></li>
          </ul>
        </div>
        <div class="flex flex-col gap-2 md:flex-row md:justify-between text-sm">
          <span>© 2023 jiayu / 非營業用途</span>
          <div class="flex flex-col md:flex-row gap-2 md:gap-12">
            <RouterLink to="/about">版權聲明</RouterLink>
            <RouterLink to="/login">登入後台</RouterLink>
          </div>
        </div>

      </div>
    </footer>
  </div>
  <ScrollTopBtn></ScrollTopBtn>
</template>

<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';
import NavbarComponent from '@/components/userPages/layout/NavbarComponent.vue';
import ScrollTopBtn from '@/components/userPages/layout/ScrollTopBtn.vue';

export default {
  components: {
    MyLoading, NavbarComponent, ScrollTopBtn,
  },
  data() {
    return {
      timer: {},
      timerInterval: null,
      now: Math.floor(new Date().getTime() / 1000),
    };
  },
  mounted() {
    this.getCart();
    this.handleTimer();
  },
  methods: {
    closeModal() {
      this.isCartModalOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    handleTimer() {
      const deadLine = Date.parse('2024-03-31') / 1000;
      // 清除之前的計時器，避免多個計時器並行運行
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      // 設置新的計時器
      this.timerInterval = setInterval(() => {
        const now = Math.floor(new Date().getTime() / 1000);
        const time = deadLine - now;
        this.timer = {
          日: Math.floor(time / 60 / 60 / 24).toString().padStart(2, '0'),
          時: (Math.floor(time / 60 / 60) % 24).toString().padStart(2, '0'),
          分: (Math.floor(time / 60) % 60).toString().padStart(2, '0'),
          秒: (time % 60).toString().padStart(2, '0'),
        };
      }, 1000);
    },
    ...mapActions(loadingStore, ['showLoading']),
    ...mapActions(cartStore, ['getCart']),
  },

};
</script>
