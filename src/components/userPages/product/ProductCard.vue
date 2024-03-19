<template>
  <RouterLink :to="`/product/${product.id}`"
  class="flex flex-col bg-primary-50 rounded-md border border-primary-300
  overflow-hidden h-full group/product">
    <div class="h-64 overflow-hidden">
      <img loading="lazy"
      class="object-cover h-full w-full
      group-hover/product:brightness-75 transition-all"
      :src="product.imageUrl" alt="產品圖">
    </div>
    <div class="p-5 grow flex flex-col">
      <div class="flex justify-between items-center">
        <p class="text mb-1">{{ product.category }}</p>
        <button type="button" class="btn btn-link shadow-none" @click.prevent="toggleFavorite">
          <i v-if="isFavorite" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
        </button>
      </div>
      <p class="font-bold text-lg text-primary-800 mb-1">{{ product.title }}</p>
      <p class="text-sm mb-3">{{ product.unit }}</p>
      <p class="mb-3">
        <span class="text-2xl text-primary-800 mr-1">
        <template v-if="product.price !== product.origin_price">特惠</template>
        NT$ {{ product.price }}</span>
        <del v-if="product.price !== product.origin_price">NT$ {{ product.origin_price }}</del>
      </p>
      <LoadingBtn class="btn btn-primary w-full mt-auto"
      @click.prevent="postCart(product.id)"
      :is-loading="(loadingStatus.productId === product.id)"
      >加入購物車</LoadingBtn>
      <!-- <button
      type="button" class="btn btn-primary w-full mt-auto" disabled>已售完</button> -->
    </div>
  </RouterLink>
</template>
<script>
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
  },

  methods: {
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
