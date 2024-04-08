<template>
  <div class="container py-10 h-full">
    <div class="w-full lg:w-4/5 mx-auto h-full">
      <!-- step bar -->
      <ul
        v-if="cartNum || step === 3"
        class="relative mb-10 flex justify-between after:content-[''] after:h-1 after:bg-primary-800
          after:absolute after:inset-x-6 after:top-6 z-10 after:-z-10"
      >
        <li v-for="i in 3" :key="`step${i}`" class="text-center">
          <div
            class="w-12 h-12 inline-flex justify-center items-center rounded-sm mb-2 text-lg
              font-bold"
            :class="
              i <= step
                ? 'bg-primary-800 text-primary-200'
                : 'bg-primary-50 text-primary-800 border border-primary-800'
            "
          >
            <i v-if="step > i" class="bi bi-check-lg"></i>
            <template v-else>{{ i }}</template>
          </div>
          <p class="font-bold">{{ stepArr[i - 1] }}</p>
        </li>
      </ul>
      <!-- 1. 購物清單 -->
      <template v-if="step === 1">
        <!-- 空購物車 -->
        <div v-if="cartNum === 0" class="flex flex-col items-center justify-center h-full">
          <i class="bi bi-cart-x text-8xl"></i>
          <p class="py-6">你的購物車是空的</p>
          <RouterLink to="/products" class="btn btn-primary">開始購物</RouterLink>
        </div>
        <template v-else>
          <!-- 商品 -->
          <div class="flex flex-col gap-4 md:flex-row md:items-start">
            <!-- 桌機 購物清單 -->
            <CartSection class="w-full md:w-2/3" title="購物清單">
              <CartList />
            </CartSection>
            <CartSection class="w-full md:w-1/3" title="訂單金額">
              <!-- 優惠券 -->
              <KeepAlive>
                <CouponInput />
              </KeepAlive>
              <p class="mt-4 md:text-lg">
                總計<span class="float-end">NT$ {{ total }}</span>
              </p>
              <p
                v-if="total !== final_total"
                class="text-bold mt-4 text-lg text-primary-800 md:text-xl"
              >
                折扣價<span class="float-end">NT$ {{ final_total }}</span>
              </p>
            </CartSection>
          </div>
          <!-- 按鈕 -->
          <div class="mt-10 flex justify-between">
            <RouterLink to="/products" class="btn btn-text">
              <i class="bi bi-chevron-double-left me-1"></i>回產品列表
            </RouterLink>
            <button type="button" class="btn btn-primary" @click="step++">
              填寫收件資訊
              <i class="bi bi-chevron-double-right ml-1"></i>
            </button>
          </div>
        </template>
      </template>
      <!-- 2. 收件資訊 -->
      <CartSection v-if="step === 2" title="收件資訊">
        <KeepAlive>
          <OrderForm @prev-step="step--" @next-step="step++" />
        </KeepAlive>
      </CartSection>

      <!-- 3. 訂單明細 -->
      <div v-if="step === 3" class="flex flex-col items-center justify-center">
        <h2 class="mb-10 text-3xl">訂單已建立</h2>
        <table v-if="detail.length" class="w-full border-y-2 border-primary-800 mb-10">
          <tbody class="divide-y divide-primary-800">
            <tr v-for="item in detail" :key="item.title" class="*:py-2">
              <th class="text-start" scope="row">{{ item.title }}</th>
              <td class="text-end">{{ item.text }}</td>
            </tr>
            <tr class="*:py-2">
              <th class="text-start" scope="row">購物清單</th>
              <td class="text-end">
                <p v-for="item in currentOrder.products" :key="item.id">
                  {{ item.product.title }} × {{ item.qty }}
                </p>
                <button type="button" class="link font-bold" @click="$refs.detailModal.showModal">
                  詳細<i class="bi bi-search ml-1"></i>
                </button>
                <ModalComponent ref="detailModal" direction="up" class="mb-0 rounded-sm">
                  <div class="p-6">
                    <div class="mb-4 flex justify-between">
                      <p class="text-lg font-bold text-primary-800">購物清單</p>
                      <XBtn class="-mt-2" @click="closeDetailModal" />
                    </div>
                    <CartList :prop-carts="currentOrder.products" :can-edit="false" />
                  </div>
                </ModalComponent>
              </td>
            </tr>
          </tbody>
        </table>
        <RouterLink to="/products" class="btn btn-primary btn-lg text-lg">繼續購物</RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import helperStore from '@/stores/helperStore';
import CartList from '@/components/userPages/cart/CartList.vue';
import CartSection from '@/components/userPages/cart/CartSection.vue';
import OrderForm from '@/components/userPages/cart/OrderForm.vue';
import CouponInput from '@/components/userPages/cart/CouponInput.vue';
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';

export default {
  components: {
    CartList,
    CouponInput,
    CartSection,
    OrderForm,
    ModalComponent,
    XBtn,
  },
  data() {
    return {
      step: 1,
      stepArr: ['購物清單', '收件資訊', '訂單明細'],
      detail: [],
    };
  },
  mounted() {},
  watch: {
    currentOrder: {
      handler() {
        this.detail = [
          { title: '訂單編號', text: this.currentOrder.id },
          {
            title: '成立時間',
            text: new Date(this.currentOrder.create_at * 1000).toLocaleString(),
          },
          { title: '收件人姓名', text: this.currentOrder.user.name },
          { title: '電子信箱', text: this.currentOrder.user.email },
          { title: '收件人電話', text: this.currentOrder.user.tel },
          { title: '收件人地址', text: this.currentOrder.user.address },
          { title: '訂單總額', text: `$ ${this.currentOrder.total}` },
        ];
      },
      deep: true,
    },
  },
  methods: {
    closeDetailModal() {
      this.$refs.detailModal.closeModal();
    },

    ...mapActions(cartStore, ['postCoupon']),
    ...mapActions(helperStore, ['timestampToDate']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum', 'carts', 'total', 'final_total', 'usedCoupon']),
    ...mapState(orderStore, ['currentOrder']),
  },
};
</script>
