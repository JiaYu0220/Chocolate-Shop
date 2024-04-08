<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="group flex h-full flex-col overflow-hidden rounded-md border border-primary-300
      bg-primary-50 transition-all hover:shadow-md"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <div class="relative overflow-hidden">
      <swiper-container class="h-full" ref="imageSwiper" effect="fade">
        <swiper-slide class="h-full" lazy="true">
          <img
            loading="lazy"
            class="w-full object-cover aspect-square"
            :src="this.product.imageUrl"
            alt="產品圖"
          />
        </swiper-slide>
        <swiper-slide lazy="true" v-if="Array.isArray(this.product.imagesUrl)">
          <img
            loading="lazy"
            class="w-full object-cover aspect-square"
            :src="this.product.imagesUrl[0]"
            alt="產品圖"
          />
        </swiper-slide>
      </swiper-container>
      <span
        class="absolute top-2 left-2 z-10 rounded-sm px-3 py-1 bg-orange-700 text-primary-100"
        v-if="product.price !== product.origin_price"
        >特惠</span
      >
    </div>
    <div class="flex grow flex-col p-5">
      <div class="flex items-center justify-between">
        <p class="text mb-1">{{ product.category }}</p>
        <button type="button" class="btn btn-link shadow-none" @click.prevent="toggleFavorite">
          <i v-if="isFavorite" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
        </button>
      </div>
      <p class="mb-1 text-lg font-bold text-primary-800">{{ product.title }}</p>
      <p class="mb-3 text-sm">{{ product.unit }}</p>
      <p class="mb-3 flex flex-wrap items-center">
        <span class="mr-1 text-lg text-primary-800 md:text-2xl"> NT$ {{ product.price }}</span>
        <del class="text-sm md:text-base" v-if="product.price !== product.origin_price"
          >NT$ {{ product.origin_price }}</del
        >
      </p>
      <LoadingBtn
        class="btn btn-primary mt-auto w-full"
        @click.prevent="postCart(product.id)"
        :is-loading="loadingStatus.productId === product.id"
        >加入購物車</LoadingBtn
      >
    </div>
  </RouterLink>
</template>

<script>
import { register } from 'swiper/element/bundle';
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

export default {
  props: {
    product: Object,
  },
  components: {
    LoadingBtn,
  },
  data() {
    return {
      isFavorite: false,
    };
  },
  mounted() {
    this.isFavorite = this.favorites.includes(this.product.id);
    register();
    Object.assign(this.$refs.imageSwiper, {
      effect: 'fade',
    });
    this.$refs.imageSwiper.initialize();
  },
  methods: {
    handleEnter() {
      if (this.$refs.imageSwiper?.swiper) {
        this.$refs.imageSwiper.swiper.slideNext();
      }
    },
    handleLeave() {
      if (this.$refs.imageSwiper?.swiper) {
        this.$refs.imageSwiper.swiper.slidePrev();
      }
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.handleFavorite(this.isFavorite, this.product.id);
    },
    ...mapActions(cartStore, ['postCart']),
    ...mapActions(favoriteStore, ['handleFavorite']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
    ...mapState(favoriteStore, ['favorites']),
  },
};
</script>

<style scoped>
@import 'swiper/element/css/effect-fade';

swiper-container::part(container) {
  --swiper-theme-color: #361707;
}
</style>
