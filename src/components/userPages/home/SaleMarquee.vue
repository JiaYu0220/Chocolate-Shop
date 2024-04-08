<template>
  <RouterLink
    v-if="products.length"
    to="/products"
    class="relative block"
    @mouseenter="isSlow = true"
    @mouseleave="isSlow = false"
  >
    <swiper-container
      ref="swiper"
      space-between="60"
      slides-per-view="auto"
      slidesPerGroupAuto="true"
      centered-slides="true"
      :speed="isSlow ? '18000' : '15000'"
      autoplay-delay="0"
      autoplay-disable-on-interaction="false"
      loop="true"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <span class="mr-6">特價！！{{ product.title }}現在只要 $ {{ product.price }}</span>
        <RouterLink :to="`product/${product.id}`" class="btn btn-primary-light"
          >立即選購</RouterLink
        >
      </swiper-slide>
    </swiper-container>
  </RouterLink>
</template>

<script>
import { register } from 'swiper/element/bundle';
import { mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  data() {
    return {
      isSlow: false,
    };
  },
  mounted() {
    register();
  },
  computed: {
    products() {
      return this.allProducts.filter((item) => item.origin_price !== item.price);
    },
    ...mapState(productStore, ['allProducts']),
  },
};
</script>

<style scoped>
swiper-container::part(wrapper) {
  transition-timing-function: linear;
}
swiper-container::part(container) {
  @apply w-full bg-primary-800 text-primary-200 transition-colors
   duration-300 hover:bg-primary-700 hover:text-primary-50;
}
swiper-slide {
  @apply inline-flex w-auto items-center py-4 text-2xl font-bold;
}
</style>
