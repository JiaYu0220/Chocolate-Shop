<template>
  <ModalComponent ref="modal" direction="right" class="my-0 mr-0 max-h-dvh w-11/12 max-w-md">
    <div class="flex h-dvh flex-col bg-primary-50 text-primary-950">
      <!-- 標題 -->
      <div class="flex items-center justify-between border-b border-primary-300 px-7 py-2 sm:px-8">
        <h3 class="text-lg font-bold">購物車</h3>
        <XBtn @click="closeModal" />
      </div>
      <!-- 商品 -->
      <div v-if="cartNum" class="px-7 py-6 sm:px-8">
        <CartList />
      </div>
      <!-- 空購物車 -->
      <div v-else class="flex grow items-center justify-center">
        <div class="text-center">
          <i class="bi bi-cart-x text-8xl"></i>
          <p class="pb-5 pt-11">你的購物車是空的</p>
          <RouterLink to="/products" class="btn btn-primary" @click="closeModal">
            開始購物
          </RouterLink>
        </div>
      </div>
      <div v-if="cartNum" class="mt-auto border-t border-primary-300 px-7 py-6 sm:px-8">
        <!-- 總額 -->
        <div class="flex items-center justify-between pb-6 text-xl font-bold text-primary-800">
          <p>總額</p>
          <p class="text-2xl">
            <del class="mr-2 text-base text-stone-500" v-if="total !== final_total">
              NT$ {{ total }}</del
            >
            NT$ {{ final_total }}
          </p>
        </div>
        <RouterLink
          to="/cart"
          class="btn btn-primary btn-lg block w-full text-center"
          @click="closeModal"
        >
          去結帳
        </RouterLink>
      </div>
    </div>
  </ModalComponent>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import CartList from '@/components/userPages/cart/CartList.vue';
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';

export default {
  components: {
    CartList,
    ModalComponent,
    XBtn,
  },
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
  methods: {
    showModal() {
      this.modal.showModal();
    },
    closeModal() {
      this.modal.closeModal();
    },
    ...mapActions(cartStore, ['delAllCart']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum', 'total', 'final_total']),
  },
};
</script>
