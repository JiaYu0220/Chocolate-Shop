<template >
  <!-- https://www.darkolake.com/sf/checkout/f3a710db-505f-43de-8092-c1f82828e637 -->
  <div v-if="isFinish" class="h-full flex flex-col justify-center items-center">
    <p class="text-5xl mb-10">訂單已建立</p>
    <RouterLink to="/products" class="btn btn-primary btn-lg text-lg">繼續購物</RouterLink>
  </div>
  <div v-else class="container py-10 flex flex-col gap-5 md:gap-10 *:w-full md:flex-row md:*:w-1/2"
  :class="{'items-start':cartNum}">
    <div :class="{'self-center':!cartNum}">
      <!-- 商品 -->
      <div v-if="cartNum" class="flex flex-col">
        <div class="mb-4 border border-primary-200 rounded-md">
          <h2 class="text-lg font-bold text-center text-primary-800 bg-primary-200 py-2 md:text-xl">
            訂單金額
          </h2>
          <div class="p-4">
            <!-- 優惠券 -->
            <CouponInput></CouponInput>
            <p class="mt-4 md:text-lg">總計<span class="float-end">NT$ {{ total }}</span></p>
            <p v-if="total !== final_total"
            class="mt-4 text-lg md:text-xl text-bold text-primary-800">
              折扣價<span class="float-end">NT$ {{ final_total }}</span>
            </p>
          </div>
        </div>
        <!-- 桌機 購物清單 -->
        <div class="hidden border border-primary-200 rounded-md md:block">
          <h3 class="text-lg font-bold text-center text-primary-800 bg-primary-200 py-2">
            購物清單
          </h3>
          <div class="p-4">
            <p class="mb-2">共 {{cartNum}} 項商品</p>
            <ul class="flex flex-col gap-8 mb-8">
              <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" :canEdit="false"/>
            </ul>
          </div>
        </div>
        <!-- 手機板改 modal -->
        <button type="button" class="btn btn-primary-light text-lg font-bold w-full mb-5 md:hidden"
        @click="$refs.detailModal.showModal">
          確認購物清單<i class="bi bi-chevron-down ml-2"></i>
        </button>
          <ModalComponent ref="detailModal" direction="up" class="mb-0 rounded-sm">
            <div class="p-6">
              <div class="flex justify-between mb-4">
                <p class="text-lg text-primary-800 font-bold">購物清單</p>
                <XBtn class="-mt-2" @click="closeDetailModal"></XBtn>
              </div>
              <p class="mb-2">共 {{cartNum}} 項商品</p>
              <ul class="flex flex-col gap-8 mb-8">
                <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" :canEdit="false"/>
              </ul>
            </div>
          </ModalComponent>

        <hr class="border-primary-700 border-dotted md:hidden">
      </div>
      <!-- 空購物車 -->
      <div v-else class="flex justify-center items-center">
        <div class="text-center">
          <i class="bi bi-cart-x text-8xl"></i>
          <p class="py-6">你的購物車是空的</p>
          <RouterLink to="/products" class="btn btn-primary">開始購物</RouterLink>
        </div>
      </div>
    </div>

    <!-- 訂單 -->
    <div class="bg-primary-200 p-4 rounded-md">
      <h2 class="text-lg font-bold text-center text-primary-800 mt-2 mb-4 md:mb-6 md:text-xl">
        收件者資訊
      </h2>
      <VForm ref="form" v-slot="{ errors }" @submit="postOrder">
        <div class="mb-3">
          <FormFloat label-for="myName" label="收件人姓名" :errors="errors">
            <template #default="{inputClass}">
              <VField id="myName" name="收件人姓名" type="text" :class="inputClass"
              rules="required"
              v-model="user.name" required></VField>
            </template>
          </FormFloat>
        </div>

      <div class="mb-3">
      <FormFloat label-for="email" label="電子信箱" :errors="errors">
        <template #default="{inputClass}">
          <VField id="email" name="電子信箱" type="email" :class="inputClass"
          rules="email|required"
          v-model="user.email" required></VField>
        </template>
      </FormFloat>
      </div>

      <div class="mb-3">
        <FormFloat label-for="tel" label="收件人電話" :errors="errors">
          <template #default="{inputClass}">
            <VField id="tel" name="收件人電話" type="tel" :class="inputClass"
            :rules="isPhone"
            v-model="user.tel" required></VField>
          </template>
        </FormFloat>
      </div>

      <div class="mb-3">
        <FormFloat label-for="address" label="收件人地址" :errors="errors">
          <template #default="{inputClass}">
            <VField id="address" name="收件人地址" type="text" :class="inputClass"
            rules="required"
            v-model="user.address" required></VField>
          </template>
        </FormFloat>
      </div>

      <div class="mb-3">
        <FormFloat label-for="message" label="留言">
          <template #default="{inputClass}">
            <VField id="message" name="留言" type="text" :class="inputClass"
            as="textarea"
            v-model="message"></VField>
          </template>
        </FormFloat>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary w-full">送出訂單</button>
      </div>
    </VForm>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import CartCard from '@/components/userPages/cart/CartCard.vue';
import CouponInput from '@/components/userPages/cart/CouponInput.vue';
import swalStore from '@/stores/swalStore';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';
import validateStore from '@/stores/validateStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    CartCard, FormFloat, CouponInput, ModalComponent, XBtn,
  },
  data() {
    return {
      user: {},
      message: '',
      isFinish: false,
    };
  },
  methods: {
    closeDetailModal() {
      this.$refs.detailModal.closeModal();
    },
    async postOrder() {
      if (this.cartNum) {
        try {
          const swal = await this.confirmSwal('確定提交訂單？');
          if (swal.isConfirmed) {
            this.showLoading();
            const url = `${VITE_URL}/api/${VITE_PATH}/order`;
            const data = { user: this.user, message: this.message };
            const res = await this.$http.post(url, { data });

            this.hideLoading();

            this.$refs.form.resetForm();
            const orderSwal = await this.$swal(res.data.message);
            if (orderSwal.isConfirmed) {
              this.isFinish = true;
              this.getCart();
            }
          }
        } catch (error) {
          this.hideLoading();
          // 通知
          const { message } = error.response.data;
          this.$swal(Array.isArray(message) ? message[0] : message);
        }
      } else {
        this.$swal('請選購商品後再提交表單');
      }
    },
    ...mapActions(cartStore, ['delAllCart', 'postCoupon', 'getCart']),
    ...mapActions(swalStore, ['confirmSwal']),
    ...mapActions(validateStore, ['isPhone']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum', 'carts', 'total', 'final_total', 'usedCoupon']),
  },
};
</script>
