<template>
  <header
    class="fixed top-0 z-40 w-full backdrop-brightness-75 md:backdrop-brightness-100"
    :class="{ 'h-full': isMenuOpen }"
  >
    <div
      class="relative border-b border-primary-300 bg-primary-800 text-primary-200 py-2 md:py-3
        md:static"
    >
      <div class="container mx-auto">
        <nav class="flex items-center justify-between">
          <!-- 手機 漢堡按鈕 -->
          <button type="button" class="btn btn-link -ml-1 p-1 md:hidden" @click="toggleMenu">
            <i class="bi text-4xl" :class="`${isMenuOpen ? 'bi-x' : 'bi-list'}`"></i>
          </button>
          <!-- logo -->
          <RouterLink
            to="/"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm
              bg-primary-200 transition-opacity duration-150 hover:opacity-80 md:static
              md:translate-x-0 md:translate-y-0"
          >
            <LogoComponent class="px-2 pb-2 text-xl md:px-3 md:pb-3 md:pt-1 md:text-2xl" />
          </RouterLink>
          <!-- 桌機 分頁 -->
          <ul
            class="text-md 0 hidden gap-6 *:rounded-sm *:transition-all *:duration-150
              hover:*:bg-primary-200 hover:*:text-primary-800 md:flex"
          >
            <li class="group relative">
              <RouterLink class="inline-block p-2" to="/products">產品列表</RouterLink>
              <TooltipComponent>
                <ul class="flex gap-5 p-2">
                  <CategoryLinks
                    v-for="(item, category) in categories"
                    :key="category"
                    :category="category"
                  >
                  </CategoryLinks>
                </ul>
              </TooltipComponent>
            </li>
            <RouterLink to="/articles" custom v-slot="{ navigate, isExactActive }">
              <li
                class="inline-block p-2"
                :class="isExactActive ? 'active' : 'cursor-pointer'"
                @click="navigate"
                role="link"
              >
                最新消息
              </li>
            </RouterLink>
            <RouterLink to="/about" custom v-slot="{ navigate, isExactActive }">
              <li
                class="inline-block p-2"
                :class="isExactActive ? 'active' : 'cursor-pointer'"
                @click="navigate"
                role="link"
              >
                關於我們
              </li>
            </RouterLink>
          </ul>
          <ul
            class="flex gap-4 text-lg *:transition-all *:duration-150 hover:*:rounded-sm
              hover:*:bg-primary-200 hover:*:text-primary-800 focus:*:bg-primary-200
              focus:*:text-primary-800"
          >
            <li>
              <button
                type="button"
                class="group/cartIcon relative block px-3 py-2"
                @click="openCartModal"
              >
                <i class="bi bi-cart-fill" aria-label="購物車"></i>
                <span
                  v-if="cartNum"
                  class="absolute left-full top-0 block -translate-x-5 rounded-xl bg-orange-600 px-2
                    py-1 text-xs font-bold leading-3 text-primary-50
                    group-hover/cartIcon:bg-orange-500"
                  >{{ cartNum }}</span
                >
              </button>
            </li>
            <li>
              <RouterLink class="block p-1 px-3 py-2" to="/favorites">
                <i class="bi bi-heart-fill" aria-label="收藏"></i>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- 漢堡menu -->
    <TransitionAccordion>
      <div
        v-if="isMenuOpen"
        class="h-[544px] w-full overflow-y-hidden bg-primary-800/95 text-primary-200"
      >
        <div class="container">
          <ul class="text-md flex flex-col gap-4 py-6 font-bold">
            <li class="-mx-2 px-4 py-3">
              <button class="block w-full text-start" to="/products" @click="toggleProduct">
                產品列表
                <i
                  class="bi bi-chevron-down float-right transition-all duration-300"
                  :class="{ 'origin-center rotate-180 ': isProductOpen }"
                ></i>
              </button>
              <TransitionAccordion>
                <ul
                  v-show="isProductOpen"
                  class="flex h-80 flex-col gap-3 overflow-y-hidden px-2 py-3"
                >
                  <MenuLink
                    link-to="/products"
                    :isQueryActive="currentCategory === ''"
                    @handle-click="closeMenu"
                  >
                    - 全部
                  </MenuLink>
                  <MenuLink
                    v-for="(item, category) in categories"
                    :key="category"
                    :link-to="{ path: `/products`, query: { category } }"
                    :isQueryActive="currentCategory === category"
                    @handle-click="closeMenu"
                  >
                    - {{ category }}
                  </MenuLink>
                </ul>
              </TransitionAccordion>
            </li>
            <MenuLink link-to="/articles" @handle-click="closeMenu">最新消息</MenuLink>
            <MenuLink link-to="/about" @handle-click="closeMenu">關於我們</MenuLink>
          </ul>
        </div>
      </div>
    </TransitionAccordion>
  </header>
  <!-- 購物車 modal -->
  <CartModal ref="cartModal"></CartModal>
</template>

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
    LogoComponent,
    TransitionAccordion,
    CartModal,
    TooltipComponent,
    MenuLink,
    CategoryLinks,
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
    closeMenu() {
      this.isMenuOpen = false;
      this.isProductOpen = true;
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

<style scoped>
.active {
  @apply pointer-events-none rounded-sm bg-primary-200 text-primary-800;
}
</style>
