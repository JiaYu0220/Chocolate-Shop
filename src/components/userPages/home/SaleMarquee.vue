<template>
  <RouterLink v-if="products.length" to="/products" class="block relative">
    <swiper-container space-between="60" slides-per-view="auto" slidesPerGroupAuto="true"
    autoplay-delay="0"
    centered-slides="true"
    autoplay-disable-on-interaction="false"
    loop="true" speed="7000"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <span class="mr-6">特價！！{{product.title}}現在只要 $ {{product.price}}</span>
        <span class="btn btn-primary-light">立即選購</span>
      </swiper-slide>
    </swiper-container>
  </RouterLink>
</template>
<style scoped>
swiper-container::part(wrapper) {
  transition-timing-function: linear;
}
swiper-container::part(container) {
  @apply bg-primary-800 text-primary-200 transition-colors duration-300
   hover:text-primary-50 hover:bg-primary-700 w-full;
}
swiper-slide {
  @apply w-auto inline-flex py-4 text-2xl font-bold items-center;
}
</style>
<script>
import { register } from 'swiper/element/bundle';
import { mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
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
