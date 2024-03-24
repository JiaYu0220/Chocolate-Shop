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
          <RouterLink to="/" class="bg-primary-200 rounded-sm
            hover:opacity-80 transition-opacity duration-150">
              <LogoComponent class="px-3 pt-1 pb-3 text-2xl md:px-4 md:pt-3 md:pb-5 md:text-4xl"/>
          </RouterLink>
          <!-- 桌機 分頁 -->
          <ul class="hidden
          md:flex gap-6 text-md 0 *:transition-all *:duration-150 *:rounded-sm
        hover:*:text-primary-800 hover:*:bg-primary-200
        ">

          <RouterLink to="/about" custom
          v-slot="{ navigate, isExactActive }">
            <li class="inline-block p-2"
            :class="isExactActive ? 'active' : 'cursor-pointer'"
            @click="navigate" role="link">關於我們</li>
          </RouterLink>

          <li class="relative group">
            <RouterLink class="inline-block p-2" to="/products">產品列表</RouterLink>
            <TooltipComponent>
              <ul class="flex gap-5 p-2">
                <CategoryLinks v-for="(item, category) in categories" :key="category"
                :category="category">
                </CategoryLinks>
              </ul>
            </TooltipComponent>
          </li>
          <RouterLink to="/articles" custom
          v-slot="{ navigate, isExactActive }">
            <li class="inline-block p-2"
            :class="isExactActive ? 'active' : 'cursor-pointer'"
            @click="navigate" role="link">最新消息</li>
          </RouterLink>
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
              <RouterLink class="block py-2 px-3" to="/favorites">
                <i class="bi bi-heart-fill" aria-label="收藏"></i>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- 漢堡menu -->
    <TransitionAccordion>
      <div v-if="isMenuOpen" class="bg-primary-800/95 text-primary-200 w-full
      overflow-y-hidden h-[544px]">
        <div class="container">
          <ul class="flex flex-col gap-4 py-6
          text-md font-bold">
          <MenuLink link-to="/about" @on-click="toggleMenu">關於我們</MenuLink>
            <li class="py-3 px-4 -mx-2">
              <button class="block text-start w-full " to="/products"
              @click="toggleProduct">
                產品列表
                <i class="bi bi-chevron-down float-right transition-all duration-300"
                :class="{'origin-center rotate-180 ': isProductOpen}"></i>
              </button>
              <TransitionAccordion>
                <ul v-show="isProductOpen"
                class="flex flex-col gap-3 px-2 py-3 overflow-y-hidden h-80">
                  <MenuLink link-to="/products"
                  :isQueryActive="currentCategory === ''" @on-click="closeMenuAndProduct">
                    - 全部
                  </MenuLink>
                  <MenuLink v-for="(item, category) in categories" :key="category"
                  :link-to="{ path: `/products`, query: { category }}"
                  :isQueryActive="currentCategory === category"
                  @on-click="closeMenuAndProduct">
                    - {{ category }}
                  </MenuLink>
                </ul>
              </TransitionAccordion>
            </li>
            <MenuLink link-to="/articles" @on-click="toggleMenu">最新消息</MenuLink>
          </ul>
        </div>
      </div>
    </TransitionAccordion>

  </header>
  <!-- 購物車 modal -->
  <CartModal ref="cartModal"></CartModal>
</template>
<style scoped>
  .active{
    @apply text-primary-800 bg-primary-200 rounded-sm pointer-events-none
  }
</style>
<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import scrollStore from '@/stores/scrollStore';
import LogoComponent from '@/components/shared/logo/LogoComponent.vue';
import TransitionAccordion from '@/components/shared/transition/TransitionAccordion.vue';
import TooltipComponent from '@/components/shared/tooltip/TooltipComponent.vue';
import productStore from '@/stores/productStore';
import CategoryLinks from '@/components/userPages/product/CategoryLinks.vue';
import CartModal from './CartModal.vue';
import MenuLink from './MenuLink.vue';

export default {
  components: {
    LogoComponent, TransitionAccordion, CartModal, TooltipComponent, MenuLink, CategoryLinks,
  },
  data() {
    return {
      isMenuOpen: false,
      isProductOpen: true,
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
    toggleProduct() {
      this.isProductOpen = !this.isProductOpen;
    },
    closeMenuAndProduct() {
      this.isMenuOpen = false;
      this.isProductOpen = false;
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
    ...mapState(productStore, ['categories', 'currentCategory']),
  },
};
</script>
