<template>
  <swiper-container init="false" ref="productSwiper">
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </swiper-slide>
  </swiper-container>
</template>

<script>
import { register } from 'swiper/element/bundle';
import { mapState } from 'pinia';
import ProductCard from '@/components/userPages/product/ProductCard.vue';
import productStore from '@/stores/productStore';

export default {
  components: {
    ProductCard,
  },
  mounted() {
    register();
    Object.assign(this.$refs.productSwiper, {
      slidesPerView: 1,
      spaceBetween: 12,
      setWrapperSize: true,
      navigation: {
        enabled: true,
      },

      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1280: {
          slidesPerView: 4,
        },
      },
    });
    this.$refs.productSwiper.initialize();
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
swiper-container::part(container) {
  --swiper-theme-color: #361707;
}
swiper-slide {
  @apply h-auto;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  width: 16px;
  --swiper-navigation-size: 16px;
  --swiper-navigation-top-offset: 30%;
  @apply rounded-full bg-primary-50/80 p-3 transition-transform duration-300
  hover:scale-110 hover:bg-primary-50 md:p-4;
}

swiper-container::part(scrollbar) {
  --swiper-scrollbar-drag-bg-color: rgba(38, 16, 5, 0.5);
  --swiper-scrollbar-bg-color: rgba(38, 16, 5, 0.1);
  @apply static mx-auto mt-5 w-2/3;
}
</style>
