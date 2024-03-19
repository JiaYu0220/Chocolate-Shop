<template>
  <li class="flex items-center gap-2 sm:gap-4 rounded">
      <!-- 左 -->
      <div class="w-1/3 h-28 sm:h-32 rounded-md overflow-hidden">
        <img loading="lazy" class="w-full h-full object-cover"
        :src="cart.product.imageUrl" alt="產品圖">
      </div>
      <!-- 右 -->
      <div class="w-2/3 flex flex-col justify-between">
      <div :class="{'flex justify-between':canEdit}">
        <p class="font-medium sm:text-lg">{{ cart.product.title }}</p>
        <!-- 刪除按鈕 -->
        <LoadingBtn v-if="canEdit" class="btn btn-link -mt-2 -mr-3 shadow-none"
        @click="delCart(cart, swalContainer)"
          :isLoading="loadingStatus.cartId === cart.id">
          <i v-if="loadingStatus.cartId !== cart.id"
          class="bi bi-trash3 text-orange-700"></i></LoadingBtn>
      </div>
      <p class="text-stone-500 text-sm mb-1 sm:text-base">{{ cart.product.unit }}</p>
      <p class="mb-1">
        <del class="text-stone-500 mr-2 text-xs sm:text-sm"
        v-if="cart.product.origin_price !== cart.product.price">
          NT$ {{ cart.product.origin_price }}</del>
          <span class="text-primary-800">NT$ {{ cart.product.price }}</span>
        </p>

      <div class="flex items-center justify-between gap-1">
        <!-- 數量按鈕 -->
        <div v-if="canEdit"
        class="flex w-fit border-2 border-primary-200 rounded text-sm sm:text-base
        *:px-2 *:py-1 *:sm:px-3">
          <LoadingBtn
          class="transition-colors
          hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
          disabled:text-stone-500 disabled:bg-stone-100/50 disabled:cursor-not-allowed"
          @click="qty--;debouncePutCart(cart, qty)"
          :disabled="qty === 1"
          :isLoading="loadingStatus.cartId === cart.id">
            <template v-if="loadingStatus.cartId !== cart.id">－</template>
          </LoadingBtn>
          <input type="text" class="border-y-0 bg-transparent w-9 text-center text-sm
          border-x border-primary-200
          focus:ring-primary-700 sm:w-11 sm:text-base"
          v-model="qty" readonly>
          <LoadingBtn
          class="transition-colors
          hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
            disabled:text-stone-600 disabled:cursor-not-allowed"
            @click="qty++;debouncePutCart(cart, qty)"
            :isLoading="loadingStatus.cartId === cart.id">
            <template v-if="loadingStatus.cartId !== cart.id">＋</template>
          </LoadingBtn>
        </div>
        <p v-else>數量：{{ cart.qty }}</p>
        <p class="text-primary-800 sm:text-lg font-bold">NT$ {{ cart.total }}</p>
      </div>
    </div>
  </li>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';

import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

export default {
  props: {
    cart: Object,
    swalContainer: {
      default: 'body',
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LoadingBtn,
  },
  data() {
    return {
      qty: null,
    };
  },
  mounted() {
    this.qty = this.cart.qty;
  },
  methods: {
    ...mapActions(cartStore, ['debouncePutCart', 'delCart']),
  },
  watch: {
    'cart.qty': {
      handler() {
        this.qty = this.cart.qty;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
