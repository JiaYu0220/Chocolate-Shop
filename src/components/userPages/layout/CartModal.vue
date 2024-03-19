<template >
  <ModalComponent ref="modal" direction="right" class="my-0 mr-0 max-h-dvh w-11/12 max-w-md">
    <div class="flex flex-col h-dvh bg-primary-50 text-primary-950">
        <!-- 標題 -->
        <div class="flex justify-between items-center py-2 px-7 sm:px-8
        border-b border-primary-300">
          <h3 class="text-lg font-bold">購物車</h3>
          <XBtn @click="closeModal"></XBtn>
        </div>
        <!-- 商品 -->
        <div v-if="cartNum" class="py-6 px-7 sm:px-8">
          <div class="flex justify-between items-center pb-4">
            <p>共 {{cartNum}} 項商品</p>
            <button class="btn btn-primary-light" type="button"
            @click="delAllCart(modal)">
            清空購物車</button>
          </div>
          <ul class="flex flex-col gap-6 sm:gap-8">
            <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" :swal-container="modal"/>
          </ul>
        </div>
        <!-- 空購物車 -->
        <div v-else class="grow flex justify-center items-center">
          <div class="text-center">
            <i class="bi bi-cart-x text-8xl"></i>
            <p class="pt-11 pb-5">你的購物車是空的</p>
            <RouterLink to="/products" class="btn btn-primary" @click="closeModal">開始購物</RouterLink>
          </div>
        </div>
        <div v-if="cartNum" class="border-t border-primary-300 mt-auto py-6 px-7 sm:px-8">
          <!-- 總額 -->
          <div class="pb-6 text-primary-800 text-xl font-bold flex justify-between items-center">
            <p>總額</p>
            <p class="text-2xl">
              <del class="text-stone-500 mr-2 text-base"
              v-if="total !== final_total"> NT$ {{ total }}</del>
              NT$ {{ final_total }}
            </p>
          </div>
          <RouterLink to="/cart" class="block btn btn-primary btn-lg w-full text-center"
          @click="closeModal">
          去結帳</RouterLink>
        </div>
      </div>
  </ModalComponent>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import CartCard from '@/components/userPages/cart/CartCard.vue';
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';

export default {
  components: {
    CartCard, ModalComponent, XBtn,
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
    ...mapState(cartStore, ['cartNum', 'carts', 'total', 'final_total']),
  },
};
</script>
