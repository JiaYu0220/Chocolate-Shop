<template>
  <header class="fixed top-0 z-10 w-full backdrop-brightness-75
  md:backdrop-brightness-100 " :class="{'h-full':isMenuOpen}">
    <div class="bg-primary-800 text-primary-200 border-b border-primary-300 py-2 md:py-4">
      <div class="container mx-auto">
        <nav class="flex justify-between items-center">
          <!-- 手機 漢堡按鈕 -->
          <button type="button" class="btn btn-link p-2 my-2 -ml-2 md:hidden"
          @click="toggleMenu">
            <i class="bi text-4xl" :class="`${isMenuOpen?'bi-x':'bi-list'}`"></i>
          </button>

          <!-- logo -->
          <RouterLink to="/">
            <div class="bg-primary-200 rounded-sm
            hover:opacity-80 transition-opacity duration-150">
              <LogoComponent class="px-3 pt-1 pb-3 text-2xl md:px-4 md:pt-3 md:pb-5 md:text-4xl"/>
            </div>
          </RouterLink>
          <!-- 桌機 分頁 -->
          <ul class="hidden
          md:flex gap-6 text-md 0 *:transition-all *:duration-150 *:rounded-sm
        hover:*:text-primary-800 hover:*:bg-primary-200
        focus:*:text-primary-800 focus:*:bg-primary-200">
            <li><RouterLink class="inline-block p-2" to="/about">關於我們</RouterLink></li>
            <li><RouterLink class="inline-block p-2" to="/products">產品列表</RouterLink></li>
            <li><RouterLink class="inline-block p-2" to="/articles">最新消息</RouterLink></li>
          </ul>
          <ul class="flex gap-4 text-lg *:transition-all *:duration-150 hover:*:rounded-sm
            hover:*:text-primary-800 hover:*:bg-primary-200
            focus:*:text-primary-800 focus:*:bg-primary-200">
            <li>
              <button type="button" class="block py-2 px-3 relative group/cartIcon"
              @click="openCartModal">
                <i class="bi bi-cart-fill" aria-label="購物車"></i>
                <span v-if="cartNum" class="block absolute top-0 left-full -translate-x-5
                py-1 px-2 bg-orange-600 text-primary-50 rounded-xl text-xs font-bold leading-3
               group-hover/cartIcon:bg-orange-500">{{ cartNum }}</span>
              </button>
            </li>
            <li>
              <RouterLink class="block py-2 px-3" to="/about">
                <i class="bi bi-heart-fill" aria-label="收藏"></i>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- 漢堡menu -->
    <TransitionAccordion>
      <div v-if="isMenuOpen" class="bg-primary-800 text-primary-200  w-full
      overflow-y-hidden h-[240px]">
        <div class="container">
          <ul class="flex flex-col gap-4 pt-8 pb-10
          text-md font-bold
          *:transition-all *:duration-300 *:rounded-sm *:text-center
          hover:*:text-primary-800 hover:*:bg-primary-200
          focus:*:text-primary-800 focus:*:bg-primary-200">
            <li><RouterLink class="block py-3" to="/about">關於我們</RouterLink></li>
            <li><RouterLink class="block py-3" to="/products">產品列表</RouterLink></li>
            <li><RouterLink class="block py-3" to="/articles">最新消息</RouterLink></li>
          </ul>
        </div>
      </div>
    </TransitionAccordion>

  </header>
  <!-- 購物車 modal -->
  <CartModal ref="cartModal"></CartModal>
</template>
<style >

</style>
<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import scrollStore from '@/stores/scrollStore';
import LogoComponent from '@/components/shared/logo/LogoComponent.vue';
import TransitionAccordion from '@/components/shared/transition/TransitionAccordion.vue';
import CartModal from './CartModal.vue';

export default {
  components: {
    LogoComponent, TransitionAccordion, CartModal,
  },
  data() {
    return {
      isMenuOpen: false,
    };
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
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    openCartModal() {
      this.$refs.cartModal.showModal();
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(scrollStore, ['getCurrentScroll', 'disableScroll', 'enableScroll']),
    ...mapActions(cartStore, ['getCart']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum']),
  },
};
</script>
