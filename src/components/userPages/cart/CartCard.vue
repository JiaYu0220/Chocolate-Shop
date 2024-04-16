<template>
  <li ref="card" class="flex items-center gap-2 rounded sm:gap-4">
    <!-- 左 -->
    <div class="h-28 w-1/3 overflow-hidden rounded-md sm:h-32">
      <img
        loading="lazy"
        class="h-full w-full object-cover"
        :src="cart.product.imageUrl"
        alt="產品圖"
      />
    </div>
    <!-- 右 -->
    <div class="flex w-2/3 flex-col justify-between">
      <div :class="{ 'flex justify-between': canEdit }">
        <p class="font-medium sm:text-lg">{{ cart.product.title }}</p>
        <!-- 刪除按鈕 -->
        <LoadingBtn
          v-if="canEdit"
          class="btn btn-link -mr-3 -mt-2 shadow-none"
          @click="delCart(cart, false)"
          :isLoading="loadingStatus.cartId === cart.id"
        >
          <i v-if="loadingStatus.cartId !== cart.id" class="bi bi-trash3 text-orange-700"></i
        ></LoadingBtn>
      </div>
      <p class="mb-1 text-sm text-stone-500 sm:text-base">
        {{ cart.product.unit }}
      </p>
      <p class="mb-1">
        <del
          class="mr-2 text-xs text-stone-500 sm:text-sm"
          v-if="cart.product.origin_price !== cart.product.price"
        >
          NT$ {{ cart.product.origin_price }}</del
        >
        <span class="text-primary-800">NT$ {{ cart.product.price }}</span>
      </p>
      <div class="flex items-center justify-between gap-1">
        <!-- 數量按鈕 -->
        <div
          v-if="canEdit"
          class="flex w-fit rounded border-2 border-primary-200 text-sm *:px-2 *:py-1 sm:text-base
            *:sm:px-3"
        >
          <LoadingBtn
            class="transition-colors hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
              disabled:cursor-not-allowed disabled:bg-stone-100/50 disabled:text-stone-500"
            @click="reduceQty"
            :isLoading="loadingStatus.cartId === cart.id"
          >
            <template v-if="loadingStatus.cartId !== cart.id">－</template>
          </LoadingBtn>
          <input
            type="text"
            class="w-9 border-x border-y-0 border-primary-200 bg-transparent text-center text-sm
              focus:ring-primary-700 sm:w-11 sm:text-base"
            v-model="qty"
            readonly
          />
          <LoadingBtn
            class="transition-colors hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
              disabled:cursor-not-allowed disabled:text-stone-600"
            @click="addQty"
            :isLoading="loadingStatus.cartId === cart.id"
          >
            <template v-if="loadingStatus.cartId !== cart.id">＋</template>
          </LoadingBtn>
        </div>
        <p v-else>數量：{{ cart.qty }}</p>
        <p class="font-bold text-primary-800 sm:text-lg">NT$ {{ cart.total }}</p>
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
    reduceQty() {
      if (this.qty === 1) {
        this.delCart(this.cart, this.refs.card);
      } else {
        this.qty -= 1;
        this.debouncePutCart(this.cart, this.qty);
      }
    },
    addQty() {
      this.qty += 1;
      this.debouncePutCart(this.cart, this.qty);
    },
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
