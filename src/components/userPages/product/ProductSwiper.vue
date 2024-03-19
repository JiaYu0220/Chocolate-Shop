<template>
  <swiper-container init="false"
  ref="productSwiper"
  >
    <swiper-slide v-for="product in products" :key="product.id" lazy="true">
    <ProductCard :product="product"></ProductCard>
    </swiper-slide>
  </swiper-container>
</template>
<style scoped>
swiper-container::part(container){
  --swiper-theme-color: #361707;
}
swiper-slide{
  @apply h-auto
}

swiper-container::part(button-prev),swiper-container::part(button-next){
  width: 20px;
  --swiper-navigation-size: 20px;
  --swiper-navigation-sides-offset: 40px;
  --swiper-navigation-top-offset: 30%;
  @apply bg-primary-50/80 rounded-full p-4 hover:scale-110 hover:bg-primary-50
  transition-transform duration-300
}
swiper-container::part(scrollbar){
  --swiper-scrollbar-drag-bg-color: rgba(38, 16, 5, 0.5);
  --swiper-scrollbar-bg-color: rgba(38, 16, 5, 0.1);
  @apply static mt-5 w-2/3 mx-auto
}

</style>
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
      slidesPerView: 2,
      spaceBetween: 12,
      setWrapperSize: true,
      navigation: {
        enabled: false,
      },
      scrollbar: {
        enabled: true,
        draggable: true,
      },
      grabCursor: true,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
          navigation: {
            enabled: true,
          },
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
