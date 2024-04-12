<template>
  <MyLoading />
  <div class="flex h-dvh flex-col">
    <!-- header -->
    <NavbarComponent />
    <!-- content -->
    <div class="mt-[97px] grow bg-primary-50 sm:mt-[117px]">
      <RouterView v-slot="{ Component, route }">
        <TransitionFade mode="out-in">
          <component :is="Component" :key="route.path" />
        </TransitionFade>
      </RouterView>
    </div>
    <!-- footer -->
    <footer class="mt-auto bg-primary-800 py-6 text-primary-200">
      <div class="container">
        <div class="mb-4 flex justify-between border-b border-primary-200 pb-6">
          <div class="flex flex-col">
            <p class="mb-4 font-bold text-primary-100">連絡我們</p>
            <ul
              class="flex flex-col items-start gap-2 *:transition-opacity *:duration-150
                hover:*:opacity-80 md:gap-3"
            >
              <li>
                <a class="inline-flex items-center gap-3 md:gap-4" href="tel:+886-912345678">
                  <i class="bi bi-telephone text-xl"></i>0912345678
                </a>
              </li>
              <li>
                <a class="inline-flex items-center gap-3 md:gap-4" href="mailto:hi@cacao.com">
                  <i class="bi bi-envelope text-xl"></i>hi@cacao.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p class="mb-4 font-bold text-primary-100">追蹤我們</p>
            <ul
              class="mb-2 flex items-start gap-2 text-xl *:transition-opacity *:duration-150
                hover:*:opacity-80 md:gap-4"
            >
              <li>
                <RouterLink class="p-1" to="https://www.facebook.com/">
                  <i class="bi bi-facebook" aria-label="facebook"></i>
                </RouterLink>
              </li>
              <li>
                <RouterLink class="p-1" to="https://www.instagram.com/">
                  <i class="bi bi-instagram" aria-label="instagram"></i>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="p-1"
                  to="https://liff.line.me/1645278921-kWRPP32q/?accountId=linetw"
                >
                  <i class="bi bi-line" aria-label="line"></i>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-2 text-sm md:flex-row md:justify-between">
          <span>© 2023 jiayu / 非營業用途</span>
          <RouterLink to="/about">版權聲明</RouterLink>
        </div>
      </div>
    </footer>
  </div>
  <ScrollTopBtn />
</template>

<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';
import NavbarComponent from '@/components/userPages/layout/NavbarComponent.vue';
import ScrollTopBtn from '@/components/userPages/layout/ScrollTopBtn.vue';
import TransitionFade from '@/components/shared/transition/TransitionFade.vue';

export default {
  components: {
    MyLoading,
    NavbarComponent,
    ScrollTopBtn,
    TransitionFade,
  },
  mounted() {
    this.getCart();
  },
  methods: {
    closeModal() {
      this.isCartModalOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    ...mapActions(loadingStore, ['showLoading']),
    ...mapActions(cartStore, ['getCart']),
  },
};
</script>
