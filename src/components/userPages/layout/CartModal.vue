<template >
  <Transition name="slide" enter-active-class="animate__animated
  animate__slideInRight animate__faster"
  leave-active-class="animate__animated
  animate__slideOutRight animate__faster"
  @after-leave="onAfterLeave">
    <dialog v-show="isShow" ref="modal"
    class="my-0 mr-0 max-h-dvh w-11/12 max-w-md backdrop:bg-primary-950/70"
    @cancel.prevent="closeModal"
    >
      <div class="flex flex-col h-dvh bg-primary-50 text-primary-950">
        <!-- 標題 -->
        <div class="flex justify-between items-center py-2 px-7 md:px-8
        border-b border-primary-300">
          <h3 class="text-lg font-bold">購物車</h3>
          <button type="button" class="btn btn-link shadow-none" @click="closeModal">
          <i class="bi bi-x-lg text-lg"></i></button>
        </div>
        <!-- 商品 -->
        <div v-if="cartNum" class="flex flex-col pt-6 px-7 md:px-8">
          <button class="btn btn-primary-light ml-auto mb-4" type="button"
          @click="delAllCart(modal)">
          清空購物車</button>
          <ul class="flex flex-col gap-6 md:gap-8">
            <li v-for="cart in carts" :key="cart.id" class="flex rounded">
              <!-- 左 -->
              <div class="w-1/3 h-24 md:h-32 mr-4 rounded-md overflow-hidden">
                <img loading="lazy" class="w-full h-full object-cover"
                :src="cart.product.imageUrl" alt="產品圖">
              </div>
              <!-- 右 -->
              <div class="w-2/3 flex flex-col justify-between">
              <p class="font-medium md:text-lg">{{ cart.product.title }}</p>
              <p class="text-stone-500 text-sm mb-1 md:text-base">{{ cart.product.unit }}</p>
              <p class="mb-1">
                <del class="text-stone-500 mr-2 text-xs md:text-xs"
                v-if="cart.product.origin_price !== cart.product.price">
                  NT$ {{ cart.product.origin_price }}</del>
                  <span class="text-primary-800 md:text-lg">NT$ {{ cart.product.price }}</span>
                </p>
              <!-- 按鈕區 -->
              <div class="flex gap-2">
                <!-- 數量按鈕 -->
                <div class=" flex w-fit border-2 border-primary-200 rounded
                *:px-3 *:py-1">
                  <LoadingBtn
                    class="transition-colors
                    hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
                    disabled:text-stone-500 disabled:bg-stone-100/50 disabled:cursor-not-allowed"
                    @click="cart.qty--;debouncePutCart(cart)"
                    :disabled="cart.qty === 1"
                    :isLoading="loadingStatus.cartId === cart.id">
                      <template v-if="loadingStatus.cartId !== cart.id">－</template>
                    </LoadingBtn>
                    <input type="text" class="border-y-0 bg-transparent w-10 text-center
                    border-x border-primary-200
                    focus:ring-primary-700"
                    v-model="cart.qty" readonly>
                    <LoadingBtn
                    class="transition-colors
                    hover:bg-primary-200 focus:bg-primary-200 active:bg-primary-200
                     disabled:text-stone-600 disabled:cursor-not-allowed"
                     @click="cart.qty++;debouncePutCart(cart)"
                     :isLoading="loadingStatus.cartId === cart.id">
                     <template v-if="loadingStatus.cartId !== cart.id">＋</template>
                    </LoadingBtn>
                  </div>
                  <!-- 刪除按鈕 -->
                  <LoadingBtn class="btn btn-link shadow-none" @click="delCart(cart, modal)"
                  :isLoading="loadingStatus.cartId === cart.id">
                  <i v-if="loadingStatus.cartId !== cart.id"
                  class="bi bi-trash3 text-orange-700"></i></LoadingBtn>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 空購物車 -->
        <div v-else class="grow flex justify-center items-center">
          <div class="w-1/ text-center">
            <i class="bi bi-cart-x text-8xl"></i>
            <p class="pt-11 pb-5">你的購物車是空的</p>
            <RouterLink to="/products" class="btn btn-primary" @click="closeModal">開始購物</RouterLink>
          </div>
        </div>
        <!-- 總額 -->
        <div v-if="cartNum" class="border-t border-primary-300 mt-auto py-6 px-7 md:px-8">
          <div class="">
            <FormFloat label-for="coupon" label="優惠券">
              <template #default="{inputClass}">
                <div class="flex border border-stone-300 rounded-md">
                  <input type="text" list="couponList" name="coupon" id="coupon"
                  :class="inputClass" class="rounded-r-none border-0"
                  v-model="couponInput" placeholder>
                  <datalist id="couponList">
                    <option value="ILOVECOCOA">ILOVECOCOA</option>
                  </datalist>
                  <button type="button"
                  class="btn btn-primary-light rounded-l-none text-nowrap
                  shadow-none"
                  @click="handleUseCoupon"
                  :disabled="!couponInput">
                  使用</button>
                </div>
              </template>
            </FormFloat>
            <p class="text-primary-800" v-if="usedCoupon">已使用優惠券：{{usedCoupon}}</p>
          </div>
          <div class="flex justify-between items-center py-2 my-2">
            <p>共 {{cartNum}} 項商品</p>
            <p>
              <del class="text-stone-500 mr-2" v-if="total !== final_total"> NT$ {{ total }}</del>
              <span class="text-primary-800 text-2xl font-bold">NT$ {{ final_total }}</span>
            </p>
          </div>
          <RouterLink to="" class="block btn btn-primary btn-lg w-full text-center"
          @click="closeModal">
          去結帳</RouterLink>
        </div>
      </div>
    </dialog>
  </Transition>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import scrollStore from '@/stores/scrollStore';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

export default {
  components: {
    FormFloat, LoadingBtn,
  },
  data() {
    return {
      modal: null,
      isShow: false,
      scrollbarWidth: 0,
      couponInput: '',
    };
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
  methods: {
    handleUseCoupon() {
      this.postCoupon(this.couponInput, this.modal);
      this.couponInput = '';
    },
    showModal() {
      this.getCurrentScroll();
      this.disableScroll();
      this.modal.showModal();
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
      this.enableScroll();
    },
    onAfterLeave() {
      this.modal.close();
      document.body.classList.remove(`pr-[${this.scrollbarWidth}px]`);
    },
    // 點擊 dialog 以外區域可以關閉，但關閉 swal 時 dialog 也會一起被關掉
    // clickAround($event) {
    //   const dialogRect = this.modal.getBoundingClientRect();
    //   if (
    //     $event.clientX < dialogRect.left
    //     || $event.clientX > dialogRect.right
    //     || $event.clientY < dialogRect.top
    //     || $event.clientY > dialogRect.bottom
    //   ) {
    //     this.closeModal();
    //   }
    // },
    ...mapActions(scrollStore, ['getCurrentScroll', 'disableScroll', 'enableScroll']),
    ...mapActions(cartStore, ['debouncePutCart', 'delCart', 'delAllCart', 'postCoupon']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum', 'carts', 'total', 'final_total', 'usedCoupon']),
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
