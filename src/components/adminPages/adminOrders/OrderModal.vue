<template>
  <CenterModal
  target="order" ref="orderCenterModal" @reset-form="resetModalForm">

    <!-- 標題 -->
    <template #title="{titleClass}">
      <h3 :class="titleClass">編輯訂單</h3>
    </template>
    <template v-if="Object.keys(tempOrder).length !== 0">
    <!-- 編輯區 -->
    <VForm v-slot="{errors}" ref="orderForm"
    @submit="modalPutOrder">
      <h4 class="text-xl font-bold text-primary-800 mb-3">訂單資訊</h4>
        <div class="flex gap-3 mb-3">
          <div class="w-1/2">
            <!-- 訂單日期 -->
            <FormFloat :label-for="'date'" :label="'訂單日期'">
              <template #default="{inputClass}">
                <input type="text" name="訂單日期" id="date" v-model="orderDate"
                :class="inputClass" readonly>
              </template>
            </FormFloat>
          </div>
          <div class="w-1/2">
            <!-- 總額 -->
            <FormFloat :label-for="'total'" :label="'總額'">
              <template #default="{inputClass}">
                <input type="number" name="總額" id="total" v-model.number="tempOrder.total"
                :class="inputClass" readonly>
              </template>
            </FormFloat>
            <p class="text-primary-800" v-if="coupon">
            使用優惠券 {{coupon}}</p>
          </div>

        </div>
        <div class="mb-6">
          <!-- 付款狀態 -->
          <ChecksRadio label-for="is_paid" label="是否付款">
            <template #default="{inputClass}">
              <input type="checkbox" name="是否付款" id="is_paid" v-model="tempOrder.is_paid"
              :class="inputClass">
            </template>
          </ChecksRadio>
        </div>

      <h4 class="text-xl font-bold text-primary-800 mb-3">客戶資訊</h4>
      <div class="flex flex-col gap-3 mb-6">
        <!-- 姓名 -->
        <FormFloat :label-for="'userName'" :label="'姓名'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="姓名" id="userName" v-model="tempOrder.user.name"
            :class="inputClass" rules="required" placeholder></VField>
          </template>
        </FormFloat>
        <!-- 手機號碼 -->
        <FormFloat :label-for="'userTel'" :label="'手機號碼'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="tel" name="手機號碼" id="userTel" v-model="tempOrder.user.tel"
            :class="inputClass" :rules="isPhone"
            placeholder></VField>
          </template>
        </FormFloat>
        <!-- 電子信箱 -->
        <FormFloat :label-for="'userEmail'" :label="'電子信箱'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="email" name="電子信箱" id="userEmail" v-model="tempOrder.user.email"
            :class="inputClass" rules="email|required"
            placeholder></VField>
          </template>
        </FormFloat>
        <!-- 地址 -->
        <FormFloat :label-for="'userAddress'" :label="'地址'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="地址" id="userAddress" v-model="tempOrder.user.address"
            :class="inputClass" rules="required"
            placeholder></VField>
          </template>
        </FormFloat>
        <!-- 備註 -->
        <FormFloat :label-for="'message'" :label="'備註'" :errors="errors">
          <template #default="{inputClass}">
            <textarea type="text" name="備註" id="message" v-model="tempOrder.message"
            :class="inputClass"
            placeholder></textarea>
          </template>
        </FormFloat>
        <h4 class="text-xl font-bold text-primary-800 mb-3">訂單產品</h4>
        <TableComponent class="mb-8">
          <template #th>
            <th scope="col">
            產品
            </th>
            <th scope="col" class="min-w-10">
            數量
            </th>
            <th scope="col" class="min-w-8 text-end">
            小計
            </th>
          </template>
          <template #tr="{trClass}">
            <tr :class="trClass" v-for="product in order.products" :key="product.id">
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-12 h-9 overflow-hidden rounded-sm">
                    <img lazy="loading" :src="product.product.imageUrl" alt="產品圖">
                  </div>
                  {{ product.product.title }}
                </div>
              </td>
              <td>
                <select class="form-control"
                name="qty" :id="`${product.id}qty`" v-model.number="product.qty">
                  <option v-for="i in 20"
                  :key="`${product.id}${i}`" :value="i">{{ i }}</option>
                </select>
              </td>
              <td class="text-end">{{ product.product.price * product.qty }}</td>
            </tr>
            <tr class="border-none">
              <td colspan="3" class="py-2 text-end md:pr-4">總計：{{total}}</td>
            </tr>
          </template>
        </TableComponent>
        <!-- 按鈕 -->
        <div class="mt-5 text-end">
          <button type="button" class="btn btn-outline-primary me-3"
          @click="closeModal();resetModalForm()">
          取消編輯</button>
          <button type="submit" class="btn btn-primary">
          儲存編輯</button>
        </div>
      </div>
    </VForm>
  </template>
  </CenterModal>
</template>

<script>
import CenterModal from '@/components/shared/modal/CenterModal.vue';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import { mapActions, mapState } from 'pinia';
import swalStore from '@/stores/swalStore';
import loadingStore from '@/stores/loadingStore';
import validateStore from '@/stores/validateStore';
import helperStore from '@/stores/helperStore';
import ChecksRadio from '@/components/shared/form/ChecksRadio.vue';
import TableComponent from '@/components/shared/table/TableComponent.vue';

export default {
  components: {
    CenterModal, FormFloat, ChecksRadio, TableComponent,
  },
  props: {
    order: Object,
    pagination: Object,
  },
  data() {
    return {
      tempOrder: {},
      orderDate: '',
      coupon: null,
    };
  },
  watch: {
    order() {
      this.init();
    },
  },
  methods: {
    init() {
      this.tempOrder = this.order;
      if (this.tempOrder?.products) {
        const productValues = Object.values(this.tempOrder?.products);
        this.coupon = productValues[0].coupon.title;
      }
      this.tempOrder.total = Math.floor(this.tempOrder?.total);
      this.orderDate = this.timestampToDate(this.order?.create_at);
    },
    showModal() {
      this.$refs.orderCenterModal.showModal();
    },
    closeModal() {
      this.$refs.orderCenterModal.closeModal();
    },
    resetModalForm() {
      this.$refs.orderForm.resetForm();
    },
    async modalPutOrder() {
      this.tempOrder.total = this.total;

      // 關閉 modal
      this.closeModal();
      this.$emit('putOrder', this.tempOrder);
      // 重置表單，避免殘留上次驗證結果
      this.resetModalForm();
    },
    ...mapActions(swalStore, ['swalToast']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(validateStore, ['isPhone']),
    ...mapActions(helperStore, ['timestampToDate']),
  },
  computed: {
    total() {
      const array = Object.values(this.tempOrder.products);
      return array.reduce((acc, cur) => acc + cur.product.price * cur.qty, 0);
    },
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
