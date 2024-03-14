<template>
  <RouterLink to="/products"
  class="flex flex-col bg-primary-50 rounded-md border border-primary-300
  overflow-hidden h-full group/product">
    <div class="h-52 overflow-hidden">
      <img loading="lazy"
      class="object-cover h-full w-full
      group-hover/product:brightness-75 transition-all"
      height="200" :src="product.imageUrl" alt="產品圖">
    </div>
    <div class="p-5 grow flex flex-col">
      <p class="text mb-1">{{ product.category }}</p>
      <p class="font-bold text-lg text-primary-800 mb-1">{{ product.title }}</p>
      <p class="text-sm mb-3">{{ product.unit }}</p>
      <p class="mb-3">
        <span class="text-2xl text-primary-800 mr-1">NT$ {{ product.price }}</span>
        <del>NT$ {{ product.origin_price }}</del>
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
import LoadingBtn from '../shared/button/LoadingBtn.vue';

export default {
  props: {
    product: Object,
  },
  components: {
    LoadingBtn,
  },
  methods: {
    ...mapActions(cartStore, ['postCart']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
